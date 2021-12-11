const result = (async () => {
  let content = null
  try {
    content = await new Promise((resolve, reject) => {
      setTimeout(() => {
        // 1. 测试 content 获取 resolve 的结果
        // resolve('hello await')
        // 2. 测试 try-catch 捕获 reject 的错误
        reject(new Error('rejected'))
      }, 500)
    })
  } catch (e) {
    console.log(e.message)
  }
  console.log(content)

  return 'async & aswit'
})()

setTimeout(() => {
  console.log('====>', result)
}, 800)
