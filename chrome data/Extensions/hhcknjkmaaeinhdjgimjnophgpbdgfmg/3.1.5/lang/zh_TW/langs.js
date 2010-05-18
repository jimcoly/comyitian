/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * 翻譯 : 繁體中文 By shell9000
 * **************************
 *
 * Version : 1.0
 * Date : 03-25-2010
 * @author shell9000
 */
var locale = 'zh_TW';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    'version': "版本",
    closeentry: {
        text: '關閉此項目',
        keyword: '關閉'
    },
    colorful: {},
    column: {
        text: '顯示為多列的佈局',
        keyword: '欄',
        summary: 'Add/edit items',
        desc: 'Manage columns'
    },
    facebook: {
        text: '分享這個消息到Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: '分享這個消息到Twitter',
        keyword: 'Twitter',
        plslogin: '請登錄到Twitter',
        toolong: "消息太長!",
        notetoolong: "<b>Note to go along with the item:</b> (Optional, remain {0} characters)",
        notemax: "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)",
        text_title: '標題',
        text_tag: '標籤',
        text_url: '鏈接',
        text_send: '發送',
        text_count: 'Count',
        text_cancel: '取消',
        text_shortener: '短網址',
        shortfailed: "對不起，您嘗試的短網址發生錯誤!\n\r{0}"
    },
    instapaper: {
        text: 'Read Later with Instapaper',
        keyword: 'Instapaper',
        plslogin: '請登錄Instapaper',
        login: 'Email 或 用戶名:',
        password: 'Password, if you have one:',
        wronglogin: '用戶名或密碼錯誤，請檢查並重新輸入!!',
        nologin: 'Instapaper需要一個用戶名，請設定偏好!!',
        error: '該服務遇到一個錯誤。請稍候再試.',
        badrequest: '不正確的要求。也許是URL的參數錯誤，.',
        saving: '保存',
        shortcut_readitlater: 'Read Later with Instapaper'
    },
    favicons: {
        preferences: '偏好',
        getfavicon: '獲取Favicon',
        notfoundicon: '無法找到圖標為 "{0}"'
    },
    filter: {
        settings: '過濾器設置',
        excludes: '排除',
        highlights: '突出',
        highlight: '高亮',
        exclude: '排除',
        hideduplicates: '隱藏重複',
        hideexcludes: '隱藏排除',
        preferehighlights: 'Prefer Hilights over excludes',
        update: '更新',
        quickadd: '快速添加',
        add: '添加',
        close: '關閉'
    },
    fitheight: {
        text: '適合高度',
        keyword: '適合高度'
    },
    jump: {
        textbottom: '跳到底部',
        texttop: '跳到頂部',
        keywordtop: '頂部'
    },
    openbackground: {
        text: '在後台打開',
        keyword: '打開'
    },
    preview: {
        text: '集成消息預覽',
        title: '打開預覽',
        opennewtab: '打開一個新窗口',
        keyword: '預覽'
    },
    readbymouse: {
        middleclick: 'Middle click',
        openintab: '在標籤中打開',
        openinbacktab: '在標籤中打開 (Background)',
        shares: '分享',
        stars: 'Stars',
        tag: '標籤',
        addtag: '添加標籤',
        on: '鼠標閱讀 開',
        off: '鼠標閱讀 關'
    },
    replacer: {
        nomatch: '未找到相應.',
        loading: '載入中 ...'
    }
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "保存",
        alreadyexist: "Item already exists!"
    },
    theme: {
        noborder: "Remove entries borders to display more items on a single page"
    },
    "about": {
        thanks1: '<td><span class="top_right"><img src="images/48.png"></span><h1>謝謝您...</h1>' +
        '<p>... 安裝（或更新）最新的版本 <strong>Reader Plus</strong>!</p>' +
        '<p>Make sure you check the <a href="preferences.html" title="Go to the preferences page"><strong>preferences page</strong></a> for configuration of the extension.</p>' +
        '<p><a href="https://chrome.google.com/extensions/detail/hhcknjkmaaeinhdjgimjnophgpbdgfmg" target="_blank" title="Visit extension homepage"><strong>Visit the Google Chrome Extensions gallery page!</strong></a></p>' +
        '<p><a href="http://www.twitter.com/ludoo0d0a"><img src="http://twitter-badges.s3.amazonaws.com/follow_me-a.png" alt="Follow me on Twitter"/></a></p>' +
        '<p></p></td>',
        thanks2: '<td><p>如果您喜歡這個擴展，並希望更多的功能，可隨時作出捐贈.</p>' +
        '<p>In this way, I could buy a truck of coffee so that i can stay awake to write all the code :)</p>' +
        '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FK9P8MNY9MGZL&lc=US&item_name=GoogleReaderPlus%20project&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></a></td>'
    },
    link: {
        reader: "<span>Google Reader</span>開始閱讀您的RSS閱讀器",
        issues: "<span>報告問題</span>發現了一個Bug或提交問題?",
        download: "<span>擴展頁面</span>下載更新擴展的頁面",
        about: "<span>關於</span>關於和鳴謝...",
        site: "<span>作者主頁</span>作者的個人網站",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
        translate: '<span>繁體翻譯</span><a href="http://twitter.com/shell2046" target="_blank">繁體漢化@shell2046</a>'
    },
    column: {
        count: "列數",
        locked: "'專欄'功能始終預設激活",
        pagebreak: "Break long articles so long articles can be read page by page like a newspaper."
    },
    twitter: {
        shortener: "網址縮短",
        shortener_bitly: "BitLy 配置 (可選):",
        shortener_login: "登錄",
        shortener_apikey: "ApiKey",
        shortener_pwd: "密碼"
    },
    instapaper: {
        auth: "Instapaper認證(可選):",
        username: "Username:",
        password: "Password:"
    },
    colorful: {
        tree: "在左側導航欄中顯示標籤的顏色"
    },
    general: {
        counter: "在工具欄顯示未讀消息的計數器圖標",
        opendirect: "點擊圖標就會打開Google Reader",
        secure: "Always force use of secure protocol (https)",
        icontoolbar_add: "要添加工具欄圖標，請點擊 <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">下載並安裝</a>.",
        icontoolbar_text: "<span>為了使按鈕自定義添加，我們也開發了另外一個獨立的擴展,</span><br><span>必須安裝reader plus.</span><br><span>要添加按鈕，點擊 <b>Install</b> 在 <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus 工具欄按鈕</a> page.</span><br><span>要刪除按鈕，右鍵點擊他，選擇禁用.</span>",
        importexport_text: "You can now save your preferences using 'export' and reload it later using 'import':",
        confirmimport: "Are you sure to import this configuration?\nCurrent configuration will be LOST!"
    },
    removeads: {
        links: "過濾鏈接",
        images: "過濾圖片",
        iframes: "自定義過濾"
    },
    preview: {
        onicon: "顯示集成預覽時，右鍵點擊圖標後的標題 (if not checked, on title)",
        locked: "'預覽'功能始終預設激活"
    },
    fitheight: {
        locked: "'適合高度'始終激活預設"
    },
    favicons: {
        providerpageicons: "Use [Beta] PageIcons provider (Recommended to load succesfully all icons)",
        sidebaronly: "在側邊欄顯示Favicon",
        custom: "請輸入您的自定義Favicons :",
        add: "添加",
        tip: "Tip: 你可以很容易的在左側欄添加使用上下文菜單 \"獲取 favicon\" ",
        manual: "獲取所有網站的Favicons (不推薦;慢)",
        parsing: "這將試圖通過分析檢測每個網頁Favicon",
        "entersite": "Enter URL of the site",
        "prompticon": "Enter the icon url (let empty to get it automatically):"
    },
    replacer: {
        link: "鏈接正則表達式",
        from: "搜索正則表達式",
        to: "替換"
    },
    lightbox: {
        locked: "Feature 'Lightbox' always actived by default, except for :"
    },
    relook: {
        css: "CSS stylesheet",
        resize: "Fire resize event to adapt fullscreen"
    },
    pack: {
        mini: "<span>迷你型</span>開啟基本配置閱讀功能",
        ludoo: "<span>特色型</span>適合喜歡在後台閱讀的用戶",
        full: "<span>全能型</span>激活所有功能",
        reset: "<span>恢復默認</span>重置您的配置(所有功能未激活，並切換到英文版界面)"
    },
    extshortcuts: {
        custom: "自定義快捷鍵",
        official: "Google Reader 官方快捷鍵",
        alreadyusedprefs: "方法已在您的偏好!",
        alreadyusedgoogle: "已經使用了谷歌!"
    },
    thanks: {
        donators: "感謝對這一項目作出貢獻行為的捐贈者",
        translators: "感謝你為他們的出色工作，勇敢的翻譯",
        authors: "感謝原創作者的腳本和皮膚 (Greasemonkey and Stylish)"
    }
};
