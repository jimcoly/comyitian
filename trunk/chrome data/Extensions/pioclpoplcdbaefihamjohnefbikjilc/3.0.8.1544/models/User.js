function User(a){this.__defineGetter__("id",this.getId);this.__defineSetter__("id",this.setId);this.__defineGetter__("created",this.getCreated);this.__defineSetter__("created",this.setCreated);this.__defineGetter__("updated",this.getUpdated);this.__defineSetter__("updated",this.setUpdated);this.__defineGetter__("deleted",this.getDeleted);this.__defineSetter__("deleted",this.setDeleted);this.__defineGetter__("active",this.isActive);this.__defineSetter__("active",this.setActive);this.__defineGetter__("attributes",this.getAttributes);this.__defineSetter__("attributes",this.setAttributes);this.__defineGetter__("accounting",this.getAccounting);this.__defineSetter__("accounting",this.setAccounting);this.initialize(a);}User.javaClass="com.evernote.edam.type.User";User.inherit(AppModel);User.prototype._id=null;User.prototype.username=null;User.prototype.email=null;User.prototype.name=null;User.prototype.timezone=null;User.prototype.privilege=null;User.prototype._created=null;User.prototype._updated=null;User.prototype._deleted=null;User.prototype._active=false;User.prototype.shardId=null;User.prototype._attributes=null;User.prototype._accounting=null;User.prototype.setId=function(a){if(a==null){this._id==null;}else{if(typeof a=="number"){this._id=parseInt(a);}}};User.prototype.getId=function(){return this._id;};User.prototype.setActive=function(a){this._active=(a)?true:false;};User.prototype.isActive=function(){return this._active;};User.prototype.setCreated=function(a){if(a==null){this._created=null;}else{if(typeof a=="number"){this._created=parseInt(a);}}};User.prototype.getCreated=function(){return this._created;};User.prototype.setUpdated=function(a){if(a==null){this._updated=null;}else{if(typeof a=="number"){this._updated=parseInt(a);}}};User.prototype.getUpdated=function(){return this._updated;};User.prototype.setDeleted=function(a){if(a==null){this._deleted=null;}else{if(typeof a=="number"){this._deleted=parseInt(a);}}};User.prototype.getDeleted=function(){return this._deleted;};User.prototype.setAccounting=function(a){};User.prototype.getAccounting=function(){return this._accounting;};User.prototype.setAttributes=function(a){};User.prototype.getAttributes=function(){return this._attributes;};