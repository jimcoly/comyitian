templates=templates||{};templates.page=templates.page||{};templates.page.filter=templates.page.filter||{};(function(){function h(m){var l=arguments,k;for(k=1;k<l.length;k++){m.push(l[k])}}var g=devhd.i18n.L,e=[],j="",f=templates.page.filter;var i=function(k){return devhd.s3("images/"+k)},c=devhd.str.toSafeHTML,b=devhd.str.toSafeAttr,a=devhd.utils.StringUtils.stripTags,d=devhd.str.toJsEsc;
f.title=function(k,o,n,m,p){var l=[];if(k.scopeLabel!=null){h(l,e[0],g(392,'span class="searchTerm"',k.term,'span id="searchScopeLabel"',k.scopeLabel),e[0])}else{h(l,e[0],g(391,'span class="searchTerm"',k.term),e[0])}h(l,e[1]);return l.join(j)};f.layout=function(k,q,p,n,r){var m=[];h(m,e[2],q,e[3],g(387,"b",k.term,k.scopeLabel),e[4],g(42),e[5]);for(var o=0;
o<k.nbrZones;o++){var l="auto";if(o<=k.nbrZones-1&&k.zoneHeight!=-1){l=k.zoneHeight+"px"}if(o==k.nbrZones-1&&k.lastZoneHeight!=-1){l=k.lastZoneHeight+"px"}h(m,e[6],o,e[7],l,e[8])}h(m,e[9],g(9),e[10],g(30),e[11],g(42),e[12],g(388,"b",k.term),e[13],g(87),e[14]);if(k.pageNumber>0){h(m,e[15],g(40),e[16])}h(m,e[17],g(32),e[18]);return m.join(j)};f.loading=function(k){var l=[];
h(l,e[19],i("loading.gif"),e[20]);if(k.scopeLabel){h(l,e[0],g(390,"b",k.term,"i",k.scopeLabel),e[0])}else{h(l,e[0],g(389,"b",k.term),e[0])}h(l,e[21]);return l.join(j)};f.resultCount=function(l){var k=[];h(k,e[0],g(311,l),e[0]);return k.join(j)};f.options=function(l){var k=[];return k.join(j)};f.error=function(l){var k=[];h(k,e[22],g(278,"i",l),e[21]);
return k.join(j)};e=[" ",' <span class="hhint"> <span id="searchResultsCount" ></span> </span> ',' <div id="mainArea" style="width:','px"> <div id="search_entries" class="entryList"> <div id="emptyListMessage" style="display:none"> <div class="infoBox"> '," <a href='#' data-app-action=\"refresh\">","</a> </div> </div> ",' <div id="zone','" style="height:','"></div> ',' </div> <div style="clear:both"></div> <div id="listNavigation"> <div style="float: right; color: #909090"> <span class="action" onclick="document.defaultView.scroll( 0, 0 )">','</span> &bull; <span class="action" data-page-action="markPageAsRead">','</span> &bull; <span class="action" data-app-action="refresh">','</span> </div> <div id="listPageNumber"> ',' <span id="range"></span> <span id="endOfListIndicator" style="display:none">(',')</span> <span id="listPagePagingControls"> ',' <span id="listPagePagingControls_Previous" class="listPagePagingControl" data-app-action="loadPreviousPage" >','</span> <span style="padding-left: 15px; padding-right: 15px">|</span> ',' <span id="listPagePagingControls_Next" class="listPagePagingControl" data-app-action="loadNextPage" >','</span> </span> </div> <div style="clear:both"></div> </div> </div> ',' <div class="entriesLoadingMessage"> <img src="','" align="absmiddle" /> '," </div> ",' <div class="errorMessage" style="margin-left:120px"> ']
})();