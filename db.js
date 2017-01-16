var mongoose = require('mongoose'),
    dbUrl = 'mongodb://test:test@localhost:12345/test';
    db = mongoose.connect(dbUrl);




db.connection.on("open", function () { 
  console.log("——数据库连接成功！——"); 
});

/**
  * 连接成功
  */
db.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + dbUrl);  
});    

/**
 * 连接异常
 */
db.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
db.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});  

var TestSchema = new mongoose.Schema({
    name : {type:String},
    age : {type:Number,default:0},
    email : {type:String},
    time : {type:Date,default:Date.now}
});

var TestModel = db.model("info",TestSchema); //'test'相当于collection

var TestEntity = new TestModel({
    name:'helloworld',
    age:28,
    emial:'helloworld@qq.com'
});

TestEntity.save(function(err,doc){
    if(err){
        console.log("error :" + err);
    } else {
        console.log(doc);
    }
});


module.exports = mongoose;