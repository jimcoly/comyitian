/* global initialization */
(function() {
	/* document.head is undefined in non-HTML type documents */
	if (!document.head) {
		document.body.parentNode.insertBefore(document.createElement('head'), document.body);
	}

	String.prototype.trim = function()
	{
		return this.replace(/^\s+|\s+$/, '');
	}

	Array.prototype.unique = function()
	{
		var o = {}, i, l = this.length;
		for (i = 0; i < l; o[this[i]] = this[i++]);
		this.splice(0, l);
		for(i in o) this.push(o[i]);
	}
})();

/* essential functions */
var $ = {
	/* extensions id */
	EXT_ID: 'cjabiokabamngnbigeeibddnihgllkgg',

	/* mouse button id */
	LBUTTON: 0,
	MBUTTON: 1,
	RBUTTON: 2,

	/* stroke directions */
	LEFT: 'L',
	RIGHT: 'R',
	UP: 'U',
	DOWN: 'D',

	/* url of the options page */
	OPTION_URL: chrome.extension.getURL('options.html'),

	/* id prefix of user defined strokes */
	CUS_PFX: 'userdef#',

	/* sadly.. */
	WIN: !!navigator.platform.match(/^win/i),

	get: function(id) {
		if ('string' != typeof id) return id;
		return document.getElementById(id);
	},

	create: function(t, p) {
		var n = document.createElement(t);
		for (k in p) n[k] = p[k];
		return n;
	},

	addcls: function(n, c) {
		var nd = $.get(n);
		if (nd && !$.hascls(nd, c))
			nd.className = nd.className.trim() + ' ' + c;
	},

	delcls: function(n, c) {
		var nd = $.get(n);
		if (nd)
			nd.className = nd.className.replace(new RegExp('(^|\\s+)' + c + '(\\s+|$)', 'g'), ' ');
	},

	hascls: function(n, c) {
		var nd = $.get(n);
		if (nd) return !!(nd.className.match(new RegExp('(^|\\s+)' + c + '(\\s+|$)')));
	},

	show: function(n) {
		$.delcls(n, 'hidden');
	},

	hide: function(n) {
		$.addcls(n, 'hidden');
	},

	toggle: function(n) {
		return $.hascls(n, 'hidden') ? $.show(n) : $.hide(n);
	},

	copy: function(o) {
		return JSON.parse(JSON.stringify(o));
	},

	/* and some not-so-essential functions too */
	notify: function(msg, dur, callback) {
		var id = $.EXT_ID + '-notify', id2 = id + '-old', nd, nd2,
			confirm, cancel;

		if (nd = $.get(id)) {
			if (nd2 = $.get(id2)) {
				nd2.id = '';
				nd2.innerHTML = '';
				document.body.removeChild(nd2);
			}
			nd.id = id2;
		}

		nd = $.create('span', { id: id });
		nd.style.cssText = '\
-webkit-border-top-right-radius:4px;\
background:#d2e1f6;\
border:#b9c7d9 solid;\
border-width:1px 1px 0 0;\
bottom:0;\
color:#696969;\
font:11px/1.5 tahoma,sans-serif;\
left:0;\
margin:0;\
opacity:0;\
padding:0 0 1px 3px;\
position:fixed;\
text-align:left;\
width:' + (window.innerWidth * .328) + 'px;\
z-index:' + new Date().getTime();

		if (isNaN(dur)) {
			/* duration not set, display till user confirm */
			nd.appendChild($.create('span', { innerHTML: msg }));
			confirm = $.create('button', { textContent: 'Confirm' });
			confirm.style.float = 'right';
			confirm.addEventListener('click', function(ev) {
				$.fade_out(nd, function() {
					try { document.body.removeChild(nd) }
					catch (e) {}
					if (!!callback) callback.apply();
				});
			}, false);
			nd.appendChild(confirm);
			$.fade_in(nd);
		} else {
			nd.innerHTML = msg;
			$.fade_in(nd, function() {
				setTimeout(function() {
					$.fade_out(nd, function() {
						try { document.body.removeChild(nd) }
						catch (e) {}
						if (!!callback) callback.apply();
					});
				}, Math.max(2, dur) * 1000);
			});
		}
		document.body.appendChild(nd);
	},

	fade_in: function(nd, callback) {
		if (!(nd = $.get(nd))) return;
		nd.style.opacity = 0;
		var i = 0, si = setInterval(function() {
			nd.style.opacity = (i += 0.1);
			if (nd.style.opacity >= 1) {
				clearInterval(si);
				if (!!callback) callback.apply();
			}
		}, 10);
		$.show(nd);
	},

	fade_out: function(nd, callback) {
		if (!(nd = $.get(nd))) return;
		nd.style.opacity = 1;
		var i = 1, si = setInterval(function() {
			nd.style.opacity = (i -= 0.1);
			if (nd.style.opacity <= 0) {
				clearInterval(si);
				$.hide(nd);
				if (!!callback) callback.apply();
			}
		}, 10);
	},

	slide_down: function(nd, callback) {
		if (!(nd = $.get(nd)) || !nd.slide_cache) return;

		var height = 0, cache = nd.slide_cache, style = nd.style;
		cache.interval = setInterval(function() {
			if (height < cache.height) {
				style.height = (Math.min(cache.height, height += 30)) + 'px';
			} else {
				clearInterval(cache.interval);
				style.overflow = cache.overflow;
				nd.slide_cache = undefined;
				if (!!callback) callback.apply();
			}
		}, 10);
	},

	slide_up: function(nd, callback) {
		if (!(nd = $.get(nd)) || !!nd.slide_cache) return;

		nd.slide_cache = {
			height: parseInt(getComputedStyle(nd).getPropertyValue('height')),
			overflow: nd.style.overflow
		}
		nd.style.overflow = 'hidden';

		var cache = nd.slide_cache, style = nd.style, height = cache.height;
		cache.interval = setInterval(function() {
			if (height > 0) {
				style.height = (Math.max(0, height -= 30)) + 'px';
			} else {
				clearInterval(cache.interval);
				if (!!callback) callback.apply();
			}
		}, 10);
	}
}

/* stroke handlers
 * the first parameter is the tab object in which the stroke is generated
 * the second parameter is the path object recorded in the stroke.js */
$.actions = {
	'to-page-top': function(tab, path) {
		document.body.scrollTop = 0;
	},

	'to-page-bottom': function(tab, path) {
		document.body.scrollTop = document.body.scrollHeight;
	},

        'scroll-up-one-page': function(tab, path) {
		//document.body.scrollByPages(-1);
		document.body.scrollTop -= (window.innerHeight - 20);
	},

        'scroll-down-one-page': function(tab, path) {
		//document.body.scrollByPages(1);
		document.body.scrollTop += (window.innerHeight - 20);
	},

	'history-back': function(tab, path) {
		history.back();
	},

	'history-forward': function(tab, path) {
		history.forward();
	},

	'previous-tab': function(tab, path) {
		$.actions['next-tab'](tab, path, -1);
	},

	'next-tab': function(tab, path, dir) {
		var i, n, step = (!!dir && dir < 0) ? -1 : 1;
		chrome.tabs.getAllInWindow(null, function(tabs) {
			n = tabs.length;
			for (i = 0; i < n; ++i) {
				if (tabs[i].id == tab.id) {
					if (!!(tab = tabs[(i+step+n)%n])) {
						chrome.tabs.update(tab.id, { selected: true });
					}
					break;
				}
			}
		});
	},

	'first-tab': function(tab, path) {
		chrome.tabs.getAllInWindow(null, function(tabs) {
			chrome.tabs.update(tabs[0].id, { selected: true });
		});
	},

	'last-tab': function(tab, path) {
		chrome.tabs.getAllInWindow(null, function(tabs) {
			chrome.tabs.update(tabs[tabs.length-1].id, { selected: true });
		});
	},

        'upper-level-in-url': function(tab, path) {
		var p = location.protocol + '//' + location.host +
			location.pathname.slice(0, -1).replace(/[^\/]*$/, '');
		if (p != location.href) location.href = p;
	},

        'increase-number-in-url': function(tab, path, i) {
		var n = location.href.match(/(\d+)$/);
		if (n) {
			n = Math.max(0, parseInt(n[1]) + (isNaN(i) ? 1 : i));
			location.href = location.href.replace(/\d+$/, n);
		}
	},

        'decrease-number-in-url': function(tab, path) {
		$.actions['increase-number-in-url'](tab, path, -1);
	},

	'minimize-window': function(tab, path) {
		/* not implemented */
	},

	'maximize-window': function(tab, path) {
		chrome.windows.getCurrent(function(wnd) {
			chrome.windows.update(wnd.id, {
				left: 0, top: 0, width: screen.width,
				height: screen.height });
		});
	},

	'new-window': function(tab, path) {
		chrome.windows.create();
	},

	'close-window': function(tab, path) {
		chrome.windows.getCurrent(function(wnd) {
			chrome.windows.remove(wnd.id);
		});
	},

	'new-tab': function(tab, path) {
		var info = { selected: true }
		if (!!_cfg.newtab_target) info.url = _cfg.newtab_target;
		info.index = Math.min(314159, eval(tab.index + _cfg.newtab_position));
		chrome.tabs.create(info);
	},

	'close-tab': function(tab, path) {
		if (!_cfg.last_tab_close_win)
			chrome.tabs.getAllInWindow(null, function(t) {
				if (1 == t.length)
					$.actions['new-tab'](tab, path);
				chrome.tabs.remove(tab.id);
			});
		else
			chrome.tabs.remove(tab.id);
	},

	'undo-close-tab': function(tab, path) {
		if (0 < _tabs.closed.length) {
			var dead = _tabs.all[_tabs.closed.pop()];
			chrome.tabs.create({
				index: tab.index + 1,
				selected: true,
				url: dead.url
			}, function() {
				/* a new tab is created (same url, different
				 * tab id), the old tab has long gone */
				delete _tabs.all[dead.id];
			});
		}
	},

	'detach-tab': function(tab, path) {
		chrome.windows.create(null, function(wnd) {
			chrome.tabs.move(tab.id, { windowId: wnd.id, index: 0 });
			/* remove all other tabs */
			chrome.tabs.getAllInWindow(wnd.id, function(tabs) {
				for (var i = 0; i < tabs.length; ++i) {
					if (tabs[i].id != tab.id) {
						chrome.tabs.remove(tabs[i].id);
					}
				}
			});
		});
	},

	'duplicate-tab': function(tab, path) {
		chrome.tabs.create({
			index: tab.index + 1,
			url: tab.url
		});
	},

	'close-tab-to-the-left': function(tab, path) {
		$.actions['close-tab-to-the-right'](tab, path, -1);
	},

	'close-tab-to-the-right': function(tab, path, dir) {
		var i, n, step = (!!dir && dir < 0) ? -1 : 1;
		chrome.tabs.getAllInWindow(null, function(tabs) {
			n = tabs.length;
			for (i = 0; i < n; ++i) {
				if (tabs[i].id == tab.id) {
					chrome.tabs.remove(tabs[(i+step+n)%n].id);
					break;
				}
			}
		});
	},

	'close-all-tabs-to-the-left': function(tab, path) {
		$.actions['close-all-tabs-to-the-right'](tab, path, -1);
	},

	'close-all-tabs-to-the-right': function(tab, path, dir) {
		/* when dir < 0, remove left tabs, otherwise remove right ones */
		var i, start = dir < 0;
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (i = 0; i < tabs.length; ++i) {
				if (start && tab.id != tabs[i].id)
					chrome.tabs.remove(tabs[i].id);
				else if (start)
					break;
				else if (tab.id == tabs[i].id)
					start = true;
			}
		});
	},

	'close-other-tabs': function(tab, path) {
		chrome.tabs.getAllInWindow(null, function(tabs) {
			for (var i = 0; i < tabs.length; ++i) {
				if (tabs[i].id != tab.id) {
					chrome.tabs.remove(tabs[i].id);
				}
			}
		});
	},

        'open-link-in-new-window': function(tab, path) {
		if (!!path.initevt.srcElement.href) {
			chrome.windows.create({
				url: path.initevt.srcElement.href
			});
		}
	},

        'open-link-in-new-background-tab': function(tab, path) {
		if (!!path.initevt.srcElement.href) {
			chrome.tabs.create({
				index: tab.index + 1,
				url: path.initevt.srcElement.href,
				selected: false
			});
		}
	},

        'open-link-in-new-foreground-tab': function(tab, path) {
		if (!!path.initevt.srcElement.href) {
			chrome.tabs.create({
				index: tab.index + 1,
				url: path.initevt.srcElement.href,
				selected: true
			});
		}
	},

        'bookmark-this-link': function(tab, path, url, title) {
		url = url || path.initevt.srcElement.href;
		title = title || path.initevt.srcElement.textContent || url;

		if (!url) return;

		chrome.bookmarks.getChildren('0', function(root) {
			/* add to bookmarks bar */
			chrome.bookmarks.create({
				parentId: root[0].id,
				title: title,
				url: url
			}, function() {
				chrome.tabs.sendRequest(tab.id, {
					type: 'show-message',
					data: {
						html: 'Bookmark added',
						duration: 2
					}
				});
			});
		});
	},

        'view-image': function(tab, path) {
		if (!!path.initevt.srcElement.src) {
			chrome.tabs.create({
				index: tab.index + 1,
				url: path.initevt.srcElement.src,
				selected: true
			});
		}
	},

        'save-image': function(tab, path) {
		/* not implemented */
	},

	'bookmark-this-page': function(tab, path) {
		$.actions['bookmark-this-link'](tab, path, tab.url, tab.title);
	},

	'remove-bookmark': function(tab, path) {
		/* search by host, full url sometimes won't return results even
		 * when there are exact matches */
		var host = $.create('a', { href: tab.url }).host;
		chrome.bookmarks.search(host, function(bks) {
			for (var i = 0; i < bks.length; ++i) {
				if (bks[i].url == tab.url) {
					chrome.bookmarks.remove(bks[i].id, function() {
						chrome.tabs.sendRequest(tab.id, {
							type: 'show-message',
							data: {
								html: 'Bookmark removed',
								duration: 2
							}
						});
					});
				}
			}
		});
	},

	'reload': function(tab, path) {
		location.reload();
	},

	'skip-cache-reload': function(tab, path) {
		location.reload(true);
	},

	'stop-page-loading': function(tab, path) {
		window.stop();
	},

	'view-source': function(tab, path) {
		chrome.tabs.create({
			url: 'view-source:' + tab.url
		});
	},

	'take-screenshot': function(tab, path) {
		chrome.tabs.captureVisibleTab(null, function(url) {
			chrome.tabs.create({
				index: tab.index + 1,
				selected: true,
				url: url
			});
		});
	},

	'text-zoom-in': function(tab, path) {
		$.actions['text-zoom-reset'](tab, path, 0.01);
	},
	'text-zoom-out': function(tab, path) {
		$.actions['text-zoom-reset'](tab, path, -0.01);
	},

	/* zoom text */
	'text-zoom-reset': function(tab, path, step) {
		if (!document.zoom || isNaN(step)) document.zoom = 1;

		var zoom = document.zoom += isNaN(step) ? 0 : step;
		var css = $.get('ms-zoom-' + tab.id);

		if (1 == zoom) {
			if (!!css) document.head.removeChild(css);
		} else {
			if (!css) {
				css = $.create('style', {
					id: 'ms-zoom-' + tab.id,
					type: 'text/css'
				});
				document.head.appendChild(css);
			}
			css.textContent = '* { font-size: ' + zoom + 'em !important; }';
		}
	},

	'search-selected-text': function(tab, path) {
		if (!path.seltext) return;
		chrome.tabs.create({
			index: tab.index + 1,
			selected: true,
			url: 'http://www.google.com/search?q=' + path.seltext
		});
	},

	'mouse-stroke-options': function(tab, path) {
		chrome.tabs.create({
			url: $.OPTION_URL
		});
	}
};

/* declare functions which need to be execute locally in the content script */
$.actions['to-page-top'].local =
$.actions['to-page-bottom'].local =
$.actions['scroll-up-one-page'].local =
$.actions['scroll-down-one-page'].local =
$.actions['history-back'].local =
$.actions['history-forward'].local =
$.actions['upper-level-in-url'].local =
$.actions['increase-number-in-url'].local =
$.actions['decrease-number-in-url'].local =
$.actions['reload'].local =
$.actions['skip-cache-reload'].local =
$.actions['stop-page-loading'].local =
$.actions['text-zoom-in'].local =
$.actions['text-zoom-out'].local =
$.actions['text-zoom-reset'].local =
true;


/* the sandbox used to evaluate scripts from user defined strokes */
$.sandbox = function(_env, script) {
	/* cache global objects */
	var ex, $ = window.$, localStorage = window.localStorage,
		chrome = window.chrome, setTimeout = window.setTimeout,
		setInterval = window.setInterval;

	window.$ = window.localStorage = window.chrome = window.setTimeout = window.setInterval = null;

	try {
		(function() {
			var $ = null, localStorage = null, chrome = null,
				setTimeout = null, setInterval = null;

			eval(script);
		})();
	} catch (e) { ex = e }
	/* recover global objects */
	window.$ = $;
	window.localStorage = localStorage;
	window.chrome = chrome;
	window.setTimeout = setTimeout;
	window.setInterval = setInterval;

	return undefined === ex ? true : ex;
}

/* the i18n function */
var _ = function(msg)
{
	var i = j = 0, args = arguments, c, l = '';

	/* window.i18n is defined in locales/*.json */
	if (!!window.i18n && !!i18n[msg]) msg = i18n[msg];
	/* % is the placeholder, %% escapes % */
	for (i = 0; i < msg.length; ++i) {
		c = msg.charAt(i);
		if ('%' != c) l += c;
		else if ('%' == c && '%' == msg.charAt(i+1)) { l += c; ++i }
		else l += !!arguments[++j] ? arguments[j] : c;
	}
	return l;
}
