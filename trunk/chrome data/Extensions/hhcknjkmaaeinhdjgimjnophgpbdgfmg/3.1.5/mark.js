/**
 * Google Reader - Mark Until Current As Read
 * @version  1.3
 * @date 2007-06-01
 *
 * Mark all entries upto the current entry as read
 *
 * Original author :
 * Gautham Pai (http://buzypi.in/)
 * http://userscripts.org/scripts/show/24955
 */

GRP.mark = function(prefs, langs, ID, SL, lang){
	var currentElement, modeList=false;
	function setConfig(){
		currentElement = getCurrentEntry();
		modeList=(getMode(currentElement)==='list');
	}
	function clickEntry(entry, modeList){
		if (!hasClass(entry,'read')){
			var el = (modeList)?entry.firstChild:entry;
			simulateClick(el);
		}
	}
	function markUntilCurrentAsRead() {
		setConfig();
		var nextElement=currentElement.previousSibling;
		while(nextElement){
			clickEntry(nextElement, modeList);
			nextElement=nextElement.previousSibling;
		}
		
		simulateClick(currentElement.childNodes[0]);
	}

	function markAfterCurrentAsRead() {
		setConfig();
		var nextElement=currentElement.nextSibling;
		while(nextElement){
			clickEntry(nextElement, modeList);
			nextElement=nextElement.nextSibling;
		}
		simulateClick(currentElement.childNodes[0]);
	}

    var keycodeUp = getShortcutKey('mark', 'markprev', prefs); //87;//w
    keycodeUp.fn = markUntilCurrentAsRead;
    var keycodeDown = getShortcutKey('mark', 'marknext', prefs); //75;//k
    keycodeDown.fn = markAfterCurrentAsRead;
    initKey([keycodeUp, keycodeDown]);
};