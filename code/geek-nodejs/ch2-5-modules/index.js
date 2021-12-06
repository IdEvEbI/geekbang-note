const { course } = require('./course')

course.on('NEWCOURSE', ({ price }) => {
  console.log('耶，出新课啦，只要：', price)

  if (price <= 50) {
    console.log('入手新课程')
  }
})
