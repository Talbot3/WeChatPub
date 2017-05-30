/**
 * Created by crazy on 17-5-30.
 */
var Koa = require('koa');
var sha1 = require('sha1');
var config = require('./wechat/config');
var wechat = require('./wechat/g');

var app = new Koa();
app.use(wechat(config.wechat));

app.listen(1234);
console.log('Listening: 1234');