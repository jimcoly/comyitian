/*
FreshStart - License Agreement

Visibo Limited gives you permission to make verbatim copies of the 'FreshStart' software (the "Software") without restriction, so long as your copies include a copy of this license and all of the original copyright notices and associated disclaimers. You may not distribute modified source code. You may not charge a fee for the Software or claim that the Software is yours. You may not use the name Visibo to endorse or promote products derived from the Software without prior written permission.

THE SOFTWARE IS PROVIDED "AS IS" AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTIBILITY AND FITNESS FOR A PARTICULAR PURPOSE. UNDER NO CIRCUMSTANCES SHALL VISIBO LIMITED BE LIABLE TO YOU OR ANY OTHER PERSON FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND RELATED TO OR ARISING OUT OF YOUR USE OF THE SOFTWARE, EVEN IF VISIBO LIMITED HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES.

Copyright (c) 2009 Visibo Limited- contactus@visibotech.com. All rights reserved.

*/
function init(){document.title=chrome.i18n.getMessage("crashRestoreTitle");document.getElementById("textBox").innerHTML=chrome.i18n.getMessage("restorePreviousSession")}
function showCrashWindow(){document.getElementById("crashWindowBox").addEventListener("mouseup",crashSessionRestore);if(localStorage.prevSession!=null)for(var b=JSON.parse(localStorage.prevSession),d=0;d<b.length;d++){var a=document.createElement("div");a.textContent=chrome.i18n.getMessage("restoreSavedWindow",[(d+1).toString()]);a.id="window_"+d;a.setAttribute("class","crashWindow");var g=document.getElementById("crashWindowBox");g.appendChild(a);a=b[d].urls;for(var c=0;c<a.length;c++)try{var f=
document.createElement("div"),h=document.createElement("img");h.src="http://www.google.com/s2/favicons?domain_url="+a[c].url;var e=document.createElement("a");e.textContent=a[c].title?a[c].title:a[c].url;e.href=a[c].url;e.title=a[c].url;e.target="_blank";f.setAttribute("class","tabbox");f.appendChild(h);f.appendChild(e);g.appendChild(f)}catch(i){console.log("restore page render error"+i)}a=document.createElement("br");g.appendChild(a)}}
function crashSessionRestore(b){b.preventDefault();b.stopPropagation();if(b.target.id.indexOf("window_")=="0"){background=chrome.extension.getBackgroundPage();background.restoreCrashSession(b.target.id.replace(/window_/,""),b.button)}};
