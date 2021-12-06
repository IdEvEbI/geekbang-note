/**
 * 面试函数，500 ~ 700 毫秒后通知面试结果，面试通过率 50%
 * @param {*} callback
 */
const interview = (callback) => {
  setTimeout(() => {
    if (Math.random() >= 0.5) {
      callback(null, 'success')
    } else {
      callback(new Error('fail'))
    }
  }, 500 + Math.floor(Math.random() * 200))
}

// 场景 1：只参加一轮面试
// interview((err, res) => {
//   if (err) {
//     return console.log('面试未通过：', err.message)
//   }
//   console.log('面试通过：', res)
// })

// 场景 2：要参加 3 轮面试
// interview((err, res) => {
//   if (err) {
//     return console.log('第 1 轮面试失败：', err.message)
//   }
//   console.log('第 1 轮面试通过，准备 2 面')

//   interview((err, res) => {
//     if (err) {
//       return console.log('第 2 轮面试失败：', err.message)
//     }
//     console.log('第 2 轮面试通过，准备 3 面')

//     interview((err, res) => {
//       if (err) {
//         return console.log('第 3 轮面试失败：', err.message)
//       }

//       console.log('面试通过：', res)
//     })
//   })
// })

// 场景 3：面试者期望拿到 2 个 Offer
let count = 0

interview((err, res) => {
  if (err) {
    return console.log('第 1 家公司面试失败：', err.message)
  }
  console.log('拿到第 1 家 Offer', res)

  count++
  if (count === 2) {
    console.log('拿到 2 个 Offer，先 2 后 1')
  }
})

interview((err, res) => {
  if (err) {
    return console.log('第 2 家公司面试失败：', err.message)
  }
  console.log('拿到第 2 家 Offer', res)

  count++
  if (count === 2) {
    console.log('拿到 2 个 Offer，先 1 后 2')
  }
})