/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
var idscs_=document;String.fromCharCode(160);(function(){function c(){var a=/https?:\/\/(?:.+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?(?:\:[0-9]+)?\/url.*[?&]ei=([^&]+)/;a=idscs_.referrer.match(/https?:\/\/(?:.+\.)?google\.[a-z]{2,3}(?:\.[a-z]{2})?(?:\:[0-9]+)?\/search.*[?&]q=([^&]+)/)||idscs_.referrer.match(a);var b;if(idscs_.referrer){if(a)b=decodeURIComponent(a[1].replace(/\+/g," "))}else b="";b!=null&&chrome.extension.connect({name:"landing-page"}).postMessage({href:idscs_.location.href,subkey:b})}if(!window["qs-in-document"]){window["qs-in-document"]=
true;c()}})();
