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
