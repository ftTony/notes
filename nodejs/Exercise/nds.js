const dns = require('dns')

dns.lookup(`www.github.com`, (err, address, family) => {
    if (err) throw err
    console.log('地址: %j 地址族: IPv%s', address, family)
})