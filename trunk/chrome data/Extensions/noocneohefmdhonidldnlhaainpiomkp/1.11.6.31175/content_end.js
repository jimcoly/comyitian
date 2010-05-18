var feed_types = {
  "application/rss+xml": true,
  "application/atom+xml": true,
  "text/xml": true,
  "application/x-cooliris-quick": true
}
function hasFeed() {
  var links = document.getElementsByTagName('link');
  for (var i = 0; i < links.length; i++) {
    if (typeof(links[i].type) == "string" && feed_types[links[i].type.toLowerCase()]) {
      return true;
    }
  }
  return false;
}

if (hasFeed()) {
  initCooliris();
} else {
  var port = chrome.extension.connect({name:"HasJsPageHandler"});
  port.onMessage.addListener(initCooliris);
  port.postMessage();
}