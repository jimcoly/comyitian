function ChromeExtensionLoggerImpl(){}ChromeExtensionLoggerImpl.prototype=new LoggerImpl();ChromeExtensionLoggerImpl.prototype.DIR_PREFIX="[DIR] ";ChromeExtensionLoggerImpl.prototype.DEBUG_PREFIX="[DEBUG] ";ChromeExtensionLoggerImpl.prototype.TRACE_PREFIX="[TRACE] ";ChromeExtensionLoggerImpl.prototype.INFO_PREFIX="[INFO] ";ChromeExtensionLoggerImpl.prototype.WARN_PREFIX="[WARN] ";ChromeExtensionLoggerImpl.prototype.ERROR_PREFIX="[ERROR] ";ChromeExtensionLoggerImpl.prototype.EXCEPTION_PREFIX="[EXCEPTION] ";ChromeExtensionLoggerImpl.prototype.enabled=(navigator.userAgent.match(/(Safari)|(WebKit)/i))?true:false;ChromeExtensionLoggerImpl.prototype.alertsEnabled=false;ChromeExtensionLoggerImpl.prototype.alertLevel=Logger.LOG_LEVEL_OFF;ChromeExtensionLoggerImpl.prototype.dir=function(a){this._log(this.DIR_PREFIX+a);};ChromeExtensionLoggerImpl.prototype.trace=function(){};ChromeExtensionLoggerImpl.prototype.debug=function(a){this._log(this.DEBUG_PREFIX+a);};ChromeExtensionLoggerImpl.prototype.info=function(a){this._log(this.INFO_PREFIX+a);};ChromeExtensionLoggerImpl.prototype.warn=function(a){this._log(this.WARN_PREFIX+a);};ChromeExtensionLoggerImpl.prototype.error=function(a){this._log(this.ERROR_PREFIX+a);};ChromeExtensionLoggerImpl.prototype.exception=function(a){this._log(this.EXCEPTION_PREFIX+a);};ChromeExtensionLoggerImpl.prototype.alert=function(a){alert(a);};ChromeExtensionLoggerImpl.prototype._log=function(a){console.log(a);if(this.alertsEnabled){this.alert(a);}};ChromeExtensionLoggerImpl.prototype.enableAlerts=function(a){this.alertLevel=a;this.alertsEnabled=true;};