/**
 * FitHeight 
 * @version  0.1
 * @date 2009
 * @author LudoO
 *
 * Fit entry height
 *
 */
GRP.fitheight = function(prefs, langs, ID, SL, lang){
	var locked=false;
	if (prefs && prefs.fitheight_locked) {
		locked = prefs.fitheight_locked;
	}

	function fitHeight(btn, entry, locked){
		var active = isActive(btn, entry, ID, locked);
		//TODO: replace 'fit-height-on' with 'fitheight'
		addClassIf(entry, 'fit-height-on', active);
		
		if (!locked) {
			jump(entry, true);
		}
	}	
	
	function addButton(el, entry, mode) {
		var text = SL.text + formatShortcut(ID, 'fit', prefs); //[f]
		addBottomLink(el,SL.keyword, text, ID, '', true, fitHeight, false, entry, mode);
		if (locked){
			fitHeight(el, entry, true);
		}
	}

	function fitHeightKey() {
		onKey('btn-fitheight', fitHeight);
	}
	
	var he = getHeightEntries()-2;	

	var css = " .read.fit-height-on .entry-body{ display:block !important; max-height: "+he+"px !important; overflow-y:auto;}";
	css += ".fit-height-on .entry-likers{display:none;}";
	GM_addStyle(css);
	
	registerFeature(addButton, ID);
	var keycode = getShortcutKey(ID, 'fit', prefs); //70 f
	keycode.fn = fitHeightKey;
	initKey(keycode);
};
