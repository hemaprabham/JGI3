!function(t,e){
    "function"==typeof define&&define.amd?define("packery/js/rect",e):"object"==typeof module&&module.exports?module.exports=e():(t.Packery=t.Packery||{},t.Packery.Rect=e())
}
(window,function(){
    function t(e){
        for(var i in t.defaults)
            this[i]=t.defaults[i];
        for(i in e)
            this[i]=e[i]
    }
    t.defaults={
        x:0,y:0,width:0,height:0
    };
    var e=t.prototype;
    return e.contains=function(t){
        var e=t.width||0,i=t.height||0;
        return this.x<=t.x&&this.y<=t.y&&this.x+this.width>=t.x+e&&this.y+this.height>=t.y+i
    },
    e.overlaps=function(t){
        var e=this.x+this.width,i=this.y+this.height,s=t.x+t.width,r=t.y+t.height;
        return this.x<s&&e>t.x&&this.y<r&&i>t.y},e.getMaximalFreeRects=function(e){
            if(!this.overlaps(e))
                return!1;
                var i,s=[],r=Math.round(this.x),
                n=Math.round(this.y),
                h=Math.round(this.width),
                o=Math.round(this.height),
                a=Math.round(e.x),
                c=Math.round(e.y),
                u=r+h,
                d=n+o,
                g=a+Math.round(e.width),
                l=c+Math.round(e.height);
                return n<c&&(i=new t({
                    x:r,y:n,width:h,height:c-n
                }),
                s.push(i)),u>g&&(i=new t({
                    x:g,y:n,width:u-g,height:o
                }),
                s.push(i)),d>l&&(i=new t({
                    x:r,y:l,width:h,height:d-l
                }),
                s.push(i)),r<a&&(i=new t({
                    x:r,y:n,width:a-r,height:o
                }),
                s.push(i)),s
            },
            e.canFit=function(t){
                return this.width>=t.width&&this.height>=t.height
            },
            t
}),
function(t,e){
    if("function"==typeof define&&define.amd)
        define("packery/js/packer",["./rect"],e);
    else if("object"==typeof module&&module.exports)
        module.exports=e(require("./rect"));
    else{
        var i=t.Packery=t.Packery||{};
        i.Packer=e(i.Rect)
    }
}
(window,function(t){
    function e(t,e,i){
        this.width=t||0,this.height=e||0,this.sortDirection=i||"downwardLeftToRight",this.reset()
    }
    var i=e.prototype;i.reset=function(){
        this.spaces=[];
        var e=new t({
            x:0,y:0,width:this.width,height:this.height
        });
        this.spaces.push(e),this.sorter=s[this.sortDirection]||s.downwardLeftToRight},i.pack=function(t){
            for(var e=0;e<this.spaces.length;e++){
                var i=this.spaces[e];
                if(i.canFit(t)){
                    this.placeInSpace(t,i);
                    break
                }
            }
        },
        i.columnPack=function(t){
            for(var e=0;e<this.spaces.length;e++){
                var i=this.spaces[e];
                if(i.x<=t.x&&i.x+i.width>=t.x+t.width&&i.height>=t.height-.01){
                    t.y=i.y,this.placed(t);break
                }
            }
        },
        i.rowPack=function(t){
            for(var e=0;e<this.spaces.length;e++){
                var i=this.spaces[e];
                if(i.y<=t.y&&i.y+i.height>=t.y+t.height&&i.width>=t.width-.01){
                    t.x=i.x,this.placed(t);
                    break
                }
            }
        },
        i.placeInSpace=function(t,e){
            t.x=e.x,t.y=e.y,this.placed(t)
        },
        i.placed=function(t){for(var e=[],i=0;i<this.spaces.length;i++){var s=this.spaces[i],r=s.getMaximalFreeRects(t);r?e.push.apply(e,r):e.push(s)}if("object"==typeof e){var n=[],h=[];e.forEach(function(t){if(1<t.width){var e=t.y+1,i=t.y-1;-1!==jQuery.inArray(e,h)&&(t.y=e),-1!==jQuery.inArray(i,h)&&(t.y=i),h.push(t.y),n.push(t)}}),e=n}this.spaces=e,this.mergeSortSpaces()},i.mergeSortSpaces=function(){e.mergeRects(this.spaces),this.spaces.sort(this.sorter)},i.addSpace=function(t){this.spaces.push(t),this.mergeSortSpaces()},e.mergeRects=function(t){var e=0,i=t[e];t:for(;i;){for(var s=0,r=t[e+s];r;){if(r==i)s++;else{if(r.contains(i)){t.splice(e,1),i=t[e];continue t}i.contains(r)?t.splice(e+s,1):s++}r=t[e+s]}i=t[++e]}return t};var s={downwardLeftToRight:function(t,e){return t.y-e.y||t.x-e.x},rightwardTopToBottom:function(t,e){return t.x-e.x||t.y-e.y}};return e}),function(t,e){"function"==typeof define&&define.amd?define("packery/js/item",["outlayer/outlayer","./rect"],e):"object"==typeof module&&module.exports?module.exports=e(require("outlayer"),require("./rect")):t.Packery.Item=e(t.Outlayer,t.Packery.Rect)}(window,function(t,e){var i="string"==typeof document.documentElement.style.transform?"transform":"WebkitTransform",s=function(){t.Item.apply(this,arguments)},r=s.prototype=Object.create(t.Item.prototype),n=r._create;r._create=function(){n.call(this),this.rect=new e};var h=r.moveTo;return r.moveTo=function(t,e){var i=Math.abs(this.position.x-t),s=Math.abs(this.position.y-e);this.layout.dragItemCount&&!this.isPlacing&&!this.isTransitioning&&i<1&&s<1?this.goTo(t,e):h.apply(this,arguments)},r.enablePlacing=function(){this.removeTransitionStyles(),this.isTransitioning&&i&&(this.element.style[i]="none"),this.isTransitioning=!1,this.getSize(),this.layout._setRectSize(this.element,this.rect),this.isPlacing=!0},r.disablePlacing=function(){this.isPlacing=!1},r.removeElem=function(){this.element.parentNode.removeChild(this.element),this.layout.packer.addSpace(this.rect),this.emitEvent("remove",[this])},r.showDropPlaceholder=function(){var t=this.dropPlaceholder;t||((t=this.dropPlaceholder=document.createElement("div")).className="packery-drop-placeholder",t.style.position="absolute"),t.style.width=this.size.width+"px",t.style.height=this.size.height+"px",this.positionDropPlaceholder(),this.layout.element.appendChild(t)},r.positionDropPlaceholder=function(){this.dropPlaceholder.style[i]="translate("+this.rect.x+"px, "+this.rect.y+"px)"},r.hideDropPlaceholder=function(){this.layout.element.removeChild(this.dropPlaceholder)},s}),function(t,e){"function"==typeof define&&define.amd?define("packery/js/packery",["get-size/get-size","outlayer/outlayer","./rect","./packer","./item"],e):"object"==typeof module&&module.exports?module.exports=e(require("get-size"),require("outlayer"),require("./rect"),require("./packer"),require("./item")):t.Packery=e(t.getSize,t.Outlayer,t.Packery.Rect,t.Packery.Packer,t.Packery.Item)}(window,function(t,e,i,s,r){i.prototype.canFit=function(t){return this.width>=t.width-2&&this.height>=t.height-2};var n=e.create("packery");n.Item=r;var h=n.prototype;function o(t,e){return t.position.y-e.position.y||t.position.x-e.position.x}function a(t,e){return t.position.x-e.position.x||t.position.y-e.position.y}h._create=function(){e.prototype._create.call(this),this.packer=new s,this.shiftPacker=new s,this.isEnabled=!0,this.dragItemCount=0;var t=this;this.handleDraggabilly={dragStart:function(){t.itemDragStart(this.element)},dragMove:function(){t.itemDragMove(this.element,this.position.x,this.position.y)},dragEnd:function(){t.itemDragEnd(this.element)}},this.handleUIDraggable={start:function(e,i){i&&t.itemDragStart(e.currentTarget)},drag:function(e,i){i&&t.itemDragMove(e.currentTarget,i.position.left,i.position.top)},stop:function(e,i){i&&t.itemDragEnd(e.currentTarget)}}},h._resetLayout=function(){var t,e,i;this.getSize(),this._getMeasurements(),this._getOption("horizontal")?(t=1/0,e=this.size.innerHeight+this.gutter,i="rightwardTopToBottom"):(t=this.size.innerWidth+this.gutter,e=1/0,i="downwardLeftToRight"),this.packer.width=this.shiftPacker.width=t,this.packer.height=this.shiftPacker.height=e,this.packer.sortDirection=this.shiftPacker.sortDirection=i,this.packer.reset(),this.maxY=0,this.maxX=0},h._getMeasurements=function(){this._getMeasurement("columnWidth","width"),this._getMeasurement("rowHeight","height"),this._getMeasurement("gutter","width")},h._getItemLayoutPosition=function(t){if(this._setRectSize(t.element,t.rect),this.isShifting||this.dragItemCount>0){var e=this._getPackMethod();this.packer[e](t.rect)}else this.packer.pack(t.rect);return this._setMaxXY(t.rect),t.rect},h.shiftLayout=function(){this.isShifting=!0,this.layout(),delete this.isShifting},h._getPackMethod=function(){return this._getOption("horizontal")?"rowPack":"columnPack"},h._setMaxXY=function(t){this.maxX=Math.max(t.x+t.width,this.maxX),this.maxY=Math.max(t.y+t.height,this.maxY)},h._setRectSize=function(e,i){window.currentPackeryElement=e;var s=t(e),r=s.outerWidth,n=s.outerHeight;(r||n)&&(r=this._applyGridGutter(r,this.columnWidth),n=this._applyGridGutter(n,this.rowHeight)),i.width=Math.min(r,this.packer.width),i.height=Math.min(n,this.packer.height)},h._applyGridGutter=function(t,e){if(!e)return t+this.gutter;var i=t%(e+=this.gutter);return t=Math[i&&i<1?"round":"ceil"](t/e)*e},h._getContainerSize=function(){return this._getOption("horizontal")?{width:this.maxX-this.gutter}:{height:this.maxY-this.gutter}},h._manageStamp=function(t){var e,s=this.getItem(t);if(s&&s.isPlacing)e=s.rect;else{var r=this._getElementOffset(t);e=new i({x:this._getOption("originLeft")?r.left:r.right,y:this._getOption("originTop")?r.top:r.bottom})}this._setRectSize(t,e),this.packer.placed(e),this._setMaxXY(e)},h.sortItemsByPosition=function(){var t=this._getOption("horizontal")?a:o;this.items.sort(t)},h.fit=function(t,e,i){var s=this.getItem(t);s&&(this.stamp(s.element),s.enablePlacing(),this.updateShiftTargets(s),e=void 0===e?s.rect.x:e,i=void 0===i?s.rect.y:i,this.shift(s,e,i),this._bindFitEvents(s),s.moveTo(s.rect.x,s.rect.y),this.shiftLayout(),this.unstamp(s.element),this.sortItemsByPosition(),s.disablePlacing())},h._bindFitEvents=function(t){var e=this,i=0;function s(){2==++i&&e.dispatchEvent("fitComplete",null,[t])}t.once("layout",s),this.once("layoutComplete",s)},h.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&(this.options.shiftPercentResize?this.resizeShiftPercentLayout():this.layout())},h.needsResizeLayout=function(){var e=t(this.element),i=this._getOption("horizontal")?"innerHeight":"innerWidth";return e[i]!=this.size[i]},h.resizeShiftPercentLayout=function(){var e=this._getItemsForLayout(this.items),i=this._getOption("horizontal"),s=i?"y":"x",r=i?"height":"width",n=i?"rowHeight":"columnWidth",h=i?"innerHeight":"innerWidth",o=this[n];if(o=o&&o+this.gutter){this._getMeasurements();var a=this[n]+this.gutter;e.forEach(function(t){var e=Math.round(t.rect[s]/o);t.rect[s]=e*a})}else{var c=t(this.element)[h]+this.gutter,u=this.packer[r];e.forEach(function(t){t.rect[s]=t.rect[s]/u*c})}this.shiftLayout()},h.itemDragStart=function(t){if(this.isEnabled){this.stamp(t);var e=this.getItem(t);e&&(e.enablePlacing(),e.showDropPlaceholder(),this.dragItemCount++,this.updateShiftTargets(e))}},h.updateShiftTargets=function(t){this.shiftPacker.reset(),this._getBoundingRect();var e=this._getOption("originLeft"),s=this._getOption("originTop");this.stamps.forEach(function(t){var r=this.getItem(t);if(!r||!r.isPlacing){var n=this._getElementOffset(t),h=new i({x:e?n.left:n.right,y:s?n.top:n.bottom});this._setRectSize(t,h),this.shiftPacker.placed(h)}},this);var r,n=this._getOption("horizontal"),h=n?"rowHeight":"columnWidth",o=n?"height":"width";this.shiftTargetKeys=[],this.shiftTargets=[];var a=this[h];if(a=a&&a+this.gutter){var c=Math.ceil(t.rect[o]/a),u=Math.floor((this.shiftPacker[o]+this.gutter)/a);r=(u-c)*a;for(var d=0;d<u;d++)this._addShiftTarget(d*a,0,r)}else r=this.shiftPacker[o]+this.gutter-t.rect[o],this._addShiftTarget(0,0,r);var g=this._getItemsForLayout(this.items),l=this._getPackMethod();g.forEach(function(t){var e=t.rect;this._setRectSize(t.element,e),this.shiftPacker[l](e),this._addShiftTarget(e.x,e.y,r);var i=n?e.x+e.width:e.x,s=n?e.y:e.y+e.height;if(this._addShiftTarget(i,s,r),a)for(var h=Math.round(e[o]/a),c=1;c<h;c++){var u=n?i:e.x+a*c,d=n?e.y+a*c:s;this._addShiftTarget(u,d,r)}},this)},h._addShiftTarget=function(t,e,i){var s=this._getOption("horizontal")?e:t;if(!(0!==s&&s>i)){var r=t+","+e;-1!=this.shiftTargetKeys.indexOf(r)||(this.shiftTargetKeys.push(r),this.shiftTargets.push({x:t,y:e}))}},h.shift=function(t,e,i){var s,r=1/0,n={x:e,y:i};this.shiftTargets.forEach(function(t){var e,i,h,o,a=(h=(i=n).x-(e=t).x,o=i.y-e.y,Math.sqrt(h*h+o*o));a<r&&(s=t,r=a)}),t.rect.x=s.x,t.rect.y=s.y};h.itemDragMove=function(t,e,i){var s=this.isEnabled&&this.getItem(t);if(s){e-=this.size.paddingLeft,i-=this.size.paddingTop;var r=this,n=new Date;this._itemDragTime&&n-this._itemDragTime<120?(clearTimeout(this.dragTimeout),this.dragTimeout=setTimeout(h,120)):(h(),this._itemDragTime=n)}function h(){r.shift(s,e,i),s.positionDropPlaceholder(),r.layout()}},h.itemDragEnd=function(t){var e=this.isEnabled&&this.getItem(t);if(e){clearTimeout(this.dragTimeout),e.element.classList.add("is-positioning-post-drag");var i=0,s=this;e.once("layout",r),this.once("layoutComplete",r),e.moveTo(e.rect.x,e.rect.y),this.layout(),this.dragItemCount=Math.max(0,this.dragItemCount-1),this.sortItemsByPosition(),e.disablePlacing(),this.unstamp(e.element)}
        function r(){2==++i&&(e.element.classList.remove("is-positioning-post-drag"),e.hideDropPlaceholder(),s.dispatchEvent("dragItemPositioned",null,[e]))}},h.bindDraggabillyEvents=function(t){this._bindDraggabillyEvents(t,"on")},h.unbindDraggabillyEvents=function(t){this._bindDraggabillyEvents(t,"off")},h._bindDraggabillyEvents=function(t,e){var i=this.handleDraggabilly;t[e]("dragStart",i.dragStart),t[e]("dragMove",i.dragMove),t[e]("dragEnd",i.dragEnd)},h.bindUIDraggableEvents=function(t){this._bindUIDraggableEvents(t,"on")},h.unbindUIDraggableEvents=function(t){this._bindUIDraggableEvents(t,"off")},h._bindUIDraggableEvents=function(t,e){var i=this.handleUIDraggable;t[e]("dragstart",i.start)[e]("drag",i.drag)[e]("dragstop",i.stop)};var c=h.destroy;return h.destroy=function(){c.apply(this,arguments),this.isEnabled=!1},n.Rect=i,n.Packer=s,n}),function(t,e){"function"==typeof define&&define.amd?define(["isotope/js/layout-mode","packery/js/packery"],e):"object"==typeof module&&module.exports?module.exports=e(require("isotope-layout/js/layout-mode"),require("packery")):e(t.Isotope.LayoutMode,t.Packery)}(window,function(t,e){var i=t.create("packery"),s=i.prototype,r={_getElementOffset:!0,_getMeasurement:!0};for(var n in e.prototype)r[n]||(s[n]=e.prototype[n]);var h=s._resetLayout;s._resetLayout=function(){this.packer=this.packer||new e.Packer,this.shiftPacker=this.shiftPacker||new e.Packer,h.apply(this,arguments)};var o=s._getItemLayoutPosition;s._getItemLayoutPosition=function(t){return t.rect=t.rect||new e.Rect,o.call(this,t)};var a=s.needsResizeLayout;s.needsResizeLayout=function(){return this._getOption("horizontal")?this.needsVerticalResizeLayout():a.call(this)};var c=s._getOption;return s._getOption=function(t){return"horizontal"==t?void 0!==this.options.isHorizontal?this.options.isHorizontal:this.options.horizontal:c.apply(this.isotope,arguments)},i});