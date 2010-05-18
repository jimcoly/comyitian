if(window.parent){
	init();
}

function init(){
	$('body').append('<div class="ChromeGoogleTasks"></div>');
	$('.ChromeGoogleTasks').append('<div class="Tab">Tasks</div>');
	$('.ChromeGoogleTasks').append('<div class="Content"></div>');
	$('.ChromeGoogleTasks .Content').append('<iframe src="https://mail.google.com/tasks/ig"></iframe>');
	var port = chrome.extension.connect({name: "UpdateBackgroundPage"});
	port.postMessage({toggleExpand: false});
}

function makeVisible(){
	$('.ChromeGoogleTasks').css({'display': 'block'});
}

function makeInvisible(){
	$('.ChromeGoogleTasks').css({'display': 'none'});
}

function expand(){
	$('.ChromeGoogleTasks .Content').animate({'height': '400px'});	
}

function contract(){
	$('.ChromeGoogleTasks .Content').animate({'height': '0'});	
}

$('.ChromeGoogleTasks .Tab').click(function(){
	var port = chrome.extension.connect({name: "UpdateBackgroundPage"});
	port.postMessage({toggleExpand: true});
});

/* Receive expand/contract information from background */
chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "UpdateContentScript");
  port.onMessage.addListener(function(msg) {
    if (msg.expand) {
      expand();
    }else{
	  contract();	
	}
    if (msg.visible) {
      makeVisible();
    }else{
	  makeInvisible();	
	}
  });
});