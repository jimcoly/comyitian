/*
TooManyTabs for Chrome - License Agreement

Visibo Limited gives you permission to make verbatim copies of the 'TooManyTabs for Chrome' software (the "Software") without restriction, so long as your copies include a copy of this license and all of the original copyright notices and associated disclaimers. You may not distribute modified source code. You may not charge a fee for the Software or claim that the Software is yours. You may not use the name Visibo to endorse or promote products derived from the Software without prior written permission.

THE SOFTWARE IS PROVIDED "AS IS" AND WITHOUT ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTIBILITY AND FITNESS FOR A PARTICULAR PURPOSE. UNDER NO CIRCUMSTANCES SHALL VISIBO LIMITED BE LIABLE TO YOU OR ANY OTHER PERSON FOR ANY INDIRECT, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES OF ANY KIND RELATED TO OR ARISING OUT OF YOUR USE OF THE SOFTWARE, EVEN IF VISIBO LIMITED HAS BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGES.

Copyright (c) 2009 Visibo Limited- contactus@visibotech.com. All rights reserved.
*/
document.addEventListener("keyup",triggerTMTHotkey,false);function triggerTMTHotkey(a){!a.altKey&&!a.shiftKey&&a.ctrlKey&&a.keyCode==192&&chrome.extension.sendRequest({command:"popup"})}chrome.extension.onRequest.addListener(function(a){if(a.command=="focus"){window.blur();window.focus();window.outerHeight<50&&alert("This Alert Box is used by TooManyTabs to wake up the tab that you have just selected. This only happens when your tab/window is minimized or docked.")}});
