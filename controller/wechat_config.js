/**
 * Created by jiangq on 15/11/16.
 * Description:
 */
"use strict";
var wechat_config=require('../config/wechat.json');
module.exports = {
  wechat_check: function (req, res) {
    var signature = req.query.signature;
    var echostr = req.query.echostr;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var oriArray = [];
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = wechat_config.token;//这里是你在微信开发者中心页面里填的token，而不是****
    oriArray.sort();
    var original = oriArray.join('');
    console.log("Original str : " + original);
    console.log("Signature : " + signature);
    var md5sum = crypto.createHash("sha1");
    md5sum.update(original);
    var scyptoString = md5sum.digest("hex");
    if (signature == scyptoString) {
      res.end(echostr);
      console.log("Confirm and send echo back");
    } else {
      res.end("false");
      console.log("Failed!");
    }
  }
}