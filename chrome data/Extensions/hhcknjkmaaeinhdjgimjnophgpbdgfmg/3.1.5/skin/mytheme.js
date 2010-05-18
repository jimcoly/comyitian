//My theme
//Customizable theme with background picture
//
GRP.mytheme = function(prefs){
    var css = GM_getValue('theme_mytheme');
    if (css) {
        GM_addStyle(css, 'rps_mytheme');
    } else {
        loadCss('skin/css/mytheme.css', function(css){
            stylish(css);
        });
    }
    function stylish(tplCss){
        var o = {
            image: prefs.theme_url || '',
            color: prefs.theme_color || '#aaa',
            bg: prefs.theme_bg || '#ffc'
        };
        var css = fillTpl(tplCss, o);
        GM_addStyle(css, 'rps_mytheme');
        //cache css
        GM_setValue('theme_mytheme', css);
    }
};
