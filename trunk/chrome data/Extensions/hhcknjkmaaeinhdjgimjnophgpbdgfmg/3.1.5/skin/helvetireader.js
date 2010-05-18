/*
 * Helvetireader
 */
GRP.helvetireader = function() {	
	//helvetireader v2
	var url= 'http://www.helvetireader.com/css/helvetireader.2.css';
	GM_addCss(url, 'rps_helvetireader2');
	
	//custom changes for colorful listview conflict
	var css = '#chrome-header{background-color:#33333!important;}';
	GM_addStyle(css, 'rpsfix_helvetireader2');
	
	fireResize();
};