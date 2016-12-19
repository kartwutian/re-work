$(function(){

  // 用swiper实现一系列轮播动画
  var myFirstSwiper = new Swiper ('#swiper-first', {
      autoplay: 5000,//可选选项，自动滑动
      autoplayDisableOnInteraction: false,
      initialSlide :0,
      loop: true,
      // 如果需要分页器
      pagination: '.swiper-pagination',
      
      // 如果需要前进后退按钮
      // nextButton: '.swiper-button-next',
      // prevButton: '.swiper-button-prev',
      
      // 如果需要滚动条
      // scrollbar: '.swiper-scrollbar',
    }) 
  var mySecondSwiper = new Swiper ('#swiper-second', {
      loop: false,
    }) 
  var myThirdSwiper = new Swiper ('#swiper-third', {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    }) 
  var myForthSwiper = new Swiper ('#swiper-forth', {
      
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    })
  var myFifthSwiper = new Swiper ('#swiper-fifth', {
      
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    })
  var mySixthSwiper = new Swiper ('#swiper-sixth', {
      
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    })
  var myRecomendSwiper = new Swiper ('.swiper-recommend', {
     
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.8,
    })

  // 实现进度条;
  var aRecommend = $(".recommend-item");
  aRecommend.each(function(){
    var _this = $(this)
    var iHad = parseInt(_this.find(".had").text())
    var iTarget = parseInt(_this.find(".target").text())
    var progress =parseInt(iHad/iTarget*100)
    var left = progress >= 85 ? 85 : progress
    _this.find(".color").css("width",progress+"%")

    _this.find(".tip").css("left",left+"%").text(progress+"%")
  })

  // 自己实现滚动加载
  // selector为需要加载的列表项的class，url为ajax的请求地址，data为ajax的请求数据
  function scrollLoad(selector,url,data){
    //获得对象距离页面顶端的距离 obj为dom对象
    function getH(obj) {  
        var h = 0;  
        while (obj) {  
            h += obj.offsetTop;  
            obj = obj.offsetParent;  
        }  
        return h;  
    } 
    // 封装返回最后一个元素的函数,selector 尽量为class或tagName
    function getLastElement(selector){
      var len = $(selector).length;
      return $(selector).eq(len-1)
    }

    function loadMore(){
      var _this = getLastElement(selector); // 获取页面中最后一个列表项元素
      // console.log(_this.html())
      var t = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
      var h = getH(_this[0]);
      // console.log(t,h)
      if (h < t +100 ) {
          $(".end").text("加载中！");

          $(window).off("scroll",loadMore)
          $.ajax({
            type: 'GET',
            url: url,
            data: data,
            success: function(data){
              $(".end").text("下拉加载更多！");
              $(".recommend-panel").append(data);
              new Swiper ('.swiper-recommend', {
                
                autoplayDisableOnInteraction: false,
                slidesPerView : 2.8,
              })
              $(".recommend-item").each(function(){
                var _this = $(this)
                var iHad = parseInt(_this.find(".had").text())
                var iTarget = parseInt(_this.find(".target").text())
                var progress =parseInt(iHad/iTarget*100)
                var left = progress >= 85 ? 85 : progress
                _this.find(".color").css("width",progress+"%")

                _this.find(".tip").css("left",left+"%").text(progress+"%")
              })
              // var data = JSON.stringify(data);
              // alert(data);
              $(window).on("scroll",loadMore)
            },
            error: function(jqXHR, textStatus, errorThrown){
              $(".end").text("没有更多了！");
              console.log('error ' + textStatus + " " + errorThrown);  
              $(window).on("scroll",loadMore)
              
            }
          })
        
        
      }
    }

    $(window).on("scroll",loadMore) 

  }

  scrollLoad(".recommend-item","/list",{})


  // 用dropload.js插件
  
  // $(".recommend-panel").dropload({
  //   scrollArea: window,
  //   loadDownFn: function(me) {
  //     $.ajax({
  //       type: 'GET',
  //       url: '/list',
  //       data: {
         
  //       },
  //       dataType: 'html',
  //       success: function(data) {
  //         if(!data) me.noData();
          
  //         $(".recommend-panel").append(data);

  //         new Swiper ('.swiper-recommend', {
  //           autoplay: 3000,
  //           autoplayDisableOnInteraction: false,
  //           slidesPerView : 2.8,
  //         })

  //         $(".recommend-item").each(function(){
  //           var _this = $(this)
  //           var iHad = parseInt(_this.find(".had").text())
  //           var iTarget = parseInt(_this.find(".target").text())
  //           var progress =parseInt(iHad/iTarget*100)
  //           var left = progress >= 85 ? 85 : progress
  //           _this.find(".color").css("width",progress+"%")

  //           _this.find(".tip").css("left",left+"%").text(progress+"%")
  //         })

  //         // 代码执行后必须重置
  //         me.resetload();
  //       },
  //       error: function(xhr, type) {
  //         $(".end").text("没有更多了！")
  //         console.log(type)

  //         me.resetload();
  //       }
  //     });
  //   }
  // });

    
    



    

})
