templates=templates||{};templates.page=templates.page||{};templates.page.video=templates.page.video||{};(function(){function h(m){var l=arguments,k;for(k=1;k<l.length;k++){m.push(l[k])}}var g=devhd.i18n.L,e=[],j="",f=templates.page.video;var i=function(k){return devhd.s3("images/"+k)},c=devhd.str.toSafeHTML,b=devhd.str.toSafeAttr,a=devhd.utils.StringUtils.stripTags,d=devhd.str.toJsEsc;
f.css=function(l){var k=[];h(k,e[0],fTheme.ba_border,e[1],fTheme.sa_back,e[2]);return k.join(j)};f.layout=function(){var k=[];h(k,e[3],i("loading.gif"),e[4],g(107),e[5],g(141),e[6],g(235),e[7]);return k.join(j)};f.shows=function(m){var k=[];h(k,e[8],g(89),e[9]);for(var l=0;l<m.length;l++){h(k,f.show(m[l]))}return k.join(j)};f.show=function(n){var m=[];
var l=n.title;var k=null;if(n.website!=null){k=devhd.utils.WebUtils.getFavIconURL(n.website)}else{k=devhd.utils.WebUtils.getFavIconURL(n.id.split("/").slice(1,4).join("/"))}h(m,e[10],b(n.id),e[11],b(n.id),e[12]);if(k!=null){h(m,e[13],k,e[14])}h(m,e[15],c(l),e[9]);return m.join(j)};e=[" #player { min-height: 350px; } #selector { margin-left: -34px; margin-right: -34px; margin-bottom: -35px; border-top: 1px solid ","; background: ","; min-height: 450px; padding: 33px; padding-right: 0px; -moz-border-radius-bottomleft: 8px; -moz-border-radius-bottomright: 8px; -webkit-border-bottom-right-radius: 8px 8px; -webkit-border-bottom-left-radius: 8px 8px; } ",' <div id="player"> <div class="entriesLoadingMessage" style="min-height:240px"> <img src="','" align="absmiddle" /> ',' </div> </div> <div id="selector" style="margin-right:-34px"> <div id="shows" class="cell"> ',' </div> <div id="videos" class="cell3"> '," </div> </div> ",' <div data-showId="#featured" class="feedIndexTitle nonEmpty" data-page-action="previewFeatured"> '," </div> ",' <div data-showId="','" class="feedIndexTitle nonEmpty" data-page-action="previewShow" data-page-action-input="','" > ',' <img class="favicon" src="','" width="16" height="16" align="absmiddle" style="margin-right: 3px; padding: 1px"/> '," "]
})();