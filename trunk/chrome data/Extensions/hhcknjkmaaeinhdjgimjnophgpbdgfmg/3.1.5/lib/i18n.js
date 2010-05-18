/**
 * @author Valente
 */
function getText(lang, script, option, deflang, deftext){
	var text = '';
	if (GRP.langs[lang] && GRP.langs[lang].texts[script] && GRP.langs[lang].texts[script][option]) {
        text = GRP.langs[lang].texts[script][option];
    }
	if (!text && deflang){
		text=getText(deflang, script, option, false, deftext);
	}
	if (!text && !deflang) {
		text=deftext||'';
	}
	return text;
}

function getCategory(lang, name, deflang){
	var text = '';
	if (GRP.langs[lang] && GRP.langs[lang].categories && GRP.langs[lang].categories[name]) {
        text = GRP.langs[lang].categories[name];
    }
	if (!text && deflang){
		text=getCategory(deflang, name);
	}
	if (!text && !deflang) {
		text=name.toMaj();
	}
	return text;
}


function getTextPrefs(lang, script, option, deflang, deftext){
	var text = '';
	if (GRP.langs[lang] && GRP.langs[lang].prefs[script] && GRP.langs[lang].prefs[script][option]) {
        text = GRP.langs[lang].prefs[script][option];
    }
	if (!text && deflang){
		text=getTextPrefs(deflang, script, option, false, deftext);
	}
	if (!text && !deflang) {
		text=deftext||'';
	}	
	return text;
}


function autoTranslate(name){
    var params = urlDecode(window.location.search.substring(1));
    var lang = params.lang || 'en';
	loadLangs(lang, function(){
		translatePage(lang, name);
	});
    
}

function translatePage(lang, name){
    /*var translations, DEFAULT_translations = GRP.langs.en.prefs;
	if(GRP.langs[lang]){
		//translations=merge(DEFAULT_translations, GRP.langs[lang].prefs);
		translations= GRP.langs[lang].prefs;
	}else{
		translations=DEFAULT_translations;
	}	
	*/
	var translations= GRP.langs[lang].prefs;
    if (translations) {
		function replaceTexts(name, texts){
			for (var key in texts) {
				var id = 't_' + ((name === 'global') ? '' : (name + '_')) + key;
				var el = document.getElementById(id);
				if (el) {
					var text = texts[key];
					if (/^val-/.test(key)) {
						el.value = text;
					} else {
						el.innerHTML = text;
					}
				}
			}
		}
        if (name){
			var texts = translations[name];
			replaceTexts(name, texts);
		}else{
			for (var nam in translations) {
				var texts = translations[nam];
				replaceTexts(nam, texts);
			}
		}
    }
}

function getAllTexts(){
    var texts = getElements("//*[starts-with(@id, 't_')]");
    var translations = {};
    for (var i = 0, len = texts.length; i < len; i++) {
        var id = texts[i].id;
        var o = splitId(id);
        
        var text = texts[i].innerHTML;
        text = text.replace(/\n/g, '');
        if (!translations[o.name]) {
            translations[o.name] = {};
        }
        translations[o.name][o.key] = text.trim();
    }
    //document.write("<!--" + JSON.stringify(translations) + "-->");
}

function splitId(id){
    var key, name;
    var m = id.split('_');
    if (m.length == 2) {
        name = 'global';
        key = m[1];
    } else {
        name = m[1];
        m.shift();
        m.shift();
        key = m.join('_');
    }
    return {
        key: key,
        name: name
    };
}

function loadLangs(lang, cb, scope){
    //TODO: load json here instead evald js
    GM_addScript('lang/' + lang + '/features.js', true, function(){
        GM_addScript('lang/' + lang + '/langs.js', true, function(){
            //override locale texts
            if (GRP.langs) {
				merge(GRP, GRP.langs[lang]);
            }
            if (cb) {
                cb.call(scope||this);
            }
        }, true);
    }, true);
}
