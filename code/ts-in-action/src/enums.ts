// 1. 数字枚举
/** 角色枚举类型 */
enum Role {
  Reporter = 1,
  Developer = 2,
  Maintainer = 4,
  Owner = 8,
  Guest = 0
}
console.log('报告者角色', Role.Reporter)
console.log(Role[2], typeof Role[2]) // Developer string
console.log(Role)

// 2. 字符串枚举
/** 请求消息 */
enum Message {
  Success = '恭喜，请求成功',
  Fail = '抱歉，请求失败'
}
console.log(Message.Success)
console.log(Message)

// 3. 常量枚举
const enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
console.log(WeekDay.Monday)
// console.log(WeekDay) // Error
const weekDay = [
  WeekDay.Sunday,
  WeekDay.Monday,
  WeekDay.Thursday,
  WeekDay.Wednesday,
  WeekDay.Thursday,
  WeekDay.Friday,
  WeekDay.Saturday
]
