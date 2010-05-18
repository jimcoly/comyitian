(function(){var c=devhd.pkg("control");var a=c.BaseControl.prototype;var d=c.createClass("OpenSocialControl",c.BaseControl);var b=devhd.i18n.L;d.initialize=function(){a.initialize.call(this);this.charsize=140};d.setTinyURL=function(e){this.tinyURL=e};d.setPostfix=function(e){this.postfix=e};d.setEntry=function(e){this.entry=e};d.destroy=function(){this.openSocialNoteElem=null;
this.msgSizeElem=null;this.panelOpenSocialElem=null;this.panelSendingElem=null;this.tinyURL=null;this.entry=null;a.destroy.call(this)};d.display=function(){if(this.home.isGadget()==false||typeof opensocial=="undefined"){this.fire("onControlDoneSending");this.signs.setMessage(b(342));return}var f=this;var e=opensocial.newDataRequest();e.add(e.newFetchPersonRequest(opensocial.IdSpec.PersonId.VIEWER),"req");
e.send(function(i){var h=i.get("req").getData().getDisplayName();var g=i.get("req").getData().getField(opensocial.Person.Field.THUMBNAIL_URL);if(h=="You"||g==null){f.fire("onControlDoneSending");f.signs.setMessage(b(341));return}f.prepare(h,g)})};d.prepare=function(i,e){var h=this.getModel("message");var f=this.getModel("url");var j=this.getModel("title");
if(j==null&&this.entry!=null){j=this.entry.getCleanTitle()}if(f==null&&this.entry!=null){f=this.entry.getAlternateLink()}if(h!=null){this.doDisplay(h,i,e)}else{if(f==null){this.doDisplay(j,i,e)}else{this.part.innerHTML=templates.control.openSocial.minimizing();var g=this;this.tinyURL.askTinyURL(f,function(m,k,l){g.doDisplay(j+" "+m,i,e)},function(l,k){$debug("[tiny] failed to shorten URL because "+l);
g.doDisplay(j+" "+f,i,e)})}}};d.doDisplay=function(f,g,e){if(this.isDestroyed()==true){return}this.part.innerHTML=templates.control.openSocial.form(f,g,e);this.openSocialNoteElem=this.element("openSocialNote");this.msgSizeElem=this.element("msgSize");this.panelOpenSocialElem=this.element("panelOpenSocial");this.panelSendingElem=this.element("panelSending");
this.bind("openSocialCancelAction","click",d.cancelIt);this.bind("openSocialSendAction","click",d.sendIt);this.bind(this.part,"keydown",d.dispatchKeys);this.bind(this.part,"keyup",d.noteSize);this.noteSize();this.reset()};d.dispatchKeys=function(f){if(f.keyCode==27){this.cancelIt();devhd.events.cancelEvent(f);return}if((f.keyCode==77&&f.ctrlKey)||(f.keyCode==13&&(f.metaKey||f.ctrlKey))){this.sendIt();
devhd.events.cancelEvent(f);return}};d.sendIt=function(){if(this.getNote().length>this.charsize){this.setMessage(b(b(337)),1000);return}else{if(this.getNote().length==0){this.setMessage(b(b(338)),1000);return}}this.showSending();var e=this;var f={};f[opensocial.Activity.Field.TITLE]=this.getNote().replace(/(http:[^\s]*)/gi,"<a href='$1'>$1</a>");opensocial.requestCreateActivity(opensocial.newActivity(f),opensocial.CreateActivityPriority.HIGH,function(){e.fire("onControlDoneSending",b(b(343)))
})};d.cancelIt=function(){this.fire("onControlDoneSending")};d.getNote=function(){return devhd.str.trim(this.openSocialNoteElem.value)};d.reset=function(){if(this.openSocialNoteElem==null){return}this.showPanel();this.openSocialNoteElem.focus()};d.showPanel=function(){this.panelSendingElem.style.display="none";this.panelOpenSocialElem.style.display="block"
};d.showSending=function(){this.panelSendingElem.style.display="block";this.panelOpenSocialElem.style.display="none"};d.noteSize=function(){var e=(this.charsize-this.openSocialNoteElem.value.length);this.msgSizeElem.innerHTML=""+e;if(e<0){this.msgSizeElem.style.color="red"}else{if(e<10){this.msgSizeElem.style.color="orange"}else{this.msgSizeElem.style.color="#1a3f7a"
}}}})();