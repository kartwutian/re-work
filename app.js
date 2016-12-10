var express = require('express');
var path = require('path');
var index = require('./routes/index');
var guess = require('./routes/guess');
var test = require('./routes/test');

var bodyParser = require("body-parser"); 
var app = express();

// 设置跨域
app.all('*', function(req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  
  res.header("X-Powered-By",' 3.2.1')   
  next();  
}); 
// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', index);

app.use(bodyParser.json());
app.use('/guess', guess);

app.use('/test', test);






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

