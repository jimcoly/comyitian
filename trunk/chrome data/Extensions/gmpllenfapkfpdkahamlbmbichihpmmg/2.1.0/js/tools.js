
function checkAndReplaceLinks(url){
		document.getElementById("userurl_2").innerHTML = "";
		var url = document.getElementById("userurl").value;
		var FakeLink = null;
		//迅雷链
		FakeLink = url.match(/[tT][hH][uU][nN][dD][eE][rR]:\/\/[a-zA-Z0-9/=+]+/);
		console.log("经过迅雷",FakeLink);
		a = 3;
		if(FakeLink)
		{
			console.log("存在迅雷");
			FakeLink[0] = url + '"';
			chrome.extension.sendRequest({"hope": "getVirtualLink","urltype":"Thunder","FakeLink":FakeLink[0]}, function(response) {
				responseUrl(response.VirtualLink);
			});
		}
		else
		{//快车链
			FakeLink = null;
			FakeLink = url.match(/[fF][lL][aA][sS][hH][gG][eE][tT]:\/\/[a-zA-Z0-9/=+]+&/);
			if(FakeLink)
			{
				chrome.extension.sendRequest({"hope": "getVirtualLink","urltype":"Flashget","FakeLink":FakeLink[0]}, function(response) {
					responseUrl(response.VirtualLink);
				});		
			}
			else
			{
				//旋风链
				FakeLink = null;
				//腾讯做的不错。。很少有网站使用旋风专用链。腾讯官网的链接可以检测到Chrome并自动输出真实地址。	
					FakeLink = url.match(/[qQ][qQ][dD][lL]:\/\/[a-zA-Z0-9/=+]+/);
				if(FakeLink)
				{
					FakeLink[0] = url + '"';
					chrome.extension.sendRequest({"hope": "getVirtualLink","urltype":"QQDownload","FakeLink":FakeLink[0]}, function(response) {	
						responseUrl(response.VirtualLink);
					});					
				}
			//More...
			}
		}
}
function responseUrl(newurl){
	document.getElementById("userurl_2").innerHTML = '<a href="' + newurl+ '" target="_blank">'+ newurl +'</a>';
}