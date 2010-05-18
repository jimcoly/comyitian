(function(){var b=devhd.pkg("pages");var k=b.BasePage.prototype;var s=b.createClass("DashboardPage",b.BasePage);var f=devhd.log.get("page.dashboard");var n=devhd.i18n.L;s.initialize=function(x){k.initialize.call(this);this.guid=x};s.service=function(A,z){this.pageInfo=A;this.width=z.width;this.initBase(z);this.startRenderHTML();var y=new devhd.behaviors.Dragable();
y.setDndHandler({$this:this,$fn:s.dndHandler});y.setEffects(this.effects);this.bind(this.pageElem,y);var x=new devhd.behaviors.Editable();x.setHandler({$this:this,$fn:s.editableHandler});this.bind(this.pageElem,x)};s.destroy=function(){this.destroyBase()};s.allowsSideArea=function(){return false};s.allowsPageHeader=function(){return true};s.showCustomizer=function(x){this.showListCustomizer(x.target)
};s.startRenderHTML=function(){f.trace(84,"starting HTML rendering ... ");m.call(this);this.feedly.setPageTitle(templates.page.dashboard.title(this.pageModel));this.feedly.selectTab("#dashboard");this.feedly.setOptionsContent("");this.feedly.clearNbrPages();this.feedly.pushContext({uri:"dashboard",pageNumber:this.pageInfo.pageNumber,title:"dashboard",level:1,category:"#dashboard"});
this.pageElem.innerHTML=templates.page.dashboard.layout(this.pageModel,this.width,this.pageInfo.term,this.home)};function p(y,x){return y.toLocaleLowerCase().localeCompare(x.toLocaleLowerCase())}var v="feedly.others";function m(){var x=this.preferences.get("favoritesOnlyFilter",this.pageInfo.uri);var D,B,A,C,z;f.trace(116,"rebuilding page model ...");
this.pageModel={categories:[],alphaCategories:[],subs:{},labels4id:{},specialLabels:{},subscriptionCount:0,unreadCount:0};var y=this.reader.listRankedCategories();for(D=0;D<y.length;D++){A=y[D].label;C=this.reader.listSubscriptions(A,this.pageInfo.term,false,x=="on",true);if(C.length>0){this.pageModel.categories.push(A);this.pageModel.alphaCategories.push(A);
this.pageModel.subs[A]=C;for(B=0;B<C.length;B++){if(!this.pageModel.labels4id[C[B].id]){this.pageModel.labels4id[C[B].id]=C[B].listCategoryLabels()}}}}this.pageModel.alphaCategories.sort(p);A=v;this.pageModel.specialLabels[A]=true;var E=this.reader.listSubscriptions(A,this.pageInfo.term,false,false,true);if(E.length>0){this.pageModel.categories.push(A);
this.pageModel.alphaCategories.push(A);this.pageModel.subs[A]=E}for(z in this.pageModel.subs){C=this.pageModel.subs[z];this.pageModel.subscriptionCount+=C.length;for(var B=0;B<C.length;B++){this.pageModel.unreadCount+=C[B].unreadCount||0}}}s.markPageAsRead=function(){if(confirm(n(316))){for(var x=0;x<this.pageModel.subscriptions.length;x++){this.reader.markAllSubscriptionEntriesAsRead(this.pageModel.subscriptions[x].id)
}}};s.onSubscriptionUnreadCountChanged=function(y,z){var x=this.element("subscription_"+y);if(x!=null){x.innerHTML=templates.page.dashboard.subscriptionDashboard(this.reader.lookupSubscription(y),this.pageInfo.term,this.home)}};s.onSubscriptionFavoriteStatusChanged=function(x,A){var z=devhd.utils.HTMLUtils.findElements(this.pageElem,{className:"feedIconDashboard","data-feedId":x});
for(var y=0;y<z.length;y++){z[y].style.opacity=A?1:0.1}};s.editableHandler=function(y,x){if(y=="editStart"){x.value=devhd.str.trim(x.value);x.data.feedId=x.target.getAttribute("data-feedId");x.data.category=x.target.getAttribute("data-category")}if(y=="editEnd"){x.value=devhd.str.trim(x.value);if(x.data.feedId){if(x.value.length<1){x.cancel=true;this.signs.setMessage(n(277));
return}if(x.value==x.origValue){x.cancel=true;return}this.schedule(1,{$this:this,$fn:g},x)}else{if(x.data.category){if(x.value.length<1){x.cancel=true;this.signs.setMessage(n(275));return}if(x.value==x.origValue){x.cancel=true;return}this.schedule(1,{$this:this,$fn:j},x)}else{f.warn(254,"editing did end, handler is a noop")}}}};function h(x,y){f.error(261,"edit subscription failed because: ",x," -- ",y);
this.signs.setMessage(n(276))}function g(x){var y=this;this.signs.setNextAutoHideDelay(10000);this.signs.setMessage(templates.unoMomento());f.trace(270,"new-title : "+x.value);this.reader.askUpdateSubscription(x.data.feedId,x.value,null,null,{},false,function(){y.signs.setMessage(n(n(331),x.value))},function(z,A){h.call(y,z,A)})}function j(x){this.signs.setNextAutoHideDelay(10000);
this.signs.setMessage(templates.unoMomento());var y=x.origValue;var z=x.value;if(y==null){f.warn(298,"category rename, old category is null ? ");x.undo();return}f.trace(303,"new-category name : ",z," changed category name ",y);this.retagSubscriptions(y,y,z)}s.dndHandler=function(z,x){var y;if(z=="dragStart"){y=devhd.utils.HTMLUtils.findParentElementByTagAndAttribute(x.src,"*","data-category","*");
x.data={};x.data.feedid=x.src.getAttribute("data-feedId");x.data.oldCat=y?y.getAttribute("data-category"):null;if(x.data.oldCat==null){f.warn(336,"cannot start DND, missing category");x.cancel=true;return}x.dragable.innerHTML=devhd.utils.HTMLUtils.outerHTML(x.src);x.dragableSet=true;if(x.event&&x.event.shiftKey){x.type="copy"}else{x.type="move2"}x.effect="show";
x.data.dropZones=this.element("dashboard_dropZones");if(x.data.dropZones){x.data.dropZones.style.display="block"}}if(z=="dragOver"){x.data.newCat=x.target.getAttribute("data-category")}if(z=="dragOut"){delete x.data.newCat}if(z=="dragDrop"){this.lastDragCtx=x;this.schedule(1,{$this:this,$fn:r},x)}if(z=="dragEnd"){if(x.data.dropZones){x.data.dropZones.style.display="none"
}x.data.dropZones=null}};function r(y){var x=(y.type=="copy");if(y.data.feedid){if(y.data.newCat=="##remove##"){f.trace(395,"removing subscription ",y.data.feedid);this.unsubscribeFromSubscription(y.data.feedid)}else{if(y.data.newCat=="##untag##"){f.trace(399,"removing category ",y.data.oldCat," from ",y.data.feedid);this.tagSubscription(y.data.feedid,y.data.oldCat,null)
}else{if(y.data.newCat=="##tag##"){f.trace(403,"adding new category to ",y.data.feedid);this.signs.setNextAutoHideDelay(180*1000);this.signs.setMessage(templates.page.dashboard.newCategory(),0.8,true,this);var z=this;this.bind(this.element("nc_create"),"click",function(){z.doClick("newCategory","nc_input")});this.bind(this.element("nc_cancel"),"click",function(){z.hideSigns()
})}else{if(y.data.newCat){if(y.data.newCat!=y.data.oldCat){this.tagSubscription(y.data.feedid,(x?null:y.data.oldCat),y.data.newCat)}else{this.signs.setNextAutoHideDelay(2000);this.signs.setMessage(templates.page.dashboard.sameCategory(y.data.oldCat));f.trace(417,"old and new category are the same ... skipping")}}else{f.error(420,"new category is not set, cannot perform operation")
}}}}}else{if(y.data.newCat=="##remove##"){f.trace(424,"asking to remove a category ");this.retagSubscriptions(y.data.oldCat,y.data.oldCat,null)}else{if(y.data.newCat){if(y.data.newCat==y.data.oldCat){this.signs.setNextAutoHideDelay(2000);this.signs.setMessage(templates.page.dashboard.sameCategory(y.data.oldCat));f.trace(433,"old and new category are the same ... skipping")
}else{if(x){f.trace(435,"copying ",y.data.oldCat," to ",y.data.newCat);this.retagSubscriptions(y.data.oldCat,null,y.data.newCat)}else{f.trace(440,"merging ",y.data.oldCat," with ",y.data.newCat);this.retagSubscriptions(y.data.oldCat,y.data.oldCat,y.data.newCat)}}}else{f.error(446,"new category is not set, cannot merge")}}}}s.tagSubscription=function(y,z,A){var B=this;
this.signs.setNextAutoHideDelay(10000);this.signs.setMessage(templates.unoMomento());var x=A;if(x){if(typeof x=="string"){x=[A]}}var C=z;if(C){if(typeof C=="string"){C=[C]}}f.trace(471,"newLabels : ",x,",  oldLabels: ",C);this.reader.askUpdateSubscription(y,null,x,C,{},false,function(){q.call(B,y,z,A)},function(){a.call(B,y,z,A)})};function q(x,y,z){delete this.lastDragCtx;
f.trace(497,"subscription ",x," updated, src=",y," dst=",z);this.signs.setNextAutoHideDelay(2000);this.signs.setMessage(templates.page.dashboard.updated(x,y,z))}function t(y){var A,z,x,B;for(A=0;A<y.length;A++){x=y[A];z=this.pageModel.subs[x];B=this.element("category_"+x+"_dashboard");if(z&&B){devhd.utils.HTMLUtils.html(B,templates.page.dashboard.category(x,z,this.width,this.pageInfo.term,this.home))
}else{return 1}}return 0}function c(y){var x=devhd.utils.HTMLUtils.findElements(y,{className:"dashboardCategoryLabel"});if(x.length>0){}}function a(y,z,A,x){delete this.lastDragCtx;f.error(533,"subscription ",y," NOT updated, src=",z," dst=",A,", copy=",x);this.signs.setNextAutoHideDelay(4000);this.signs.setMessage(templates.page.dashboard.notUpdated(y,z,A,x))
}s.retagSubscriptions=function(B,y,F){var H=this.preferences.get("dashboardFavoritesOnlyFilter");var z=this.reader.listSubscriptions(B,null,false,H=="on");var E=F;if(E){if(typeof E=="string"){E=[F]}}var C=y;if(C){if(typeof C=="string"){C=[C]}}if(z.length<1){return}var A,D=[],x=[],I=[];if(y&&!F){for(A=0;A<z.length;A++){var G=z[A].listCategoryLabels();
if(G.length==1&&G[0]==y){x.push(z[A])}else{D.push(z[A])}}}else{D=z}this.signs.setNextAutoHideDelay(10000);this.signs.setMessage(templates.unoMomento());if(D.length){devhd.utils.FlowUtils.flowN({subs:D,newLabels:E,oldLabels:C,msg:I},D.length,{$this:this,$fn:o},{$this:this,$fn:l})}if(x.length){devhd.utils.FlowUtils.flowN({subs:x,msg:I},x.length,{$this:this,$fn:i},{$this:this,$fn:e})
}};function o(x,y,z){f.trace(630,"re-labeling ",x.subs[y].id," new: ",x.newLabels,",  old: ",x.oldLabels);this.reader.askUpdateSubscription(x.subs[y].id,null,x.newLabels,x.oldLabels,{},false,z,z)}function l(x){x.msg.push(x.subs.length+" subscriptions tagged. ");this.signs.setNextAutoHideDelay(2000);this.signs.setMessage(x.msg.join(""))}function i(x,y,z){f.trace(656,"unsubscribing from ",x.subs[y].id,", no more tags tag it.");
this.reader.askRemoveSubscription(x.subs[y].id,z)}function e(x){x.msg.push(x.subs.length+" subscriptions removed. ");this.signs.setNextAutoHideDelay(2000);this.signs.setMessage(x.msg.join(""))}s.onSubscriptionAddedToCategory=function(z,y,A){f.trace(672,"onSubscriptionAddedToCategory -> subscription ",z," has been added to category ",y);var x=this.scheduleWork(250,"refresh");
x.addStep("pdm",{$this:this,$fn:m});x.addStep("##"+y,{$this:this,$fn:d},[y])};function d(x){var y=t.call(this,x);if(y){f.trace(683,"reload of page is necessary: ",y);this.reload()}}s.onSubscriptionRemovedFromCategory=function(z,y,A){f.trace(691,"onSubscriptionRemovedFromCategory -> subscription ",z," has been removed from category ",y);var x=this.scheduleWork(250,"refresh");
x.addStep("pdm",{$this:this,$fn:m});x.addStep("##"+y,{$this:this,$fn:d},[y])};s.onSubscriptionRemoved=function(x,y){f.trace(710,"onSubscriptionRemoved -> subscription ",x);w.call(this,x,this.pageModel.labels4id[x])};s.onSubscriptionUpdated=function(x){f.trace(719,"onSubscriptionUpdated -> subscription "+x+" has been updated.");w.call(this,x)};s.onSubscriptionUnreadCountChanged=function(y,x){f.trace(725,"onSubscriptionUnreadCountChanged -> subscription "+y+" unread count has changed ",x);
w.call(this,y)};function w(y,A){var x=this.scheduleWork(250,"refresh");x.addStep("pdm",{$this:this,$fn:m});var z,B=(A||this.reader.lookupSubscription(y).listCategoryLabels());for(z=0;z<B.length;z++){x.addStep("##"+B[z],{$this:this,$fn:d},[B[z]])}}function u(x){}s.doClick=function(D,y){this.signs.hide();var B,z=this.lastDragCtx,x=(z.type=="copy");if(D=="newCategory"){var A,C,E=this.element(y);
C=devhd.str.trim(E.value);A=C.split(/,|;|\//);for(B=0;B<A.lenght;B++){A[B]=devhd.str.trim(A[B])}this.tagSubscription(z.data.feedid,(x?null:z.data.oldCat),A,true)}}})();