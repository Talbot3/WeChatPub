/**
 * Created by crazy on 17-6-5.
 */
exports.reply = function* (next) {
    var message = this.weixin;

    if(message.MsgType === 'event'){
        if(message.Event === 'subscribe'){
            if(message.EventKey){
                //二维码参数值
                console.log("二维码进来:",message.EventKey+ " "+ message.ticket)
            }

            this.body = '哈哈，你订阅了找个号\r\n'+"消息ID: "+message.MsgId

        }
        else if(message.Event === 'unsubscribe'){
            console.log('无情取消')
            this.body = ""
        }
    }else{
        if(message.MsgType === 'text'){
            this.body = "Hello"
        }
    }
};