// 移动端自适应方案，rem+flexbox
// 1rem == 10px iphone6下，其他尺寸会自动计算rem值 width == 37.5rem
// fontSize 不必使用rem 尺寸大了反而不好，还是使用px
;(function(win, lib) {
    var doc = win.document;
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var dpr = win.devicePixelRatio;
    var tid; //定时器
    var flexible = lib.flexible || (lib.flexible = {});
    
    docEl.setAttribute('device-dpr', dpr);
    console.log(win.devicePixelRatio)

    // 刷新rem ，以iphone6的width375px为基准 1rem == 10px ，
    function refreshRem(){
        var width = docEl.getBoundingClientRect().width;
        if (width / dpr > 540) {
            width = 540 * dpr;
        }
        var rem = width / 37.5;
        docEl.style.fontSize = rem + 'px';
        flexible.rem = win.rem = rem;
    }

    // 监听窗口变化，自动刷新rem 及 device-dpr
    win.addEventListener('resize', function() {
        clearTimeout(tid);
        tid = setTimeout(function(){
          refreshRem();
          docEl.setAttribute('device-dpr', dpr);
        }, 300);
    }, false);

    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = 12 + 'px';
    } else {
        doc.addEventListener('DOMContentLoaded', function(e) {
            doc.body.style.fontSize = 12 + 'px';
        }, false);
    }
    

    refreshRem();

    flexible.dpr = win.dpr = dpr;
    flexible.refreshRem = refreshRem;

    

    flexible.rem2px = function(d) {
        var val = parseFloat(d) * this.rem;
        if (typeof d === 'string' && d.match(/rem$/)) {
            val += 'px';
        }
        return val;
    }
    flexible.px2rem = function(d) {
        var val = parseFloat(d) / this.rem;
        if (typeof d === 'string' && d.match(/px$/)) {
            val += 'rem';
        }
        return val;
    }

    console.log(flexible);
})(window, window['lib'] || (window['lib'] = {}));