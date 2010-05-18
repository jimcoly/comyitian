// upgrade 2009 Dec 13 v0.8.5
try{
	function u(pref,prefNew){
		var value = localStorage["$pref."+pref]
		if (value != null)
			prefs[prefNew]=value
		delete localStorage["$pref."+pref]		
	}
	u("enableAutoLoading",'general.autoLoading')
	u("askBeforeSetAutoLoad",'options.askBeforeSetAutoLoad')	
}catch(e){
}

try{
	var oldWhitelist = JSON.parse(localStorage.whiteList)
	var list = []
	for (var i=0;i<oldWhitelist.length;i++){
		var entry=oldWhitelist[i]
		list.push({host:entry.host,enabled:entry.enabled,description:""})
	}
	prefs['data.sitesList']=list
	delete localStorage.whiteList;
}catch(e){
}

try{
	delete localStorage.deployed;
	delete localStorage.version
}catch(e){
}