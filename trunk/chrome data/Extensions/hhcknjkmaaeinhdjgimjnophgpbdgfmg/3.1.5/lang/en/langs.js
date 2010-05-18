/**
 * ReaderPlus
 * Translation
 *
 * **************************
 * en : English
 * **************************
 *
 * Version : 1.3
 * Date : 04-09-2010
 * @author Valente
 */
var locale = 'en';
namespace('GRP.langs.' + locale);
GRP.langs[locale].texts = {
    version: "version",
    closeentry: {
        text: 'Close this entry',
        keyword: 'Close'
    },
    colorful: {},
    column: {
        text: 'Display as multi columns layout',
        keyword: 'Column',
        summary: 'Add/edit items',
        desc: 'Manage columns'
    },
    facebook: {
        text: 'Share this news on Facebook',
        keyword: 'Facebook'
    },
    twitter: {
        text: 'Share this news on Twitter',
        keyword: 'Twitter',
        plslogin: 'Please login to Twitter',
        toolong: "the message is too long!",
        notetoolong: "<b>Note to go along with the item:</b> (Optional, remain {0} characters)",
        notemax: "<b>Note to go along with the item:</b> (Optional, no more than 140 characters)",
        text_title: 'Title',
        text_tag: 'Tag',
        text_url: 'URL',
        text_send: 'Send',
        text_count: 'Count',
        text_cancel: 'Cancel',
        text_shortener: 'Short url',
        shortfailed: "Sorry, an error occured on trying to use short url!\n\r{0}"
    },
	readit: {
        password: 'Password, if you have one:',
        wronglogin: 'Wrong username or password, please check it!!',
nologin: 'This feature requires a username, please set preferences!!',
        error: 'The service encountered an error. Please try again later.',
        badrequest: 'Bad request. Probably missing a required parameter, such as url.',
        saving: 'Saving',
        shortcut_readitlater: 'Read Later with Instapaper'
    },
    instapaper: {
        text: 'Read Later with Instapaper',
        keyword: 'Instapaper',
        plslogin: 'Please login to Instapaper',
        login: 'Email or username:'
	},
	readitlater: {
        text: 'Read Later with ReadItLater',
        keyword: 'ReadItLater',
        plslogin: 'Please login to ReadItLater',
		rateexceeded:'Rate limit exceeded, please wait a little bit before resubmitting',
		maintenance:'Read It Later\'s sync server is down for scheduled maintenance'
	},
    favicons: {
        preferences: 'Preferences',
        getfavicon: 'Get favicon',
        notfoundicon: 'Cannot found favicon for "{0}"',
        summary: 'Add/edit items',
        desc: 'Manage favicons'
    },
    filter: {
        settings: 'Filter settings',
        excludes: 'Excludes',
        highlights: 'Highlights',
        highlight: 'Highlight',
        exclude: 'Exclude',
        hideduplicates: 'Hide Duplicates',
        hideexcludes: 'Hide Excludes',
        preferehighlights: 'Prefer Hilights over excludes',
        update: 'Update',
        quickadd: 'Quick Add',
        add: 'Add',
        close: 'Close',
        edit: 'Edit',
        remove: 'Remove'
    },
    fitheight: {
        text: 'Fit height',
        keyword: 'Fit height'
    },
    jump: {
        textbottom: 'Jump to bottom',
        texttop: 'Jump to top',
        keywordtop: 'top'
    },
    openbackground: {
        text: 'Open in background',
        keyword: 'Open'
    },
    preview: {
        text: 'Integrated preview of the news',
        title: 'Open as preview',
        opennewtab: 'Open in a new window',
        keyword: 'Preview',
overlay_next: 'Next',
overlay_previous: 'Previous',
overlay_close: 'Close',
overlay_category: 'Category'
    },
    readbymouse: {
        middleclick: 'Middle click',
        openintab: 'Opens in Tab',
        openinbacktab: 'Opens in Background Tab',
        shares: 'Shares',
        stars: 'Stars',
        tag: 'Tag',
        addtag: 'Add a Tag',
        on: 'ReadByMouse On',
        off: 'ReadByMouse Off'
    },
    replacer: {
        nomatch: 'No match found.',
        loading: 'Loading ...'
    },
    lightbox: {
        text: 'Light on the media',
        keyword: 'Light'
    },
	ig: {
        menu_prefs: 'Reader+ preferences',
        menu_theme: 'Reader+ theme',
		menu_randomtheme: 'Change theme :'
    },
	menu:{
        label: 'Extra'
	}
};
GRP.langs[locale].prefs = {
    global: {
        title: "Reader Plus",
        "val-save": "Save",
        alreadyexist: "Item already exists!",
		snew:'new!',
		supdated:'Updated!',
prefssaved:"Preferences saved!",
cachecleared:"Cache cleared!"
    },
    theme: {
        noborder: "Remove entries borders to display more items on a single page",
		mytheme: 'Use <a href="http://code.google.com/p/googlereaderplus/wiki/Backgrounds" target="blank">custom background picture</a> and font color with skin "MyTheme"',
		url:'Picture URL',
		color:'Text color',
		bg:'Background color',
clearcache:'Clear cache'
    },
	ig: {
		warning:'Some themes could be displayed incorrectly ; this is a Beta feature!',
		skin_name:'iGoogle theme name',
		skin_url:'iGoogle theme URL',
		debug:'Debug mode (For debugging only)',
		randomtime:'Dynamic theme toggles randomly instead time control',
		userandomthemes:'Theme is automatically switched randomly',
		randomthemes:'Toggle theme every (min.)',
		add:'Add it now',
        next:'Next',
        previous:'Previous',
		random:'Random',
        search:'Search themes'
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
		whatsnew:'<td><h2>What\'s new!!</h2><ul><li>Try the new themes</li><li>or use a custom background with the new theme "MyTheme"</li><li>or use a random <a href="http://www.google.com/ig/directory?type=themes" target="blank">iGoogle</a> theme</li><li>Preview as lightbox</li><li>Share items using <a href="http://www.readitlater.com" target="blank">ReadItLater</a></li><li>Entry actions as floating window (general)</li><li>Translate news</li></ul></td>',
nopopup:'<p>If you don\'t want to be alerted on new version updates, check option "No popup on updates" in <a href="preferences.html#general">General section</a>.</p>'
    },
    link: {
        reader: "<span>Google Reader</span>Your RSS reader",
        issues: "<span>Report issue</span>Found a bug or suggestion ?",
        download: "<span>Google Extension</span>The place to download",
        about: "<span>About</span>About, thanks,...",
        site: "<span>Website</span>My personal website",
        twitter: "<span><img width=\"160\" height=\"27\" src=\"http://twitter-badges.s3.amazonaws.com/follow_me-a.png\" alt=\"Follow ludoo0d0a on Twitter\"></span>Follow news and updates",
        donate: '<a href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=FK9P8MNY9MGZL&amp;lc=US&amp;item_name=googlereaderplus%20project&amp;currency_code=EUR&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted"><span><img alt="Donate" border="0" src="https://www.paypal.com/en_US/i/btn/btn_donate_SM.gif" width="74" height="21"></span>Offer me a coffee!</a>',
        translate: '<span>Translation</span>Help me to translate</a>'
    },
    column: {
        count: "Columns number",
        locked: "Always actived, except following feeds:",
        pagebreak: "Break long articles so long articles can be read page by page like a newspaper.",
        entersite: "Enter URL of the site"
    },
	translate: {
        lang:"Translate content into ",
		locked: "Always actived, except for:",
        include:"Only include following feeds:",
		entersite: "Enter URL of the site"
    },
    twitter: {
        shortener: "Shortener",
        shortener_bitly: "BitLy configuration (optional):",
        shortener_login: "Login",
        shortener_apikey: "ApiKey",
        shortener_pwd: "Password"
    },
    instapaper: {
auth: "<a href='http://www.instapaper.com' target='blank'>Instapaper</a> authentication:",
        username: "Username:",
password: "Password (optional):"
    },
readitlater: {
	auth: "<a href='http://www.readitlaterlist.com' target='blank'>ReadItLater</a> <a href='http://readitlaterlist.com/signup' target='blank'>authentication</a> (required):",
	username: "Username:",
	password: "Password:"
},
    colorful: {
        tree: "Show label colors in the left navigation tree"
    },
    general: {
        counter: "Display unread counter in the toolbar icon",
        opendirect: "Click on icon will open GoogleReader",
        secure: "Always force use of secure protocol (https)",
topcurrent: "Current entry always on top",
floatactions: "Entry actions are displayed as a floating window",
noupdatepopup: "No popup on updates",
        icontoolbar_add: "To add button with icon in toolbar, please <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">download and install it</a>.",
        icontoolbar_text: "<span>To make the button optional, we put him in an another extension as standalone,</span>                                    <br>                                    <span>to be installed along with readerplus.</span>                                    <br>                                    <span>To add the button, click <b></b> on the <a href=\"https://chrome.google.com/extensions/detail/ecpcafinfpjgabomoamkhkgnpgpmdmeo\">readerplus Toolbar button</a> page.</span><span>To remove the button, right click him and choose Disable.</span>",
        importexport_text: "You can now save your preferences using 'export' and reload it later using 'import', but be sure data are <a href='http://jsonformatter.curiousconcept.com/' target='blank'>JSON compliant</a>:",
        confirmimport: "Are you sure to import this configuration?\nCurrent configuration will be LOST!"
    },
	limit:{
		slidewindow: "Slidewindow - limit entries number",
		mini: "Minimum items",
		maxi: "Maximum items"
	},
    removeads: {
        links: "Link filter:",
        images: "Image filter:",
        iframes: "Iframe filter:"
    },
    preview: {
        onicon: "Show integrated preview when click on icon right after the title (if not checked, on title)",
        locked: "Always actived, except following feeds:",
overlay:'Fullscreen preview (Lightbox)'
    },
    fitheight: {
        locked: "Always actived, except following feeds:"
    },
	filter: {
        searchbody: "Search inside title and body text"
    },
    favicons: {
        providerpageicons: 'Use <a href="http://pageicons.appspot.com" target="blank">PageIcons</a> provider (Recommended to load succesfully all icons)',
        sidebaronly: "Show favicons in sidebar only",
        custom: "Enter your custom favicons :",
        add: "Add",
        tip: "Tip: You could add it easily using the contextual menu \"Get favicon\" of the left side bar",
        manual: "Manual favicons for all sites (not recommended ; slower)",
        parsing: "This will try to detect favicon by parsing each homepage",
        entersite: "Enter URL of the site",
        prompticon: "Enter the icon url (let empty to get it automatically):"
    },
    replacer: {
        intro: 'You can use <a href="http://karmatics.com/aardvark/bookmarklet.html" target="blank">Aardvark bookmarklet</a> to identify correct xpath instead regex (Use prefix "xpath:")',
        link: "Link Regex",
        from: "Search regex/xpath",
        to: "Replace",
		prompttitle: "Title for this filter"
    },
    lightbox: {
        locked: "Always actived, except following feeds:"
    },
    relook: {
        css: "CSS stylesheet",
        resize: "Fire resize event to adapt fullscreen"
    },
    pack: {
        mini: "<span>Package Mini</span>The minimum for best reading",
        ludoo: "<span>Package LudoO</span>The best features in one click",
        full: "<span>Package Full</span>All features activated",
        reset: "<span>Package Reset</span>Reset your configuration",
        confirmdel: "This will ERASE and reset all your preferences. Are you sure ?"
    },
    extshortcuts: {
        custom: "Your custom Shortcuts",
        official: "Google Reader official shortcuts",
        alreadyusedprefs: "Already used in your preferences!",
        alreadyusedgoogle: "Already used by Google!"
    },
    thanks: {
        donators: "Thanks to donators to contribute to this project",
        translators: "Thanks to brave translators for their wonderful work",
        authors: "Thanks to authors of original scripts and skins (Greasemonkey and Stylish)"
    }
};
