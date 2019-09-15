/*!
 * jquery-confirm v3.2.0 (http://craftpip.github.io/jquery-confirm/)
 * Author: Boniface Pereira
 * Website: www.craftpip.com
 * Contact: hey@craftpip.com
 *
 * Copyright 2013-2017 jquery-confirm
 * Licensed under MIT (https://github.com/craftpip/jquery-confirm/blob/master/LICENSE)
 */
if("undefined"==typeof jQuery)throw new Error("jquery-confirm requires jQuery");var jconfirm,Jconfirm;!function(a,b){"use strict";a.fn.confirm=function(b,c){return"undefined"==typeof b&&(b={}),"string"==typeof b&&(b={content:b,title:!!c&&c}),a(this).each(function(){var c=a(this);c.on("click",function(d){d.preventDefault();var e=a.extend({},b);if(c.attr("data-title")&&(e.title=c.attr("data-title")),c.attr("data-content")&&(e.content=c.attr("data-content")),"undefined"==typeof e.buttons&&(e.buttons={}),e.$target=c,c.attr("href")&&0==Object.keys(e.buttons).length){var f=a.extend(!0,{},jconfirm.pluginDefaults.defaultButtons,(jconfirm.defaults||{}).defaultButtons||{}),g=Object.keys(f)[0];e.buttons=f,e.buttons[g].action=function(){location.href=c.attr("href")}}e.closeIcon=!1,a.confirm(e)})}),a(this)},a.confirm=function(b,c){if("undefined"==typeof b&&(b={}),"string"==typeof b&&(b={content:b,title:!!c&&c}),"object"!=typeof b.buttons&&(b.buttons={}),0==Object.keys(b.buttons).length){var d=a.extend(!0,{},jconfirm.pluginDefaults.defaultButtons,(jconfirm.defaults||{}).defaultButtons||{});b.buttons=d}return jconfirm(b)},a.alert=function(b,c){if("undefined"==typeof b&&(b={}),"string"==typeof b&&(b={content:b,title:!!c&&c}),"object"!=typeof b.buttons&&(b.buttons={}),0==Object.keys(b.buttons).length){var d=a.extend(!0,{},jconfirm.pluginDefaults.defaultButtons,(jconfirm.defaults||{}).defaultButtons||{}),e=Object.keys(d)[0];b.buttons[e]=d[e]}return jconfirm(b)},a.dialog=function(a,b){return"undefined"==typeof a&&(a={}),"string"==typeof a&&(a={content:a,title:!!b&&b,closeIcon:function(){}}),a.buttons={},"undefined"==typeof a.closeIcon&&(a.closeIcon=function(){}),a.confirmKeys=[13],jconfirm(a)},jconfirm=function(b){"undefined"==typeof b&&(b={});var c=a.extend(!0,{},jconfirm.pluginDefaults);jconfirm.defaults&&(c=a.extend(!0,c,jconfirm.defaults)),c=a.extend(!0,{},c,b);var d=new Jconfirm(c);return jconfirm.instances.push(d),d},Jconfirm=function(b){a.extend(this,b),this._init()},Jconfirm.prototype={_init:function(){var b=this;jconfirm.instances.length||(jconfirm.lastFocused=a("body").find(":focus")),this._id=Math.round(99999*Math.random()),setTimeout(function(){b.open()},0)},_buildHTML:function(){var b=this;this._parseAnimation(this.animation,"o"),this._parseAnimation(this.closeAnimation,"c"),this._parseBgDismissAnimation(this.backgroundDismissAnimation),this._parseColumnClass(this.columnClass),this._parseTheme(this.theme),this._parseType(this.type);var c=a(this.template);c.find(".jconfirm-box").addClass(this.animationParsed).addClass(this.backgroundDismissAnimationParsed).addClass(this.typeParsed),this.typeAnimated&&c.find(".jconfirm-box").addClass("jconfirm-type-animated"),this.useBootstrap?(c.find(".jc-bs3-row").addClass(this.bootstrapClasses.row),c.find(".jc-bs3-row").addClass("justify-content-md-center justify-content-sm-center justify-content-xs-center justify-content-lg-center"),c.find(".jconfirm-box-container").addClass(this.columnClassParsed),this.containerFluid?c.find(".jc-bs3-container").addClass(this.bootstrapClasses.containerFluid):c.find(".jc-bs3-container").addClass(this.bootstrapClasses.container)):c.find(".jconfirm-box").css("width",this.boxWidth),this.titleClass&&c.find(".jconfirm-title-c").addClass(this.titleClass),c.addClass(this.themeParsed);var d="jconfirm-box"+this._id;c.find(".jconfirm-box").attr("aria-labelledby",d).attr("tabindex",-1),c.find(".jconfirm-content").attr("id",d),null!=this.bgOpacity&&c.find(".jconfirm-bg").css("opacity",this.bgOpacity),this.rtl&&c.addClass("jconfirm-rtl"),this.$el=c.appendTo(this.container),this.$jconfirmBoxContainer=this.$el.find(".jconfirm-box-container"),this.$jconfirmBox=this.$body=this.$el.find(".jconfirm-box"),this.$jconfirmBg=this.$el.find(".jconfirm-bg"),this.$title=this.$el.find(".jconfirm-title"),this.$titleContainer=this.$el.find(".jconfirm-title-c"),this.$content=this.$el.find("div.jconfirm-content"),this.$contentPane=this.$el.find(".jconfirm-content-pane"),this.$icon=this.$el.find(".jconfirm-icon-c"),this.$closeIcon=this.$el.find(".jconfirm-closeIcon"),this.$btnc=this.$el.find(".jconfirm-buttons"),this.$scrollPane=this.$el.find(".jconfirm-scrollpane"),this._contentReady=a.Deferred(),this._modalReady=a.Deferred(),this.setTitle(),this.setIcon(),this._setButtons(),this._parseContent(),this.initDraggable(),this.isAjax&&this.showLoading(!1),a.when(this._contentReady,this._modalReady).then(function(){b.isAjaxLoading?setTimeout(function(){b.isAjaxLoading=!1,b.setContent(),b.setTitle(),b.setIcon(),setTimeout(function(){b.hideLoading(!1)},100),"function"==typeof b.onContentReady&&b.onContentReady()},50):(b.setContent(),b.setTitle(),b.setIcon(),"function"==typeof b.onContentReady&&b.onContentReady()),b.autoClose&&b._startCountDown()}),b._contentHash=this._hash(b.$content.html()),b._contentHeight=this.$content.height(),this._watchContent(),this.setDialogCenter(),"none"==this.animation&&(this.animationSpeed=1,this.animationBounce=1),this.$body.css(this._getCSS(this.animationSpeed,this.animationBounce)),this.$contentPane.css(this._getCSS(this.animationSpeed,1)),this.$jconfirmBg.css(this._getCSS(this.animationSpeed,1))},_typePrefix:"jconfirm-type-",typeParsed:"",_parseType:function(a){this.typeParsed=this._typePrefix+a},setType:function(a){var b=this.typeParsed;this._parseType(a),this.$jconfirmBox.removeClass(b).addClass(this.typeParsed)},themeParsed:"",_themePrefix:"jconfirm-",setTheme:function(a){var b=this.theme;this.theme=a||this.theme,this._parseTheme(this.theme),b&&this.$el.removeClass(b),this.$el.addClass(this.themeParsed),this.theme=a},_parseTheme:function(b){var c=this;b=b.split(","),a.each(b,function(d,e){e.indexOf(c._themePrefix)==-1&&(b[d]=c._themePrefix+a.trim(e))}),this.themeParsed=b.join(" ").toLowerCase()},backgroundDismissAnimationParsed:"",_bgDismissPrefix:"jconfirm-hilight-",_parseBgDismissAnimation:function(b){var c=b.split(","),d=this;a.each(c,function(b,e){e.indexOf(d._bgDismissPrefix)==-1&&(c[b]=d._bgDismissPrefix+a.trim(e))}),this.backgroundDismissAnimationParsed=c.join(" ").toLowerCase()},animationParsed:"",closeAnimationParsed:"",_animationPrefix:"jconfirm-animation-",setAnimation:function(a){this.animation=a||this.animation,this._parseAnimation(this.animation,"o")},_parseAnimation:function(b,c){c=c||"o";var d=b.split(","),e=this;a.each(d,function(b,c){c.indexOf(e._animationPrefix)==-1&&(d[b]=e._animationPrefix+a.trim(c))});var f=d.join(" ").toLowerCase();return"o"==c?this.animationParsed=f:this.closeAnimationParsed=f,f},setCloseAnimation:function(a){this.closeAnimation=a||this.closeAnimation,this._parseAnimation(this.closeAnimation,"c")},setAnimationSpeed:function(a){this.animationSpeed=a||this.animationSpeed},columnClassParsed:"",setColumnClass:function(a){this.columnClass=a||this.columnClass,this._parseColumnClass(this.columnClass),this.$jconfirmBoxContainer.addClass(this.columnClassParsed)},_parseColumnClass:function(a){a=a.toLowerCase();var b;switch(a){case"xl":case"xlarge":b="col-md-12";break;case"l":case"large":b="col-md-8 col-md-offset-2";break;case"m":case"medium":b="col-md-6 col-md-offset-3";break;case"s":case"small":b="col-md-4 col-md-offset-4";break;case"xs":case"xsmall":b="col-md-2 col-md-offset-5";break;default:b=a}this.columnClassParsed=b},initDraggable:function(){var c=this,d=this.$titleContainer;this.resetDrag(),this.draggable&&(d.addClass("jconfirm-hand"),d.on("mousedown",function(a){c.mouseX=a.clientX,c.mouseY=a.clientY,c.isDrag=!0}),a(b).on("mousemove."+this._id,function(a){c.isDrag&&(c.movingX=a.clientX-c.mouseX+c.initialX,c.movingY=a.clientY-c.mouseY+c.initialY,c.setDrag())}),a(b).on("mouseup."+this._id,function(){c.isDrag&&(c.isDrag=!1,c.initialX=c.movingX,c.initialY=c.movingY)}))},resetDrag:function(){this.isDrag=!1,this.initialX=0,this.initialY=0,this.movingX=0,this.movingY=0,this.movingXCurrent=0,this.movingYCurrent=0,this.mouseX=0,this.mouseY=0,this.$jconfirmBoxContainer.css("transform","translate(0px, 0px)")},setDrag:function(){if(this.draggable){this.alignMiddle=!1,this._boxWidth=this.$jconfirmBox.outerWidth();var c=a(b).width(),d=this;if(d.movingX%2==0||d.movingY%2==0){var e=d._boxTopMargin-d.dragWindowGap;e+d.movingY<0?d.movingY=-e:d.movingYCurrent=d.movingY;var f=c/2-d._boxWidth/2,g=c/2+d._boxWidth/2-d._boxWidth;g-=d.dragWindowGap,f-=d.dragWindowGap,f+d.movingX<0?d.movingX=-f:g-d.movingX<0?d.movingX=g:d.movingXCurrent=d.movingX,d.$jconfirmBoxContainer.css("transform","translate("+d.movingX+"px, "+d.movingY+"px)")}}},_hash:function(a){var b=a.toString(),c=0;if(0==b.length)return c;for(var d=0;d<b.length;d++){var e=b.toString().charCodeAt(d);c=(c<<5)-c+e,c&=c}return c},_watchContent:function(){var a=this;this._timer&&clearInterval(this._timer),this._timer=setInterval(function(){var b=a._hash(a.$content.html()),c=a.$content.height();a._contentHash==b&&a._contentHeight==c||(a._contentHash=b,a._contentHeight=c,a.setDialogCenter(),a._imagesLoaded())},this.watchInterval)},_hilightAnimating:!1,_hiLightModal:function(){var a=this;if(!this._hilightAnimating){a.$body.addClass("hilight");var b=2;this._hilightAnimating=!0,setTimeout(function(){a._hilightAnimating=!1,a.$body.removeClass("hilight")},1e3*b)}},_bindEvents:function(){var c=this;this.boxClicked=!1,this.$scrollPane.click(function(a){if(!c.boxClicked){var e,b=!1,d=!1;if(e="function"==typeof c.backgroundDismiss?c.backgroundDismiss():c.backgroundDismiss,"string"==typeof e&&"undefined"!=typeof c.buttons[e]?(b=e,d=!1):d="undefined"==typeof e||1==!!e,b){var f=c.buttons[b].action.apply(c);d="undefined"==typeof f||!!f}d?c.close():c._hiLightModal()}c.boxClicked=!1}),this.$jconfirmBox.click(function(a){c.boxClicked=!0});var d=!1;a(b).on("jcKeyDown."+c._id,function(a){d||(d=!0,console.log("keydown"+d))}),a(b).on("keyup."+c._id,function(a){d&&(c.reactOnKey(a),d=!1)}),a(b).on("resize."+this._id,function(){c.setDialogCenter(!0),setTimeout(function(){c.resetDrag()},100)})},_cubic_bezier:"0.36, 0.55, 0.19",_getCSS:function(a,b){return{"-webkit-transition-duration":a/1e3+"s","transition-duration":a/1e3+"s","-webkit-transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+b+")","transition-timing-function":"cubic-bezier("+this._cubic_bezier+", "+b+")"}},_imagesLoaded:function(){var b=this;b.imageLoadInterval&&clearInterval(b.imageLoadInterval),a.each(this.$content.find("img:not(.loaded)"),function(c,d){b.imageLoadInterval=setInterval(function(){var c=a(d).css("height");"0px"!==c&&(a(d).addClass("loaded"),clearInterval(b.imageLoadInterval),b.setDialogCenter())},40)})},_setButtons:function(){var b=this,c=0;if("object"!=typeof this.buttons&&(this.buttons={}),a.each(this.buttons,function(d,e){c+=1,"function"==typeof e&&(b.buttons[d]=e={action:e}),b.buttons[d].text=e.text||d,b.buttons[d].btnClass=e.btnClass||"btn-default",b.buttons[d].action=e.action||function(){},b.buttons[d].keys=e.keys||[],a.each(b.buttons[d].keys,function(a,c){b.buttons[d].keys[a]=c.toLowerCase()});var f=a('<button type="button" class="btn '+b.buttons[d].btnClass+'">'+b.buttons[d].text+"</button>").click(function(a){a.preventDefault();var c=b.buttons[d].action.apply(b);b.onAction(d),b._stopCountDown(),("undefined"==typeof c||c)&&b.close()});b.buttons[d].el=f,b.buttons[d].setText=function(a){f.html(a)},b.buttons[d].addClass=function(a){f.addClass(a)},b.buttons[d].removeClass=function(a){f.removeClass(a)},b.buttons[d].disable=function(){f.prop("disabled",!0)},b.buttons[d].enable=function(){f.prop("disabled",!1)},b.buttons[d].show=function(){f.css("display",""),b.setDialogCenter()},b.buttons[d].hide=function(){f.css("display","none"),b.setDialogCenter()},b["$_"+d]=b["$$"+d]=f,b.$btnc.append(f)}),0===c&&this.$btnc.hide(),null===this.closeIcon&&0===c&&(this.closeIcon=!0),this.closeIcon){if(this.closeIconClass){var d='<i class="'+this.closeIconClass+'"></i>';this.$closeIcon.html(d)}this.$closeIcon.click(function(a){a.preventDefault();var e,c=!1,d=!1;if(e="function"==typeof b.closeIcon?b.closeIcon():b.closeIcon,"string"==typeof e&&"undefined"!=typeof b.buttons[e]?(c=e,d=!1):d="undefined"==typeof e||1==!!e,c){var f=b.buttons[c].action.apply(b);d="undefined"==typeof f||!!f}d&&b.close()}),this.$closeIcon.show()}else this.$closeIcon.hide()},setTitle:function(a,b){if(b=b||!1,"undefined"!=typeof a)if("string"==typeof a)this.title=a;else if("function"==typeof a){"function"==typeof a.promise&&console.error("Promise was returned from title function, this is not supported.");var c=a();"string"==typeof c?this.title=c:this.title=!1}else this.title=!1;this.isAjaxLoading&&!b||this.$title.html(this.title||"")},setIcon:function(a,b){if(b=b||!1,"undefined"!=typeof a)if("string"==typeof a)this.icon=a;else if("function"==typeof a){var c=a();"string"==typeof c?this.icon=c:this.icon=!1}else this.icon=!1;this.isAjaxLoading&&!b||this.$icon.html(this.icon?'<i class="'+this.icon+'"></i>':"")},setContentPrepend:function(a,b){this.contentParsed=a+this.contentParsed,this.isAjaxLoading&&!b||this.$content.prepend(a)},setContentAppend:function(a,b){this.contentParsed=this.contentParsed+a,this.isAjaxLoading&&!b||this.$content.append(a)},setContent:function(a,b){b=b||!1;var c=this;this.contentParsed="undefined"==typeof a?this.contentParsed:a,this.isAjaxLoading&&!b||(this.$content.html(this.contentParsed),this.setDialogCenter(),setTimeout(function(){c.$body.find("input[autofocus]:visible:first").focus()},100))},loadingSpinner:!1,showLoading:function(a){this.loadingSpinner=!0,this.$jconfirmBox.addClass("loading"),a&&this.$btnc.find("button").prop("disabled",!0),this.setDialogCenter()},hideLoading:function(a){this.loadingSpinner=!1,this.$jconfirmBox.removeClass("loading"),a&&this.$btnc.find("button").prop("disabled",!1),this.setDialogCenter()},ajaxResponse:!1,contentParsed:"",isAjax:!1,isAjaxLoading:!1,_parseContent:function(){var b=this,c="&nbsp;";if("function"==typeof this.content){var d=this.content.apply(this);"string"==typeof d?this.content=d:"object"==typeof d&&"function"==typeof d.always?(this.isAjax=!0,this.isAjaxLoading=!0,d.always(function(a,c,d){b.ajaxResponse={data:a,status:c,xhr:d},b._contentReady.resolve(a,c,d),"function"==typeof b.contentLoaded&&b.contentLoaded(a,c,d)}),this.content=c):this.content=c}if("string"==typeof this.content&&"url:"===this.content.substr(0,4).toLowerCase()){this.isAjax=!0,this.isAjaxLoading=!0;var e=this.content.substring(4,this.content.length);a.get(e).done(function(a){b.contentParsed=a}).always(function(a,c,d){b.ajaxResponse={data:a,status:c,xhr:d},b._contentReady.resolve(a,c,d),"function"==typeof b.contentLoaded&&b.contentLoaded(a,c,d)})}this.content||(this.content=c),this.isAjax||(this.contentParsed=this.content,this.setContent(this.contentParsed),b._contentReady.resolve())},_stopCountDown:function(){clearInterval(this.autoCloseInterval),this.$cd&&this.$cd.remove()},_startCountDown:function(){var b=this,c=this.autoClose.split("|");if(2!==c.length)return console.error("Invalid option for autoClose. example 'close|10000'"),!1;var d=c[0],e=parseInt(c[1]);if("undefined"==typeof this.buttons[d])return console.error("Invalid button key '"+d+"' for autoClose"),!1;var f=e/1e3;this.$cd=a('<span class="countdown"> ('+f+")</span>").appendTo(this["$_"+d]),this.autoCloseInterval=setInterval(function(){b.$cd.html(" ("+(f-=1)+") "),0===f&&(b["$$"+d].trigger("click"),b._stopCountDown())},1e3)},_getKey:function(a){switch(a){case 192:return"tilde";case 13:return"enter";case 16:return"shift";case 9:return"tab";case 20:return"capslock";case 17:return"ctrl";case 91:return"win";case 18:return"alt";case 27:return"esc";case 32:return"space"}var b=String.fromCharCode(a);return!!/^[A-z0-9]+$/.test(b)&&b.toLowerCase()},reactOnKey:function(b){var c=this,d=a(".jconfirm");if(d.eq(d.length-1)[0]!==this.$el[0])return!1;var e=b.which;if(this.$content.find(":input").is(":focus")&&/13|32/.test(e))return!1;var f=this._getKey(e);if("esc"===f&&this.escapeKey)if(this.escapeKey===!0)this.$scrollPane.trigger("click");else if("string"==typeof this.escapeKey||"function"==typeof this.escapeKey){var g;g="function"==typeof this.escapeKey?this.escapeKey():this.escapeKey,g&&("undefined"==typeof this.buttons[g]?console.warn("Invalid escapeKey, no buttons found with key "+g):this["$_"+g].trigger("click"))}a.each(this.buttons,function(a,b){b.keys.indexOf(f)!=-1&&c["$_"+a].trigger("click")})},_boxTopMargin:0,_boxBottomMargin:0,_boxWidth:0,setDialogCenter:function(){var c,d,e;c=0,d=0,"none"!=this.$contentPane.css("display")&&(c=this.$content.outerHeight()||0,d=this.$contentPane.height()||0);var f=this.$content.children();if(0!=f.length){var g=parseInt(f.eq(0).css("margin-top"));g&&(c+=g)}0==d&&(d=c);var i,h=a(b).height();i=this.$body.outerHeight()-d+c;var j=(h-i)/2;i>h-(this.offsetTop+this.offsetBottom)||!this.alignMiddle?(e={"margin-top":this.offsetTop,"margin-bottom":this.offsetBottom},this._boxTopMargin=this.offsetTop,this._boxBottomMargin=this.offsetBottom,a("body").addClass("jconfirm-no-scroll-"+this._id)):(e={"margin-top":j,"margin-bottom":this.offsetBottom},this._boxTopMargin=j,this._boxBottomMargin=this.offsetBottom,a("body").removeClass("jconfirm-no-scroll-"+this._id)),this.$contentPane.css({height:c}).scrollTop(0),this.$body.css(e),this.setDrag()},_unwatchContent:function(){clearInterval(this._timer)},close:function(){var c=this;"function"==typeof this.onClose&&this.onClose(),this._unwatchContent(),clearInterval(this.imageLoadInterval),a(b).unbind("resize."+this._id),a(b).unbind("keyup."+this._id),a(b).unbind("jcKeyDown."+this._id),this.draggable&&(a(b).unbind("mousemove."+this._id),a(b).unbind("mouseup."+this._id),this.$titleContainer.unbind("mousedown")),a("body").removeClass("jconfirm-no-scroll-"+this._id),this.$body.addClass(this.closeAnimationParsed),this.$jconfirmBg.addClass("jconfirm-bg-h");var d="none"==this.closeAnimation?1:this.animationSpeed;return c.$el.removeClass(c.loadedClass),setTimeout(function(){c.$el.remove();var e=(jconfirm.instances,jconfirm.instances.length-1);for(e;e>=0;e--)jconfirm.instances[e]._id==c._id&&jconfirm.instances.splice(e,1);if(!jconfirm.instances.length&&c.scrollToPreviousElement&&jconfirm.lastFocused&&jconfirm.lastFocused.length&&a.contains(document,jconfirm.lastFocused[0])){var f=jconfirm.lastFocused;if(c.scrollToPreviousElementAnimate){var g=a(b).scrollTop(),h=jconfirm.lastFocused.offset().top,i=a(b).height();if(h>g&&h<g+i)f.focus();else{var j=h-Math.round(i/3);a("html, body").animate({scrollTop:j},c.animationSpeed,"swing",function(){f.focus()})}}else f.focus();jconfirm.lastFocused=!1}"function"==typeof c.onDestroy&&c.onDestroy()},.4*d),!0},open:function(){return this._buildHTML(),this._bindEvents(),this._open(),!0},_open:function(){var a=this;"function"==typeof a.onOpenBefore&&a.onOpenBefore(),this.$body.removeClass(this.animationParsed),this.$jconfirmBg.removeClass("jconfirm-bg-h"),this.$body.focus(),setTimeout(function(){a.$body.css(a._getCSS(a.animationSpeed,1)),a.$body.css({"transition-property":a.$body.css("transition-property")+", margin"}),a._modalReady.resolve(),"function"==typeof a.onOpen&&a.onOpen(),a.$el.addClass(a.loadedClass)},this.animationSpeed)},loadedClass:"jconfirm-open",isClosed:function(){return""===this.$el.css("display")},isOpen:function(){return!this.isClosed()},toggle:function(){this.isOpen()?this.close():this.open()}},jconfirm.instances=[],jconfirm.lastFocused=!1,jconfirm.pluginDefaults={template:'<div class="jconfirm"><div class="jconfirm-bg jconfirm-bg-h"></div><div class="jconfirm-scrollpane"><div class="jc-bs3-container"><div class="jc-bs3-row"><div class="jconfirm-box-container"><div class="jconfirm-box" role="dialog" aria-labelledby="labelled" tabindex="-1"><div class="jconfirm-closeIcon">&times;</div><div class="jconfirm-title-c"><span class="jconfirm-icon-c"></span><span class="jconfirm-title"></span></div><div class="jconfirm-content-pane"><div class="jconfirm-content"></div></div><div class="jconfirm-buttons"></div><div class="jconfirm-clear"></div></div></div></div></div></div></div>',title:"Hello",titleClass:"",type:"default",typeAnimated:!0,draggable:!1,alignMiddle:!0,content:"Are you sure to continue?",buttons:{},defaultButtons:{ok:{action:function(){}},close:{action:function(){}}},contentLoaded:function(){},icon:"",bgOpacity:null,theme:"light",animation:"zoom",closeAnimation:"scale",animationSpeed:400,animationBounce:1.2,escapeKey:!0,rtl:!1,container:"body",containerFluid:!1,backgroundDismiss:!1,backgroundDismissAnimation:"shake",autoClose:!1,closeIcon:null,closeIconClass:!1,watchInterval:100,columnClass:"col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1",boxWidth:"50%",scrollToPreviousElement:!0,scrollToPreviousElementAnimate:!0,useBootstrap:!0,offsetTop:50,offsetBottom:50,dragWindowGap:15,bootstrapClasses:{container:"container",containerFluid:"container-fluid",row:"row"},onContentReady:function(){},onOpenBefore:function(){},onOpen:function(){},onClose:function(){},onDestroy:function(){},onAction:function(){}};var c=!1;a(b).on("keydown",function(d){if(!c){var e=a(d.target),f=!1;e.closest(".jconfirm-box").length&&(f=!0),f&&a(b).trigger("jcKeyDown"),c=!0}}),a(b).on("keyup",function(a){c=!1})}(jQuery,window);

(function($){

	"use strict";

	function shopkit_show_element_options(el) {
		var show = '.shopkit-ot-'+el.val()+'-wrap';
		var wrap = el.closest('.option-tree-setting-body');
		wrap.find(show).show();
		wrap.find(show+' input,'+show+' select').each(function(){$(this).prop('disabled', false);});
	}

	function shopkit_hide_element_options(el) {
		el.closest('.option-tree-setting-body').find('.shopkit-ot-hide-wrap').each( function() {
			$(this).find('input,select').each(function(){$(this).prop('disabled', true);});
			$(this).hide();
		});
	}
	$(document).on('change', '.inside > div[id$="_elements_on_left"] .option-tree-setting-body .shopkit-select-element, .inside > div[id$="_elements_on_right"] .option-tree-setting-body .shopkit-select-element', function() {
		shopkit_hide_element_options($(this));
		shopkit_show_element_options($(this));
	});

	$(window).load( function() {
		$('.inside > div[id$="_elements_on_left"] .option-tree-setting-body .shopkit-select-element, .inside > div[id$="_elements_on_right"] .option-tree-setting-body .shopkit-select-element').each( function() {
			shopkit_hide_element_options($(this));
		});
		$('.inside > div[id$="_elements_on_left"] .option-tree-setting-body .shopkit-select-element, .inside > div[id$="_elements_on_right"] .option-tree-setting-body .shopkit-select-element').each( function() {
			shopkit_show_element_options($(this));
		});
	});

	$(document).on('click', '#shopkit-save', function() {
		$('#option-tree-settings-api .option-tree-ui-buttons .button-primary').click();
		return false;
	});

	$(document).on('click', '#install-demo:not(.disabled)', function() {

		if ( !confirm(shopkit.locale.demo_install) ) {
			return false;
		}

		$(this).addClass('disabled');

		$('#shopkit-demo').append('<br/><br/><code id="shopkit-demo-status">Init</code><span id="shopkit-demo-progress"><span id="shopkit-demo-progress-bar"></span></span>');

		pingAjax('initDemo', '');

		return false;

	});

	var demo = {
		states : {
			initDemo : {
				status : false
			},
			addImage : {
				status : false
			},
			addDatabase : {
				status : false
			},
			addWidgets : {
				status : false
			},
			addPlugins : {
				status : false
			},
			closeDemo : {
				status : false
			}
		}
	}
	var demoSections = 6;
	var demoProgress = false;

	function pingAjax(getMode, data) {

		if ( demoProgress === false ) {

			if ( data == '' ) {
				data = {
					mode: getMode
				}
			}

			var parsedResponse;

			$.when( call_ajax( data ) ).done( function(response) {

				try {
					parsedResponse = $.parseJSON(response);
				}
				catch (e) {
					alert('AJAX Error!');
					return false;
				}

				demoProgress = true;

				if ( parsedResponse.progress == 'success' ) {
					demo.states[getMode].status = true;
					$.each( demo.states, function(n, obj) {
						setStatus(parsedResponse.msg);
						setDemoProgress( demoSections );
						if ( demo.states[n].status === false ) {
							demoProgress = false;
							pingAjax(n,'');
							return false;
						}
						--demoSections;
					});
				}
				else if ( parsedResponse.progress == 'notdone' ) {
					data = {
						mode: getMode,
						progress: JSON.stringify( parsedResponse.progressData )
					}
					setStatus(parsedResponse.msg.replace('##',parsedResponse.progressData.next));
					setDemoImageProgress(parsedResponse.progressData.next);
					demoProgress = false;
					pingAjax(getMode, data);
					return false;
				}
				else {
					alert('AJAX Error!');
					return false;
				}

				if ( parsedResponse.state == 'closeDemo' ) {
					$('#shopkit-demo-progress-bar').css({'width':'100%'}).html('100%');
					alert(shopkit.locale.demo_complete);
					location.reload();
				}

			});

		}

	}

	function setStatus(msg) {
		$('#shopkit-demo-status').html(msg);
	}

	function setDemoImageProgress(next) {
		var currentState = 5+(Math.floor(parseInt(next)/21*8));
		$('#shopkit-demo-progress-bar').css({'width':currentState+'%'}).html(currentState+'%');
	}

	function setDemoProgress(demoSections) {
		switch(demoSections) {
			case 6:
				$('#shopkit-demo-progress-bar').css({'width':'2%'}).html('2%');
			break;
			case 5:
				$('#shopkit-demo-progress-bar').css({'width':'5%'}).html('5%');
			break;
			case 4:
				$('#shopkit-demo-progress-bar').css({'width':'85%'}).html('85%');
			break;
			case 3:
				$('#shopkit-demo-progress-bar').css({'width':'90%'}).html('85%');
			break;
			case 2:
				$('#shopkit-demo-progress-bar').css({'width':'95%'}).html('90%');
			break;
			case 1:
				$('#shopkit-demo-progress-bar').css({'width':'97%'}).html('95%');
			break;
			case 0:
				$('#shopkit-demo-progress-bar').css({'width':'99%'}).html('97%');
			break;
			default:
				$('#shopkit-demo-progress-bar').css({'width':'99%'}).html('99%');
			break;
		}
	}

	function call_ajax(data) {

		data['action'] = 'shopkit_demo_install';
		data['_shopkit_nonce'] = shopkit.nonce;

		return $.post(shopkit.ajax, data, function(response) {

		});

	}

	$('#section_elements .option-tree-setting-title').prop('disabled', true);

	$('#shopkit_demo_install').prop('disabled', true);

	$('#option-tree-settings-api').bind('submit', function (e) {


		if ( $(this).is('#page-ot_theme_options form') ) {
			var els = $('.type-typography select[name$="[line-height]"]:not(#site_title_font-line-height,#site_description_font-line-height), .type-typography select[name$="[font-size]"]:not(#site_title_font-font-size,#site_description_font-font-size), .type-typography input.wp-color-picker:not(#site_title_font-picker,#site_description_font-picker), .type-colorpicker input.wp-color-picker');
		}
		else {
			var els = $('#section_content .list-list-item').find('.type-typography input.wp-color-picker:enabled, .type-colorpicker input.wp-color-picker:enabled');
		}

		var elsLength = els.length;
		if ( elsLength > 0 ) {

			var notGood = false;
			var notGoodFirst = '';
			els.each(function(){
				if ( $(this).val() == '' ) {
					if ( notGoodFirst == '' ) {
						notGoodFirst = $(this);
						notGood = true;
					}
				}
				if ( !--elsLength ) {
					if ( notGood === false ) {
						$('#section_elements .option-tree-setting-title').prop('disabled', false);
					}
					else {
						e.preventDefault();
						if ( notGoodFirst.is('.wp-color-picker') ) {
							$.alert({
								title: shopkit.locale.error,
								content: shopkit.locale.save_notready_colors+' <strong>'+notGoodFirst.closest('.format-settings').find('h3.label').text()+'</strong>'
							});
						}
						else {
							$.alert({
								title: shopkit.locale.error,
								content: shopkit.locale.save_notready_fonts+' <strong>'+notGoodFirst.closest('.format-settings').find('h3.label').text()+'</strong>'
							});
						}
						return false;
					}
				}
			});

		}

	});

})(jQuery);