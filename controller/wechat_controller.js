/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";
var wechat = require('wechat');
var User = require('../model').User;
var Sign=require('../model').Sign;
var config = require('../config/wechat.json');
module.exports = wechat(config, function (req, res, next) {
  // 微信输入信息都在req.weixin上
  var message = req.weixin;
  var open_id = message.FromUserName;
  User.findOne({open_id: open_id}, function (err, result) {
    if (err) {
      next(err);
    }
    else {
      if (result == null) {
        var sign =new Sign();
      }
    }
  })
});