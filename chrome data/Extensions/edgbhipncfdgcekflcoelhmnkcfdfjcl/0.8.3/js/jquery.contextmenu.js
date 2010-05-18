/*
 * ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Chris Domigan
 * Contributors: Dan G. Switzer, II
 * Parts of this plugin are inspired by Joern Zaefferer's Tooltip plugin
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 16 July 2007
 *
 * For documentation visit http://www.trendskitchens.co.nz/jquery/contextmenu/
 *
 */

(function($) {
	var menu, shadow, trigger, content, hash, currentTarget;
	var defaults = {
		menuStyle: {
			listStyle: 'none',
			padding: '2px',
			margin: '0px',
			fontSize: '12px',
			backgroundColor: '#f1f1f1',
			border: '1px solid #979797',
			width: '300px',
			backgroundImage: 'url(' + chrome.extension.getURL('images/menu/left_base.png') + ')',
			backgroundRepeat: "repeat-y"
		},
		itemStyle: {
			margin: '0px',
			color: '#000',
			display: 'block',
			cursor: 'default',
			padding: '3px',
			paddingLeft: '31px',
			border: '1px solid #f1f1f1',
			backgroundColor: 'transparent',
			backgroundImage: 'none'
		},
		itemHoverStyle: {
			border: '1px solid #a8d8eb',
			backgroundColor: '#e3eff4',
			backgroundImage: 'url(' + chrome.extension.getURL('images/menu/item_hl.png') + ')',
			backgroundRepeat: "repeat-x",
			'-webkit-border-radius':'3px'
		},
		eventPosX: 'pageX',
		eventPosY: 'pageY',
		shadow : true,
		onContextMenu: null,
		onShowMenu: null
 	};

	$.fn.contextMenu = function(id, options) {
		if (!menu) {                                      // Create singleton menu
			menu = $('<div id="jqContextMenu"></div>')
				.hide()
				.css({position:'absolute', zIndex:'9999'})
				.appendTo('body')
				.bind('click', function(e) {
					e.stopPropagation();
				});
    	}
		if (!shadow) {
			shadow = $('<div></div>')
				.css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:9998})
				.appendTo('body')
				.hide();
		}
		hash = hash || [];
		hash.push({
			id : id,
			menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
			itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
			itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
			bindings: options.bindings || {},
			shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
			onContextMenu: options.onContextMenu || defaults.onContextMenu,
			onShowMenu: options.onShowMenu || defaults.onShowMenu,
			eventPosX: options.eventPosX || defaults.eventPosX,
			eventPosY: options.eventPosY || defaults.eventPosY
		});

		var index = hash.length - 1;
		$(this).bind('contextmenu', function(e) {
			// Check if onContextMenu() defined
			var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
			if (bShowContext) display(index, this, e, options);
				return false;
			});
			return this;
		};

		function display(index, trig, e, options) {
			trigger = trig;
			var cur = hash[index];
			content = $('#'+cur.id).find('ul:first').clone(true);
			content.css(cur.menuStyle).find('li').css(cur.itemStyle).hover(
				function() {
					$(this).css(cur.itemHoverStyle);
				},
				function(){
					$(this).css(cur.itemStyle);
				}
			).find('img').css({verticalAlign:'middle',paddingRight:'2px'});

		// Send the content to the menu
		menu.html(content);

		// if there's an onShowMenu, run it now -- must run after content has been added
		// if you try to alter the content variable before the menu.html(), IE6 has issues
		// updating the content
		if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);
		
		$.each(cur.bindings, function(id, func) {
			$('#'+id, menu).bind('click', function(e) {
				hide();
				func(trigger, currentTarget);
			});
		});
		
		menu.css({'left':e[cur.eventPosX],'top':e[cur.eventPosY]}).fadeIn("fast");
		if (cur.shadow) shadow.css({width:menu.width(),height:menu.height(),left:e.pageX+2,top:e.pageY+2}).fadeIn("fast");
			$(document).one('click', hide);
		}
		
		function hide() {
			menu.hide();
			shadow.hide();
		}
		
		// Apply defaults
		$.contextMenu = {
			defaults : function(userDefaults) {
				$.each(userDefaults, function(i, val) {
					if (typeof val == 'object' && defaults[i]) {
						$.extend(defaults[i], val);
					}
					else defaults[i] = val;
				});
			}
		};

})(jQuery);

$(function() {
	$('div.ugdv_contextMenu').hide();
});