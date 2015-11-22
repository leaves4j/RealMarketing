/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var SignSchema = new Schema({
  user: {type: ObjectId, ref: 'user'},
  period:{type:Number},
  timestamp: {type: Date, default: Date.now}
});
module.exports = mongoose.model('sign', SignSchema);
