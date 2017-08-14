'use strict'

var ejs = require('ejs')
var hereDoc =require('heredoc')

var tpl = hereDoc(function () {
    /*
     <xml>
     <ToUserName><![CDATA[<%= toUserName %>]]></ToUserName>
     <FromUserName><![CDATA[<%= fromUserName %>]]></FromUserName>
     <CreateTime><%= createTime %></CreateTime>
     <MsgType><![CDATA[<%= msgType  %>]]></MsgType>
     <% if (msgType === 'text') { %>
       <Content><![CDATA[<%= content %>]]></Content>
     <% } else if (msgType === 'image') { %>
       <Image>
       <MediaId><![CDATA[<%= content.mediaId %>]]></MediaId>
       </Image>
     <% } else if (msgType === 'voice') { %>
       <Voice>
       <MediaId><![CDATA[<%= mediaId %>]]></MediaId>
       </Voice>
     <% } else if (msgType === 'media') { %>
       <Video>
       <MediaId><![CDATA[<%= mediaId %>]]></MediaId>
       <Title><![CDATA[<%= title %>]]></Title>
       <Description><![CDATA[<%= description %>]]></Description>
       </Video>
     <% } else if (msgType === 'music') { %>
       <Music>
       <Title><![CDATA[<%= title %>]]></Title>
       <Description><![CDATA[<%= description %>]]></Description>
       <MusicUrl><![CDATA[<%= musicUrl %>]]></MusicUrl>
       <HQMusicUrl><![CDATA[<%= hqMusicUrl %>]]></HQMusicUrl>
       <ThumbMediaId><![CDATA[<%= thumbMediaId %>]]></ThumbMediaId>
       </Music>
     <% } else if (msgType === 'news') { %>
        <ArticleCount><%= content.length %></ArticleCount>
        <Articles>
     <% content.forEach(function(item) { %>
        <item>
        <Title><![CDATA[<%= item.title %>]]></Title>
        <Description><![CDATA[<%= item.description %>]]></Description>
        <PicUrl><![CDATA[<%= item.picUrl %>]]></PicUrl>
        <Url><![CDATA[<%= item.url %>]]></Url>
        </item>
     <% })  %>
     </Articles>
     <% }  %>
     </xml>
     */
});

var compiled = ejs.compile(tpl,{debug:false})

exports = module.exports = {
    compiled : compiled
}