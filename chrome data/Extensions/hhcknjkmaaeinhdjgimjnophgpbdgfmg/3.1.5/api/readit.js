/**
 * Readitlater and instapaper API
 */
GRP.api_readit = function(prefs, langs, ID, scriptlangs, lang, api){
    var o = apply({}, langs.readit);
	var SL = apply(o, scriptlangs);
    function addButton(el, entry, mode){
        var text = SL.text + formatShortcut(ID, ID, prefs);
        addBottomLink(el, SL.keyword, text, ID, 'item-star star', false, readitlaterClick, false, entry, mode);
    }
    function addKey(){
        onKey('btn-' + ID, readitlaterClick);
    }
    function readitlaterClick(btn, entry, locked){
        //var active = isActive(btn, entry, ID, locked);
        readitlater(entry, btn);
    }
    function readitlater(entry, btn){
        var auth = getAuth();
        if (!auth) {
            return;
        }
        var link = getEntryLink(entry);
        var body = getBody(entry);
        var params = {
            url: link.url,
            title: link.title,
            selection: body.innerText
            //selection: window.getSelection().toString()
        };
        //login(auth, params, btn);
        //direct
        post(auth, params, btn);
    }
    function login(auth, params, btn){
        GM_xmlhttpRequest({
            method: 'GET',
            url: api.auth,
            parameters: auth,
            onload: function(r){
                if (r.status == api.successCode) {
                    //login success
                    post(auth, params, btn);
                } else if (api.errors[r.status]) {
                    alert(SL[api.errors[r.status]]);
                } else {
                    alert(SL.error);
                }
            }
        });
    }
    function post(auth, params, btn){
        params.username = auth.username;
        if (auth.password) {
            params.password = auth.password;
        }
        GM_xmlhttpRequest({
            method: 'GET',
            url: api.add,
            parameters: params,
            onload: function(r){
                if (r.status == api.successCode) {
                    //set star active
                    addClass(btn, 'item-star-active');
                    removeClass(btn, 'item-star');
                } else if (api.errors[r.status]) {
                    alert(SL[api.errors[r.status]]);
                } else {
                    alert(SL.error);
                }
            }
        });
    }
    function getAuth(){
        var username = prefs[ID+'_username'];
        var password = prefs[ID+'_password'];
        if (typeof username === "undefined" || username === '') {
            alert(SL.nologin);
            return false;
        }
        return {
            username: username,
            password: password
        };
    }
    function clearAuth(){
        //GM_setValue(ID+'_username', '');
        //GM_setValue(ID+'_password', '');
    }
    registerFeature(addButton, ID);
    var keycode = getShortcutKey(ID, 'share', prefs);
    keycode.fn = addKey;
    initKey(keycode);
};
