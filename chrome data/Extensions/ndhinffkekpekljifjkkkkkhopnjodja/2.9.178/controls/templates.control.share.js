templates=templates||{};templates.control=templates.control||{};templates.control.share=templates.control.share||{};(function(){function h(m){var l=arguments,k;for(k=1;k<l.length;k++){m.push(l[k])}}var g=devhd.i18n.L,e=[],j="",f=templates.control.share;var i=function(k){return devhd.s3("images/"+k)},c=devhd.str.toSafeHTML,b=devhd.str.toSafeAttr,a=devhd.utils.StringUtils.stripTags,d=devhd.str.toJsEsc;
f.form=function(k){var l=[];h(l,e[0],g(510,'span id="title_hint" class="fieldHint" style="font-weight: normal; padding-left: 3px"'),e[1]);h(l,templates.forms.buttonField({label:g(77),id:"shareCancelAction",secondary:true}));h(l,templates.forms.buttonField({label:g(123),id:"shareSendAction",secondary:false}));h(l,e[2],i("loading.gif"),e[3],g(508),e[4]);
return l.join(j)};f.snippet=function(k,o){var l=[];var n=false;if(o!=null){for(var m=0;m<o.length;m++){var p=o[m];if(p.kind!="hilite"){continue}n=true;if(p.nl!=null&&p.nl.img!=null){h(l,e[5],b(p.nl.img[0].src),e[6],p.note!=null&&p.note!=""?devhd.str.toSafeHTML(p.note):"",e[7])}else{h(l,e[8],c(p.text),e[9],p.note!=null&&p.note!=""?devhd.str.toSafeHTML(p.note):"",e[7])
}}}if(n==false){h(l,e[7],k.getContentOrSummary(),e[7])}h(l,e[10],g(509,'a href="'+devhd.str.toSafeAttr(k.getAlternateLink())+'"',k.getTitle(),(['a href="',g(714),'"']).join("")),e[4]);return l.join(j)};e=[' <div class="inlineFormContainer" id="panelShare"> <h1>','</h1> <div> <div id="title_fieldset" class="fieldset"> <textarea id="shareNote" autocomplete="off" class="textareaValue" style="width:100%" rows="4"></textarea> </div> </div> <div class="actions"> ',' </div> </div> <div id="panelSending" class="panelSending" style="display: none;"> <img src="','" align="absmiddle"/> '," </div> ",' <blockquote style="border-left: 5px solid #CCCCCC; padding-left: 10px; margin-left: 0px; margin-top:17px; margin-bottom:3px"><img src="','" style="max-height:200px" /></blockquote> '," ",' <blockquote style="border-left: 5px solid #CCCCCC; padding-left: 10px; margin-left: 0px; margin-top:17px; margin-bottom:3px">',"</blockquote> ",' <div style="margin-top: 17px"> ']
})();