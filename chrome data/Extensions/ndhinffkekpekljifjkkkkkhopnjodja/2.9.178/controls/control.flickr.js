(function(){var c=devhd.pkg("control");var a=c.BaseControl.prototype;var b=c.createClass("FlickrControl",c.BaseControl);b.setSherlock=function(d){this.sherlock=d};b.setMax=function(d){this.max=d};b.setQuery=function(d){this.query=d};b.destroy=function(){this.sherlock=null;this.query=null;a.destroy.call(this)};b.display=function(){var d=this;this.sherlock.askSearchFlickr(this.query,function(e){if(d.isDestroyed()==null){return
}d.part.innerHTML=templates.modules.layoutFlickrImages(e.slice(0,d.max||4),60,d.home)})}})();