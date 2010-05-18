var local_version, remote_version;
var curr_date = new Date().getTime();
var show_close = (typeof GM_getValue == "undefined" ? true : GM_getValue("showclose", true));
if (show_close == undefined)
	show_close = true;

createDownloadTab({ show_close: show_close });


function toSource(object)
{
	var json = "{";
	for (name in object)
		json += name + ":" + object[name].toString() + ",";
	json += "}";
	return json;
}

function createDownloadTab(objargs)
{
	if (!objargs.invoked)
	{
		objargs.invoked = true;
		var script = document.createElement("script");
		script.type = "application/javascript";
		script.textContent = "(" + arguments.callee + ")(" + toSource(objargs) + ");";
		document.body.appendChild(script);
		return;
	}
	
	function createDLLink(format)
	{
		var link = document.createElement("a");
		link.setAttribute("href", format.url);
		if (format.guessed)
			link.setAttribute("target", "youtube-video-download-guessiframe");
		link.setAttribute("style", "display: block; font-size: 11px; height: 14px; padding-top: 1px");
		link.setAttribute("id", "youtube_video_download_url_" + format.fmt);
		
		var titleEle = document.createElement("span");
		titleEle.setAttribute("style", "display: block; width: 50%; bottom: 0px; float: left; text-align: right;" + (format.quality.recdl || format.recommended ? " font-weight: bold;" : ""));
		titleEle.appendChild(document.createTextNode(format.quality.description + (format.format && !format.mobile ? " " + format.format : "") + (format.recommended && format.fmt != 0 ? " (Recommended)" : "")));
		link.appendChild(titleEle);
		
		var descEle = document.createElement("span");
		descEle.setAttribute("style", "display: block; width: 50%; bottom: 0px; float: right; text-align: left; opacity: .5;");
		descEle.appendChild(document.createTextNode(("\u00A0Format " + format.fmt + (format.guessed ? " (guessed)" : "") + (format.vres ? ", " + format.vres + "p" : format.mres ? ", " + format.mres.width + "x" + format.mres.height : "") + 
			(format.format && format.mobile ? ", " + format.format : "") + (format.vcodec ? ", " + format.vcodec : "") + (format.acodec ? ", " + format.acodec : "")).replace(",", ":"/* + (format.fmt.toString().length == 1 ? "\u2007" : "")*/)));
		link.appendChild(descEle);
		
		return link;
	}
	
	function compatError()
	{
		var pageBody = document.getElementsByTagName("body")[0];
		var firstChild = pageBody.firstChild;
		pageBody.insertBefore(document.createTextNode("Error: YouTube has been updated and S-YouTube Video Download is no longer compatible. "), firstChild);
		var errorLink = document.createElement("a");
		pageBody.insertBefore(errorLink, firstChild);
	}
	
	var yt_formats = {
		0:  { fmt: 0 , quality: { level: 0, recdl: false, description: "Low Quality (rename to video.flv)" }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3" , vcodec: "Sorenson Spark" },
		5:  { fmt: 5 , quality: { level: 1, recdl: false, description: "Low Quality"                       }, format: "FLV" , mres: { width: 320, height: 240 }, wmres: { width: 400, height: 226 }, aformat: "22kHz, mono"  , acodec: "MP3" , vcodec: "Sorenson Spark" },
		6:  { fmt: 6 , quality: { level: 2, recdl: false, description: "High Quality"                      }, format: "FLV" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }                          , acodec: "MP3" , vcodec: "Sorenson Spark" },
		13: { fmt: 13, quality: { level: 1, recdl: false, description: "Low Quality H.263"   }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "8kHz, mono"   , acodec: "SAMR", vcodec: "H.263"          },
		15: { fmt: 15, quality: { level: -1, recdl: true, description: "Original Upload Format"            }, format: "Unknown"                                                                                                                                         },
		17: { fmt: 17, quality: { level: 2, recdl: false, description: "Low Quality MPEG-4"  }, mobile: true, format: "3GPP", mres: { width: 176, height: 144 }, wmres: { width: 176, height: 144 }, aformat: "44kHz, mono"  , acodec: "AAC" , vcodec: "MPEG-4"         },
		18: { fmt: 18, quality: { level: 4, recdl: true , description: "iPod Compatible, High Quality"     }, format: "MP4" , mres: { width: 480, height: 360 }, wmres: { width: 480, height: 270 }, aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"          },
		22: { fmt: 22, quality: { level: 6, recdl: true , description: "High Definition, 720p"             }, format: "MP4" , vres: 720                                                            , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"          },
		34: { fmt: 34, quality: { level: 3, recdl: false, description: "Low Definition, 360p"              }, format: "FLV" , vres: 360                                                            , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"          },
		35: { fmt: 35, quality: { level: 5, recdl: true , description: "Standard Definition, 480p"         }, format: "FLV" , vres: 480                                                            , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"          },
		36: { fmt: 36, quality: { level: 3, recdl: true , description: "High Quality MPEG-4" }, mobile: true, format: "3GPP", mres: { width: 320, height: 240 }, wmres: { width: 320, height: 240 }, aformat: "44kHz, mono"  , acodec: "AAC" , vcodec: "MPEG-4"         },
		37: { fmt: 37, quality: { level: 7, recdl: true , description: "Full High Definition, 1080p"       }, format: "MP4" , vres: 1080                                                           , aformat: "44kHz, stereo", acodec: "AAC" , vcodec: "H.264"          },
	};
	
	var is_feather = document.getElementById("mh") && document.getElementById("ct") && document.getElementById("ft");
	
	var download_tab_exists = true;
	if (!is_feather)
	{
		if (document.getElementById("watch-action-download"))
			document.getElementById("watch-action-download-link").getElementsByClassName("watch-action-text")[0].textContent = " Download";
		else
		{
			download_tab_exists = false;
			
			var dlButton = document.createElement("div");
			dlButton.setAttribute("id", "watch-tab-download");
			dlButton.setAttribute("class", "watch-tab");
			dlButton.setAttribute("onclick", "yt.www.watch.actions.selectTab(this); document.getElementById(\"watch-tab-favorite-autoshare-wizard\").style.display = \"none\";");
			
			var dlButtonA = document.createElement("a");
			dlButtonA.setAttribute("id", "watch-action-download-link");
			dlButtonA.setAttribute("class", "watch-action-link");
			dlButtonA.setAttribute("onclick", "return false");
			dlButtonA.setAttribute("href", "#");
			dlButton.appendChild(dlButtonA);
		
			var dlButtonBtn = document.createElement("button");
			dlButtonBtn.setAttribute("id", "watch-action-download");
			dlButtonBtn.setAttribute("class", "master-sprite");
			dlButtonBtn.setAttribute("title", "Download");
			dlButtonA.appendChild(dlButtonBtn);
		
			var dlButtonSpan = document.createElement("span");
			dlButtonSpan.setAttribute("class", "watch-action-text");
			dlButtonSpan.appendChild(document.createTextNode(" Download"));
			dlButtonA.appendChild(dlButtonSpan);
			
			var dlButtonArrow = document.createElement("button");
			dlButtonArrow.setAttribute("class", "master-sprite watch-tab-arrow");
			dlButtonArrow.setAttribute("title", "");
			dlButton.appendChild(dlButtonArrow);
			
			var watchActions = document.getElementById("watch-actions-area");
			if (!watchActions)
				return compatError();
			
			var watchTabs = watchActions.getElementsByClassName("watch-tabs")[0];
			if (!watchTabs)
				return compatError();
			
			watchTabs.insertBefore(dlButton, watchTabs.getElementsByClassName("clear")[0]);
		}
	}
	
	if (!is_feather)
	{
		var tabBody = document.getElementById("watch-tab-download-body");
		if (!tabBody)
			return compatError();
		if (!download_tab_exists)
		{
			tabBody.setAttribute("style", "background-color: #F3F3F3 !important; padding: 8px 10px;");
			
			if (objargs.show_close)
			{
				var closeDiv = document.createElement("div");
				closeDiv.setAttribute("class", "close");
			
				var closeLink = document.createElement("a");
				closeLink.setAttribute("class", "hLink");
				closeLink.setAttribute("onclick", "yt.www.watch.actions.selectTab(_gel('watch-tab-share')); return false;");
				closeLink.setAttribute("title", "close this layer");
				closeLink.setAttribute("href", "#");
				closeLink.appendChild(document.createTextNode("Close"));
				closeDiv.appendChild(closeLink);
				tabBody.appendChild(closeDiv);
			}
		}
	}
	
	var guessIFrame = document.createElement("iframe");
	guessIFrame.setAttribute("name", "youtube-video-download-guessiframe");
	guessIFrame.setAttribute("style", "left: 0px; top: 0px; width: 1px; height: 1px; position: absolute; display: none;");
	document.documentElement.appendChild(guessIFrame);
	var tabBodyDiv = document.createElement("div");
	tabBodyDiv.setAttribute("id", "youtube_video_download_tabbodydiv");
	tabBodyDiv.setAttribute("style", "padding: 5px; text-align: center;" + (download_tab_exists ? " padding-top: 0px;" : ""));
	var tabBodyHeader = document.createElement("p");
	if (is_feather)
		tabBodyHeader.setAttribute("style", "font-weight: bold;");
	else
		tabBodyHeader.setAttribute("class", "bold");
	if (!is_feather && download_tab_exists)
		tabBodyHeader.appendChild(document.createTextNode("Or download in these alternative formats. (Free)"));
	else
		tabBodyHeader.appendChild(document.createTextNode("Choose a format to download this video for offline viewing."));
	tabBodyDiv.appendChild(tabBodyHeader);
	
	if (!is_feather && (!yt || !yt.getConfig))
		return compatError();
	
	var swf_args;
	
	if (is_feather)
	{
		swf_args = new Array();
		var embed = document.getElementsByTagName("embed")[0];
		if (!embed)
			return compatError();
		
		var flashvars = embed.getAttribute("flashvars");
		if (!flashvars)
			return compatError();
		
		flashvars = flashvars.split('&');
		for (var flashvar in flashvars)
			swf_args[flashvars[flashvar].substring(0, flashvars[flashvar].indexOf("="))] = flashvars[flashvar].substring(flashvars[flashvar].indexOf("=") + 1);
	}
	else
		swf_args = yt.getConfig("SWF_ARGS");
	
	var fmt_url_map = swf_args["fmt_url_map"];
	if (!fmt_url_map)
		return compatError();
	fmt_url_map = unescape(fmt_url_map).split(",");
	var video_id = swf_args["video_id"];
	var token = swf_args["t"];
	
	var title = false;
	if (is_feather)
	{
		var vt = document.getElementById("vt");
		if (vt)
			title = vt.textContent;
	}
	else
		title = yt.getConfig("VIDEO_TITLE");
	
	var is_widescreen = is_feather ? false : yt.getConfig('IS_WIDESCREEN');
	if (title)
		title = title.replace(/"/g, "-").replace(/%/g, "%25").replace(/=/g, "%3D").replace(/,/g, "%2C").replace(/&/g, "%26").replace(/#/g, "%23").replace(/\?/g, "%3F").replace(/\//g, "_").replace(/\\/g, "_").replace(/ /g, "+");
	
	if (video_id && token)
	{
		yt_formats[18].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=18";
		yt_formats[18].guessed = true;
		
		yt_formats[13].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=13";
		
		yt_formats[17].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=17";
		
		yt_formats[36].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=36";
		yt_formats[36].guessed = true;
		
		if (!is_feather && yt.getConfig('IS_HD_AVAILABLE'))
		{
			yt_formats[22].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token + "&fmt=22";
			yt_formats[22].guessed = true;
		}
	}
	
	var dl_link;
	if (!is_feather && (dl_link = document.getElementById("download-hq-button")) && (dl_link = dl_link.getAttribute("href")) && dl_link.indexOf(".youtube.com/videoplayback?") - 1)
	{
		var url = dl_link.split('?')[0];
		var args = dl_link.substring(url.length + 1).split('&');
		var title_changable = true;
		var fmt = 18;
		if (title)
			for (var arg in args)
			{
				arg = args[arg];
				if (arg.indexOf("sparams=") == 0)
				{
					var sparams = unescape(arg.substring(8)).split(',');
					for (var sparam in sparams)
						if (sparams[sparam] == "title")
						{
							title_changable = false;
							break;
						}
					break;
				}
			}
		dl_link = url + "?";
		for (var arg in args)
		{
			if (title && title_changable && args[arg].indexOf("title=") == 0)
				args[arg] = "title=" + title;
			else if (args[arg].indexOf("itag=") == 0)
				if (!(fmt = parseInt(args[arg].substring(5))))
					fmt = 18;
			dl_link += args[arg];
			if (arg < args.length - 1)
				dl_link += "&";
		}
		yt_formats[fmt].url = dl_link;
		yt_formats[fmt].guessed = false;
	}
	
	if (fmt_url_map[0] == "")
	{
		if (!video_id || !token)
			return compatError();
		yt_formats[0].url = "http://" + document.location.host + "/get_video?video_id=" + video_id + "&t=" + token;
		yt_formats[0].guessed = true;
	}
	else
	{
		var last_qlevel = 99;
		for (var fmt in fmt_url_map)
		{
			fmt = fmt_url_map[fmt].split("|");
			var url = fmt[1] + (title ? "&title=" + title : "");
			fmt = parseInt(fmt[0]);
			
			if (yt_formats[fmt])
			{
				last_qlevel = yt_formats[fmt].quality.level;
				yt_formats[fmt].url = url;
				yt_formats[fmt].guessed = false;
			}
			else
				yt_formats[fmt] = { fmt: fmt, quality: { level: last_qlevel - 0.5, description: "Unknown Format" }, url: url };
		}
	}
	
	var recommended;
	var highest_qlevel = -1;
	var format_list = new Array();
	var format_list_mobile = new Array();
	for (var fmt in yt_formats)
		if (yt_formats[fmt].url)
		{
			if (is_widescreen && yt_formats[fmt].mres)
				yt_formats[fmt].mres = yt_formats[fmt].wmres;
			if (yt_formats[fmt].mobile)
				format_list_mobile[format_list_mobile.length] = yt_formats[fmt];
			else
			{
				if (yt_formats[fmt].quality.level > highest_qlevel)
				{
					highest_qlevel = yt_formats[fmt].quality.level;
					recommended = yt_formats[fmt];
				}
				format_list[format_list.length] = yt_formats[fmt];
			}
		}
	recommended.recommended = true;
	format_list.sort(function(a, b) {return b.quality.level - a.quality.level;});
	format_list_mobile.sort(function(a, b) {return b.quality.level - a.quality.level;});
	
	for (var fmt in format_list)
		tabBodyDiv.appendChild(createDLLink(format_list[fmt]));
	
	tabBodyDiv.appendChild(document.createElement("br"));
	var tabBodyPhHeader = document.createElement("p");
	if (is_feather)
		tabBodyPhHeader.setAttribute("style", "font-weight: bold;");
	else
		tabBodyPhHeader.setAttribute("class", "bold");
	tabBodyPhHeader.appendChild(document.createTextNode("Mobile phone compatible (3GP videos)"));
	tabBodyDiv.appendChild(tabBodyPhHeader);
	
	for (var fmt in format_list_mobile)
		tabBodyDiv.appendChild(createDLLink(format_list_mobile[fmt]));

	if (is_feather)
	{
		var lc = document.getElementById("lc");
		if (!lc)
			return compatError();
		
		var ffd = document.getElementById("ffd");
		if (!ffd)
			return compatError();
		
		lc.insertBefore(tabBodyDiv, ffd);
	}
	else
		tabBody.appendChild(tabBodyDiv);
}
