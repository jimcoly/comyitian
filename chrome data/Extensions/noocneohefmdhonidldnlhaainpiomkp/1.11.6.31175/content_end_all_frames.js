if (window.name.match(/__cooliris_background_(\d+)/)) {
  initCooliris({type: 'application/x-cooliris-background-page', handle: RegExp.$1});
} else if (location.host.match(/.cooliris.com$/)) {
  initCooliris({type: 'application/x-cooliris-page', hidden: 'true'});
}
