(function() {
	/* mouse pointer's last cordinates and distances moved */
	var _lastX, _lastY, _accuX, _accuY;

	/* threshold for leaned (like "left up") strokes
	 * this feature is on hold because the matching rate is low */
	var _lean = 1 / Math.tan(30 * Math.PI / 180);

	/* the stroking event object, will be passed to the stroke handler */
	var _event;

	/* the stroke movement's end time */
	var _endtm;

	/* true if the last regular/rocker/wheel stroke is fired */
	var _fired;

	/* the <canvas> element and its context for trail drawing */
	var _tcanvas, _tcontext;

	/* the connection port between the backend page */
	var _port = chrome.extension.connect({name: 'stroke.html-stroke'});

	/* configurations */
	var _cfg = {}

	/* global variable container */
	var _heap = {
		/* status of left and right mouse buttons,
		 * they are global because rocker or wheel strokes can be
		 * used to navigate between tabs, they depend on previous
		 * tabs' mouse button status to behave continuously */
		ldown: false, rdown: false,
		/* whether a rocker or wheel stroke has just been fired,
		 * the reason of making them global is similar to ldown/rdown:
		 * the currently selected tab should suppress the context menu
		 * once if it is given focus by a rocker or wheel stroke */
		rkfired: false, mwfired: false
	}

	/* calculate weights by distances moved in both directions */
	var weigh = function(x, y) {
		return Math.round(Math.sqrt(x * x + y * y));
	}

	/* search for image that is possibly positioned at the given
	 * element's coordinate */
	var imgsrc = function(elem) {
		var src;
		if (!elem || Node.ELEMENT_NODE != elem.nodeType)
			return null;
		else if ('IMG' == elem.nodeName && !!elem.src)
			return elem.src;
		else if (src = getComputedStyle(elem).getPropertyValue('background-image'))
			/* getPropertyValue() returns string literal 'none' if
			 * no background images are set */
			return src.match(/^url\(.+\)$/) && src.replace(/^url\((.+)\)$/, '$1');
		else return imgsrc(elem.parentNode);
	}

	/* search for link upward in the DOM tree */
	var linkhref = function(elem) {
		while (!!elem && elem.tagName != 'A') elem = elem.parentNode;
		if (!!elem) return elem.href;
		else return null;
	}

	/* strip MouseEvent object to void 'Converting circular structure to
	 * JSON' errors when converting it to JSON string */
	var strip = function(ev) {
		/* keep useful properties only, also retain the MouseEvent
		 * object structure */
		return {
			/* rocker strokes need this to know which button is
			 * pressed first */
			button: ev.button,
			srcElement: {
				/* link type strokes need these properties */
				textContent: ev.srcElement.textContent,
				href: linkhref(ev.srcElement),
				/* image type strokes need these */
				src: imgsrc(ev.srcElement),
				/* they all got this */
				nodeName: ev.srcElement.nodeName
			}
		};
	}

	/* create the canvas element for trail drawing */
	var canvas = function() {
		_tcanvas = $.create('canvas', {
			width: window.innerWidth, height: window.innerHeight
		});
		_tcanvas.style.cssText = 'left:0;position:fixed;top:0;z-index:' + new Date().getTime() + ';';
		_tcontext = _tcanvas.getContext('2d');
		/* styling */
		_tcontext.globalAlpha = 0.3;
		_tcontext.lineWidth = _cfg.trail_width;
		_tcontext.lineCap = 'round';
		_tcontext.shadowOffsetX = 0;
		_tcontext.shadowOffsetY = 0;
		_tcontext.shadowBlur = 3;
		_tcontext.shadowColor = _cfg.trail;
		_tcontext.strokeStyle = _cfg.trail;
	}

	/* set global variable */
	var setg = function(name, value) {
		_heap[name] = value;
		/* tell background page to update */
		_port.postMessage({ type: 'set-global',
			data: { name: name, value: value }
		});
	}

	/* get global variable */
	var getg = function(name) {
		return _heap[name];
	}

	/* assemble a stroke event, NOTE: all types of strokes, including
	 * rockers and wheels, will use this event */
	var genevt = function(ev) {
		return {
			/****** general properties ******/
			/* stroke, rocker or wheel */
			type: null,
			/* the initial event (mousedown for all 3 types) */
			initevt: strip(ev),
			/* the finish event (mouseup for stroke type, mousedown
			 * for rocker type and mousewheel for wheel type) */
			finevt: null,
			/* currently selected text */
			seltext: window.getSelection().toString(),

			/****** stroke type properties ******/
			/* stroke array */
			stroke: [],
			/* weights of each stroke part in the stroke array */
			weights: [],
			/* is this a user defined stroke? */
			custom: ev.ctrlKey,

			/****** wheel type properties ******/
			/* wheel direction, UP, DOWN, LEFT or RIGHT */
			wheel: null,

			/****** rocker type properties ******/
			/* rocker direction, LEFT -> RIGHT or RIGHT -> LEFT */
			rocker: null
		};
	}

	/* test if stroke drawing has started */
	var stroke_empty = function() {
		return !_event || !_event.stroke.length;
	}

	/* test if required keys of regular strokes are pressed */
	var stroke_keys = function(ev) {
		return ev.button == _cfg.trigger &&
			/* left mouse button should not be holding down */
			!getg('ldown') &&
			(!_cfg.suppress || !ev.altKey && !ev.metaKey);
	}

	/* initate a regular or drag stroke */
	var stroke_init = function(ev, drag) {
		/* prepare to draw trails, don't draw trail for drag strokes */
		if (!drag && _cfg.trail) {
			if (!_tcontext) canvas();
			_tcontext.beginPath();
			_tcontext.moveTo(ev.clientX, ev.clientY);
		}

		/* start recording path, reset everything */
		_lastX = ev.screenX;
		_lastY = ev.screenY;
		_accuX = _accuY = 0;

		/* disable auto-scroll to support strokes on Linux and Mac */
		if ($.MBUTTON == ev.button) {
			ev.preventDefault();
			ev.stopPropagation();
		}
	}

	/* track mouse movements in a regular or drag stroke transaction */
	var stroke_move = function(ev, drag) {
		var move, last_idx,
			x = ev.screenX, y = ev.screenY,
			offsetX = x - _lastX, offsetY = y - _lastY,
			absX = Math.abs(offsetX), absY = Math.abs(offsetY);

		/* the movement is negligible */
		if (absX < _cfg.minstep && absY < _cfg.minstep) return;

		if (!drag && _cfg.trail) {
			/* BUG=11
			 * insert the canvas into the DOM tree now, other
			 * than on the moment when it was created, because
			 * operations on <body> will cause any selected
			 * elements to lose focus */
			if (!_tcanvas.appended) {
				document.body.insertBefore(_tcanvas,
					document.body.firstChild);
				_tcanvas.appended = true;
			}
			_tcontext.lineTo(ev.clientX, ev.clientY);
			_tcontext.stroke();
		}
		_lastX = x;
		_lastY = y;
		_accuX += absX;
		_accuY += absY;

		/* ignore leaning, blurrer strokes are more recognizable */
//		if (0 == absY || (absX / absY > _lean)) {
//		} else if (0 == absX || (absY / absX > _lean)) {
//		} else {
//			move = (offsetX > 0 ? $.RIGHT : $.LEFT)
//				+ (offsetY > 0 ? $.DOWN : $.UP);
//		}
		if (absX > absY) {
			move = offsetX > 0 ? $.RIGHT : $.LEFT;
		} else {
			move = offsetY > 0 ? $.DOWN : $.UP;
		}

		last_idx = _event.stroke.length - 1;
		if (-1 == last_idx || _event.stroke[last_idx] != move) {
			/* first move or direction changed */
			_accuX = absX;
			_accuY = absY;
			_event.stroke.push(move);
			_event.weights.push(weigh(_accuX, _accuY));
			$.notify('[' + _event.stroke.join(' ') + ']', 2);
		} else {
			/* update weights */
			_event.weights[last_idx] = weigh(_accuX, _accuY);
		}
		/* update movement's ending time */
		_endtm = new Date().getTime();
	}

	/* fire a regular or drag stroke */
	var stroke_fire = function(ev, drag) {
		/* trail should be cleared even if it's not a valid stroke */
		if (!drag && _cfg.trail) {
			_tcontext.clearRect(0, 0, _tcanvas.width, _tcanvas.height);
			if (_tcanvas.appended) {
				document.body.removeChild(_tcanvas);
				_tcanvas.appended = false;
			}
		}

		if ((new Date().getTime() - _endtm) > _cfg.timeout) {
			/* timeouted */
			return;
		}

		/* it's a valid stroke */
		_fired = true;
		_event.type = !drag ? 'stroke' : 'drag';
		_event.finevt = strip(ev);

		_port.postMessage({ type: 'stroke', data: _event });
		ev.preventDefault();
		ev.stopPropagation();
	}

	/* test if required keys of drag strokes are pressed */
	var drag_keys = function(ev) {
		return ev.button == $.LBUTTON &&
			/* the right mouse button must be up */
			!getg('rdown') &&
			(!_cfg.suppress || !ev.altKey && !ev.metaKey);
	}

	/* initiate drag'n'drop stroke */
	var drag_init = function(ev) {
		/* only links or children of links can be draged */
		if (!!_event.initevt.srcElement.href) {
			stroke_init(ev, true);
			_event.type = 'drag';
			ev.preventDefault();
			ev.stopPropagation();
		}
	}

	/* track drag direction */
	var drag_move = function(ev) {
		/* remember the first drag direction only */
		if (_event.stroke.length < 1)
			stroke_move(ev, true);
	}

	/* fire a drag stroke */
	var drag_fire = function(ev) {
		/* accept the first drag direction */
		_event.drag = _event.stroke[0];
		stroke_fire(ev, true);
	}

	/* fire a rocker */
	var rocker_fire = function(ev) {
		var dir;

		/* rocker stroke is buggy on Linux */
		if (!$.WIN) {
			setg('ldown', false), setg('rdown', false);
			return;
		}

		/* it's tricky to decide rocker strokes' direction, the easiest
		 * way is to make decisions based on the 'mouseup' event, if the
		 * 'mouseup' event comes from the left button, then fire a
		 * right->left stroke, otherwise fire a left->right stroke.
		 * however, in practice, especially when making fast inputs, it's
		 * easy to do un-standard clicks like this:
		 * 1. press down left button, press down right button
		 * 2. release left button, release right button
		 * although the left button is first released, the desired stroke
		 * is left->right other than right->left.
		 * as a result the direction of rocker strokes is based on the
		 * order of key press, instead of on the order of key release */
		if (!_event) {
			/* when navigating between tabs by rocker or wheel strokes,
			 * _event is undefined when the user do contineous strokes,
			 * because the initial 'mousedown' events is fired in
			 * another tab, in this case, both _event.initevt and
			 * _event.finevt will be the finishing 'mouseup' event */
			_event = genevt(ev);
			/* because the user is still holding the other button, the
			 * released button must be pressed later than that button */
			dir = $.LBUTTON == ev.button ? $.LEFT : $.RIGHT;
		} else {
			/* when the initial event is available, the button of the
			 * the initial event must be pressed first */
			dir = $.LBUTTON == _event.initevt.button ? $.RIGHT : $.LEFT;
		}
		_event.type = 'rocker';
		_event.finevt = strip(ev);
		_event.rocker = dir;
		setg('rkfired', true);
		_port.postMessage({ type: 'stroke', data: _event });
		ev.preventDefault();
		ev.stopPropagation();
	}

	/* fire a wheel */
	var wheel_fire = function(ev) {
		if (!$.WIN) {
			setg('ldown', false), setg('rdown', false);
			return;
		}

		if (!_event) _event = genevt(ev);

		_event.type = 'wheel';
		_event.finevt = strip(ev);
		_event.wheel = ev.wheelDeltaY < 0 ? $.DOWN :
				ev.wheelDeltaY > 0 ? $.UP :
				ev.wheelDeltaX < 0 ? $.RIGHT :
				ev.wheelDeltaX > 0 ? $.LEFT : null;
		setg('mwfired', true);
		_port.postMessage({ type: 'stroke', data: _event });
		ev.preventDefault();
		ev.stopPropagation();
	}

	/* suppress the context menu when the trigger is right mouse button */
	window.addEventListener('contextmenu', function(ev) {
		/* right button is bound to be involved in both rocker and
		 * wheel strokes, after firing such strokes, a contextmenu
		 * should always been killed */
		if (getg('rkfired') || getg('mwfired') ||
			_fired && _cfg.trigger == $.RBUTTON) {
			/* the point of all *fired variables is to prevent
			 * context menu, so reset them all after suppression */
			_fired = false;
			setg('rkfired', false);
			setg('mwfired', false);
			ev.preventDefault();
			ev.stopPropagation();
		}
	}, true);

	/* detect wheel strokes */
	window.addEventListener('mousewheel', function(ev) {
		if (getg('rdown') && stroke_empty())
			wheel_fire(ev);
	}, true);

	/* initiate stroke events */
	window.addEventListener('mousedown', function(ev) {
		/* don't create _event if both buttons are down, the second
		 * 'mousedown' of a rocker stroke should not clear _event */
		if ($.LBUTTON == ev.button) {
			setg('ldown', true);
			if (!getg('rdown')) _event = genevt(ev);
		} else if ($.RBUTTON == ev.button) {
			setg('rdown', true);
			if (!getg('ldown')) _event = genevt(ev);
		} else {
			_event = genevt(ev);
		}

		if (!!_event && !getg('rkfired') && !getg('mwfired')) {
			if (stroke_keys(ev)) stroke_init(ev);
			else if (drag_keys(ev)) drag_init(ev);
		}
	}, true);

	/* track mouse movements */
	window.addEventListener('mousemove', function(ev) {
		if (!!_event && !getg('rkfired') && !getg('mwfired')) {
			if (stroke_keys(ev)) stroke_move(ev);
			else if (drag_keys(ev)) drag_move(ev);
		}
	}, true);

	/* finish stroking */
	window.addEventListener('mouseup', function(ev) {
		/* a dirty workaround, sometimes after jump to a tab by rocker
		 * stroke, the first 'mousedown' event of the right button
		 * will not be fired (may be fired in another tab like BUG 30?) */
		if ($.RBUTTON == ev.button && !getg('rdown')) setg('rdown', true);

		/* rockers are fired if both mouse buttons were pressed and
		 * the mouse was not moved since last mousedown event */
		var rkfired = getg('ldown') && getg('rdown') && stroke_empty(),
			stroke_fired = stroke_keys(ev),
			drag_fired = drag_keys(ev);

		/* update status first because we might be going to jump
		 * to another page */
		if ($.LBUTTON == ev.button) setg('ldown', false);
		else if ($.RBUTTON == ev.button) setg('rdown', false);

		if (rkfired) {
			rocker_fire(ev);
		} else if (!stroke_empty() && !getg('rkfired') && !getg('mwfired')) {
			if (stroke_fired) stroke_fire(ev);
			else if (drag_fired) drag_fire(ev);
		}
		/* if not both buttons are released, there might be a contineous
		 * stroke followed, so not delete _event in such cases */
		if (!getg('ldown') && !getg('rdown')) _event = undefined;
	}, true);

	/* response to requests from background page */
	chrome.extension.onRequest.addListener(function(msg, sender, resp) {
		if ('update-config' == msg.type) {
			var script;

			_cfg = msg.data;
			if (!_cfg.locale) return;

			/* trail color and thickness might be affected by _cfg update */
			if (!!_tcanvas && !!_tcanvas.parentNode) {
				_tcanvas.parentNode.removeChild(_tcanvas);
				_tcanvas = _tcontext = undefined;
			}

			script = $.create('script', {
				type: 'text/javascript',
				src: chrome.extension.getURL('locales/' + _cfg.locale + '.json')
			});
			script.addEventListener('load', function() {
				/* i18n is initiated, if the locale file
				 * doesn't exist, this event will NOT fire */
				console.log('Locale %s is loaded', _cfg.locale);
			});
			document.head.appendChild(script);
		} else if ('local-eval' == msg.type) {
			var ex, id = msg.data.id, tab = msg.data.tab,
				event = msg.data.event,
				custom = msg.data.custom,
				script = msg.data.script;

			try {
				if (custom) {
					/* event is passed as the magic _env
					 * variable to the sandbox */
					ex = $.sandbox.call(tab, event, script);
					if (true !== ex) throw ex;
				} else {
					$.actions[id].call(tab, tab, event);
				}
			} catch (ex) {
				console.error(ex);
			}
		} else if ('put-globals' == msg.type) {
			/* just be selected, reset _heap and _event */
			_heap = msg.data;
			_event = undefined;
		} else if ('show-message' == msg.type) {
			$.notify(msg.data.html, msg.data.duration);
		} else {
			/* both stroke.js and options.html are listening to
			 * onRequest events, although all listeners can receive
			 * the same event, the sender will only get one
			 * response sent by the listener which anwsers first,
			 * all other listeners' responses will be lost. so
			 * don't send response if the message type is unknown,
			 * unknown messages may be useful to other listeners */
			return;
		}
		resp({});
	});

	/* query config from the background page */
	_port.postMessage({ type: 'pull-config' });
	_port.postMessage({ type: 'get-globals' });
})();
