//Calibri skin
//Author: dave kratter
//http://code.google.com/p/googlereaderplus/issues/detail?id=162
GRP.calibri = function() {
	var css = "*, html, body, span, div, td, br, input, font, button, select, option {font-family: Calibri !important; font-size: 10pt !important;} #viewer-top-controls, #chrome-header {padding: 2px 0 2px 5px !important;} #chrome {margin-left: 199px !important;} #entries .entry-body, #entries .entry-title {max-width: none !important;  padding-right: 1px !important;} .entry :hover {background: #FFFBF0 !important;} #entries .collapsed {padding: 2px !important; font-size: 12pt !important;} #nav-toggler {display: none !important;} #nav {font-size: 8pt !important; width: 199px !important;} #selectors-container {width: 199px !important;} #sub-tree {width: 199px !important;} #add-box {font-size: 8pt !important; margin: 1px !important;} #selectors-box, #sub-tree-box {margin: 1px !important;} #friends-settings-link {display: none !important;} #sub-tree .name {color: #0000cc !important;}";
	GM_addStyle(css, 'rps_calibri');
};