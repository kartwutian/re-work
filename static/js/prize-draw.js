$(function(){
  

  $(".win-view").click(function(){
    init();
    $(".win-view").hide()

  })
  $(".btn.right").click(function(){
    window.location.href = "http://www.baidu.com"
  })

  function getNewArr(arr) {
    var len = arr.length; // min len 3 , max len 7 奖项设置最多有2个重复，否则后面代码就有问题了
    var newArr = [];
    var oThanks = {LotItemID:"gg",Title:"谢谢参与",TitlePic:null}
    if(len== 3){
      newArr = [arr[1],arr[2],arr[0],arr[1],oThanks,arr[2],arr[0],oThanks]
    }else if(len == 4){
      newArr = [arr[2],arr[0],arr[1],arr[2],arr[0],arr[3],arr[1],oThanks]
    }else if(len == 5){
      newArr = [arr[3],arr[0],arr[2],arr[0],arr[1],arr[4],arr[1],oThanks]
    }else if(len == 6){
      newArr = [arr[4],arr[0],arr[3],arr[1],arr[0],arr[5],arr[2],oThanks]
    }else if(len == 7){
      newArr = [arr[5],arr[0],arr[4],arr[2],arr[1],arr[6],arr[3],oThanks]
    }

    return newArr;
  }

  function createImg(src){
    var img = new Image()
    img.src = src
    return img
  }

  // 进入页面先执行ajax请求，获得活动信息
  $.ajax({
    type: 'GET',
    data: {},
    url: '/handler/actions.ashx?act=GetLottery&lotteryid=100100',
    cache: false,
    timeout: 5000,
    success: function(data){
      var oActiveInfo = $.parseJSON(data);
      $("title").text(oActiveInfo.Lottery.title);

      console.log(oActiveInfo)
      var newLotItems = oActiveInfo.LotItems.length==8 ? oActiveInfo.LotItems: getNewArr(oActiveInfo.LotItems)

      for(var n =0 ,len = newLotItems.length; n < len; n++){
        if(newLotItems[n].TitlePic){
          $("#item-"+ (n+1) +" .prize").html(createImg(newLotItems[n].TitlePic))
        }else{
          $("#item-"+ (n+1) +" .prize").html(newLotItems[n].Title)
        }
      }
      

      for(var i = 0; i < 8; i++){
        newLotItems[i].roundNum = 45+i
      }
      console.log(newLotItems)

      // 移除loading，显示页面
      $(".before-loaded").remove();
      $(".bhz-mod-content").fadeIn(1000);


      $("#start-btn").click(function(){
        
        isLottery = parseInt($(".surplus-btn .times").text());
        if(isLottery){

          addTransparentShaow();
          $(".prizing").show();

          $.ajax({
            type: 'GET',
            data: {},
            url: '/handler/actions.ashx?act=Lot&lotteryid=100100',
            cache: false,
            success: function(data){
             $(".prizing").hide();
              var oLotResult = $.parseJSON(data);
              console.log(oLotResult)
              if(oLotResult.msg == "请先登录"){
                $(".unlogin").show()
                setTimeout(function(){
                  window.location.href= "http://weiai.yyyju.com/login.aspx?returnUrl=http://weiai.yyyju.com/static/re-work/origin-html/prize-draw.html"
                },2000)
                

              }else{
                isLottery = isLottery-1;
                $(".surplus-btn .times").text(isLottery)
                
                // 获得随机数数组
                function getNumArr(){
                  for (var j = 0; j < newLotItems.length; j++){
                    if(oLotResult.LotItemID ){
                      if(oLotResult.LotItemID == newLotItems[j].LotItemID){
                        console.log(newLotItems[j].roundNum)
                        if(newLotItems[j].roundNum == 45 + j ){
                          return [newLotItems[j].roundNum]
                        }else{
                          return [45+j,newLotItems[j].roundNum]
                        }
                      }
                      

                    }else{
                      if(newLotItems[j].LotItemID == "gg"){
                        console.log(newLotItems[j].roundNum)
                        if(newLotItems[j].roundNum == 45 + j ){
                          return [newLotItems[j].roundNum]
                        }else{
                          return [45+j,newLotItems[j].roundNum]
                        }
                      }
                    }
                  }
                }
                var numArr = getNumArr()
                if(numArr.length == 1){
                  prizeDraw(numArr[0],function(){
                    show(oLotResult);
                  });
                }else{
                  prizeDraw(numArr[Math.round(Math.random())],function(){
                    show(oLotResult);
                  });
                }

                
              }
            },
            error: function(){
              $(".transparent-shadow").remove()
              $(".prizing").hide();
              $(".lottery-error").show();
              setTimeout(function(){
                $(".lottery-error").hide();
              },2000)

            }
          })
        }else{
          $(".no-more-chance").show();
          $(".no-more-chance .tips").animate({bottom: "60%"},2000,function(){
            $(".no-more-chance .tips").css("bottom","10%");
            $(".no-more-chance").hide();
          })
        }


        
      });
    },
    error: function(){
      alert(" ajax error")
      // 移除loading
      $(".before-loaded").remove();
      window.location.reload(true);
    }
  });

  
  // 显示隐藏记录
  $(".my-records-btn").on("click", function() {

    $(".list-shadow").show()
    $("#my-records").show().animate({
      top: '20%',
      opacity: 1
    }, 500)
  });

  $(".list-shadow").on("click",function() {
    $(this).hide();
    $("#my-records").animate({
      top: '100%',
      opacity: 0
    }, 500,function(){
      $("#my-records").hide();
    });
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
  var isLottery = false; // 判断是否在开奖中

  // 增加透明遮罩层，防止发起重复ajax开奖请求
  function addTransparentShaow(){
    var transparentShadow = '<section class="transparent-shadow"></section>';
    $(".bhz-mod-content").append($(transparentShadow))
  }

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
    $(".bhz-mod-prizeDraw-list>.bmp-list-item>.prize").removeClass("highlight");
    $("#item-1>.prize").addClass("highlight");
  }

  // 抽奖动画结束后的回调函数
  function show(obj){
    if(obj.Prize != ""){
      setTimeout(function(){
        $(".transparent-shadow").remove();
        $(".win-view-content .header").text("获得"+obj.Title);
        (obj.TitlePic && obj.TitlePic!="") ? $(".win-view-content .body").html($(".prize.highlight").html()) : $(".win-view-content .body").html(obj.Prize);
        $(".win-view").show();
      },1000)
      
    }else{
      $(".transparent-shadow").remove();
      $(".not-lottery").show();

      $(".not-lottery .tips").animate({bottom: "60%"},2000,function(){
        $(".not-lottery .tips").css("bottom","10%");
        $(".not-lottery").hide();
      })
    }

   

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
          $("#item-"+n+">.prize").removeClass("highlight");
          if(n==8){
            $("#item-1>.prize").addClass("highlight");
          }else{
            $("#item-"+(n+1)+">.prize").addClass("highlight");
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