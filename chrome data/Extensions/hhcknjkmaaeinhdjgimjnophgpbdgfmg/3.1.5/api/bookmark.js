/**
 * bookmark API
 * 
 * Merge with native SendTo
 */
GRP.api_bookmark = function(prefs, langs, script, api){
	var SL = langs.bookmark;
	SL = apply(SL, langs[script]);
	
	
	GM_xmlhttpRequest({
    		method: 'POST',
    		url: api.add,
			data: {
				q: url,
				title: title,
				labels: labels,
				annotation: notes
			}
	});
	
};
	
