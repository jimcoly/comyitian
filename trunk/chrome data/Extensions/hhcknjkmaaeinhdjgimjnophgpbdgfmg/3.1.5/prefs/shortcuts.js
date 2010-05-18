function run_extshortcuts(){
    //update all Keyboard shortcuts
    var key, html = '';
    var grpshortcuts = document.getElementById('grpshortcuts');
    grpshortcuts.innerHTML = '';
    var shortcuts = [];
    iterate(GRP.scripts, function(id, script){
        iterate(script.shortcuts, function(sid, shortcut){
            if (prefs && prefs[id + '_key_' + sid]) {
                key = unmarshallKey(prefs[id + '_key_' + sid]);
            } else {
                key = shortcut.key;
            }
            shortcut.keytext = formatKey(key);
			shortcut.keysort = formatKey(key, true);
            shortcuts.push({
                script: id,
                sid: sid,
                shortcut: shortcut
            });
        });
    });
    iterate(GRP.googleshortcuts, function(id, o){
        shortcuts.push({
            script: 'google',
            sid: 'google_' + id,
            shortcut: {
                id: 'google_' + id,
                title: 'Google - ' + o.text,
                keytext: id,
				keysort: formatKey(o.key, true)
            }
        });
    });
    shortcuts.sort(function(a, b){
        if (a.shortcut.keysort > b.shortcut.keysort) {
            return 1;
        } else if (a.shortcut.keysort < b.shortcut.keysort) {
            return -1;
        }
        return 0;
    });
	var tplShorcutGoogle = '<li class="shortcut_google"><span>{keytext}</span>{title}</li>';
	var tplShorcut = '<li><a href="javascript:showPanel(\'{script}\');"><span>{keytext}</span>{title}</a></li>';
    foreach(shortcuts, function(o){
        o.shortcut.script=o.script;
		var tpl = (o.script==='google')?tplShorcutGoogle:tplShorcut;
		html += fillTpl(tpl, o.shortcut);
    });
    grpshortcuts.innerHTML = html;
}

function renderShortcuts(el, script){
    iterate(script.shortcuts, function(sid, shortcut){
        createShortcut(el, script, shortcut, sid);
    });
}

function createShortcut(el, script, shortcut){
    var div = document.createElement('div');
    div.className = 'shortcut';
    var label = document.createElement('label');
    var t = getText(lang, script.id, 'shortcut_' + shortcut.id);
    if (t) {
        shortcut.title = t;
    }
    label.innerHTML = shortcut.title + ':';
    div.appendChild(label);
    var input = document.createElement('input');
    input.type = 'text';
    input.size = 15;
    input.className = 'shortcut';
    input.id = script.id + '_key_' + shortcut.id;
    var key = shortcut.key;
    //use default value on creation
    setShortcut(key, input);
    var scriptId = script.id;
    var shortcutId = shortcut.id;
    input.onkeydown = function(e){
        e.preventDefault();
        e.stopPropagation();
        fixShortcut(e, e.target);
    };
    div.appendChild(input);
    var br = document.createElement('br');
    br.className = 'clearall';
    div.appendChild(br);
    el.appendChild(div);
}

function isShortcutFree(e){
    var text = formatKey(e);
    var key = marshallKey(e);
    //custom in prefs
    if (gshortcuts[key]) {
        var warning1 = getTextPrefs(lang, 'extshortcuts', 'alreadyusedprefs');
        return warning1;
    }
    //google
    if (GRP.googleshortcuts && GRP.googleshortcuts[text]) {
        var warning2 = getTextPrefs(lang, 'extshortcuts', 'alreadyusedgoogle');
        var w = warning2;
		if (GRP.googleshortcuts[text]){
			w += '<br/>(' + GRP.googleshortcuts[text].text + ')';
		}
		return w;
    }
    return true;
}

function setShortcut(key, ctrl){
    //remove old
	clearShortcut(key, ctrl);
	
	if (!key.keyCode) {
        //error
        return;
    }
    ctrl.value = formatKey(key);
    ctrl.key = marshallKey(key);
    //add new
    gshortcuts[ctrl.key] = key;
    prefs[ctrl.id] = ctrl.key;
	//console.log(ctrl.id+'=='+ctrl.key);
}
function clearShortcut(key, ctrl){
	delete gshortcuts[ctrl.key];
}
function fixShortcut(e, input){
    var newKey = marshallKey(e);
    var free = isShortcutFree(e);
    var warn = getFirstElementMatchingClassName(input.parentNode, 'div', 'warning');//div.warning
    if (!warn) {
        warn = document.createElement('div');
        warn.className = 'warning';
        insertAfter(warn, input);
    }
    if (free === true) {
		warn.className = 'warning hidden';
		warn.innerHTML = '';
        input.className = '';
        setShortcut(e, input);
    } else {
        input.value = formatKey(e);
        input.className = 'warning';
        warn.className = 'warning';
		warn.innerHTML = free;
		clearShortcut(e, input);
    }
}
