<?xml version="1.0" encoding="UTF-8"?>
<xsl:transform version="1.0"
               xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
               xmlns:atom="http://www.w3.org/2005/Atom"
               xmlns:media="http://search.yahoo.com/mrss/"
               xmlns:mediabroken="http://search.yahoo.com/mrss"
               xmlns:xul="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
               xmlns:html="http://www.w3.org/1999/xhtml"
               xmlns:ci="http://schemas.cooliris.com/layout/2008">

  <xsl:output method="xml" encoding="utf-8" indent="yes"/>

  <xsl:include href="resource:theme-dark.xslt"/>
  <xsl:include href="resource:common.xslt"/>


  <xsl:param name="default-feed-icon-uri">resource:/site.rss.png</xsl:param>


  <xsl:template match="/ci:feedData">
    <ci:layoutSet>
      <xul:window id="nav-bar">
        <xul:hbox align="middle">
          <xul:image>
            <xsl:attribute name="id">image-<xsl:value-of select="$ci:com.cooliris.nav-bar.icon"/></xsl:attribute>
            <xsl:attribute name="src">
              <xsl:choose>
                <xsl:when test="$ci:com.cooliris.nav-bar.icon"><xsl:value-of select="$ci:com.cooliris.nav-bar.icon"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="$default-feed-icon-uri"/></xsl:otherwise>
              </xsl:choose>
            </xsl:attribute>
            <xsl:attribute name="style">
              max-height: <xsl:value-of select="number($ci:sys.upper-toolbar-height) - 10"/>;
              -ci-image-resize: scale-down;
              -ci-content-transition: crossfade;
            </xsl:attribute>
          </xul:image>

          <xul:box width="{$large-separator}"/>

          <xul:description id="text" flex="1">
            <xsl:attribute name="style">
              <xsl:value-of select="$standard-font"/>
              font-size: 12pt;
              color: #ccc;
            </xsl:attribute>
            <xsl:value-of select="$ci:com.cooliris.nav-bar.text"/>
          </xul:description>
        </xul:hbox>
      </xul:window>

      <xul:window id="foreground">
        <xul:box/>
      </xul:window>

      <xul:window id="background">
        <xsl:choose>
          <xsl:when test="$ci:com.cooliris.gfx.background">
            <xul:box id="top" align="middle" pack="middle">
              <ci:embedGroup id="background" flex="1" style="-ci-image-resize: stretch-both;">
                <ci:embed src="{$ci:com.cooliris.gfx.background}"/>
                <ci:embed src="resource:images/transparent-pixel.png"/>
              </ci:embedGroup>
            </xul:box>
          </xsl:when>

          <xsl:otherwise>
            <xul:box id="top">
              <xsl:attribute name="style">
                -ci-background-gradient-color-1: #445;
                -ci-background-gradient-color-2: #000;
                -ci-background-gradient-angle: 10;
              </xsl:attribute>
            </xul:box>
          </xsl:otherwise>
        </xsl:choose>
      </xul:window>
    </ci:layoutSet>
  </xsl:template>


  <xsl:template match="*[local-name()='item' or local-name()='entry'][@ci:state='placeholder']">
    <xsl:call-template name="standard-loading-window"/>
  </xsl:template>


  <xsl:template match="*[local-name()='item' or local-name()='entry'][@ci:state='thumbnail' or @ci:state='thumbnail-hover']">
    <xsl:variable name="title">
      <xsl:call-template name="get-title"/>
    </xsl:variable>

    <xsl:call-template name="thumbnail-window-with-bottom-panel">
      <xsl:with-param name="body">
        <xsl:if test="$title != ''">
          <xul:vbox id="bottom-panel" flex="1">
            <xsl:attribute name="style">
              padding: <xsl:value-of select="$small-separator"/>;
              pack: -ci-no-padding;
              -ci-background-gradient-color-1: <xsl:value-of select="$saturated-background-color"/>;
              -ci-background-gradient-color-2: <xsl:value-of select="$background-color"/>;
            </xsl:attribute>

            <xul:description id="title" flex="1">
              <xsl:attribute name="style">
                color: <xsl:value-of select="$highlight-foreground-color"/>;
                line-height: 100%;
                -ci-text-truncate-mode: ellipsis;
                -ci-text-box-expand: true;
              </xsl:attribute>
              <xsl:copy-of select="$title"/>
            </xul:description>
          </xul:vbox>
        </xsl:if>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>


  <xsl:template match="*[local-name()='item' or local-name()='entry'][@ci:state='selected']">
    <xsl:variable name="content-type">
      <xsl:call-template name="content-type"/>
    </xsl:variable>

    <xsl:call-template name="selected-window-vertical">
      <xsl:with-param name="enable-interactive-mode">
        <xsl:if test="$content-type != 'OTHER'">true</xsl:if>
      </xsl:with-param>

      <xsl:with-param name="video-playback-control">
        <xsl:choose>
          <xsl:when test="$content-type = 'VIDEO'">true</xsl:when>
          <xsl:otherwise>false</xsl:otherwise>
        </xsl:choose>
      </xsl:with-param>

      <xsl:with-param name="body">
        <xsl:call-template name="standard-metadata-panel"/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>


  <xsl:template match="*[local-name()='item' or local-name()='entry'][@ci:state='full-screen']">
    <xsl:variable name="content-type">
      <xsl:call-template name="content-type"/>
    </xsl:variable>

    <xsl:call-template name="full-screen-window">
      <xsl:with-param name="enable-interactive-mode">
        <xsl:if test="$content-type != 'OTHER'">true</xsl:if>
      </xsl:with-param>

      <xsl:with-param name="video-playback-control">
        <xsl:if test="$content-type = 'VIDEO'">true</xsl:if>
      </xsl:with-param>

      <xsl:with-param name="exclude-toolbar-areas">
        <xsl:if test="$content-type = 'FLASH'">true</xsl:if>
      </xsl:with-param>

      <xsl:with-param name="body">
        <xsl:call-template name="standard-metadata-panel"/>
      </xsl:with-param>
    </xsl:call-template>
  </xsl:template>

</xsl:transform>
