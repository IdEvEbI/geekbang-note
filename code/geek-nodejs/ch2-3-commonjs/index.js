const { game } = require('./game.js')

let count = 0
process.stdin.on('data', e => {
  const player = e.toString().trim()

  if (game(player) === 1) {
    // 记录计算机输的次数
    count++
  }
  if (count === 3) {
    console.log('你真是太厉害了，我不玩了')
    process.exit()
  }
})
