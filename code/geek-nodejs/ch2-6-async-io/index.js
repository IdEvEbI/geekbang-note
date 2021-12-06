const glob = require('glob')

// 演示 1：阻塞 I/O
// console.time('glob')
// 遍历所有子目录中的 js 文件
// const result = glob.sync(__dirname + '/**/*.js')
// console.timeEnd('glob')
// console.log(result)

// 演示 2：非阻塞 I/O
console.time('glob')
// 异步遍历所有子目录中的 js 文件
glob(__dirname + '/**/*.js', (err, res) => {
  console.log(res)
})
console.timeEnd('glob')
console.log('随机数：', Math.floor(Math.random() * 100))
