/**
 * Google Reader - Colorful List View
 * @version  1.6
 * @date 2010-02-27 
 *
 * Colorizes the item headers in Google Reader list view and the entries in expanded view.
 *
 * Original author :
 * kepp
 * http://userscripts.org/scripts/show/8782
 */
GRP.colorful = function(prefs, langs, ID, SL, lang){    
    const BASE_CSS = "#entries.list .entry-likers,#entries.list .collapsed .entry-source-title,#entries.list .collapsed .entry-secondary,#entries.list .collapsed .entry-title{background-color:transparent!important}.gm-color-lv .collapsed /* list view headers */{border-color:transparent!important}#entries.list.gm-color-lv #current-entry .collapsed{border:2px solid #8181DC!important}#entries.list.gm-color-lv #current-entry.expanded .collapsed{border-bottom-color:transparent!important;border-width:2px 0!important}#entries .entry{padding:5px 0}#entries.list .collapsed{line-height:2.4ex!important}";

    var settings = 
    {
        getColorPrefs: function(){
            var prefs = "";
            prefs += GM_getValue("gm-color-lv", "gm-color-lv") + " ";
            prefs += GM_getValue("gm-color-ev", "gm-color-ev") + " ";
            prefs += GM_getValue("gm-color-ef", "") + " ";
            prefs += GM_getValue("gm-color-cv", "") + " ";
            prefs += GM_getValue("gm-color-ui", "gm-color-ui") + " ";
            prefs += GM_getValue("gm-color-ri", "gm-color-ri") + " ";
            return prefs;
        }
    };
	
    // controls and applies colors
    var theme = 
    {
        colors: {}, 
        prefs: "", 
        bgColor: null, 
        textColor: null,
        styles: null, 
        init: function(chrome){
            //this.styles = GM_addStyle("", 'colorful');
            this.prefs = settings.getColorPrefs();
            
            var setup = this.setup, thm = this;
            var set = function(){
                setup.call(thm);
                chrome.removeEventListener("DOMNodeInserted", set, false);
            };
            chrome.addEventListener("DOMNodeInserted", set, false);
        },
        
        setup: function(){ 
            this.initConfig(); 
            var entries = get_id("entries");
			
            if (entries) {
                addClass(entries, this.prefs);
                entries.addEventListener("DOMNodeInserted", bind(this.processEntries, this), false);
				this.processEntries();
            }
			
			if (prefs.colorful_tree){
				var root = get_id("sub-tree");
				addClass(root, this.prefs);
				initCatchSidebars(bind(this.processNodes, this), 'sidebar-colorful');
			}
        },
        
        // determine what color theme to use by looking at the header colors
        initConfig: function(){
            var bg, color;
			var header = get_id("chrome-header");
			if (prefs.colorful_usebasecolor) {
				bg = (prefs.colorful_background||'').toLowerCase();
			} else {
				bg = getComputedStyle(header, null).getPropertyValue("background-color");
			}
            
            bg = this.rgbToHsl(bg);
            
            // a min saturation & lightness is needed to distinguish colors
            // note: value is further subtracted from this for read items
            this.bgColor = 
            {
                hue: bg[0],
                sat: Math.max(bg[1], 35),
                lt: Math.max(bg[2], 32)
            };
            
			if (prefs.colorful_usebasecolor) {
				color = (prefs.colorful_color||'').toLowerCase();
			} else {
				color = getComputedStyle(header, null).getPropertyValue("color");
			}
            
            color = this.rgbToHsl(color);
            this.textColor = 
            {
                hue: color[0],
                sat: color[1],
                lt: color[2]
            };
            this.setTextColor();
        },
        
        rgbToHsl: function(color){ // calculate hsl from rgb css color string
            var hue = 0, sat = 0, lt;
            
            var rgb = this.getRgb(color);
            var max = Math.max.apply(Math, rgb);
            var min = Math.min.apply(Math, rgb);
            var chroma = max - min;
            
            var index = rgb.indexOf(max);
            rgb.splice(index, 1);
            
            lt = (max + min) / 2;
            if (chroma) {
                sat = (lt > 0.5) ? (max - min) / (2 - (max + min)) : (max - min) / (max + min);
                hue = 60 * ((rgb[0] - rgb[1]) / (max - min) + index * 2);
            }
            
            return [hue, sat * 100, lt * 100];
        },
        
        getRgb: function(color){
            var rgb;
            
            if ((rgb = /(\d+), (\d+), (\d+)/.exec(color))) {
                rgb = rgb.slice(1);
                return [rgb[0] / 255, rgb[1] / 255, rgb[2] / 255];
            }
            
            // Opera return a hex value, so convert hex to decimal
            if ((rgb = /#(......)/.exec(color))) {
                rgb = parseInt(rgb[1], 16);
                var red = rgb >> 16;
                var grn = (rgb - (red << 16)) >> 8;
                var blu = rgb - (red << 16) - (grn << 8);
                return [red / 255, grn / 255, blu / 255];
            }
            
            return [1, 0, 0];
        },
        
        setTextColor: function(){
            var hue = this.textColor.hue;
            var sat = this.textColor.sat;
            var lt = this.textColor.lt;
            
            // default color lightnesses:
            // bg lt: 85.3
            // color lt: 0
            
            // text lightnesses are set to values in the range between title text and
            // background color lightnesses
            var range = this.bgColor.lt - lt;
            
            var css = "  color: hsl(" + hue + "," + sat + "%, ";
            css += ("" +
            "#entries .collapsed .entry-title {" +
            css +
            lt +
            "% ) !important;" + // 000000 <- default color
            "}" +
            "#entries.list .collapsed .entry-main .entry-source-title {" +
            css +
            (lt + range * 0.42) +
            "% ) !important;" + // 555555
            "}" +
            ".entry .entry-author," +
            ".entry-comments .comment-time, .entry .entry-date {" +
            css +
            (lt + range * 0.50) +
            "% ) !important;" + // 666666
            "}" +
            "#entries.list .collapsed .entry-secondary {" +
            css +
            (lt + range * 0.59) +
            "% ) !important;" + // 777777
            "}" +
            // "a, a:visited, .link {" + // shouldn't need to mess with link color
            // css + lt + "% ) !important;" + // 2244BB
            // "}" + 
            "#entries .item-body {" +
            css +
            lt +
            "% ) !important;" + // 000000
            "}");
			
			//this.styles.innerText+=css;
			GM_addStyle(css, 'colorful');
        },
        
        // inject color css into the page
        processEntries: function(){
			this.process(this.bgColor, this.styles, 
				"id('entries')/div[contains(@class,'entry')][not(@colored)]", 
				".//*[ contains(concat( ' ', normalize-space( @class ), ' '),' entry-source-title ' ) ]",
				this);
		},
		processNodes: function(e){
			this.process(this.bgColor, this.styles, 
				"id('sub-tree')//li[contains(@class, 'sub')][contains(@class, 'unread')][not(@colored)]",
				".//span[contains(@class,'name')]/@title",
				 this);
	        
        },
		process: function(bgColor, styles, xpath, xpathText, thm){
            // pick up all uncolored entries, including ones missed previously
            var nocolor = getElements(xpath);
			if (!nocolor.length) {
                return;
            }
            nocolor.forEach(function(nc){
				thm.setColor(styles, bgColor, xpathText, nc);
            });
		},
			
        setColor: function(styles, bgColor, xpathText, nc){
            // source in header is: "<a>" for expanded/comment view
            //                      "<span>" for list view
            // if "Shared by [xxx]" is there this will grab that
            // search for a node that has 'entry-source-title' class name
            var src = getElementValue(xpathText, nc);
            src = src.textContent.replace(/\s+\(\d+\)$/, "").replace(/\W/g, "-");
			
			//console.log(src);
			
            nc.setAttribute("colored", src);
            if (typeof this.colors[src] == "undefined") {
				//console.log('CSS for '+src);
				//styles.innerText += this.getColorCss(src, bgColor);
				GM_addStyle(this.getColorCss(src, bgColor), 'color_'+src)
            }
        },
        
        getColorCss: function(title, bgColor){ // generate css to color items
            var hue = this.getHue(title);
            var sat = bgColor.sat;
            var lt = bgColor.lt;
            
            // set direction entry lightness is modified on read/hover
            var dir = (lt > 50) ? 1 : -1;
            
            var hsl = 
            {
                norm: "background-color: hsl(" +
                hue +
                "," +
                (sat + 7) +
                "%," +
                (lt - dir * 5) +
                "% ) !important;",
                hover: "background-color: hsl(" +
                hue +
                "," +
                (sat + 27) +
                "%, " +
                lt +
                "% ) !important;",
                read: "background-color: hsl(" +
                hue +
                "," +
                (sat - 13) +
                "%," +
                (lt + dir * 5) +
                "% ) !important;",
                readhvr: "background-color: hsl(" +
                hue +
                "," +
                (sat + 7) +
                "%," +
                (lt + dir * 10) +
                "% ) !important;"
            };
        
	        var css = this.getLvCss(title, hsl) + this.getEvCss(title, hsl) + this.getEfCss(title, hsl) + this.getCvCss(title, hsl);
	        if (prefs.colorful_tree) {
	            css += this.getTreeCss(title, hsl);
	        }
	        return css;
        },
        
        getLvCss: function(ttl, hsl){ // css for coloring items in list view
            // this selector should be take priority over any other selector
            var us = "#entries.gm-color-lv.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-lv.gm-color-ri div[ colored='" + ttl + "' ]";
            
            return "" +
            us +
            " .collapsed {" +
            hsl.norm +
            "}" +
            us +
            ":hover .collapsed {" +
            hsl.hover +
            "}" +
            us +
            ".read .collapsed," +
            us +
            ".read:hover .collapsed {background-color: white !important; }" +
            rs +
            ".read .collapsed {" +
            hsl.read +
            "}" +
            rs +
            ".read:hover .collapsed { " +
            hsl.readhvr +
            "}";
        },
        
        // css for coloring expanded view item bodies
        getEvCss: function(ttl, hsl){
            var us = "#entries.gm-color-ev.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-ev.gm-color-ri div[ colored='" + ttl + "' ]";
            
            return "" +
            us +
            " .card," +
            /* .ccard, .t2, .t3 used for Opera expanded view 
            us +
            " .ccard," +
            us +
            " .t2," +
            us +
            " .t3 {" +
            hsl.norm +
            "}" +
            */
            us +
            ":hover .card," +
            us +
            ":hover .ccard," +
            us +
            ":hover .t2," +
            us +
            ":hover .t3 {" +
            hsl.hover +
            "}" +
            
            us +
            ".read .card," +
            us +
            ".read .ccard," +
            us +
            ".read .t2," +
            us +
            ".read .t3," +
            us +
            ".read:hover .card," +
            us +
            ".read:hover .ccard," +
            us +
            ".read:hover .t2," +
            us +
            ".read:hover .t3 { background-color: white !important; }" +
            rs +
            ".read .card," +
            rs +
            ".read .ccard," +
            rs +
            ".read .t2," +
            rs +
            ".read .t3 { " +
            hsl.read +
            "}" +
            rs +
            ".read:hover .card," +
            rs +
            ".read:hover .ccard," +
            rs +
            ".read:hover .t2," +
            rs +
            ".read:hover .t3 {" +
            hsl.readhvr +
            "}";
        },
        
        // css for coloring expanded view item frames
        getEfCss: function(ttl, hsl){
            var us = "#entries.gm-color-ef.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-ef.gm-color-ri div[ colored='" + ttl + "' ]";
            
            return "" +
            us +
            " {" +
            hsl.norm +
            "}" +
            us +
            ":hover {" +
            hsl.hover +
            "}" +
            us +
            ".read," +
            us +
            ".read:hover { " +
            "background-color: #F3F5FC !important; }" +
            rs +
            ".read {  " +
            hsl.read +
            "}" +
            rs +
            ".read:hover { " +
            hsl.readhvr +
            "}";
        },
        
        getCvCss: function(ttl, hsl){
            var us = "#entries.gm-color-cv.gm-color-ui div[ colored='" + ttl + "' ]";
            var rs = "#entries.gm-color-cv.gm-color-ri div[ colored='" + ttl + "' ]";
            
            // comment view doesn't have read/unread
            return "" +
            us +
            " .comment-entry {" +
            hsl.norm +
            "}" +
            us +
            ":hover .comment-entry {" +
            hsl.hover +
            "}" +
            us +
            ".read .comment-entry," +
            us +
            ".read:hover .comment-entry {" +
            "background-color: white !important; }" +
            rs +
            ".read .comment-entry {" +
            hsl.read +
            "}" +
            rs +
            ".read:hover .comment-entry {" +
            hsl.readhvr +
            "}";
        },

		getTreeCss: function(ttl, hsl){
            var us = "#sub-tree li[ colored='" + ttl + "' ]";
	        return us + " {" + hsl.norm +"}" +
	        us + ":hover{" + hsl.hover + "}";
	    },
        
        getHue: function(title){ // calculate item hue
            var hue = 0;
            
            for (var i = 0, ch; (ch = title[i]); i++) {
                hue += ch.charCodeAt(0);
            }
            hue %= 360;
            
            this.colors[title] = hue;
            return hue;
        }
    };
    
    //=============================================================================
    var chrome = get_id("chrome");
    theme.init(chrome);

    GM_addStyle(BASE_CSS);
};
