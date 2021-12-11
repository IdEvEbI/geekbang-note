const express = require('express')
const fs = require('fs')
const { game } = require('./game')

const playerInfo = {
  wonCount: 0,        // 胜利次数
  isCheating: false,  // 是否作弊
  lastAction: null,   // 上次出拳
  sameAction: 0,      // 相同出拳
}

const app = express()

app.get('/favicon.ico', (req, res) => {
  res.status(200).end()
})

app.get('/game', (req, res) => {
  const { action } = req.query

  // 判断玩家是否连赢三局或者作弊
  if (playerInfo.wonCount >= 3 || playerInfo.isCheating) {
    const msg = playerInfo.isCheating ? '你玩赖' : '你太厉害了'
    res.status(500).send(`${msg}，我不跟你完了。`)
    return
  }

  // 判断玩家是否连续出一样的拳
  playerInfo.lastAction === action
    ?
    playerInfo.sameAction++
    :
    playerInfo.sameAction = 0
  playerInfo.lastAction = action

  if (playerInfo.sameAction >= 3) {
    playerInfo.isCheating = true
    res.status(400).send('你玩赖，我不跟你完了。')
    return
  }

  const result = game(action)
  res.status(200)
  if (result === 0) {
    res.send('我们旗鼓相当啊。')
  } else if (result === 1) {
    playerInfo.wonCount++
    res.send(`你连赢了 ${playerInfo.wonCount} 局，真厉害~~~`)
  } else {
    playerInfo.wonCount = 0
    res.send('你输了，加油哦。')
  }
})

app.get('/', (req, res) => {
  res.status(200).send(fs.readFileSync(__dirname + '/game.html', 'utf8'))
})

app.listen(3000, () => console.log('play game at http://localhost:3000'))
