function Notebook(a){this.__defineGetter__("defaultNotebook",this.isDefaultNotebook);this.__defineSetter__("defaultNotebook",this.setDefaultNotebook);this.__defineGetter__("name",this.getName);this.__defineSetter__("name",this.setName);this.__defineGetter__("publishing",this.getPublishing);this.__defineSetter__("publishing",this.setPublishing);this.initialize(a);}Notebook.javaClass="com.evernote.edam.type.Notebook";Notebook.inherit(AppDataModel);Notebook.prototype._name=null;Notebook.prototype._defaultNotebook=false;Notebook.prototype._publishing=null;Notebook.prototype.setName=function(a){if(typeof a=="string"){this._name=a;}else{if(a==null){this._name=null;}}};Notebook.prototype.getName=function(){return this._name;};Notebook.prototype.setDefaultNotebook=function(a){this._defaultNotebook=(a)?true:false;};Notebook.prototype.isDefaultNotebook=function(){return this._defaultNotebook;};Notebook.prototype.setPublishing=function(a){};Notebook.prototype.getPublishing=function(){return this._publishing;};Notebook.prototype.toString=function(){return"["+this.modelName+":"+this.guid+":"+this.name+"]";};