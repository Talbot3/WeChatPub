"use strict";
/**
 * Created by crazy on 17-6-1.
 */
var Promise = require('bluebird')
var request = Promise.promisify(require('request'))
var util = require('./util');
var tpl = require('./tpl');
var prefix = "https://api.weixin.qq.com/cgi-bin/"
var fs = require('fs')
var api = {
    accessToken: prefix + 'token?grant_type=client_credential',
    upload: prefix + 'media/upload?'
}

function Wechat(opts) {
    var that = this;
    this.appID = opts.appID;
    this.appSecret = opts.appSecret
    this.getAccessToken = opts.getAccessToken
    this.saveAccessToken = opts.saveAccessToken

    this.fetchAccessToken()
}

Wechat.prototype.isValidAccessToken = function (data) {
    if (!data || ! data.access_token || !data.expires_in) {
        return false
    }

    var access_token = data.access_token
    var expires_in = data.expires_in
    var now = (new Date().getTime())

    if (now < expires_in) {
        return true
    } else {
        return false
    }
}

Wechat.prototype.updateAccessToken = function () {
    var appID = this.appID;
    var appSecret = this.appSecret;
    var url = api.accessToken + '&appid=' + appID + '&secret=' + appSecret;

    return new Promise(function (resolve, reject) {
        console.log("Ready to Request")
        request({url: url, json: true}).then(function (response) {
            var data = response.body;
            var now = (new Date().getTime())
            var expires_in = now + (data.expires_in - 20);
            data.expires_in = expires_in;
            resolve(data)
        }).catch(function (err) {
            reject(err)
        })
    })

}


Wechat.prototype.uploadMaterial = function (type, filepath) {
    var that = this;
    var form = {
        media: fs.createReadStream(filepath)
    }

    return new Promise(function (resolve, reject) {
        that.fetchAccessToken()
            .then(function (data) {
                var url = api.upload + '&access_token=' + data.access_token + '&type=' + type
                console.log("Ready Request Now")
                request({method: 'POST', url: url, json: true, formData: form})
                    .then(function (response) {
                    var _data = response.body;
                    console.log(response.body)
                    if(_data){
                        resolve(_data);
                    }else{
                        throw  new Error('Upload material fails')
                    }
                }).catch(function (err) {
                    reject(err)
                })
            })
    })
}

Wechat.prototype.fetchAccessToken = function () {
    var that = this;
    if(this.access_token && this.expires_in){
        if(this.isValidAccessToken(this)){
            console.log("Return Fisrst Level")
            return Promise.resolve(this)
        }
    }
    return this.getAccessToken().then(function (data) {
        console.log("Return Second Level")

        try {
            data = JSON.parse(data)
        } catch (e) {
            return that.updateAccessToken()
        }

        if (that.isValidAccessToken(data)) {
            return Promise.resolve(data)
        }
        else {
            return that.updateAccessToken()
        }
    }).then(function (data) {
        that.access_token = data.access_token;
        that.expires_in = data.expires_in;
        that.saveAccessToken(data)

        return new Promise(function (resolve,reject) {
            console.log("正在返回")
            resolve(data)
        })
    })
}

Wechat.prototype.reply = function () {
    var content = this.body || '你好';
    var message = this.weixin;

    var xml = util.tpl(content, message);
    console.log("回复的消息为", xml)
    console.log("this.body", content)
    this.status = 200;
    this.type = 'application/xml';
    this.body = xml;
    return
}

exports = module.exports = Wechat;

