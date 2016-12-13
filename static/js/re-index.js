$(function(){
  var myFirstSwiper = new Swiper ('#swiper-first', {
      autoplay: 5000,//可选选项，自动滑动
      initialSlide :2,
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

})