/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * 翻译 : 简体中文 By Jfjj007
 * **************************
 *
 * Version : 1.0
 * Date : 2010-04-17
 * @author Jfjj007
 */
var locale = 'zh_CN';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    'version': "版本",
    closeentry: {
        text: '关闭此项目',
        keyword: '关闭'
    },
    colorful: {},
    column: {
        text: '显示为多列的布局',
        keyword: '栏',
        summary: '新增/编辑项目',
        desc: '管理专栏'
    },
    facebook: {
        text: '分享这个消息到Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: '分享这个消息到Twitter',
        keyword: 'Twitter',
        plslogin: '请登录到Twitter',
        toolong: "消息太长!",
        notetoolong: "<b>注意：要应用项目:</b> (可选, remain {0} characters)",
        notemax: "<b>注意：要应用项目:</b> (可选, 不超过140个字符)",
        text_title: '标题',
        text_tag: '标签',
        text_url: '链接',
        text_send: '发送',
        text_count: 'Count',
        text_cancel: '取消',
        text_shortener: '短网址',
        shortfailed: "对不起，您尝试的短网址发生错误!\n\r{0}"
    },
	readit: {
        password: '如果您有密码请填写:',
        wronglogin: '用户名或密码错误，请检查它！',
nologin: '此功能需要一个用户名，请设定偏好！',
        error: '该服务遇到一个错误。请稍后再试.',
        badrequest: '不正确的要求。如URL可能缺少一个必需的参数，.',
        saving: '保存',
        shortcut_readitlater: '阅读Instapaper'
    },
    instapaper: {
        text: '阅读Instapaper',
        keyword: 'Instapaper',
        plslogin: '请登录Instapaper',
        login: 'E-mail或用户名:'
	},
	readitlater: {
        text: '阅读ReadItLater',
        keyword: 'ReadItLater',
        plslogin: '请登录ReadItLater',
		rateexceeded:'频率超出限制，重新提交前请等待一会儿',
		maintenance:'Read It Later\'s 同步服务器已关闭，以便进行定期维修'
	},
    favicons: {
        preferences: '偏好',
        getfavicon: '获取Favicon',
        notfoundicon: '无法找到图标为 "{0}"',
        summary: '新增/编辑项目',
        desc: '管理网站Favicons'
    },
    filter: {
        settings: '过滤器设置',
        excludes: '排除',
        highlights: '突出',
        highlight: '高亮',
        exclude: '排除',
        hideduplicates: '隐藏重复',
        hideexcludes: '隐藏排除',
        preferehighlights: '高亮排除项',
        update: '更新',
        quickadd: '快速添加',
        add: '添加',
        close: '关闭',
        edit: '编辑',
        remove: '删除'
    },
    fitheight: {
        text: '适合高度',
        keyword: '适合高度'
    },
    jump: {
        textbottom: '跳到底部',
        texttop: '跳到顶部',
        keywordtop: '顶部'
    },
    openbackground: {
        text: '在后台打开',
        keyword: '打开'
    },
    preview: {
        text: '集成消息预览',
        title: '打开预览',
        opennewtab: '打开一个新窗口',
        keyword: '预览',
overlay_next: '下一条',
overlay_previous: '上一条',
overlay_close: '关闭',
overlay_category: '类别'
    },
    readbymouse: {
        middleclick: '中键点击',
        openintab: '在标签中打开',
        openinbacktab: '在标签中打开 (后台)',
        shares: '分享',
        stars: 'Stars',
        tag: '标签',
        addtag: '添加标签',
        on: '鼠标阅读 开',
        off: '鼠标阅读 关'
    },
    replacer: {
        nomatch: '未找到相应.',
        loading: '载入中 ...'
    },
    lightbox: {
        text: 'Light on the media',
        keyword: 'Light'
    },
	ig: {
        menu_prefs: 'Reader+ 偏好',
        menu_theme: 'Reader+ 主题',
		menu_randomtheme: '更改主题 :'
    },
	menu:{
        label: '不包括'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "保存",
        alreadyexist: "项目已经存在！"
    },
    theme: {
        noborder: "删除条目边界单一网页上显示多个项目",
		mytheme: '使用<a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">自定义背景图片</a> 字体颜色与皮肤 "我的主题"',
		url:'图片网址',
		color:'文字颜色',
		bg:'背景颜色'
    },
	ig: {
		warning:'有些主题可能显示不正确，这是一个测试功能!',
		skin_name:'iGoogle的主题名称',
		skin_url:'iGoogle主题的网址',
		debug:'调试模式 (仅供应调试)',
		randomtime:'随机动态主题切换时间控制',
		userandomthemes:'主题是随机自动切换',
		randomthemes:'每个主题切换（最小值）',
		add:'立即添加',
        next:'下一个',
        previous:'上一个',
		random:'随机',
        search:'搜索主题'
	},
    about: {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>Thank you...</h1>' +
        '<p>... for installing (or updating to) the latest version of <strong>Reader Plus</strong>!</p>' +
        '<p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>If you like this extension and want more features, feel free to make a donation.</p>' +
        '<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>',
		whatsnew:'<td><h2>What\'s new!!</h2><ul><li>Try the new themes</li><li>or use a custom background with the new theme "MyTheme"</li><li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li><li>Preview as lightbox</li><li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li><li>Entry actions as floating window (general)</li></ul></td>',
nopopup:'<p>If you don\'t want to be alerted on new version updates, check option "No popup on updates" in <a href="preferences.html#general">General section</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>开始阅读您的RSS阅读器",
        issues: "<span>报告问题</span>发现了一个Bug或提交问题?",
        download: "<span>扩展页面</span>下载更新扩展的页面",
        about: "<span>关于</span>关于和鸣谢...",
        site: "<span>作者主页</span>作者的个人网站",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
        translate: '<span>翻译</span><a href="Http://Twitter.Com/Jfjj007" target="_blank">汉化@Jfjj007</a>'
    },
    column: {
        count: "列数",
        locked: "'专栏'功能始终默认激活",
        pagebreak: "把长篇的文章分开,像阅读一页一页的报纸.",
        "entersite": "输入网站的网址"
    },
    twitter: {
        shortener: "网址缩短",
        shortener_bitly: "BitLy 配置 (可选):",
        shortener_login: "登录",
        shortener_apikey: "ApiKey",
        shortener_pwd: "密码"
    },
    instapaper: {
auth: "Instapaper认证:",
        username: "用户名:",
password: "密码 (可选):"
    },
readitlater: {
	auth: "ReadItLater <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (必须):",
	username: "用户名:",
	password: "密码:"
},
    colorful: {
        tree: "在左侧导航栏中显示标签的颜色"
    },
    general: {
        counter: "在工具栏显示未读消息的计数器图标",
        opendirect: "点击图标就会打开Google Reader",
        secure: "始终使用安全协议访问(https)",
		topcurrent: "当前条目始终置顶",
		floatactions: "在浮动窗口中显示项目动作",
		noupdatepopup: "更新时不弹出对话框",
        icontoolbar_add: "要添加工具栏图标，请点击 <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">下载并安装</a>.",
        icontoolbar_text: "<span>为了使按钮自定义添加，我们也开发了另外一个独立的扩展,</span><br><span>必须安装reader plus.</span><br><span>要添加按钮，点击 <b>Install</b> 在 <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus 工具栏按钮</a> page.</span><br><span>要删除按钮，右键点击他，选择禁用.</span>",
        importexport_text: "你现在可以通过'导出'来保存你的偏好设置,以后可以通过'导入'来恢复该设置:",
        confirmimport: "确定要导入此配置？\nCurrent配置将会丢失!"
    },
    removeads: {
        links: "过滤链接",
        images: "过滤图片",
        iframes: "自定义过滤"
    },
    preview: {
        onicon: "点击标题后面的图标时显示完整的预览(如果不选,则会在点击标题时出现)若不选,则使用标题?",
        locked: "默认情况下总是激活’预览‘功能，除了 :",
overlay:'全屏预览（灯箱）'
    },
    fitheight: {
        locked: "默认情况下总是激活’自动高度‘功能，除了:"
    },
	filter: {
        searchbody: "搜索标题及正文内容"
    },
    favicons: {
        providerpageicons: "使用[测试] PageIcons提供商（推荐成功加载的所有图标）",
        sidebaronly: "在侧边栏显示Favicon",
        custom: "请输入您的自定义Favicons :",
        add: "添加",
        tip: "Tip: 你可以很容易的在左侧栏添加使用上下文菜单 \"获取 favicon\" ",
        manual: "获取所有网站的Favicons (不推荐;慢)",
        parsing: "这将试图通过分析检测每个网页Favicon",
        "entersite": "Enter URL of the site",
        "prompticon": "输入网址的图标（留空为自动自动）:"
    },
    replacer: {
        intro: '你可以使用<a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark书签</a> 用xpath代替正则表达式来识别纠正 (使用前缀 "xpath:")',
        link: "链接正则表达式",
        from: "搜索正则表达式",
        to: "替换"
    },
    lightbox: {
        locked: "Lightbox特性 在默认情况下启用,除了 :"
    },
    relook: {
        css: "CSS样式表",
        resize: "触发调整尺寸事件,来适应全屏幕"
    },
    pack: {
        mini: "<span>迷你型</span>开启基本配置阅读功能",
        ludoo: "<span>特色型</span>适合喜欢在后台阅读的用户",
        full: "<span>全能型</span>激活所有功能",
        reset: "<span>恢复默认</span>重置您的配置(所有功能未激活，并切换到英文版界面)",
        confirmdel: "这将清除和重置所有你的喜好。你确定 ?"
    },
    extshortcuts: {
        custom: "自定义快捷键",
        official: "Google Reader 默认快捷键",
        alreadyusedprefs: "方法已在您的偏好!",
        alreadyusedgoogle: "已经使用了谷歌!"
    },
    thanks: {
        donators: "感谢对这一项目作出贡献行为的捐赠者",
        translators: "感谢你为他们的出色工作，勇敢的翻译",
        authors: "感谢原创作者的脚本和皮肤 (Greasemonkey and Stylish)"
    }
};
