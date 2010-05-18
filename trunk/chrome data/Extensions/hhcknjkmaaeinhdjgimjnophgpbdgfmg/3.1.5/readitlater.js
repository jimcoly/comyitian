/**
 * ReadItLater integration
 * @param {Object} prefs
 * @param {Object} langs
 */
GRP.readitlater = function(prefs, langs, ID, SL, lang){
    var api = {
        key:'e6cg2d3cp4431Y55aKT0V06R29AWr21b',
		add: 'https://readitlaterlist.com/v2/add',
        auth: 'https://readitlaterlist.com/v2/auth',
		successCode:200,
		errors: {
	        //400: Invalid request, please make sure you follow the documentation for proper syntax.
	        400: 'badrequest',
	        //401: Username and/or password is incorrect.
	        401: 'wronglogin',
	        //403: Rate limit exceeded, please wait a little bit before resubmitting
	        403: 'rateexceeded',
	        //500: error
	        500: 'error',
	        //503: Read It Later's sync server is down for scheduled maintenance
	        503: 'maintenance'
	    }
    };
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};