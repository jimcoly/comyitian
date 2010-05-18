/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
var a=window,b=chrome,c="i18n",d="getMessage",e="localStorage";String.fromCharCode(160);function f(){b.tabs.create({url:"http://www.google.com/search?q=dark+matter+brown+dwarfs"});return false}function _writeMessage(h,i){document.write(b[c][d](h,i))}var g;
$(function(){$("head").append($('<link rel="stylesheet" type="text/css" href="about_'+b[c][d]("direction")+'_css.css"/>'));$("body").attr("dir",b[c][d]("direction"));$("#container").show();if(!a[e].welcome){$("#title").text(b[c][d]("qs_about_installed"));a[e].welcome="true"}document.referrer||$("#sample-query").click(f);$("#logging-optin").attr("checked",a[e].enableGen204Logging=="true");$("#logging-optin").change(function(){a[e].enableGen204Logging=$("#logging-optin").attr("checked");g&&a.clearTimeout(g);
$("#saved").fadeIn("normal");g=a.setTimeout("$('#saved').fadeOut()",5E3)})});
