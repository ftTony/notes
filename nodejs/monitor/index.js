'use strict';
const easyMonitor = require('easy-monitor');
easyMonitor('your project name');
const express = require('express');
const app = express();

app.get('/hello', function (req, res, next) {
    res.send('hello');
});


app.listen(8082);