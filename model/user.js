/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var UserSchema = new Schema({
  open_id: {type: String, index: true, unique: true},
  username: {type: String}
});
module.exports = mongoose.model('user', UserSchema);
