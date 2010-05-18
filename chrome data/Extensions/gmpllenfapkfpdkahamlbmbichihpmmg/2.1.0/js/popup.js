function save(){
    localStorage["autoReplaceEnable"] = document.getElementById("autoReplaceEnable").checked;
	if(localStorage["autoReplaceEnable"] == "true")
		chrome.browserAction.setIcon({path:"./img/icon-auto.png"});
	else
		chrome.browserAction.setIcon({path:"./img/icon-half.png"});
	loadset();
}
function replaceLinks(thunder,flashget,qqxf){
    chrome.tabs.getSelected(null, function(tab) {	
        chrome.tabs.sendRequest(tab.id, 
		{"thunder": thunder,"flashget":flashget,"qqxf":qqxf,"hope":"Replace"},
		function(response){window.close();});
})};
function loadset(){
	if(localStorage["autoReplaceEnable"] == "true")
	{
		document.getElementById("autoReplaceEnable").checked = true;
		document.getElementById("autoReplaceEnable_checkbox").src = "./img/checkbox-yes.png";
	}
	else
	{
		document.getElementById("autoReplaceEnable").checked = false;
		document.getElementById("autoReplaceEnable_checkbox").src = "./img/checkbox-not.png";
	}
	//
	if(!localStorage["version"])
	{
		localStorage["version"] = VERSION;
	}
	if(parseInt(localStorage["version"]) < VERSION )
	{
		if(NEW_FEATURE != "")
		{
			document.getElementById("newversion").innerHTML = NEW_FEATURE;
			document.getElementById("newversion").style.display = "block";
		}
		localStorage["version"] = VERSION;
		chrome.browserAction.setBadgeText({"text":""});
	}
}
