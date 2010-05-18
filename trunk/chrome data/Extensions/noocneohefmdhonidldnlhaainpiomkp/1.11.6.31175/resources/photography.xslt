<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
               xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
               xmlns:atom="http://www.w3.org/2005/Atom"
               xmlns:gd="http://schemas.google.com/g/2005"
               xmlns:gphoto="http://schemas.google.com/photos/2007"
               xmlns:exif="http://schemas.google.com/photos/exif/2007"
               xmlns:media="http://search.yahoo.com/mrss/"
               xmlns:mediabroken="http://search.yahoo.com/mrss"
               xmlns:xul="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
               xmlns:html="http://www.w3.org/1999/xhtml"
               xmlns:ci="http://schemas.cooliris.com/layout/2008">

  <xsl:output method="xml" encoding="utf-8" indent="yes"/>

  <xsl:include href="resource:theme-dark.xslt"/>
  <xsl:include href="resource:common.xslt"/>


  <xsl:param name="iso-image">resource:images/icon.iso.png</xsl:param>
  <xsl:param name="flash-on-image">resource:images/icon.flash.png</xsl:param>


  <xsl:param name="ci:com.cooliris.local-mode"/>
  <xsl:param name="ci:com.cooliris.feed.empty"/>


  <xsl:template match="/ci:feedData">
    <xsl:if test="$ci:com.cooliris.local-mode = 'true' and $ci:com.cooliris.feed.empty = 'true'">
      <ci:layoutSet>
        <xul:window id="foreground" style="{$standard-font}">
          <xul:vbox>
            <xul:box flex="1"/>
            <xul:box flex="1" align="middle" pack="middle">
              <xsl:call-template name="message-box">
                <xsl:with-param name="title"><xsl:value-of select="$string-no-images-title"/></xsl:with-param>
                <xsl:with-param name="description"><xsl:value-of select="$string-no-images-description"/></xsl:with-param>
              </xsl:call-template>
            </xul:box>
            <xul:box flex="2"/>
          </xul:vbox>
        </xul:window>
      </ci:layoutSet>
    </xsl:if>
  </xsl:template>


  <xsl:template match="item[@ci:state='placeholder']">
    <xsl:call-template name="standard-loading-window"/>
  </xsl:template>


  <xsl:template match="item[@ci:state='thumbnail']">
    <xsl:call-template name="thumbnail-window-image-only"/>
  </xsl:template>


  <xsl:template match="item[@ci:state='thumbnail-hover']">
    <xsl:variable name="title">
      <xsl:choose>
        <xsl:when test="gphoto:albumtitle"><xsl:value-of select="gphoto:albumtitle/text()"/></xsl:when>
        <xsl:when test="title"><xsl:value-of select="title/text()"/></xsl:when>
      </xsl:choose>
    </xsl:variable>

    <xsl:call-template name="thumbnail-window-with-overlay">
      <xsl:with-param name="bottom-overlay">
        <xsl:if test="link[@rel='album'] or $title">
          <xul:hbox>
            <xsl:attribute name="style">
              <xsl:value-of select="$shaded-background"/>
            </xsl:attribute>

            <xsl:if test="link[@rel='album']">
              <xul:vbox style="-ci-align:override: end;" pack="end">
                <xul:box height="4pt"/>
                <ci:button id="badge" style="max-height: 48px">
                  <xsl:attribute name="src"><xsl:value-of select="$album-badge-uri"/></xsl:attribute>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link[@rel='album']/@href"/>
                  </xsl:attribute>
                  <xsl:attribute name="alt">
                    <xsl:value-of select="$string-goto-album"/>
                  </xsl:attribute>
                </ci:button>
              </xul:vbox>
            </xsl:if>

            <xsl:if test="$title">
              <xul:description id="title" flex="1">
                <xsl:attribute name="style">
                  padding: 4pt;
                  font-size: 11pt;
                  line-height: 110%;
                  max-height: 4em;
                  -ci-text-truncate-mode: ellipsis;
                  -ci-text-box-expand: true;
                </xsl:attribute>
                <xsl:value-of select="$title"/>
              </xul:description>
            </xsl:if>
           </xul:hbox>
         </xsl:if>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

  <!-- TODO: media:keywords copyright creation-date -->

  <xsl:template name="metadata-panel">
    <xsl:variable name="local-file-p" select="starts-with(link/text(), 'file')"/>

    <xsl:variable name="title">
      <xsl:call-template name="get-title"/>
    </xsl:variable>

    <xsl:variable name="description">
      <xsl:call-template name="get-description"/>
    </xsl:variable>

    <xul:stack>
      <xul:vbox align="end">
        <xul:hbox id="button-box" style="-ci-occlusion-group-id: right-side-metadata">
          <xul:box width="{$large-separator}"/>
          <xsl:choose>
            <xsl:when test="$local-file-p">
              <xsl:call-template name="goto-folder-button"/>
            </xsl:when>
            <xsl:otherwise>
              <xsl:call-template name="share-button"/>
              <xsl:call-template name="favorite-button"/>
              <xsl:call-template name="goto-uri-button"/>
            </xsl:otherwise>
          </xsl:choose>
        </xul:hbox>
      </xul:vbox>

      <xul:vbox>
        <xul:description id="header-text">
          <xsl:attribute name="style">
            <xsl:choose>
              <xsl:when test="@ci:state = 'selected'">
                font-size: 13pt;
                max-height: 4em;
                min-width: 200px;
              </xsl:when>
              <xsl:otherwise>
                font-size: 16pt;
                max-height: 10em;
              </xsl:otherwise>
            </xsl:choose>
            color: <xsl:value-of select="bright-foreground-color"/>;
            line-height: 110%;
            -ci-text-box-expand: true;
            -ci-text-truncate-mode: ellipsis;
            -ci-occlusion-group-idref: right-side-metadata;
          </xsl:attribute>

          <html:span style="color: {$highlight-foreground-color}; font-weight: bold;">
            <xsl:choose>
              <xsl:when test="link[@rel='album']">
                <html:a style="{$standard-link-style}">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link[@rel='album'][position()=1]/@href"/>
                  </xsl:attribute>
                  <xsl:value-of select="link[@rel='album'][position()=1]/@title"/>
                </html:a>
              </xsl:when>
              <xsl:when test="gphoto:albumtitle">
                <xsl:value-of select="gphoto:albumtitle/text()"/>
              </xsl:when>
              <xsl:otherwise>
                <xsl:copy-of select="$title"/>
              </xsl:otherwise>
            </xsl:choose>
          </html:span>

          <xsl:if test="gphoto:albumtitle and not(link[@rel='album'])">
            <html:span><xsl:text> &#x2013; from </xsl:text></html:span>
            <html:a style="{$standard-link-style}">
              <xsl:attribute name="href">
                <xsl:value-of select="link[@rel='album'][position()=1]/@href"/>
              </xsl:attribute>
              <xsl:value-of select="link[@rel='album'][position()=1]/@title"/>
            </html:a>
          </xsl:if>

          <xsl:if test="link[@rel='gallery']">
            <html:span><xsl:text> by </xsl:text></html:span>
            <html:a style="{$standard-link-style}">
              <xsl:attribute name="href">
                <xsl:value-of select="link[@rel='gallery'][position()=1]/@href"/>
              </xsl:attribute>
              <xsl:value-of select="link[@rel='gallery'][position()=1]/@title"/>
            </html:a>
          </xsl:if>
        </xul:description>

        <xsl:if test="$description">
          <xul:box height="{$medium-separator}"/>
          <xul:description id="description">
            <xsl:attribute name="style">
              line-height: 120%;
              min-width: 300px;
              max-height: 10em;
              text-align: justify;
              -ci-text-truncate-mode: ellipsis;
              -ci-text-box-expand: true;
              -ci-occlusion-group-idref: right-side-metadata;
            </xsl:attribute>
            <xsl:copy-of select="$description"/>
          </xul:description>
        </xsl:if>

        <xul:box height="{$medium-separator}"/>

        <xul:hbox id="footer" align="middle">
          <xul:description id="footer-string" flex="100">
            <xsl:attribute name="style">
              line-height: 110%;
              color: <xsl:value-of select="$bright-foreground-color"/>;
              max-height: 4em;
              -ci-text-truncate-mode: ellipsis;
            </xsl:attribute>

            <xsl:if test="gd:rating">
              <xsl:apply-templates select="gd:rating">
                <xsl:with-param name="baseline-height">3px</xsl:with-param>
              </xsl:apply-templates>
            </xsl:if>

            <xsl:if test="gphoto:width and gphoto:height">
              <xsl:if test="gd:rating">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <xsl:value-of select="gphoto:width/text()"/>×<xsl:value-of select="gphoto:height/text()"/>
            </xsl:if>

            <xsl:if test="file-size">
              <xsl:if test="gd:rating or
                            gphoto:width and gphoto:height">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <xsl:value-of select="file-size/text()"/>
            </xsl:if>

            <xsl:if test="exif:tags/exif:focallength">
              <xsl:if test="gd:rating or
                            file-size or
                            gphoto:width and gphoto:height">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <html:span>
                <xsl:value-of select="round(number(exif:tags/exif:focallength/text()))"/>
              </html:span>
              <html:span> mm</html:span>
            </xsl:if>

            <xsl:if test="exif:tags/exif:exposure">
              <xsl:if test="gd:rating or
                            file-size or
                            (gphoto:width and gphoto:height) or
                            exif:tags/exif:focallength">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <html:span>
                <xsl:choose>
                  <xsl:when test="number(exif:tags/exif:exposure/text()) &lt; 1">
                    <xsl:text>1/</xsl:text><xsl:value-of select="round(1.0 div number(exif:tags/exif:exposure/text()))"/>
                  </xsl:when>
                  <xsl:otherwise>
                    <xsl:value-of select="exif:tags/exif:exposure/text()"/>
                  </xsl:otherwise>
                </xsl:choose>
              </html:span>
              <html:span> s</html:span>
            </xsl:if>

            <xsl:if test="exif:tags/exif:fstop">
              <xsl:if test="gd:rating or
                            file-size or
                            (gphoto:width and gphoto:height) or
                            exif:tags/exif:focallength or
                            exif:tags/exif:exposure">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <html:span style="font-family: Arial;">&#x0192;</html:span><html:span>/</html:span>
              <html:span><xsl:value-of select="round(number(exif:tags/exif:fstop/text()) * 10) div 10"/></html:span>
            </xsl:if>

            <xsl:if test="exif:tags/exif:iso">
              <xsl:if test="gd:rating or
                            file-size or
                            (gphoto:width and gphoto:height) or
                            exif:tags/exif:focallength or
                            exif:tags/exif:exposure or
                            exif:tags/exif:fstop">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <xul:image id="iso-image" src="{$iso-image}" height="12px"
                         style="-ci-baseline-height: 1px; -ci-image-resize: scale-both;"/>
              <xsl:text> </xsl:text>
              <html:span><xsl:value-of select="exif:tags/exif:iso/text()"/></html:span>
            </xsl:if>

            <xsl:if test="exif:tags/exif:flash/text() = 'true'">
              <xsl:if test="gd:rating or
                            file-size or
                            (gphoto:width and gphoto:height) or
                            exif:tags/exif:focallength or
                            exif:tags/exif:exposure or
                            exif:tags/exif:fstop or
                            exif:tags/exif:iso">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <xul:image id="flash-image" src="{$flash-on-image}" height="15px"
                         alt="Flash fired"
                         style="-ci-baseline-height: 3px; -ci-image-resize: scale-both"/>
            </xsl:if>

            <xsl:if test="string-length(gphoto:location)">
              <xsl:if test="gd:rating or
                            file-size or
                            (gphoto:width and gphoto:height) or
                            exif:tags/exif:focallength or
                            exif:tags/exif:exposure or
                            exif:tags/exif:fstop or
                            exif:tags/exif:iso or
                            exif:tags/exif:flash/text() = 'true'">
                <html:span style="color: {$dark-foreground-color}"> &#x2013; </html:span>
              </xsl:if>
              <html:span><xsl:value-of select="$string-location"/>: </html:span>
              <html:span><xsl:value-of select="gphoto:location/text()"/></html:span>
            </xsl:if>
          </xul:description>

          <xul:box flex="1"/>

          <xsl:for-each select="link[@rel='explore']">
            <xul:description>
              <html:a>
                <xsl:attribute name="style">
                  <xsl:value-of select="$underlined-link-style"/>
                </xsl:attribute>
                <xsl:attribute name="href">
                  <xsl:value-of select="@href"/>
                </xsl:attribute>
                <xsl:value-of select="@title"/>
              </html:a>
            </xul:description>
            <xul:box width="4pt"/>
          </xsl:for-each>

          <xsl:apply-templates select="atom:source[atom:logo]"/>
        </xul:hbox>
      </xul:vbox>
    </xul:stack>
  </xsl:template>


  <xsl:template match="item[@ci:state='selected']">
    <xsl:call-template name="selected-window-vertical">
      <xsl:with-param name="body">
        <xsl:call-template name="metadata-panel"/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>


  <xsl:template match="item[@ci:state='full-screen']">
    <xsl:call-template name="full-screen-window">
      <xsl:with-param name="body">
        <xsl:call-template name="metadata-panel"/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

</xsl:transform>
