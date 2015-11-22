var controller = require('../controller');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/sign/:open_id', controller.sign.sign_list);
//router.get('/wechat', controller.wechat_check_controller.wechat_check);
router.use('/wechat', controller.wechat_controller);

module.exports = router;
