// -----------------------------------------------------------------------------------------------------------------------------
// GLOBAL VARS
// -----------------------------------------------------------------------------------------------------------------------------
var debug = 1;
// -----------------------------------------------------------------------------------------------------------------------------
// FUNCTIONS
// -----------------------------------------------------------------------------------------------------------------------------
function setStorage(name, data){
    localStorage[name] = data;
}

function getStorage(name){
    return localStorage[name];
}

function log(content)
{
    if(debug==1)
        console.info(content);
}
// -----------------------------------------------------------------------------------------------------------------------------
// CLASSES
// -----------------------------------------------------------------------------------------------------------------------------
function Popup()
{
	this.init = function(){
        if(getStorage('conf_settings_nbappsinrow')==null)
            var menu_size = 68;    
        else
            var menu_size = 34 * getStorage('conf_settings_nbappsinrow');  
            
        $('body').css('width', menu_size + 'px');  	
	},
	
	this.addBottom = function(){
    	if(getStorage('conf_settings_hidetopbottom')==null || getStorage('conf_settings_hidetopbottom')==0)
        {
            $('#content').append('<div style="clear:both;"></div><div id="bottom"><a href="settings.html" title="Settings" onclick="chrome.tabs.create({url: this.href});"><img src="media/misc/settings.png" alt="" title="" /></a> &nbsp; <a href="help.html" title="Help" onclick="chrome.tabs.create({url: this.href});"><img src="media/misc/help.png" alt="" title="" /></a></div>');
        }
        else
        {
            $('#arrow_back').hide();
        }    
    }
}

var menu_active = ""; 

function Symtica_app(id, acceptHTTPS){
    // Variables
    this.id_app = id;
    this.accept_https = acceptHTTPS;
    this.nb_subapps = 0;
    
    // fct : create a menu
	this.createMenu = function(){
        $('#content').append('<div id="menu_'+this.id_app+'" class="menu sub_menu"></div>');
        $('#menu_'+this.id_app).hide();
	},	
	
	// fct : add app
	this.addMainApp = function(name, lien){
	    $('#menu_main').append('<div href="'+lien+'" title="'+name+'" id="app_'+this.id_app+'" class="app main_app" style="background-image:url(media/apps/'+this.id_app+'/'+this.id_app+'.png)"></div>');
	    this.addSubApp('home','Home',lien);
    },
    
    // fct : add sub app
    this.addSubApp = function(id_subapp, name, lien){
        if(getStorage('app_'+this.id_app+'_'+id_subapp)=='1' || getStorage('app_'+this.id_app+'_'+id_subapp)==null)
        {
            $('#menu_'+this.id_app).append('<div href="'+lien+'" title="'+name+'" id="app_'+this.id_app+'_'+id_subapp+'" class="app sub_app" style="background-image:url(media/apps/'+this.id_app+'/'+this.id_app+'_'+id_subapp+'.png)"></div>');
            this.nb_subapps++;        
        }
    },
    
    // fct : transformation logo <-> arrow
    this.transformArrow = function(type){
        if(type==1)
        {
            $('#arrow_back').removeClass('logo_top');
            $('#arrow_back').addClass('arrow_top');        
        }
        else
        {
            $('#arrow_back').removeClass('arrow_top');
            $('#arrow_back').addClass('logo_top');         
        }
    },
    
    this.openLink = function (link, accept_https){
        if(accept_https==1&& getStorage('conf_settings_https')=="1")   
            var prefix = 'https://';
        else
            var prefix = 'http://';
                
        if(getStorage('conf_settings_open')=="tabs" || getStorage('conf_settings_open')==null) // new tab
        {
            chrome.tabs.create({url: prefix+link});
        }
        else if(getStorage('conf_settings_open')=="popups")
        {
            if(getStorage('conf_settings_popupwidth')==null)
                var popup_width = 800;
            else
                var popup_width = getStorage('conf_settings_popupwidth');
                
            if(getStorage('conf_settings_popupheight')==null)
                var popup_height = 600;
            else
                var popup_height = getStorage('conf_settings_popupheight');
            
            var popup_top = (screen.height-popup_height)/2;
            var popup_left = (screen.width-popup_width)/2; 
            
            newwindow=window.open(prefix+link, 'Symtica :: Popup', 'height='+popup_height+', width='+popup_width+', top='+popup_top+',left='+popup_left);
        	if (window.focus) {newwindow.focus()}
        	return false;
        }
        else
        {
            alert('error');
        }
    },
    
    // fct : add all events
    this.addEvents = function(){
        // click on main apps
        $('#app_'+this.id_app).bind('click', {id_app: this.id_app, transformArrow: this.transformArrow, nb_subapps: this.nb_subapps, openLink: this.openLink, accept_https: this.accept_https}, function(event){
            log('click on app : '+event.data.id_app);      
            if(event.data.nb_subapps > 0)
            {
                log('- hide : main menu');
                $('#menu_main').hide();
                log('- show : '+event.data.id_app+' menu');
                $('#menu_'+event.data.id_app).show(); 
                log('- replace : logo by arrow back');
                event.data.transformArrow(1);
                // submenu where we are
                menu_active = event.data.id_app;    
                     
            }
            else
            {
                event.data.openLink($(this).attr('href'), event.data.accept_https);  
            }

        }); 
        // click on arrow 
        $('#arrow_back').bind('click', {id_app: this.id_app, transformArrow: this.transformArrow}, function(event){    
            if($('#arrow_back').attr('class')=='arrow_top' && event.data.id_app == menu_active)
            {
                log('click on arrow');
                log('- hide : '+event.data.id_app+' menu');
                $('#menu_'+event.data.id_app).hide();                
                log('- show : main menu');
                $('#menu_main').show();
                log('- replace : arrow back by logo');
                event.data.transformArrow(2);
                // we are not in any submenu
                menu_active = "";
            }         
        });
        // click on sub app
        $("div[id^='app_"+this.id_app+"_']").bind('click', {openLink: this.openLink, accept_https: this.accept_https}, function(event){
            event.data.openLink($(this).attr('href'), event.data.accept_https);      
        });
    }
}

function Symtica_tabs(){
    // Variables
    this.active_tab = 0;
    this.nb_tabs = 0;
    
    // fct : create a tab
    this.newTab = function(name){
        $('#tabs').append('<div class="tab_system_tab"><span class="tab_system_tab_lien">'+name+'</span>');
        $('#content').append('<div class="tab_system_content" style="display:none;"></div>');
        this.nb_tabs++;    
    },
    
    // fct : add all events
    this.addEvents = function(){
        // we add an event on each tabs exepting the active one
        for(i = 0 ; i <= this.nb_tabs ; i++)
        {               
            $('.tab_system_tab').eq(i).bind('mouseover', {indice : i}, function(event){
                if(!$(this).hasClass('active_one'))
                {
                    log('Mouse enter in '+event.data.indice);
                    $(this).addClass('tab_system_tab_active');
                }
            });

            $('.tab_system_tab').eq(i).bind('mouseout', {indice : i}, function(event){
                if(!$(this).hasClass('active_one'))
                {
                    log('Mouse left '+event.data.indice);
                    $(this).removeClass('tab_system_tab_active');
                }
            });
        }
        // we add an event on each tabs exepting the active one
        for(i = 0 ; i <= this.nb_tabs ; i++)
        {
            $('.tab_system_tab').eq(i).bind('click', {indice : i, nb_tabs : this.nb_tabs}, function(event){
                if(!$(this).hasClass('active_one'))
                {
                    log('Click on '+event.data.indice);
                    // hide all tabs and then display the clicked one.                   
                    // hide all contents div and then display the right one
                    for(k = 0 ; k <= event.data.nb_tabs ; k++)
                    {
                        $('.tab_system_content').eq(k).hide();
                        $('.tab_system_tab').eq(k).removeClass('tab_system_tab_active active_one');
                    }
                    $('.tab_system_tab').eq(event.data.indice).addClass('tab_system_tab_active active_one');
                    $('.tab_system_content').eq(event.data.indice).show();
                }               
            });
        }   
    },
    
    // fct : add content to a .tab_system_content
    this.addContent = function(indice, content){
        $('.tab_system_content').eq(indice).append(content);
    },
    
    // fct : run the system
    this.run = function(){
        $('#tabs').append('<div style="clear:both;"></div>');
        $('.tab_system_tab').eq(0).addClass('tab_system_tab_active active_one');
        $('.tab_system_content').eq(0).show();
    }
}

function Symtica_parameters_myapps(){
    // fct : add App in settings page
    this.addApp = function(id_app, name, number){
        if(getStorage('app_'+id_app)== '1' || getStorage('app_'+id_app)==null)
        {
            var misc_content = ' checked="checked"';
            var arrow_display = '';
        }    
        else
        {
            var misc_content = '';
            var arrow_display = ' style="display:none;"';
        }
            
        return '<li id="'+number+'"><div class="parameters_myapp" id="app_'+id_app+'"><span class="handler">::</span>&nbsp;&nbsp;<input type="checkbox"'+misc_content+' class="parameters_myapp_checkbox" /><img src="media/apps/'+id_app+'/'+id_app+'.png" alt="" title="'+name+'" class="parameters_myapp_img" /><span class="parameters_myapp_text">'+name+'</span><img'+arrow_display+' src="media/misc/arrow_down.png" alt="" class="parameters_myapp_arrow" /><div class="parameters_myapp_options" style="display:none;"></div></div></li>';
    },
    // fct : events on setting page
    this.eventsMyApps = function(){
        $('.parameters_myapp_checkbox').change(function(){
            log('Checkbox changed');
            if(!$(this).is(':checked'))
            {
                $(this).parent().children('.parameters_myapp_options').hide(300);
                $(this).parent().children('.parameters_myapp_arrow').fadeOut(300);
                setStorage($(this).parent().attr('id'),0);    
            }
            else
            {
                $(this).parent().children('.parameters_myapp_options').show(300);
                $(this).parent().children('.parameters_myapp_arrow').fadeIn(300);
                $(this).parent().children('.parameters_myapp_arrow').attr('src','media/misc/arrow_up.png');
                setStorage($(this).parent().attr('id'),1);  
            }
        }); 
        
        $('.parameters_myapp_arrow').bind('click', function(){
            if(!$(this).parent().children('.parameters_myapp_options').is(':visible'))
            {
                log('arrow clicked');
                $(this).attr('src','media/misc/arrow_up.png');
                $(this).parent().children('.parameters_myapp_options').show(300);
            }
            else
            {
                log('arrow clicked2'); 
                $(this).attr('src','media/misc/arrow_down.png');
                $(this).parent().children('.parameters_myapp_options').hide(300);
            }
        });   
    },
    // fct : add drag & drop feature
    this.dragDrop = function(){
        $('.tab_system_content').eq(0).html('<ul id="sortable">'+$('.tab_system_content').eq(0).html()+'</ul>');  
        $("#sortable").sortable({
            handle : '.handler',
            update : function () {
                
                var array_order = $('#sortable').sortable('toArray');
                var string_order = array_order.join(',');
                
                setStorage('conf_apps_order',string_order);
            }
        });
    }

}

function Symtica_parameters_subapps(){
    // fct : add subapp in settings page
    this.addApp = function(id_parentApp, id_app, name){    
        if(getStorage('app_'+id_parentApp+'_'+id_app)=='1' || getStorage('app_'+id_parentApp+'_'+id_app)==null)
            var misc_content = 'checked="checked"';
        else
            var misc_content = '';
        $('#app_'+id_parentApp).children('.parameters_myapp_options').append('<div class="parameters_subapp" id="app_'+id_parentApp+'_'+id_app+'"><img src="media/misc/arrow_right.png" class="left_arrow" alt="" /> <input type="checkbox" '+misc_content+' class="parameters_subapp_checkbox" /><img src="media/apps/'+id_parentApp+'/'+id_parentApp+'_'+id_app+'.png" alt="" title="'+name+'" class="parameters_subapp_img" /><span class="parameters_subapp_text">'+name+'</span></div>');
    }
    // fct : add events in settings page
    this.addEvents = function(){
        $('.parameters_subapp_checkbox').live('change', function(){
            log('Checkbox subapp changed');
            if(!$(this).is(':checked'))
            {
                setStorage($(this).parent().attr('id'),0);    
            }
            else
            {
                setStorage($(this).parent().attr('id'),1);  
            }
        });
    }
}

function Symtica_parameters_settings(){
    // add an option
    this.addOption = function(id, question, type, value){
        
        var resultat = "";         
        resultat += '<div class="settings_new_option">'+question+' <div class="settings_value">';
        
        if(type=="radio")
        {
            // Valeur par default si pas encore definie
            if(getStorage(id)==null)
                setStorage(id,value.option[0]);
        
            // on affiches les options
            for(var i=0 ; i < value.option.length ; i++)
            {
                if(getStorage(id)==value.option[i])
                    var selected = 'checked="checked"';
                else
                    var selected = '';
                
                resultat += '<input '+selected+' type="radio" class="'+id+'" id="'+id+'_'+value.option[i]+'" name="'+id+'" value="'+value.option[i]+'" /> <label for="'+id+'_'+value.option[i]+'">'+value.text[i]+'</label> ';
            }
            
            // On met un evenement pour enregistrer les changements
            $('.'+id).live('change', {event_id : id} , function(event){
                setStorage(event.data.event_id,$(this).val());
            }); 
        }
        else if(type=="text")
        {
            // Valeur par default si pas encore definie
            if(getStorage(id)==null)
                setStorage(id,value);
                
            resultat += '<input type="text" class="'+id+'" id="'+id+'" name="'+id+'" value="'+getStorage(id)+'" />';
            
            // On met un evenement pour enregistrer les changements
            $('.'+id).live('keyup', {event_id : id} , function(event){
                var value = $(this).val();                
                if(!isNaN(value))
                    setStorage(event.data.event_id,$(this).val());                    
            }); 
            
            $('.'+id).live('keypress', function(event){
                if(event.keyCode < 45 || event.keyCode > 57)
                    event.preventDefault();
                if(event.which < 45 || event.which > 57)
                    return false;
            });            
        }        
        else if(type="checkbox")
        {
            // Valeur par default si pas encore definie
            if(getStorage(id)==null)
                setStorage(id,0);            

            if(getStorage(id)==1)
                var selected = 'checked="checked"';
            else
                var selected = '';
            
            resultat += '<input '+selected+' type="checkbox" class="'+id+'" id="'+id+'" name="'+id+'" value="'+value+'" /> ';

            $('.'+id).live('change',{event_id : id}, function(event){
                if(!$(this).is(':checked'))
                {
                    setStorage(event.data.event_id,0);    
                }
                else
                {
                    setStorage(event.data.event_id,1);  
                }    
            });
        }
        
        resultat += '</div></div>';       
        return resultat;
    }
}

function check_expand(){
    // fct : handle check all, uncheck all, expand all, shrink all
    this.addEvents = function(){        
        $('#check_uncheck_box').live('click',function(){
            if(!$(this).is(':checked'))
            {
                $('.parameters_myapp_checkbox').attr('checked',false); // uncheck main apps
                $('.parameters_myapp_checkbox').trigger('change'); // trigger uncheck event
                
                $('.parameters_subapp_checkbox').attr('checked',false); // uncheck sub apps
                $('.parameters_subapp_checkbox').trigger('change'); // trigger uncheck event
                
                $(this).next().html('Check all');
            }
            else
            {
                $('.parameters_myapp_checkbox').attr('checked',true); // check main apps
                $('.parameters_myapp_checkbox').trigger('change'); // trigger check event
                
                $('.parameters_subapp_checkbox').attr('checked',true); // uncheck sub apps
                $('.parameters_subapp_checkbox').trigger('change'); // trigger uncheck event
                
                $(this).next().html('Uncheck all');
                
                $('#expand_shrink_arrow').attr('src','media/misc/arrow_up.png'); // change arrow
                $('#expand_shrink_arrow').prev().html('Shrink all');
            }
        });
        
        $('#expand_shrink_arrow').live('click', function(){
            if($(this).attr('src')=='media/misc/arrow_down.png')
            {
                $(this).prev().html('Shrink all');
                $(this).attr('src','media/misc/arrow_up.png');
                
                $('.parameters_myapp_options').each(function(){
                     if($(this).prev().is(':visible')) // expand only checked elements
                     {
                        $(this).prev().attr('src','media/misc/arrow_up.png');
                        $(this).show(300);
                     }
                     
                });
            }
            else
            {
                $(this).prev().html('Expand all');
                $(this).attr('src','media/misc/arrow_down.png');
                $('.parameters_myapp_options').prev().attr('src','media/misc/arrow_down.png');
                $('.parameters_myapp_options').hide(300);
            }
            
        });
    }
}