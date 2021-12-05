console.log('start require')
const lib = require('./lib.js')
console.log('end require', lib)

// 向 lib 模块的 exprots 对象添加对象
lib.testObj = { desc: 'hello module' }
