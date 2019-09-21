const crypto = require('crypto');

const {
    privateKey,
    publicKey
} = crypto.generateKeyPairSync('ec', {
    namedCurve: 'sect239k1'
});
const algorithm = 'RSA-SHA256'; // 加密算法VS 摘要算法

function sign(text) {
    var sign = crypto.createSign(algorithm);
    sign.update(text);
    return sign.sign(privateKey, 'hex');
}

// 对内容进行签名
var content = 'hello world';
var signature = sign(content);
console.log(signature);