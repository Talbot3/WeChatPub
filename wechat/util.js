'use strict'
/**
 * Created by crazy on 17-6-1.
 */
var xml2js = require('xml2js');
var Promise = require('bluebird')
var tpl = require('./tpl')

exports.parseXMLAsync = function (xml) {
    return new Promise(function (resolve, reject) {
        xml2js.parseString(xml, {trim: true}, function (err, content) {
            if (err) reject(err)
            else resolve(content)
        })
    })
}

function formatMessage(result) {
    var message = {};
    if (typeof  result === 'object') {
        var keys = Object.keys(result)

        for (let i = 0; i < keys.length; ++i) {
            var item = result[keys[i]]; var key = keys[i]
            if (!(item instanceof Array) || item.length === 0) {
                continue
            }

            if (item.length === 1) {
                var val = item[0]

                if (typeof val === 'object') {
                    message[key] = formatMessage(val)
                } else {
                    message[key] = (val || '').trim()
                }
            } else {
                message[key] = []
                for (var j = 0, k = item.length; j < k; j++) {
                    message[key].push(formatMessage(item[j]))
                }
            }

        }
    }
    return message;
}

exports.tpl = function (content,message) {
    var info = {},
        type = 'text',
        fromUsername = message.FromUserName,
        toUserName = message.ToUserName;

    if(Array.isArray(content)){
        type = 'news'
    }

    type = message.MsgType || type

    info.content = content;
    info.createTime = new Date().getTime()
    info.msgType = type
    info.toUserName = fromUsername
    info.fromUserName = toUserName
    console.log("定稿",info)
    return tpl.compiled(info);
};

exports.formatMessage = formatMessage;