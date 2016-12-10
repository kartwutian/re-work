var express = require('express');
var router = express.Router();
var templatePath = require.resolve('../views/test.jade');
var templateFn = require('jade').compileFile(templatePath);


/* GET users listing. */
router.get('/', function(req, res, next) {

  res.write(templateFn());
  res.end();
 
  
});

router.post('/', function(req, res, next) {
  
  console.log(req.body);
  res.send(req.body);
 
  
});

module.exports = router;
