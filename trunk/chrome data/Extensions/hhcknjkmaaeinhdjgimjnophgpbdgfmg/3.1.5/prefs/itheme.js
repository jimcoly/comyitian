//
//Utility to render iGoogle themes
// http://www.google.com/ig/directory?type=themes
// 
var tpl_ig_skin_block = '{{%IMPLICIT-ITERATOR}}' +
'<div class="indi_cats">{{#cats}}' +
'<span class="indi_link" onclick="javascript:igcat(\'{{id}}\')">{{name}}</span> ' +
'{{/cats}}</div>' +
'<div class="indi_sort">{{#sorts}}' +
'<span class="indi_link" onclick="javascript:igsort(\'{{id}}\')">{{name}}</span> - ' +
'{{/sorts}}</div>' +
'<form onsubmit="javascript:igsearch();return false;"><input type="text" value="{{q}}" size="20" id="igq"><input type="submit" value="{{txt_search}}">' +
'&nbsp;<span class="indi_link" onclick="javascript:igprevious()">{{txt_previous}}</span> - ' +
'<span class="indi_link" onclick="javascript:ignext()">{{txt_next}}</span> - ' +
'<span class="indi_link" onclick="javascript:igrnd()">{{txt_random}}</span>' +
'</form>' +
'<div class="indi_entries">' +
'{{#entry}}<div class="indi_entry">' +
'<div class="indi_entry_title_wrap"><div class="indi_entry_title">{{title}}</div></div>' +
'<div class="indi_thumbnail"><img class="indi_img" src="http://skins.gmodules.com/ig/skin_fetch?type=4&sfkey={{dthumbnail}}" onclick="javascript:setTheme(\'{{skin_id}}\')"/></div>' +
'</div>{{/entry}}</div>';
var entries = {}, ig_cat, ig_q = '', ig_pos = 0, ig_page = 4 * 12, ig_sort = 'popular';
var ig_cats = [{
    id: '',
    name: 'All'
}, {
    id: 'artist',
    name: 'Artist'
}, {
    id: 'games',
    name: 'Games'
}, {
    id: 'naturecampaign',
    name: 'Nature'
}, {
    id: 'comics',
    name: 'Comics'
}, {
    id: 'food',
    name: 'Food'
}, {
    id: 'travel',
    name: 'Travel'
}, {
    id: 'animals',
    name: 'Animals'
}, {
    id: 'nature',
    name: 'Environment'
}, {
    id: 'sports',
    name: 'Sports'
}, {
    id: 'destinations',
    name: 'Destinations'
}, {
    id: 'abstract',
    name: 'Abstract'
}, {
    id: 'trendy',
    name: 'Trendy'
}, {
    id: 'fun',
    name: 'Fun'
}, {
    id: 'causes',
    name: 'Causes'
}];
var ig_sorts = [{
    id: 'popular',
    name: 'Popular'
}, {
    id: 'users',
    name: 'Most users'
}, {
    id: 'newest',
    name: 'Newest'
}];
function igsearch(){
    var q = get_id('igq');
    if (q) {
        ig_q = q.value;
        renderThemes(ig_cat, ig_pos, ig_sort, ig_q);
    }
}

function ignext(){
    ig_pos = ig_pos + ig_page;
    renderThemes(ig_cat, ig_pos);
}

function igprevious(){
    ig_pos = Math.max(0, ig_pos - ig_page);
    renderThemes(ig_cat, ig_pos);
}

var randomCallback, lastSkin;
function getRandomTheme(current, cb, inBg){
    ig_cat = randomItem(ig_cats).id;
    ig_sort = randomItem(ig_sorts).id;
    ig_pos = 0;
    var o = {
        cat: ig_cat,
        pos: ig_pos,
        sort: ig_sort,
        q: ''
    };
    lastSkin = current;
    randomCallback = cb;//global way
    if (inBg) {
        callApi('randomThemeBg', o, inBg);
    } else {
        callApi('randomTheme', o, inBg);
    }
}

function randomThemeBg(data){
    randomTheme(data, true);
}

function randomTheme(data, inBg){
    if (randomCallback) {
        var entries = data.feed.entry;
        if (entries && entries.length > 0) {
            entry = randomItem(entries);
            if (checkSkin(entry, lastSkin)) {
                randomCallback(entry);
            } else {
                //retry
                getRandomTheme(lastSkin, randomCallback, inBg);
            }
        }
    }
}

function igrnd(){
    ig_cat = randomItem(ig_cats).id;
    ig_sort = randomItem(ig_sorts).id;
    ig_pos = Math.round(Math.random() * 10) - 1;
    renderThemes(ig_cat, ig_pos, ig_sort);
}

function igcat(cat){
    if (cat === 'all') {
        cat = '';
    }
    renderThemes(cat);
}

function igsort(sort){
    renderThemes(ig_cat, ig_pos, sort);
}

function setTheme(id){
    var entry = find(entries.entry, 'skin_id', id);
    if (!entry) {
        return;
    }
    var el = get_id('ig_skin_name');
    if (el) {
        el.value = entry.title;
    }
    el = get_id('ig_skin_url');
    if (el) {
        var link = entry.link;
        if (!(/^http(s)?:/i.test(link))) {
            if (!(/^\//.test(link))) {
                link = '/' + link;
            }
            link = 'http://skins.gmodules.com' + link;
        }
        el.value = link;
    }
}

function callApi(callback, o, inBg){
    lang = o.lang || lang || 'en';
    ig_cat = o.cat || '';
    ig_pos = o.pos || 0;
    ig_sort = o.sort || ig_sort;
    ig_q = (typeof o.q === 'undefined') ? ig_q : o.q;
    var api = 'http://www.google.com/ig/directory?type=themes&output=json&callback=' + callback + '&sort=' + ig_sort + '&cat=' + ig_cat + '&gl=us&hl=en&start=' + ig_pos + '&num=' + ig_page;
    if (ig_q) {
        api += '&q=' + ig_q;
    }
    var a = {
        url: api,
        onload: function(xhr){
            var txt = xhr.responseText;
            var re = new RegExp("^" + callback);
            if (txt && (re.test(txt))) {
                eval(txt);
            }
        }
    };
    if (inBg) {
        request(a, true);
    } else {
        GM_xmlhttpRequest(a);
    }
}

function renderThemes(cat, pos, sort, q){
    var o = {
        cat: cat || '',
        pos: pos || 0,
        sort: sort || '',
        q: q || ''
    };
    callApi('setThemes', o);
}

function checkSkin(entry, lastSkin){
    return (entry && entry.skin_id && parseInt(entry.skin_id, 10) > 1000 && entry.title !== lastSkin);
}

function setThemes(data){
    entries = data.feed || {};
    var e2 = [];
    foreach(entries.entry, function(entry){
        //Ignore special theme such sampler and default, i dont know how to get them
        if (checkSkin(entry)) {
            e2.push(entry);
        }
    });
    entries.entry = e2;
    apply(entries, {
        cats: ig_cats,
        sorts: ig_sorts,
        q: ig_q,
        txt_add: getTextPrefs(lang, 'ig', 'add') || 'Add it now',
        txt_next: getTextPrefs(lang, 'ig', 'next') || 'Next',
        txt_previous: getTextPrefs(lang, 'ig', 'previous') || 'Previous',
        txt_random: getTextPrefs(lang, 'ig', 'random') || 'Randm',
        txt_search: getTextPrefs(lang, 'ig', 'search') || 'Search themes',
        dthumbnail: function(){
            return encodeURIComponent(decodeURIComponent(this.thumbnail));
        }
    });
    var el = get_id('ig_themes');
    if (el) {
        var html = Mustache.to_html(tpl_ig_skin_block, entries);
        //console.log(html);
        el.innerHTML = html;
        checkImages(el);
    }
}

function checkImages(el){
    window.setTimeout(function(){
        var retry = false, imgs = el.getElementsByClassName('indi_img');
        foreach(imgs, function(img){
            if (img.complete) {
                if (img.width < 50) {
                    img.src = img.src.replace('type=4', 'type=2');
                }
                addClass(img, 'indi_image');
            } else {
                retry = true;
            }
        });
        if (retry) {
            checkImages(el);
        }
    }, 500);
}

function dblQuote(txt){
    return txt.replace(/\"/g, "%#22").replace(/'/g, "\"").replace(/%#22/g, "\"");
}

