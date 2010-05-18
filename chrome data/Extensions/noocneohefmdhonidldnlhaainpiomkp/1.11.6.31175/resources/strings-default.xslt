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

  <!-- ADS.XSLT -->

  <xsl:param name="string-advertisement">ADVERTISEMENT</xsl:param>

  <!-- COMMON.XSLT -->

  <xsl:param name="string-no-flash-message">You must install Flash version 8 or higher to view this content.</xsl:param>
  <xsl:param name="string-flash-unsupported-message">Cooliris does not support Flash on your platform.</xsl:param>
  <xsl:param name="string-tooltip-share-button">Share</xsl:param>
  <xsl:param name="string-tooltip-favorite-on-button">Unmark as favorite</xsl:param>
  <xsl:param name="string-tooltip-favorite-off-button">Mark as favorite</xsl:param>
  <xsl:param name="string-tooltip-goto-uri-button">Go to webpage</xsl:param>
  <xsl:param name="string-tooltip-goto-uri-button-local">Open in file browser</xsl:param>

  <!-- DISCOVER.XSLT -->

  <xsl:param name="string-expand">Expand &#x00bb;</xsl:param>
  <xsl:param name="string-collapse">Collapse &#x00ab;</xsl:param>
  <xsl:param name="string-related-articles">Related Articles</xsl:param>
  <xsl:param name="string-read-full-article">Read Full Article </xsl:param>
  <xsl:param name="string-tooltip-read-more-button">Read the rest of the story on the web</xsl:param>

  <!-- HULU.XSLT -->

  <xsl:param name="string-media-type-music-video">Music Video</xsl:param>
  <xsl:param name="string-media-type-full-episode">Full Episode</xsl:param>
  <xsl:param name="string-media-type-full-movie">Full Movie</xsl:param>
  <xsl:param name="string-media-type-full-show">Full Show</xsl:param>
  <xsl:param name="string-media-type-trailer">Trailer</xsl:param>

  <xsl:param name="string-genre-action">Action</xsl:param>
  <xsl:param name="string-genre-comedy">Comedy</xsl:param>
  <xsl:param name="string-genre-drama">Drama</xsl:param>

  <xsl:param name="string-season">Season</xsl:param>
  <xsl:param name="string-episode">Episode</xsl:param>

  <!-- PHOTOGRAPHY.XSLT -->

  <xsl:param name="string-location">Location</xsl:param>
  <xsl:param name="string-goto-album">Click to navigate to this album</xsl:param>
  <xsl:param name="string-no-images-title">This folder contains no images.</xsl:param>
  <xsl:param name="string-no-images-description">Use the sidebar browser to find your images.</xsl:param>

  <!-- SHOPPING.XSLT -->

  <xsl:param name="string-browse-categories">Browse categories</xsl:param>

  <!-- YOUTUBE.XSLT -->

  <xsl:decimal-format name="number-format" decimal-separator="." grouping-separator=","/>
  <xsl:param name="number-format">###,###,###</xsl:param>
  <xsl:param name="numeric-ordering">num-str</xsl:param>
  <xsl:param name="string-view"> view</xsl:param>
  <xsl:param name="string-views"> views</xsl:param>
  <xsl:param name="string-rating"> rating</xsl:param>
  <xsl:param name="string-ratings"> ratings</xsl:param>
  <xsl:param name="string-related-videos">Related videos</xsl:param>
  <xsl:param name="string-other-videos-by">Other videos by </xsl:param>
  <xsl:param name="string-show-related-videos">Show Related Videos</xsl:param>
  <xsl:param name="string-hide-related-videos">Hide Related Videos</xsl:param>

</xsl:transform>
