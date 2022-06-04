!function(e){
    "function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e:e(jQuery)
}
(function(e){
    var t,
    i,
    n=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],
    o="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],
    l=Array.prototype.slice;
    if(e.event.fixHooks)
        for(var s=n.length;s;)
            e.event.fixHooks[n[--s]]=e.event.mouseHooks;
            var a=e.event.special.mousewheel={
                version:"3.1.12",
                setup:function(){
                    if(this.addEventListener)
                        for(var t=o.length;t;)
                            this.addEventListener(o[--t],h,!1);
                    else this.onmousewheel=h;
                    e.data(this,"mousewheel-line-height",a.getLineHeight(this)),
                    e.data(this,"mousewheel-page-height",a.getPageHeight(this))
                },
                teardown:function(){
                    if(this.removeEventListener)
                        for(var t=o.length;t;)
                            this.removeEventListener(o[--t],h,!1);
                    else this.onmousewheel=null;
                    e.removeData(this,"mousewheel-line-height"),e.removeData(this,"mousewheel-page-height")
                },
                getLineHeight:function(t){
                    var i=e(t),n=i["offsetParent"in e.fn?"offsetParent":"parent"]();
                    return n.length||(n=e("body")),
                    parseInt(n.css("fontSize"),10)||parseInt(i.css("fontSize"),10)||16
                },
                getPageHeight:function(t){
                    return e(t).height()
                },
                settings:{
                    adjustOldDeltas:!0,normalizeOffset:!0
                }
            };
            function h(n){
                var o,s=n||window.event,h=l.call(arguments,1),f=0,d=0,c=0,m=0,g=0;
                if((n=e.event.fix(s)).type="mousewheel",
                "detail"in s&&(c=-1*s.detail),
                "wheelDelta"in s&&(c=s.wheelDelta),
                "wheelDeltaY"in s&&(c=s.wheelDeltaY),
                "wheelDeltaX"in s&&(d=-1*s.wheelDeltaX),
                "axis"in s&&s.axis===s.HORIZONTAL_AXIS&&(d=-1*c,c=0),
                f=0===c?d:c,
                "deltaY"in s&&(f=c=-1*s.deltaY),
                "deltaX"in s&&(d=s.deltaX,0===c&&(f=-1*d)),0!==c||0!==d){
                    if(1===s.deltaMode){
                        var w=e.data(this,"mousewheel-line-height");
                        f*=w,c*=w,d*=w
                    }
                    else if(2===s.deltaMode){
                        var v=e.data(this,"mousewheel-page-height");
                        f*=v,c*=v,d*=v
                    }
                    if(o=Math.max(Math.abs(c),Math.abs(d)),
                    (!i||o<i)&&(i=o,u(s,o)&&(i/=40)),
                    u(s,o)&&(f/=40,d/=40,c/=40),
                    f=Math[f>=1?"floor":"ceil"](f/i),
                    d=Math[d>=1?"floor":"ceil"](d/i),
                    c=Math[c>=1?"floor":"ceil"](c/i),
                    a.settings.normalizeOffset&&this.getBoundingClientRect){
                        var p=this.getBoundingClientRect();
                        m=n.clientX-p.left,g=n.clientY-p.top
                    }
                    return n.deltaX=d,
                    n.deltaY=c,
                    n.deltaFactor=i,
                    n.offsetX=m,
                    n.offsetY=g,n.deltaMode=0,h.unshift(n,f,d,c),t&&clearTimeout(t),t=setTimeout(r,200),(e.event.dispatch||e.event.handle).apply(this,h)}}function r(){i=null}function u(e,t){return a.settings.adjustOldDeltas&&"mousewheel"===e.type&&t%120==0}e.fn.extend({mousewheel:function(e){return e?this.bind("mousewheel",e):this.trigger("mousewheel")},unmousewheel:function(e){return this.unbind("mousewheel",e)}})});