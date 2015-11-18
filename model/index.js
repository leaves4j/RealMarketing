/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";
var mongoose = require('mongoose');
var config = require('../config/db.json').mongodb;

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error: %s ', config.db, err.message);
    process.exit(1);
  }
  else {
    console.log('connect to %s success!', config.db);
  }
});
module.exports = {
  User: require('./user'),
  Sign: require('./sign')
}