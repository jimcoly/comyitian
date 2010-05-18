function setPicLensContext() {
  window.PicLensContext = function() {
    return initCooliris();
  };
  document.documentElement.removeChild(document.getElementById('coolirisScript'));
}
var script_text = ("(" + setPicLensContext + ")();");
script_text = script_text.replace("initCooliris", "(" + initCooliris + ")")
var script_tag = document.createElement("script");
script_tag.id = 'coolirisScript';
script_tag.appendChild(document.createTextNode(script_text));
document.documentElement.appendChild(script_tag);
