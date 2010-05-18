/**
 * Open in background
 * @version  0.1
 * @date 2010
 * @author LudoO
 *
 * Open the news in a background tab
 *
 */

GRP.openbackground = function(prefs, langs, ID, SL, lang){
	var selectTab = prefs.openbackground_selectTab||false;
	
	function addButtons(el, entry, mode) {
		var text = SL.text + formatShortcut(ID, 'openback', prefs); //[Shift+V]
		addBottomLink(el, SL.keyword, text, ID, '', false, openbackground, false, entry, mode);
	}

	function openbackground(e) {
		var entry = getEntry(e);
		openEntryInNewTab(entry, selectTab);
	}

	var css = ".btn-openbackground{padding:1px 8px 1px 16px;width:14px;height:14px;background-repeat:no-repeat;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAAAXNSR0IArs4c6QAAASlQTFRFydfx+IoAGUuXy9jwydfx+IoAGUuXy9jw+IoA1N/0y9jwydfx+IoASm+RGUuXztvyy9jw+IoANV+Ly9jwydfx+IoAGUuXy9jw+IoAztvyy9jw+IoAMFyNztvyy9jw+IoALlqZztvyy9jw+IoAMFyNy9jw+IoAy9jw+IoAztvyy9jw+IoAK1iPJ1WYztvyy9jw+IoAK1iPIVGU////+Pj49/n9//XP//Wv//SX6+/65+35//Jp4+n4//E9//Az3uX48emX/+V71N/08edD093v8eY5ztn0y9jwydfxytbq4ttAws/x5LsAmrHVmbDVka7ZmqhfjJ+XjJ6A+IoAjJ1lXoXDcIlxWIHBjnkYUHSdSHO7RHG5UHJ/Qmu1Omm2QmmHKl2wIVGUGUuX+XEqGwAAAAF0Uk5TAEDm2GYAAAABYktHRACIBR1IAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAB3RJTUUH2QwREAEtlFL0+AAAAGZJREFUCNdlT0EOBCEM4k8NB80kJD148f//WXAmmd0sBy1SSgUAqvduEQdz7YM1D0vZndOc0VjF6IR8jSJruBDcdUViXfYgb2pD6cMZ+nhN+9vbGfV6lSDJYcteB91r3Jj/S/584QNxmi0RW7THUgAAAABJRU5ErkJggg==);}";
	GM_addStyle(css);
	
	registerFeature(addButtons, ID);
	
	var keycode = getShortcutKey(ID, 'openback', prefs); 
	keycode.fn = openbackground;
	initKey(keycode);
};
