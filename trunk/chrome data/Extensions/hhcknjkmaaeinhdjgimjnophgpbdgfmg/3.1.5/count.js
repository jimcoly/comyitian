/**
 * Google Reader Unread Count
 * @version  9
 * @date 2009-11-25
 * 
 * Display actual unread count instead of "1000+" in Google Reader
 * 
 * Original author : 
 * Angus http://angusdev.mysinablog.com/
 */

GRP.count = function(prefs, langs, ID, SL, lang){
    var unreadCountElement = null;
    
    // Wait for the dom ready
    function waitForReady(){
        unreadCountElement = document.getElementById('reading-list-unread-count');
        if (unreadCountElement) {
            window.setInterval(calcUnread, 3000);
            calcUnread();
        } else {
            window.setTimeout(waitForReady, 500);
        }
    }
    
    function modifySubtree(){
        if (unreadCountElement.textContent.match(/\d{4}\+?/)) {
            calcUnread();
        }
    }
    
    function findItemUnread(checkDuplicated, item){
        var hasplus = false;
        var count = 0;
        var alreadyCounted = false;
        var countres = item.innerHTML.match(/\((\d*)\+?\)/);
        if (countres) {
            count = parseInt(countres[1], 10);
            if (item.innerHTML.match(/\(1000\+\)/)) {
                hasplus = true;
            }
            var nodeTitle = item.parentNode.getAttribute('title');
            if (nodeTitle) {
                if (checkDuplicated.indexOf(nodeTitle) < 0) {
                    checkDuplicated.push(nodeTitle);
                } else {
                    alreadyCounted = true;
                }
            }
        }
        
        return {
            count: count,
            hasplus: hasplus,
            alreadyCounted: alreadyCounted
        };
    }
    
    function calcUnread(){
        var checkDuplicated = [];
        var total = 0;
        var totalplus = false;
        var res = document.evaluate("//li[contains(@class, 'folder')]//li[contains(@class, 'folder')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var i = 0; i < res.snapshotLength; i++) {
            var res2 = document.evaluate(".//li[contains(@class, 'unread')]/a/span/span[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var subtotal = 0;
            var subtotalplus = false;
            for (var j = 0; j < res2.snapshotLength; j++) {
                var result = findItemUnread(checkDuplicated, res2.snapshotItem(j));
                if (result.hasplus) {
                    totalplus = true;
                    subtotalplus = true;
                }
                subtotal += result.count;
                if (!result.alreadyCounted) {
                    total += result.count;
                }
            }
            if (subtotal > 0) {
                var resfolder = document.evaluate(".//a/span/span[contains(@class, 'unread-count')]", res.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                if (resfolder) {
                    resfolder.innerHTML = '&nbsp;(' + subtotal + (subtotalplus ? '+' : '') + ')';
                }
            }
        }
        
		//friends unread
		var elfriend = document.getElementById('friends-tree-item-0-unread-count');
		if (elfriend) {
			var friendcount = parseInt(elfriend.innerText.replace(/[\s\(\)]*/g, ''), 10);
			total += friendcount;
		}
		
        // untagged items
        var res3 = document.evaluate("//ul[@id='sub-tree']/li/ul/li[not(contains(@class, 'folder')) and contains(@class, 'unread')]/a/span/span[contains(@class, 'unread-count')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for (var k = 0; k < res3.snapshotLength; k++) {
            var res4 = findItemUnread(checkDuplicated, res3.snapshotItem(k));
            if (res4.hasplus) {
                totalplus = true;
            }
            if (!res4.alreadyCounted) {
                total += res4.count;
            }
        }
        
        if (total > 0) {
            var totaltext = total + (totalplus ? '+' : '');
            unreadCountElement.innerHTML = ' (' + totaltext + ')';
            
            //update subtitle (1000+ new items)
            var elnew = document.getElementById('show-new');
            if (elnew && elnew.innerText.indexOf('1000+') >= 0) {
                elnew.innerText = elnew.innerText.replace('1000+', totaltext);
            }
            
            // update windows title as well
            if (totaltext) {
                var newTitle = '(' + totaltext + ') ' +
                document.title.replace(/\s*\(\d+\+?\)$/, '').replace(/^\(\d+\+?\)\s*/, '');
                if (document.title != newTitle) {
                    document.title = newTitle;
                }
            }
        }
    }
    
    waitForReady();
    
};
