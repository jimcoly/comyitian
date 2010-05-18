(function(){var b=devhd.pkg("pages");var h=devhd.i18n.L;var i=devhd.log.get("page.search");b.SearchPage=function(){};var e=b.SearchPage.prototype=new b.BasePage();e.service=function(l,k){this.pageInfo=l;this.width=k.width;this.initBase(k);this.topic=l.key;this.topicType=l.parameters.type||null;this.keyword=this.topic.indexOf("#")==0?this.topic.slice(1):this.topic;
this.startRenderHTML()};e.destroy=function(l,k){if(this.topArea!=null){this.topArea.destroy();this.topArea=null}if(this.ticker!=null){this.ticker.destroy();this.ticker=null}this.entryIndex=null;this.entryIds=null;this.destroyBase()};e.startRenderHTML=function(){try{this._cancelAllVisualFinders();this.entryIndex={};this.state="loading";this.selectedEntryId=null;
this.feedly.pushContext({uri:this.pageInfo.uri,title:"Explore "+this.topic+this.topicType!=null?"("+this.topicType+")":"",pageNumber:this.pageInfo.pageNumber,level:1,topic:this.topic,topicType:this.topicType});this.feedly.unselectTabs();this.feedly.clearNbrPages();this.feedly.setPageTitle(templates.page.search.title(this.topic));this.pageElem.innerHTML=templates.page.search.layout(this.topic,this.topicType,this.width,this.home);
var k=this;devhd.utils.FlowUtils.parallel(k,[d,a,f,c,g],{onComplete:function(){}})}catch(l){var m=devhd.utils.ExceptionUtils.formatError("laying out explore page",l);this.pageElem.innerHTML=m}};function d(l){var k=this;this.sherlock.askSearchCrunchBase(this.keyword,function(m){if(k.isDestroyed()==true){return}if(m.length>0){k.element("crunchbaseArea_content").innerHTML=templates.page.search.crunch(m[0]);
k.element("crunchbaseArea").style.display="block"}devhd.fn.callback(l)})}function f(l){var k=this;this.sherlock.askSearchNewsSource(this.keyword,"new_york_times",21,function(m){if(k.isDestroyed()){return}m=m.sort(function(n,o){return o.lastModifiedTime-n.lastModifiedTime});if(m.length>0){k.element("nytArea_content").innerHTML=templates.page.base.newsItems(m,3,{hideSourceTitle:true});
k.element("nytArea").style.display="block"}devhd.fn.callback(l)})}function a(l){var k=this;this.sherlock.askSearchNews(this.keyword,21,function(o){if(k.isDestroyed()){return}var m=[];for(var n=0;n<o.length;n++){if(o[n].sourceTitle.indexOf("New York Times")>-1){continue}m.push(o[n])}if(m.length>0){k.element("newsArea_content").innerHTML=templates.page.base.newsItems(m,5);
k.element("newsArea").style.display="block"}devhd.fn.callback(l)})}function g(l){var k=this;this.sherlock.askSearchBlogs(this.keyword,21,function(p){if(k.isDestroyed()){return}var m={};var n=[];for(var o=0;o<p.length;o++){var q=p[o].sourceTitle;if(m[q]!=null){continue}m[q]=true;n.push(p[o])}if(n.length<5){n=p}n=n.sort(function(r,s){return s.lastModifiedTime-r.lastModifiedTime
});if(n.length>0){k.element("blogsArea_content").innerHTML=templates.page.base.blogItems(n,5);k.element("blogsArea").style.display="block"}devhd.fn.callback(l)})}function c(l){var k=this;this.reco.askRecommendSearchResults(this.keyword,10,70,function(m){if(k.isDestroyed()){return}j.call(k,m);devhd.fn.callback(l)},function(m){j.call(k,[]);devhd.fn.callback(l)
})}function j(n){if(n.length==0){this.element("myArea_msg").innerHTML=templates.page.search.empty(this.keyword,this.width,this.home);return}try{this.entryIds=[];var q=[],k=[];for(var l=0;l<n.length;l++){var m=this.reader.lookupSubscription(n[l].getFeedId());if(m!=null&&m.favorite==true){q.push(n[l])}else{k.push(n[l])}}q=q.sort(function(s,r){return r.lastModifiedTime-s.lastModifiedTime
});if(q.length>0){this.displayU4Recommendations.call(this,this.element("myFavoritesArea_entries"),q);this.element("myFavoritesArea").style.display="block"}k=k.sort(function(s,r){return r.lastModifiedTime-s.lastModifiedTime});if(k.length>0){this.displayU4Recommendations.call(this,this.element("myArea_entries"),k);this.element("myArea").style.display="block"
}else{this.element("myArea").style.display="none"}this.onAllEntriesDisplayed(this.entryIds)}catch(o){var p=devhd.utils.ExceptionUtils.formatError("display search summary",o);this.pageElem.innerHTML=p}}e.onAllEntriesDisplayed=function(l){if(this.selectedEntryId==null&&this.requestedSelectedEntryId==null&&this.navigation=="nextPage"&&this.navigationMode=="keyboard"){var n=l[0];
if(n!=null){this.selectEntry(n,false)}}if(this.selectedEntryId==null&&this.requestedSelectedEntryId==null&&this.navigation=="previousPage"&&this.navigationMode=="keyboard"){var k=l[l.length-1];if(k!=null){this.selectEntry(k,false)}}if(this.requestedSelectedEntryId!=null&&this.selectedEntryId==null){for(var m=0;m<l.length;m++){if(l[m]==this.requestedSelectedEntryId){this.selectEntry(this.requestedSelectedEntryId,false)
}}}};e.onEntriesError=function(m,k){var l=this.element("main_#status");if(l==null){return}l.innerHTML=templates.page.base.errorBox(m+" -- "+k,this.pageInfo,this.home)};e.displayU4Recommendations=function(m,n){var p=4;var o=[];for(var l=0;l<n.length;l++){var k=n[l];o.push({entry:k,type:p});this.entryIndex[k.getId()]=k;this.entryIds.push(k.getId())}m.innerHTML=templates.page.base.parts(o,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true,includeFavIcon:true},this.home);
for(var l=0;l<n.length;l++){this.askFindVisual(n[l],"U4")}};e.markSearchResultsAsRead=function(){this.signs.setMessage(h(295),100);var k=this;this.home.getDocument().defaultView.setTimeout(function(){k.reader.markEntriesAsRead(k.entryIds)},15)};e.findNextEntryId=function(o){var n=false;if(this.selectedEntryId==null){n=true}for(var m=0;m<this.entryIds.length;
m++){var l=this.entryIds[m];if(n==true){var k=this.reader.lookupEntry(l);if(k.buried==true){continue}if(o==true){if(k.isRead()==false){return l}else{continue}}else{return l}}if(l==this.selectedEntryId){n=true}}return null};e.findPreviousEntryId=function(o){var n=false;if(this.selectedEntryId==null){n=true}for(var m=this.entryIds.length-1;m>=0;m--){var l=this.entryIds[m];
if(n==true){var k=this.reader.lookupEntry(l);if(k.buried==true){continue}if(o==true){if(k.isRead()==false){return l}else{continue}}else{return l}}if(l==this.selectedEntryId){n=true}}return null};e.onPreviousEntry=function(m,k){var l=this.findPreviousEntryId(m);if(l!=null){if(k==true){this.selectEntry(l,"toview")}else{this.inlineEntry(l,true)}}else{this.signs.setMessage(h(76))
}};e.onNextEntry=function(m,k){var l=this.findNextEntryId(m);if(l!=null){if(k==true){this.selectEntry(l,"toview")}else{this.inlineEntry(l,true)}}else{this.signs.setMessage(h(75))}}})();