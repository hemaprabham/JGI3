publishedWBJP([17],
    {
        0:function(i,t,e){
            i.exports=e(622)
        },
        607:function(i,t,e){
            var n,s;
            !(n=[e(1),e(3)],s=function(i,t){
                var e={};
                var n;
                e.init=function(i){
                    if(!n){
                        n=new s(i)
                    }
                };
                e.destroy=function(){
                    if(n){
                        n.destroy();
                        n=null
                    }
                };
                function s(i){
                    this.config=i;
                    this.queryDom();
                    this.updateTransitions();
                    this.updateIsForced();
                    this.bindTriggerHandlers();
                    this.bindPostCloseActions();
                    this.bindWindowResizeHandler()
                }
                s.prototype={
                    config:null,
                    paneEl:null,
                    slidingEl:null,
                    stickyNavEl:null,
                    stickyOffset:null,
                    coveringEl:null,
                    bodyEl:null,
                    triggerEl:null,
                    spotlightEl:null,
                    isOpen:false,
                    isLeft:false,
                    isFullscreen:false,
                    isSlidingNav:false,
                    paneWidth:0,
                    paneTransition:null,
                    queryDom:function(){
                        this.paneEl=i(".w-navpane");
                        this.slidingEl=i(".w-navpane-slide:not(.w-navpane)");
                        this.stickyNavEl=i(".w-navbar-sticky");
                        this.triggerEl=i(".w-navpane-trigger");
                        this.spotlightEl=i(".w-navpane-spotlight");
                        this.bodyEl=i("body");
                        this.isFullscreen=this.paneEl.hasClass("w-navpane-fullscreen");
                        this.isSlidingNav=this.paneEl.hasClass("w-navpane-slide");
                        this.paneTransition=this.paneEl.css("transition")
                    },
                    updateIsForced:function(){
                        this.bodyEl.toggleClass("w-navpane-is-forced",this.isForced())
                    },
                    isForced:function(){
                        if(this.config.isForced){
                            return true
                        }
                        if(this.config.condense!==false&&i(window).width()<=this.config.condense){
                            return true
                        }
                        return false
                    },
                    queryIsLeft:function(){
                        this.isLeft=this.triggerEl.eq(0).position().left<this.bodyEl.width()/2
                    },
                    queryPaneWidth:function(){
                        this.paneWidth=this.paneEl.outerWidth()
                    },
                    open:function(){
                        var i=this;
                        this.isOpen=true;
                        this.triggerEl.addClass("w-navpane-trigger-active");
                        this.queryIsLeft();
                        this.queryPaneWidth();
                        if(!this.isFullscreen){
                            this.addCovering();
                            this.pinStickyNavToPage();
                            this.preparePaneForOpen();
                            setTimeout(function(){
                                i.addSpotlight();
                                i.movePaneToOpenPosition();
                                i.moveSliderToOpenPosition()
                            },
                            0)
                        }
                        else{
                            if(this.isSlidingNav){
                                this.paneEl.show()
                            }
                            setTimeout(function(){
                                i.paneEl.show().css("opacity",1)
                            },
                            0)
                        }this.bodyEl.addClass("w-navpane-is-open");this.bindCloseHandlers()},preparePaneForOpen:function(){this.bodyEl.toggleClass("w-navpane-is-left",this.isLeft);this.bodyEl.toggleClass("w-navpane-is-right",!this.isLeft);if(this.isSlidingNav){this.paneEl.show();if(this.isLeft){this.paneEl.css({left:-this.paneWidth,right:"auto"})}else{this.paneEl.css({right:-this.paneWidth,left:"auto"})}}},movePaneToOpenPosition:function(){if(this.isSlidingNav){if(this.isLeft){this.paneEl.css("left",0)}else{this.paneEl.css("right",0)}}},movePaneToClosePosition:function(){if(this.isSlidingNav){if(this.isLeft){this.paneEl.css("left",-this.paneWidth)}else{this.paneEl.css("right",-this.paneWidth)}}else{if(!this.isFullscreen){this.removeCovering()}}},moveSliderToOpenPosition:function(){if(this.isLeft){this.slidingEl.css({left:this.paneWidth,right:-this.paneWidth})}else{this.slidingEl.css({left:-this.paneWidth,right:this.paneWidth})}},moveSliderToClosePosition:function(){this.slidingEl.css({left:0,right:0})},close:function(){this.isOpen=false;this.bodyEl.removeClass("w-navpane-is-open");this.triggerEl.removeClass("w-navpane-trigger-active");if(!this.isFullscreen){this.movePaneToClosePosition();this.moveSliderToClosePosition();this.removeSpotlight()}else{this.paneEl.css("opacity",0)}this.unbindCloseHandlers()},bindTriggerHandlers:function(){var i=this;this.triggerEl.on("click.navpane",function(t){t.stopPropagation();if(i.isOpen){i.close()}else{i.open()}})},unbindTriggerHandlers:function(){this.triggerEl.off("click.navpane")},postCloseHandler:function(){if(!this.isOpen){if(!this.isFullscreen){this.paneEl.scrollTop(0);this.unpinStickyNavToPage();this.removeCovering()}this.paneEl.hide()}},bindPostCloseActions:function(){o(this.paneEl,this.postCloseHandler.bind(this))},unbindPostCloseActions:function(){a(this.paneEl)},bindCloseHandlers:function(){var t=this;var e=".w-navpane-trigger, .w-navpane-is-open .w-navpane-covering, .w-navpane-close";i(document).on("click.navpane",e,function(i){i.stopPropagation();t.close()})},unbindCloseHandlers:function(){i(document).off("click.navpane")},bindWindowResizeHandler:function(){this.unbindWindowResizeHandler();if(this.config.condense===false||this.config.isForced){return}this.resizeHandler=t.debounce(t.bind(this.updateIsForced,this),100);i(window).on("resize",this.resizeHandler)},unbindWindowResizeHandler:function(){if(this.resizeHandler!=null){i(window).off("resize",this.resizeHandler);this.resizeHandler=null}},addCovering:function(){if(!this.coveringEl){this.coveringEl=i("<div class='w-navpane-covering'></div>");this.paneEl.after(this.coveringEl)}},removeCovering:function(){if(this.coveringEl!=null){this.coveringEl.remove();this.coveringEl=null}},addSpotlight:function(){if(this.paneEl.hasClass("w-navpane-spotlight")){this.coveringEl.addClass("w-navpane-covering-dark");this.coveringEl.css("transition",this.paneTransition)}},removeSpotlight:function(){if(this.paneEl.hasClass("w-navpane-spotlight")){this.coveringEl.removeClass("w-navpane-covering-dark")}},updateTransitions:function(){if(this.slidingEl.length){this.slidingEl.css("transition",this.paneTransition)}if(this.coveringEl){this.coveringEl.css("transition",this.paneTransition)}},pinStickyNavToPage:function(){if(this.stickyNavEl.css("position")==="fixed"){this.stickyOffset=this.stickyNavEl.position().top;this.stickyNavEl.css("position","absolute");this.stickyNavEl.css("top",this.stickyNavEl.postion.top()+this.stickyOffset)}},unpinStickyNavToPage:function(){if(this.stickyNavEl.hasClass("w-navbar-stuck")){if(this.stickyNavEl.css("z-index")==="100"){this.stickyNavEl.css({position:"fixed",top:this.stickyOffset})}else if(this.stickyNavEl.css("z-index")==="99"){this.stickyNavEl.css({position:"fixed",top:0})}}},destroy:function(){if(this.isOpen){this.close()}this.unbindTriggerHandlers();this.unbindPostCloseActions();this.unbindWindowResizeHandler();this.postCloseHandler()}};function o(i,t){i.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd",t)}function a(i){i.off("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd")}return{data:[{name:"forced",title:"Collapse Navigation",type:"toggle",default:true}],render:function(i){e.destroy();e.init({isForced:Boolean(i.forced),condense:i.condense!=null?i.condense:1024})}}}.apply(t,n),s!==undefined&&(i.exports=s))},608:function(i,t,e){var n,s;!(n=[e(1),e(628)],s=function(i){return{data:[{name:"type",title:"Sticky Navbar",type:"dropdown",choices:[{value:"normal",title:"Normal"},{value:"fixed",title:"Fixed"},{value:"semi-fixed",title:"Semi-fixed"}],default:"normal"}],render:function(t,e){var n="w-navbar-sticky";var s=t.type;if(s!=="normal"){if(i("."+n).length){i("."+n).stickUp({scrollHide:s==="semi-fixed",zIndex:s==="semi-fixed"?100:99,scrollContainer:false,topMargin:"auto"})}}else{if(i("."+n).length){i("."+n).removeStickUp({scrollContainer:false})}}}}}.apply(t,n),s!==undefined&&(i.exports=s))},622:function(i,t,e){var n,s;!(n=[e(2),e(1),e(3),e(608),e(607)],s=function(i,t,e,n,s){var o=function(){var i={};i["navbar-sticky"]=n.data;i["navpane"]=s.data;var a={};a["navbar-sticky"]=n.render;a["navpane"]=s.render;var r={};var l=false;return{init:function(i){l=i&&i.editor;if(i.pluginOptionValues!=null){r=e.clone(i.pluginOptionValues)}for(var t in r){o.trigger(t)}},setPluginOptionValue:function(t,n,s){var a=t.indexOf("/");if(a===-1){return}var l=t.substr(0,a);var f=t.substr(a+1);if(!o.isAvailable(l)){return}var c=e.findWhere(i[l],{name:f});if(c==null){return}if(!(l in r)){r[l]={}}var p=c.type;if(e.isString(n)&&p==="toggle"){n=!!parseInt(n)}r[l][f]=n;if(s){o.trigger(l)}},clearPluginOptionValues:function(){r={}},trigger:function(i){if(i in a&&i in r){var t=a[i];var e=r[i];t(e,l)}},getPluginDefinition:function(t){if(e.isString(t)){t={name:t}}if(!o.isAvailable(t.name)){return[]}var n=i[t.name];return e.map(n,function(i){var s=e.clone(i);s.name=t.name+"/"+s.name;if(t.defaults&&i.name in t.defaults){s["default"]=t.defaults[i.name]}else if(n.length===1&&t["default"]){s["default"]=t["default"]}return s})},setTrigger:function(i){if(typeof i==="object"){t.extend(a,i)}},isAvailable:function(t){return t in i}}}();if(i.themePlugins){t(function(){o.init({pluginOptionValues:i.themePlugins})})}return o}.apply(t,n),s!==undefined&&(i.exports=s))},628:function(i,t,e){var n=e(1);(function(i,t,e){var n=function(n,o){var a=0,r=0,l="",f=0,c=false,p=false,d=false,h=0,u=0,g=0,v=0,m=0,E=0,b=0,y=i(),w=0,k=0,C=false,T=false,P=i('<div style="margin-top:0;margin-bottom:0; padding:0"></div>'),H=i(),I={top:0,bottom:0,custom:[]},x,W={scrollHide:false,lazyHeight:0,topMargin:"auto",keepInWrapper:false,wrapperSelector:"",zIndex:99,syncPosition:false,scrollContainer:false,topOffset:0},N=function(){if(W.topMargin==="auto"){return parseInt(y.css("marginTop"))}else{if(isNaN(W.topMargin)&&W.topMargin.search("px")>0){return parseInt(W.topMargin.replace("px",""))}else if(!isNaN(parseInt(W.topMargin))){return parseInt(W.topMargin)}else{void 0;return 0}}},S=function(){P.remove();y.removeClass("w-navbar-stuck").css({maxWidth:"",marginTop:"",marginLeft:"",marginRight:"",position:"",top:"",left:"",right:"",bottom:"",width:""});c=false;p=false;d=false;if(W.syncPosition)L()},z=function(i){y.before(P.css("height",u));var t=P.offsetParent();if(i){y.css({position:"absolute"});var e=H.offset().top+H.outerHeight()-t.offset().top-g-parseInt(H.css("paddingBottom"))}void 0;void 0;y.css({position:"absolute",marginTop:w,bottom:"",left:P.position().left,top:i?e:y.offset().top-t.offset().top-w})},O=function(){c=true;y.before(P.css("height",u));y.addClass("w-navbar-stuck");var i=-k;y.css({marginTop:w,position:"fixed",top:i+"px",left:"",right:"",bottom:""})},F=function(){y.before(P.css("height",u));y.addClass("w-navbar-stuck");var i=-k;y.css({marginTop:w,position:"fixed",top:"",left:"",right:"",bottom:i})},M=function(){if(P.width()!==y.outerWidth())y.outerWidth(P.outerWidth())},U=function(){x=P.offset().left;if(x!==y.offset().left);y.offset({left:x})},L=function(){P.css({"margin-left":y.css("margin-left"),"margin-right":y.css("margin-left")});y.css({"margin-left":P.css("margin-left"),"margin-right":P.css("margin-right")})},q=function(n){r=i(n.target).scrollTop();l=r>=a?"down":"up";f=Math.abs(a-r);v=i(t).outerHeight();m=r+v;a=r;E=y.offset().top;h=parseInt(y.outerHeight()+w)+parseInt(y.css("marginBottom"));if(W.scrollContainer&&!c)E.top+=r;if(!c&&!d&&!p){u=parseInt(y.outerHeight(true));if(!p&&!d)I.top=parseInt(y.offset().top);else I.top=parseInt(P.offset().top);x=parseInt(y.offset().left)+5}if(W.scrollContainer&&!c)I.top+=r;g=parseInt(y.outerHeight())+parseInt(y.css("margin-bottom"))+w;if(W.keepInWrapper)I.bottom=H.offset().top+H.outerHeight()-parseInt(H.css("paddingBottom"));else I.bottom=i(e).outerHeight();b=y.offset().top+g;if(h>v){T=true;if(C){z();C=false}if(d&&l==="up"&&r<=E-w){void 0;O();c=true;p=false;d=false}if(!c&&!p&&(!W.keepInWrapper||W.keepInWrapper&&m<=I.bottom)&&m>=b-w){void 0;F();p=true;c=true;d=false}if(!d&&c&&p&&l==="up"||!d&&c&&!p&&l==="down"&&b>=m){void 0;z();c=false;p=false;d=true}if(m>=I.bottom&&W.keepInWrapper&&(!p&&!d||parseInt(b-w)!==parseInt(I.bottom))){void 0;z(true);c=false;p=true;d=true}}else{C=true;if(T){z();T=false}if(W.scrollHide)k=h+W.lazyHeight;else k=+W.lazyHeight;if(c){var s=parseInt(y.css("top"));if(l==="up"&&s!==0){var o=f>-s?0:s+f;y.css("top",o+"px")}else if(l==="down"&&s>-k){var o=f>k+s?-k:s-f;y.css("top",o+"px")}}if(!c&&!p&&r>=I.top-w+k||p&&d&&r<=E-w+k){void 0;O();c=true;p=false;d=false}if(W.keepInWrapper&&parseInt(b-w)!==parseInt(I.bottom)&&r>=I.bottom-g+k){void 0;z(true);c=false;p=true;d=true}}if((c||d||p)&&r<=I.top-w){void 0;S()}if(c||d||p)M();if(W.syncPosition&&c||d)U()},A=function(i){if(d)z();void 0;if(W.scrollContainer)i.target=W.scrollContainer;q(i)};var R=function(n,o){y=i(n);if(o){i.extend(true,W,o)}if(y.hasClass("stuckElement")){s(n,o)}y.addClass("stuckElement");w=W.topMargin!=null?N():0;if(W.lazyHeight)w=w+W.lazyHeight;if(W.keepInWrapper){if(W.wrapperSelector!=="")H=y.closest(W.wrapperSelector);if(!H.length)H=y.offsetParent()}else{H=i("body")}if(W.zIndex)y.css("z-index",W.zIndex);if(U){L()}if(!W.scrollContainer){i(e).on("scroll.stickUp",q)}else{i(W.scrollContainer).on("scroll.stickUp",q)}i(t).on("resize.stickUp",A);q({target:!o.scrollContainer?e:W.scrollContainer})};R.call(this,n,o)};var s=function(n,s){if(!s.scrollContainer){i(e).scrollTop(0).trigger("scroll.stickUp");i(e).off("scroll.stickUp")}else{i(s.scrollContainer).scrollTop(0).trigger("scroll.stickUp");i(s.scrollContainer).off("scroll.stickUp")}i(n).removeClass("stuckElement");i(t).off("resize.stickUp")};i.fn.stickUp=function(i){return this.each(function(){new n(this,i)})};i.fn.removeStickUp=function(i){s(this,i)}})(n,window,document)}});