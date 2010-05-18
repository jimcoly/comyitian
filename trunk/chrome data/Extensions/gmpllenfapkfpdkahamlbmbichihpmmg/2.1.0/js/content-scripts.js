var thunder = 1;
var flashget = 1;
var qqxf = 1;
var checkinpage = false;
function checkAndReplaceLinks(){
	$("a").each(function(){
		var FakeLink = null;
		var VirtualLink = null;
		//匹配链接
		var dom = this;
		//迅雷链
		if(parseInt(thunder))
			FakeLink = this.outerHTML.match(/[tT][hH][uU][nN][dD][eE][rR]:\/\/[a-zA-Z0-9/=+]+["']/);
		if(FakeLink)
		{
			$(dom).removeAttr("onClick").removeAttr("thunderhref").removeAttr("thunderPid").removeAttr("thunderType").removeAttr("thunderResTitle").removeAttr("oncontextmenu");
			chrome.extension.sendRequest({"hope": "getVirtualLink","urltype":"Thunder","FakeLink":FakeLink[0]}, function(response) {
				$(dom).attr("href",response.VirtualLink);
			});
		}
		else
		{
			//快车链
			FakeLink = null;
			if(parseInt(flashget))
				FakeLink = this.outerHTML.match(/[fF][lL][aA][sS][hH][gG][eE][tT]:\/\/[a-zA-Z0-9/=+]+&/);
			if(FakeLink)
			{
				console.log("存在快车");
				$(dom).removeAttr("onClick").removeAttr("oncontextmenu");
				chrome.extension.sendRequest({"hope": "getVirtualLink","urltype":"Flashget","FakeLink":FakeLink[0]}, function(response) {
				$(dom).attr("href",response.VirtualLink);
				});		
			}
			else
			{
				//旋风链
				FakeLink = null;
				//腾讯做的不错。。很少有网站使用旋风专用链。腾讯官网的链接可以检测到Chrome并自动输出真实地址。	
				if(parseInt(qqxf))
					FakeLink = this.outerHTML.match(/[qQ][qQ][dD][lL]:\/\/[a-zA-Z0-9/=+]+["']/);
				if(FakeLink)
				{
					//console.log("存在旋风链");
					$(dom).removeAttr("onClick").removeAttr("QHref").removeAttr("oncontextmenu");
					chrome.extension.sendRequest({"hope": "getVirtualLink","urltype":"QQDownload","FakeLink":FakeLink[0]}, function(response) {	
																			
						$(dom).attr("href",response.VirtualLink);
					});					
				}
				else
				{	//More...

 					if(parseInt(flashget))//检测另一种快车链
					{
						var aouterHTML = this.outerHTML;
						FakeLink = this.outerHTML.match(/[fF][lL][aA][sS][hH][gG][eE][tT][_][sS][eE][tT][hH][rR][eE][fF][_][jJ][sS]/);
						if(FakeLink)
						{;
							//对隐蔽快车链进行处理
							checkinpage = true;
						}
					}
				}
			}
		}
	});
	//
	if(checkinpage)
		$("body").append('<script src="http://chrome-download-manager.googlecode.com/svn/trunk/js/f.js"></script>');

}
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
	if(request.hope == "Replace")
	{	
		thunder = parseInt(request.thunder);
		flashget = parseInt(request.flashget);
		qqxf = parseInt(request.qqxf);
		console.log("响应",thunder,flashget,qqxf);
		if(thunder || flashget || qqxf)
			checkAndReplaceLinks();
		sendResponse({});
	}
  });

chrome.extension.sendRequest({"hope": "checkAutoReplaceEnable"}, function(response) {
	if(response.checkAutoReplaceEnable == "true")
		checkAndReplaceLinks();
});