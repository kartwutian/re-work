$(function(){
  

  
  // 进入页面先执行ajax请求，获得活动信息
  $.ajax({
    type: 'GET',
    data: {},
    url: '/handler/actions.ashx?act=GetLottery&lotteryid=100100',
    cache: false,
    timeout: 5000,
    success: function(data){
      var oActiveInfo = $.parseJSON(data);
      $("title").text(oActiveInfo.Lottery.title)
      console.log(oActiveInfo)
      // 移除loading，显示页面
      $(".before-loaded").remove();
      $(".bhz-mod-content").fadeIn(1000);
    },
    error: function(){
      alert(" ajax error")
      // 移除loading
      $(".before-loaded").remove();
      $(".bhz-mod-content").fadeIn(1000);
    }
  });

  
  

  // 实现活动规则淡入淡出
  $("#activity-rule-btn").on("click",function(){
    $(".activity-rules").show(500);
  })
  $(".ensure-btn").on("click",function(){
    $(".activity-rules").hide(500);
  })

  $(".activity-rules").on("click",function(){
    $(".activity-rules").hide(500);
   
  });

  // 定义所需变量
  var arr = []; // 用于存放跑马灯参数
  var rootPx = parseFloat($(document.documentElement).css("font-size")); // 1rem
  var ulWitdthRem = 3.75*0.6;  // 设置抽奖区域宽度
  var ulWitdth = rootPx*ulWitdthRem; //rem 转为 px

  console.log(ulWitdth)
 
  // 中奖信息滚动效果实现
  function rollUp() {
    

    var i = 1;
    var e;
   
    setInterval(function(){
      e = i%10;
      i++;
      if(e==0){
        // 用Math.ceil解决滚动多加1px bug
        $(".broadcast ul").animate({top: Math.ceil((-0.2)*rootPx)*e},0)
      }else{
        $(".broadcast ul").animate({top: Math.ceil((-0.2)*rootPx)*e},1500)
      }

    },5000)
  }

  rollUp();


  
  function lenChange(len){
    var a = parseInt(len/20);
    var newLen = a*20+40;
    arr[0] = -parseInt((newLen-len)/2+5);
    arr[1] = newLen;
  }



  // 设置开奖区域宽度
  $('.bhz-mod-content>.bhz-mod-prizeDraw-list').css('width',ulWitdth);
  lenChange(ulWitdth);
  // 初始化渲染跑马灯界面
  initLights(arr[0],arr[0],arr[1]);


  $("#start-btn").click(function(){

    // 先显示透明层，防止重复点击触发
    $(".transparent-shadow").show();

    $.ajax({
    type: 'GET',
    data: {},
    url: '/handler/actions.ashx?act=Lot&lotteryid=100100',
    cache: false,
    timeout: 5000,
    success: function(data){
      var oLotResult = $.parseJSON(data);
      console.log(oLotResult)
      init();
      if(oLotResult.Title == "一等奖"){
        prizeDraw(51,function(){
          show(oLotResult);
        });
        
      }else if(oLotResult.Title == "二等奖"){
        var arr = [45,48]
        prizeDraw(arr[Math.round(Math.random())],function(){
          show(oLotResult);
        });
        
      }else if(oLotResult.Title == "三等奖"){
        var arr = [47,50,52]
        prizeDraw(arr[Math.round(Math.random()*2)],function(){
          show(oLotResult);
        });
        
      }else if(oLotResult.Title == "谢谢参与"){
        var arr = [46,49]
        prizeDraw(arr[Math.round(Math.random()*2)],function(){
          show(oLotResult);
        });
        
      }else{
        var arr = [46,49]
        prizeDraw(arr[Math.round(Math.random()*2)],function(){
          show(oLotResult);
        });
      }
      
      

    },
    error: function(){
      alert(" ajax error")

    }
  })
    
    
    
  });

  //生成随机整数，用于控制中奖num，44<randomNum<54
  // function randomNum(){
  //   return Math.floor(Math.random()*9+45);
  // }

  // 测试生成的随机数
  // for(var i = 0 ;i<100;i++){
  //   console.log(randomNum());
  // }
  
  // 封装初始化跑马灯
  function initLights(startX,startY,len){

    var lights ='';

    for(var i = 0; i <= len/20; i++){
      var k = i%3;
      lights += '<div class="light color-'+k+'" style="top: '+startY+'px; left: '+(startX+20*i)+'px"></div>'; 
      lights += '<div class="light color-'+k+'" style="left: '+startX+'px; top: '+(startY+20*i)+'px"></div>';
      lights += '<div class="light color-'+k+'" style="left: '+(startX+len)+'px; top: '+(startY+20*i)+'px"></div>';
      lights += '<div class="light color-'+k+'" style="top: '+(startY+len)+'px; left: '+(startX+20*i)+'px"></div>'; 
    }
    $('ul.bhz-mod-prizeDraw-list').prepend(lights);
    // console.log(lights);
    // $('ul.bhz-mod-prizeDraw-list').append('<div id="btn">start</div>');

  }


  // 封装每次点击重置函数
  function init(){
    $(".bhz-mod-prizeDraw-list>.bmp-list-item>img").removeClass("yellow");
    $("#item-1>img").addClass("yellow");
  }

  // 抽奖动画结束后的回调函数
  function show(obj){
    $(".transparent-shadow").hide();
    alert("恭喜获得"+obj.Prize)
    
    
  }

  // 抽奖动画实现，num为中奖号码，fn为动画结束时的回调函数
  function prizeDraw( num, fn){
    var aDiv = $('div.light');

    for(var i = 1; i < num+1; i++){
      (function(e){
        var n = e%9;          
        setTimeout(function(){

          //实现跑马灯动画
          for(var j = 0, len = aDiv.length; j < len; j++){
            // console.log(aDiv[j].className)
            // console.log(aDiv[j].className.match(/light color-0/));
            var oDiv = aDiv[j];
            if(oDiv.className.match(/0/g)){
              oDiv.className = oDiv.className.replace(/0/,1)
            }else if(oDiv.className.match(/1/g)){
              oDiv.className = oDiv.className.replace(/1/,2)
            }else{
              oDiv.className = oDiv.className.replace(/2/,0)
            }
             
          }

          // 实现九宫格动画
          $("#item-"+n+">img").removeClass("yellow");
          if(n==8){
            $("#item-1>img").addClass("yellow");
          }else{
            $("#item-"+(n+1)+">img").addClass("yellow");
          }
          if(e==num){
            // 用setTimeout解决1个先alert再渲染class的bug
            setTimeout(function(){
              console.log(e)
              fn();
            },50)
            
          }
        },2*(e*e+50))
      })(i);
    }
  };
  
  $("#my-prize-btn").click(function(){
    location.href="http://www.baidu.com"
  })
})