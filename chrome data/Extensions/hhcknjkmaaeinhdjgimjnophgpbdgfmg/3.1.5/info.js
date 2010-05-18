/**
 * SystemInformation
 * @version  0.3
 * @date 2010-01-22
 * @author LudoO
 *
 * Gives information about system (OS, Chrome...)
 *
 */
GRP.info = function(prefs){

    var status, report = {};
    
    function sendreport(){
        if (status == 3) {
            //status ==3 -> report complete
            chrome.extension.sendRequest(
            {
                message: "info",
                report: report
            });
        }
    }
    
    function sysinfo(){
        status = 0;
        infoNavigator();
        infoExtensions();
        infoVersion();
    }
    
    function infoNavigator(){
        report.navigator = getInfo();
        sendreport(++status);
    }
    
    function infoExtensions(){
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'chrome://extensions',
            onload: function(res){
                var extensions = parseExtensions(res.responseXML);
                console.log(extensions);
                report.extensions = extensions;
                sendreport(++status);
            },
            onerror: function(res){
                console.log(res);
                report.extensions = {};
                sendreport(++status);
            }
        });
    }
    
    function infoVersion(){
        GM_xmlhttpRequest(
        {
            method: 'GET',
            url: 'about:version',
            onload: function(res){
                var version = parseVersion(res.responseXML);
                console.log(version);
                report.version = version;
                sendreport(++status);
            },
            onerror: function(res){
                console.log(res);
                report.version = {};
                sendreport(++status);
            }
        });
    }
    
    function parseExtensions(xml){
        var extensions = {};
        Array.forEach(xml.getElementsByClassName('extension'), function(e){
            var data = 
            {
                name: getElementValue("./span[@jscontent='name']", e),
                version: getElementValue("./span[@jscontent='version']", e),
                description: getElementValue("./span[@jscontent='description']", e),
                id: getElementValue("./span[@jscontent='id']", e)
            };
            extensions[data.name] = data;
        });
        return extensions;
    }
    
    function parseVersion(xml){
        var version = {};
        var t = xml.getElementsById('inner');
        Array.forEach(t.getElementsByTagName('tr'), function(row){
            var name, value, i = 0, cell = {};
            Array.forEach(row.getElementsByTagName('td'), function(c){
                if (i === 0) {
                    name = c.innerText;
                } else {
                    value = c.innerText;
                }
                i++;
            });
            if (name) {
                version[name] = value;
            }
        });
        return version;
    }
    
};


function getInfo(){
    var w = {}, navs = ['language','product','appVersion','onLine','platform','vendor','appCodeName','cookieEnabled','appName','productSub','userAgent'];
	foreach(navs, function(nav){
		w[nav] = window.navigator[nav];
	});
	//This will crash on close preferences !!!!!
	/*iterate(window.navigator, function(p, o){
        if (p && o && typeof o === "string" || typeof o === "boolean") {
            w[p] = o;
        }
    });*/
    var chromeVersion = extractInfo('Chrome', w.appVersion);
    var webkitVersion = extractInfo('AppleWebKit', w.appVersion);
    
    var o = 
    {
        version: chromeVersion,
        webkit: webkitVersion,
        os: w.platform,
        lang: w.language,
        resolution: screen.width + 'x' + screen.height
    };
    return {
        info: o,
        navigator: w,
        screen: screen
    };
}

function extractInfo(name, text){
    try {
        var re = new RegExp(name + '/[\\d\\.]+');
        var r = re.exec(text);
        return (r) ? (r[0].replace(name + '/', '')) : '?';
    } 
    catch (e) {
        return '?';
    }
}
