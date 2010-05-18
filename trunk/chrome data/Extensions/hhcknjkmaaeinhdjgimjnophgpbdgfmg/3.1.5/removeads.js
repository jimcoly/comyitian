/**
 * Remove ads
 * @version  0.1
 * @date 2010
 * @author LudoO
 *
 * Simple advertising cleaner
 *
 */

GRP.removeads = function(prefs, langs, ID, SL, lang){
	function removeAds() {
		var i,re, link;

		// DIV#tads
		var ads = document.getElementById("tads");
		if (ads) {
			ads.parentNode.removeChild(ads);
		}
		
		//start from entry ??
		
		
		// Remove Search-Tracking
		var links = document.getElementsByTagName("a");
		// var links = document.querySelector("a,img");
		if (links && prefs.removeads_links) {
			re = new RegExp(prefs.removeads_links);
			//var re = /da\.feedsportal\.com|res\.feedsportal\.com|doubleclick\.net|\/ads/;
			for (i = 0; i < links.length; i++) {
				link = links[i];
				if (link.className == "l") {
					link.removeAttribute("onmousedown");
				}
				if (re.test(link.href)) {
					//console.log("REMOVE AD a : "+link.href);
					link.parentNode.removeChild(link);
				}
			}
		}

		links = document.getElementsByTagName("img");
		if (links && prefs.removeads_images) {
			re = new RegExp(prefs.removeads_images);
			//var re = /feedsportal\.com|feedburner\.com|doubleclick\.net|\/ads/;
			for (i = 0; i < links.length; i++) {
				link = links[i];
				if (re.test(link.src)) {
					//console.log("REMOVE AD img : "+link.src);
					link.parentNode.removeChild(link);
				}
			}
		}

		// Remove Right-side Ads
		var iframe = document.getElementsByTagName("iframe");
		if (iframe && prefs.removeads_iframes) {
			re = new RegExp(prefs.removeads_iframes);
			//var re = /feedsportal\.com|doubleclick\.net|googlesyndication.com\/pagead\/ads/;
			for (i = 0; i < iframe.length; i++) {
				var s = iframe[i].src;
				if (re.test(s)) {
					//console.log("REMOVE AD iframe : "+s);
					iframe[i].height = 0;
					iframe[i].width = 0;
					iframe[i].src = '';
				}

			}
		}
	}

	document.body.addEventListener('DOMNodeInserted', function(e){
		removeAds();
	}, false);
	removeAds();

};
