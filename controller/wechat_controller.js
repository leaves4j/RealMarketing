/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";
var wechat = require('wechat');
var User = require('../model').User;
var Sign = require('../model').Sign;
var config = require('../config/wechat.json');
var host = require('../config/system.json').host;

var deal = wechat.text(function (message, req, res, next) {
  // 微信输入信息都在req.weixin上
  console.log('wehchat_message:', message);
  var open_id = message.FromUserName;
  User.findOne({open_id: open_id}, function (err, result) {
    if (err) {
      next(err);
    }
    else {
      console.log('result', result);
      if (result == null) {
        if (message.Content === '签到') {
          res.reply('请您先告诉我您的姓名或昵称');
        }
        else {
          var user = new User({open_id: open_id, username: message.Content});
          user.save();
          res.reply(message.Content + ',您好!\n回复"签到"完成今天的签到吧');
        }
      }
      else {
        if (message.Content === '签到') {
          var sign_data = {user: result._id, period: 3};
          Sign.findOne(sign_data, function (err, result) {
            if (err)
              next(err);

            else {
              if (result == null) {
                var now_time = new Date();
                //if (now_time.getDay() == 7 && (new Date() >= new Date(require('../config/system.json').pre))) {
                var sign = new Sign(sign_data);
                sign.save();
                //}
                //else {
                //  res.reply('请您于周日晚上八点半之后签到');
                //}
                //var sign = new Sign(sign_data);
                //sign.save();
              }

              res.reply('签到成功,<a href="' + host + 'sign/' + open_id + '" >点击这里</a>查看详情吧');
              // res.reply('您是今天第%s位签到,<a href="%s"点击这里查看详情', 10, '');

            }
          })

        }
        else {
          res.reply('回复"签到"可以签到或查看签到信息');
        }
      }


    }
  })
}).event(function (message, req, res, next) {
  console.log('wehchat_message:', message);
  if (message.Event === 'subscribe') {
    res.reply('您好,初次见面,请告诉我怎么称呼您吧!\n(您的姓名或者群内的昵称)')
  }
});
module.exports = wechat(config, deal);