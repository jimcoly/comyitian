function save(){
    localStorage["autoReplaceEnable"] = document.getElementById("autoReplaceEnable").checked;
	if(localStorage["autoReplaceEnable"] == "true")
		chrome.browserAction.setIcon({path:"./img/icon-auto.png"});
	else
		chrome.browserAction.setIcon({path:"./img/icon-half.png"});
	var status = document.getElementById("status");
	status.style.display = "block";
	status.innerHTML = "Saved";
	setTimeout(function() {
		status.innerHTML = "";
		status.style.display = "none";
  }, 850);
}
function init(){
	if(!localStorage["autoReplaceEnable"])
		localStorage["autoReplaceEnable"] = "false";
	if(localStorage["autoReplaceEnable"] == "true")
		document.getElementById("autoReplaceEnable").checked = true;
	else
		document.getElementById("autoReplaceEnable").checked = false;
}
