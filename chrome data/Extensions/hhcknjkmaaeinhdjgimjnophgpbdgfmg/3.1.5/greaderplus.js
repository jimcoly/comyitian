/**
 * Reader Plus
 *
 * Adds favicons to feeds and entries
 *
 * Author : LudoO
 *
 * ChangeLog: cf about.html
 */
(function(){
    var ReaderPlus = {
        init: function(){
            console.log("Starts ReaderPlus");
            window.GRP = window.GRP || {};
            GRP.language = function(){
                //dummy
            };
            GRP.fns = [];
            GRP.IMAGES_PATH = 'http://googlereaderplus.googlecode.com/svn/trunk/GoogleReaderPlus/src/images';
            this.prefs = {};
            var me = this;
            chrome.extension.sendRequest({
                message: "getprefs"
            }, function(a){
                me.prefs = a.prefs;
                me.initprefs.call(me);
            });
        },
        initprefs: function(){
            this.lang = this.prefs.language_lang || 'en';
            loadLangs(this.lang, function(){
                console.log("ReaderPlus in " + this.lang);
                this.runExtra();
                this.fixMenu();
            }, this);
        },
        runExtra: function(){
            var count = 0;
            if (GRP.scripts) {
                var langs = GRP.langs[this.lang].texts;
                iterate(GRP.scripts, function(id, script){
                    if (script && this.prefs[id]) {
                        ++count;
                        this.run(id, langs);
                    }
                }, this, true);
                console.log("ReaderPlus is running with " + count + "/" + getCount(GRP.scripts) + " features");
                //Start entries monitoring 
                monitorEntries();
                if (GRP.fns && GRP.fns.length > 0) {
                    function priorityfns(a, b){
                        return (a.priority - b.priority);
                    }
                    GRP.fns.sort(priorityfns);
                    foreach(GRP.fns, function(o){
                        if (o.fn) {
                            console.log('Run priority ' + o.id + ' - ' + o.priority);
                            if (o.delay) {
								window.setTimeout(o.fn, o.delay);
							} else {
								o.fn();
							}
                        }
                    });
                }
            } else {
                console.error("ReaderPlus failed to load any features!!");
            }
        },
        run: function(o, langs){
            if (o && o !== "false") {
                if (o == 'theme') {
                    //skin
                    console.log("**** run " + o);
                    GRP.theme(this.prefs, langs, this);
                } else {
                    if (window.GRP[o]) {
                        console.log("**** run " + o);
                        try {
                            //console.log("myport(run) "+this.myport.portId_);
                            window.GRP[o].call(window, this.prefs, langs, o, langs[o]||{}, this.lang);
                        } catch (e) {
                            console.error(e);
                        }
                    } else {
                        console.log("ERROR: can't run " + o);
                    }
                }
            }
        },
        fixMenu: function(langs){
            function addItem(text, cb){
				dh('gbg', 'a', {
	                href: '#',
	                cls: 'gb2',
	                text: text
	            }, {
	                click: cb
	            });
			}
			
			//dh('gbg', 'br', {cls: 'brmenu'});
			addItem(getText(this.lang, 'ig', 'menu_prefs', 'en', 'Reader+ preferences'), 
                function(){
                    GM_openInTab('chrome-extension://' + GUID_CORE + '/preferences.html');
                }
            );
            addItem(getText(this.lang, 'ig', 'menu_theme', 'en', 'Theme configuration'), 
                function(){
                    GM_openInTab('chrome-extension://' + GUID_CORE + '/preferences.html#ig');
                }
            );
			addItem(getText(this.lang, 'general', 'menu_clearcache', 'en', 'Clear cache'), 
                function(){
                    clearcache(this.lang);
                }
            );
        }
        /*,fixlang: function(){
         this.lang = this.prefs.language_lang || 'en';
         this.stack = ['texts', 'scripts', 'skins', 'googleshortcuts'];
         var base = 'chrome://extensions/'+GUID_CORE+'/';
         this.runExtra();
         this.i18n(this.lang, this.runExtra, this.stack, base, this);
         },*/
        /*i18n: function(lang, fn, stack, base, scope){
         var cb = function(i){
         i++;
         if (i < stack.length) {
         applyRemoteLang(lang, base, stack[i], GRP, cb, scope);
         } else {
         //get out
         fn.call(scope || this, []);
         }
         };
         cb(-1);
         }*/
    };
    ReaderPlus.init();
})();
