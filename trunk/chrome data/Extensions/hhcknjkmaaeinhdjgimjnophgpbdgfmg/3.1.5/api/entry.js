/**
 * API for entry
 *
 */
GRP.api_entry = function(prefs, langs, ID, SL, lang, edata){
    var locked = getPref('locked');
	var include = getPref('include');//CRUD for include/exclude
	var rx = getRegex(getPref('filter'));
	
	function getPref(name){
		if (prefs && prefs[ID + '_' + name]) {
			return prefs[ID + '_' + name];
		}else{
			return false;
		}
	}
	
    function addButton(el, entry, mode){
        var text = (SL.text || ID) + formatShortcut(ID, edata.action, prefs); //[x]
        addBottomLink(el, SL.keyword || ID, text, ID, '', true, filterize, locked||include, entry, mode);
    }
	
	function filterize(btn, entry, lcked, e){
        if (typeof e === "undefined") {
			//auto
			if (locked) {
				if (filterEntry(entry, rx)) {
					//In exclusion list
					return false;
				}
			}
			if (include) {
				if (!filterEntry(entry, rx)) {
					//Not in inclusion list
					return false;
				}
			}
		}
		var active = isActive(btn, entry, '', locked);
		if (edata.cb){
			edata.cb(entry, active, btn, e);
		}
	}
	
    function addKey(e){
        var entry = getEntry(e);
        filterize('btn-' + ID, entry);
    }
    if (edata.css) {
        var css;
        if (edata.css.code) {
            css = edata.css.code;
        } else if (edata.css.image) {
            //http://images.google.com/images/isr_c.gif
            css = ".btn-" + ID + " {margin-left: 4px;padding: 1px 8px 1px 16px;;width:14px;height:14px;background-repeat:no-repeat;}";
            if (edata.css.image.url) {
				css += ".background-image:url(" + edata.css.image.url + ");";
			}else if (edata.css.image.base64) {
				css += ".background-image:url(data:image/png;base64," + edata.css.image.base64 + ");";
			}
            css += "}";
        }
        if (css) {
            GM_addStyle(css);
        }
    }
    registerFeature(addButton, ID);
    var keycode = getShortcutKey(ID, edata.action, prefs); //88//x
    if (keycode) {
        keycode.fn = addKey;
        initKey(keycode);
    }
};
