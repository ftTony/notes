var fs = require('fs');

var getTimeDesc = function (d) {
    return [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') + ' ' + [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
}

fs.stat(__dirname + '\\file.txt', function (err, stats) {
    if (err) {
        console.error(err.message)
        return
    }
    console.log('文件大小：' + stats.size);
    console.log('创建时间：' + getTimeDesc(stats.birthtime));
    console.log('访问时间：' + getTimeDesc(stats.atime));
    console.log('修改时间：' + getTimeDesc(stats.mtime));
})