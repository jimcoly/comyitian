/**
 * Google Reader Favicon ++
 * @version  4.0.3/4.1.0
 *
 *
 * Adds favicons to feeds and entries
 *
 * Original author :
 * Yamamaya
 * http://userscripts.org/scripts/show/40120
 *
 * +Google Reader Favicon ++ v1.5.0 (LudoO)
 */
GRP.favicons = function(prefs, langs, ID, SL, lang){
    var GRP_INFO = JSON.parse(GM_getValue('grp_favicons', '{}'));
    var FAVICON = GRP_INFO.icon || (GRP_INFO.icon = {});
    updateFavicons();
    var protocol = document.location.protocol;
    var FAVICON_TPL_URL = protocol + '//s2.googleusercontent.com/s2/favicons?alt=feed&domain=';
    var FAVICON_TPL_DEF_URL = protocol + '//s2.googleusercontent.com/s2/favicons';
    if (prefs.favicons_providerpageicons) {
        FAVICON_TPL_URL = 'http://pageicons.appspot.com/favicons?f=1&url=';
        FAVICON_TPL_DEF_URL = 'http://pageicons.appspot.com/favicons';
    }
	//FAVICON_TPL_URL = 'http://getfavicons.appspot.com?domain=';
	
    //var LOADING_IMAGE = "chrome-extension://'+GUID_CORE+'/images/loading.gif";
    var LOADING_IMAGE = GRP.IMAGES_PATH+"/loading.gif";
	
    var RSS = getElements('id("sub-tree-item-0-main")/ul/li/ul/li').length;
    var FOLDER = getElements('id("sub-tree-item-0-main")/ul/li').length;
    var RSS_NUMBERS = GRP_INFO.rss || null;
    var FOLDER_NUMBERS = GRP_INFO.dirs || null;
	
    function init(){
        if (true || isObjectEmpty(FAVICON) || RSS_NUMBERS === null || FOLDER_NUMBERS === null || RSS !== RSS_NUMBERS || FOLDER !== FOLDER_NUMBERS) {
            loadFavicons();
        } else {
            initFavicons();
        }
        GRP_INFO.rss = RSS;
        GRP_INFO.dirs = FOLDER;
        setValue();
    }
    
    function loadFavicons(){
        //clearCache();
        chrome.extension.sendRequest(
        {
            message: "loadicons",
            method: 'get',
            url: protocol + '//www.google.com/reader/subscriptions/export',
            FAVICON_TPL_URL: FAVICON_TPL_URL
        }, function(a){
            if (a.FAVICON) {
                FAVICON = a.FAVICON;
                updateFavicons();
            }
            initFavicons();
            setValue();
        });
    }
    
    function initFavicons(){
        if (!prefs.favicons_sidebaronly) {
            registerFeature(addFaviconEntry, ID, 
            {
                onlistviewtitle: true
            });
        }
        initCatchSidebars(addFaviconSidebar, 'sidebar-favicons');
    }
    
    function addFaviconEntry(el, entry, mode){
        if (isTagged(entry, 'tfavicon')) {
            //stop entry was already scanned
            return;
        }
        
        var icon = document.createElement('img');
        icon.className = 'entry-favicon grf-favicon grf-entry';       
        var siteTitle = getEntrySiteTitle(entry);
        var match = ellipsis(siteTitle);
        
        icon.title = match;
        
        var t = FAVICON[match];
        if (t) {
            icon.src = t.icon;
        } else { // popular items | recommended sources
            var fs = entry.getElementsByClassName('entry-original')[0] ||
            entry.getElementsByClassName('entry-title-link')[0];
            if (fs) {
                fs = FAVICON_TPL_URL + getDomain(fs.href);
                icon.src = fs;
            } else {
                icon.src = FAVICON_TPL_DEF_URL;
            }
        }
        
        var point;
        if (mode === "expanded") {
            var entryTitle = getFirstElementByClassName(entry, 'entry-title');//h2
            insertFirst(icon, entryTitle);
        } else {
            var entrySourceTitle = getFirstElementByClassName(entry, 'entry-source-title');//span
            insertBefore(icon, entrySourceTitle);
        }
        
        
        //icon.removeEventListener('error', revertFavicon, false);
        //icon.addEventListener('error', revertFavicon, false);
    
    }
    function addFaviconSidebar(el, mode){
        if (isTagged(el, 'tfavicon')) {
            //stop entry was already scanned
            return;
        }
        
        var elsubicon = getFirstElementByClassName(el, 'sub-icon');//span
        var title = elsubicon.nextSibling;
        var match = ellipsis(title.firstChild.textContent);
        title.style.paddingLeft = '7px';
        var icon = document.createElement('img');
        icon.className = 'grf-favicon grf-sidebar';
        icon.title = match;
        elsubicon.parentNode.insertBefore(icon, elsubicon);
        elsubicon.parentNode.removeChild(elsubicon);
		
		function setIcon(match){
			//console.log('setIcon:'+match);
			//var t = findFaviconByTitle(FAVICON, match);
			var t = FAVICON[match];
			if (t) {
				icon.src = t.icon;
			} else {
				icon.src = FAVICON_TPL_DEF_URL;
			}
		}
		var tim= (hasClass(el, 'unread')) ?0:2000;
		window.setTimeout(function(){
			setIcon(match);
		}, tim);
        //icon.removeEventListener('error', revertFavicon, false);
        //icon.addEventListener('error', revertFavicon, false);
    }
    
    
    function renderFavicons(url, title, icon){
        var match = ellipsis(title);
        //var tree = document.getElementById('sub-tree');
        //var main = document.getElementById('main');
        getElements(".//img[@title='" + match + "']").forEach(function(img){
            img.src = icon;
        });
    }
    
    //Override with manual favicons
    function updateFavicons(){
        var domains = prefs.favicons_domains;
        if (!domains || !FAVICON) {
            return;
        }
        for (var key in FAVICON) {
            var f = FAVICON[key];
            var icon = domains[f.url];
            if (icon) {
                f.icon = icon;
            }
        }
    }
    /*
     function revertFavicon(event){
     this.src = FAVICON_TPL_DEF_URL;
     }
     */
    function findFaviconByTitle(FAVICON, title){
        return find(FAVICON, 'title', title);
    }
    
    function setValue(){
        GRP_INFO.icon = FAVICON;
        GM_setValue('grp_favicons', JSON.stringify(GRP_INFO));
    }
    
    function clearCache(){
        GM_setValue('grp_favicons', '');
    }
    
    function attachMenu(){
        var me = this;
        document.body.addEventListener('DOMNodeInserted', function(e){
            var target = e.target;
            if (!target.grfm && target.className && target.className.indexOf("goog-menu") >= 0) {
                target.grfm = "1";
                target.addEventListener('DOMNodeInserted', function(e){
                    var node = e.target;
                    if (target.grfm !== "2") {
                        setTimeout(function(){
                            showMenuItem(target, me);
                        }, 500);
                        target.grfm = "2";
                    }
                }, false);
            }
        }, false);
    }
    function showMenuItem(menu, scope){
        if (!menu) {
            return;
        }
        // find first separator
        var seps = menu.getElementsByClassName('goog-menuseparator');
        if (seps && seps.length > 0) {
            var sep = seps[0];
            var div = document.createElement('div');
            div.className = 'goog-menuitem goog-option grf-menuitem';
            div.style = '-webkit-user-select: none;';
            div.innerHTML = '<div class="goog-menuitem-content">' + SL.getfavicon + '</div>';
            sep.parentNode.insertBefore(div, sep.nextSibling);// insert after
            // +separator
            var separator = document.createElement('div');
            separator.className = 'goog-menuseparator';
            separator.style = '-webkit-user-select: none;';
            div.parentNode.insertBefore(separator, div.nextSibling);
            
            var me = this;
            div.addEventListener('click', function(e){
                var node = document.getElementsByClassName('menu-open')[0];
                if (node) {
                    var img = node.firstChild;// grf-favicon
                    // grf-sidebar
                    var key = '';
                    if (img.tagName === "IMG") {
                        key = img.title;
                    } else {
                        // img not there, used 2nd span.name/@title
                        key = img.nextSibling.title;
                    }
                    var f = FAVICON[key];
                    if (!f) {
                        //try to get url+title
                        var nameText = getFirstElementByClassName(node, 'name-text');//span
                        if (nameText) {
                            f = 
                            {
                                url: unescape(node.href.replace('/^https?\/\/www\.google\.com\/reader\/view\/feed\/', '')),
                                title: ellipsis(nameText.innerText)
                            };
                            
                            FAVICON[key] = f;
                        }
                    }
                    if (f) {
                        img.src = '';
                        img.src = LOADING_IMAGE;
                        chrome.extension.sendRequest(
                        {
                            message: "geticon",
                            key: key,
                            FAVICON: FAVICON
                        }, function(a){
                            if (a.icon) {
                                if (a.FAVICON) {
                                    FAVICON = a.FAVICON;
                                    updateFavicons();
                                }
                                renderFavicons(a.url, a.title, a.icon);
                                setValue();
                            } else {
                                alert('Error: Cannot found favicon for "' + a.title + '"');
                            }
                        });
                        // ->iconget
                    } else {
                        var msg = formatText(SL.notfoundicon, key);
                        alert(msg);
                    }
                }
                // hide menu
                menu.blur();
                node.focus();
            }, false);
            div.addEventListener('mouseover', function(e){
                e.target.parentNode.className += ' goog-menuitem-highlight';
            }, false);
            div.addEventListener('mouseout', function(e){
                e.target.parentNode.className = e.target.parentNode.className.replace('goog-menuitem-highlight', '');
            }, false);
        }
    }
    
    var css = "img.entry-favicon{ width:16px !important; height:16px !important; border:none !important; margin-right:5px}.collapsed img.entry-favicon{ position:absolute !important; top:3px !important; left:1.6em !important; margin-right:0px !important; vertical-align:baseline !important}#entries.list .collapsed .entry-main .entry-source-title{ left:3.25em !important; width:9em !important}#sub-tree a img{ width:16px; height:16px; border:none; vertical-align:middle}#entries.list .collapsed .entry-secondary{ margin:0 8.5em 0 14em !important}#entries.single-source .collapsed .entry-source-title{ display:block !important}.colorful-view-content{ color:#EEE !important}.colorful-view-base-top-shadow{ background-color:#999 !important; border-bottom-color:#888 !important}.colorful-view-inner-box{ background-color:#777 !important; background:#F9F9F9 none repeat scroll 0 0 !important; border-color:#888 !important}.colorful-view-base-pos{ background-color:#777 !important; border-color:#888 !important}";
    css += '.samedir #entries.single-source .collapsed div.entry-secondary{margin-left:14em !important;}';
    //css+= "#entries.list .read .collapsed{opacity:0.6}#entries.list .entry .collapsed:hover{background:#C2CFF1}#entries.list .read .collapsed:hover{opacity:1.0;background:#C2CFF1}";
    GM_addStyle(css);
    
    attachMenu();
    init();
    
};


