(function(){var a=devhd.pkg("pages");var c=devhd.i18n.L;var b=devhd.log.get("page.my");a.MyPage=function(){};var e=a.MyPage.prototype=new a.BasePage();e.service=function(g,f){this.pageInfo=g;this.width=f.width;this.categoryLabel="#"+g.type;this.feedly.selectTab(this.categoryLabel);this.initBase(f);this.startRenderHTML()};e.destroy=function(g,f){if(this.topArea!=null){this.topArea.destroy();
this.topArea=null}this.entryIndex=null;this.allIds=null;this.entryIds=null;this.summary=null;this.recs=null;this.c2e=null;this.destroyBase()};e.startRenderHTML=function(){try{this._cancelAllVisualFinders();this.entryIndex={};this.endOfList=null;this.state="loading";this.selectedEntryId=null;var f=this.hideReadArticlesFilter()?"read":null;this.feedly.pushContext({uri:this.pageInfo.uri,title:"digest",pageNumber:this.pageInfo.pageNumber,level:1,queryInfo:{flsId:this.categoryLabel,excludeLabel:f},category:this.categoryLabel});
this.trackTime("pushed context");this.feedly.clearNbrPages();this.feedly.setPageTitle(templates.page.my.title());this.trackTime("updated chrome");var j=this.reader.listSections({excludeEmpty:true});if(j.length==0){this.pageElem.innerHTML=templates.page.base.empty(this.reader.listSubscriptions().length,this.reader.listRankedCategories({}),this.width,this.home);
return}this.pageElem.innerHTML=templates.page.my.layout(j,this.width,this.home);this.element("aboutArea").innerHTML=templates.page.my.layoutAboutArea();this.element("aboutArea").style.display="block";this.trackTime("initial layout");this.entryIds=[];this.c2e={};var g=this;this.reco.askStreamDigest({featured:3,sections:j},function(o){if(g.isDestroyed()==true){return
}for(var n=0;n<j.length;n++){var k=g.c2e[j[n].label];if(k==null){continue}for(var m=0;m<k.length;m++){var l=k[m];g.entryIndex[l.getId()]=l;g.entryIds.push(l.getId())}}g.allIds=[];for(var n=0;n<o.length;n++){for(var m=0;m<o[n].top40.length;m++){g.allIds.push(o[n].top40[m].getId())}}},function(k,l){},function(l){if(g.isDestroyed()==true){return}for(var k=0;
k<l.length;k++){d.call(g,l[k])}})}catch(h){var i=devhd.utils.ExceptionUtils.formatError("layout top area",h);this.pageElem.innerHTML=i}};function d(g){switch(g.label){case"#featured":var q=this.element("topArea");if(q==null){this.pageElem.innerHTML="failed you layout top area";return}var n=this;this.home.askIncludeControl("recommendationArea",function(){n.topArea=new devhd.control.RecommendationAreaControl();
n.topArea.setHome(n.home);n.topArea.setReader(n.reader);n.topArea.setFeatured(g.top40);n.topArea.setPage(n);n.topArea.setDisplayMode(n.feedly.getDisplayMode());n.topArea.setPart(q);n.topArea.display()});break;case"#shows":if(this.element("main_section_#shows_entries")==null||g.top40==null||g.top40.length==0){if(this.element("main_shows")!=null){this.element("main_shows").style.display="none"
}return}var o=g.top40;var i=[];for(var k=0;k<o.length&&k<4;k++){i.push({entry:o[k],type:7})}this.element("main_section_#shows_entries").innerHTML=templates.page.base.parts(i,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true},this.home);for(var k=0;k<o.length&&k<4;k++){this.askFindVisual(o[k],"U7")}break;case"#photos":if(this.element("main_section_#photos_entries")==null||g.top40==null||g.top40.length==0){if(this.element("main_photos")!=null){this.element("main_photos").style.display="none"
}return}var o=g.top40;var i=[];for(var k=0;k<o.length&&k<4;k++){i.push({entry:o[k],type:6})}this.element("main_section_#photos_entries").innerHTML=templates.page.base.parts(i,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true},this.home);for(var k=0;k<o.length&&k<4;k++){this.askFindVisual(o[k],"U6")}break;default:var m=this.element("main_section_"+g.label+"_entries");
if(m==null){return}var o=g.top40.sort(function(r,j){return j.lastModifiedTime-r.lastModifiedTime});if(o.length==0){if(g.feedId!=null){this.element("main_section_"+g.feedId+"_holder").style.display="none"}else{this.element("main_section_"+g.label+"_holder").style.display="none"}this.c2e[g.label]=[];return}var p="6";for(var k=0;k<o.length;k++){var h=this.reader.getFeedPreference(o[k].getFeedId(),"entryOverviewSize");
if(h!="6"){p=null;break}}var l=[];if(p=="6"){var i=[];for(var k=0;k<o.length;k++){i.push({entry:o[k],type:6});l.push(o[k])}m.style.marginRight="-34px";m.innerHTML=templates.page.base.parts(i,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true,includeFavIcon:true},this.home);for(var k=0;k<o.length;k++){this.askFindVisual(o[k],"U6")
}}else{var f=Math.ceil(o.length/2);var i=[];for(var k=0;k<o.length&&k<f;k++){i.push({entry:o[k],type:4});l.push(o[k])}m.innerHTML=templates.page.base.parts(i,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true,includeFavIcon:true},this.home);for(var k=0;k<o.length&&k<f;k++){this.askFindVisual(o[k],"U4")}i=[];for(var k=f;
k<o.length;k++){i.push({entry:o[k],type:12});l.push(o[k])}if(i.length>0){this.element("main_section_"+g.label+"_saved").innerHTML=templates.page.base.parts(i,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true,includeFavIcon:true},this.home)}}this.c2e[g.label]=l}}e.markPageAsRead=function(){this.signs.setMessage(c(295),100);
var f=this;this.home.getDocument().defaultView.setTimeout(function(){f.reader.markEntriesAsRead(f.allIds)},15)};e.markAsRead=e.markPageAsRead;e.findNextEntryId=function(l){var k=false;if(this.selectedEntryId==null){k=true}if(this.topArea!=null){var f=this.topArea.findNextEntyId(this.selectedEntryId,l);if(f===true){k=true}else{if(f!=null){return f}}}for(var j=0;
j<this.entryIds.length;j++){var h=this.entryIds[j];if(k==true){var g=this.reader.lookupEntry(h);if(g.buried==true){continue}if(l==true){if(g.isRead()==false){return h}else{continue}}else{return h}}if(h==this.selectedEntryId){k=true}}return null};e.findPreviousEntryId=function(l){var k=false;if(this.selectedEntryId==null){k=true}for(var j=this.entryIds.length-1;
j>=0;j--){var h=this.entryIds[j];if(k==true){var g=this.reader.lookupEntry(h);if(g.buried==true){continue}if(l==true){if(g.isRead()==false){return h}else{continue}}else{return h}}if(h==this.selectedEntryId){k=true}}if(this.topArea!=null){var f=this.topArea.findPreviousEntyId(k==true?null:this.selectedEntryId,l);if(f!==true&&f!==false){return f}}return null
};e.onSubscriptionMarkedAsRead=function(f){var g=this.element("main_section_"+f+"_holder");if(g!=null){this.effects.fade(g,{delay:1,from:1,to:0,onComplete:function(h){devhd.utils.HTMLUtils.remove(h)}},"feedly")}};e.onSubscriptionRemoved=function(f,h){if(h==true){return}var g=this.element("main_section_"+f+"_holder");if(g!=null){this.effects.fade(g,{delay:1,from:1,to:0,onComplete:function(i){devhd.utils.HTMLUtils.remove(i)
}},"feedly")}else{this.feedly.reloadPage()}};e.onPreviousEntry=function(h,f){var g=this.findPreviousEntryId(h);if(g!=null){if(f==true){this.selectEntry(g,"toview")}else{this.inlineEntry(g,true)}}else{this.signs.setMessage(c(76))}};e.onNextEntry=function(h,f){var g=this.findNextEntryId(h);if(g!=null){if(f==true){this.selectEntry(g,"toview")}else{this.inlineEntry(g,true)
}}else{this.signs.setMessage(c(75))}}})();