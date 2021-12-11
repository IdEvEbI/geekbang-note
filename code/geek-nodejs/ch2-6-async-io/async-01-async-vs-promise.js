// 1. 对比 resolove 的 async & Promise
console.log(async function () {
  return 'hello async'
}())

console.log(function () {
  return Promise.resolve('hello async')
}())

// 2. 对比 rejected 的 async & Promise
console.log(async function () {
  throw new Error('rejected async')
}())

console.log(function () {
  return Promise.reject(new Error('rejected async'))
}())
