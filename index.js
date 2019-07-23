/*
* index.js
* 系统的唯一入口
* */
var express = require('express'),
    bodyParser = require('body-parser'),
    router = require('./router'),
    server = express()

// 开放公共资源
server.use('/public/', express.static('./public'))

// 配置模板引擎
server.engine('html', require('express-art-template'))

// 获取post请求数据的插件的配置
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use(router)

server.listen(3000, function () {
    console.log('the server is running!')
})

