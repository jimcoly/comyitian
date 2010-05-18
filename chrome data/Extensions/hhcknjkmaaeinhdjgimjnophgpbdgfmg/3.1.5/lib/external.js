/**
 * @author Valente
 */
//*************** CORE ************************
//prod: hhcknjkmaaeinhdjgimjnophgpbdgfmg
//home crx : njidamgjohnfbkeagfbnkllfkdnlpjhi
//debug : cmkepfncdncbdpmdfnkbpenhfbmmnebm

//*************** ICON ************************
//prod: ecpcafinfpjgabomoamkhkgnpgpmdmeo
//home crx : aencokegfecfkpckmiklpcklhdblkdgj
//unpacked : lomblngfikeinenjgnkcnhbdgchkaeai

var GUID_CORE = 'hhcknjkmaaeinhdjgimjnophgpbdgfmg';
var GUID_ICON = 'ecpcafinfpjgabomoamkhkgnpgpmdmeo';
var env = '';
if (env && env == 'home') {
	//GUID_CORE = 'njidamgjohnfbkeagfbnkllfkdnlpjhi';
	GUID_ICON = 'aencokegfecfkpckmiklpcklhdblkdgj';
} else if (env && env == 'unpacked') {
	//GUID_CORE = 'cmkepfncdncbdpmdfnkbpenhfbmmnebm';
	GUID_ICON = 'lomblngfikeinenjgnkcnhbdgchkaeai';
}
GUID_CORE = getGUID();
var LOCALPATH = 'chrome-extension://'+GUID_CORE;

function call_icon(message, options, callback){
	external_call(GUID_ICON, message, options, callback);
}
function call_core(message, options, callback){
	external_call(GUID_CORE, message, options, callback);
}
function external_call(guid, message, options, callback){
    var emptyFn = function(){
    };
    chrome.extension.sendRequest(guid, 
    {
        message: message,
        options: options || {}
    }, callback || emptyFn);
    //console.log('send "' + message + '" on ' + guid);
	//console.log(options);
}
function getGUID(){
	var url = chrome.extension.getURL('bg.html');
	var m = /:\/\/(\w+)/.exec(url);
	return m[1];
}
