function Options(a,b){this.__defineGetter__("context",this.getContext);this.__defineSetter__("context",this.setContext);this.__defineGetter__("developerMode",this.isDeveloperMode);this.__defineSetter__("developerMode",this.setDeveloperMode);this.__defineGetter__("debugLevel",this.getDebugLevel);this.__defineSetter__("debugLevel",this.setDebugLevel);this.__defineGetter__("insecureProto",this.getInsecureProto);this.__defineSetter__("insecureProto",this.setInsecureProto);this.__defineGetter__("secureProto",this.getSecureProto);this.__defineSetter__("secureProto",this.setSecureProto);this.__defineGetter__("serviceDomain",this.getServiceDomain);this.__defineSetter__("serviceDomain",this.setServiceDomain);this.__defineGetter__("noteSortOrder",this.getNoteSortOrder);this.__defineSetter__("noteSortOrder",this.setNoteSortOrder);this.__defineGetter__("fullPage",this.getFullPage);this.__defineSetter__("fullPage",this.setFullPage);this.__defineGetter__("noteList",this.getNoteList);this.__defineSetter__("noteList",this.setNoteList);this.__defineGetter__("clipNotebook",this.getClipNotebook);this.__defineSetter__("clipNotebook",this.setClipNotebook);this.__defineGetter__("clipNotebookGuid",this.getClipNotebookGuid);this.__defineSetter__("clipNotebookGuid",this.setClipNotebookGuid);this.__defineGetter__("autoSaveClipNote",this.getAutoSaveClipNote);this.__defineSetter__("autoSaveClipNote",this.setAutoSaveClipNote);this.__defineGetter__("clipStyle",this.getClipStyle);this.__defineSetter__("clipStyle",this.setClipStyle);this.initialize(a,b);}Options.FULL_PAGE_OPTIONS={NEVER:0,ALWAYS:1,REMEMBER:2};Options.NOTE_LIST_OPTIONS={NEVER:0,ALWAYS:1,REMEMBER:2};Options.CLIP_NOTEBOOK_OPTIONS={DEFAULT:0,SELECT:1,REMEMBER:2};Options.AUTO_SAVE_CLIPNOTE_OPTIONS={NEVER:0,ALWAYS:1};Options.CLIP_STYLE_OPTIONS={NONE:0,TEXT:1,FULL:2};Options.DEFAULTS={debugLevel:(typeof LOG!="undefined"&&LOG instanceof Logger)?LOG.level:Logger.LOG_LEVEL_OFF,insecureProto:Evernote.insecureProto,secureProto:Evernote.secureProto,serviceDomain:Evernote.serviceDomain,noteSortOrder:new NoteSortOrder(),fullPage:Options.FULL_PAGE_OPTIONS.REMEMBER,noteList:Options.NOTE_LIST_OPTIONS.REMEMBER,clipNotebook:Options.CLIP_NOTEBOOK_OPTIONS.REMEMBER,clipNotebookGuid:null,autoSaveClipNote:Options.AUTO_SAVE_CLIPNOTE_OPTIONS.ALWAYS,clipStyle:Options.CLIP_STYLE_OPTIONS.FULL};Options.isValidFullPageOptionValue=function(a){return Options.isValidOptionValue(a,Options.FULL_PAGE_OPTIONS);};Options.isValidNoteListOptionValue=function(a){return Options.isValidOptionValue(a,Options.NOTE_LIST_OPTIONS);};Options.isValidClipNotebookOptionValue=function(a){return Options.isValidOptionValue(a,Options.CLIP_NOTEBOOK_OPTIONS);};Options.isValidAutoSaveClipNoteOptionValue=function(a){return Options.isValidOptionValue(a,Options.AUTO_SAVE_CLIPNOTE_OPTIONS);};Options.isValidClipStyleOptionValue=function(a){return Options.isValidOptionValue(a,Options.CLIP_STYLE_OPTIONS);};Options.isValidOptionValue=function(b,c){if(typeof c=="object"&&c!=null){for(var a in c){if(b==c[a]){return true;}}}return false;};Options.prototype._context=null;Options.prototype._developerMode=false;Options.prototype._debugLevel=Options.DEFAULTS.debugLevel;Options.prototype._insecureProto=Options.DEFAULTS.insecureProto;Options.prototype._secureProto=Options.DEFAULTS.secureProto;Options.prototype._serviceDomain=Options.DEFAULTS.serviceDomain;Options.prototype._noteSortOrder=Options.DEFAULTS.noteSortOrder;Options.prototype._fullPage=Options.DEFAULTS.fullPage;Options.prototype._noteList=Options.DEFAULTS.noteList;Options.prototype._clipNotebook=Options.DEFAULTS.clipNotebook;Options.prototype._clipNotebookGuid=Options.DEFAULTS.clipNotebookGuid;Options.prototype._autoSaveClipNote=Options.DEFAULTS.autoSaveClipNote;Options.prototype._clipStyle=Options.DEFAULTS.clipStyle;Options.prototype.initialize=function(c,a){if(c instanceof EvernoteContext){this.context=c;}var d=(typeof a=="object"&&a!=null)?a:Options.DEFAULTS;for(var b in d){if(typeof this[b]!="undefined"){this[b]=d[b];}}};Options.prototype.setContext=function(a){if(a instanceof EvernoteContext){this._context=a;}else{if(a==null){this._context=null;}}};Options.prototype.getContext=function(){return this._context;};Options.prototype.setDeveloperMode=function(a){this._developerMode=(a)?true:false;};Options.prototype.isDeveloperMode=function(){return this._developerMode;};Options.prototype.setDebugLevel=function(a){if(typeof a=="number"){this._debugLevel=a;}else{if(typeof a=="string"){this._debugLevel=parseInt(a);}else{if(a==null){this._debugLevel=0;}}}};Options.prototype.getDebugLevel=function(){return this._debugLevel;};Options.prototype.setInsecureProto=function(a){if(typeof a=="string"){this._insecureProto=a;}else{if(a==null){this._insecureProto=null;}}};Options.prototype.getInsecureProto=function(){return this._insecureProto;};Options.prototype.setSecureProto=function(a){if(typeof a=="string"){this._secureProto=a;}else{if(a==null){this._secureProto=null;}}};Options.prototype.getSecureProto=function(){return this._secureProto;};Options.prototype.setServiceDomain=function(a){if(typeof a=="string"){this._serviceDomain=a;}else{if(a==null){this._serviceDomain=null;}}};Options.prototype.getServiceDomain=function(){return this._serviceDomain;};Options.prototype.setNoteSortOrder=function(a){if(a instanceof NoteSortOrder){this._noteSortOrder=a;}else{if(typeof a=="object"&&a!=null){this._noteSortOrder=new NoteSortOrder(a);}else{if(a==null){this._noteSortOrder=null;}}}};Options.prototype.getNoteSortOrder=function(){return this._noteSortOrder;};Options.prototype.setFullPage=function(a){if(Options.isValidFullPageOptionValue(a)){this._fullPage=a;}else{if(a==null){this._fullPage=Options.DEFAULTS.fullPage;}}};Options.prototype.getFullPage=function(){return this._fullPage;};Options.prototype.setNoteList=function(a){if(Options.isValidNoteListOptionValue(a)){this._noteList=a;}else{if(a==null){this._noteList=Options.DEFAULTS.noteList;}}};Options.prototype.getNoteList=function(){return this._noteList;};Options.prototype.setClipNotebook=function(a){if(Options.isValidClipNotebookOptionValue(a)){this._clipNotebook=a;}else{if(a==null){this._clipNotebook=Options.DEFAULTS.clipNotebook;}}};Options.prototype.getClipNotebook=function(){return this._clipNotebook;};Options.prototype.setClipNotebookGuid=function(a){if(typeof a=="string"&&a.length>0){this._clipNotebookGuid=a;}else{if(a instanceof Notebook){this._clipNotebookGuid=a.guid;}else{if(a==null){this._clipNotebookGuid=null;}}}};Options.prototype.getClipNotebookGuid=function(){return this._clipNotebookGuid;};Options.prototype.setAutoSaveClipNote=function(a){if(Options.isValidAutoSaveClipNoteOptionValue(a)){this._autoSaveClipNote=a;}else{if(a==null){this._autoSaveClipNote=Options.DEFAULTS.autoSaveClipNote;}}};Options.prototype.getAutoSaveClipNote=function(){return this._autoSaveClipNote;};Options.prototype.setClipStyle=function(a){if(Options.isValidClipStyleOptionValue(a)){this._clipStyle=a;}else{if(a==null){this._clipStyle=Options.DEFAULTS.clipStyle;}}};Options.prototype.getClipStyle=function(){return this._clipStyle;};Options.prototype.apply=function(){if(typeof LOG!="undefined"){LOG.debugLevel=this.debugLevel;}if(this.context){this.context.setOptions(this);this.context.secureProto=this.secureProto;this.context.insecureProto=this.insecureProto;this.context.serviceDomain=this.serviceDomain;}};Options.prototype.reset=function(){this.initialize(this.context,null);};Options.prototype.toJSON=function(){return{debugLevel:this.debugLevel,developerMode:this.developerMode,insecureProto:this.insecureProto,secureProto:this.secureProto,serviceDomain:this.serviceDomain,noteSortOrder:this.noteSortOrder,fullPage:this.fullPage,noteList:this.noteList,clipNotebook:this.clipNotebook,clipNotebookGuid:this.clipNotebookGuid,autoSaveClipNote:this.autoSaveClipNote,clipStyle:this.clipStyle};};