var express = require('express')
var app = express()
var axios = require('axios')

var apiRoutes = express.Router()
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
apiRoutes.get('/getList', function (req, res) {
    var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
    axios.get(url, {
        headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
        },
        params: req.query
    }).then(function (response) {
        res.json(response.data)
    }).catch(function (error) {
        console.log(error)
    })
})

apiRoutes.get('/getLyric', function (req, res) {
    var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  
    axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then((response) => {
        // jsonp 数据转为 json 数据
        var result = response.data
  
        if (typeof result === 'string') {
          var reg = /^\w+\(({[^()]+})\)$/
          var matches = result.match(reg)
  
          if (matches) {
            result = JSON.parse(matches[1])
          }
        }
  
        res.json(result)
        // res.json(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  })
  app.use('/api', apiRoutes)
  
  apiRoutes.get('/getSongList', function (req, res) {
    var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?jsonCallback=jsonCallback'
  
    axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      })
      .then(function (response) {
        res.json(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  })

  let port='8889';
   app.listen(port,()=>{
    console.log(`server running @${port}`)
   });

   module.exports = app