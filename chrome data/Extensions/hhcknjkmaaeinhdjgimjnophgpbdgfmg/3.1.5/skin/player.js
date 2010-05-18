/**
 * Experimental Player theme 
 * 
 * based on the Google Player http://www.google.com/reader/play/
 * 
 * Author: 	Ludovic Valente
 * Version:	0.2
 * Date:	03/25/2010
 */

GRP.player = function(){
    var taskcce,lastEntry,lastThumb;
	var playerOn = true,itl = 0,entries = get_id('entries');
	
	//Expanded mode ONLY
	var mode = getMode();
    if (mode!=='expanded') {
		simulateClick(get_id('view-cards'));
	}
	
	var css = 'body{background: black;}';

	var h = getHeightEntries(true);
    //css += 'div#current-entry{display:inline;height:100%;position:absolute!important;width:100%;top:0px;z-index:10;visibility:visible!important;}';
	css += 'div.current{display:inline;height:'+h+'px;position:fixed!important;width:99%;top:0px;z-index:10;visibility:visible!important;}';
    
    //adapt main when nav is on
    css += 'body:not(.lhn-hidden) table#chrome-viewer-container{width:auto !important;}';
    
    //background black
    css += 'div#entries .entry{visibility:hidden;background-color:black;}';
    css += 'div.entry-likers, #no-entries-msg{background-color:black;}';
    css += 'div#entries, div#entries .entry, div#viewer-container, div.entry-container .entry-body{color:#999!important;}';
    //text color and size
    css += 'div.card-common,div#viewer-container{color:white;background-color: black;}';
    css += '.card{border-color:transparent!important; border-width:0px !important;-webkit-box-shadow:0px 0px black!important;box-shadow:10px 10px 20px black!important;}';
    css += 'a.entry-title-link{color:white !important;text-decoration: none;}';
    css += 'a,a:visited,.link{color: #AAA !important;}';
    css += '#chrome-header,#lhn-add-subscription-section{display:none;}';
    css += '#search,#gbh,#logo-container{display:none !important;}';
    css += 'div#main{top:0px;}';
    css += '#viewer-page-container{height:200px!important;}';
    css += '#entries, #viewer-page-container{overflow:hidden!important;}';
    css += '.scroll-tree li, .lhn-section{background-color:#AAA !important;}';
    css += '.scroll-tree li a:hover, a:hover .tree-item-action-container, .scroll-tree li a.menu-open, #lhn-selectors .selector:hover{background-color:#DDD !important;}';
    
	//arrows
	css += '#entries-up,#entries-down{display:none;}';
    //css += '#entries-up{left:0px;}#entries-down{right:0px;}';
    //css += '#entries-up,#entries-down{z-index:9999;color: #AAA;cursor: pointer;font-size: 200%;font-weight: bold;height: 64px;line-height: 58px;margin-top: -32px;position: fixed;text-align: center;top: 50%;width: 32px;}';
	
    //Can scroll long articles
    //css += '.entry-body{overflow:auto;}';
    css += '.entry{overflow:auto;}';
    
    //hide entry items
    css += '#gbar, #entries-status, .card-actions, .card-bottom{display:none;}';
    //hide nav
    css += '#chrome{margin-left:0px !important;}';//#chrome-lhn-toggle
    //TIMELINE
    css += '#viewer-footer{background-color: #222 !important;}';
    css += '#timeline{background-color: #222;margin-left:30px;}';
    var w = screen.width - 100;
    css += '#timeline{overflow:hidden;width:' + w + 'px;}';
    css += '#tl-items{padding:2px;}';
    css += '.tl-item{float:left;width:80px;height:80px;border:2px solid #acacac;margin:10px;opacity: 0.6;cursor: pointer;}';
    css += 'div.tl-item-sel{opacity:1;border:2px solid #dedede;}';
    css += '.tl-img{width: 80px; height: 80px; margin-top: 0px; margin-left: 0px;}';
    css += '.tl-ico{position: relative;bottom: 20px;left: 65px;}';
    css += '.tl-arrow{cursor:pointer;color: #DEDEDE;font-size: 300%;position: absolute;bottom:50px;z-index: 9999;}';
    css += '#tl-arrow-left{left:0px;}#tl-arrow-right{right:0px;}';
    css += '#viewer-footer{height:120px!important;padding-top:40px;}';
    
    //header timeline
    css += '.entry-date{position:fixed;right:0px;bottom:130px;font-size:23px!important;}';
    css += 'b.gb4{position:fixed;right:300px;bottom:130px;color:#aaa;z-index:99;font-size:23px!important;}';
    
    //Show unread counter
    //css += '#viewer-header{display:none;}';//let viewer-all-new-links be displayed
    css += '#viewer-comments-all-links, #mark-all-as-read-split-button, #viewer-header .goog-button, #viewer-toggles, #viewer-allcomments-return, #viewer-recommendations-return, #viewer-translated-by, #viewer-single-parent, #viewer-single-item-parent, #viewer-details-toggle {display:none;}';
    css += '#quick-add-success, #viewer-details {display:none;}div#viewer-top-controls{padding:0;}';
    css += '#viewer-all-new-links{position:fixed;left:10px;bottom:130px;color:#aaa;z-index:99;font-size:15px!important;}';
    
    GM_addStyle(css, 'rps_player');
    
    var csst = '#navdebug{cursor:pointer;position:fixed;right:10px;bottom:10px;color:#aaa;z-index:99;font-size:23px!important;}';
    GM_addStyle(csst, 'rps_playert');
    
    
    //nav hidden on load
    addClass(document.body, 'lhn-hidden');
    
/*    var body, gup = document.getElementById('entries-up'), gdown = document.getElementById('entries-down');
    if (gup) {
        body = getFirstElementByClassName(gup, 'goog-button-body');
        body.innerText = '◀';
    }
    if (gdown) {
        body = getFirstElementByClassName(gdown, 'goog-button-body');
        body.innerText = '▶';
    }
  */
   
    function createArrow(root, left){
        var el = document.createElement('div');
        el.id = (left) ? 'tl-arrow-left' : 'tl-arrow-right';
        el.className = 'tl-arrow';
        el.innerText = (left) ? '◀' : '▶';
        el.addEventListener('click', function(e){
			scrollpage(left, 1);
        });
        root.appendChild(el);
    }
    
    var vf = document.getElementById('viewer-footer');
    
    //Toggle skin
    var navdebug = document.createElement('div');
    navdebug.id = 'navdebug';
    var eltoggle = document.createElement('a');
    eltoggle.innerText = '#';
	eltoggle.title = 'Toggle skin';
    eltoggle.addEventListener('click', function(e){
        var el = get_id('rps_player');
        if (el) {
            el.parentNode.removeChild(el);
        } else {
            GM_addStyle(css, 'rps_player');
        }
        playerOn = !el;
    });
    navdebug.appendChild(eltoggle);
    vf.appendChild(navdebug);
	
    createArrow(vf, true);
    
    var timeline = document.createElement('div');
    timeline.id = 'timeline';
    var timelineItems = document.createElement('div');
    timelineItems.id = 'tl-items';
    timeline.appendChild(timelineItems);
	timeline.addEventListener('mousewheel', function(e){
		timeline.scrollLeft-=event.wheelDelta/2;
		if (((timeline.scrollLeft + timeline.clientWidth) / timeline.scrollWidth) > 0.5) {
			scrollNext();
		}
	});
	
    vf.appendChild(timeline);
    
    createArrow(vf, false);
    
    function checkCurrentEntry(){
        if (!playerOn) {
            return;
        }
		var current = getCurrentEntry();
        if (!current) {
            current = getFirstElementByClassName(document, 'entry');
        }
        if (current) {
            if (!lastEntry || lastEntry !== current) {
                selectEntry(current, true);
				/*if (lastEntry){
					removeClass(lastEntry, 'current');
				}
				addClass(current, 'current');
				console.log('Detect change current from '+((lastEntry)?lastEntry.className:'undef')+' to '+current.className);
				selectThumb(current);
                adaptSize(current);
                lastEntry = current;*/
            }
        }
    }
    
    function scrollNext(){
		entries.scrollTop = entries.scrollHeight;
		window.setTimeout(function(){
			entries.scrollTop = 0;
		}, 300);
    }
    
    function selectEntry(entry, selThumb){
        //if (entry && entry.id !== 'current-entry'){
		if (entry){
			if (lastEntry){
				removeClass(lastEntry, 'current');
			}
			//console.log('selectEntry:'+entry.className)
			/*var current = getCurrentEntry();
            if (current) {
                current.removeAttribute('id');
            }*/
			addClass(entry, 'current');
            //entry.id = 'current-entry';
            if (selThumb) {
                //console.log('selectEntry+selThumb');
				selectThumb(entry);
            }
            simulateClick(entry);//mark as read
            adaptSize(entry);
			lastEntry = entry;
        }
    }
	
	function getEntryIndex(entry){
		var index=false, m = /tl-entry-(\d+)/.exec(entry.className || '');
            if (m && m[1]) {
				index = parseInt(m[1], 10);
			}
			return index;
	}
	function getThumbIndex(entry){
		var index=false, m = /tl-item-(\d+)/.exec(entry.id || '');
            if (m && m[1]) {
				index = parseInt(m[1], 10);
			}
			return index;
	}	
	
	function getThumb(index){
		return get_id('tl-item-' + index);
	}
    
    function selectThumb(entry, elThumb){
		//console.log('selectThumb');
		if (lastThumb) {
            removeClass(lastThumb, 'tl-item-sel');
        }
        if (elThumb) {
            selectEntry(entry);
			var i = getThumbIndex(elThumb);
			scrollThumb(i);
        } else {
            //get thumb from entry id
            var index = getEntryIndex(entry);
			//console.log('index from entry:'+index)
            if (index) {
                elThumb=getThumb(index);
				console.log('elThumb from index:'+elThumb.className);
                //center on screen
                scrollThumb(index);
            }
        }
        if (elThumb) {
            addClass(elThumb, 'tl-item-sel');
            lastThumb = elThumb;
        }
    }
    
    
    function scrollpage(left, count){
        if (!left) {
			scrollNext();
		}
		
	    var current = getCurrentEntry();
		var index = getEntryIndex(current);
        index += ((left)?(-1):1)*count;

        var el = getThumb(index);
		if (el) {
			simulateClick(el);
		}
    }
    
    function scrollThumb(index){
        var vf = get_id('viewer-footer');
        //scroll(timeline, (index * 80) - (vf.clientWidth / 2));
		
		var el = get_id('tl-item-'+index);
		var value = (el)?el.offsetLeft:(index * 80);
		scroll(timeline, value - (vf.clientWidth / 2) + 40 );
    }
    function scroll(el, value, inc, time){
		//value=Math.min(Math.max(0,value),el.scrollWidth);
		//el.scrollLeft = value;
		var dir = (el.scrollLeft < value);
		scr(el, value, dir, inc || 2, time || 40);
	}
    function scr(el, value, dir, inc, time){
        //console.log('scroll from ' + el.scrollLeft + ' to ' + value);
        el.scrollLeft += ((dir)?1:-1)*inc ;
        //console.log('new value = '+ el.scrollLeft);
        if ((dir && el.scrollLeft < value) || (!dir && el.scrollLeft > value)) {
            window.setTimeout(function(){
                scr(el, value, inc, time);
            }, time);
        } else {
            el.scrollLeft = value;
        }
    }
    
    function forceSelectEntry(){
        var current = getCurrentEntry();
        if (!current) {
            var entry = getFirstElementByClassName(document, 'entry');
            selectEntry(entry, true);
        }
    }
    
    var heightEntries = getHeightEntries();
    
	function start(){
	 	//console.log('start monitor checkCurrentEntry');
		taskcce = window.setInterval(function(){
       	   checkCurrentEntry();
    	}, 500);
	}
	//start();
	function stop(){
		//console.log('stop monitor checkCurrentEntry');
		window.clearInterval(taskcce);
	}
	
    window.setInterval(function(){
        fillTimeline();
    }, 2000);

    
    function resetTop(entry){
		entry.parentNode.scrollTop = 0;//entries top=0
	}
	
    function adaptSize(entry){
        resetTop(entry);
        var eb = entry.firstChild;//card-common
        eb.style.fontSize = "200%";
        for (var c = 200; c > 80 && eb.offsetHeight > heightEntries; c -= 10) {
            eb.style.fontSize = c + "%";
        }
    }
    function findImage(images, width, minWidth){
        for (var i = 0, len = images.length; i < len; i++) {
            if (images[i].width >= width) {
                if (!minWidth || (minWidth && images[i].width >= minWidth)) {
                    return images[i].src;
                }
            }
        }
        return images[0].src;
    }
    
    function fillTimeline(){
        var entriesContainer = get_id('entries');
        var entry0 = entriesContainer.firstChild;
        if (!entry0) {
            fireResize();
        } else if (entry0 && !hasClass(entry0, 'tl-marked')) {
            //clear timeline if change folder
            timelineItems.innerHTML = '';
        }
        //getElements("id('entries')/div[contains(@class, 'entry')][not(contains(@class, 'tl-marked'))]")
        var entries = entriesContainer.getElementsByClassName('entry');
        timelineItems.style.width = (entries.length * 100 + 120) + 'px';
        foreach(entries, function(entry){
            if (hasClass(entry, 'tl-marked')) {
                return;
            }
            var link = getEntryLink(entry);
            var title = link.title || '';
            var eb = getFirstElementByClassName(entry, 'entry-body');
            var img = '', images;
			if (eb) {
				images = eb.getElementsByTagName('img');
				if (images && images[0]) {
					img = findImage(images, 80, 30);
				}
			}
            if (!img) {
                img = '/reader/ui/1327928375-explore-default-thumbnail.png';
            }
            var domain = getDomain(link.url);
            var el = document.createElement('div');
            el.className = 'tl-item';
            el.id = 'tl-item-' + itl;
            addClass(entry, 'tl-entry-' + itl);
            ++itl;
            var html = '<img class="tl-img" title="' + title + '" src="' + img + '" width="78" height="78"/><img src="http://s2.googleusercontent.com/s2/favicons?domain=' + domain + '" class="tl-ico" width="16" height="16"/>';
            el.innerHTML = html;
            el.addEventListener('click', function(e){
                scrollNext();
				selectThumb(entry, el);
            });
            timelineItems.appendChild(el);
            addClass(entry, 'tl-marked');
        }, this);
    }
    
    
};
