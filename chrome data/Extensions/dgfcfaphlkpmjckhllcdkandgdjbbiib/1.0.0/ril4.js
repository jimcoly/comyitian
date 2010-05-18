var ReadItLater = (function() {

    //////////////////////////////////////////////////////

    var rilURLBuilder = (function() {
        var _URLs = {
            'add' : 'https://readitlaterlist.com/v2/add',
            'send' : 'https://readitlaterlist.com/v2/send',
            'get' : 'https://readitlaterlist.com/v2/get',
            'auth' : 'https://readitlaterlist.com/v2/auth'
        };

        function _makeURL(method, params) {
            params = params || {};
            params['username'] = this.username;
            params['password'] = this.password;
            params['apikey'] = this.apikey;
            return _URLs[method] + "?" + jQuery.param(params);
        }

        return {makeURL: _makeURL};

    })();

    //////////////////////////////////////////////////////

    var authenticated = true;
    var configured = false;

    rilURLBuilder.username = null;
    rilURLBuilder.password = null;
    rilURLBuilder.apikey = "c3cp9T5fAb3e9L5391gf4d4G5bd3t308";

    reloadOptions();
    if (!configured) {
        chrome.tabs.create({url: "options.html"});
    }

    function reloadOptions() {
        if (localStorage['username'] && localStorage['password']) {
            rilURLBuilder.username = localStorage['username'];
            rilURLBuilder.password = localStorage['password'];
            configured = true;

            refreshListFromServer();
        }
    }

    function startAsyncCommand(command, params, successCallback) {
        var xhr = new XMLHttpRequest();

        try {
            console.log("Sending request...");

            // Set a timer to give up after 5 seconds
            var timerId = window.setTimeout(function() {
                    console.log("aborted after 5 seconds");
                    xhr.abort();
                    // TODO: queue request for later
                    }, 5000);    

            xhr.onreadystatechange = function() {
                if ((xhr.readyState == 4) && (xhr.status == 200)) {
                    if (xhr.responseText) {
                        console.log("Got response: " + xhr.responseText);
                        window.clearTimeout(timerId);
                        var responseText = xhr.responseText;
                        if (successCallback) {
                            window.setTimeout(function(){ 
                                    // TODO: check the responseText for:
                                    //  200 OK
                                    //  400 - invalid request
                                    //  401 - username/password incorrect
                                    //  403 - rate limit exceeded
                                    //  503 - server undergoing maintanence
                                    successCallback(responseText) 
                                    }, 100);
                        }
                    }
                }

                // TODO: if we got an "unathorized" error, then change 
                // authentication flag
            }

            xhr.onerror = function(error) {
                console.log("error: " + error);
            }

            xhr.open("GET", rilURLBuilder.makeURL(command, params), true);
            xhr.send(null);
        } 
        catch (e) 
        {
            console.log("ex: " + e);
            console.error("exception: " + e);
        }   
    }

    var dateOfLastGet = null;

    function requestList(dateToGetFrom) {
        console.log('requestList(' + dateToGetFrom + ')');

        var params = {format: 'json'};
        if (dateToGetFrom) {
            params['since'] = dateToGetFrom;
        }
        startAsyncCommand('get', params, function(response) {
                    var list = JSON.parse(response);
                    console.log('since=' + list['since']);
                    dateOfLastGet = list['since'];
                    refreshLocalCopyOfList(list['list']);

                    // update the GUI to reflect the list
                    updatePageActionForAllTabs();
                });
    }

    function refreshListFromServer() {
        requestList(dateOfLastGet);
    }

    var rilListByID = {};
    var rilListByURL = {};
    var rilQueued = {};

    function refreshLocalCopyOfList(listUpdates) {
        console.log('refreshLocalCopyOfList(' + 
                    JSON.stringify(listUpdates) + ')');

        // Update the by-ID list, by adding any new, and updating
        // any updated items
        rilListByID = rilListByID || {};
        for (var id in listUpdates) {
            rilListByID[id] = listUpdates[id];
        }

        // From the updated by-ID list, build an easy-access by-URL list
        rilListByURL = {};
        for (var id in rilListByID) {
            rilListByURL[rilListByID[id]['url']] = rilListByID[id];
        }
    }

    function getStatusOfURL(url) {
        /* First check local list, and then the list from the server */

        if (rilQueued[url]) {
            return (rilQueued[url].state == 1) ? 'read' : 'unread';
        }

        if (rilListByURL[url]) {
            return (rilListByURL[url].state == 1) ? 'read' : 'unread';
        }
        return null;
    }

    /* If the user made any changes, we want to update them within 10 seconds,
     * unless he made another change, in which case, we'll wait another 10
     * seconds */
    var serverWriteTimeout = null;
    var serverWriteDelayTime = 1000;
    function resetServerWriteTimeout(dontRestart) {
        if (serverWriteTimeout) {
            clearTimeout(serverWriteTimeout);
            serverWriteTimeout = null;
        }
        if (!(dontRestart)) {
            serverWriteTimeout = setTimeout(
                    function() { updateListOnServer(); }, serverWriteDelayTime);
        }
    }

    function addUnread(url, title) {
        if (rilQueued[url]) {
            rilQueued[url].state = 0;
            rilQueued[url].title = title;
        }
        else {
            rilQueued[url] = {state: 0, title: title};
        }

        resetServerWriteTimeout();
    }

    function addRead(url) {
        if (rilQueued[url]) {
            rilQueued[url].state = 1;
        }
        else {
            rilQueued[url] = {state: 1};
        }

        resetServerWriteTimeout();
    }

    function updateListOnServer() {
        console.log('updateListOnServer()...');

        /* We need to split the items queued up into a set of:
         * - new items
         * - items that have been read
         * - items that have an updated title
         */

        var newItems = {}, newNextID = 0;
        var readItems = {}, readNextID = 0;
        var updateTitleItems = {}, updateTitleNextID = 0;

        // make copy of the queued list, and clear the global one
        var queued = rilQueued;
        rilQueued = {};

        // decide which type of item each one is
        for (var url in queued) {
            // does it already exist on the server?
            if (rilListByURL[url]) {
                // Was it unread? (i.e. Is it to be marked as read?)
                if (rilListByURL[url].state == 0) {
                    readItems[readNextID] = {url: url};
                    ++readNextID;
                }
                else {
                    // Perhaps it's an existing URL that the user wants
                    // to add again?
                    if ((rilListByURL[url].state == 1) 
                            && (queued[url].state == 0)) 
                    {
                        newItems[newNextID] = 
                            { url: url, title: queued[url].title }
                        ++newNextID;
                    }
                    else if (queued[url].title) {
                        // Just update the title
                        updateTitleItems[updateTitleNextID] = {
                            url: url,
                            title: queued[url].title
                        };
                        ++updateTitleNextID;
                    }
                }
            }
            else {
                // It's not on the server, so it's new
                newItems[newNextID] = 
                    { url: url, title: queued[url].title }
                ++newNextID;
            }
        }

        // build the request and send it
        var reqParams = { };
        if (newNextID > 0) {
            reqParams['new'] = JSON.stringify(newItems);
        }
        if (readNextID > 0) {
            reqParams['read'] = JSON.stringify(readItems);
        }
        if (updateTitleNextID > 0) {
            reqParams['update_title'] = JSON.stringify(updateTitleItems);
        };

        console.log("sending update: params=" + JSON.stringify(reqParams));

        startAsyncCommand('send', reqParams, function() {
                    refreshListFromServer();
                });
    }

    return {
        // public methods
        addUnread: addUnread,
        addRead: addRead,
        getStatusOfURL: getStatusOfURL,
        refreshListFromServer: refreshListFromServer,
        reloadOptions: reloadOptions,

        // properties
        authenticated: authenticated,
        rilURLBuilder: rilURLBuilder
    };

})();
