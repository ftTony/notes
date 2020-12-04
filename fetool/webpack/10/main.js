document.getElementById('aBtn').onclick = function () {
    //异步加载A
    // let A = import('./A')
    // import('./A').then((data) => {
    //   alert(data.A)
    // })

   //异步加载A
  require.ensure([], function () {
    let A = require('./A.js')
    alert(A)
  })
  }
  document.getElementById('bBtn').onclick = function () {
    //异步加载b
    // import('./B').then((data) => {
    //   alert(data.B)
    // })
    require.ensure([], function () {
        let B = require('./B.js')
        alert(B)
      })
  }