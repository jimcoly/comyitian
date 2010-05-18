/*
 * limit (aka limit)
 */
GRP.limit = function(prefs, langs, ID, SL, lang){
    var nent = prefs.limit_mini || 30, lsup = prefs.limit_maxi || 200;
    var c, ent = 0, bor = 0, bsig = 0, nbor = 0, centi = false;
    var entries = get_id("entries");
    entries.addEventListener("DOMNodeInserted", function(e){
        if (hasClass(e.target, 'entry')) {
            try {
                //ent += 1;
                ent = entries.childNodes.length;
                if ((ent > lsup) && (!centi)) {
                    centi = true;
                    //console.log(ent + '>' + lsup);
                    nbor = entries.scrollTop;
                    c = getCurrentEntry();
                    while (bor + bsig <= nbor) {
                        actual = entries.firstChild;
                        bsig = Math.floor(actual.nextSibling.offsetHeight / 2);
                        bor = bor + actual.offsetHeight;
                        console.log('remove ' + actual.className);
                        entries.removeChild(actual);
                    }
                    ent = nent;
                    bor = 0;
                    entries.scrollTop = 0;
                    if (!c) {
                        c = entries.firstChild;
                    }
                    //TODO: why current-entry is removed ?
                    window.setTimeout(function(){
                        selectCurrentEntry(c);
                    }, 300);
                    centi = false;
                }
            } catch (e) {
            }
        }
    }, false);
};
