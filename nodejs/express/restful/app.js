const express = require('express');
const app = express();
const fs = require('fs');

// 定义读取用户的信息 的接口
app.get('/users', (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        console.log(data);
        res.set();
    })
})

const server = app.listen(8081, function () {
    const {
        address,
        port
    } = server.address();
    console.log('server run in http://%s:%s', address, port);
})

const user = {
    "user4": {
        "name": "pingan",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

// 定义添加用户记录的接口
app.post('/users', (req, res) => {
    // 读取已存在的数据
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        data['user4'] = user['user4'];
        console.log(data);
        res.set(JSON.stringify(data));
    })
})

// 定义获取指定用户详情的接口
app.get('/users/:id', (req, res) => {
    // 首先我们读取已存在的用户
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        const user = data['user' + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    })
})

// mock 一条要删除的用户id
const id = 2;

app.delete('/users', (req, res) => {
    data = JSON.parse(data);
    delete data["user" + id];
    console.log(data);
    res.end(JSON.stringify(data));
})