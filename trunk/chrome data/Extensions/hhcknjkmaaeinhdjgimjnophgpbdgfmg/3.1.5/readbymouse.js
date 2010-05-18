/**
 * Google Reader - Read by Mouse
 * @version  1.1
 * @date 2009-02-28
 *
 * Adds a button that toggles Google Reader in and out of a "mouse-only" mode
 * that allows for easy and customizable reading via the mouse buttons
 * (next item, previous item, open in tab/star/share/tag).
 *
 * bug windows middle ckick :
 * http://code.google.com/p/chromium/issues/detail?id=17234
 *
 * Original author :
 * Ryan Williams <ryanbot at gmail>
 * http://userscripts.org/scripts/show/8843
 */
GRP.readbymouse = function(prefs, langs, ID, SL, lang){
    var btn = document.getElementById('btn-readbymouse');
    if (btn) {
        return;
    }
    
    var systemStatus = GM_getValue('rbmStatus', 'Off');
    var ua = navigator.userAgent.toLowerCase();
    var isWindows = /windows|win32/.test(ua);
		
	var isMClick = (!isWindows || (isWindows && isChromeVersionMini('5.0.342.1')));
    
    // Get the element our new button goes by
    var nearNewButton = document.getElementById('entries-down');
    
    // Add the middle click settings droplist and the Mouse Control toggle
    // button
    if (nearNewButton) {
        var mouseCtrlButton = document.createElement("span");
        mouseCtrlButton.id = 'btn-readbymouse';
        var html = '<input type="button" id="___mouseCtrl" value="ReadByMouse ' + systemStatus + '" style="margin-left: 10px;"></input>';
        if (isMClick) {
            html += '<span style="margin-left: 10px;">' + SL.middleclick + 
			':</span><select id="___middleClickSettings" name="midClickSettings" style="margin-left: 5px;">'+
			'<option id="openInTab" value="openInTab">' + SL.openintab + 
			'</option><option id="openInBackTab" value="openInBackTab">' + SL.openinbacktab +
			'</option><option id="share" value="share">' + SL.shares + 
			'</option><option id="star" value="star">' + SL.stars + 
			'</option><option id="addTag" value="addTag">' + SL.addtag + 
			'</option></select><span id="addTagSpan" style="text-align:left; visibility: collapse; margin-left: 10px;">' + SL.addtag + ':<input type="textbox" id="txtTag" value=""></span>';
        }

		mouseCtrlButton.innerHTML+=html;
        insertAfter(mouseCtrlButton, nearNewButton);
    }
    
    var currentSettingMidClick = 'openInTab';
    var currentTag = 'test';
    
    // Get the current middle click setting out of GM
    currentSettingMidClick = GM_getValue('middleClickSetting', 'openInTab');
    
    // Get the current tag setting out of GM
    currentTag = GM_getValue('mouseTag', '');
    
    // set the selected value to the setting
    var midClickOption = document.getElementById(currentSettingMidClick);
    if (midClickOption) {
        midClickOption.selected = true;
        // Hide or reveal the tag textbox
        if (midClickOption.value == "addTag") {
            document.getElementById('addTagSpan').style.visibility = 'visible';
        } else {
            document.getElementById('addTagSpan').style.visibility = 'hidden';
        }
        document.getElementById('txtTag').value = currentTag;
    }
    // Add listener for key press (toggles Mouse on and off)
    document.addEventListener('keydown', function(event){
        if (event.ctrlKey && event.which == 90) {
            var myBtn = document.getElementById('___mouseCtrl');
            
            if (!myBtn) {
                return false;
            }
            
            if (systemStatus == 'On') {
                myBtn.value = SL.off;
                systemStatus = 'Off';
                GM_setValue('rbmStatus', systemStatus);
                
            } else {
                myBtn.value = SL.on;
                systemStatus = 'On';
                GM_setValue('rbmStatus', systemStatus);
            }
        }
    }, false);
    
    // Add listener for mouse clicks
    document.addEventListener('click', function(event){
        console.log('event.button:'+event.button);
		// On each left click, check to see if the middle click setting
        // has changed. if so, then set it in GM
		if (event.button === 0) {
        
            // Get the selected option
            var myMiddleSelect = document.getElementById('___middleClickSettings');
            if (!myMiddleSelect) {
                return;
            }
            
            var midClickSelValue = myMiddleSelect.options[myMiddleSelect.selectedIndex].value;
            if (!midClickSelValue) {
                return;
            }
		
            // If the middle click setting has changed, then set it
            // in GM
            if (currentSettingMidClick != midClickSelValue) {
                if (GM_setValue) {
                    GM_setValue('middleClickSetting', midClickSelValue);
                    currentSettingMidClick = midClickSelValue;
                }
            }
            
            // If the tag has changed, then set it in GM
            var strTag = document.getElementById('txtTag').value;
            
            if (currentTag != strTag) {
                if (GM_setValue) {
                    GM_setValue('mouseTag', strTag);
                    currentTag = strTag;
                }
                
            }
            
            // Hide or reveal the tag textbox
            if (currentSettingMidClick == "addTag") {
                document.getElementById('addTagSpan').style.visibility = 'visible';
            } else {
                document.getElementById('addTagSpan').style.visibility = 'collapse';
            }
            
        }else if (event.button == 1 && systemStatus == 'On') {
            // Middle click
			// If they click on a link, let the link work like
            // normal
            if (event.target.nodeName.toLowerCase() == 'a') {
                return;
            }
            
            // Action here depends on the selection from the
            // droplist
            var mySettingsDL = document.getElementById("___middleClickSettings");
            if (mySettingsDL) {
                switch (mySettingsDL.options[mySettingsDL.selectedIndex].value) {
                    case "addTag":
                        tagItem2();
                        break;
                }
            }
            
            event.stopPropagation();
            event.preventDefault();
        }
        
    }, true);
    
    // Add listener for mousedown
    document.addEventListener('mousedown', function(event){
        var myTarget = event.target;
        if (systemStatus == 'On') {
            // If they click on a link, let the link work like normal
            if (myTarget.nodeName.toLowerCase() == 'a') {
                return;
            }
            var clickType = event.button;
            // Left Click
            if (clickType === 0) {
            
                // turn mouse control off if clicking on the mouse
                // control button
                if (myTarget.id == '___mouseCtrl') {
                    myTarget.value = SL.off;
                    systemStatus = 'Off';
                    if (GM_setValue) {
                        GM_setValue('rbmStatus', systemStatus);
                    }
                } else if (myTarget.id == '___middleClickSettings' || myTarget.id == 'txtTag') {
                    // Always let clicks work here
                } else {
                    simulateClick(document.getElementById("entries-down"));
                    event.stopPropagation();
                    event.preventDefault();
                }
            }
            
            // Right Click
            if (clickType == 2) {
                simulateClick(document.getElementById("entries-up"));
                event.stopPropagation();
                event.preventDefault();
            }
            
            // Middle click
            if (clickType == 1) {
            
                // Action here depends on the selection from the
                // droplist
                var mySettingsDL = document.getElementById("___middleClickSettings");
                if (mySettingsDL) {
                    switch (mySettingsDL.options[mySettingsDL.selectedIndex].value) {
                        case "openInTab":
                            openInTab(true);
                            break;
						case "openInBackTab":
                            openInTab(false);
                            break;	
                        case "share":
                            shareItem();
                            break;
                        case "star":
                            starItem();
                            break;
                        case "addTag":
                            tagItem1();
                            break;
                    }
                }
                event.stopPropagation();
                event.preventDefault();
            }
            
        } else // Mouse control is off
        {
            // If they clicked on the mouse control button, then turn it
            // on.
            if (myTarget.id == '___mouseCtrl') {
                myTarget.value = SL.on;
                systemStatus = 'On';
                GM_setValue('rbmStatus', systemStatus);
            }
        }
    }, true);
    
    // Go find the "Open original in tab" element and get the URL for original
    function openInTab(selected){
        openEntryInNewTab(false, selected);
    }
    
    // Go find the "share item" button and simulate a click on it
    function shareItem(){
        var current = getCurrentEntry();
        var currentEntry = current.getElementsByTagName("broadcast")[0];
        // var currentEntry = $("#current-entry .entry-actions .broadcast");
        simulateClick(currentEntry);
    }
    
    // Go find the "star item" button and simulate a click on it
    function starItem(){
        var current = getCurrentEntry();
        var currentEntry = current.getElementsByTagName("star")[0];
        // var currentEntry = $("#current-entry .entry-actions .star");
        simulateClick(currentEntry);
    }
    
    // Do the first part of tagging (click the tag button to reveal the tag
    // control)
    function tagItem1(){
        var current = getCurrentEntry();
        var currentEntry = current.getElementsByTagName("entry-tagging-action-title")[0];
        // var currentEntry = $("#current-entry .entry-actions
        // .entry-tagging-action-title");
        simulateClick(currentEntry);
    }
    
    // Do the second part of tagging (add the tag and click the save button)
    function tagItem2(){
        var tagEdit = document.getElementsByTagName("tags-edit");
        var tagEditTags = tagEdit.getElementsByTagName("tags-edit-tags");
        
        tagEditTags.innerHTML += txtTag.innerText;
        /*
         * $(".tags-edit .tags-edit-tags").val( $(".tags-edit
         * .tags-edit-tags").val() + $("#txtTag").val()); //
         * document.getElementById('tags-container-template');
         *
         * var popup = $(".tags-edit .tags-edit-buttons")
         * .find(".goog-button-body"); //
         * document.getElementById('tags-container-template');
         */
        var tagEditButton = tagEdit.getElementsByTagName("tags-edit-buttons")[0];
        var popup = tagEditButton.getElementsByTagName("goog-button-body")[0];
        
        simulateClick(popup);
    }
    
    // Disable the context menu when Mouse Mode is on.
    document.addEventListener('contextmenu', function(event){
        if (systemStatus == 'On') {
            // Let clicks on links open the context menu.
            if (event.target.nodeName.toLowerCase() != 'a') {
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }, true);
    
};
