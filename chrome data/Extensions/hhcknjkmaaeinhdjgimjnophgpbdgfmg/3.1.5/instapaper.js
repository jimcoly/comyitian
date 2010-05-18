/**
 * Instapaper integration
 * @version  ?
 * @date 2009-07-30
 *
 * Integrate an instapaper button
 *
 * Original author :
 * ckolderup
 * http://userscripts.org/scripts/show/54713
 *
 * see API docs: http://www.instapaper.com/api
 */
GRP.instapaper = function(prefs, langs, ID, SL, lang){
    var api = {
        add: 'https://www.instapaper.com/api/add',
        auth: 'https://www.instapaper.com/api/authenticate',
		successCode:201,
		errors: {
	        //400: Bad request. Probably missing a required parameter, such as url.
	        400: 'badrequest',
	        //403: Invalid username or password.
	        403: 'wronglogin',
	        //500: The service encountered an error. Please try again later.
	        500: 'error'
	    }
	};
    GRP.api_readit(prefs, langs, ID, SL, lang, api);
};