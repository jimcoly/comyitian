/**********************************************************************
*  Copyright (C) 2010 by Josorek@gmail.com
*  All rights reserved.
*
**********************************************************************/
		var themes = new Array();
		themes.push({
			bg : "#ffffff",
			dialBG : "#f7f7f7",
			dialBorder : "#e3e3e3",
			textColor : "#000000",
			emptyTextColor : "#aaaaaa",
			overBG : "#d2e4ff",
			overBorder : "#bbc9df",
			barColor : "#333949",
			barBG : "#d1dfff"
		});
		themes.push({
			bg : "#2b559b",
			dialBG : "#1c3270",
			dialBorder : "#000000",
			textColor : "#ffffff",
			emptyTextColor : "#637abd",
			overBG : "#adccff",
			overBorder : "#ffffff",
			barColor : "#e1e1e1",
			barBG : "#243e69"
		});
		themes.push({
			bg : "#fec9c9",
			dialBG : "#deabab",
			dialBorder : "#af8989",
			textColor : "#584040",
			emptyTextColor : "#af8989",
			overBG : "#eaaeae",
			overBorder : "#d7baba",
			barColor : "#353535",
			barBG : "#ffffff"
		});
		themes.push({
			bg : "#eafec9",
			dialBG : "#cadeab",
			dialBorder : "#9bb078",
			textColor : "#000000",
			emptyTextColor : "#9faf87",
			overBG : "#d3eaae",
			overBorder : "#b9cd99",
			barColor : "#46523c",
			barBG : "#ffffff"
		});
		themes.push({
			bg : "#fee8c9",
			dialBG : "#dec5ab",
			dialBorder : "#d1bea3",
			textColor : "#000000",
			emptyTextColor : "#ac9a87",
			overBG : "#d6c2a7",
			overBorder : "#d6c2a7",
			barColor : "#52493c",
			barBG : "#fff7eb"
		});
		themes.push({
			bg : "#d2f6ff",
			dialBG : "#badae1",
			dialBorder : "#9fc3cb",
			textColor : "#000000",
			emptyTextColor : "#90a6ab",
			overBG : "#afced6",
			overBorder : "#afced6",
			barColor : "#3c5152",
			barBG : "#a3c2ca"
		});
		themes.push({
			bg : "#000000",
			dialBG : "#131517",
			dialBorder : "#12161b",
			textColor : "#ffffff",
			emptyTextColor : "#90a6ab",
			overBG : "#273549",
			overBorder : "#000000",
			barColor : "#bbc9df",
			barBG : "#292929"
		});

	   function setStorage(property, value) {
		   localStorage[property] = value;
	   }

	   function getStorage(property, _default) {
		    if ((localStorage[property]!="") && (localStorage[property]!=null) && (localStorage[property]!="null")) {
				return localStorage[property];
			} else {
				return _default;
			}
	   }
	   function toBoolean(val) {
			if ((val=="true") || (val==true)) {
				return true;
			} else {
				return false;
			}
	   }

	   var currentGroup = 0;
       var COLUMNS_NUMBER  = 4;
       var ROWS_NUMBER	   = 3;
	   var DIAL_DELTA      = 37;
	   var DIAL_WIDTH	   = 200;
	   var DIAL_HEIGHT     = 200;


	   ROWS_NUMBER	  = getStorage("rows", ROWS_NUMBER) - 0;
	   COLUMNS_NUMBER = getStorage("col", COLUMNS_NUMBER) - 0;
	   DIAL_DELTA     = getStorage("dialDelta", DIAL_DELTA) - 0;


       var PROPORTION      = 0.72; //3/4;

	   if ((window.screen.width==1024) && (window.screen.height==768)) {
		   ROPORTION      = 0.67;
	   } else if ((window.screen.width==1280) && (window.screen.height==768)) {
		   PROPORTION      = 0.57;
	   } else if ((window.screen.width==1280) && (window.screen.height==800)) {
		   PROPORTION      = 0.60;
	   } else if ((window.screen.width==1280) && (window.screen.height==1024)) {
		   PROPORTION      = 0.72;
	   } else if ((window.screen.width==1440) && (window.screen.height==900)) {
		   PROPORTION      = 0.60;
	   } else if ((window.screen.width==800) && (window.screen.height==600)) {
		   PROPORTION      = 0.67;
	   } else if ((window.screen.width==1680) && (window.screen.height==1050)) {
		   PROPORTION      = 1050/1680;
	   } else if ((window.screen.width==1920) && (window.screen.height==1200)) {
		   PROPORTION      = 0.60;
	   }
	  
	   var THUMBNAIL_BORDER = 11;

	   var resizeTimeOut = null
	   var DISPLAY_SEARCH  = true;
	   var OPEN_ON_NEW_TAB = true;
	   var DISPLAY_BOOKMARKS_BAR = true;
	   var DISPLAY_RECENTLY_CLOSED = true;

	   var DISPLAY_TITLE    = true;
	   var DISPLAY_FAV_ICON = true;
	   var DISPLAY_OPTIONS_BUTTON = true;
	   var DISPLAY_PAGE_ICON = true;
	   var LOGOS_MODE = false;

	   DISPLAY_SEARCH		   = toBoolean(getStorage("displaySearch", DISPLAY_SEARCH));
	   OPEN_ON_NEW_TAB		   = toBoolean(getStorage("openOnNewTab", OPEN_ON_NEW_TAB));
	   DISPLAY_RECENTLY_CLOSED = toBoolean(getStorage("displayRC", DISPLAY_RECENTLY_CLOSED));
	   DISPLAY_BOOKMARKS_BAR   = toBoolean(getStorage("displayBB", DISPLAY_BOOKMARKS_BAR));
	   DISPLAY_TITLE		   = toBoolean(getStorage("displayTitle", DISPLAY_TITLE));
	   DISPLAY_FAV_ICON	       = toBoolean(getStorage("displayFavIcon", DISPLAY_FAV_ICON));
	   DISPLAY_OPTIONS_BUTTON  = toBoolean(getStorage("displayOptions", DISPLAY_OPTIONS_BUTTON));
	   DISPLAY_PAGE_ICON	   = toBoolean(getStorage("displayPageIcon", DISPLAY_PAGE_ICON));

	   var thumbSpaceY = 10;
	   var thumbSpaceX = thumbSpaceY / PROPORTION;


	   function setColRows(rows, cols) {
		    COLUMNS_NUMBER = cols;
			ROWS_NUMBER    = rows;
			setStorage("col", cols);
			setStorage("row", rows);
			sortThumbs();
			prepareElements()
			setDials();
	   }

	   function init() {

			if (getStorage("theme")) {
				setTheme(getStorage("theme") - 0, true);
			}
		
			sortThumbs();

			var ff = setTimeout(function() {
				prepareElements()
				setSearchElement();
				setDials();
				window.addEventListener("resize", pageResize, false); 

				if (getStorage("bgImage")) {
					d("optionsTextBoxBGImage").value = getStorage("bgImage");
					setBackgroundImage(getStorage("bgImage"));
				}

				d("displaySearchBoxCheckBox").checked = DISPLAY_SEARCH;
				d("displayBBCheckBox").checked = DISPLAY_BOOKMARKS_BAR;
				d("displayRCCheckBox").checked = DISPLAY_RECENTLY_CLOSED;
				d("displayTitleCheckBox").checked = DISPLAY_TITLE;
				d("displayOptionsCheckBox").checked = DISPLAY_OPTIONS_BUTTON;
				d("displayPageIconCheckBox").checked = !DISPLAY_PAGE_ICON;

				var as = new AutoSuggest(d("searchInput"));

				createBookmarkBar();
				createRC();

				if (document.location.hash=="#options") {
					openOptions(true);
				}
				document.addEventListener("keydown"  , onKeyDocumentDown, false);
				initLogosList();

			}, 10);

	   }
	   function onKeyDocumentDown(e) {
		    if (!optionsOpen) {
				if (e.ctrlKey) {
					if ((e.keyCode>=49) && (e.keyCode<=57)) {
						var num = -1 * (48 - e.keyCode);
						var dial = document.getElementById("slot" + (num - 1));
						if (dial.thumb) {
							document.location = dial.thumb.url
						}
					}
					if ((e.keyCode>=65) && (e.keyCode<=90)) {
						var num = 10 + (-1 * (65 - e.keyCode));
						var dial = document.getElementById("slot" + (num - 1));
						if (dial.thumb) {
							document.location = dial.thumb.url
						}
					}
						 e.stopPropagation();
						 e.preventDefault();
				}
			}
	   }

	   function createRC() {
			var title = "Recently Closed:";
			var b = chrome.extension.getBackgroundPage()
			var list = b.getRC();

			var closedTabsBar = d("closedTabsBar");
			closedTabsBar.innerHTML = "";
			var bg = document.createElement("div");
			bg.setAttribute("class", "bar-bg");
			var container = document.createElement("div");
			container.setAttribute("class", "bar-container");

			closedTabsBar.appendChild(bg);
			closedTabsBar.appendChild(container);

			var titleDiv = document.createElement("div");
			titleDiv.setAttribute("class", "bar-title");
			titleDiv.innerHTML = title;
			container.appendChild(titleDiv);

			for (var i=0;i<list.length;i++) {
				if (list[i].url) {
					if (list[i].url!="chrome://newtab/"){
						if (list[i].title) {
						
							if ((list[i].title) && (list[i].title!=null)){
								var title = list[i].title;
							} else {
								var title = list[i].url;
							}
							
							if ((list[i].favIcon==null) || (list[i].favIcon=="")) list[i].favIcon = "images/blank.png"
							var img = "<img src='"+ list[i].favIcon +"' width='16' height='16'></img>"
							var l = document.createElement("a");
							l.innerHTML = img + "<font>" +list[i].title+ "</font>"
							l.setAttribute("href", list[i].url);
							l.setAttribute("title", list[i].title);
							container.appendChild(l);
						}
					}
				}
			}
	   }

	   function createBookmarkBar() {

			var closedTabsBar = d("bookmarksBar");
			closedTabsBar.innerHTML = "";
			var bg = document.createElement("div");
			bg.setAttribute("class", "bar-bg bookmarksBar");
			var container = document.createElement("div");
			container.setAttribute("class", "bar-container");

			closedTabsBar.appendChild(bg);
			closedTabsBar.appendChild(container);

			var bookmarkIcon = document.createElement("div");
			bookmarkIcon.setAttribute("class", "bookmarkIcon");
			container.appendChild(bookmarkIcon);
			
			bookmarkIcon.addEventListener("click"  , openBookmarks, false);


			chrome.bookmarks.getTree(function (list) {
				var bookmarkBarID = list[0].children[0].id;
				chrome.bookmarks.getChildren(bookmarkBarID, function (nodes) {
					var a = nodes[1]
					for (var i=0;i<nodes.length;i++) {
							var allow = true;
							if (nodes[i].url) {
								if (nodes[i].url.indexOf("chrome://")!=-1) {
									allow = false;
								}
							}
							
							if (allow) {
							
								if ((nodes[i].title) && (nodes[i].title!=null)){
									var title = nodes[i].title;
								} else {
									var title = nodes[i].url;
								}

								var bookmarkLink = document.createElement("div");
								bookmarkLink.setAttribute("class", "bookmarkLink");

								var bookmarkLink_bg = document.createElement("div");
								bookmarkLink_bg.setAttribute("class", "bookmarkLink-bg");
								var bookmarkLink_container = document.createElement("div");
								bookmarkLink_container.setAttribute("class", "bookmarkLink-container");

								bookmarkLink.appendChild(bookmarkLink_container);
								bookmarkLink.appendChild(bookmarkLink_bg);

								var l = document.createElement("a");
								if (nodes[i].url) {
									var img = "<img src='http://www.google.com/s2/favicons?domain_url=" + nodes[i].url +"' width='16' height='16'></img>"
									l.setAttribute("href", nodes[i].url);
									l.setAttribute("title", nodes[i].title);
								} else {
									var img = "<img src='images/folder.png' width='16' height='16'></img>"
									l.style.cursor = "pointer"
									l.id = nodes[i].id;
									l.addEventListener("mousedown",createBookmarkMenu, false);
								}
								
								l.innerHTML = img + "<font>" +nodes[i].title+ "</font>"

								bookmarkLink_container.appendChild(l);

								container.appendChild(bookmarkLink);
							}

					}
				})
			})
	
	   }
	   function bookmarkMenuCallback(item) {
			document.location = $(item).attr("href");
	   }
	   function createBookmarkMenu(e) {
			var l = e.currentTarget;
			var id = l.id;
			var counter = 0;
			l.setAttribute("id", id);

			d("context-text").innerHTML = "";
			var show = function() {
				$('#' + id).menu({ 
						content: d("context-text").innerHTML, 
						showSpeed: 0,
						backLink: false,
						callback : bookmarkMenuCallback
					})
				
				setTimeout(function() {
				
						
				}, 10);
			}
			var getChildren = function(id, li) {
				counter++;
				chrome.bookmarks.getChildren(id, function (nodes) {
					var ul = document.createElement("ul");
					li.appendChild(ul);
					createLI(ul, nodes);
					counter--;
					if (counter==0) {
						show();
					}
				});
			}

			var createLI = function(ul, nodes) {
				for (var i=0;i<nodes.length;i++) {
					var allow = true;
					if (nodes[i].url) {
						if (nodes[i].url.indexOf("chrome://")!=-1) {
							allow = false;
						}
					}
					if (allow) {
						if ((nodes[i].title) && (nodes[i].title!=null)){
							var title = nodes[i].title;
						} else {
							var title = nodes[i].url;
						}
						var li = document.createElement("li");
						li.innerHTML = "<a href='"+nodes[i].url+"'><img src='http://www.google.com/s2/favicons?domain_url=" + nodes[i].url +"' width='16' height='16'></img><div>"+ nodes[i].title +"</div></a>";
						ul.appendChild(li);
						if (nodes[i].url==null) {
							getChildren(nodes[i].id, li);
						}
					}
				}	
					if (counter==0) {
						show();
					}				
			}
			chrome.bookmarks.getChildren(id, function (nodes) {
					
					var ul = document.createElement("ul");
					d("context-text").appendChild(ul);
					createLI(ul, nodes);
					
					
			})
	   }

	   function setBackgroundImage(url) {
			if (url!=null) {
				var bgImage = d("main-bg");
				bgImage.setAttribute("width", "100%");
				bgImage.setAttribute("height", "100%");
				bgImage.setAttribute("src", url);
				bgImage.style.display='block'
			}
	   }

	   function pageResize() {
			prepareElements()
			setDials();
	   }

	   function sortThumbs() {
		   var sortArray = function(a, b){
				return a.pos - b.pos;
		   }

		   for (var i=0;i<groups.length;i++) {
				var thumbs = groups[i].thumbs;
				thumbs.sort(sortArray)
				for (var j=0;j<thumbs.length;j++) {
					thumbs[j].arrIndex = j;
				}
		   }	
	   }

	   function prepareElements() {
			var _width = window.innerWidth - 130;
			var _height = window.innerHeight - 180;

			if (DISPLAY_BOOKMARKS_BAR) _height -= 30;

			DIAL_WIDTH  = (_width - (DIAL_DELTA * (COLUMNS_NUMBER - 1))) / COLUMNS_NUMBER
			dialHeight = DIAL_WIDTH * PROPORTION;

			if (dialHeight * ROWS_NUMBER + ((ROWS_NUMBER-1)*DIAL_DELTA)>_height) {
				dialHeight  = (_height - (DIAL_DELTA * (ROWS_NUMBER - 1))) / ROWS_NUMBER 
				DIAL_WIDTH =  dialHeight / PROPORTION
			}
			
			dialsWidth  = DIAL_WIDTH * COLUMNS_NUMBER + (DIAL_DELTA * (COLUMNS_NUMBER - 1));	

			var dials = d("dials");
			dials.style.left   = ((window.innerWidth / 2) - (dialsWidth / 2))+"px"


			var dials_height = (dialHeight + DIAL_DELTA) * ROWS_NUMBER 
			var dials_width  = (DIAL_WIDTH * COLUMNS_NUMBER) + (DIAL_DELTA  * (COLUMNS_NUMBER-1))

			dials.style.height   = (dials_height)+"px"

			
			var header = d("header");
			if (DISPLAY_OPTIONS_BUTTON) {
				header.style.left   = ((window.innerWidth / 2) - (dialsWidth / 2))+"px"
				header.style.display = "block";
			} else {
				header.style.display = "none";
			}
			
			var _search = d("search");
			if ((DISPLAY_SEARCH) && (!optionsOpen)) {
				_search.style.left = ((window.innerWidth / 2) - (300 / 2) - header.clientWidth)+"px"
				_search.style.display = "block"
			} else {
				_search.style.display = "none"
			}

			var soptions = d("options");
			soptions.style.left   = ((window.innerWidth / 2) - (800 / 2))+"px"
			soptions.style.height = window.innerHeight - 120;
	
			
			var closedTabsBar = d("closedTabsBar");
			if ((DISPLAY_RECENTLY_CLOSED) && (!optionsOpen)) {
				closedTabsBar.style.left   = ((window.innerWidth / 2) - (dialsWidth / 2)) + "px"
				closedTabsBar.style.width  = dials_width
				closedTabsBar.style.display = "block";	
			} else {
				closedTabsBar.style.display = "none";	
			}
			
			var bookmarksBar = d("bookmarksBar");
			if ((DISPLAY_BOOKMARKS_BAR) && (!optionsOpen)) {
				bookmarksBar.style.left   = 15 + "px"
				bookmarksBar.style.width  = window.innerWidth - 30;
				bookmarksBar.style.display = "block";	
			} else {
				bookmarksBar.style.display = "none";	
			}

			var bookmarksBar = d("bookmarksTree");
			if (DISPLAY_BOOKMARKS_BAR) {
				bookmarksBar.style.height = window.innerHeight - 60;
			} else {
				bookmarksBar.style.height = window.innerHeight - 60;
			}
	   }

	   function setDials() {
			var dials = d("dials");
			while (dials.firstChild) {
				dials.removeChild(dials.firstChild);
			}
			dials.innerHTML = "";
			var index = 0;

			var thumbs = groups[currentGroup].thumbs;
			var thumbIndex = 0;
			for (var i=0;i<ROWS_NUMBER;i++) {
				for (var j=0;j<COLUMNS_NUMBER;j++) {
				
					var dial = document.createElement("div");
					dial.setAttribute("id", "slot" + index);

					dial.index = index;
					dial.setAttribute("class", "slot");
					dial.style.width  = (DIAL_WIDTH) + "px";
					dial.style.height = (dialHeight) + "px";	
					dial.style.opacity = "1"	
					var leftPos = (j * (DIAL_WIDTH + DIAL_DELTA));
					var topPos = (i * (dialHeight + DIAL_DELTA));

					dial.style.top  = topPos + "px";
					dial.style.left = leftPos + "px";
					dial.addEventListener("mousedown",onDocumentMouseDown, false);
				
					dials.appendChild(dial);

					if ((thumbs[thumbIndex]) && (thumbs[thumbIndex].pos == index)) {
						createDial(index, thumbIndex)
						thumbIndex++
					} else {
						createDial(index)
					}
				
					index++
				}			
			}
	   }

	   function createDial(dialIndex, thumbIndex, thumbParams) {
			var thumbs = groups[currentGroup].thumbs;

			var dial = d("slot" + dialIndex);
			if ((thumbIndex==null) && (thumbParams==null))  {
				empty = true;
			} else {
				empty = false;
			}

			var TITLE_SPACE_Y = 20;

			if (!empty) {
				if (thumbParams) {
					dial.thumb = thumbParams;
				} else {
					dial.thumb = thumbs[thumbIndex];
					thumbParams = dial.thumb;
				}
				dial.addEventListener("contextmenu", onDialMenu, false);


			    var lnk = document.createElement("a");
				lnk.setAttribute("class", "link");
				lnk.setAttribute("href", thumbParams.url);
				lnk.setAttribute("title", thumbParams.title);

				lnk.addEventListener("click", function(e) {
					var lnk = e.currentTarget;
					if (lnk.isEmptyPreview) {
					   chrome.tabs.getSelected(null, function (tab) {
							setStorage("emptyPreview", tab.id+"^"+thumbParams.url);
							document.location = thumbParams.url;
					   });

					   e.stopPropagation();
					   e.preventDefault();
					} else {
						if (inDragMode) {
							 e.stopPropagation();
							 e.preventDefault();						
						}
					}
				}, false);


				var title = document.createElement("div");
				title.setAttribute("class", "title");
				title.style.width = (DIAL_WIDTH - 22) +"px";
				if (thumbParams.title!=null) {
					title.innerHTML = thumbParams.title;
				}

				var favIcon = document.createElement("img");
				if (thumbParams.favIcon!=null) {
					favIcon.setAttribute("class", "favIcon");
					favIcon.setAttribute("src", thumbParams.favIcon);		
				}
				

				var thumbnailContainer = document.createElement("div");
				if (LOGOS_MODE!=true) thumbnailContainer.setAttribute("class", "thumbnail-container");
				thumbnailContainer.style.width  = (DIAL_WIDTH) + "px";
				thumbnailContainer.style.height  = (dialHeight) + "px";
				thumbnailContainer.style.marginTop  = (TITLE_SPACE_Y) + "px";


				var img = document.createElement("img");
				if (LOGOS_MODE!=true) {

					if (getStorage("userThumbnail_" + encodeURIComponent(thumbParams.url))) {
					} else {
						img.setAttribute("class", "thumbnail");
					}
				} else {
					img.setAttribute("class", "thumbnal-reflection");
				}
				if ((thumbParams.thumbnailURL=="") || (thumbParams.thumbnailURL==null) || (thumbParams.thumbnailURL=="undefined")){
					img.setAttribute("src", "images/empty_preview.png");	
					lnk.isEmptyPreview = true;
				} else {
					img.setAttribute("src", thumbParams.thumbnailURL);	
				}
				img.style.marginLeft  = (THUMBNAIL_BORDER/2) + "px";
				img.style.marginTop  = (THUMBNAIL_BORDER/2) + "px";
				img.style.display='none';
					img.onload = function(e){
						var img = e.currentTarget;
						var width  = img.width;
						var height = img.height;
						var ratio = height/width;
						if (height/width<PROPORTION*0.9) {
							if (width>parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1) {
							   width = parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1;
							   height = width * ratio;
							   img.style.width   = (parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1) + "px";
							   img.style.height  = height + "px";
							}
							img.style.marginLeft  = (THUMBNAIL_BORDER/2) + (((parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1) - width)/2) +"px";
							img.style.marginTop  = (THUMBNAIL_BORDER/2) + (((parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER) - height)/2) +"px";
						} else if (height/width>1) {
							if (height>parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER-1) {
							   height = parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER-1;
							   width = height / ratio;
							   img.style.height   = (parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER-3) + "px";
							   img.style.width  = width + "px";
							}
							img.style.marginLeft  = (THUMBNAIL_BORDER/2) + (((parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1) - width)/2) +"px";
							img.style.marginTop  = (THUMBNAIL_BORDER/2) + (((parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER) - height)/2) +"px";
						} else {

							if ((height/width)>(parseFloat(thumbnailContainer.style.height)/parseFloat(thumbnailContainer.style.width))) {
								height = parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER-1;
								width  = height / ratio;
							} else {
								width  = parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1;
								height = width * ratio;
							}
							img.style.width   = width + "px";
							img.style.height  = height + "px";	
							img.style.marginLeft  = (THUMBNAIL_BORDER/2) + (((parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER-1) - width)/2) +"px";
							img.style.marginTop  = (THUMBNAIL_BORDER/2) + (((parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER-3) - height)/2) +"px";

						}
						img.style.display = 'block';
					}
				thumbnailContainer.appendChild(img);


				var thumbnailTop = document.createElement("div");
				thumbnailTop.setAttribute("class", "thumbnail-top-gradiant");
			
				thumbnailTop.style.width  = (parseFloat(thumbnailContainer.style.width) - THUMBNAIL_BORDER) + "px";
				thumbnailTop.style.height  = (parseFloat(thumbnailContainer.style.height) - THUMBNAIL_BORDER) + "px";
				thumbnailTop.style.marginLeft  = (THUMBNAIL_BORDER/2) + "px";
				thumbnailTop.style.marginTop  = (THUMBNAIL_BORDER/2) + "px";

				if (LOGOS_MODE!=true) thumbnailContainer.appendChild(thumbnailTop);

				var thumbnailFooter = document.createElement("img");
				thumbnailFooter.setAttribute("class", "thumbnail-footer");
				thumbnailFooter.setAttribute("src", "images/thumbnailFooter.png");			
				if (DIAL_WIDTH<249) {
					thumbnailFooter.style.width = (DIAL_WIDTH - 20) +"px"
					thumbnailFooter.style.left  = (10)+ "px";
					thumbnailFooter.style.top  =( dialHeight + 1 + TITLE_SPACE_Y) + "px";
				} else {
					thumbnailFooter.style.left  = (DIAL_WIDTH/2 - 249/2) + "px";
					thumbnailFooter.style.top  =( dialHeight + 1 + TITLE_SPACE_Y) + "px";
				}
				if (LOGOS_MODE!=true) {
					if ((DISPLAY_TITLE) && (DIAL_DELTA>=20)) {
						lnk.appendChild(favIcon);
						lnk.appendChild(title);
					}
				}
				lnk.appendChild(thumbnailContainer);
				if (LOGOS_MODE!=true) lnk.appendChild(thumbnailFooter);
				dial.lnk = lnk;
				dial.titleText = title;
				dial.appendChild(lnk);

			} else {
				dial.thumb = null;
				var padd = dialHeight/2 - 20;
				var emptyDial = document.createElement("div");
				emptyDial.setAttribute("class", "slot-empty");
				emptyDial.style.width  = (DIAL_WIDTH - 2)+ "px";
				emptyDial.style.height  = (dialHeight - 2 - padd) + "px";
				emptyDial.style.marginTop  = (TITLE_SPACE_Y+1) + "px";
				emptyDial.style.paddingTop = padd + "px"
				emptyDial.innerHTML = dialIndex + 1;
				dial.emptyDial = emptyDial;

				dial.appendChild(emptyDial);
				dial.addEventListener("click", onEmptyDialClicked, false);
				dial.addEventListener("mousedown", onEmptyDialMouseDown, false);
				
			}			
	   }
	   function onEmptyDialMouseDown(e) {
			e.currentTarget.mouseDownX = e.clientX;
			e.currentTarget.mouseDownY = e.clientY;
	   }
	   function onEmptyDialClicked(e) {
			if ((Math.abs(e.clientX - e.currentTarget.mouseDownX)<15) && (Math.abs(e.clientY - e.currentTarget.mouseDownY)<15)) {
				openDialEditDialog(e.currentTarget, "", "");
			}
	   }
	   function getDialRowAndColumn(dial) {
			var position = dial.index;
			var column = (position % COLUMNS_NUMBER) ;
			var row = Math.floor(position / COLUMNS_NUMBER);

			return {
				row : row,
				column : column
			}
	   }

	   function getDialXY (dial) {
			var gridLocation = getDialRowAndColumn(dial);
			var _x = (gridLocation.column * (DIAL_WIDTH + DIAL_DELTA));
			var _y = (gridLocation.row * (dialHeight + DIAL_DELTA));
			return {
				x : _x,
				y : _y
			}
	   }
	   function setDialPosition (dial, useTween, offsetX, offsetY, callback, time) {
			 var pos = getDialXY(dial);
			 if (dial.leftTween!=null) dial.leftTween.stop();
			 if (dial.topTween!=null) dial.topTween.stop();
			 if (time==null) time=  0.7;

			 dial.leftTween = new Tween(dial.style, 'left', Tween.strongEaseOut, parseFloat(dial.style.left), (pos.x + offsetX), time, "px");
			 dial.leftTween.start();
			 dial.topTween = new Tween(dial.style, 'top', Tween.strongEaseOut, parseFloat(dial.style.top), (pos.y + offsetY), time, "px");
			 dial.topTween.start();
			 if (callback) {
				 dial.topTween.onMotionFinished = callback
			 }
	   }

	   var _startX;
	   var _startY;
	   var dragDial = null;
	   var lastPosition = null;
	   var dragCounter = 0;
	   var inDragMode = false;
	   var dragModeTimeOut = null;
	   function onDrag (e) {
			 var x = e.clientX - _offsetX;
			 var y = e.clientY - _offsetY;

			 dragDial.style.left = x + "px";
			 dragDial.style.top  = y + "px";

			 var column  = Math.floor((x+(DIAL_WIDTH/2) + (DIAL_DELTA/2)) / (DIAL_WIDTH + DIAL_DELTA));
			 var row	  = Math.floor((y+(dialHeight/2) + (DIAL_DELTA/2)) / (dialHeight + DIAL_DELTA));
			 var position = (row*COLUMNS_NUMBER)+column;
			
             var currentGridLocation = getDialRowAndColumn(dragDial);

			 if ((position>=0) && (position<ROWS_NUMBER*COLUMNS_NUMBER)) {
				 if (lastPosition!=position){
					 if (position!=dragDial.index) {
						var offsetX, offsetY;
						if (column<currentGridLocation.column) {
							offsetX = 120;
						} else if (column>currentGridLocation.column) {
							offsetX = -120;
						} else {
							offsetX = 0;
						}
						if (row<currentGridLocation.row) {
							offsetY = 50;
						} else if (row>currentGridLocation.row) {
							offsetY = -50;
						} else {
							offsetY = 0;
						}

						setDialPosition(d("slot" + position), false, offsetX, offsetY);
					 }
					 
					 if ((lastPosition!=dragDial.index) && (lastPosition!=null)){
						setDialPosition(d("slot" + lastPosition), true, 0, 0);
					 }
					 lastPosition = position;
				 }
			 }
	   }
	   function endDragging (e) {
			 document.onmousemove = null;
			 if (lastPosition!=null) {
				 swapDials(dragDial, d("slot" + lastPosition));
			 }
			 if (dragModeTimeOut!=null) clearTimeout(dragModeTimeOut);
			 dragModeTimeOut = setTimeout(function() {
				 inDragMode = false;
			 }, 500);
			 e.stopPropagation();
			 e.preventDefault();
	   }
	   function onDocumentMouseMove(e) {
			if ((e.clientX>=_startX + 15) || (e.clientY>=_startY + 15) || (e.clientX<=_startX - 15) || (e.clientY<=_startY - 15)) {
				if (dragModeTimeOut!=null) clearTimeout(dragModeTimeOut);
				inDragMode = true;
				document.onmousemove = onDrag;
			}
	   }
	   function onDocumentMouseDown(e) {
			if (menuSelectedDial!=null) {
				clearMenu();
			}
			if (e.button==0) {

				dragDial = e.currentTarget
			    lastPosition = null;

				dragDial.style.zIndex = 100 + dragCounter;
				dragCounter++;
				_startX = e.clientX;
				_startY = e.clientY;

				_offsetX = parseFloat(dragDial.style.left);
				_offsetY = parseFloat(dragDial.style.top);

				_offsetX = (e.clientX - parseFloat(dragDial.style.left))//4*3;
				_offsetY = (e.clientY - parseFloat(dragDial.style.top))//4*3;
				if (dragDial.leftTween!=null) dragDial.leftTween.stop();
				if (dragDial.topTween!=null) dragDial.topTween.stop();
				
				document.onmousemove = onDocumentMouseMove;
				document.onmouseup   = endDragging;

				e.stopPropagation();
				e.preventDefault();
			}
	   }
	   function removeDial(dial) {
			chrome.extension.getBackgroundPage().api.remove(dial.index);
			dial.style.webkitTransform = "scale(0.3)"
			var sss = setTimeout(function() {
				dial.thumb = null;
				dial.innerHTML = "";
				createDial(dial.index);		
				dial.style.webkitTransform = "scale(1)"

			}, 200);
	   }
	   function swapDials(dialA, dialB) {
			
			var tempIndex = dialA.index;

			dialA.index = dialB.index;
			dialB.index = tempIndex;
	
			dialA.id = "slot" + dialA.index;
			dialB.id = "slot" + dialB.index;
			setDialPosition (dialA, true, 0, 0, null, 0.3);
			setDialPosition (dialB, true, 0, 0, function() {
							chrome.extension.getBackgroundPage().api.swap(dialA.index, dialB.index)
			}, 0.3);

			if (dialA.thumb==null)	dialA.emptyDial.innerHTML = dialA.index + 1
			if (dialB.thumb==null)	dialB.emptyDial.innerHTML = dialB.index + 1

			if ((dialA.thumb) || (dialB.thumb)) {
				sortThumbs();
			}
	   }
	   function getElementScreenPosition(el){
			var pos = {left: 0, top: 0} 
			var x = 0;
			var y = 0;
			while ((el.offsetParent) && (el.tagName.toLowerCase()!='body')) {
				x += el.offsetLeft;
				y += el.offsetTop;
				el = el.offsetParent;
			}
			x += el.offsetLeft;
			y += el.offsetTop;
			pos.left = x;
			pos.top = y;
			return pos;
	   }
		
	   var menuSelectedDial = null;
	   function onDialMenu(e) {
			var dial = e.currentTarget;
			var pos = getElementScreenPosition(dial);

			d("menu-dial").style.left = (e.clientX + 5) +"px";
			d("menu-dial").style.top  = (e.clientY + 5) +"px";
			d("menu-dial").style.display  = "block";

			menuSelectedDial = dial;
			
			document.onmousedown = function() {
				clearMenu();
			}

			e.stopPropagation();
			e.preventDefault();
	   }

	   function clearMenu() {
		   document.onmousedown = null;
		   d("menu-dial").style.display  = "none";
		   menuSelectedDial = null;
	   }
	   function menuClick(id) {
			if (id==0) {
				  chrome.tabs.create({url: menuSelectedDial.thumb.url, selected:true})
			} else if (id==1) {
				chrome.windows.create({url: menuSelectedDial.thumb.url})
			} else if (id==2) {
				openDialEditDialog(menuSelectedDial, menuSelectedDial.thumb.title, menuSelectedDial.thumb.url);
			} else if (id==3) {
				removeDial(menuSelectedDial);
			}

			clearMenu();
	   }

	   function d(id) {
			return document.getElementById(id);
	   }

		function refresh(){
		}
		var groups = new Array();
		var thumbs=null;

		function prepare(){
			
			thumbs=chrome.extension.getBackgroundPage().api.get()
			groups.push({
				title : "Group 1",
				thumbs   : thumbs
			})	
			init();
		}


		var optionsOpen = false
		var bookmarksOpen = false


		function openBookmarks() {
			if (bookmarksOpen) {
				closeBookmarks();
				return;
			} 
			d("dials").style.opacity = "0";
			d("search").style.opacity = "0";
			d("header").style.opacity = "0";
			d("closedTabsBar").style.opacity = "0";
			d("search").style.display = "none";

			d("bookmarksTree").innerHTML = "";

			d("dials").style.display = "none";
			d("header").style.display = "none";
			d("closedTabsBar").style.display = "none";
			d("bookmarksTree").style.display = "block";
			bookmarksOpen = !bookmarksOpen;
			var callback = function() {}

			var a = document.createElement("a");
			a.setAttribute("href", "#");
			a.setAttribute("onclick", "return false");
			a.innerHTML = "Back to Speed Dial";
			a.style.cssFloat = "left"
			a.style.marginBottom = "10px"
			d("bookmarksTree").style.marginLeft = "20px"

			a.addEventListener("click", openBookmarks, false);
			d("bookmarksTree").appendChild(a);

			var tree = new Tree(d("bookmarksTree"), null, callback, {treeNodeText : "", treeNodeFolderText : "tree-node-folder-text"}, true);
			tree.createBookmarkTree();
		}
		function closeBookmarks() {
			d("bookmarksTree").style.display = "none";
			d("header").style.display = "block";
			d("header").style.opacity = "1";
			d("dials").style.display = "block";
			d("dials").style.opacity = "1";
			d("search").style.opacity = "1";
			d("closedTabsBar").style.opacity = "1";
			d("closedTabsBar").style.display = "block";
			bookmarksOpen = !bookmarksOpen;
			pageResize();
		}

		function openOptions(disableTween) {
			if (optionsOpen) {
				closeOptions();
				return;
			} 
			d("selectRows").selectedIndex = ROWS_NUMBER - 1;
			d("selectCols").selectedIndex = COLUMNS_NUMBER - 3;


			if (getStorage("refresh")==null) {
				d("dialRefreshMode").selectedIndex = 0;
			} else if (getStorage("refresh")==6) {
				d("dialRefreshMode").selectedIndex = 1;
			} else if (getStorage("refresh")==24) {
				d("dialRefreshMode").selectedIndex = 2;
			} else if (getStorage("refresh")==-1) {
				d("dialRefreshMode").selectedIndex = 3;
			}
			if (getStorage("addPageShortcut")) {
				d("addPageShortcut").selectedIndex = getStorage("addPageShortcut");
			}

			if (disableTween){
					d("dials").style.display = "none";
					d("closedTabsBar").style.display = "none";
					d("options").style.display = "block";
					d("search").style.display = "none";
					d("bookmarksBar").style.opacity = "0";
					optionsOpen = !optionsOpen;
			} else {
				d("dials").style.opacity = "0";
				d("search").style.opacity = "0";
				d("closedTabsBar").style.opacity = "0";
				d("bookmarksBar").style.opacity = "0";

				var a = setTimeout(function() {
					d("dials").style.display = "none";
					d("closedTabsBar").style.display = "none";
					d("options").style.display = "block";
					d("options").style.opacity = "1";
					optionsOpen = !optionsOpen;

				}, 400);
			}
		}
		$(function() {
			$("#slider").slider({
					value:DIAL_DELTA,
					min: 4,
					max: 60,
					slide: function(event, ui) {
						DIAL_DELTA = ui.value;
						setStorage("dialDelta", DIAL_DELTA)
					}
			});
		});
		function closeOptions() {
			d("options").style.display = "none";
			d("dials").style.display = "block";
			d("dials").style.opacity = "1";
			d("search").style.opacity = "1";
			d("bookmarksBar").style.opacity = "1";
			d("closedTabsBar").style.opacity = "1";
			d("closedTabsBar").style.display = "block";
			optionsOpen = !optionsOpen;
			pageResize();
		}


		function changeCSS(ruleName, attr, value) {
			if (document.styleSheets) {
				for (var j=0;j<document.styleSheets.length;j++) {
					var cssRules = document.styleSheets[j].cssRules;
					for (var i=0;i<cssRules.length;i++) {
						if (cssRules[i].selectorText) {
							if (cssRules[i].selectorText.toLowerCase()==ruleName.toLowerCase()) {
								cssRules[i].style[attr] = value;
							}
						}
					}
				}
			}
		}
		function setTheme(index, isInit) {
			var t = themes[index];
			
			if ((isInit!=true) && (document.body.style.backgroundColor!="")) document.body.style.webkitTransition = "background-color 0.25s linear";

			document.body.style.backgroundColor = t.bg
			changeCSS(".slot-empty", "backgroundColor", t.dialBG)
			changeCSS(".slot-empty", "borderColor", t.dialBorder)
			changeCSS(".slot-empty", "color", t.emptyTextColor)
			changeCSS("body", "color", t.textColor)
			changeCSS(".title", "color", t.textColor)
			changeCSS("a", "color", t.textColor)

			changeCSS("div.slot:hover .thumbnail-container", "backgroundColor", t.overBG)
			changeCSS("div.slot:hover .thumbnail-container", "border", "1px solid " + t.overBorder)

			changeCSS(".bar-title", "color", t.barColor)
			changeCSS(".bar-container a font", "color", t.barColor)

			changeCSS(".bar-bg.bookmarksBar", "backgroundColor", t.barBG)
			changeCSS(".bar-bg.bookmarksBar", "border", "1px solid " + t.barBG)

			changeCSS(".tree-node", "color", t.textColor)
			setTimeout(function() {
				setStorage("theme", index)
			}, 20);
		}
		
		function saveBackgroundImage() {
			setBackgroundImage(d("optionsTextBoxBGImage").value);
			setStorage("bgImage", d("optionsTextBoxBGImage").value)
		}
		function clearBackgroundImage() {
			setStorage("bgImage", "")
			d("optionsTextBoxBGImage").value = "";
			d("main-bg").style.display='none'
		}

		function toggleSearch() {
			DISPLAY_SEARCH = !DISPLAY_SEARCH;
			setStorage("displaySearch", DISPLAY_SEARCH)
		}
		function toggleNewTabPage() {
			OPEN_ON_NEW_TAB = !OPEN_ON_NEW_TAB;
			setStorage("openOnNewTab", OPEN_ON_NEW_TAB)
		}
		function toggleRC() {
			DISPLAY_RECENTLY_CLOSED = !DISPLAY_RECENTLY_CLOSED;
			setStorage("displayRC", DISPLAY_RECENTLY_CLOSED)
		}
		function toggleBB() {
			DISPLAY_BOOKMARKS_BAR = !DISPLAY_BOOKMARKS_BAR;
			setStorage("displayBB", DISPLAY_BOOKMARKS_BAR)
		}

		function toggleTitle() {
			DISPLAY_TITLE = !DISPLAY_TITLE;
			setStorage("displayTitle", DISPLAY_TITLE)
		}
		function toggleFavIcon() {
			DISPLAY_FAV_ICON = !DISPLAY_FAV_ICON;
			setStorage("displayFavIcon", DISPLAY_FAV_ICON)
		}
		function toggleOptions() {
			DISPLAY_OPTIONS_BUTTON = !DISPLAY_OPTIONS_BUTTON;
			setStorage("displayOptions", DISPLAY_OPTIONS_BUTTON)
		}
		function togglePageIcon() {
			DISPLAY_PAGE_ICON = !DISPLAY_PAGE_ICON;
			setStorage("displayPageIcon", DISPLAY_PAGE_ICON)

			chrome.windows.getAll({populate:true},function(windows){
				for (var i=0;i<windows.length;i++){
					var tabs = windows[i].tabs
					for (var j=0;j<tabs.length;j++) {
							if (DISPLAY_PAGE_ICON) {
								chrome.pageAction.setIcon({tabId:tabs[j].id,path:"icons/16.png"})
								chrome.pageAction.show(tabs[j].id)	
							} else {
								chrome.pageAction.hide(tabs[j].id)	
							}
					}
				}
			})

		}

		function dialsNumberChanged(e, id) {
			var s = e.currentTarget;
			if (id==0) {
				setStorage("rows", s.options[s.selectedIndex].value)
				ROWS_NUMBER = s.options[s.selectedIndex].value
			} else {
				setStorage("col", s.options[s.selectedIndex].value)
				COLUMNS_NUMBER = s.options[s.selectedIndex].value
			}
		}

		function onDialRefrehsModeChanged(e, id) {
			var s = e.currentTarget;
			if (s.selectedIndex==0) {
				setStorage("refresh", null)
			} else if (s.selectedIndex==1) {
				setStorage("refresh", 6)
			} else if (s.selectedIndex==2) {
				setStorage("refresh", 24)
			} else if (s.selectedIndex==3) {
				setStorage("refresh", -1)
			}
		}
		function onAddPageShortcutChanged(e) {
			var s = e.currentTarget;
			setStorage("addPageShortcut", s.options[s.selectedIndex].value)
		}

		function AutoSuggest(textBox) {
			var t = this;
			var interval = null;
			var lastValue = "";

			t.asDiv = null;
			var selectedRow = -1;
			var resultsLength = 0;
			t.init = function() {
				textBox.addEventListener("keydown" ,t.keyDown, false);
				textBox.addEventListener("keyup" ,t.keyUp, false);
				textBox.addEventListener("blur" ,t.documentMouseDown, false);
			},
			t.getData = function(val) {
				var URL = "http://google.com/complete/search?output=toolbar&q=" + val;
				var xmlHttpRequest;
				xmlHttpRequest = new XMLHttpRequest();
				xmlHttpRequest.open("GET", URL, true);
				xmlHttpRequest.onreadystatechange =  function () {
				
					if (xmlHttpRequest.readyState==4) {
						if (xmlHttpRequest.status==200) {
							var response;

							if (lastValue==val) {
								if (t.asDiv==null) {
									t.asDiv = document.createElement("div");
									document.body.appendChild(t.asDiv); 
									t.asDiv.style.display='none';
								}
							
								t.asDiv.setAttribute("class", "auto-suggest");
								t.asDiv.style.width = (textBox.clientWidth) + "px";
								t.setASdivPosition();
								t.asDiv.innerHTML = ""

								var xml = xmlHttpRequest.responseXML;
								var completeSuggestion = xml.getElementsByTagName("suggestion");
								resultsLength = completeSuggestion.length;

								for (var i=0;i<resultsLength;i++) {
									var resultVal = completeSuggestion[i].attributes[0].nodeValue;

									var row = document.createElement("div");
									var pos = resultVal.indexOf(val);
									if (pos!=-1) {
										row.innerHTML = resultVal.substr(0, pos + val.length) + "<b>" + resultVal.substr(pos + val.length) +"</b>";
									} else {
										row.textContent = resultVal;
									}
									
									row.setAttribute("id", "auto-suggest-row" + i);
									row.setAttribute("class", "auto-suggest-row");
									row.index = i;
									row.isRow = true;
									row.addEventListener("mouseover" , function(e) {
										var row = e.currentTarget;
										if (selectedRow!=-1)  document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "auto-suggest-row");
										row.setAttribute("class", "auto-suggest-row selected");
										selectedRow = row.index;
									}, false);
									row.addEventListener("mousedown" , function(e) {
										var row = e.currentTarget;
										textBox.value = row.textContent;
										t.onSearch(row.textContent);
									}, false);

									t.asDiv.appendChild(row); 
								}

								selectedRow = -1;
								if (resultsLength==0) {
									t.asDiv.style.display = 'none';
								} else {
									t.asDiv.style.display = 'block';
								}
							}
						}
					}
				};
				xmlHttpRequest.send("");
			}
			t.keyUp = function(e) {

				var keyCode = e.keyCode;
				if (keyCode != 13) {
				   if ((keyCode!=38) &&  (keyCode!=40) &&  (keyCode!=116)) {
					   if (interval!=null) {
						   window.clearInterval(interval)
						   interval = null;
					   }
					   lastValue = textBox.value;
					   interval = setTimeout(t.getData, 10, textBox.value)
				   } else {

				   }
				} else {
					
				}
			},
			t.keyDown = function(e) {
				  var keyCode = e.keyCode;
				  if (keyCode==13) {
					 if (selectedRow!=-1) {
						textBox.value = document.getElementById("auto-suggest-row" + selectedRow).textContent
					 }
					 t.onSearch(textBox.value);
					 return;
				  }
				  if ((keyCode!=38) && (keyCode!=40)) {
					} else {
					  
					  if (keyCode==38) {
						  if (selectedRow!=-1)  document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "auto-suggest-row");
						  selectedRow--
						  if (selectedRow<0) selectedRow = resultsLength-1;
					  } else {
						  if (selectedRow!=-1)  document.getElementById("auto-suggest-row" + selectedRow).setAttribute("class", "auto-suggest-row");
						  selectedRow++
						  if (selectedRow>=resultsLength) selectedRow = 0;
					  }
					  var row = document.getElementById("auto-suggest-row" + selectedRow);
					  row.setAttribute("class", "auto-suggest-row selected");
					  textBox.value = row.textContent;
				  }
			}
			t.documentMouseDown = function(e) {
				if (e.explicitOriginalTarget!=t.asDiv) {
					lastValue = "--";
					if (t.asDiv!=null) {
						t.asDiv.style.display = 'none';
						document.getElementById("container").style.height =  "3px";
					}
				}
			},
			
			t.setASdivPosition = function(){
				var el = textBox;
				var x = 0;
				var y = textBox.offsetHeight - 1;
				while ((el.offsetParent) && (el.tagName.toLowerCase()!='body')) {
					x += el.offsetLeft;
					y += el.offsetTop;
					el = el.offsetParent;
				}
				x += el.offsetLeft;
				y += el.offsetTop;
				if (t.asDiv!=null) {
					t.asDiv.style.left = x + "px";
					t.asDiv.style.top  = y + "px";
				}
			},


			t.onSearch = function(val) {
				lastValue = "--";
				if (t.asDiv!=null) {
					t.asDiv.style.display = 'none';
					if (document.getElementById("container")) document.getElementById("container").style.height =  "29px";
					searchGoogle();
				}
			}
			t.init();
			
		}

	   function setSearchElement() {
			var _search = d("search");
			var searchInput = document.createElement("input");
			searchInput.setAttribute("id", "searchInput");
			searchInput.setAttribute("type", "text");
			searchInput.setAttribute("class", "searchInput");
			searchInput.addEventListener("keyup", function(e) {
				if (e.keyCode==13) searchGoogle();
			},false);
			_search.appendChild(searchInput);
			var btn = document.createElement("div");
			btn.setAttribute("class", "searchButton");
			btn.innerHTML = "Search"
			btn.addEventListener("click", searchGoogle, false); 
			_search.appendChild(btn);
	   }
	   function searchGoogle() {
			var query = d("searchInput").value;
			document.location = "http://www.google.com/search?q=" + query
	   }
	   function fixURL(str) {
			var _str = str.toLowerCase();

			if ((_str.indexOf("http://")!=0) && 
				(_str.indexOf("https://")!=0) && 
				(_str.indexOf("smtp://")!=0) && 
				(_str.indexOf("ftp://")!=0) && 
				(_str.indexOf("rtp://")!=0) && 
				(_str.indexOf("irc://")!=0) && 
				(_str.indexOf("snmp://")!=0)) {
				str = "http://" + str;
			}

			return str;
	   }


	   function urlCheck(s) {
			s = fixURL(s).toLowerCase();
			var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
			return regexp.test(s);
	   }

	   function openDialEditDialog(dial, title, url) {
			d("edit-dial-title").value = title;
			d("edit-dial-url").value = url;
			if (dial.thumb) {
				dialogTitle = "Edit Dial"
			} else {
				dialogTitle = "Add Dial"		
			}
			d("edit-dail-select-logos").selectedIndex = 0;
			d("edit-dial-thumbnail").value = "";

			$("#edit-dial-dialog").dialog({
				height: 350,
				width: 350,
				modal: true,
				title: dialogTitle,
				buttons: {
					'Save': function() {
						if (!urlCheck(d("edit-dial-url").value)) {
							alert("Please enter a valid URL");
							return;
						} else {
							d("edit-dial-url").value = fixURL(d("edit-dial-url").value)
						}
						if (dial.thumb) {
							var title        = d("edit-dial-title").value;
							var url          = d("edit-dial-url").value;
							chrome.extension.getBackgroundPage().api.update(dial.index, title, url)

							dial.thumb.title = title;
							dial.thumb.url   = url;

							dial.titleText.textContent = dial.thumb.title;
							dial.lnk.setAttribute("href", dial.thumb.url);
							dial.lnk.setAttribute("title", dial.thumb.title);
						
							if (d("edit-dial-thumbnail").value!="") {
								chrome.extension.getBackgroundPage().api.setThumbnail(dial.index, d("edit-dial-thumbnail").value, function(pos, _thumbnailURL) {
									if (pos==-1) {
										_thumbnailURL = "";
									}
									dial.thumb.thumbnailURL = _thumbnailURL;
									dial.style.webkitTransform = "scale(0.3)"
									var sss = setTimeout(function() {
										dial.innerHTML = "";
										createDial(dial.index, null, dial.thumb);
										dial.style.webkitTransform = "scale(1)"
									}, 200);

								});
							}
						} else {
							var title        = d("edit-dial-title").value;
							var url          = d("edit-dial-url").value;
							var thumbnailURL = d("edit-dial-thumbnail").value;
							if (url!="") {
									dial.removeEventListener("click", onEmptyDialClicked, false);
									var favIcon = "http://www.google.com/s2/favicons?domain_url=" + url;
									var pos   = chrome.extension.getBackgroundPage().api.addSlot(dial.index,title, url, favIcon, thumbnailURL, function(pos, _thumbnailURL) {
									if (pos==-1) {
										_thumbnailURL = "";
									}
									if (_thumbnailURL==null) _thumbnailURL = "";
									groups[currentGroup].thumbs.push({
										title    : title,
										url      : url,
										favIcon  : favIcon,
										pos	     : pos,
										thumbnailURL : _thumbnailURL
									})
									var index = groups[currentGroup].thumbs.length - 1;
									dial.style.webkitTransform = "scale(0.3)"
									var sss = setTimeout(function() {
										dial.thumb = null;
										dial.innerHTML = "";
										createDial(dial.index, index);
										sortThumbs();
										dial.style.webkitTransform = "scale(1)"
									}, 200);								
								});
							}
						}

						$(this).dialog('close');
						
					},
					Cancel: function() {
						$(this).dialog('close');
					}
				},
				close: function() {
				}
			});
	    }

		var logos = new Array();

		logos.push({
				name : "Google",
				url  : "http://farm3.static.flickr.com/2733/4443724817_aaf0b451db_o.png"
		});
		logos.push({
				name : "Bing",
				url  : "http://farm5.static.flickr.com/4040/4444494268_23dd75e2e0_o.png"
		});
		logos.push({
				name : "Yahoo!",
				url  : "http://farm5.static.flickr.com/4041/4443724713_43a1576d12_o.png"
		});
		logos.push({
				name : "YouTube",
				url  : "http://farm5.static.flickr.com/4038/4444494370_7c08496200_o.jpg"
		});
		logos.push({
				name : "Twitter",
				url  : "http://farm5.static.flickr.com/4068/4444494604_00af422ecc_o.png"
		});
		logos.push({
				name : "Facebook",
				url  : "http://farm5.static.flickr.com/4017/4444495422_c65c5fc8a3_o.png"
		});
		logos.push({
				name : "Gmail",
				url  : "http://farm5.static.flickr.com/4033/4444494284_50a7c7f1fd_o.jpg"
		});

		logos.push({
				name : "Hulu",
				url  : "http://farm5.static.flickr.com/4062/4443724449_df7191db95_o.png"
		});

		logos.push({
				name : "Google Maps",
				url  : "http://farm5.static.flickr.com/4022/4444497190_6dd4acfedf_o.png"
		});
		logos.push({
				name : "Amazon",
				url  : "http://farm5.static.flickr.com/4021/4444494406_af03c623e7_o.png"
		});


		logos.push({
				name : "----------------------------------",
				url  : ""
		});


		logos.push({
				name : "AOL",
				url  : "http://farm3.static.flickr.com/2694/4444495000_40f7de6498_o.png"
		});



		logos.push({
				name : "Picasa",
				url  : "http://farm3.static.flickr.com/2753/4443727335_9386f9cd37_o.png"
		});
		logos.push({
				name : "Mashable",
				url  : "http://farm3.static.flickr.com/2781/4444497248_98dab7011c_o.png"
		});

		logos.push({
				name : "Sourceforge",
				url  : "http://farm5.static.flickr.com/4016/4444497110_e32c43f7a4_o.png"
		});
		logos.push({
				name : "PC Magazine",
				url  : "http://farm5.static.flickr.com/4055/4444497034_1ab88d5d7f_o.jpg"
		});
		logos.push({
				name : "Download Squad",
				url  : "http://farm3.static.flickr.com/2799/4443727121_18d5c89c46_o.png"
		});
		logos.push({
				name : "Alexa",
				url  : "http://farm5.static.flickr.com/4031/4443727079_b97f29a54d_o.png"
		});
		logos.push({
				name : "Eurosport",
				url  : "http://farm5.static.flickr.com/4026/4443726843_c709fb87dd_o.png"
		});
		logos.push({
				name : "ESPN",
				url  : "http://farm3.static.flickr.com/2732/4444496668_6efd7fb1f4_b.jpg"
		});
		logos.push({
				name : "BBC",
				url  : "http://farm5.static.flickr.com/4028/4444496590_5eaf9e32f9_o.png"
		});
		logos.push({
				name : "CNN",
				url  : "http://farm5.static.flickr.com/4057/4443726649_1640ca37fa_o.png"
		});
		logos.push({
				name : "Last.fm",
				url  : "http://farm5.static.flickr.com/4060/4443726603_4b64397f13_o.png"
		});
		logos.push({
				name : "The New York Times",
				url  : "http://farm5.static.flickr.com/4063/4443726553_50297fdfd3_o.png"
		});
		logos.push({
				name : "Cnet",
				url  : "http://farm5.static.flickr.com/4071/4443726501_59585661df_o.png"
		});
		logos.push({
				name : "Digg",
				url  : "http://farm5.static.flickr.com/4023/4444496392_76561bbff3_o.png"
		});
		logos.push({
				name : "MapQuest",
				url  : "http://farm5.static.flickr.com/4014/4443726445_f7b688cab1_o.gif"
		});
		logos.push({
				name : "Vimeo",
				url  : "http://farm5.static.flickr.com/4071/4444496352_2eacf647d7_o.png"
		});
		logos.push({
				name : "MegaVideo",
				url  : "http://farm5.static.flickr.com/4015/4443726405_3053d6d7a4_o.png"
		});
		logos.push({
				name : "Orkut",
				url  : "http://farm3.static.flickr.com/2763/4443726349_2537173806_o.png"
		});
		logos.push({
				name : "Ask",
				url  : "http://farm3.static.flickr.com/2679/4443726293_0845bdb163_o.gif"
		});
		logos.push({
				name : "MySpace",
				url  : "http://farm5.static.flickr.com/4034/4443726209_8204a3484c_o.png"
		});
		logos.push({
				name : "EA Sports",
				url  : "http://farm5.static.flickr.com/4062/4443726155_1c70f6b4ef_o.png"
		});
		logos.push({
				name : "Blogger",
				url  : "http://farm5.static.flickr.com/4064/4444495814_8cdf35f5b8_o.png"
		});
		logos.push({
				name : "MSN",
				url  : "http://farm5.static.flickr.com/4041/4443725843_195ea4e9e9_o.png"
		});
		logos.push({
				name : "Craigslist",
				url  : "http://farm3.static.flickr.com/2725/4444495668_b16748acfc_o.png"
		});
		logos.push({
				name : "LinkedIn",
				url  : "http://farm5.static.flickr.com/4061/4443725725_ba82ce8110_o.png"
		});
		logos.push({
				name : "Fotolog",
				url  : "http://farm3.static.flickr.com/2200/4443725679_dc991f9f43_o.png"
		});
		logos.push({
				name : "Wordpress",
				url  : "http://farm5.static.flickr.com/4033/4444495580_aecb34b605_o.png"
		});
		logos.push({
				name : "Stumbleupon",
				url  : "http://farm5.static.flickr.com/4010/4444495540_405a49ef1f_o.png"
		});
		logos.push({
				name : "Technorati",
				url  : "http://farm5.static.flickr.com/4026/4444495490_d46525ce90_o.png"
		});
		logos.push({
				name : "Delicous",
				url  : "http://farm5.static.flickr.com/4030/4443725555_4551ef984c_o.png"
		});
		logos.push({
				name : "RapidShare",
				url  : "http://farm3.static.flickr.com/2745/4444495382_8de5efc924_o.png"
		});
		logos.push({
				name : "Dailymotion",
				url  : "http://farm3.static.flickr.com/2470/4443725403_14443d1a9e_o.png"
		});
		logos.push({
				name : "Metacafe",
				url  : "http://farm5.static.flickr.com/4014/4443725343_e051623a19_o.png"
		});
		logos.push({
				name : "Lifehacker",
				url  : "http://farm5.static.flickr.com/4055/4454524702_652de699ea_o.png"
		});
		logos.push({
				name : "TechCrunch",
				url  : "http://farm3.static.flickr.com/2692/4443849769_57794463d7_o.png"
		});

		logos.push({
				name : "IMDB",
				url  : "http://farm5.static.flickr.com/4019/4443724937_c8482c2b17_o.png"
		});
		logos.push({
				name : "Flickr",
				url  : "http://farm3.static.flickr.com/2737/4444494838_58b218c3ef_o.png"
		});
		logos.push({
				name : "Ebay",
				url  : "http://farm5.static.flickr.com/4070/4443724859_562ece13f7_o.png"
		});

		logos.push({
				name : "Wikipedia",
				url  : "http://farm5.static.flickr.com/4002/4444494550_dcac97a747_o.png"
		});


		function initLogosList() {
			logos.sort(function(a, b) {
				var x = a.name.toLowerCase();
				var y = b.name.toLowerCase();
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			})

			var s = d("edit-dail-select-logos");
			for (var i=0;i<logos.length;i++) {
				var optn   = document.createElement("OPTION");
				optn.text  = logos[i].name;
				optn.value = logos[i].url;
				s.options.add(optn);				
			}
			s.addEventListener("change", function(e) {
				d("edit-dial-thumbnail").value = s.options[s.selectedIndex].value;
			}, false);
		}
