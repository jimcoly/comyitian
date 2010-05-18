function loadSkin(){
    var input = document.getElementById("theme_skin");
    var li = document.getElementById('skin_' + input.value);
    if (!li) {
        li = document.getElementById('skin_none');
    }
    //select theme
    if (li) {
        li.onclick(false, true);
    }
}

var lastPanel, lastLink;
function showPanel(id){
    if (typeof window['run_' + id] == "function") {
        window['run_' + id].call(this, id);
    }
    var link = document.getElementById('l_' + id);
    if (lastLink) {
        lastLink.className = "";
    }
    if (link) {
        link.className = "on";
        showcat(link);
        lastLink = link;
    }
    var panel = document.getElementById('panel_' + id);
    if (lastPanel) {
        lastPanel.style.display = "none";
    }
    if (panel) {
        panel.style.display = "inline";
        lastPanel = panel;
        window.location.hash = '#' + id;
    }
}

function showcat(el, fromoutside){
    var wrap;
	if (fromoutside){
		wrap = getFirstElementByClassName(el, 'wrap');
	}else{
		wrap=findParentNode(el, 'ul', 'wrap');
	}
    if (lastCat) {
        hide(lastCat);
    }
    show(wrap);
    lastCat = wrap;
}

var lastCat;
function renderScripts(){
    var list = document.getElementById('scriptlist');//ul#scriptlist
    var panels = document.getElementById('panels');
    var tplCheckbox = '<li id="l_{id}"><a href="javascript:showPanel(\'{id}\')"><input id="{id}" name="{id}" type="checkbox" /><label for="{id}" id="l{id}" title="{desc}">{name}{status}</label><span class="open">{dlink}</span></a></li>';
    var tplLink = '<li id="l_{id}"><a class="link" href="javascript:showPanel(\'{id}\')"><span class="linkblock">{name}</span><span class="open olink">{dlink}</span></a></li>';
    var tplPanelTitle = '<div class="title"><h2>{name}</h2><div id="paneldesc_{id}" class="desc">{desc}</div></div>';
    var tplPanelIframe = '<div class="title"><h2>{name}</h2><iframe src="{url}" width="700" height="620"></iframe></div>';
    var categories = group(GRP.scripts, 'category');
    iterate(categories, function(category, scripts){
        var ulcat;
		//var incat = (category !== 'other');
		var incat=true;
        if (incat) {
            var licat = dh(list, 'li', {
                cls: 'category'
            });
            var acat = dh(licat, 'a', {
                //text: getCategory(lang, category),
				html: '<span class="bullet">•</span><span>'+getCategory(lang, category)+'</span>',
                href: '#'
            }, {
                click: function(e){
                    var li=findParentNode(e.target, 'li', 'category');
					showcat(li, true);
                }
            });
            ulcat = dh(licat, 'ul', {
                cls: 'wrap'
            });
            hide(ulcat);
        }else{
			ulcat = list;
		}
        var html = '';
		
        iterate(scripts, function(id, script){
            script.dlink = '>';
			script.desc = script.desc||'';
			if (script.status){
				var stat = getTextPrefs(lang, 'global', 's'+script.status) || script.status;
				script.status='<span class="'+script.status+'">'+stat+'</span>';
			}else{
				script.status='';
			}
			
            var t = (script.link) ? tplLink : tplCheckbox;
            html += fillTpl(t, script);
            var body, panel = document.getElementById('panel_' + id);
            if (!panel) {
                //create panels for descritpion
                panel = document.createElement('div');
                panel.id = "panel_" + id;
                panel.style.display = "none";
                script.shortcut = script.shortcut || '-';
                var tpl = (script.url) ? tplPanelIframe : tplPanelTitle;
                panel.innerHTML = fillTpl(tpl, script);
                //+body
                body = document.createElement('div');
                body.className = "body";
                panel.appendChild(body);
                panels.appendChild(panel);
                script.dlink = '&gt;';
            } else {
                var header = document.createElement('div');
                header.className = 'header';
                header.innerHTML = fillTpl(tplPanelTitle, script);
                insertFirst(header, panel);
                body = getFirstElementByClassName(panel, 'body');
            }
            renderOptions(body, script);
            renderShortcuts(panel, script);
        }, this, true);
        if (incat) {
            ulcat.innerHTML = html;
        } else {
            ulcat.innerHTML += html;
        }
    });
    addClass(list.firstElementChild, 'first');
    addClass(list.lastElementChild, 'last');
    extraFeatures();
    showcat(list, true);
}

var tplInput = '<label class="lbl {lcls}" id="t_{id}" for="{id}">{text}</label><input id="{id}" class="{cls}" name="{id}" type="{input}" value="{value}"{extra}"/><br/>';
var tplTextarea = '<label class="lbl {lcls}" id="t_{id}" for="{id}">{text}</label><textarea style="" class="{cls}" id="{id}" name="{id}" cols="{cols}" rows="{rows}"{extra}">{value}</textarea><br/>';
var tplCheckbox = '<input id="{id}" name="{id}" type="checkbox"/><label class="lbl_checkbox" id="t_{id}" for="{id}">{text}</label><br/>';
var tplSelect = '<label class="lbl {lcls}" id="t_{id}">{text}</label><select name="{id}" id="{id}">{options}</select><br/><br/>';
var tplSelectOption = '<option value="{id}"{checked}>{value}</option>';
var tplButton = '<button value="{value}" name="{name}" id="{id}" onclick="javascript:{action}();return false;">{text}</button>';
var tplPara = '<p class="{cls}" id="t_{id}">{text}</p>';
var tplDiv = '<div class="{cls}" id="{id}"></div>';
function renderOptions(body, script){
    if (!script.options) {
        return;
    }
    var cfg, xtype, value, html = '';
    iterate(script.options, function(option, cfg){
        if (typeof cfg === "object") {
            cfg.value = cfg.value || '';
            value = cfg.value;
            xtype = cfg.xtype || (typeof value);
        } else {
            value = cfg;
            xtype = typeof value;
        }
        var o = {
            text: getTextPrefs(lang, script.id, option, 'en') || ('-' + option + '-'),
            id: script.id + '_' + option,
            value: value,
            extra: '',
            lcls: cfg.lcls || '',
            input: cfg.input || 'text',
            cls: cfg.cls || ''
        };
        if (!document.getElementById(o.id)) {
            if (cfg.parent) {
                html += "<div class='" + cfg.parent + "'>";
            }
            if (xtype === "boolean") {
                html += fillTpl(tplCheckbox, o);
            } else if (xtype === "string") {
                if (cfg.size) {
                    o.extra = ' size="' + cfg.size + '"';
                }
                html += fillTpl(tplInput, o);
            } else if (xtype === "password") {
                if (cfg.size) {
                    o.extra = ' size="' + cfg.size + '"';
                }
                html += fillTpl(tplPwd, o);
            } else if (xtype === "number") {
                o.size = cfg.size || 3;
                o.extra = ' size="' + o.size + '"';
                html += fillTpl(tplInput, o);
            } else if (xtype === "textarea") {
                o.rows = cfg.rows || 5;
                o.cols = cfg.cols || 70;
                html += fillTpl(tplTextarea, o);
            } else if (xtype === "p") {
                html += fillTpl(tplPara, o);
            } else if (xtype === "html") {
                html += value;
            } else if (xtype === "select") {
                o.options = '';
                iterate(cfg.values, function(id, vo){
                    text = ''; //getTextPrefs(lang, script.id, option+'_'+id);
                    o.options += fillTpl(tplSelectOption, {
                        id: id,
                        value: vo.value || vo,
                        checked: (vo.checked ? ' checked="checked"' : '')
                    });
                });
                html += fillTpl(tplSelect, o);
            } else if (xtype === "button") {
                o.value= o.value||'';
				o.name= o.name||o.id;
				o.action= cfg.action||'void';
				html += fillTpl(tplButton, o);
            } else if (xtype === "crud") {
                o.cls = '_crud' + ((o.cls) ? (' ' + o.cls) : '');
                html += fillTpl(tplDiv, o);
            } else if (xtype === "picker") {
                o.cls = 'picker' + ((o.cls) ? (' ' + o.cls) : '');
                if (cfg.size) {
                    o.extra = ' size="' + cfg.size + '"';
                }
                html += fillTpl(tplInput, o);
            }
            if (cfg.parent) {
                html += "</div>";
            }
        }
    });
    body.innerHTML += html;
}

var EDITORS = {};
function extraFeatures(){
    textareaTab();
    renderpicker();
    //var CODEMIRROR_PATH = 'http://marijn.haverbeke.nl/codemirror';
    var CODEMIRROR_PATH = 'lib/codemirror';
    if (CodeMirror && get_id('relook_css')) {
        EDITORS.relook_css = CodeMirror.fromTextArea('relook_css', {
            parserfile: "parsecss.js",
            stylesheet: [CODEMIRROR_PATH + "/css/csscolors.css", "css/editor.css"],
            path: CODEMIRROR_PATH + "/js/",
            tabMode: 'shift',
            height: '500px'
        });
    }
}

function renderpicker(){
    if (typeof jQuery !== "undefined") {
        jQuery('.picker').ColorPicker({
            onSubmit: function(hsb, hex, rgb, el){
                $(el).val('#' + hex);
                $(el).ColorPickerHide();
            },
            onBeforeShow: function(){
                $(this).ColorPickerSetColor(this.value.replace('#', ''));
            }
        }).bind('keyup', function(){
            $(this).ColorPickerSetColor(this.value);
        });
    }
}

function renderSkins(){
    var last;
    var list = document.getElementById('skinlist');
    list.innerHTML = '';
    iterate(GRP.skins, function(id, o){
        //for (var i = 0, len = GRP.skins.length; i < len; i++) {
        //    var o = GRP.skins[i];
        var li = document.createElement('li');
        var a = document.createElement('a');
        li.id = 'skin_' + id;
        a.innerHTML = o.name;
        a.href = '#';
        li.appendChild(a);
        list.appendChild(li);
        li.onclick = function(e, simulate){
            var c = this;
            if (last) {
                last.className = "";
            }
            addClass(c, "on");
            var thumb = document.getElementById("thumb");
            var id = c.id.replace('skin_', '');
            var input = document.getElementById("theme_skin");
            var mtos = document.getElementsByClassName('mto');
            if (mtos && mtos.length > 0) {
                foreach(mtos, function(mto){
                    addClassIf(mto, 'hidden', (id !== "mytheme"));
                });
            }
            if (id === "none") {
                input.value = "";
                thumb.className = "hidden";
            } else {
                input.value = id;
                thumb.className = "";
                thumb.src = o.pic || "skin/img/" + id + ".png";
                var athumb = document.getElementById("athumb");
                if (o.ref) {
                    athumb.href = o.ref;
                    athumb.target = 'blank';
                } else {
                    athumb.href = '#';
                    athumb.target = '';
                    athumb.removeAttribute('target');
                }
                var skindesc = document.getElementById("skindesc");
                if (skindesc) {
                    skindesc.innerHTML = (o.desc) ? (o.name + ' - ' + o.desc) : o.name;
                }
                athumb.title = o.name;
                //check theme feature
                if (!simulate) {
                    var checktheme = document.getElementById("theme");
                    if (checktheme) {
                        checktheme.checked = true;
                    }
                }
            }
            last = c;
        };
    });
    addClass(list.firstChild, 'first');
    addClass(list.lastChild, 'last');
}

function createReport(report){
    var list = document.getElementById('sysinfo');
    if (list) {
        list.innerHTML = '';
        recurseList(list, report, true);
    }
}

function recurseList(root, list, first){
    var ul = document.createElement('ul');
    if (!first) {
        ul.className = "mnu rounded info";
    }
    for (var o in list) {
        var li = document.createElement('li');
        if (typeof list[o] === "object") {
            ul.innerHTML += "<span class='info-title'>" + o + "</span>";
            recurseList(ul, list[o]);
        } else {
            li.innerHTML = '<span>' + o + " : " + list[o] + '</span>';
            ul.appendChild(li);
        }
    }
    root.appendChild(ul);
}

function disableAllScripts(){
    /*for (var i = 0, len = GRP.scripts.length; i < len; i++) {
     var script = GRP.scripts[i];
     prefs[script.id] = false;
     }*/
    iterate(GRP.scripts, function(id, script){
        prefs[id] = false;
    });
}

function setpackage(id){
    disableAllScripts();
    if (id === "reset") {
        //Refresh page to reload all options for each script
        var sure = confirm(getTextPrefs(lang, 'pack', 'confirmdel'));
        if (sure) {
            prefs = {};
            renderPrefs();
            saveprefs(true, true);
        }
        return;
    } else {
        iterate(GRP.packages[id], function(i, data){
            prefs[i] = true;
            if (data && (typeof data === 'object')) {
                iterate(data, function(k, o){
                    prefs[i + '_' + k] = o;
                });
            }
        });
    }
    renderPrefs();//update
}
