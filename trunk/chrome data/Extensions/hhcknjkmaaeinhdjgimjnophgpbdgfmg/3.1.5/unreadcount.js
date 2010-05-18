/**
 * Show unread count
 * @version  0.1
 * @date 2009
 * @author LudoO
 *
 * Show hidde nunread count on folder
 *
 */
GRP.unreadcount = function(prefs, langs, ID, SL, lang){
	var css = '.lhn-section-no-unread-counts .unread-count{display:inline !important}';
	GM_addStyle(css);
};