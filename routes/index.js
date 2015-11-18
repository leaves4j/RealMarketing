var crypto = require("crypto");
var wechat_config=require('../config/wechat.json');
var controller=require('../controller');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/wechat',controller.wechat_check_controller.wechat_check);
router.post('/wechat',controller.wechat_controller)

module.exports = router;
