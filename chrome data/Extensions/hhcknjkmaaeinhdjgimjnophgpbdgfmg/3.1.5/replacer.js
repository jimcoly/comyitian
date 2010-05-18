/**
 * TODO make doc
 * @version  0.2
 * @date 2010
 * @author JoLan
 * Replace entries with part of the original article
 *
 */
GRP.replacer = function(prefs, langs, ID, SL, lang){
    var locked = false, SL = langs.replacer, partIndex = 0, gp_data={}, TPL_NAME = "replacer_result_";
    
    function initVars(){
		gp_data={};
		iterate(prefs.replacer_items, function(title,o){
			  o.re_url=new RegExp(o.url, "im");
			  if (/^xpath\:/.test(o.search)){
			  	o.xpath=o.search.replace(/^xpath\:/, '');
				//Ensure relative path
				if (!(/^\./.test(o.xpath))){
					if (/^\//.test(o.xpath)) {
						o.xpath='.'+o.xpath;
					}else{
						o.xpath='./'+o.xpath;
					}
				}
			  }else{
			  	o.re_search=new RegExp(o.search, "im");
			  }
			  gp_data[title]=o;
		});
    }
    
    function replaceItem(html, xml, matches, partIndex){
       var result = '';
	   var el = document.getElementById(TPL_NAME + partIndex);
	   /*if (item.keeptext){
	   		var eb = getEntryBody(el.parentNode);
			result = eb.innerHTML+'<br/>';
	   }*/
	   iterate(matches, function(title, o){
            if (o.xpath) {
				if (!xml) {
					xml=loadXml(html);
				}
				if (xml) {
					var els = getElements(o.xpath, xml);
					foreach(els, function(el){
						result += el.outerHTML;
					});
					//clean xml
					remove(xml);
				}
			} else {
				var item = gp_data[title];
				if (item.re_search) {
					var m = item.re_search.exec(html);
					if (m && m[0]) {
						result += m[0].replace(item.re_search, item.replace);
					}
				}
			}
        });
		
		var entryBody = getEntryBody(el.parentNode);
        if (result !== '') {
            el.innerHTML = result;
			show(el);
			hide(entryBody);
        } else {
            el.innerHTML = SL.nomatch;
			//Reset to original
			hide(el);
			show(entryBody);
        }
    }
    
    function doreplacer(el, entry, mode, force){
        var index = -1, regex, link = getEntryLink(entry);
		if (link) {
            var matches = {};
			iterate(gp_data, function(title, o){
				if (o.re_url.test(link.url)){
					matches[title]=o;
				}
			});
            replacePart(matches, entry, link);
        }
    }
    
    function replacePart(matches, entry, link){
        if (isObjectEmpty(matches)){
			return false;
		}
		
		var body = getFirstElementByClassName(entry, 'entry-body');//div
        var entryBody = getEntryBody(body);
        
        //hide(entryBody);
        var el = document.createElement('div');
		/*if (matches[0].keeptext) {
			hide(el);
		}else{
			hide(entryBody);
		}*/
			
        partIndex++;
        el.id = TPL_NAME + partIndex;
        el.innerHTML = SL.loading;
		hide(el);
        body.appendChild(el);
        //console.log('request '+partIndex+' - '+link.url);
        GM_xmlhttpRequest(
        {
            url: link.url,
            method: "GET",
            partIndex: partIndex,
            matches: JSON.stringify(matches),
            onload: function(res, req){
                var matches = JSON.parse(req.matches);
                var text = res.responseText.replace(/[\r\n]+/g, '');
				replaceItem(text,res.responseXml, matches, req.partIndex);
            }
        });
    }
    
    
    initVars();
    registerFeature(doreplacer, ID);
};
