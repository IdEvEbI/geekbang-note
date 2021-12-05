/**
 * 与 Chrome 一致的对象或函数
 */
console.log(Date)
console.log(Math)

console.log(setTimeout)
console.log(setInterval)

// 注意：requestAnimationFrame 是浏览器渲染的下一帧，Node.js 中不支持
// console.log(requestAnimationFrame)
// Node.js 中提供了替代函数，当要异步（但要尽可能快）执行某些代码时使用
console.log(setImmediate)

/**
 * Node.js 特有的环境变量
 */
// 当前运行脚本的文件名
console.log(__filename)
// 当前运行脚本所在目录位置
console.log(__dirname)

// 进程对象
console.log(process)