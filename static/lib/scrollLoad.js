$(function(){

  // 实现滚动加载
  // selector为需要加载的列表项的class，data为ajax请求的数据，要求为json格式，url为请求地址，默认为get请求
  function scrollLoad(selector,data,url){
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
      if (h < t ) {
          $(window).off("scroll",loadMore)
        
          $.ajax({
            type: 'GET',
            data: data,
            url: url,
            cache: false,
            timeout: 5000,
            success: function(data){
              console.log(data)
              // var data = JSON.stringify(data);
              // alert(data);
              $(window).on("scroll",loadMore)
            },
            error: function(jqXHR, textStatus, errorThrown){

              console.log('error ' + textStatus + " " + errorThrown);  
              $(window).on("scroll",loadMore)
              
            }
          })
        
        
      }
    }

    $(window).on("scroll",loadMore) 

  }

  // 封装滚动加载插件
  jQuery.extend({
    scrollLoad: scrollLoad
  });

  
})