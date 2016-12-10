var express = require('express');
var path = require('path');
var index = require('./routes/index');
var guess = require('./routes/guess');
var test = require('./routes/test');
var app = express();


// view engine setup
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'static')));



app.use('/', index);

app.use('/guess', guess);

app.use('/test', test);





app.listen(3000);
console.log('server start at port 3000!')

