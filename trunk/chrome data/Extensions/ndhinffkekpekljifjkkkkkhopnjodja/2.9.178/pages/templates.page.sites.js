templates=templates||{};templates.page=templates.page||{};templates.page.sites=templates.page.sites||{};(function(){function h(m){var l=arguments,k;for(k=1;k<l.length;k++){m.push(l[k])}}var g=devhd.i18n.L,e=[],j="",f=templates.page.sites;var i=function(k){return devhd.s3("images/"+k)},c=devhd.str.toSafeHTML,b=devhd.str.toSafeAttr,a=devhd.utils.StringUtils.stripTags,d=devhd.str.toJsEsc;
f.title=function(l){var k=[];h(k,e[0],g(376),e[0]);return k.join(j)};f.layout=function(l){var k=[];h(k,e[1],g(89),e[2],g(95),e[3]);return k.join(j)};f.feedArea=function(l){var k=[];h(k,e[4],b(l.id),e[5],b(l.id),e[6]);h(k,f.feedAreaTitle(l));h(k,e[7],b(l.id),e[8],g(107),e[9],b(l.id),e[10]);return k.join(j)};f.feedAreaTitle=function(l){var k=[];h(k,e[11],b(l.id),e[12],g(281,l.visits,l.velocity,l.subscribers),e[13],c(l.title),e[14],b(l.id),e[15],i("genius.png"),e[16],b(l.id),e[17],g(215),e[18],i("customizer-close.png"),e[19],b(l.id),e[17],g(166),e[20]);
return k.join(j)};e=[" ",' <div id="explore"> <div id="contentArea"> <h2>','</h2> <div id="topArea" class="entryList"> <div style="min-height:250px"> ',' <div style="width: 400px; height:5px; padding:2px; border: 1px solid #DFDFDF; margin-top: 3px"> <div id="exploreBar" style="height:5px; width:0px; background-color:#EAEAEA"></div> </div> </div> </div> </div> </div> ',' <div id="','_feed"> <h2 id="feed_','_title"> ',' </h2> <div id="main_','_entries" class="entryList"> <div style="min-height:323px">','</div> </div> <div id="main_','_saved" class="entryList"></div> <div style="clear:both"></div> </div> ',' <span data-uri="subscription/','" style="cursor:pointer" title="','">','</span> <span id="feed_','_hhint" class="hhint"></span> <img src="','" align="absmiddle" width="16" height="16" style="cursor:pointer; opacity:0.5" data-uri="explore/.','" title="','" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5" alt="suggest" /> <img src="','" align="absmiddle" width="10" height="10" style="cursor:pointer; opacity:0.5" data-page-feed-action="excludeFeed" data-feedId="','" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=0.5" alt="exclude" /> ']
})();