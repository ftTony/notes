var crypto = require("crypto");
var fs = require('fs');
var path = require("path");

var content = fs.readFileSync('nodejs/Exercise/file.txt', {
    encoding: 'utf8'
});
var hash = crypto.createHash("sha256");
var output;

hash.update(content);

output = hash.digest("hex");

console.log(output);