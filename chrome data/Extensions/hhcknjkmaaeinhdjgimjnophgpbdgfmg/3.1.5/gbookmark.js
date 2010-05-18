/*
 * 
 * Google Reader + Bookmarks
 * 
 * http://userscripts.org/scripts/show/6497
 * 
 * JohnM 
 * Aug 8, 2007
 * 
 */
GRP.gbookmark = function(prefs, langs, ID, SL, lang){
    var api = {
        add: 'http://www.google.com/bookmarks/mark'
	};
    GRP.api_bookmark(prefs, langs, 'gbookmark', api);
};


