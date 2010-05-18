(function(){
  if (location.href.indexOf("http://docs.google.com/") == -1) {
    var l = document.getElementsByTagName("a");
    var i = l.length; 
    while (i--) {
      if (l[i].href.match(/^[^?]+\.(pdf|ppt|tif)$/)) {
        l[i].href = 'http://docs.google.com/viewer?url=' + l[i].href;
      }
    }
  }
})();