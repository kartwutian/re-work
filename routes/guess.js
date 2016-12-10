var express = require('express');
var router = express.Router();
 



var result = {};
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('guess'); 
});

// router.get('/result', function(req, res, next) {
//   result.num = getRandomNum();
//   result.out = initResult(result.num);
//   // result.peas = finalResult(userChoose,result[1],peasNum)
//   res.send(result);
// });
// router.get('/result', function(req, res, next) {
//   console.log(req.query)
//   result.num = getRandomNum();
//   result.out = initResult(result.num);
//   // result.peas = finalResult(userChoose,result[1],peasNum)
//   res.send(req.query);
// });

router.post('/result', function(req, res, next) {
  console.log(req.body)
  result.num = getRandomNum();
  result.out = initResult(result.num);
  result.peas = finalResult(req.body.userChoose,result.out,req.body.peasNum)
  res.send(result);
});

function getRandomNum() {
  return Math.floor(Math.random() * 13);
}
function initResult(num) {
  if(num < 6 ){
    return {
      result: '小',
      odds: 1.6
    } ;
  }else if(num == 6){
    return {
      result: '發',
      odds: 7
    } ;
  }else{
    return {
      result: '大',
      odds: 1.6
    } ;
  }
}
function finalResult(userChoose,initResult,peasNum){
  if(userChoose == initResult.result){
    return Math.round(peasNum*initResult.odds);
  }else{
    return 0-peasNum;
  }
}

module.exports = router;
