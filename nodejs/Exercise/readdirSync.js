// 同步方式遍历

var fs = require('fs');
var path = require('path');

var getFileInDir = function (dir) {
    var results = [path.resolve(dir)];
    var files = fs.readdirSync(dir, 'utf8');

    files.forEach(function (file) {

        file = path.resolve(dir, file);

        var stats = fs.statSync(file);

        if (stats.isFile()) {
            results.push(file);
        } else if (stats.isDirectory()) {
            results = results.concat(getFileInDir(file));
        }
    });

    return results;
};
var files = getFileInDir('../');
console.log(files);