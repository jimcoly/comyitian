/*
 * Translate entries
 *
 * Samples
 * ro : www.hackersblog.org
 * ru : www.kremlin.ru
 * zh : http://newsrss.bbc.co.uk/rss/chinese/trad/news/rss.xml
 * de : www.spiegel.de
 * fr : www.lemonde.fr
 *
 *
 */
//TODO: 
// - walk inside text nodes ONLY
// - web feeds
// - check compatibility with features (preview, column...)
// - Add a back to original (2 divs like columns,replacer ??)
// - Translate into mylanguage already exist -> Can we be better ?
// - Translate feed title too
GRP.translate = function(prefs, langs, ID, SL, lang){
    var langDest = prefs.translate_lang || lang;
    function translateEntry(entry, active, btn, e){
        var body = getBody(entry), l = getEntryLink(entry);
        var texts = {};
        if (l.eltitle) {
            translate(l.eltitle.firstChild, 'text', l.eltitle, 'text');
            translate(l.eltitle.title, 'direct', l.eltitle, 'title');
        }
        if (body) {
            //var eb = getEntryBody(body);
            translate(body, 'html', body, 'body');
        }
        function setText(el, t, mode){
            if (mode === 'html') {
                el.innerHTML = t;
            } else if (mode === 'direct') {
                el = t;
            } else if (mode === 'text') {
                if (el.innerText) {
                    el.innerText = t;
                } else if (el.textContent) {
                    el.textContent = t;
                } else {
                    el = t;
                }
            }
        }
		
		function cleanQuotes(txt){
			return (txt||'').replace(/«|»|"/g, "'");
		}
		
        function translate(el, mode, p, id){
            mode = mode || 'html';
            var txt;
            if (!active) {
				setText(el, decodeu(p.getAttribute('o_'+id)), mode);
                return;
            }
            if (mode === 'html') {
                txt = el.innerHTML;
            } else if (mode === 'direct') {
                txt = el;
            } else if (mode === 'text') {
                txt = (el.innerText || el.textContent || el);
            }
            addAttr(p, 'o_'+id,  encodeu(txt));
            chrome.extension.sendRequest({
                message: "translate",
                text: cleanQuotes(txt),
                to: langDest
            }, function(a){
                 if (!a.error && a.detectedSourceLanguage !== langDest) {
                    var t = (a.translation || '').replace(/&#39;/g, "'").replace(/&quot;/g, "\"");
                    setText(el, t, mode);
                }
            });
        }
    }
    GRP.api_entry(prefs, langs, ID, SL, lang, {
        action: 'translate',
        cb: translateEntry
    });
};
