(function(){var b=devhd.pkg("control");var a=b.BaseControl.prototype;var c=b.createClass("DeliciousControl",b.BaseControl);c.setDelicious=function(d){this.delicious=d};c.setMax=function(d){this.max=d};c.setQuery=function(d){this.query=d};c.destroy=function(){this.delicious=null;this.query=null;a.destroy.call(this)};c.display=function(){var d=this;this.delicious.askSearch({query:this.query},function(e){if(d.isDestroyed()==null){return
}d.part.innerHTML=templates.page.base.deliciousLinks2(e.slice(0,d.max||5),d.home)})}})();