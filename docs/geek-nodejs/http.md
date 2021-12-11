# HTTP 服务

## 1. 基础概念

> 目标：了解 HTTP 服务基本概念，建立**请求**和**响应**的基本认知。

- 概念：HTTP 协议全称 Hyper Text Transfer Protocol（超文本传输协议），是整个 Web 应用的基础。
- 作用：负责在**浏览器**与**服务器**之间传送文档；
  1. 把**网络资源**打包成一个**网络数据包**，以便于在网络上传输；
  2. 在目的地接收到**网络数据包**后，把网络数据包还原成对应的网络资源，如：HTML、CSS、图片等。
- 一个网页请求，包含两次 HTTP 包交换：
  1. 浏览器向 HTTP 服务器发送请求 HTTP 包，服务器解析进来的 HTTP **请求**（`request`）报文；
  2. HTTP 服务器向浏览器返回 HTTP 包，返回对请求处理结果的 HTTP **响应**（`response`）报文。

## 2. 简单实现一个 HTTP 服务器

> 目标：掌握用 http 内置模块实现一个简单 HTTP 的基本步骤，并知道使用 fs 模块的 `pipe` 返回一个网页。

### 2.1 简单实现一个 HTTP 服务器

新建 js 文件并实现以下代码：

```js
const http = require('http')

http
  .createServer((req, res) => {
    res.writeHead(200)
    res.end('<h1>Hello HTTP server</h1>')
  })
  .listen(3000)
```

其中：

1. `const http = require('http')` 导入内置的 http 模块；
2. `createServer` 创建服务器对象并在**回调方法**中监听客户端请求；
   1. `res.writeHead(200)` 设置响应状态码；
   2. `es.end()` 设置响应内容；
3. `listen` 启动服务器并且监听 3000 端口。

### 2.2 favicon.ico

1. 在 `createServer` 的回调方法中输出 `req.url` 输出请求的 `url`：

   ```js
   console.log(req.url)
   ```

2. 运行代码会发现在客户端刷新一次请求，会有两次请求，包括：

   ```bash
   /
   /favicon.ico
   ```

3. 其中 `/favicon.ico` 是显示在浏览器标签栏的小图标，这个请求的发送是浏览器的默认行为；

4. 修改服务器代码单独处理 `/facicon.ico`，代码如下：

   ```js
   http
     .createServer((req, res) => {
       if (req.url === '/favicon.ico') {
         res.writeHead(200)
         res.end()
         return
       }

       console.log(req.url)
       res.writeHead(200)
       res.end('<h1>Hello HTTP server</h1>')
     })
     .listen(3000)
   ```

### 2.3 返回 HTML 网页

1. 新建 index.html 并输入一些内容；
2. 导入 `fs` 模块

   ```js
   const fs = require('fs')
   ```

3. 修改 `createServer` 的回调代码如下：

   ```js
   res.writeHead(200)
   fs.createReadStream(__dirname + '/index.html')
     .pipe(res)
   ```

> 扩展模块 [httpserver](https://www.npmjs.com/package/httpserver)。

## 3. 实现网页版石头剪刀布

> 目标：强化 http 内置模块实现网页交互的方法，发现随着业务逻辑的增加，代码的可维护性下降。

### 3.1 准备石头剪刀布游戏的网页

1. 新建 `game.html` 文件并实现以下代码：

   ```html
   <!DOCTYPE html>
   <html lang="en">

   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>网页版石头剪刀布</title>
     <style>
       .game-output {
         width: 600px;
         height: 400px;
         background-color: #eee;
         overflow: auto;
       }
       .game-panel {
         display: flex;
         width: 600px;
         border: 1px solid #ccc;
       }
       .game-panel button {
         flex: 1;
         width: 80px;
         height: 40px;
       }
     </style>
   </head>

   <body>
     <div class="game-output"></div>
     <div class="game-panel">
       <button class="rock">石头</button>
       <button class="scissor">剪刀</button>
       <button class="paper">布</button>
     </div>

     <script>
       const buttons = {
         rock: document.querySelector('.game-panel .rock'),
         scissor: document.querySelector('.game-panel .scissor'),
         paper: document.querySelector('.game-panel .paper')
       }

       const panel = document.querySelector('.game-output')

       for (const key in buttons) {
         buttons[key].onclick = function () {
           fetch(`http://${location.host}/game?action=${key}`)
             .then(res => res.text())
             .then(text => {
               panel.innerHTML += text + '<br>'
               panel.scrollTop = panel.scrollHeight
             })
         }
       }
     </script>
   </body>

   </html>
   ```

2. 返回游戏网页

   ```js
   const http = require('http')
   const fs = require('fs')

   http.createServer((req, res) => {
     const url = new URL(req.url, `http://${req.headers.host}/`)

     if (url.pathname === '/favicon.ico') {
       res.writeHead(200)
       res.end()
       return
     }

     console.log(url.pathname)

     if (url.pathname === '/') {
       res.writeHead(200)
       fs.createReadStream(__dirname + '/game.html').pipe(res)
     }
   }).listen(3000, () => {
     console.log('play game at http://localhost:3000')
   })
   ```

### 3.2 调整石头剪刀布代码逻辑

1. 调整之前之前的石头剪刀布代码逻辑如下：

   ```js
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
   ```

2. 实现基础的游戏逻辑 - 导入游戏模块：

   ```js
   const { game } = require('./game')
   ```

3. 实现基础的游戏逻辑 - 修改 `createServer` 回调方法：

   ```js
   // 石头剪刀布游戏逻辑
   if (url.pathname === '/game') {
     const action = url.searchParams.get('action')
     const result = game(action)

     res.writeHead(200)
     if (result === 0) {
       res.end('平局')
     } else if (result === 1) {
       res.end('你赢了')
     } else {
       res.end('你输了')
     }
   }
   ```

### 3.3 石头剪刀布游戏增强

1. 新需求
   1. 如果玩家连续三次出拳相同，认为是作弊；
   2. 如果玩家连续赢了三次或者作弊，计算机不再和玩家游戏。

2. 定义对象记录玩家初始信息：

   ```js
   const playerInfo = {
     wonCount: 0,        // 胜利次数
     isCheating: false,  // 是否作弊
     lastAction: null,   // 上次出拳
     sameAction: 0,      // 相同出拳
   }
   ```

3. 扩展游戏逻辑 - 判断玩家胜负次数

   ```js
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
   ```

4. 扩展游戏逻辑 - 判断玩家出拳情况

   ```js
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
   ```

## 4. Express

> 目标：了解 Express 框架的基本使用以及不完善的洋葱圈模型。

### 4.1 Express 介绍

Express 的 npm 网站为：<https://www.npmjs.com/package/express>。

- Express 特性如下：

  1. 强大的路由功能；
  2. 专注于高性能；
  3. 高测试覆盖率；
  4. HTTP 辅助（重定向、缓存等）；
  5. 14+ 模板引擎支持；
  6. 内容协商；
  7. 强大的脚手架快速生成应用。

- 核心功能：

  1. 路由
  2. request & response 简化

### 4.2 Express 路由体验

> 目标：对石头剪刀布游戏进行初步的改造，体验通过**路由**把代码逻辑封装到三个独立的代码块，易于程序维护。

1. 安装框架：

   ```bash
   npm init -y 

   npm i express 
   ```

2. 基础的 express 框架代码：

   ```js
   const express = require('express')

   const app = express()

   app.get('/favicon.ico', (req, res) => {
     res.writeHead(200)
     res.end()
   })

   app.get('/', (req, res) => {
     res.writeHead(200)
     res.end('Hello Express')
   })

   app.listen(3000, () => console.log('play game at http://localhost:3000'))   
   ```

3. 加载 `game.html`：

   ```js
   const fs = require('fs')

   // ...

   app.get('/', (req, res) => {
     res.writeHead(200)
     fs.createReadStream(__dirname + '/game.html').pipe(res)
   })
   ```

4. 复制游戏逻辑：

   ```js
   const { game } = require('./game')

   const playerInfo = {
     wonCount: 0,        // 胜利次数
     isCheating: false,  // 是否作弊
     lastAction: null,   // 上次出拳
     sameAction: 0,      // 相同出拳
   }

   // ...

   app.get('/game', (req, res) => {
     const url = new URL(req.url, `http://${req.headers.host}/`)
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
   })
   ```

### 4.3 Express HTTP 辅助

> 目标：了解利用 HTTP 辅助能够对 http 模块的一些简化操作。

1. 修改 `/favicon.ico` 路由：

   ```js
   app.get('/favicon.ico', (req, res) => {
     res.status(200).end()
   })
   ```

2. 修改 `/` 路由：

   ```js
   app.get('/', (req, res) => {
     res.status(200).send(fs.readFileSync(__dirname + '/game.html', 'utf8'))
   })
   ```

3. 修改 `/game` 路由：

   ```js
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
   ```
