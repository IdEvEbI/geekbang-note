/**
 * 课程模块
 * 
 * 每隔 2 秒钟派发一个事件：NEWCOURSE（推出新课程）
 */
const { EventEmitter } = require('events')

class Course extends EventEmitter {
  constructor() {
    super()

    setInterval(() => {
      this.emit('NEWCOURSE', { price: Math.floor(Math.random() * 100) })
    }, 2000)
  }
}

exports.course = new Course()
