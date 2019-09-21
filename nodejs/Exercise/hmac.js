const crypto = require('crypto');
const fs = require('fs');
const hmac = crypto.createHmac('sha256', '密钥');

const input = fs.readFileSync('nodejs/Exercise/file.txt', {
    encoding: 'utf8'
});
hmac.update(input);
console.log(hmac.digest('hex'));