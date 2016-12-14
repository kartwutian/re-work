//实现图片懒加载，image的src先放在data-src上
// swiper 插件下 loop为ture的情况不能用该图片懒加载，

$(function(){

  //获得对象距离页面顶端的距离  
  function getH(obj) {  
      var h = 0;  
      while (obj) {  
          h += obj.offsetTop;  
          obj = obj.offsetParent;  
      }  
      return h;  
  } 

  // 当网页的滚动条滚动时要时时判断当前img的位置！
  window.onscroll = function () {

    var aImg = $("img[data-src]");

    aImg.each(function(){

      var _this = $(this);
      
      var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
      var h = getH(_this[0]);
      if (h < t && !_this.attr("src")) {
        setTimeout(function(){
          
          _this.attr("src",_this.attr("data-src"))
          console.log('data-src loaded image...')
        }, 30);
      }
    })

  }
  onscroll();
})

