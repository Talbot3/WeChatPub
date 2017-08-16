/**
 * Created by crazy on 17-6-5.
 */
var config = require('./wechat/config')

var Wechat = require('./wechat/wechat')
var wechatApi = new Wechat(config.wechat);
exports.reply = function*(next) {
    var message = this.weixin;

    if (message.MsgType === 'event') {
        if (message.Event === 'subscribe') {
            if (message.EventKey) {
                //二维码参数值
                console.log("二维码进来:", message.EventKey + " " + message.ticket)
            }

            this.body = '哈哈，你订阅了找个号\r\n' + "消息ID: " + message.MsgId

        }
        else if (message.Event === 'unsubscribe') {
            console.log('无情取消')
            this.body = ""
        }
        if (message.Event === 'LOCATION') {
            this.body = "你上报的位置是" + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
        } else if (message.Event === 'CLICK') {
            this.body = '你点击了菜单' + message.EventKey
        } else if (message.Event === 'SCAN') {
            console.log('关注后扫二维码' + message.EventKey + " " + message.Ticket);
            this.body = '关注后扫二维码' + message.EventKey + " " + message.Ticket;
        } else if (message.Event === 'VIEW') {
            this.body = '你点击了菜单中的链接： ' + message.EventKey;
        }
    } else if (message.MsgType === 'text') {
        let content = message.Content;
        var reply = '你说的的 ' + message.Content + ' 太复杂了'

        if (content === '1') {
            reply = '天下第一吃大米'
        } else if (content === '2') {
            reply = '天下第二吃豆腐'
        } else if (content === '3') {
            reply = '天下第三吃仙丹'
        } else if (content === '4') {
            reply = [
                {
                    title: "天下第四玩技术",
                    description: "描述？",
                    picUrl: "http://ol1szz8y7.bkt.clouddn.com/17-6-10/22151819.jpg",
                    url: "https://github.com/"
                },
                {
                    title: "Node.js 开发微信",
                    description: "爽到爆",
                    picUrl: "http://ol1szz8y7.bkt.clouddn.com/17-6-10/22151819.jpg",
                    url: "https://nodejs.org/"
                }
            ]

        }else if(content === '5'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg')
            reply = {
                type:'image',
                mediaId:data.media_id
            }
        }else if(content === '6'){
            var data  = yield wechatApi.uploadMaterial('video',__dirname+'/6.mp4')
            reply  = {
                type:'video',
                title:'打个篮球球玩',
                description:'放松一下',
                mediaId:data.media_id
            }
        }else if(content === '7'){
            var data = yield wechatApi.uploadMaterial('image',__dirname+'/2.jpg');
            reply  = {
                type:'music',
                title:'回复音乐内容',
                description:'放松一下',
                musicUrl:'http://ouo7dina6.bkt.clouddn.com/7.mp3',
                thumbMediaId:data.media_id,
            }
        }
        console.log(reply)
        this.body = reply;
    }

    yield  next
};