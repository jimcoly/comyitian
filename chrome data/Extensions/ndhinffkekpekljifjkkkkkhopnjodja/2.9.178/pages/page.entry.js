(function(){var a=devhd.pkg("pages");var d=a.createClass("EntryPage",a.BasePage);d.initialize=function(){};d.service=function(f,e){this.pageInfo=f;this.width=e.width;this.entryId=f.key;this.selectedEntryId=f.key;this.initBase(e);this.startRenderHTML()};d.destroy=function(){if(this.entryControl!=null){this.entryControl.destroy();this.entryControl=null
}this.destroyBase()};d.allowsSideArea=function(){return true};d.allowsPageHeader=function(){return false};d.startRenderHTML=function(){this.feedly.clearPageTitle();var e=this;this.reader.askStreamContent([e.entryId],function(){if(e.isDestroyed()==true){return}c.call(e)},function(){if(e.isDestroyed()==true){return}b.call(e)})};function b(){this.pageElem.innerHTML="Sorry, feedly was not able to get the content of article number #"+this.entryId;
this.pageLoadedAt=new Date().getTime();return}function c(){this.reader.markEntryAsRead(this.entryId);this.entry=this.reader.lookupEntry(this.entryId);var g=this.entry.getFeedId();var f=this.entry.getSourceTitle();var e=devhd.utils.ContextStackUtils.find(this.feedly.getContextStack(),"category");if(e!=null&&this.entry.via==true){g=this.entry.getViaFeedId();
f=this.entry.getViaFeedTitle()}this.feedly.pushContext({uri:this.pageInfo.uri,title:this.entry.getTitle(),pageNumber:-1,feedId:g,feedTitle:f,entryId:this.entry.getId(),level:3,searchTerm:this.pageInfo.term});this.feedly.clearNbrPages();var h=this;this.home.askIncludeControl("entry",function(){h.entryControl=new devhd.control.EntryControl();h.entryControl.setHome(h.home);
h.entryControl.setEntryId(h.entryId);h.entryControl.setWidth(h.width);h.entryControl.setSelectedEntryId(h.entryId);h.entryControl.setPreferences(h.preferences);h.entryControl.setReader(h.reader);h.entryControl.setAnnotator(h.annotator);h.entryControl.setSigns(h.signs);h.entryControl.setFriendfeed(h.friendfeed);h.entryControl.setDigg(h.digg);h.entryControl.setTumblr(h.tumblr);
h.entryControl.setFeedly(h.feedly);h.entryControl.setReco(h.reco);h.entryControl.setSearchTerm(h.pageInfo.term);h.entryControl.setPopup(h.popup);h.entryControl.setProfile(h.profile);h.entryControl.setAnalytics(h.analytics);h.entryControl.setCalais(h.calais);h.entryControl.setAmazon(h.amazon);h.entryControl.setTwitter(h.twitter);h.entryControl.setTinyURL(h.tinyURL);
h.entryControl.setIo(h.io);h.entryControl.setBack(h.back);h.entryControl.setShowSourceTitle(true);h.entryControl.setPart(h.pageElem);h.entryControl.display();h.pageLoadedAt=new Date().getTime()})}d.onSubscriptionAdded=function(e){if(e==this.entry.getFeedId()){this.feedly.reloadPage({forceRecreate:true})}};d.onSubscriptionAddedToCategory=function(f,e,g){if(f!=this.entry.getFeedId()){return
}if(g==true){return}this.feedly.selectTab(e);this.feedly.pushContext({uri:"category/"+e,pageNumber:0,title:this.reader.formatTitle(e),level:1,category:e,searchTerm:this.pageInfo.term});this.feedly.selectTab(e);this.feedly.reloadPage()};d.onSubscriptionRemovedFromCategory=function(f,e){if(f!=this.entry.getFeedId()){return}};d.onSubscriptionRemoved=function(e){if(this.entry.getFeedId()!=e){return
}this.feedly.loadDashboardPage()};d.onPreviousEntry=function(){this.feedly.loadPreviousPage()};d.onNextEntry=function(){this.feedly.loadNextPage()};d.selectEntry=function(e){};d.loadEntry=function(g,e,f){if(this.entry.getId()==g){return true}else{return this.feedly.loadEntry(g,f)}}})();