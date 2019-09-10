// 异步方式遍历目录

var fs = require('fs');
var path = require('path');

var getFileInDir = function (dir) {
    var results = [path.resolve(dir)];
    fs.readdir(dir, { encoding: 'utf8' }, function (err, files) {
        files.forEach(function (file) {

            file = path.resolve(dir, file);

            var stats = fs.statSync(file);

            if (stats.isFile()) {
                results.push(file);
            } else if (stats.isDirectory()) {
                results = results.concat(getFileInDir(file));
            }
        });
    });
    return results;
};
var files = getFileInDir('../');
console.log(files);