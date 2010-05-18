function initCooliris(custom_attributes) {
  var cooliris = document.getElementById('coolirisBridge');
  if (!cooliris) {
    var default_attributes = {
      type: 'application/x-cooliris-page',
      hidden: 'true',
    };
    if (navigator.platform.indexOf('Linux') != -1) {
      // Workaround for http://crbug.com/20474
      default_attributes.style = 'width: 1px; height: 1px; position:absolute; left: -10000px';
      default_attributes.hidden = 'false';
    }
    var plugin_attributes = custom_attributes || default_attributes;
    plugin_attributes.id = 'coolirisBridge';
    cooliris = document.createElement('embed');
    for (var attr_name in plugin_attributes) {
      cooliris.setAttribute(attr_name, plugin_attributes[attr_name]);
    }
    document.documentElement.appendChild(cooliris);
    if (top == self) {
      document.addEventListener("mouseover", function (e) { cooliris.onMouseOver(e.target); }, true);
      document.addEventListener("mouseout", function (e) { cooliris.onMouseOut(e.target); }, true);
      if (chrome.extension) {
        window.addEventListener("LaunchableChanged", function () {
          var launchable = (cooliris.getAttribute("launchable") == "true");
          chrome.extension.connect({name:"LaunchableChanged"}).postMessage({launchable: launchable});
        }, false);
      }
    }
  }
  return cooliris;
}
