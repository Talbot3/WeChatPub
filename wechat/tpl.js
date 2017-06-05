'use strict'

var ejs = require('ejs')
var hereDoc =require('heredoc')

var tpl = hereDoc(function () {
    /*
     <xml>
     <ToUserName><![CDATA[<% toUserName %>]]></ToUserName>
     <FromUserName><![CDATA[<% fromUserName %>]]></FromUserName>
     <CreateTime><% createTime %></CreateTime>
     <% if (msgType === 'text') { %>
       <MsgType><![CDATA[text]]></MsgType>
       <Content><![CDATA[<% content %>]]></Content>
     <% } else if (msgType === 'image') { %>
       <MsgType><![CDATA[image]]></MsgType>
       <Image>
       <MediaId><![CDATA[<% mediaId %>]]></MediaId>
       </Image>
     <% } else if (msgType === 'voice') { %>
       <MsgType><![CDATA[voice]]></MsgType>
       <Voice>
       <MediaId><![CDATA[<% mediaId %>]]></MediaId>
       </Voice>
     <% } else if (msgType === 'media') { %>
       <MsgType><![CDATA[video]]></MsgType>
       <Video>
       <MediaId><![CDATA[<% mediaId %>]]></MediaId>
       <Title><![CDATA[<% title %>]]></Title>
       <Description><![CDATA[<% description %>]]></Description>
       </Video>
     <% } else if (msgType === 'music') { %>
       <MsgType><![CDATA[music]]></MsgType>
       <Music>
       <Title><![CDATA[<% title %>]]></Title>
       <Description><![CDATA[<% description %>]]></Description>
       <MusicUrl><![CDATA[<% musicUrl %>]]></MusicUrl>
       <HQMusicUrl><![CDATA[<% hqMusicUrl %>]]></HQMusicUrl>
       <ThumbMediaId><![CDATA[<% thumbMediaId %>]]></ThumbMediaId>
       </Music>
     <% } else if (msgType === 'news') { %>
        <MsgType><![CDATA[news]]></MsgType>
        <ArticleCount><% content.length %></ArticleCount>
        <Articles>
     <% content.forEach(function(item) { %>
        <item>
        <Title><![CDATA[<% item.title %>]]></Title>
        <Description><![CDATA[<% item.description %>]]></Description>
        <PicUrl><![CDATA[<% item.picUrl %>]]></PicUrl>
        <Url><![CDATA[<% item.url %>]]></Url>
        </item>
     <% }  %>
     </Articles>
     </xml>
     */
});

console.log(tpl)