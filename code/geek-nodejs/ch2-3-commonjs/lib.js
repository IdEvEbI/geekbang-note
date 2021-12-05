// 外部模块
console.log('hello module')

// exports 是模块上下文提供的对象，用于导出变量或方法
console.log('lib 模块', exports)

exports.username = 'zhangsan'

exports.person = {
  name: 'zhangsan',
  age: 18,
  gender: 'male'
}

exports.add = (a, b) => a + b

setTimeout(() => console.log(exports), 1000)
