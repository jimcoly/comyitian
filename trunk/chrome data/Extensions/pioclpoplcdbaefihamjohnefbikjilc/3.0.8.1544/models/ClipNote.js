function ClipNote(a){this.__defineGetter__("length",this.getLength);this.initialize(a);}ClipNote.javaClass="com.evernote.web.ClipNote";ClipNote.inherit(AppModel);ClipNote.prototype._title=null;ClipNote.prototype._content=null;ClipNote.prototype._comment=null;ClipNote.prototype._notebookGuid=null;ClipNote.prototype._tagNames=null;ClipNote.prototype._url=null;ClipNote.prototype._saveUrl=true;ClipNote.prototype._fullPage=false;ClipNote.cleanTitle=function(a){if(typeof a=="string"){return a.replace(/[\n\r\t]+/g," ").replace(/^\s+/,"").replace(/\s+$/,"");}return a;};ClipNote.prototype.initialize=function(a){this.__defineGetter__("title",this.getTitle);this.__defineSetter__("title",this.setTitle);this.__defineGetter__("url",this.getUrl);this.__defineSetter__("url",this.setUrl);this.__defineGetter__("fullPage",this.isFullPage);this.__defineSetter__("fullPage",this.setFullPage);this.__defineGetter__("content",this.getContent);this.__defineSetter__("content",this.setContent);this.__defineGetter__("comment",this.getComment);this.__defineSetter__("comment",this.setComment);this.__defineGetter__("notebookGuid",this.getNotebookGuid);this.__defineSetter__("notebookGuid",this.setNotebookGuid);this.__defineGetter__("tagNames",this.getTagNames);this.__defineSetter__("tagNames",this.setTagNames);this.__defineGetter__("saveUrl",this.isSaveUrl);this.__defineSetter__("saveUrl",this.setSaveUrl);this.parent.initialize.apply(this,[a]);};ClipNote.prototype.setTitle=function(a){if(typeof a=="string"){this._title=this.constructor.cleanTitle(a);}else{if(a==null){this._title=null;}}};ClipNote.prototype.getTitle=function(){return this._title;};ClipNote.prototype.setUrl=function(a){if(typeof a=="string"){this._url=(typeof"".trim=="function")?a.trim():a;}else{if(a==null){this._url=null;}}};ClipNote.prototype.getUrl=function(){return this._url;};ClipNote.prototype.setFullPage=function(a){this._fullPage=(typeof a!="undefined"&&a)?true:false;};ClipNote.prototype.isFullPage=function(){return this._fullPage;};ClipNote.prototype.setContent=function(a){if(typeof a=="undefined"||a==null){this._content=null;}else{this._content=""+a;}};ClipNote.prototype.getContent=function(){return this._content;};ClipNote.prototype.setComment=function(a){if(typeof a=="undefined"||a==null){this._comment=null;}else{this._comment=""+a;}};ClipNote.prototype.getComment=function(){return this._comment;};ClipNote.prototype.setNotebookGuid=function(a){if(typeof a=="undefined"||a==null){this._notebookGuid=null;}else{if(typeof a=="string"&&a.length>0){this._notebookGuid=a;}}};ClipNote.prototype.getNotebookGuid=function(){return this._notebookGuid;};ClipNote.prototype.setTagNames=function(a){if(typeof a=="string"){this._tagNames=a;}else{if(typeof a=="undefined"||a==null){this._tagNames=null;}}};ClipNote.prototype.getTagNames=function(){return this._tagNames;};ClipNote.prototype.setSaveUrl=function(a){this._saveUrl=(typeof a!="undefined"&&a)?true:false;};ClipNote.prototype.isSaveUrl=function(){return this._saveUrl;};ClipNote.prototype.getLength=function(){var c=0;var b=this.getStorableProps();for(var a=0;a<b.length;a++){if(this[b[a]]){c+=(""+this[b[a]]).length+b[a].length+1;}}c+=(b.length-1);return c;};ClipNote.prototype.getStorableProps=function(){return["title","url","saveUrl","fullPage","notebookGuid","tagNames","content","comment"];};ClipNote.prototype.toString=function(){return"ClipNote ["+this.url+"] "+this.title+" (fullPage: "+this.fullPage+"; saveUrl: "+this.saveUrl+"; notebookGuid: "+this.notebookGuid+"; tagNames: "+this.tagNames+"; content length: "+((typeof this.content=="string")?this.content.length:0)+"; comment length: "+((typeof this.comment=="string")?this.comment.length:0)+")";};