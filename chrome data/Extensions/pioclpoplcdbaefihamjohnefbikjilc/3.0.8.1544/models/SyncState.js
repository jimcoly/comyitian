function SyncState(a){this.__defineGetter__("currentTime",this.getCurrentTime);this.__defineSetter__("currentTime",this.setCurrentTime);this.__defineGetter__("fullSyncBefore",this.getFullSyncBefore);this.__defineSetter__("fullSyncBefore",this.setFullSyncBefore);this.__defineGetter__("updateCount",this.getUpdateCount);this.__defineSetter__("updateCount",this.setUpdateCount);this.__defineGetter__("uploaded",this.getUploaded);this.__defineSetter__("uploaded",this.setUploaded);this.initialize(a);}SyncState.javaClass="com.evernote.edam.notestore.SyncState";SyncState.inherit(AppModel);SyncState.prototype._currentTime=null;SyncState.prototype._fullSyncBefore=null;SyncState.prototype._updateCount=null;SyncState.prototype._uploaded=null;SyncState.prototype.getUpdateCount=function(){return this._updateCount;};SyncState.prototype.setUpdateCount=function(a){if(a==null){this._updateCount=null;}else{this._updateCount=parseInt(a);}};SyncState.prototype.getFullSyncBefore=function(){return this._fullSyncBefore;};SyncState.prototype.setFullSyncBefore=function(a){if(a==null){this._fullSyncBefore=null;}else{this._fullSyncBefore=parseInt(a);}};SyncState.prototype.getCurrentTime=function(){return this._currentTime;};SyncState.prototype.setCurrentTime=function(a){if(a==null){this._currentTime=null;}else{this._currentTime=parseInt(a);}};SyncState.prototype.getUploaded=function(){return this._uploaded;};SyncState.prototype.setUploaded=function(a){if(a==null){this._uploaded=null;}else{this._uploaded=parseInt(a);}};SyncState.prototype.isFullSyncRequired=function(){return(this.currentTime!=null&&this.fullSyncBefore!=null&&this.currentTime<this.fullSyncBefore);};SyncState.prototype.toString=function(){return"SyncState "+this.updateCount;};