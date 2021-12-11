
/**
 * 面试函数，500 ~ 700 毫秒后通知面试结果，面试通过率 50%
 *
 * @param {String} companyName 面试公司名
 * @param {Number} round 面试轮数
 * @returns Promise
 */
const interview = (companyName, round) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() >= 0.5) {
        resolve(`面试 ${companyName} 第 ${round} 轮通过`)
      } else {
        reject(new Error(`面试 ${companyName} 第 ${round} 轮失败...`))
      }
    }, 500 + Math.floor(Math.random() * 200))
  })
}

// 场景 1：只参加一轮面试
// (async () => {
//   try {
//     const res = await interview('ali', 1)
//     console.log(res)
//   } catch (err) {
//     console.log(err.message)
//   }
// })();

// 场景 2：要参加 3 轮面试
// (async () => {
//   try {
//     console.log(await interview('ali', 1))
//     console.log(await interview('ali', 2))
//     console.log(await interview('ali', 3))
//   } catch (err) {
//     console.log(err.message)
//   }
// })();

// 场景 3：面试者期望拿到 2 个 Offer
(async () => {
  try {
    const result = await Promise.all([
      interview('ali', 1),
      interview('360', 1)
    ])
    console.log(result)
  } catch (err) {
    console.log(err.message)
  }
})()
