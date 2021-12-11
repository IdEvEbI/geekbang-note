// 提示：以下代码要在 Chrome 中调试

// Promise 的状态流转
let promise = new Promise(function (resolve, reject) {
  // setTimeout(() => {
  //   // 1> 500 毫秒后，流转到 resolve 状态
  //   // resolve()
  //   // 2> 500 毫秒后，流转到 reject 状态
  //   reject(new Error())
  // }, 500)
  // 3> 300 毫秒后，流转到 resolve 状态
  //    500 毫秒后，尝试流转到 reject 状态，观察是否生效
  //    结论：resolve 和 reject 状态之间不能相互转换
  setTimeout(() => resolve(), 300)
  setTimeout(() => reject(new Error()), 500)
})

console.log(promise)

setTimeout(() => console.log(promise), 800)
