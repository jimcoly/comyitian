(function(){var e=devhd.pkg("pages");var h=devhd.log.get("page.cover");e.CoverPage=function(j){this.guid=j};var a=e.CoverPage.prototype=new e.BasePage();a.service=function(k,j){this.pageInfo=k;this.width=j.width;this.title="Cover";this.initBase(j);this.startRenderHTML()};a.destroy=function(k,j){this.destroyBase()};a.allowsSideArea=function(){return false
};a.allowsPageHeader=function(){return true};a.startRenderHTML=function(){try{this.state="loading";this.feedly.setNbrPages(1);this.feedly.selectTab("#cover");this.feedly.pushContext({uri:this.pageInfo.uri,pageNumber:0,title:this.title,level:0});this.feedly.setPageTitle(templates.page.cover.title());this.pageElem.innerHTML=templates.page.cover.layout();
this.element("mediaArea").innerHTML=templates.page.cover.layoutGallery();this.element("photoArea").innerHTML=templates.page.cover.layoutPhotos();var j=this;devhd.utils.FlowUtils.parallel(j,[i,d],{onComplete:function(){}});var j=this;this.twitter.askAvailable(function(){if(j.isDestroyed()==true){return}j.element("bottomArea").innerHTML=templates.page.cover.layoutBottomArea(j.home);
j.element("bottomArea").style.display="block";c.call(j)},function(){if(j.isDestroyed()==true){return}j.element("bottomArea").innerHTML=templates.page.cover.layoutTwitterLogin(j.home);j.element("bottomArea").style.display="block"})}catch(k){var l=devhd.utils.ExceptionUtils.formatError("render cover page",k);h.error(127,"failed to render page",k);this.pageElem.innerHTML=l
}};function i(m,l){var n=this.reader.listSections({excludeEmpty:true});var j=Math.min(Math.floor(n.length/4),2);if(n.length>=2&&j==0){j=1}if(j>0){n=n.slice(0,4*j);this.element("sectionsArea").innerHTML=templates.page.cover.layoutSections(n,this.home);this.element("sectionsArea").style.display="block";this.nbrSections=n.length;this.nbrRows=j}else{n=null;
this.element("sectionsArea").style.display="none";this.nbrSections=0;this.nbrRows=0}var k=this;this.reco.askStreamDigest({featured:g==2?11:16,sections:n},function(){},function(){},function(p){if(k.isDestroyed()==true){return}for(var o=0;o<p.length;o++){f.call(k,p[o])}})}var g=3;function f(k){var n=5;switch(k.label){case"#featured":var v=k.top40.sort(function(y,j){if(j.metadata.starred!=y.metadata.starred){return j.metadata.starred-y.metadata.starred
}else{return j.t12hScore-y.t12hScore}});var t=[],r=[];for(var o=0;o<g&&(2*o+1<v.length);o++){t.push(v[2*o]);r.push(v[2*o+1])}var p=v.slice(2*g);if(t.length==0){this.pageElem.innerHTML=templates.page.base.empty(this.reader.listSubscriptions().length,this.reader.listRankedCategories({}),this.width,this.home);return}this.element("headlines1").innerHTML=templates.page.cover.displayRecommendations(t,this.home);
for(var o=0;o<t.length;o++){this.askFindVisual(t[o],"U10")}this.element("headlines2").innerHTML=templates.page.cover.displayRecommendations(r,this.home);for(var o=0;o<r.length;o++){this.askFindVisual(r[o],"U10")}var w=[];for(var m=1;m<p.length;m++){w.push({entry:p[m],type:4})}w=w.sort(function(y,j){return j.entry.lastModifiedTime-y.entry.lastModifiedTime
});this.element("headlines3").innerHTML=templates.page.cover.layoutFeatured(w,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:false,includeFavIcon:true},this.home);for(var m=0;m<w.length;m++){this.askFindVisual(w[m].entry,"U4")}break;case"#photos":if(k.top40.length==0){return}var l=[];for(var m=0;m<k.top40.length&&m<n;
m++){var x=k.top40[m];l.push({entry:x,type:6})}this.element("photoArea").style.display="block";devhd.utils.HTMLUtils.append(this.element("photos"),templates.page.base.parts(l,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true},this.home));for(var o=0;o<l.length;o++){this.askFindVisual(l[o].entry,"U6")}break;break;case"#shows":if(k.top40.length==0){return
}var l=[];for(var m=0;m<k.top40.length&&m<n;m++){var x=k.top40[m];l.push({entry:x,type:7})}this.element("mediaArea").style.display="block";devhd.utils.HTMLUtils.append(this.element("gallery"),templates.page.base.parts(l,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true},this.home));for(var o=0;o<l.length;o++){this.askFindVisual(l[o].entry,"U7")
}break;default:var s=this.element("main_section_"+k.label+"_entries");if(s==null){return}var u=k.top40.slice(0,this.nbrRows==1?6:3).sort(function(y,j){return j.lastModifiedTime-y.lastModifiedTime});if(u.length==0){if(k.feedId!=null){this.element("main_section_"+k.feedId+"_holder").style.display="none"}else{this.element("main_section_"+k.label+"_holder").style.display="none"
}return}var q=[];var l=[];for(var m=0;m<u.length;m++){l.push({entry:u[m],type:15});q.push(u[m])}s.innerHTML=templates.page.base.parts(l,this.width,{includeSourceTitle:true,includeCategoryLabel:false,includeNoThanks:true,includeFavIcon:true},this.home)}}function d(){var j=this;this.portfolio.askPortfolio(function(k){if(j.isDestroyed()||k==null||k.length==0){return
}j.element("portfolioArea").innerHTML=templates.page.cover.layoutPortfolio(k,j.home);j.element("portfolioArea").style.display="block"})}var b=9;function c(){var j=this;this.home.askIncludeControl("timeline",function(){var k=new devhd.control.TimelineControl();k.setHome(j.home);k.setTwitter(j.twitter);k.setTinyURL(j.tinyURL);k.setSigns(j.signs);k.setDialog(j.dialog);
k.setPreferences(j.preferences);k.setMax(b+1);k.setPart(j.element("timeline"));k.display();j.declareControl(k)});this.home.askIncludeControl("tweets",function(){var k=new devhd.control.TweetsControl();k.setHome(j.home);k.setTwitter(j.twitter);k.setTinyURL(j.tinyURL);k.setSigns(j.signs);k.setDialog(j.dialog);k.setPreferences(j.preferences);k.setMax(b-1);
k.setQuery("@"+j.twitter.getScreenName());k.setPart(j.element("mentions"));k.display();j.declareControl(k)});this.home.askIncludeControl("karma",function(){var k=new devhd.control.KarmaControl();k.setHome(j.home);k.setTwitter(j.twitter);k.setTinyURL(j.tinyURL);k.setMax(b-1);k.setPart(j.element("karma"));k.display();j.declareControl(k)});this.home.askIncludeControl("amazon",function(){var k=new devhd.control.AmazonControl();
k.setHome(j.home);k.setAmazon(j.amazon);k.setMax(8);k.setPart(j.element("amazon"));k.display();j.declareControl(k)})}})();