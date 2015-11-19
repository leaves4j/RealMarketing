/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";
var wechat = require('wechat');
var User = require('../model').User;
var Sign = require('../model').Sign;
var config = require('../config/wechat.json');

var deal = wechat.text(function (message, req, res, next) {
  // 微信输入信息都在req.weixin上
  console.log('wehchat_message:', message);
  var open_id = message.FromUserName;
  User.findOne({open_id: open_id}, function (err, result) {
    if (err) {
      next(err);
    }
    else {
      if (result == null) {
        var user = new User({open_id: open_id, name: message.Content})
        user.save();
        var sign = new Sign();
      }
    }
  })
}).event(function (message, req, res, next) {
  console.log('wehchat_message:', message);
  if (message.Event === 'subscribe') {
    res.reply('欢迎关注!')
  }
});
module.exports = wechat(config, deal);