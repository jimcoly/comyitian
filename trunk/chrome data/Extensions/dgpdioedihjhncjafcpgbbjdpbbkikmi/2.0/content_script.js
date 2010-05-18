document.addEventListener("keydown"  , function(e) {
	chrome.extension.sendRequest({a: "add", keyCode:e.keyCode, altKey:e.altKey});
}, false);
