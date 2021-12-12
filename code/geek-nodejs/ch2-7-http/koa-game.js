const Koa = require('koa')
const Router = require('@koa/router')
const fs = require('fs')
const { game } = require('./game')

const playerInfo = {
  wonCount: 0,        // 胜利次数
  lastAction: null,   // 上次出拳
  sameAction: 0,      // 相同出拳
}

const app = new Koa()
const router = new Router()

app.use(router.routes())

router.get('/favicon.ico', ctx => {
  ctx.status = 200
})

// 处理游戏逻辑
router.get('/game',
  async (ctx, next) => {
    // 判断玩家是否连续出一样的拳
    playerInfo.lastAction === ctx.query.action
      ?
      playerInfo.sameAction++
      :
      playerInfo.sameAction = 0
    playerInfo.lastAction = ctx.query.action

    if (playerInfo.sameAction >= 3) {
      ctx.status = 400
      ctx.body = '你玩赖，我不跟你玩了。'
      return
    }

    await next()
  },
  async (ctx, next) => {
    // 判断玩家是否连赢三局
    if (playerInfo.wonCount >= 3) {
      ctx.status = 500
      ctx.body = '你太厉害了，我不跟你玩了。'
      return
    }

    await next()

    const result = ctx.gameResult
    ctx.status = 200
    if (result === 0) {
      ctx.body = '我们旗鼓相当啊。'
    } else if (result === 1) {
      playerInfo.wonCount++
      ctx.body = `你连赢了 ${playerInfo.wonCount} 局，真厉害~~~`
    } else {
      playerInfo.wonCount = 0
      ctx.body = '你输了，加油哦。'
    }
  },

  async (ctx, next) => {
    ctx.gameResult = await new Promise(reslove => {
      setTimeout(() => {
        reslove(game(ctx.query.action))
      }, 50)
    })
  })

router.get('/', ctx => {
  ctx.status = 200
  ctx.type = 'text/html'
  ctx.body = fs.readFileSync(__dirname + '/game.html')
})

app.listen(3000, () => console.log('play game at http://localhost:3000'))
