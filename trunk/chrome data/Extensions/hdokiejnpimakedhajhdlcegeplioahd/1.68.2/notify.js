var g_notifytype=null;var g_notifydata=null;var g_matchingsites=null;function oninitnotify(){}function onshownotify(){var bg=getBG();if(bg){g_notifytype=bg.g_notification_type;g_notifydata=bg.g_notification_data;$("#body").css("background","#ffffe1");if(g_notifytype=="error"){$("#body").css("background","#f00");
document.getElementById("notifymsg").innerHTML=g_notifydata.msg;document.getElementById("notifyfeedbackbtn").style.display=g_notifydata.showFeedback?"":"none";document.getElementById("notifytryagainbtn").style.display=g_notifydata.showLogin?"":"none";document.getElementById("notifycreateaccountbtn").style.display=g_notifydata.showCreateAccount&&!bg.LPISLOC?"":"none";
document.getElementById("notifydisablebtn").style.display=g_notifydata.multifactor_disable_url?"":"none";document.getElementById("notifydisablesinglebtn").style.display=
/*g_notifydata['multifactor_disable_url'] && g_notifydata['showLogin'] && bg.lpGetPref('singlefactortype', '') != '' ? '' :*/
"none"
}else{if(g_notifytype=="save"){$("#body").css("background","#87d087");document.getElementById("notifymsg").innerHTML=gs("Should LastPass remember this password?")+" ("+g_notifydata.tld+")"}else{if(g_notifytype=="change"){g_matchingsites=bg.getsites(g_notifydata.tld,true);var msg;if(array_length(g_matchingsites)==1){for(var i in g_matchingsites){msg=gs("LastPass detected a password change for user:")+" "+bg.getusernamefromacct(bg.g_sites[i]);
break}}else{msg=gs("LastPass detected a password change for domain:")+" "+g_notifydata.tld}document.getElementById("notifymsg").innerHTML=msg}else{if(g_notifytype=="upgrade"){if(g_notifydata.upgrade){document.getElementById("notifymsg").innerHTML=gs("An Update is Available. Would you like to install?");
document.getElementById("notifyyesbtn").style.display="";document.getElementById("notifynobtn").style.display=""}else{if(g_notifydata.checking){document.getElementById("notifymsg").innerHTML=gs("Checking For Updates...");document.getElementById("notifyyesbtn").style.display="none";document.getElementById("notifynobtn").style.display="none"
}else{document.getElementById("notifymsg").innerHTML=gs("No Updates Are Available");document.getElementById("notifyyesbtn").style.display="none";document.getElementById("notifynobtn").style.display="none"}}}}}}var divs=document.getElementsByTagName("div");for(var i=0;i<divs.length;i++){if(divs[i].id.indexOf("notify")==0&&divs[i].id.substring(divs[i].id.length-5)!="popup"){divs[i].style.display="none"
}}document.getElementById("notify"+g_notifytype).style.display=""}}function savethesite(){var A=getBG();g_notifydata.addsite=1;A.g_site_data=g_notifydata;chrome.tabs.create({url:getchromeurl("site.html")});closemole()}function clicknever(A){var E={neversite:{title:gs("Never For This Site"),cmd:"neversite"},neverdomain:{title:gs("Never For This Domain"),cmd:"neverdomain"}};
var D="";var C;var B;for(C in E){if(E[C]==null){D+='<div id="'+C+'" class="notifyspacer"><div></div></div>';continue}B=typeof(E[C].cmd)=="undefined"?"":" onclick=\"notifyaction('"+E[C].cmd+"')\"";D+='<div id="'+C+'" class="notifybutton"'+B+'"><div>'+E[C].title+"</div></div>"}var F=document.getElementById("notifyneverpopup");
F.style.left=A.x;F.style.top=0;F.innerHTML=D}function notifyaction(C){var A=g_notifydata.url;var B=getBG();if(C=="neversite"){A=B.lpcanonizeUrl(A)}else{if(C=="neverdomain"){A=B.lp_gettld_url(A)}}B.addNever(A);closemole()}function changeconfirm(){if(array_length(g_matchingsites)==1){for(var A in g_matchingsites){getBG().changePassword(g_notifydata.newpw,new Array(A));
break}}else{if(g_browseraction){receiveBG({cmd:"changepw",newpw:g_notifydata.newpw,tld:g_notifydata.tld});return}else{getBG().openchangepw(g_notifydata.newpw,g_notifydata.tld)}}closemole()};
