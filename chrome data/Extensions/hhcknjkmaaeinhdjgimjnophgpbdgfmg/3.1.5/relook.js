//relook custom theme

GRP.relook = function(prefs, langs, ID, SL, lang){

	if (prefs.relook_css) {
		var css = prefs.relook_css.replace(/\n/g, '').replace(/\t/g, ' ').replace(/\/\*.*?\*\//g, '');
		GM_addStyle(css, 'rps_relook');
		if (prefs.relook_resize){
			fireResize();
		}
	}
};