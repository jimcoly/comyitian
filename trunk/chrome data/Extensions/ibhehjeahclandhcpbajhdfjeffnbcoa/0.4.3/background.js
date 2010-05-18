function toHex8(b) {
	return (b < 16 ? "0": "") + b.toString(16)
}

function hexEncodeU32(b) {
	var c = toHex8(b >>> 24);
	c += toHex8(b >>> 16 & 255);
	c += toHex8(b >>> 8 & 255);
	return c + toHex8(b & 255)
}

function awesomeHash(b) {
	for (var c = 16909125, d = 0; d < b.length; d++) {
		var HASH_SEED_ = "Mining PageRank is AGAINST GOOGLE'S TERMS OF SERVICE. Yes, I'm talking to you, scammer.";
		c ^= HASH_SEED_.charCodeAt(d % HASH_SEED_.length) ^ b.charCodeAt(d);
		c = c >>> 23 | c << 9
	}
	return hexEncodeU32(c)
}

function getUrlToSendQueryFor(b) {
    var c = b.match(/^https:\/\/[^\/]*[\/]?/i);
    if (c) return c[0];
    return b
}

function sendToGWH(tabId, changeInfo, tab) {
	if (changeInfo.status != "loading")
		return;

	if (tab.incognito)
		return;

	if(tab.url.substr(0,4) != "http")
		return;

	var url = getUrlToSendQueryFor(tab.url).split("#")[0];

	var hash = awesomeHash(url);
	var query = "http://www.google.com/search?client=navclient-auto&ch=8" + hash + "&features=Rank&q=info:" + url;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", query, false);
	xhr.send();
}

chrome.tabs.onUpdated.addListener(sendToGWH);