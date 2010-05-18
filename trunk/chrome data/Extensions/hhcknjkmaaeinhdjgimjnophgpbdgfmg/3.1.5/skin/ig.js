/**
 * Use iGoogle Theme for Reader
 *
 */
//http://www.google.com/ig/directory?type=themes
//http://code.google.com/apis/themes/docs/dev_guide.html
GRP.ig = function(prefs, langs, ID, SL, lang){
    var skin_url = prefs.ig_skin_url;
    var skin_name = prefs.ig_skin_name||'';
    var ig_debug = prefs.ig_debug;
    var menu_item;
    var css = GM_getValue('cache_ig_'+skin_name);
    fixMenu();
    if (prefs.ig_userandomthemes) {
        var t = parseInt(prefs.ig_randomthemes, 10) || 5;
        window.setInterval(function(){
            rndskin();
        }, t * 60000);
        rndskin();
    } else {
        setcss(css, skin_url);
    }
    function fixMenu(){
        menu_item = dh('gbg', 'a', {
            href: '#',
            id: 'grp_ch_theme',
            cls: 'gb2',
            html: (getText(lang, 'ig', 'menu_randomtheme') || 'Change theme :') + ' <span id="th_cur">' + skin_name + '</span>'
        }, {
            click: function(){
                rndskin();
            }
        });
    }
    function rndskin(){
        var data = {
            message: 'igtheme',
            type: 'random',
			current:skin_name
        };
        chrome.extension.sendRequest(data, function(entry){
				setcss('', entry.link);
				var item = get_id('th_cur');
				if (item) {
					item.innerHTML = entry.title;
				}
        });
    }
    function setcss(css, xml, entry){
        if (css) {
            GM_addStyle(css, 'theme_ig');
        } else {
            loadCss('skin/css/ig.css', function(css){
                var tplCss = css.replace(/_a_/g, '{').replace(/_z_/g, '}');
                stylish(tplCss, xml, entry);
            });
        }
    }
    function igurl(url){
        return 'http://skins.gmodules.com/ig/skin_fetch?fp=&type=2&sfkey=' + encodeURIComponent(url.replace(/&amp;/g, '&'));
    }
    function convertHours(h){
        var t = 0;
        if (/am$/.test(h)) {
            //am
            t = 12;
        } else {
            //pm
            t = 0;
        }
        t += parseInt(h.replace('/[apm]/g', ''), 10);
        return t;
    }
    function stylish(tplCss, xml, entry){
        GM_xmlhttpRequest({
            method: 'GET',
            url: xml,
            onload: function(r){
                var text = compact(r.responseText);
                var colors = {};
                var skin, skins = [], metadata, ms, reSkins = /<ConfigMap\s+type="Skin">(.*?)<\/ConfigMap>/g;
                var f = 0;
                while ((ms = reSkins.exec(text)) !== null) {
                    if (f > 0) {
                        skins.push(ms[0]);
                    } else {
                        //first is metadata
                        metadata = ms[0];
                    }
                    f++;
                }
				if (skins.length===0){
					console.error('Not XML valid for iGoogle Theme:'+ xml);
					return;
				}
				
                if (prefs.ig_randomtime) {
                    var index = Math.floor(Math.random() * skins.length);
                    skin = skins[index];
                } else {
                    var hc = (new Date()).getHours();
                    var i = 0;
                    var reTrait = /<Trait\s+name="TimeOfDay">([^<]+)<\/Trait>/g;
                    function checkTime(skin){
                        var mt;
                        while ((mt = reTrait.exec(skin)) !== null) {
                            if (mt && mt[1]) {
                                var h = mt[1].split('-');
                                var a = convertHours(h[0]);
                                var b = convertHours(h[1]);
                                if (hc >= a && hc <= b) {
                                    return true;
                                }
                            }
                        }
                    }
                    for (var i = 0, len = skins.length; i < len; i++) {
                        skin = skins[i];
                        if (checkTime(skin)) {
                            break;
                        }
                    }
                }
				if (entry) {
					skin_name = entry.title;
					skin_url = entry.link;
				}
				
				var debug = '', reAttrs = /<Attribute\s+name="([^"]+)">([^<]+)<\/Attribute>/g;
				if (ig_debug) {
					debug += '<a href="http://www.google.com/ig/directory?q=' + encodeURIComponent(skin_name) + '&type=themes" target="igtheme">' + skin_name + '</a><br/>';
				}
                while ((m = reAttrs.exec(skin)) !== null) {
                    colors[m[1]] = m[2];
                    if (ig_debug) {
						debug += '<input size="50" value="' + m[1] + '" style="background-color:' + m[2] + '"/><br/>';
                    }
                }
                if (ig_debug) {
                    var eldbg = get_id('debug');
					if (eldbg) {
						eldbg.innerHTML=debug;
					} else {
						GM_addStyle('#debug{position:absolute;top:200px;right:400px;z-index:9999;height:600px;overflow:auto;background-color:white;}', 'rps_debug');
						var e = dh('', 'div', {
							id: 'debug',
							html: debug
						});
					}
                }
                //tiled
                var header_tile = colors['header.tile_image.url'] || '';
                addClassIf(document.body.parentNode, 'ig_tiled', header_tile);//html
                
                //fixed
                var header_fixe = colors['header.center_image.url'] || '';
                addClassIf(document.body, 'ig_fixed', header_fixe);
                apply(colors, {
                    header_tile: igurl(header_tile),
                    header_fixe: igurl(header_fixe),
					header_link_color: colors['header.link_color'],
					body_bg_color: (header_tile && header_fixe)?'transparent':colors['header.background_color'],
					header_bg_color: colors['header.background_color'],

                    header_text_color: colors['header.text_color'],
					//text_color: colors['gadget_area.tab.unselected.text_color']||colors['gadget_area.tab.selected.text_color'],
					text_color: colors['gadget_area.gadget.body.link_color'],
					link_color: colors['gadget_area.gadget.body.link_color'],

					nav_bg_color: colors['navbar.background_color'],
					nav_text_color:colors['navbar.tab.unselected.link_color']||colors['navbar.tab.selected.link_color'],
					
					nav_bg_color_hover: colors['gadget_area.tab.selected.background_color']||colors['gadget_area.tab.unselected.background_color'],
					nav_text_color_hover: colors['gadget_area.tab.selected.text_color']||colors['gadget_area.tab.unselected.text_color'],
					nav_border_color_hover: colors['gadget_area.gadget.hover.border_color'],
					
					border_color: colors['gadget_area.border_color']||colors['gadget_area.gadget.border_color'],
					bg_action: colors['gadget_area.gadget.header.background_color'],
                    txt_action: colors['gadget_area.gadget.header.text_color'],
					
                    entry_color: '#fff'
                });
                css = '/* '+skin_name+' */'+fillTpl(tplCss, colors);
                GM_addStyle(css, 'rps_ig');
                //cache css
                GM_setValue('cache_ig_'+skin_name, css);
            }
        });
    }
	
    var keycode = getShortcutKey(ID, 'random', prefs); //shift+r
    keycode.fn = rndskin;
    initKey(keycode);
	
};
//http://essence-ig-themes.googlecode.com/svn/trunk/lopes/xml/lopes.xml
//http://igcdn.googlecode.com/svn/trunk/xml/travel_lpspain.xml
