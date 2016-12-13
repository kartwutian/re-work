var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('re-index', { title: '首页 - 微爱筹' });
});

module.exports = router;
