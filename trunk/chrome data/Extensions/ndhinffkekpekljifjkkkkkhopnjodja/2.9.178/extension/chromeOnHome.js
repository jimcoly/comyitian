var FEEDLY_IO_PORT_NAME_ = 'FeedlyIO_';

function IO(xhrOptions) {
  xhrOptions = xhrOptions || {};
  xhrOptions.onComplete = xhrOptions.onComplete || function(){};
  
  var port = chrome.extension.connect({name: FEEDLY_IO_PORT_NAME_});
  port.onMessage.addListener(function(msg) {
    xhrOptions.onComplete(msg.status, msg.data, msg.version);
  });
  port.postMessage(xhrOptions);
}

var includedScripts = {};

function askIncludeScript( partialURI, onComplete )
{
	if( includedScripts[ partialURI ] == true )
		return devhd.fn.callback( onComplete );

	try
	{
		IO({	method: 	"GET",
		  		url:  		chrome.extension.getURL( partialURI ),
		  		onComplete: function( status, data, version ) 
				{
	 				if (status == 200) 
						window.eval.call( window, data );

					includedScripts[ partialURI ] = true;
					
					devhd.fn.callback( onComplete );
				}
			});
	}
	catch( ignore )
	{
		// some files might not exist. no worries
	}
}


function include( partialURI )
{
	if( feedlyScripts[ partialURI ] == true )
		return;
	 
	// Load JS libraries
	var u = "chrome://feedly/content/app/" + partialURI;
	try
	{
		var jsl = Cc["@mozilla.org/moz/jssubscript-loader;1"]
						.getService(Ci.mozIJSSubScriptLoader);  
		
		jsl.loadSubScript( u );
		
		
	}
	catch( e )
	{
		feedlyScripts[ partialURI ] = true;

		$debug( "[loader] failed to load: " + u + " because <" + e.name + ": " + e.message + "> in " + e.fileName + "@" + e.lineNumber );
		throw e;
	}

}



var streets = null;
function loadFeedly() 
{
	devhd.utils.GoogleUtils.askProfile( 
		function( context ) 
		{
			doLoadFeedly( context );
		}, 
		function( errorCode )
		{
			doLoadFeedly( null );
		} 
		);
}

function doLoadFeedly( context )
{
	// load and initialize the streets bus
	streets = devhd.streets.create();
	streets.attachDocument( document );	
	streets.attachContext( context );						
	streets.setEnvironment( devhd.utils.BrowserUtils.resolveEnvironment( document ) );
	streets.load( coreStreets );
	streets.load( feedlyStreets );
	
	streets.start();
	
	streets.service( "feedly" ).loadStartPage();
}

window.unload = function() 
{
	// load and initialize the streets bus
	streets.shutdown();
}

loadFeedly();
