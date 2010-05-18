<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
               xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
               xmlns:atom="http://www.w3.org/2005/Atom"
               xmlns:gd="http://schemas.google.com/g/2005"
               xmlns:gphoto="http://schemas.google.com/photos/2007"
               xmlns:media="http://search.yahoo.com/mrss/"
               xmlns:mediabroken="http://search.yahoo.com/mrss"
               xmlns:xul="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
               xmlns:html="http://www.w3.org/1999/xhtml"
               xmlns:ci="http://schemas.cooliris.com/layout/2008">

  <!-- RESOURCE URLS -->

  <xsl:param name="button-share-src">resource:images/message.png</xsl:param>
  <xsl:param name="button-share-hover-src">resource:images/message.hover.png</xsl:param>
  <xsl:param name="button-share-pressed-src">resource:images/message.pressed.png</xsl:param>
  <xsl:param name="button-share-clicked-src">resource:images/message.pressed.png</xsl:param>

  <xsl:param name="button-favorite-on-src">resource:images/star-on.png</xsl:param>
  <xsl:param name="button-favorite-on-hover-src">resource:images/star-on.hover.png</xsl:param>
  <xsl:param name="button-favorite-on-pressed-src">resource:images/star-on.pressed.png</xsl:param>
  <xsl:param name="button-favorite-on-clicked-src">resource:images/star-on.pressed.png</xsl:param>
  <xsl:param name="button-favorite-off-src">resource:images/star.png</xsl:param>
  <xsl:param name="button-favorite-off-hover-src">resource:images/star.hover.png</xsl:param>
  <xsl:param name="button-favorite-off-pressed-src">resource:images/star.pressed.png</xsl:param>
  <xsl:param name="button-favorite-off-clicked-src">resource:images/star.pressed.png</xsl:param>

  <xsl:param name="button-goto-uri-src">resource:images/goto.png</xsl:param>
  <xsl:param name="button-goto-uri-hover-src">resource:images/goto.hover.png</xsl:param>
  <xsl:param name="button-goto-uri-pressed-src">resource:images/goto.pressed.png</xsl:param>
  <xsl:param name="button-goto-uri-clicked-src">resource:images/goto.pressed.png</xsl:param>

  <xsl:param name="light-button-share-src">resource:images/onwhite-message.png</xsl:param>
  <xsl:param name="light-button-share-hover-src">resource:images/onwhite-message.hover.png</xsl:param>
  <xsl:param name="light-button-share-pressed-src">resource:images/onwhite-message.pressed.png</xsl:param>
  <xsl:param name="light-button-share-clicked-src">resource:images/onwhite-message.pressed.png</xsl:param>

  <xsl:param name="light-button-favorite-on-src">resource:images/onwhite-star-on.png</xsl:param>
  <xsl:param name="light-button-favorite-on-hover-src">resource:images/onwhite-star-on.hover.png</xsl:param>
  <xsl:param name="light-button-favorite-on-pressed-src">resource:images/onwhite-star-on.pressed.png</xsl:param>
  <xsl:param name="light-button-favorite-on-clicked-src">resource:images/onwhite-star-on.pressed.png</xsl:param>
  <xsl:param name="light-button-favorite-off-src">resource:images/onwhite-star.png</xsl:param>
  <xsl:param name="light-button-favorite-off-hover-src">resource:images/onwhite-star.hover.png</xsl:param>
  <xsl:param name="light-button-favorite-off-pressed-src">resource:images/onwhite-star.pressed.png</xsl:param>
  <xsl:param name="light-button-favorite-off-clicked-src">resource:images/onwhite-star.pressed.png</xsl:param>

  <xsl:param name="light-button-goto-uri-src">resource:images/onwhite-goto.png</xsl:param>
  <xsl:param name="light-button-goto-uri-hover-src">resource:images/onwhite-goto.hover.png</xsl:param>
  <xsl:param name="light-button-goto-uri-pressed-src">resource:images/onwhite-goto.pressed.png</xsl:param>
  <xsl:param name="light-button-goto-uri-clicked-src">resource:images/onwhite-goto.pressed.png</xsl:param>

  <xsl:param name="empty-star-image-uri">resource:images/star.gray.png</xsl:param>
  <xsl:param name="half-star-image-uri">resource:images/star.half.png</xsl:param>
  <xsl:param name="full-star-image-uri">resource:images/star.gold.png</xsl:param>

  <xsl:param name="animate-buttons">true</xsl:param>


  <!-- COMMON STYLES -->

  <xsl:param name="standard-font">font-family: Lucida Grande, Verdana;</xsl:param>

  <xsl:param name="tiny-separator">4px</xsl:param>
  <xsl:param name="small-separator">4px</xsl:param>
  <xsl:param name="medium-separator">8px</xsl:param>
  <xsl:param name="large-separator">16px</xsl:param>

  <xsl:param name="saturated-background-color">#000;</xsl:param>
  <xsl:param name="background-color">#111;</xsl:param>
  <xsl:param name="highlight-background-color">#445;</xsl:param>
  <xsl:param name="dark-foreground-color">#555;</xsl:param>
  <xsl:param name="foreground-color">#888;</xsl:param>
  <xsl:param name="bright-foreground-color">#aaa;</xsl:param>
  <xsl:param name="highlight-foreground-color">#fff;</xsl:param>

  <xsl:param name="light-saturated-background-color">#fff;</xsl:param>
  <xsl:param name="light-background-color">#eee;</xsl:param>
  <xsl:param name="light-highlight-background-color">#aaa;</xsl:param>
  <xsl:param name="light-dark-foreground-color">#888;</xsl:param>
  <xsl:param name="light-foreground-color">#222;</xsl:param>
  <xsl:param name="light-bright-foreground-color">#111;</xsl:param>
  <xsl:param name="light-highlight-foreground-color">#000;</xsl:param>

  <xsl:param name="link-color">#37f;</xsl:param>
  <xsl:param name="link-color-hover">#77a4ff;</xsl:param>
  <xsl:param name="link-color-clicked">#bbd1ff;</xsl:param>

</xsl:transform>
