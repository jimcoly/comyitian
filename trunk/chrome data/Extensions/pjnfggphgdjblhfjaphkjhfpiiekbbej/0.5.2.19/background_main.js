var c=localStorage;function e(a,f,d){var b=new XMLHttpRequest;b.open("GET",a,false);b.onreadystatechange=function(){if(b.readyState==4&&b.status==200)f(b.responseText);else d&&d()};b.send()};/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
function g(a){if(a&&a.length>0&&a.indexOf(".")==0)c.requestDomain="http://www"+a+"/";if(!c.already_run){chrome.tabs.create({url:"options.html"});c.already_run=true}}delete c.requestDomain;e("https://www.google.com/searchdomaincheck?format=domain",g,null);
