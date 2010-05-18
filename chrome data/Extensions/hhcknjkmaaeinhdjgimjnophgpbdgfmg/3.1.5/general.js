/**
 * General configuration
 * @version  0.1
 * @date 2010
 *
 */
GRP.general = function(prefs, langs, ID, SL, lang){
    var CLS_CURRENT = 'grp_current';
    if (prefs.general_secure) {
        if (/^http\:/.test(window.location.href)) {
            window.location.href = window.location.href.replace(/^http\:/, 'https:');
        }
    }
    if (prefs.general_topcurrent) {
        var entries = get_id('entries');
        function updateSpacer(){
            var scrollspacer = get_id('scrollspacer');
            if (!scrollspacer) {
                var h = getHeightEntries();//screen.height
                scrollspacer = dh(entries, 'div', {
                    id: 'scrollspacer',
                    html: '&nbsp;'
                });
                scrollspacer.style.height = h + 'px';
            }
        }
        updateSpacer();
        var cur, oldcur;
        window.setInterval(function(){
            cur = get_id('current-entry');
            //check if current entry hans changed!
            if (cur && !hasClass(cur, CLS_CURRENT)) {
                updateSpacer();
                oldcur = getFirstElementByClassName(entries, CLS_CURRENT);
                if (oldcur) {
                    removeClass(oldcur, CLS_CURRENT);
                }
                addClass(cur, CLS_CURRENT);
                entries.scrollTop = cur.offsetTop;
            }
        }, 500);
    }
	
    function floatactions(){
        //Remove #entries.list .entry .entry-actions {left:0px;}
        var ss = findre(document.styleSheets, 'href', /en-scroll\.css/);
        if (ss) {
            var rule = find(ss.cssRules, 'selectorText', '#entries.list .entry .entry-actions');
            if (rule) {
                rule.style.left = '';
            }
        }
        var main = get_id('main');
        var top = main.offsetTop; //getStyle(main, 'top');
        top = Math.max(142, top + 77);
        //ig    : main.top=140 top=217 (+77)
        //normal: main.top=65  top=142 (+77)
        var css = '.entry:not(#current-entry) .card-actions{display:none}#current-entry .card-actions,#entries.list #current-entry .entry-actions{position:fixed;right:32px!important;top:' + top + 'px!important;left:!important;width:140px;z-index:9999;-webkit-box-shadow:#E3E5EB 0 1px 1px;border-bottom-left-radius:5px 5px;border-bottom-right-radius:5px 5px;border-top-left-radius:5px 5px;border-top-right-radius:5px 5px;border:2px solid #68E;opacity:0.2}#current-entry .card-actions:hover,#entries.list #current-entry .entry-actions:hover{opacity:1}#current-entry .entry-main{margin-right:140px}#current-entry .entry-actions > span,#entries.list #current-entry .entry-actions > span{display:block}';
        GM_addStyle(css, 'rps_floatactions');
    }
    if (prefs.general_floatactions) {
        runfn(floatactions, 'floatactions', 99, 2000);
        //defer to get right #main.top
    }
};
