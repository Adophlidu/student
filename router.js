/*
* router.js
* 处理路由设计
* 即处理请求路径以及发出响应
* */
var express = require('express'),
    Students = require('./Students')

    // 创建一个路由容器
    router = express.Router()

// 处理访问主页的请求
router.get('/', function (req, res) {
    Students.read(function (error, students) {
        if (error) {
            return res.statusCode(500).send('读取文件失败!')
        }
        res.render('index.html', {
            students: students
        })
    })
})

// 添加学生请求
router.get('/student-mongodb/new', function (req, res) {
    res.render('addStu.html')
})

// 处理添加学生的请求
router.post('/student-mongodb/new', function (req, res) {
    Students.save(req.body, function (error) {
        if (error) {
            return res.statusCode(500).send('数据读取失败!')
        }
        res.redirect('/')
    })
})

// 修改学生请求
router.get('/student-mongodb/edit', function (req, res) {
    Students.readById(parseInt(req.query.id), function (error, student) {
        if (error) {
            return res.statusCode(500).send('读取数据失败!')
        }
        res.render('edit.html', {
            student: student
        })
    })
})

//处理修改学生的请求
router.post('/student-mongodb/edit', function (req, res) {
    Students.updateById(req.body, function (error) {
        if (error) {
            return res.statusCode(500).send('读取数据失败')
        }
        res.redirect('/')
    })
})

//处理查询学生请求
router.get('/student-mongodb/search', function (req, res) {
    Students.readById(parseInt(req.query.id), function (error, stu) {
        if (error) {
            return res.statusCode(500).send('读取数据失败!')
        }
       res.render('search.html', {
           student: stu
       })
    })
})

// 处理删除学生的请求
router.get('/student-mongodb/delete', function (req, res) {
    Students.deleteById(parseInt(req.query.id), function (error) {
        if (error) {
            return res.statusCode(500).send('读取数据失败!')
        }
        res.redirect('/')
    })
})

module.exports = router