exports.game = (player) => {
  player = chinesePlayer(player)

  // 计算机随机出拳
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

  // 比较结果
  if (player === computer) {
    return 0
  } else if (
    (player === '石头' && computer === '剪刀') ||
    (player === '剪刀' && computer === '布') ||
    (player === '布' && computer === '石头')
  ) {
    return 1
  } else {
    return -1
  }
}

function chinesePlayer(player) {
  if (player === 'rock') {
    return '石头'
  } else if (player === 'scissor') {
    return '剪刀'
  } else {
    return '布'
  }
}
