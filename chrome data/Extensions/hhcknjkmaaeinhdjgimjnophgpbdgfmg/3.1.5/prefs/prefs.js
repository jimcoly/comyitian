function importprefs(){
    var r = confirm(getTextPrefs(lang, 'general', 'confirmimport'));
    if (r) {
        var el = document.getElementById("ieprefs");
        if (el && el.value) {
		   try {
				prefs = JSON.parse(el.value);
				saveprefs(true, true);
				info(getTextPrefs(lang, 'global', 'prefsimportedok', 'en', "Preferences imported!"));
			}catch(e){
				info(getTextPrefs(lang, 'global', 'prefsimportfailed', 'en', "Import failed!")+' : '+e, 'error');
			}
        }
    }
}

function exportprefs(){
    var el = document.getElementById("ieprefs");
    var p = {};
	iterate(prefs, function(i, pref){
		if (i && pref && !(/password/.test(i))){
			p[i]=pref;
		}
	});
	el.value =  JSON.stringify(p)
}

function initprefs(){
    lang = prefs.language_lang || 'en';
    loadLangs(lang, function(){
        renderScripts();
        translatePage(lang);
        specialTranslate(lang);
        renderSkins();
        renderPrefs();
        var current = window.location.hash.substring(1) || 'general';
        showPanel(current);
        reportNavigator();
        renderThemes();
    });
}

function applyprefs(){
    var form = document.frmprefs;
    //general checked if one option ON 
    if (form.general_secure.checked ||
    form.general_counter.checked ||
    form.general_opendirect.checked) {
        form.general.checked = true;
    }
    for (var i in form) {
        var ctrl = form[i];
        if (ctrl && ctrl.name && !hasClass(ctrl, 'ignore')) {
            var o = ctrl.name;
            if (typeof ctrl.key !== "undefined") {
                //shortcut code
                prefs[o] = ctrl.key;
            } else if (ctrl.type === "checkbox") {
                prefs[o] = ctrl.checked || false;
            } else if (ctrl.nodeName === "TEXTAREA") {
                if (EDITORS && EDITORS[o]) {
                    prefs[o] = EDITORS[o].getCode();
                    //ctrl.innerHTML=prefs[o];
                } else {
                    prefs[o] = ctrl.value;
                }
            } else {
                prefs[o] = ctrl.value;
            }
        }
    }
    var select = document.getElementById("language_lang");
    if (select) {
        prefs.language_lang = select.value;
    }
}

function saveprefs(reload, cleanall){
    if (!cleanall) {
        applyprefs();
    }
    if (prefs && lang !== prefs.language_lang) {
        //reload if lang changed!
        reload = true;
    }
    chrome.extension.sendRequest({
        message: "setprefs",
        prefs: prefs,
        cleanall: cleanall || false
    });
    run_extshortcuts();
    info(getTextPrefs(lang, 'global', 'prefssaved', 'en', "Preferences saved"));
    if (reload) {
        window.location.reload();
    }
}

function renderPrefs(){
    if (prefs) {
        var select = document.getElementById("language_lang");
        if (select) {
            select.value = lang;
        }
        for (var o in prefs) {
            var ctrl = document.frmprefs[o];
            if (ctrl && (typeof prefs[o] !== 'undefined')) {
                if (!hasClass(ctrl, 'ignore')) {
                    if (ctrl.tagName === "INPUT") {
                        if (ctrl.key) {
                            //shortcut
                            var key = unmarshallKey(prefs[o]);
                            setShortcut(key, ctrl);
                        } else if (ctrl.type === "checkbox") {
                            ctrl.checked = (prefs[o] === true);
                        } else if (ctrl.type === "text") {
                            ctrl.value = prefs[o];
                        } else if (ctrl.type === "password") {
                            ctrl.value = prefs[o];
                        } else if (ctrl.type === "hidden") {
                            ctrl.value = prefs[o];
                        }
                    } else if (ctrl.nodeName === "TEXTAREA") {
                        if (EDITORS && EDITORS[o]) {
                            var ed = EDITORS[o];
                            var p = prefs[o];
                            window.setTimeout(function(){
                                ed.setCode(p);
                            }, 500);
                        } else {
                            ctrl.value = prefs[o];
                        }
                    }
                }
            }
        }
        loadSkin();
        loadCruds();
    }
}

function reportNavigator(){
	createReport(getInfo());
}

function initGRP(){
    GRP.setVersion();
    var me = this;
    chrome.extension.sendRequest({
        message: "getprefs"
    }, function(a){
        prefs = a.prefs;
        initprefs();
    });
}

function info(msg, cls){
    var status = document.getElementById('status');
    status.innerHTML = msg;
    status.className = "rounded "+(cls||'');
    window.setTimeout(function(){
        status.innerHTML = "";
        status.className = "rounded hidden";
    }, 3000);
}

function findReader(){
    chrome.extension.sendRequest({
        message: "findreader"
    });
}

function specialTranslate(lang){
    var el = document.getElementById("t_link_about");
    if (el) {
        el.href = "about.html?lang=" + lang;
    }
}

function hashchange(){
    var script = location.hash;
    showPanel(script);
}
