(function(g){g.ascrollable={options:{debug:false,itemHeight:null,pageSize:null,pageBuffer:3,totalItems:0,itemsContainer:null,clear:true,placeholderItem:null,emptyContainer:null,loadingContainer:null,startPage:0,items:null,onLoadPage:null,onBeforeLoadPage:null,onAfterLoadPage:null,indexAttr:"ascrollableIndex",onEmpty:null,onLoading:null,loadProcTimeout:1000,onScroll:null}};g.fn.ascrollable=function(G){return this.each(function(H,I){c(this,G);});};var y=null;var e={};var u=new Array();var w=null;var r=new Array();function c(G,H){y=g(G);e=g.extend(g.ascrollable.options,H);if(e.itemHeight==null){throw new Error("Must specify itemHeight when using ascrollable");}if(e.pageSize==null){throw new Error("Must specify pageSize when using ascrollable");}if(e.itemsContainer==null){e.itemsContainer=g(y.children("*").get(0));}else{if(typeof e.itemsContainer=="string"){e.itemsContainer=g(y.children(e.itemsContainer).get(0));}}if(e.clear){e.itemsContainer.empty();u=new Array();w=null;r=new Array();}if(e.loadingContainer){o(e.loadingContainer);}if(typeof e.onLoading=="function"){e.onLoading();}y.unbind("scroll");y.get(0).scrollTop=s();y.bind("scroll",i);y.unbind("loadPage");y.bind("loadPage",E);y.unbind("beforeLoadPage");y.bind("beforeLoadPage",j);y.unbind("afterLoadPage");y.bind("afterLoadPage",m);i();}function s(){return e.startPage*e.pageSize*e.itemHeight;}function k(){return parseInt(y.attr("scrollTop"));}function n(){return k()+y.height();}function h(){var G={};G.top=k();G.bottom=n();return G;}function A(){return Math.floor(k()/e.itemHeight);}function B(){return Math.floor(n()/e.itemHeight);}function z(){return Math.floor(A()/e.pageSize);}function d(){var I=new Array();var J=Math.floor(A()/e.pageSize);if(e.debug&&console){console.log("TOP PAGE: "+J);}var G=Math.floor(B()/e.pageSize);if(e.debug&&console){console.log("BOTTOM PAGE: "+G);}I.push(J);if(J!=G){for(var H=J;H<=G;H++){I.push(H);}}return I;}function i(I){var L=d();if(e.debug&&console){console.log("Visible pages: "+L);}var K=null;var J=null;for(var G=0;G<L.length;G++){if(!b(L[G])){K=L[G];break;}}for(var G=(L.length-1);G>=0;G--){if(!b(L[G])){J=L[G];break;}}if(K==null){if(e.debug&&console){console.log("All the required pages loaded...");}}else{if(e.debug&&console){console.log("Need to load pages: "+K+" - "+J);}var H=(J-K)+1;y.trigger("loadPage",[K,e.pageSize,H]);}if(I&&typeof e.onScroll=="function"){e.onScroll(I);}}function E(J,G,H,I){if(e.debug&&console){console.log("Requesting page: "+G+" + "+I);}y.trigger("beforeLoadPage",[G,H,I]);if(w){clearTimeout(w);}w=setTimeout(function(){w=null;if(typeof e.onLoadPage=="function"){var K=e.onLoadPage(G,H,I);if(K){y.trigger("afterLoadPage",[G,H,I]);}}else{y.trigger("afterLoadPage",[G,H,I]);}},e.loadProcTimeout);}function j(K,G,H,J){if(typeof e.onBeforeLoadPage=="function"){e.onBeforeLoadPage(G,H,J);}if((e.itemsContainer.css("display")!="none")&&e.placeholderItem instanceof jQuery){var N=G*H;var L=Math.min((N+(H*J)-1),(q()-1));for(var I=N;I<=L;I++){var M=e.placeholderItem.clone();r.push(M);t(M,I);}}}function m(G,K,R,O){if(typeof e.onAfterLoadPage=="function"){e.onAfterLoadPage(K,R,O);}var U=q();if(U==0){if(e.emptyContainer){o(e.emptyContainer);}if(typeof e.onEmpty=="function"){e.onEmpty();}return;}var P=U*e.itemHeight;e.itemsContainer.css({height:P+"px"});var Q=a();for(var I=0;I<O;I++){var J=K+I;u[J]=new Array();var S=J*R;var N=S+R-1;if(e.debug&&console){console.log(">>> Loading from "+S+" to "+N+" page: "+I+"/"+O);}if(Q instanceof Array){for(var L=S;L<=N;L++){if(Q[L]){var T=(Q[L] instanceof jQuery)?Q[L]:g(Q[L]);u[J].push(T);t(T,L);}}}}if(r&&r.length>0){if(e.debug&&console){console.log(">>> Removing "+r.length+" Placeholders");}for(var I=0;I<r.length;I++){if(r[I]!=null){r[I].remove();}}r=new Array();}var M=v();var H=p();if(e.debug&&console){console.log(">>> LOADED: "+M+" / "+H);}if(x()){F(K,O);}o(e.itemsContainer);}function F(G,K){if(e.debug&&console){console.log("Cleaning up obsolete page: "+G+" + "+K);}var N=G;var M=G+K-1;var I=new Array();if(e.debug&&console){console.log(">>> Looking for obsolete pages excluding: "+N+" - "+M+" / "+u.length);}for(var J=0;J<u.length;J++){if(b(J)&&(J<N||J>M)){I.push(J);}}if(e.debug&&console){console.log("Pages: "+I);}var L=I.shift();var H=I.pop();if(e.debug&&console){console.log("Top obsolete: "+L+" Bottom obsolete: "+H);}if(typeof L=="undefined"&&typeof H=="undefined"){return;}if(typeof H=="undefined"){l(L);}else{if((G-L)>(H-G)){l(L);}else{l(H);}}if(x()){F(G,K);}}function l(G){if(u[G] instanceof Array){if(e.debug&&console){console.log("Removing page: "+G+" having "+u[G].length+" elements");}for(var H=0;H<u[G].length;H++){u[G][H].remove();}u[G]=null;}}function x(){return(e.pageBuffer>0&&p()>e.pageBuffer);}function a(){if(typeof e.items=="function"){return e.items();}else{return e.items;}}function C(I,G){var H=G*e.itemHeight;if(e.debug&&console){console.log(">>> Setting offset: "+H+" for index: "+G);}I.css({position:"absolute",top:H+"px"});I.attr(e.indexAttr,G);}function t(I,G){if(e.debug&&console){console.log(">>> Inserting item at index: "+G);}C(I,G);if(e.debug){I.append(g("<div class='ascrollableDebug'>"+G+"</div>"));}var H=y.find("*["+e.indexAttr+"="+G+"]");if(H.length>0){H.replaceWith(I);}else{e.itemsContainer.append(I);}}function b(G){return(u[G] instanceof Array);}function q(){if(typeof e.totalItems=="function"){return parseInt(e.totalItems());}else{return parseInt(e.totalItems);}}function f(){var G=q();if(G>0){return Math.ceil(G/e.pageSize);}else{return 0;}}function v(){return e.itemsContainer.children().length;}function p(){return Math.ceil(v()/e.pageSize);}function D(){var G=new Array();G.push(e.itemsContainer);if(e.loadingContainer){G.push(e.loadingContainer);}if(e.emptyContainer){G.push(e.emptyContainer);}return G;}function o(G){if(G){var I=D();for(var H=0;H<I.length;H++){if(I[H]==G){if(e.debug&&console){console.log("Showing container: "+I[H].attr("id"));}I[H].show();}else{if(e.debug&&console){console.log("Hiding container: "+I[H].attr("id"));}I[H].hide();}}}}})(jQuery);