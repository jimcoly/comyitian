/**
 * FixLayout 
 * @version  0.3
 * @date 2010-01-22
 * @author LudoO
 *
 * Fit entry height
 *
 */
GRP.fixlayout = function(prefs, langs, ID, SL, lang){
	function checkImage(root, href) {
		var links = getElements(".//img[@src='" + href + "']", root);
		return (links && links.length > 0);
	}
	function fixEnclosures() {
		var nodes = getElements("//a[span[@class='view-enclosure']]");
		if (!nodes || !nodes.length) {
			return;
		}

		nodes.forEach(function(o) {
			var entry = findParentNode(o, 'div', 'entry');
			if (entry) {
				var found = checkImage(entry, o.href);
				var p = o.parentNode.parentNode;
				if (found) {
					if (p && p.parentNode) {
						p.parentNode.removeChild(p);
					}
				} else {
					var div = document.createElement('div');
					div.className = "item-pict";
					var img = document.createElement('img');
					div.appendChild(img);
					img.src = o.href;
					img.align = "left";
					if (p && p.parentNode) {
						p.parentNode.replaceChild(div, p);
					}
				}
			}
		});
	}
	
	//fix image width
	var css = ".entry-body img {max-width:100%;}";
	GM_addStyle(css);
	
	//fix width of entry
	GM_addStyle(".entry .entry-body, .entry .entry-title{ display: inline !important; max-width: 100% !important; }");

	var e = document.getElementById('entries');
	if (e) {
		e.addEventListener('DOMNodeInserted', function() {
			fixEnclosures();
		}, false);
	}
	fixEnclosures();// on load
};
