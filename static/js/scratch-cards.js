$(function(){
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

  // 显示隐藏活动规则
  $(".activity-rules-btn").on("click", function() {

    $(".list-shadow").show()
    $(".activity-rules").show().animate({
      top: '20%',
      opacity: 1
    }, 500)
  });

  $(".list-shadow").on("click",function() {
    $(this).hide();
    $(".activity-rules").animate({
      top: '100%',
      opacity: 0
    }, 500,function(){
      $(".activity-rules").hide();
    });
  });


  $(".get-lottery").click(function(){
    window.location.reload(false)
  }) 
  $(".btn.right").click(function(e){
    e.stopPropagation();
    window.location.href = "http://www.baidu.com"
  })


  var root = parseFloat(document.documentElement.style.fontSize);

  bodys(parseInt(root*3.55),parseInt(root*1.75));

  function bodys(width,height){
    var img = new Image();         
    var canvas = $('#canvas-1')[0];
    img.src = "../static/images/scratch-cards/gift.jpg";         
    canvas.style.position = 'absolute';           
    img.addEventListener('load',function(e){  
      var ctx;
      var w = width, h = height;             
      var offsetX = canvas.getBoundingClientRect().left, offsetY = canvas.getBoundingClientRect().top;   
    
      var mousedown = false;               
      var area = 0;    

      var ajaxSuccess = false;

      canvas.width=w;             
      canvas.height=h; 
      
      canvas.style.backgroundImage='url('+img.src+')';              
      canvas.style.backgroundRepeat='no-repeat';              
      canvas.style.backgroundSize='100%';              
      ctx=canvas.getContext('2d');         

      layer(ctx);               
      ctx.globalCompositeOperation = 'destination-out';               
      canvas.addEventListener('touchstart', eventDown);             
      canvas.addEventListener('touchend', eventUp);             
      canvas.addEventListener('touchmove', eventMove);             
      canvas.addEventListener('mousedown', eventDown);             
      canvas.addEventListener('mouseup', eventUp);             
      canvas.addEventListener('mousemove', eventMove);   


      function layer(ctx){                 
        ctx.fillStyle = 'gray';                 
        ctx.fillRect(0, 0, w, h);             
      }

      function drawShowAll(ctx){
        ctx.fillRect(0, 0, w, h);
      } 

      function drawShow(ctx,x,y){
        ctx.fillStyle = "#f00"                 
        ctx.beginPath()                     
        ctx.arc(x, y, 25, 0, Math.PI * 2);                         
        ctx.fill(); 
        area += Math.PI*15*15;
        
        
      }
      


      function eventDown(e){                 
        e.preventDefault();                 
        mousedown=true;             
      }   
      function eventUp(e){            
        e.preventDefault();                 
        mousedown=false;
        if(area > 2*w*h){
          drawShowAll(ctx)
          $.ajax({
            type: 'GET',
            data: {},
            url: '/handler/actions.ashx?act=Lot&lotteryid=100100',
            cache: false,
            success: function(data){
              ajaxSuccess = true;
              var oLotResult = $.parseJSON(data);
              console.log(oLotResult)
              if(oLotResult.msg == "请先登录"){
                ajaxSuccess = false
                $(".unlogin").show()
                setTimeout(function(){
                  window.location.href= "http://weiai.yyyju.com/login.aspx?returnUrl=http://weiai.yyyju.com/static/re-work/origin-html/scratch-cards.html"
                },2000)
                

              }else{
                if(oLotResult.Prize){
                  $(".info .body").text(oLotResult.Prize)
                }else{
                  $(".info .body").text("谢谢参与")
                }
                
              }
            },
            error: function(){
              setTimeout(function(){
                ajaxSuccess = true;
              },8000)
            }
          })

          lotteryShow()
        }                   
      }               
      function eventMove(e){                 
        e.preventDefault();                 
        if(mousedown){                     
          if(e.changedTouches){                         
            e=e.changedTouches[e.changedTouches.length-1];                     
          }                     
          var x = (e.clientX + document.body.scrollLeft || e.pageX) - offsetX || 0,                         
          y = (e.clientY + document.body.scrollTop || e.pageY) - offsetY || 0;

          // console.log(e.clientX,e.clientY)
          // console.log(x,y)
          drawShow(ctx,x,y)              
         
        }             
      }     

      function lotteryShow(){
        $(".lottery").show()

        lottery()

      }

      
      function lottery(times){
        var count = 0;
        times = times || 2;

        function lotteryAnimate(){
          count += 1;
          $(".lottery img").animate({
            width:root*3.75*0.5,
            height: root*2.5*0.5
          },500,function(){
            $(".lottery img").animate({
              width:root*3.75*1,
              height: root*2.5*1
            },500,function(){
              console.log(ajaxSuccess)
              if((count >= times) && ajaxSuccess){

                $(".lottery img").animate({
                  width: 0,
                  height: 0,
                },500,function(){

                  $(".lottery").hide()
                  $(".get-lottery").show()
                  $(".get-lottery .info").animate({
                    width: "80%",
                    height: root*1.6
                  },300)
                  // alert(1)
                })
                
              }else{
                lotteryAnimate()
              }
              
            })
          })
        }

        lotteryAnimate();


      }
      



    });
    
    
    
  }



})


