/*
* Students.js
* 处理操作学生信息数据问题
* */
var fs = require('fs'),
    dataPath = './db.json'

// 查询所有学生数据
exports.read = function (callback) {
    fs.readFile(dataPath, function (error, data) {
        if (error) {
            return callback(error)
        }
        callback(null, JSON.parse(data.toString()).students)
    })
}

// 根据id查询单个学生信息
exports.readById = function (id, callback) {
    fs.readFile(dataPath, function (error, data) {
        if (error) {
            return callback(error)
        }
        var students = JSON.parse(data.toString()).students

        // es6新增的数组方法,如果遍历项满足item.id === id,则停止遍历,并返回当前遍历项
        var student = students.find(function (item) {
            return item.id === id
        })
        callback(null, student)
    })
}

// 保存学生数据
exports.save = function (student, callback) {
    fs.readFile(dataPath, function (error, data) {
        if (error) {
            return callback(error)
        }
        var students = JSON.parse(data.toString()).students
        if (students.length === 0) {
            student.id = 0
        }else {
            student.id = students[students.length - 1].id + 1
        }
        student.date = new Date().toLocaleString()
        students.push(student)
        var fileData = JSON.stringify({
            "students": students
        })
        fs.writeFile(dataPath, fileData, function (error) {
            if (error) {
                return callback(error)
            }
            callback(null)
        })
    })
}

// 根据id更新学生数据
exports.updateById = function (student, callback) {
    fs.readFile(dataPath, function (error, data) {
        if (error) {
            return callback(error)
        }
        student.id = parseInt(student.id)
        var students = JSON.parse(data.toString()).students
        var stu = students.find(function (item) {
            return item.id === student.id
        })
        for (var key in student) {
            stu[key] = student[key]
        }
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dataPath, fileData, function (error) {
            callback(error)
        })
    })
}

// 根据id删除学生数据
exports.deleteById = function (id, callback) {
    fs.readFile(dataPath, function (error, data) {
        if (error) {
            return callback(error)
        }
        var students = JSON.parse(data.toString()).students
        var stu = students.find(function (item) {
            return item.id === id
        })

        // 获取stu的索引,并删除该项
        for (var i = 0;i < students.length;i ++) {
            students[i] === stu ? students.splice(i,1) : null
        }
        var fileData = JSON.stringify({
            students: students
        })
        fs.writeFile(dataPath, fileData, function (error) {
            callback(error)
        })
    })
}
