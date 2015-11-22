/**
 * Created by jiangq on 15/11/21.
 * Description:
 */
"use strict";
var async = require('async');
var Sign = require('../model').Sign;
var moment = require('moment');
module.exports = {
  sign_list: function (req, res, next) {
    var open_id = req.params.open_id;
    console.log('open_id', open_id)
    async.auto({
      sign_list: function (cb) {
        console.log(1);
        Sign.find().populate('user').sort({'_id': -1}).exec(cb)
      },
      all_sign_count: function (cb) {
        console.log(12);
        Sign.count({}, cb)
      },
      time_sign_count: function (cb) {
        console.log(14);
        Sign.find().where('timestamp').lte(new Date(require('../config/system.json').start)).count().exec(cb)
      }
    }, function (err, results) {
      console.log(err);
      console.log(results);
      if (err) {
        //next(err)
      }
      else {
        var person={};
        var i = 0;
        var sign_list = results.sign_list.forEach(function (item) {
          i++;

          item.timestamp = moment(item.timestamp).format('HH:mm:ss');
          if (item.user.open_id == open_id) {
            person = item;
            person.rank = i;
          }
          return item;
        });
        var render_data=results;
        render_data.sign_list=sign_list;
        render_data.person=person;
        res.render('sign.dust', render_data);
      }
    })
  }
};