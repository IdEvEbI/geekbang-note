const http = require('http')
const fs = require('fs')
const { game } = require('./game')

const playerInfo = {
  wonCount: 0,        // 胜利次数
  isCheating: false,  // 是否作弊
  lastAction: null,   // 上次出拳
  sameAction: 0,      // 相同出拳
}

http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}/`)

  if (url.pathname === '/favicon.ico') {
    res.writeHead(200)
    res.end()
    return
  }

  // 石头剪刀布游戏逻辑
  if (url.pathname === '/game') {
    const action = url.searchParams.get('action')

    // 判断玩家是否连赢三局或者作弊
    if (playerInfo.wonCount >= 3 || playerInfo.isCheating) {
      res.writeHead(500)
      const msg = playerInfo.isCheating ? '你玩赖' : '你太厉害了'
      res.end(`${msg}，我不跟你完了。`)
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
      res.writeHead(400)
      res.end('你玩赖，我不跟你完了。')
      return
    }

    const result = game(action)
    res.writeHead(200)
    if (result === 0) {
      res.end('我们旗鼓相当啊。')
    } else if (result === 1) {
      playerInfo.wonCount++
      res.end(`你连赢了 ${playerInfo.wonCount} 局，真厉害~~~`)
    } else {
      playerInfo.wonCount = 0
      res.end('你输了，加油哦。')
    }
  }

  if (url.pathname === '/') {
    res.writeHead(200)
    fs.createReadStream(__dirname + '/game.html').pipe(res)
  }
}).listen(3000, () => {
  console.log('play game at http://localhost:3000')
})