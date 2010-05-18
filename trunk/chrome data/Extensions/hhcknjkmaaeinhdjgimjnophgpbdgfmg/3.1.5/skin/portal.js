//Portal theme

GRP.portal = function() {
	var w = Math.max(100,Math.round((getWidthEntries()-50)/2));
	var css = '.entry{float:left;width:'+w+'px;padding:2px!important;}.card-common{margin:0;}.entry .entry-title {font-size:100%!important;}.entry .card-bottom,.entry-author,.entry-date{display:none;}#scroll-filler{float:left;}';
	GM_addStyle(css, 'rps_portal');
	
	//fireResize();
};