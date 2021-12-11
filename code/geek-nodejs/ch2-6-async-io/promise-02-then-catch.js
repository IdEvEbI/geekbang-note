const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('padding to fulfilled')
    reject(new Error('error: padding to error'))
  }, 300)
}).then(res => console.log(res))
  .catch(err => console.log(err.message))

console.log(promise)

setTimeout(() => console.log(promise), 800)