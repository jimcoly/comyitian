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


  <!-- INPUT PARAMETERS -->

  <xsl:param name="ci:com.cooliris.favorite"/>
  <xsl:param name="ci:com.cooliris.gfx.background"/>
  <xsl:param name="ci:com.cooliris.nav-bar.icon"/>
  <xsl:param name="ci:com.cooliris.nav-bar.text"/>

  <xsl:param name="ci:sys.client-revision"/>
  <xsl:param name="ci:sys.client-browser"/>
  <xsl:param name="ci:sys.toolbars-visible"/>
  <xsl:param name="ci:sys.flash-version"/>
  <xsl:param name="ci:sys.upper-toolbar-height"/>
  <xsl:param name="ci:sys.wall-lower-toolbar-height"/>
  <xsl:param name="ci:sys.fullscreen-lower-toolbar-height"/>


  <!-- RESOURCE URLS -->

  <xsl:param name="video-badge-uri">resource:images/badge.play.png</xsl:param>
  <xsl:param name="flash-badge-uri">resource:images/badge.play.png</xsl:param>
  <xsl:param name="album-badge-uri">resource:images/badge.album.png</xsl:param>


  <!-- STRINGS -->

  <xsl:include href="resource:strings-$(sys.locale).xslt"/>


  <!-- COMMON STYLES -->

  <xsl:param name="standard-selected-content-style">
    min-height: 400px;
    -ci-image-resize: scale-both;
    -ci-load-mode: async;
    -ci-z-order: 1;
  </xsl:param>

  <xsl:param name="standard-link-style">
    white-space: nowrap;
    color: <xsl:value-of select="$link-color"/>;
    -ci-color-hover: <xsl:value-of select="$link-color-hover"/>;
    -ci-color-clicked: <xsl:value-of select="$link-color-clicked"/>;
    -ci-text-truncate-mode: ellipsis;
    -ci-text-box-expand: true;
    -ci-text-decoration-hover: underline;
    -ci-text-decoration-clicked: underline;
  </xsl:param>

  <xsl:param name="underlined-link-style">
    <xsl:value-of select="$standard-link-style"/>
    text-decoration: underline;
  </xsl:param>

  <xsl:param name="shaded-background">
    color: #fff;
    -ci-background-gradient-color-1: #000;
    -ci-background-gradient-color-2: #222;
    -ci-background-gradient-opacity-1: 0.7;
    -ci-background-gradient-opacity-2: 0.9;
  </xsl:param>


  <!-- DATA EXTRACTION TEMPLATES -->

  <xsl:template name="content-type">
    <xsl:choose>
      <xsl:when test="media:content/@type='video/x-flv' or
                      mediabroken:content/@type='video/x-flv' or
                      media:content/@type='video/flv' or
                      mediabroken:content/@type='video/flv'">VIDEO</xsl:when>
      <xsl:when test="media:content/@type='application/x-shockwave-flash' or
                      mediabroken:content/@type='application/x-shockwave-flash'">FLASH</xsl:when>
      <xsl:otherwise>OTHER</xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="get-link-uri">
    <xsl:choose>
      <xsl:when test="atom:link[@rel='alternate' and @type='text/html']"><xsl:value-of select="atom:link[@rel='alternate' and @type='text/html']/@href"/></xsl:when>
      <xsl:when test="link[@rel='alternate' and @type='text/html']"><xsl:value-of select="link[@rel='alternate' and @type='text/html']/@href"/></xsl:when>
      <xsl:when test="atom:link[@rel='alternate']"><xsl:value-of select="atom:link[@rel='alternate']/@href"/></xsl:when>
      <xsl:when test="link[@rel='alternate']"><xsl:value-of select="link[@rel='alternate']/@href"/></xsl:when>
      <xsl:otherwise><xsl:value-of select="link/text()"/></xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="get-title">
    <xsl:apply-templates select="title/text()" mode="sanitize"/>
  </xsl:template>


  <xsl:template name="get-description">
    <xsl:choose>
      <xsl:when test="description[not(contains(text(), '&lt;img')) and not(contains(text(), '&lt;a ')) and not(contains(text(), '&lt;p>'))]">
        <xsl:apply-templates select="description/text() | description/*" mode="sanitize"/>
      </xsl:when>
      <xsl:when test="media:description[not(@type='html')]">
        <xsl:apply-templates select="media:description/text() | media:description/*" mode="sanitize"/>
      </xsl:when>
    </xsl:choose>
  </xsl:template>


  <!-- CALL-BY-NAME TEMPLATES -->

  <xsl:template name="message-box">
    <xsl:param name="title"/>
    <xsl:param name="description"/>

    <xul:stack style="-ci-auto-size: message-box-body;">
      <xul:image id="message-box-background" src="resource:images/status-panel-gray.png" style="-ci-9-grid: 25 40 38 40;"/>
      <xul:vbox id="message-box-body" style="margin: 40px;">
        <xul:description id="message-box-body-inner" style="-ci-text-box-expand: true;">
          <html:p>
            <xsl:attribute name="style">
              font-size: 16pt;
              line-height: 100%;
              color: <xsl:value-of select="$highlight-foreground-color"/>;
              -ci-paragraph-spacing: 12pt;
            </xsl:attribute>
            <html:span><xsl:copy-of select="$title"/></html:span>
          </html:p>
          <html:p>
            <xsl:attribute name="style">
              font-size: 12pt;
              color: <xsl:value-of select="$foreground-color"/>;
            </xsl:attribute>
            <html:span><xsl:copy-of select="$description"/></html:span>
          </html:p>
        </xul:description>
        <xul:box height="6pt"/>
      </xul:vbox>
    </xul:stack>
  </xsl:template>


  <xsl:template name="share-button">
    <ci:button id="kButtonMetadataStartMessage" alt="{$string-tooltip-share-button}" animate-mouse-out="{$animate-buttons}"
               src="{$button-share-src}" hover-src="{$button-share-hover-src}"
               pressed-src="{$button-share-pressed-src}" clicked-src="{$button-share-clicked-src}"
               style="max-height: 32px">
      <ci:call-method scope="item" name="share-item"/>
    </ci:button>
  </xsl:template>


  <xsl:template name="favorite-button">
    <xsl:choose>
      <xsl:when test="$ci:com.cooliris.favorite = 'true'">
        <ci:button id="kButtonMetadataStar" alt="{$string-tooltip-favorite-on-button}" animate-mouse-out="{$animate-buttons}"
                   src="{$button-favorite-on-src}" hover-src="{$button-favorite-on-hover-src}"
                   pressed-src="{$button-favorite-on-pressed-src}" clicked-src="{$button-favorite-on-clicked-src}"
                   style="max-height: 32px">
          <ci:set-property scope="item" name="com.cooliris.favorite"/>
        </ci:button>
      </xsl:when>
      <xsl:otherwise>
        <ci:button id="kButtonMetadataStar" alt="{$string-tooltip-favorite-off-button}" animate-mouse-out="{$animate-buttons}"
                   src="{$button-favorite-off-src}" hover-src="{$button-favorite-off-hover-src}"
                   pressed-src="{$button-favorite-off-pressed-src}" clicked-src="{$button-favorite-off-clicked-src}"
                   style="max-height: 32px">
          <ci:set-property scope="item" name="com.cooliris.favorite" value="true"/>
        </ci:button>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="goto-uri-button">
    <xsl:param name="link-uri">
      <xsl:call-template name="get-link-uri"/>
    </xsl:param>

    <xsl:if test="$link-uri != ''">
      <ci:button id="kButtonMetadataAttribution" alt="{$string-tooltip-goto-uri-button}" animate-mouse-out="{$animate-buttons}"
                 src="{$button-goto-uri-src}" hover-src="{$button-goto-uri-hover-src}"
                 pressed-src="{$button-goto-uri-pressed-src}" clicked-src="{$button-goto-uri-clicked-src}"
                 style="max-height: 32px"
                 href="{$link-uri}"/>
    </xsl:if>
  </xsl:template>


  <xsl:template name="goto-folder-button">
    <xsl:param name="link-uri">
      <xsl:call-template name="get-link-uri"/>
    </xsl:param>

    <xsl:if test="$link-uri != ''">
      <ci:button id="kButtonMetadataAttribution" alt="{$string-tooltip-goto-uri-button-local}" animate-mouse-out="{$animate-buttons}"
                 src="{$button-goto-uri-src}" hover-src="{$button-goto-uri-hover-src}"
                 pressed-src="{$button-goto-uri-pressed-src}" clicked-src="{$button-goto-uri-clicked-src}"
                 style="max-height: 32px"
                 href="{$link-uri}"/>
    </xsl:if>
  </xsl:template>


  <xsl:template name="light-share-button">
    <ci:button id="kButtonMetadataStartMessage" alt="{$string-tooltip-share-button}" animate-mouse-out="false"
               src="{$light-button-share-src}" hover-src="{$light-button-share-hover-src}"
               pressed-src="{$light-button-share-pressed-src}" clicked-src="{$light-button-share-clicked-src}"
               style="max-height: 32px">
      <ci:call-method scope="item" name="share-item"/>
    </ci:button>
  </xsl:template>


  <xsl:template name="light-favorite-button">
    <xsl:choose>
      <xsl:when test="$ci:com.cooliris.favorite = 'true'">
        <ci:button id="kButtonMetadataStar" alt="{$string-tooltip-favorite-on-button}" animate-mouse-out="false"
                   src="{$light-button-favorite-on-src}" hover-src="{$light-button-favorite-on-hover-src}"
                   pressed-src="{$light-button-favorite-on-pressed-src}" clicked-src="{$light-button-favorite-on-clicked-src}"
                   style="max-height: 32px">
          <ci:set-property scope="item" name="com.cooliris.favorite"/>
        </ci:button>
      </xsl:when>
      <xsl:otherwise>
        <ci:button id="kButtonMetadataStar" alt="{$string-tooltip-favorite-off-button}" animate-mouse-out="false"
                   src="{$light-button-favorite-off-src}" hover-src="{$light-button-favorite-off-hover-src}"
                   pressed-src="{$light-button-favorite-off-pressed-src}" clicked-src="{$light-button-favorite-off-clicked-src}"
                   style="max-height: 32px">
          <ci:set-property scope="item" name="com.cooliris.favorite" value="true"/>
        </ci:button>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template name="light-goto-uri-button">
    <xsl:param name="link-uri">
      <xsl:call-template name="get-link-uri"/>
    </xsl:param>

    <xsl:if test="$link-uri != ''">
      <ci:button id="kButtonMetadataAttribution" alt="{$string-tooltip-goto-uri-button}" animate-mouse-out="false"
                 src="{$light-button-goto-uri-src}" hover-src="{$light-button-goto-uri-hover-src}"
                 pressed-src="{$light-button-goto-uri-pressed-src}" clicked-src="{$light-button-goto-uri-clicked-src}"
                 style="max-height: 32px"
                 href="{$link-uri}"/>
    </xsl:if>
  </xsl:template>


  <xsl:template name="thumbnail-content-box">
    <xsl:param name="custom-badge"/>
    <xsl:param name="use-custom-badge-fragment"/>
    <xsl:param name="suppress-content-type-badge"/>

    <xsl:variable name="content-type">
      <xsl:call-template name="content-type"/>
    </xsl:variable>

    <xul:hbox id="content-box" flex="1" pack="-ci-no-padding" style="min-width: 150px; -ci-priority: notrim; -ci-pack-overflow: center">
      <xul:stack id="content-stack" flex="1">
        <xsl:attribute name="style">
          -ci-z-order: 1;
          -ci-auto-size: content!placeholder;
        </xsl:attribute>

        <xsl:choose>
          <xsl:when test="media:thumbnail or mediabroken:thumbnail">
            <xsl:apply-templates select="media:thumbnail[position() = 1] | mediabroken:thumbnail[position() = 1]"/>
          </xsl:when>
          <xsl:when test="media:content or mediabroken:content">
            <xsl:apply-templates select="media:content | mediabroken:content" mode="thumbnail"/>>
          </xsl:when>
        </xsl:choose>

        <xul:vbox style="align: start; pack: end">
          <xsl:choose>
            <xsl:when test="string-length($custom-badge)">
              <xul:image id="badge" style="opacity: 0.8; max-width: 48px; -ci-image-resize: scale-both;">
                <xsl:attribute name="src"><xsl:value-of select="$custom-badge"/></xsl:attribute>
              </xul:image>
            </xsl:when>

            <xsl:when test="$use-custom-badge-fragment = 'true'">
              <xsl:copy-of select="$custom-badge"/>
            </xsl:when>

            <xsl:when test="$content-type != 'OTHER' and $suppress-content-type-badge != 'true'">
              <xul:image id="badge" style="opacity: 0.8; max-width: 48px; -ci-image-resize: scale-both;">
                <xsl:attribute name="src">
                  <xsl:choose>
                    <xsl:when test="$content-type = 'VIDEO'">
                      <xsl:value-of select="$video-badge-uri"/>
                    </xsl:when>
                    <xsl:when test="$content-type = 'FLASH'">
                      <xsl:value-of select="$flash-badge-uri"/>
                    </xsl:when>
                  </xsl:choose>
                </xsl:attribute>
              </xul:image>
            </xsl:when>
          </xsl:choose>
        </xul:vbox>
      </xul:stack>
    </xul:hbox>
  </xsl:template>


  <xsl:template name="standard-metadata-panel">
    <xsl:variable name="timestamp">
      <xsl:value-of select="pubdate/text()"/>
    </xsl:variable>

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
          <xsl:call-template name="share-button"/>
          <xsl:call-template name="favorite-button"/>
          <xsl:call-template name="goto-uri-button"/>
        </xul:hbox>
        <xsl:if test="atom:source[atom:logo]">
          <xul:box flex="1"/>
          <xul:hbox id="logo-box" style="-ci-occlusion-group-id: right-side-metadata">
            <xul:box width="{$large-separator}"/>
            <xsl:apply-templates select="atom:source[atom:logo]"/>
          </xul:hbox>
        </xsl:if>
      </xul:vbox>

      <xul:vbox>
        <xsl:if test="$title">
          <xsl:if test="string-length($description) = 0">
            <xul:box height="{$small-separator}"/>
          </xsl:if>

          <xul:description id="title">
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
              color: <xsl:value-of select="$highlight-foreground-color"/>;
              font-weight: bold;
              line-height: 110%;
              -ci-text-box-expand: true;
              -ci-text-truncate-mode: ellipsis;
              -ci-occlusion-group-idref: right-side-metadata;
            </xsl:attribute>

            <xsl:copy-of select="$title"/>
          </xul:description>
        </xsl:if>

        <xsl:if test="$description">
          <xul:box height="{$tiny-separator}"/>
          <xul:description id="description">
            <xsl:attribute name="style">
              <xsl:choose>
                <xsl:when test="@ci:state = 'selected'">
                  max-height: 10em;
                  min-width: 300px;
                  -ci-text-box-expand: true;
                </xsl:when>
                <xsl:otherwise>
                  max-height: 20em;
                </xsl:otherwise>
              </xsl:choose>
              line-height: 120%;
              text-align: justify;
              -ci-text-truncate-mode: ellipsis;
              -ci-occlusion-group-idref: right-side-metadata;
            </xsl:attribute>

            <xsl:copy-of select="$description"/>
          </xul:description>
        </xsl:if>
      </xul:vbox>
    </xul:stack>
  </xsl:template>


  <!-- CALL-BY-MATCH TEMPLATES FOR COMMON ELEMENTS -->

  <xsl:template match="media:thumbnail | mediabroken:thumbnail">
    <xsl:param name="additional-styles"/>

    <ci:embed id="content!placeholder" flex="1">
      <xsl:attribute name="style">
        -ci-image-resize: scale-both;
        -ci-z-order: 1;
        <xsl:value-of select="$additional-styles"/>
      </xsl:attribute>

      <xsl:if test="@url">
        <xsl:attribute name="src">
          <xsl:value-of select="@url"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:copy-of select="@ci:referer"/>

      <xsl:if test="@type">
        <xsl:attribute name="type">
          <xsl:value-of select="@type"/>
        </xsl:attribute>
      </xsl:if>
    </ci:embed>
  </xsl:template>


  <xsl:template match="media:content | mediabroken:content" mode="thumbnail">
    <xsl:param name="additional-styles"/>

    <ci:embed id="content!placeholder" flex="1">
      <xsl:attribute name="style">
        -ci-image-resize: scale-both;
        -ci-z-order: 1;
        <xsl:value-of select="$additional-styles"/>
      </xsl:attribute>

      <xsl:if test="@url">
        <xsl:attribute name="src">
          <xsl:value-of select="@url"/>
        </xsl:attribute>
      </xsl:if>

      <xsl:copy-of select="@ci:referer"/>

      <xsl:if test="@type">
        <xsl:attribute name="type">
          <xsl:value-of select="@type"/>
        </xsl:attribute>
      </xsl:if>
    </ci:embed>
  </xsl:template>


  <xsl:template match="media:content | mediabroken:content">
    <xsl:param name="id"/>
    <xsl:param name="selected-content-style" select="$standard-selected-content-style"/>
    <xsl:param name="scale-factor" select="1.0"/>

    <xsl:choose>
      <xsl:when test="(string-length($ci:sys.flash-version) and $ci:sys.flash-version != 'unsupported')
                      or not(@type = 'application/x-shockwave-flash')">
        <ci:embed flex="1">
          <xsl:attribute name="id">
            <xsl:value-of select="$id"/>
          </xsl:attribute>

          <xsl:attribute name="style">
            <xsl:value-of select="$selected-content-style"/>
            <xsl:if test="@width">
              -ci-image-width: <xsl:value-of select="number(@width) * number($scale-factor)"/>;
            </xsl:if>
            <xsl:if test="@height">
              -ci-image-height: <xsl:value-of select="number(@height) * number($scale-factor)"/>;
            </xsl:if>
          </xsl:attribute>

          <xsl:if test="@url">
            <xsl:attribute name="src">
              <xsl:value-of select="@url"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:copy-of select="@ci:referer"/>

          <xsl:if test="@type">
            <xsl:attribute name="type">
              <xsl:value-of select="@type"/>
            </xsl:attribute>
          </xsl:if>
        </ci:embed>
      </xsl:when>

      <xsl:otherwise>
        <xul:stack flex="1">
          <xul:hbox id="thumbnail-container" pack="middle" align="middle">
            <xsl:apply-templates select="../media:thumbnail | ../mediabroken:thumbnail"/>
          </xul:hbox>

          <xul:hbox id="no-flash-message-container" pack="middle" align="middle"
                    style="background-color: {$background-color}; opacity: 0.6; -ci-z-order: 2">
            <xul:description id="no-flash-message">
              <xsl:attribute name="style">
                font-family: Arial; font-size: 15pt; color: <xsl:value-of select="$highlight-foreground-color"/>;
                background-color: <xsl:value-of select="$highlight-background-color"/>;
                padding: 16pt; border-color: <xsl:value-of select="$bright-foreground-color"/>;
              </xsl:attribute>
              <xsl:choose>
                <xsl:when test="$ci:sys.flash-version = 'unsupported'">
                  <xsl:value-of select="$string-flash-unsupported-message"/>
                </xsl:when>
                <xsl:otherwise>
                  <xsl:value-of select="$string-no-flash-message"/>
                </xsl:otherwise>
              </xsl:choose>
            </xul:description>
          </xul:hbox>
        </xul:stack>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <xsl:template match="media:group | mediabroken:group">
    <xsl:param name="selected-content-style" select="$standard-selected-content-style"/>
    <xsl:param name="scale-factor" select="1.0"/>

    <ci:embedGroup id="content!placeholder" flex="1">
      <xsl:attribute name="style">
        <xsl:value-of select="$selected-content-style"/>
      </xsl:attribute>

      <xsl:apply-templates select="media:content | mediabroken:content">
        <xsl:with-param name="scale-factor" select="$scale-factor"/>
      </xsl:apply-templates>
    </ci:embedGroup>
  </xsl:template>


  <xsl:template match="gd:rating[@value or @average][@max]">
    <xsl:param name="id-prefix"/>
    <xsl:param name="height">16px</xsl:param>
    <xsl:param name="baseline-height"/>
    <xsl:param name="additional-styles"/>

    <xsl:variable name="rating-value">
      <xsl:choose>
        <xsl:when test="@value"><xsl:value-of select="@value"/></xsl:when>
        <xsl:when test="@average"><xsl:value-of select="@average"/></xsl:when>
      </xsl:choose>
    </xsl:variable>
    <xsl:variable name="value" select="ceiling(number($rating-value) * 10 div number(@max))"/>

    <xul:hbox id="{$id-prefix}-rating" align="middle">
      <xsl:attribute name="style">
        pack: -ci-no-padding;
        height: <xsl:value-of select="$height"/>;
        <xsl:if test="$baseline-height">-ci-baseline-height: <xsl:value-of select="$baseline-height"/>;</xsl:if>
      </xsl:attribute>

      <xul:image id="{$id-prefix}-star-1" flex="1" style="-ci-image-resize: scale-both;">
        <xsl:attribute name="src">
          <xsl:choose>
            <xsl:when test="$value >= 2"><xsl:value-of select="$full-star-image-uri"/></xsl:when>
            <xsl:when test="$value >= 1"><xsl:value-of select="$half-star-image-uri"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$empty-star-image-uri"/></xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xul:image>

      <xul:image id="{$id-prefix}-star-2" flex="1" style="-ci-image-resize: scale-both;">
        <xsl:attribute name="src">
          <xsl:choose>
            <xsl:when test="$value >= 4"><xsl:value-of select="$full-star-image-uri"/></xsl:when>
            <xsl:when test="$value >= 3"><xsl:value-of select="$half-star-image-uri"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$empty-star-image-uri"/></xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xul:image>

      <xul:image id="{$id-prefix}-star-3" flex="1" style="-ci-image-resize: scale-both;">
        <xsl:attribute name="src">
          <xsl:choose>
            <xsl:when test="$value >= 6"><xsl:value-of select="$full-star-image-uri"/></xsl:when>
            <xsl:when test="$value >= 5"><xsl:value-of select="$half-star-image-uri"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$empty-star-image-uri"/></xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xul:image>

      <xul:image id="{$id-prefix}-star-4" flex="1" style="-ci-image-resize: scale-both;">
        <xsl:attribute name="src">
          <xsl:choose>
            <xsl:when test="$value >= 8"><xsl:value-of select="$full-star-image-uri"/></xsl:when>
            <xsl:when test="$value >= 7"><xsl:value-of select="$half-star-image-uri"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$empty-star-image-uri"/></xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xul:image>

      <xul:image id="{$id-prefix}-star-5" flex="1" style="-ci-image-resize: scale-both;">
        <xsl:attribute name="src">
          <xsl:choose>
            <xsl:when test="$value >= 10"><xsl:value-of select="$full-star-image-uri"/></xsl:when>
            <xsl:when test="$value >= 9"><xsl:value-of select="$half-star-image-uri"/></xsl:when>
            <xsl:otherwise><xsl:value-of select="$empty-star-image-uri"/></xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
      </xul:image>
    </xul:hbox>
  </xsl:template>


  <xsl:template match="atom:source[atom:logo]">
    <xsl:param name="id">site-logo</xsl:param>

    <xsl:variable name="id-marker">
      <xsl:if test="$id = 'site-logo'"><xsl:value-of select="atom:link[@rel='pivot']/@href"/></xsl:if>
    </xsl:variable>

    <xsl:choose>
      <xsl:when test="atom:link[@rel='pivot']">
        <ci:button id="{$id}-{$id-marker}" animate-mouse-out="true" style="max-height: 36px">
          <xsl:attribute name="href"><xsl:value-of select="atom:link[@rel='pivot']/@href"/></xsl:attribute>

          <xsl:if test="atom:link[@rel='pivot']/@title">
            <xsl:attribute name="alt">
              <xsl:value-of select="atom:link[@rel='pivot']/@title"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:attribute name="src">
            <xsl:value-of select="atom:logo/text()"/>
          </xsl:attribute>
          <xsl:attribute name="hover-src">
            <xsl:value-of select="atom:logo/text()"/>
          </xsl:attribute>
          <xsl:attribute name="pressed-src">
            <xsl:value-of select="atom:logo/text()"/>
          </xsl:attribute>
          <xsl:attribute name="clicked-src">
            <xsl:value-of select="atom:logo/text()"/>
          </xsl:attribute>
        </ci:button>
      </xsl:when>

      <!-- Hi Mom! -->

      <xsl:otherwise>
        <xul:image id="{$id}" height="24px" style="-ci-image-resize: scale-both">
          <xsl:attribute name="src">
            <xsl:value-of select="atom:logo/text()"/>
          </xsl:attribute>
        </xul:image>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>


  <!-- Simpler icon template for an additional small non-link badge -->
  <xsl:template match="atom:source[atom:icon]">
    <xsl:param name="id">site-icon</xsl:param>
    <xul:image id="{$id}" height="24px" style="-ci-image-resize: scale-both">
      <xsl:attribute name="src">
        <xsl:value-of select="atom:icon/text()"/>
      </xsl:attribute>
    </xul:image>
  </xsl:template>


  <!-- HTML CLEANUP TEMPLATES -->

  <xsl:template match="html:em" mode="sanitize">
    <xsl:apply-templates select="* | text()"/>
  </xsl:template>

  <xsl:template match="html:a" mode="sanitize">
    <html:a>
      <xsl:attribute name="href"><xsl:value-of select="@href"/></xsl:attribute>
      <xsl:attribute name="style">
        color: <xsl:choose><xsl:when test="starts-with(@href, 'jsfeed:')">#79f</xsl:when><xsl:otherwise>#78a</xsl:otherwise></xsl:choose> ;
        -ci-color-hover: #9bf;
        -ci-color-clicked: #f9f;
        -ci-text-decoration-hover: underline;
      </xsl:attribute>
      <xsl:copy-of select="text()"/>
    </html:a>
  </xsl:template>

  <xsl:template match="html:small" mode="sanitize">
    <html:span style="font-size: 4pt;">
      <xsl:copy-of select="* | text()"/>
    </html:span>
  </xsl:template>

  <xsl:template match="html:div" mode="sanitize">
    <html:span>
      <xsl:copy-of select="* | text()"/>
    </html:span>
  </xsl:template>


  <!-- TOP-LEVEL TEMPLATES -->

  <xsl:template name="standard-loading-window">
    <xsl:param name="color-1" select="'#445'"/>
    <xsl:param name="color-2" select="'#000'"/>

    <xul:window>
      <xul:vbox id="top">
        <xsl:attribute name="style">
          -ci-window-frame-style: shadow;
          align: center;
          pack: center;
          -ci-background-gradient-color-1: <xsl:value-of select="$color-1"/>;
          -ci-background-gradient-color-2: <xsl:value-of select="$color-2"/>;
        </xsl:attribute>
      </xul:vbox>
    </xul:window>
  </xsl:template>


  <xsl:template name="thumbnail-window-image-only">
    <xul:window style="-ci-window-frame-style: shadow;">
      <xsl:choose>
        <xsl:when test="media:thumbnail or mediabroken:thumbnail">
          <xsl:apply-templates select="media:thumbnail[position() = 1] | mediabroken:thumbnail[position() = 1]"/>
        </xsl:when>
        <xsl:when test="media:content or mediabroken:content">
          <xsl:apply-templates select="media:content | mediabroken:content" mode="thumbnail"/>
        </xsl:when>
      </xsl:choose>
    </xul:window>
  </xsl:template>


  <xsl:template name="thumbnail-window-with-overlay">
    <xsl:param name="top-overlay"/>
    <xsl:param name="bottom-overlay"/>
    <xsl:param name="custom-badge"/>
    <xsl:param name="use-custom-badge-fragment"/>
    <xsl:param name="suppress-content-type-badge"/>

    <xul:window>
      <xul:stack id="top">
        <xsl:attribute name="style">
          -ci-window-frame-style: shadow;
          -ci-auto-size: content-box;
          -ci-background-gradient-color-1: <xsl:value-of select="$highlight-background-color"/>;
          -ci-background-gradient-color-2: <xsl:value-of select="$background-color"/>;
          -ci-z-order: 1;
          color: <xsl:value-of select="$foreground-color"/>;
          <xsl:value-of select="$standard-font"/>
          font-size: 10pt;
          line-height: 120%;
        </xsl:attribute>

        <xsl:call-template name="thumbnail-content-box">
          <xsl:with-param name="custom-badge"><xsl:copy-of select="$custom-badge"/></xsl:with-param>
          <xsl:with-param name="use-custom-badge-fragment"><xsl:copy-of select="$use-custom-badge-fragment"/></xsl:with-param>
          <xsl:with-param name="suppress-content-type-badge" select="$suppress-content-type-badge"/>
        </xsl:call-template>

        <xul:vbox>
          <xsl:copy-of select="$top-overlay"/>
          <xul:box flex="1"/>
          <xsl:copy-of select="$bottom-overlay"/>
        </xul:vbox>
      </xul:stack>
    </xul:window>
  </xsl:template>


  <xsl:template name="thumbnail-window-with-bottom-panel">
    <xsl:param name="body"/>
    <xsl:param name="custom-badge"/>
    <xsl:param name="use-custom-badge-fragment"/>
    <xsl:param name="suppress-content-type-badge"/>

    <xul:window>
      <xul:vbox id="top">
        <xsl:attribute name="style">
          -ci-window-frame-style: shadow;
          align: middle;
          pack: -ci-no-padding;
          -ci-auto-size: content-box;
          -ci-background-gradient-color-1: <xsl:value-of select="$highlight-background-color"/>;
          -ci-background-gradient-color-2: <xsl:value-of select="$background-color"/>;
          color: <xsl:value-of select="$foreground-color"/>;
          <xsl:value-of select="$standard-font"/>
          font-size: 10pt;
          line-height: 120%;
        </xsl:attribute>

        <xsl:call-template name="thumbnail-content-box">
          <xsl:with-param name="custom-badge"><xsl:copy-of select="$custom-badge"/></xsl:with-param>
          <xsl:with-param name="use-custom-badge-fragment"><xsl:copy-of select="$use-custom-badge-fragment"/></xsl:with-param>
          <xsl:with-param name="suppress-content-type-badge" select="$suppress-content-type-badge"/>
        </xsl:call-template>

        <xsl:copy-of select="$body"/>
      </xul:vbox>
    </xul:window>
  </xsl:template>

  <xsl:template name="selected-window-vertical">
    <xsl:param name="content-panel-override"/>
    <xsl:param name="header"/>
    <xsl:param name="body"/>
    <xsl:param name="footer"/>
    <xsl:param name="enable-interactive-mode" select="false"/>
    <xsl:param name="video-playback-control" select="false"/>
    <xsl:param name="scale-factor" select="1.0"/>

    <xul:window>
      <xul:vbox id="top">
        <xsl:attribute name="style">
          pack: -ci-no-padding;
          align: center;
          -ci-auto-size: content!placeholder;
          background-color: <xsl:value-of select="$background-color"/>;
          padding: <xsl:value-of select="$medium-separator"/>;
          -ci-window-frame-style: shadow;
          pack: -ci-no-padding;
          align: middle;
          color: <xsl:value-of select="$foreground-color"/>;
          border-width: 1px;
          border-color: <xsl:value-of select="$dark-foreground-color"/>;
          <xsl:value-of select="$standard-font"/>
          font-size: 11pt;
          line-height: 120%;
          <xsl:if test="$enable-interactive-mode = 'true'">
            -ci-enable-interactive-mode: true;
          </xsl:if>
        </xsl:attribute>

        <xsl:choose>
          <xsl:when test="$content-panel-override">
            <xsl:copy-of select="$content-panel-override"/>
          </xsl:when>
          <xsl:when test="media:group | mediabroken:group">
            <xsl:apply-templates select="media:group | mediabroken:group"/>
          </xsl:when>
          <xsl:otherwise>
            <xsl:apply-templates select="media:content | mediabroken:content">
              <xsl:with-param name="id">content!placeholder</xsl:with-param>
              <xsl:with-param name="scale-factor" select="$scale-factor"/>
            </xsl:apply-templates>
          </xsl:otherwise>
        </xsl:choose>

        <xsl:if test="$video-playback-control = 'true'">
          <ci:videoPlaybackControl id="video-playback-control" idref="content!placeholder"/>
        </xsl:if>

        <xul:vbox id="metadata-panel">
          <xul:box height="{$medium-separator}"/>
          <xsl:copy-of select="$header"/>
          <xsl:copy-of select="$body"/>
          <xsl:copy-of select="$footer"/>
        </xul:vbox>
      </xul:vbox>
    </xul:window>
  </xsl:template>


  <xsl:template name="full-screen-window">
    <xsl:param name="content-panel-override"/>
    <xsl:param name="header"/>
    <xsl:param name="body"/>
    <xsl:param name="footer"/>
    <xsl:param name="enable-interactive-mode" select="false"/>
    <xsl:param name="video-playback-control" select="false"/>
    <xsl:param name="exclude-toolbar-areas" select="false"/>
    <xsl:param name="fill-screen-override" select="false"/>
    <xsl:param name="text-flow"/>
    <xsl:param name="scale-factor" select="1.0"/>

    <xsl:variable name="content">
      <xsl:choose>
        <xsl:when test="$content-panel-override">
          <xsl:copy-of select="$content-panel-override"/>
        </xsl:when>

        <xsl:when test="media:group | mediabroken:group">
          <xsl:apply-templates select="media:group | mediabroken:group">
            <xsl:with-param name="selected-content-style">
              min-width: 10em;
              min-height: 10em;
              -ci-image-resize: scale-both;
              -ci-load-mode: sync;
              -ci-z-order: 1;
            </xsl:with-param>
          </xsl:apply-templates>
        </xsl:when>

        <xsl:otherwise>
          <xsl:apply-templates select="media:content | mediabroken:content">
            <xsl:with-param name="id">content!placeholder</xsl:with-param>
            <xsl:with-param name="selected-content-style">
              min-width: 10em;
              min-height: 10em;
              -ci-image-resize: scale-both;
              -ci-load-mode: sync;
              -ci-z-order: 1;
            </xsl:with-param>
            <xsl:with-param name="scale-factor" select="$scale-factor"/>
          </xsl:apply-templates>
        </xsl:otherwise>
      </xsl:choose>
    </xsl:variable>

    <xsl:variable name="metadata-layer">
      <xul:vbox id="metadata-frame" flex="1">
        <xsl:if test="$video-playback-control = 'true'">
          <ci:videoPlaybackControl id="video-playback-control" idref="content!placeholder"/>
          <xul:box height="{$large-separator}"/>
        </xsl:if>

        <xsl:copy-of select="$header"/>
        <xsl:copy-of select="$body"/>
        <xsl:copy-of select="$footer"/>
      </xul:vbox>
    </xsl:variable>

    <xul:window>
      <xul:stack id="top">
        <xsl:attribute name="style">
          -ci-window-frame-style: none;
          background-color: <xsl:value-of select="$saturated-background-color"/>;
          <xsl:choose>
            <xsl:when test="$ci:sys.toolbars-visible = 'true'">
              -ci-background-gradient-color-1: #445;
              -ci-background-gradient-color-2: #000;
              -ci-background-gradient-angle: 10;
            </xsl:when>
            <xsl:otherwise>
              -ci-background-gradient-color-1: #11111a;
              -ci-background-gradient-color-2: #000;
              -ci-background-gradient-angle: 9.4;
            </xsl:otherwise>
          </xsl:choose>
          color: <xsl:value-of select="$foreground-color"/>;
          <xsl:value-of select="$standard-font"/>
          font-size: 14pt;
          line-height: 120%;
          <xsl:if test="$enable-interactive-mode = 'true'">
            -ci-enable-interactive-mode: true;
          </xsl:if>
        </xsl:attribute>

        <xsl:choose>
          <xsl:when test="$ci:sys.toolbars-visible = 'true' or
                          ($enable-interactive-mode = 'true' and $exclude-toolbar-areas = 'true' and not($fill-screen-override = 'true'))">
            <xul:vbox id="content-layer" align="center" pack="middle">
              <xsl:if test="$exclude-toolbar-areas = 'true'">
                <xul:box id="upper-toolbar-overlay">
                  <xsl:attribute name="style">
                    height: <xsl:value-of select="$ci:sys.upper-toolbar-height"/>px;
                  </xsl:attribute>
                </xul:box>
              </xsl:if>

              <xsl:choose>
                <xsl:when test="$exclude-toolbar-areas = 'true'">
                  <xul:vbox flex="1" align="center">
                    <xsl:copy-of select="$content"/>

                    <xul:box height="{$large-separator}"/>
                    <xul:hbox id="metadata-section">
                      <xsl:attribute name="style">
                        background-color: <xsl:value-of select="$background-color"/>;
                        padding: <xsl:value-of select="$large-separator"/>;
                      </xsl:attribute>

                      <xul:box flex="1"/>
                      <xul:hbox flex="4" pack="middle">
                        <xsl:copy-of select="$metadata-layer"/>
                      </xul:hbox>
                      <xul:box flex="1"/>
                    </xul:hbox>
                    <xul:box height="{$large-separator}"/>
                  </xul:vbox>
                </xsl:when>

                <xsl:otherwise>
                  <xsl:copy-of select="$content"/>
                </xsl:otherwise>
              </xsl:choose>

              <xsl:if test="$exclude-toolbar-areas = 'true'">
                <xul:box id="lower-toolbar-overlay">
                  <xsl:attribute name="style">
                    height: <xsl:value-of select="$ci:sys.fullscreen-lower-toolbar-height"/>px;
                  </xsl:attribute>
                </xul:box>
              </xsl:if>
            </xul:vbox>

            <xsl:if test="not($exclude-toolbar-areas = 'true')">
              <xul:vbox id="metadata-layer" align="end">
                <xul:hbox flex="1" align="end" pack="end">
                  <xul:box flex="1"/>
                  <xul:hbox id="metadata-section" flex="4">
                    <xsl:attribute name="style">
                      -ci-z-order: 2;
                      background-color: <xsl:value-of select="$background-color"/>;
                      opacity: 0.85;
                      padding: <xsl:value-of select="$large-separator"/>;
                    </xsl:attribute>
                    <xsl:copy-of select="$metadata-layer"/>
                  </xul:hbox>
                  <xul:box flex="1"/>
                  <xul:box width="{$large-separator}"/>
                </xul:hbox>

                <xul:box height="{$large-separator}"/>
                <xul:box id="lower-toolbar-overlay-2">
                  <xsl:attribute name="style">
                    height: <xsl:value-of select="$ci:sys.fullscreen-lower-toolbar-height"/>px;
                  </xsl:attribute>
                </xul:box>
              </xul:vbox>
            </xsl:if>
          </xsl:when>

          <xsl:otherwise>
            <xul:hbox pack="middle" align="middle">
              <xsl:copy-of select="$content"/>
            </xul:hbox>
          </xsl:otherwise>
        </xsl:choose>

      </xul:stack>

      <xsl:copy-of select="$text-flow"/>
    </xul:window>
  </xsl:template>

</xsl:transform>
