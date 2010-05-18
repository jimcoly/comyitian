$(document).ready(function(e){
	if (!/^https?:\/\/docs.google.com\/viewer/.test(document.URL.toString())){
		// xls|xlsx|ods|csv|tsv|txt|tsb|rtf|sxw
		// set regex defaults
		var ugdv_valid_exp = new RegExp('^[^\\?#]+\\.(doc|docx|pdf|ppt|pps|tiff")((#|\\?).*)?$', 'i');
		var open_newTab = true;
		var docs_viewer_url = "http://docs.google.com/viewer?url=";
		
		$("<div />")
			.addClass("ugdv_contextMenu")
			.attr('id', "ugdv_myMenu")
			.html("<ul id='ugdv_contextMenu'></ul>")
			.appendTo($("body"))
			.hide();
			
		$("<li />")
			.attr('id', "ugdv_menuItem_google_docs")
			.html("Open in Google Docs Viewer")
			.appendTo($("#ugdv_contextMenu"));
			
		$("<li />")
			.attr('id', "ugdv_menuItem_new_tab")
			.html("Open link in new tab")
			.appendTo($("#ugdv_contextMenu"));
		
		$("<li />")
			.attr('id', "ugdv_menuItem_new_window")
			.html("Open link in new window")
			.appendTo($("#ugdv_contextMenu"));
			
		$("<li />")
			.attr('id', "ugdv_menuItem_download_file")
			.html("Download file")
			.appendTo($("#ugdv_contextMenu"));
		
		$("<li />")
			.attr('id', "ugdv_menuItem_copy")
			.html("Copy link address")
			.appendTo($("#ugdv_contextMenu"));
		
		/*$("<li />")
			.attr('id', "ugdv_menuItem_import_docs")
			.html("Import to Google Docs (login status required)")
			.appendTo($("#ugdv_contextMenu"));
		*/
		
		chrome.extension.sendRequest({
				type: 'get_ext'
			},
			function(response) {
				var used_ext = [];
				var prefs = response.split(",");
				if (response.length > 0){					
					for (var i = 0; i < prefs.length - 1; i++){
						var pref = prefs[i].split(":");
						if (pref[1] !== "false") used_ext.push(pref[0]);
					}
					ugdv_valid_exp = new RegExp('^[^\\?#]+\\.(' + used_ext.join('|') + ')((#|\\?).*)?$', 'i');
				}
				// get new tab
				var pref = prefs[prefs.length-1].split(":");
				open_newTab = pref[1] === "false" ? false : true;
				parsePageLinks();
				
			}
		);
		function parsePageLinks(){
			$("a").each(function(e){
				var link_href = this.href;
				if (ugdv_valid_exp.test(link_href)) {
					if (open_newTab) $(this).attr('target', "_blank");
					$(this).addClass("ugdv_link");
					this.href = docs_viewer_url + encodeURI(link_href);
				}
			});
			
			// attach context menu
			$(".ugdv_link").contextMenu("ugdv_myMenu",
				{
					bindings: {
						'ugdv_menuItem_google_docs': function(t) {
							var target_url = $(t).attr('href');
							if (open_newTab){
								chrome.extension.sendRequest({
										type: 'open_tab',
										url:target_url
									},
									function(response) {}
								);
							}else{
								window.location = target_url;
							}
						},
						'ugdv_menuItem_new_tab': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							chrome.extension.sendRequest({
									type: 'open_tab',
									url:target_url
								},
								function(response) {}
							);
						},
						'ugdv_menuItem_new_window': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							chrome.extension.sendRequest({
									type: 'open_win',
									url:target_url
								},
								function(response) {}
							);
						},
						'ugdv_menuItem_download_file': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							window.location = "http://mycslab.com/file_helper.php?file=" + target_url;
						},
						'ugdv_menuItem_copy': function (t){
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							$("<input/>")
								.attr('id','ugdv_input')
								.css({width:'1px', height:'1px', border:'none', backgroundColor:'#FFF', 'position':'absolute'})
								.prependTo($(t).parent())
								.val(target_url)
								.focus()
								.select();
							
							document.execCommand("copy", false, null);
							$('#ugdv_input').hide(1, function(e){$(this).remove();});
						}
						/*,
						'ugdv_menuItem_import_docs': function(t) {
							alert('Trigger was '+t.id+'\nAction was Import file');
						}*/
					}
				}							
			);
		}
	}
});