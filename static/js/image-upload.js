
$(function(){
  $("#goodsImages").on("change",function(){
    if (!this.files.length) return;
    var files = Array.prototype.slice.call(this.files);
    var len = this.files.length;

    console.log(files)

    for(var i = 0; i < len; i++){
      (function(e){
        var file = files[i];
        if(!/\/(jpeg|png|gif)$/i.test(file.type)) return;

        if(/\/gif$/i.test(file.type)||file.size < 10*1024){
          //处理gif或者其他小于10k的图片，不用压缩
          var reader = new FileReader();
          reader.readAsDataURL(file);
          console.log(reader)
          reader.onload = function(){
            var img = new Image();
            img.src = this.result;
            $(".view").append(img);
            console.log(this.result.length)
          }
        }else{

          // 处理其他图片，要进行压缩
          var img = new Image(); 
          $(".view").append(img);
          // 创建一个压缩对象，该构造函数接收file或者blob。
          var mpImg = new MegaPixImage(file);
          console.log( mpImg)
          console.log( mpImg.blob)

          mpImg.render(img, { maxWidth: 750, maxHeight: 750, quality: 0.8 },function(){
            console.log(img.src.length)
          }); 
          

        }
      })(i)
      
      
      
    }
  })


})