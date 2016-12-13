var gulp = require('gulp');
var ext_replace = require('gulp-ext-replace');
var concat = require('gulp-concat');
var header = require('gulp-header');
var connect = require("gulp-connect");
var less = require("gulp-less");
var path = require("path")
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var notify = require('gulp-notify');
var cache = require('gulp-cache');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sourcemaps = require('gulp-sourcemaps');
var named = require('vinyl-named');
var pkg = require("./package.json");
var html2jade = require('gulp-html2jade');
var jade = require('gulp-jade');
var htmlBeautify = require('gulp-html-beautify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var spritesmith=require('gulp.spritesmith');
var banner = 
"/** \n\
* my-workflow" + pkg.version + " \n\
* 样式文件\n\
* By bhz\n\
*/\n";

// 将html转化为jade
gulp.task('tojade', function() {
  return gulp.src(['./origin-html/*.html','!./src/_*.html'])
    .pipe(html2jade({donotencode: true}))
    .pipe(gulp.dest('./origin-views'));
});

// 将jade转化为html
gulp.task('tohtml', function() { 
  var tohtml = gulp.src(['./origin-views/*.jade','!./origin-views/_*.jade'])
    .pipe(jade({
      donotencode: true
      // pretty: true //不加这配置项 html会被压缩,加了之后内联元素还是无法独占一行，所以舍弃
    }))
    .pipe(htmlBeautify({
        indent_size: 2,
        indent_char: ' ',
        // 这里是关键，可以让一个标签独占一行
        unformatted: true,
        // 默认情况下，body | head 标签前会有一行空格
        extra_liners: []
    }))
    .pipe(gulp.dest('./html'))
    .pipe(reload({stream:true}));
  return tohtml  
});


//模块输出html及css
gulp.task('2html', function () { 
  gulp.src(['./origin-views/_*.jade'])
    .pipe(jade({
      donotencode: true
      // pretty: true //不加这配置项 html会被压缩,加了之后内敛元素还是无法独占一行，所以舍弃
    }))
    .pipe(htmlBeautify({
        indent_size: 2,
        indent_char: ' ',
        // 这里是关键，可以让一个标签独占一行
        unformatted: true,
        // 默认情况下，body | head 标签前会有一行空格
        extra_liners: []
    }))
    .pipe(gulp.dest('./html'))
    .pipe(reload({stream:true}));

  gulp.src(['./static/less/_*.less'])
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(header(banner))
    .pipe(gulp.dest('./static/css'))
    .pipe(reload({stream:true}));
});

// _html to jade
gulp.task('2jade', function() {
  return gulp.src(['./origin-html/_*.html'])
    .pipe(html2jade({donotencode: true}))
    .pipe(gulp.dest('./origin-views'));
});


gulp.task('css', function () { 
  return gulp.src(['./static/less/*.less','!./static/less/_*.less'])
    .pipe(less())
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(header(banner))
    .pipe(gulp.dest('./static/css'))
    .pipe(reload({stream:true}));
});


// sprite图生成
gulp.task('sprite', function () {
  return gulp.src('./static/slices/*.png')//需要合并的图片地址
    .pipe(spritesmith({
        imgName: './static/sprite/sprite.png',//保存合并后图片的地址
        cssName: './static/css/sprite.css',//保存合并后对于css样式的地址
        padding:5,//合并时两个图片的间距
        algorithm: 'binary-tree',//控制雪碧图生成样式
        cssTemplate:"./static/css/handlebarsStr.css"//控制生成的css模式
    }))
    .pipe(gulp.dest('./static'));
});



//js混淆压缩,js库的压缩
gulp.task('libmin', function () {
  return gulp.src(['./static/lib/*.js','!./static/lib/*min.js'])
    .pipe(uglify())
    .pipe(ext_replace('.min.js'))
    .pipe(gulp.dest('./static/lib'))
    .pipe(reload({stream:true}));
});


//图片压缩
gulp.task('imagemin', function () {
  return gulp.src(['./static/images/**'])
    .pipe(imagemin())
    .pipe(gulp.dest('./static/images'))
    .pipe(reload({stream:true}));
});



// 坑gulp.watch路径不能以./开头，否则只能监控文件的更改， 文件夹下的新建文件不能监控；
// 文件的删除都监控不了，需要手动
gulp.task('watch', function () {
  gulp.watch(['origin-views/*.jade','!origin-views/_*.jade'], ['tohtml']);
  gulp.watch(['static/less/*.less','!./static/less/_*.less'], ['css']);
  gulp.watch(['origin-views/_*.jade','static/less/_*.less'], ['2html']);
  gulp.watch(['static/images/**'], ['imagemin']);
  gulp.watch(['static/slices/*.png'], ['sprite']); 

    
});

gulp.task("default", ['tohtml', 'css', 'libmin', '2html','sprite','imagemin']);

gulp.task('server', ['watch'], function () {
  connect.server({
    root: './',
    livereload: true
  });
});

//browser-sync 
// 静态服务器
gulp.task('b', ['watch'], function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

// _html to jade
gulp.task('tmptojade', function() {
  return gulp.src(['./origin-html/tmp.html'])
    .pipe(html2jade({donotencode: true}))
    .pipe(gulp.dest('./origin-views'));
});
gulp.task('tmp', function () {
  gulp.watch(['origin-html/tmp.html'], ['tmptojade']);
});


















