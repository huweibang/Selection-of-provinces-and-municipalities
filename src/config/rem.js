(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;

            let designSize = 750; // 设计图尺寸
            let html = document.documentElement;
            let wW = html.clientWidth;// 窗口宽度
            let rem = wW * 100 / designSize; 
            docEl.style.fontSize = rem + 'px';

            //docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);