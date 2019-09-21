// 公钥加密

var crypto = require("crypto");
var secret = 'secret';

var cipher = crypto.createCipher('aes192', secret);
var content = 'hello';
var cryptedContent;

cipher.update(content);
cryptedContent = cipher.final('hex');
console.log(cryptedContent);