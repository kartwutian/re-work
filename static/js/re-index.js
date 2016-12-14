$(function(){
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
  var mySecondSwiper = new Swiper ('#swiper-third', {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    }) 
  var mySecondSwiper = new Swiper ('#swiper-forth', {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    })
  var mySecondSwiper = new Swiper ('#swiper-fifth', {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    })
  var mySecondSwiper = new Swiper ('#swiper-sixth', {
      autoplay: 3000,
      autoplayDisableOnInteraction: false,
      slidesPerView : 2.1,
    })
  var mySecondSwiper = new Swiper ('.swiper-recommend', {
      autoplay: 3000,
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


})