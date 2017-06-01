/**
 * Created by crazy on 17-5-28.
 */
var path = require('path')
var wechat_file = path.join(__dirname,'./config/wechat.txt');
var util = require('../libs/util');
exports = module.exports = {
    'wechat': {
        appID: "wx26a347e024875382",
        appSecret: "74e68ab345ecf68cbda8d09b16527bb0",
        token: "myFirstWeChat",
        getAccessToken:function () {
            return util.readFileAsync(wechat_file)
        },
        saveAccessToken:function (data) {
            return util.writeFileAsync(wechat_file,JSON.stringify(data))
        }
    }
};