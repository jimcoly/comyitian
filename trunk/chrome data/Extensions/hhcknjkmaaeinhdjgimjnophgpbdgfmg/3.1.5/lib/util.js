//
// Global util functions
//
function hasClass(el, clazz){
    if (!el || !el.className) {
        return false;
    }
    var reClassname = new RegExp("(^|\\s)" + clazz + "(\\s|$)");
    return (reClassname.test(el.className));
}

function addClass(el, clazz){
    if (el) {
        el.className = (el.className || '') + ' ' + clazz;
    } else {
        console.log('el null');
    }
}

function addClassChecked(el, clazz){
    if (!hasClass(el, clazz)) {
        addClass(el, clazz);
    }
}

function addClassIf(el, cls, status){
    if (status) {
        addClass(el, cls);
    } else {
        removeClass(el, cls);
    }
}

function addAttr(el, name, value){
    var attr = document.createAttribute(name);
    attr.value = value;
    el.attributes.setNamedItem(attr);
}

function findParentNode(eel, etag, clazz){
    var tag = etag.toUpperCase();
    var el = eel.parentNode;
    if (clazz) {
        // Find first element's parent node matching tag and className
        while (el && el.tagName !== 'BODY' && (el.tagName !== tag || !hasClass(el, clazz))) {
            // console.log(el.tagName+'.'+el.className);
            el = el.parentNode;
            /*
             * if (!el){ console.log('el null for clazz '+clazz ); }
             */
        }
    } else {
        while (el && el.tagName !== 'BODY' && el.tagName !== tag) {
            el = el.parentNode;
        }
    }
    return ((el && el.tagName !== 'BODY') ? el : false);
}

function getFirstNode(el){
    var o = el.firstChild;
    //if (typeof o == "HTMLDivElement"){
    if (o && o.nodeType == 1) {
        return o;
    }
    //
    //while(typeof o !== "undefined" && typeof o !== "HTMLDivElement"){
    while (typeof o !== "undefined" && o.nodeType !== 1) {
        o = o.nextSibling;
    }
    return o;
}

function getIndex(el){
    var pos = 0, o = el;
    while ((o = o.previousSibling)) {
        pos++;
    }
    return (pos + 1);
}

function getPos(obj){
    var output = {};
    var mytop = 0, myleft = 0;
    while (obj) {
        mytop += obj.offsetTop;
        myleft += obj.offsetLeft;
        obj = obj.offsetParent;
    }
    output.left = myleft;
    output.top = mytop;
    return output;
}

//native getElementsByClassName
function getFirstElementByClassName(root, clazz){
    return root.getElementsByClassName(clazz)[0];
}

function getElementText(root, cls, html, firstchild){
    var txt = '', el = getFirstElementByClassName(root || document, cls);
    if (el) {
        if (firstchild) {
            el = el.firstChild;
        }
        if (html) {
            txt = el.innerHTML;
        } else {
            txt = el.innerText || el.textContent;
        }
    }
    return txt;
}

function copyAttributes(src, dest){
    var ats;
    if (src && dest && src.attributes && src.attributes.length > 0) {
        for (var i = 0, len = src.attributes.length; i < len; i++) {
            ats = src.attributes[i];
            addAttr(dest, ats.nodeName, ats.nodeValue);
        }
    }
}

/**
 *
 * @param {Object} root
 * @param {Object} tag
 * @param {Object} clazz
 * @deprecated use getFirstElementByClassName
 */
function getFirstElementMatchingClassName(root, tag, clazz){
    var elements = root.getElementsByTagName(tag);
    var i = 0;
    while (elements[i] && !hasClass(elements[i], clazz)) {
        i++;
    }
    return ((!elements[i]) ? null : (elements[i]));
}

function getLastElementMatchingClassName(root, tag, clazz){
    var elements = root.getElementsByTagName(tag);
    var i = elements.length, j = 0;
    while (i >= 0 && elements[i] && !hasClass(elements[i], clazz)) {
        i--;
    }
    return ((i < 0 || !elements[i]) ? null : (elements[i]));
}

function getElementsByClazzName(clazz, itag, ielm){
    var tag = itag || "*";
    var elm = ielm || document;
    var elements = (tag == "*" && elm.all) ? elm.all : elm.getElementsByTagName(tag);
    var returnElements = [];
    var current;
    var length = elements.length;
    for (var i = 0; i < length; i++) {
        current = elements[i];
        if (hasClass(current, clazz)) {
            returnElements.push(current);
        }
    }
    return returnElements;
}

function getElements(xpath, context){
    var doc = (context) ? context.ownerDocument : document;
    var r = doc.evaluate(xpath, (context || doc), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0, l = r.snapshotLength, res = new Array(l); i < l; i++) {
        res[i] = r.snapshotItem(i);
    }
    return res;
}

function get_id(id){
    return document.getElementById(id);
}

function getElementValue(query, context){
    var doc = (context) ? context.ownerDocument : document;
    return doc.evaluate(query, (context || doc), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function parseXml(xmlText){
    var dom = new DOMParser().parseFromString(xmlText, "application/xml");
    //urlinput.value = dom.getElementsByTagName('shortUrl')[0].textContent;
    return dom;
}

if (typeof Array.forEach === "undefined") {
    Array.forEach = function(arr, fn){
        Array.prototype.forEach.call(arr, fn);
    };
}
function insertAfter(el, ref){
    var next = ref.nextSibling;
    if (next) {
        insertBefore(el, next);
    } else {
        ref.parentNode.appendChild(el);
    }
}

function insertBefore(el, ref){
    ref.parentNode.insertBefore(el, ref);
}

function insertFirst(el, ref){
    if (ref.firstChild) {
        insertBefore(el, ref.firstChild);
    } else {
        ref.parentNode.appendChild(el);
    }
}

function remove(el){
    if (el && el.parentNode) {
        el.parentNode.removeChild(el);
    }
}

/**
 * Strings
 */
function normalizeUrl(url){
    if (!(/^http(s)?:/i.test(url))) {
        return 'http://' + url;
    } else {
        return url;
    }
}

//without parameter
function cleanUrl(url){
    var m = /([^\?]+)\??(.*)/.exec(url);
    if (m) {
        return m[1];
    } else {
        return url;
    }
}

function ellipsis(text, max){
    var match = text || '';
    max = max || 24;
    if (match.length > max) {
        match = match.substr(0, max - 3) + '...';
    }
    return match;
}

String.prototype.toMaj = function(){
    return this.replace(/(^\w)/, function(m){
        return m.toUpperCase();
    });
};

//To Camel Case
String.prototype.toCamel = function(){
    return this.replace(/(\-[a-z])/g, function($1){
        return $1.toUpperCase().replace('-', '');
    });
};
//To Dashed from Camel Case
String.prototype.toDash = function(){
    return this.replace(/([A-Z])/g, function($1){
        return "-" + $1.toLowerCase();
    });
};
//To Underscore from Camel Case
String.prototype.toUnderscore = function(){
    return this.replace(/([A-Z])/g, function($1){
        return "_" + $1.toLowerCase();
    });
};
function isArray(obj){
    return (obj && obj.constructor == Array);
}

/**
 * Shortcuts
 *
 */
/**
 *
 * @param fn
 * @param keys
 *  [{keycode, shift, ctrl, alt}]
 * @return
 */
function initKey(keys){
    document.addEventListener('keydown', function(e){
        var target = e.target;
        var tag = target.tagName;
        //console.log('keydown on '+tag+'.'+(tag.className||''));
        if (tag !== 'INPUT' && tag !== 'SELECT' && tag !== 'TEXTAREA') {
            if (!isArray(keys)) {
                keys = [keys];
            }
            for (var i = 0, len = keys.length; i < len; i++) {
                var k = keys[i];
                if (k.keyCode == e.keyCode &&
                ((k.shiftKey && e.shiftKey) || (!k.shiftKey && !e.shiftKey)) &&
                ((k.ctrlKey && e.ctrlKey) || (!k.ctrlKey && !e.ctrlKey)) &&
                ((k.altKey && e.altKey) || (!k.altKey && !e.altKey))) {
                    e.preventDefault();
                    //e.stopPropagation();
                    //k.fn(e);
                    if (!target.locked) {
                        //console.log('run fn for keyCode='+k.keyCode);
                        k.fn(e);
                        target.locked = true;
                        window.setTimeout(function(){
                            target.locked = false;
                        }, 300);
                    } else {
                        console.log('LOCK run fn for keyCode=' + k.keyCode);
                    }
                    break;
                }
            }
        }
    }, false);
}

function notEmpty(o){
    if (o) {
        if (isArray(o) && o.length > 0) {
            return o;
        } else if (typeof o === "object" && !isObjectEmpty(o)) {
            return o;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function isObjectEmpty(o){
    if (!o) {
        return true;
    }
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        return false;
    }
    return true;
}

function findInArray(a, value){
    for (var i = 0, len = a.length; i < len; i++) {
        if (a[i] === value) {
            return i;
        }
    }
    return false;
}

function find(o, key, value){
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        if (o[p][key] === value) {
            return o[p];
        }
    }
    return false;
}

function findre(o, key, re){
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        if (re.test(o[p][key])) {
            return o[p];
        }
    }
    return false;
}

function getCount(o){
    var count = 0;
    for (var p in o) {
        if (!hasOwnProperty.call(o, p)) {
            continue;
        }
        count++;
    }
    return count;
}

function removeClass(el, classname){
    //todo: use regex word boundary
    var s = (el.className || '').split(' ');
    for (var i = 0, len = s.length; i < len; i++) {
        if (s[i] == classname) {
            s[i] = '';
        }
    }
    el.className = s.join(' ').trim();
//el.className = el.className.replace(classname, '').trim();
}

function toggleClass(el, classDelete, classAdd){
    removeClass(el, classDelete);
    addClass(el, classAdd);
}

function fireResizeDefer(){
    window.setTimeout(fireResize, 500);
}

function fireResize(){
    fitHeight('sub-tree');
    fitHeight('entries', 'viewer-footer');
}

function fitHeight(id, bottom){
    var el = document.getElementById(id);
    var h = findTop(el);
    if (bottom) {
        var elb = document.getElementById(bottom);
        if (elb) {
            h -= elb.clientHeight;
        }
    }
    el.style.height = (window.innerHeight - h) + 'px';
}

function findTop(obj){
    var curtop = 0;
    if (obj.offsetParent) {
        do {
            curtop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return curtop;
    }
}

function getStyle(el, property){
    if (el && el.style && el.style[property]) {
        return parseInt(el.style[property].replace('px', ''), 10);
    } else {
        return 0;
    }
}

function simulateClick(node){
    var event = node.ownerDocument.createEvent("MouseEvents");
    event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    /* ReadByMouse
 event.initMouseEvent("click", true, // can bubble
 true, // cancellable
 node.ownerDocument.defaultView, 1, // clicks
 50, 50, // screen coordinates
 50, 50, // client coordinates
 false, false, false, false, // control/alt/shift/meta
 0, // button,
 node);
 */
    node.dispatchEvent(event);
}

function simulateKeypress(node, keycode){
    var event = node.ownerDocument.createEvent("KeyboardEvent");
    if (typeof keycode === "string") {
        keycode = keycode.charCodeAt(0);
    }
    event.initKeyEvent("keypress", true, true, window, 0, 0, 0, 0, 0, keycode);
    //event.initKeyboardEvent('keypress', true, true, window, "U+0041");
    node.dispatchEvent(evt);
}

/**
 * Shortcuts
 * @param {Object} e
 */
function getStringFromCharCode(codePt){
    if (codePt > 0xFFFF) {
        codePt -= 0x10000;
        return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
    } else if (keycodes && keycodes[codePt]) {
        return keycodes[codePt];
    } else {
        return String.fromCharCode(codePt);
    }
}

//saved under format CTRL[0,1]ALT[0,1]SHIFT[0,1]keyCode
function unmarshallKey(text){
    var m = /(\d)(\d)(\d)(\d+)/.exec(text || '');
    var key = {};
    if (m) {
        key = {
            ctrlKey: (m[1] === '1'),
            altKey: (m[2] === '1'),
            shiftKey: (m[3] === '1'),
            keyCode: m[4]
        };
    }
    return key;
}

function marshallKey(e){
    return ((e.ctrlKey) ? '1' : '0') + ((e.altKey) ? '1' : '0') + ((e.shiftKey) ? '1' : '0') + e.keyCode;
}

function formatKey(e, keyFirst){
    var keyLetter = getStringFromCharCode(e.keyCode);
    if (keyFirst) {
        return keyLetter + ((e.ctrlKey) ? '+ctrl' : '') + ((e.altKey) ? '+alt' : '') + ((e.shiftKey) ? '+shift' : '');
    } else {
        return ((e.ctrlKey) ? 'ctrl+' : '') + ((e.altKey) ? 'alt+' : '') + ((e.shiftKey) ? 'shift+' : '') + keyLetter;
    }
}

/**
 * Cookies
 *
 */
function readCookie(name){
    name = name.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    var regex = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)', 'i'), match = document.cookie.match(regex);
    return match && unescape(match[1]);
}

/**
 * Templates
 */
function fillTpl(tpl, o){
    var txt = '' + tpl;
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            if (typeof o[k] !== "object") {
                var re = new RegExp("\\{" + k + "\\}", "g");
                txt = txt.replace(re, (o[k]) ? ('' + o[k]) : '');
            }
        }
    }
    return txt;
}

//Format text using number {0}
function formatText(tpl){
    if (!arguments) {
        return '';
    }
    var args = Array.prototype.slice.call(arguments, 1);
    var values = {};
    for (var i = 0, len = args.length; i < len; i++) {
        values[i] = args[i];
    }
    return fillTpl(tpl, values);
}

function getGlobal(){
    return (window.GRP = window.GRP || {});
}

var keycodes = {
    8: 'backspace',
    9: 'tab',
    13: 'enter',
    16: 'shift',
    17: 'ctrl',
    18: 'alt',
    19: 'pause',
    20: 'capslock',
    27: 'escape',
    33: 'pageup',
    32: 'space',
    34: 'pagedown',
    35: 'end',
    36: 'home',
    37: 'arrowleft',
    38: 'arrowup',
    39: 'arrowright',
    40: 'arrowdown',
    44: 'printscreen',
    45: 'insert',
    46: 'delete',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    91: 'leftwindowkey',
    92: 'rightwindowkey',
    93: 'selectkey',
    96: '0 pad',
    97: '1 pad',
    98: '2 pad',
    99: '3 pad',
    100: '4 pad',
    101: '5 pad',
    102: '6 pad',
    103: '7 pad',
    104: '8 pad',
    105: '9 pad',
    106: '*',
    107: '+',
    109: '-',
    110: '.',
    111: '/',
    112: 'f1',
    113: 'f2',
    114: 'f3',
    115: 'f4',
    116: 'f5',
    117: 'f6',
    118: 'f7',
    119: 'f8',
    120: 'f9',
    121: 'f10',
    122: 'f11',
    123: 'f12',
    144: 'numlock',
    145: 'scrolllock',
    182: 'MyComputer',
    183: 'MyCalculator',
    186: ';',
    187: '=',
    188: ',',
    189: 'dash',
    190: 'period',
    191: '/',
    219: '(',
    220: '\\',
    221: ')',
    222: '\''
};
//a.href sometimes truncated
function getHref(a){
    var url = a.protocol + '//' + a.host + a.pathname + (a.hash || '');
    return url;
}

function adjustIframeHeight(iframe, heightMaxi){
    var el;
    if (iframe.document.height) {
        el = parent.document.getElementById(iframe.name);
        el.style.height = iframe.document.height + 'px';
    //el.style.width = iframe.document.width + 'px';
    } else if (document.all) {
        el = parent.document.all[iframe.name];
        if (iframe.document.compatMode &&
        iframe.document.compatMode != 'BackCompat') {
            el.style.height = iframe.document.documentElement.scrollHeight + 5 + 'px';
        //el.style.width = iframe.document.documentElement.scrollWidth + 5 + 'px';
        } else {
            el.style.height = iframe.document.body.scrollHeight + 5 + 'px';
        //el.style.width = iframe.document.body.scrollWidth + 5 + 'px';
        }
    }
}

function bind(func, thisArg){
    var args = Array.prototype.slice.call(arguments, 2);
    return function(){
        var bargs = args.concat(Array.prototype.slice.call(arguments));
        func.apply(thisArg, bargs);
    };
}

function foreach(array, fn, scope){
    if (!array) {
        return;
    }
    if (typeof array.length == "undefined") {
        array = [array];
    }
    for (var i = 0, len = array.length; i < len; i++) {
        if (fn.call(scope || array[i], array[i], i, array) === false) {
            return i;
        }
    }
}

function map2array(o, key, value, flat){
    var r = [];
    iterate(o, function(p, o){
        var a = {};
        a[key || 'key'] = p;
        if (flat && typeof o === "object") {
            iterate(o, function(k, obj){
                a[k] = obj;
            });
        } else {
            a[value || 'value'] = o;
        }
        r.push(a);
    });
    return r;
}

function iterate(o, fn, scope, id){
    if (o) {
        for (var p in o) {
            if (!hasOwnProperty.call(o, p)) {
                continue;
            }
            if (typeof id !== 'undefined') {
                o[p][(typeof id === "string") ? id : 'id'] = p;
            }
            fn.call(scope || this, p, o[p]);
        }
    }
    return false;
}

function namespace(){
    var o, d;
    foreach(arguments, function(v){
        d = v.split(".");
        o = window[d[0]] = window[d[0]] || {};
        foreach(d.slice(1), function(v2){
            o = o[v2] = o[v2] || {};
        });
    });
    return o;
}

function apply(o, c, defaults){
    if (defaults) {
        apply(o, defaults);
    }
    if (o && c && typeof c === 'object') {
        for (var p in c) {
            o[p] = c[p];
        }
    }
    return o;
}

//Override text with last item
function merge(o, c, defaults){
    if (defaults) {
        merge(o, defaults);
    }
    if (typeof o !== "undefined" && typeof c !== "undefined") {
        /*if (isArray(c)) {
 for (var i = 0, len = c.length; i < len; i++) {
 //o[i] = c[i];
 //console.log(c[i] + ' Amerge['+i+']> ' + o[i]);
 if (typeof c[i] === 'object' || isArray(c[i])) {
 merge(o[i], c[i]);
 } else {
 o[i] = c[i];
 }
 }
 //console.log('after: ' + c[i] + ' Amerge[' + i + ']> ' + o[i]);
 } else */
        if (typeof c === 'object') {
            for (var p in c) {
                //console.log(c[p] + ' Omerge['+p+']> ' + o[p]);
                if (typeof c[p] === 'object' || isArray(c[p])) {
                    merge(o[p], c[p]);
                } else {
                    o[p] = c[p];
                }
            }
        } else {
            //o[p] = c[p];
            //console.log(c + ' -> ' + o);
            o = c;
        }
    }
    return o;
}

function group(a, name){
    var r = {};
    iterate(a, function(id, o){
        var val = o[name] || 'other';
        if (!r[val]) {
            r[val] = {};
        }
        r[val][id] = o;
    });
    return r;
}

function applyRemoteLang(lang, base, id, o, fn, scope){
    GM_xmlhttpRequest({
        method: 'GET',
        url: base + '_locales/' + lang + '/' + id + '.json',
        onload: function(res){
            var data = eval(xhr.responseText);
            if (data) {
                //merge data into o
                applyLast(o[id], data);
            }
        },
        onerror: function(res, a){
            if (a && a.url) {
                console.error(a.url);
            }
            console.error(res);
        }
    });
}

//http://snipplr.com/view/9649/escape-regular-expression-characters-in-string/
//http://simonwillison.net/2006/Jan/20/escape/
var re_encodeRE = new RegExp("[.*+?|()\\[\\]{}\\\\]", "g"); // .*+?|()[]{}\
function encodeRE(s){
    return s.replace(re_encodeRE, "\\$&").replace(' ', '\\W');
}

function urlDecode(string){
    var obj = {}, pairs = string.split('&'), d = decodeURIComponent, name, value;
    for (var i = 0, len = pairs.length; i < len; i++) {
        var pair = pairs[i];
        pair = pair.split('=');
        name = d(pair[0]);
        value = d(pair[1]);
        obj[name] = !obj[name] ? value : [].concat(obj[name]).concat(value);
    }
    return obj;
}

function getDomain(url, withProtocol){
    var m = url.split(/\/|\?/);
    if (withProtocol) {
        return m[0] + '/' + m[1] + '/' + m[2];
    } else {
        return m[2];
    }
}

/*
 isChromeVersionMini('5.0.342.1')
 compareVersion('5.1', '5.0.342.1');->=true
 compareVersion('5.0.100', '5.0.342.1');->=false
 */
//Chrome mini version required
function isChromeVersionMini(ref){
    var version = /Chrome\/([\d\.]+)/.exec(window.navigator.appVersion);
    return (compareVersion(version[1], ref) >= 0);
}

//compare 2 first segments
function isVersionMajorUpdated(oldVersion, newVersion){
    return (compareVersion(newVersion, oldVersion, 2) > 0);
}

function compareVersion(version, ref, count){
    if (!ref) {
        //new version, no previous version
        return 1;
    }
    var versions = version.split('.');
    var refs = ref.split('.');
    count = count || versions.length;
    for (var i = 0, len = count; i < len; i++) {
        versions[i] = parseInt(versions[i], 10);
        if (i <= refs.length) {
            refs[i] = parseInt(refs[i], 10);
            if (versions[i] < refs[i]) {
                return -1;
            } else if (versions[i] > refs[i]) {
                return 1;
            }
        }
    }
    return 0;
}

function textareaTab(){
    //Let handle tab on textarea
    var areas = document.getElementsByTagName('textarea');
    if (areas) {
        for (var i = 0, len = areas.length; i < len; i++) {
            areas[i].addEventListener('keydown', function(e){
                var t = e.target;
                if (e.keyCode == 9) {
                    e.preventDefault();
                    var tab = '\t';
                    var ss = t.selectionStart;
                    var se = t.selectionEnd;
                    var currentScroll = t.scrollTop;
                    // Indent
                    if (ss != se && t.value.slice(ss, se).indexOf("\n") != -1) {
                        var pre = t.value.slice(0, ss);
                        var selb = t.value.slice(ss, se);
                        if (e.shiftKey) {
                            //un-indent
                            sel = selb.replace(/^\t/mg, "\n");
                        } else {
                            //indent
                            sel = selb.replace(/\n/g, "\n" + tab);
                        }
                        var post = t.value.slice(se, t.value.length);
                        t.value = pre.concat(tab).concat(sel).concat(post);
                        t.selectionStart = ss + tab.length;
                        t.selectionEnd = se + (sel.length - selb.length);
                    } else {
                        t.value = t.value.slice(0, ss).concat(tab).concat(t.value.slice(ss, t.value.length));
                        if (ss == se) {
                            t.selectionStart = t.selectionEnd = ss + tab.length;
                        } else {
                            t.selectionStart = ss + tab.length;
                            t.selectionEnd = se + tab.length;
                        }
                    }
                    t.scrollTop = currentScroll;
                    t.focus();
                    return false;
                } else {
                    return true;
                }
            });
        }
    }
}

function waitlib(check, fn, scope){
    if (check()) {
        if (fn) {
            fn.call(scope || this);
        }
    } else {
        window.setTimeout(function(){
            waitlib(check, fn);
        }, 200);
    }
}

function waitImages(images, cb, scope){
    var count = (images) ? images.length : 0;
    if (count <= 0) {
        cb.call(scope || this, true);
    } else {
        var timeout = window.setTimeout(function(){
            console.log("Images are not all loaded: " + count);
            cb.call(scope || this, false);
        }, 3000);
        function check(){
            if (count === 0) {
                window.clearTimeout(timeout);
                cb.call(scope || this, true);
            }
        }
        for (var i = 0, len = images.length; i < len; i++) {
            var image = images[i];
            if (image.complete) {
                count--;
            } else {
                image.addEventListener('load', function(){
                    count--;
                    check();
                });
            }
        }
        check();
    }
}

function isShown(el){
    return (el && el.style && el.style.display !== 'none' && el.visibility !== 'hidden');
}

function show(el, value){
    if (el) {
        el.style.display = value || '';
    }
}

function hide(el){
    if (el) {
        el.style.display = 'none';
    }
}

function toggle(el){
    if (isShown(el)) {
        hide(el);
    } else {
        show(el);
    }
}

function showas(el, hideme){
    if (hideme) {
        hide(el);
    } else {
        show(el);
    }
}

//http://forums.mozillazine.org/viewtopic.php?f=19&t=1806595
//http://forums.mozillazine.org/viewtopic.php?f=19&t=1594275
//https://developer.mozilla.org/En/Code_snippets:HTML_to_DOM
function loadXml(html, id){
    var el = document.createElement('div');
    el.style.display = 'none';
    el.innerHTML = (html.split(/<body[^>]*>((?:.|\n)*)<\/body>/i)[1]) || html;
    return el;
}

function loadText(url, cb){
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function(r){
            var txt = r.responseText;
            cb(txt);
        }
    });
}

function loadCss(url, cb){
    loadText(url, function(txt){
        var css = compact(txt).replace(/\/\*.*?\*\//g, '');
        cb(css);
    });
}

function compact(text){
    return text.replace(/[\n\t]/g, '').replace(/\s+/g, ' ');
}

//Only works with XML well-formed
function getDocumentXml(html, id){
    var h = html.replace(/^(.*\n)*.*<html/i, "<html");
    h = h.replace(/<\/html>(.*\n)*.*$/i, "</html>");
    var parser = new DOMParser();
    var dom = parser.parseFromString(t, "text/xml");
    return dom;
}

function loadXMLDoc(url){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send("");
    return xhr.responseXML;
}

function applyXsl(xml, xsl){
    var oxml = loadXMLDoc(xml);
    var oxsl = loadXMLDoc(xsl);
    var xp = new XSLTProcessor();
    xp.importStylesheet(oxsl);
    var doc = xp.transformToFragment(oxml, document);
    return doc;
}

var tmaps = {
    id: 'id',
    cls: 'className',
    style: 'style',
    href: 'href',
    alt: 'alt',
    title: 'title',
    text: 'innerText',
    html: 'innerHTML'
};
function dh(root, tag, attrs, events){
    var config = attrs;
    if (root) {
        config.root = root;
    }
    if (tag) {
        config.tag = tag;
    }
    if (events) {
        config.events = events;
    }
    return dhc(config);
}

function dhc(config){
    if (!config) {
        return false;
    }
    var root = config.root;
    if (!root) {
        root = document.body;
    } else if (typeof config.root == "string") {
        root = get_id(config.root);
        if (!root) {
            return false;
        }
    }
    var excepts = {
        root: 1,
        tag: 1,
        events: 1,
        el: 1
    };
    var el = document.createElement(config.tag || 'div');
    iterate(config, function(k, o){
        if (typeof o !== 'undefined') {
            if (excepts[k] !== 1) {
                if (tmaps[k]) {
                    el[tmaps[k]] = o;
                } else {
                    addAttr(el, k, o);
                }
            }
        }
    });
    iterate(config.events, function(event, fn){
        el.addEventListener(event, fn, false);
    });
    if (config.el) {
        //recurse
        var cfg = config.el;
        cfg.root = el;
        dhc(cfg);
    }
    if (config.position) {
        if (config.position === 'before') {
            insertBefore(el, root);
        } else {
            insertAfter(el, root);
        }
    } else {
        root.appendChild(el);
    }
    return el;
}

function newel(id, cls){
    var el = get_id(id);
    if (el) {
        return el;
    } else {
        return dh('', 'div', {
            id: id,
            cls: cls
        });
    }
}

function randomItem(items){
    return items[Math.round(Math.random() * (items.length - 1))];
}

function loadjQuery(cb, version, local){
    version = version || '1';
    var url = (local) ? (LOCALPATH + 'lib/jquery.min.js') : ('http://ajax.googleapis.com/ajax/libs/jquery/' + version + '/jquery.min.js');
    GM_loadScript(url, false, function(){
        return (typeof jQuery !== "undefined");
    }, cb);
}

function runfn(fn, id, priority, delay){
    GRP.fns.push({
        fn: fn,
        id: id,
        delay: delay,
        priority: priority
    });
}

function encodeu(el){
    return escape(encodeURIComponent(el));
}

function decodeu(el){
    return decodeURIComponent(unescape(el));
}
