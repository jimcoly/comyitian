templates=templates||{};templates.control=templates.control||{};templates.control.merlin=templates.control.merlin||{};(function(){function h(m){var l=arguments,k;for(k=1;k<l.length;k++){m.push(l[k])}}var g=devhd.i18n.L,e=[],j="",f=templates.control.merlin;var i=function(k){return devhd.s3("images/"+k)},c=devhd.str.toSafeHTML,b=devhd.str.toSafeAttr,a=devhd.utils.StringUtils.stripTags,d=devhd.str.toJsEsc;
f.layout=function(l,m){var k=[];h(k,e[0]);h(k,templates.forms.textField({id:"source",label:g(139),hint:g(140),size:77}));h(k,e[1]);h(k,templates.forms.buttonField({id:"preview",label:g(125)}));h(k,templates.forms.buttonField({id:"close",label:g(78),secondary:true}));h(k,e[2]);return k.join(j)};e=[' <div class="transparentFormContainer"> <div class="fields"> ',' </div> <div id="progress" class="introduction" style="margin-top: 0.7em;"></div> <div class="actions"> '," </div> </div> "]
})();