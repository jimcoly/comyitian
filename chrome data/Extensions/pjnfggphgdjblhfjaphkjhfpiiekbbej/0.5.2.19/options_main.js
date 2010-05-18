var d=document;function f(a,c,e){var b=new XMLHttpRequest;b.open("GET",a,false);b.onreadystatechange=function(){if(b.readyState==4&&b.status==200)c(b.responseText);else e&&e()};b.send()};/*
 Copyright 2009 Google Inc.  All Rights Reserved.
 Your use of this software is subject to the Terms of Service located
 at https://chrome.google.com/extensions/intl/en/gallery_tos.html.
*/
function g(){var a=localStorage.requestDomain;if(a){var c=d.getElementById("domain_select_block");c.innerHTML="The extension will contact %HOST to retrieve the list of similar pages.".replace("%HOST",a.replace("http://","").replace("/",""));if(a!="http://www.google.com/")c.innerHTML+="  To change your local domain to www.google.com, <a id='over' href='#'>click here</a>.";c.innerHTML+="<p>"}(a=d.getElementById("over"))&&a.addEventListener("click",function(){localStorage.requestDomain="http://www.google.com/";
f("http://www.google.com/ncr",function(){d.getElementById("domain_select_block").innerHTML="www.google.com has been saved as your local domain for retrieving similar pages.<p>"})},false)}window.addEventListener("load",g,false);
