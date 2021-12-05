// 1. 从命令行获取用户行为
const player = process.argv[process.argv.length - 1]
console.log('玩家出拳：', player)

// 2. 电脑随机出拳
const random = Math.floor(Math.random() * 3)
let computer

if (random === 0) {
  computer = '石头'
} else if (random === 1) {
  computer = '剪刀'
} else {
  computer = '布'
}
console.log('计算机出拳：', computer)

// 3. 比较结果
if (player === computer) {
  console.log('平局')
} else if (
  (player === '石头' && computer === '剪刀') ||
  (player === '剪刀' && computer === '布') ||
  (player === '布' && computer === '石头')
) {
  console.log('你赢了')
} else {
  console.log('你输了')
}
