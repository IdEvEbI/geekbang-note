# 4. CommonJS 模块规范

> 目标：了解 CommonJS 模块规范及基本使用。

以前使用 `script` 标签加载脚本存在以下问题：

1. 脚本变多时，需要手动管理加载顺序
2. 不同脚本之间逻辑调用，需要通过全局变量，例如 `jQuery` 的 `$`
3. 没有 html 怎么办？

## 4.1 CommonJS 模块规范概念

CommonJS 模块规范是开发一个大型 Node.js 程序的基础，CommonJS 是由 JavaScript 社区发起的，后来在 Node.js 上被应用并推广，后续也影响到了浏览器端 JavaScript 的编写。

## 4.2 使用 require 引用外部模块

1. 新建 `ch2-3-commonjs/lib.js` 输入以下代码：

   ```js
   // 外部模块
   console.log('hello module')
   ```

2. 新建 `ch2-3-commonjs/index.js` 输入以下代码：

   ```js
   console.log('start require')
   const lib = require('./lib.js')
   console.log('end require', lib)
   ```

3. 运行 `index.js` 输出效果如下：

   ```bash
   start require
   hello module
   end require {}
   ```

4. 使用 `webpack  --mode development --no-devtool ./index.js` 可以查看 `require` 的代码实现如下：

   ```js
   function __webpack_require__(moduleId) {
     // Check if module is in cache
     var cachedModule = __webpack_module_cache__[moduleId];
     if (cachedModule !== undefined) {
       return cachedModule.exports;
     }
     // Create a new module (and put it into the cache)
     var module = __webpack_module_cache__[moduleId] = {
       // no module.id needed
       // no module.loaded needed
       exports: {}
     };

     // Execute the module function
     __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

     // Return the exports of the module
     return module.exports;
   }
   ```

   **结论**：使用 `require` 引用模块时，被引用模块中的代码会**被执行一次**。

## 4.3 使用 exports 导出方法或变量

模块上下文提供了 `exports` 对象用于导出当前模块的方法或者变量。

1. 修改 `lib.js` 代码如下：

   ```js
   // exports 是模块上下文提供的对象，用于导出变量或方法
   console.log('lib 模块', exports)

   exports.username = 'zhangsan'

   exports.person = {
     name: 'zhangsan',
     age: 18,
     gender: 'male'
   }

   exports.add = (a, b) => a + b

   setTimeout(() => console.log(exports), 1000)
   ```

2. 修改 `index.js` 代码如下：

   ```js
   console.log('start require')
   const lib = require('./lib.js')
   console.log('end require', lib)

   // 向 lib 模块的 exprots 对象添加对象
   lib.testObj = { desc: 'hello module' }
   ```

3. 运行 `index.js` 输出效果如下：

   ```bash
   start require
   hello module
   lib 模块 {}
   end require {
     username: 'zhangsan',
     person: { name: 'zhangsan', age: 18, gender: 'male' },
     add: [Function (anonymous)]
   }
   {
     username: 'zhangsan',
     person: { name: 'zhangsan', age: 18, gender: 'male' },
     add: [Function (anonymous)],
     testObj: { desc: 'hello module' }
   }
   ```

## 4.4 使用模块改造石头剪刀布游戏

### 4.4.1 需求说明

1. 用户**循环在控制台输入**：石头、剪刀、布
2. 电脑**随机**生成石头、剪刀、布
3. 判定胜负并输出胜负结果
4. 如果**电脑输的次数超过三次**，终止游戏

### 4.4.2 代码实现

1. 新建 `ch2-3-commonjs/game.js`，复制 `ch2-2-rock.js` 的代码并改造如下：

   ```js
   exports.game = (player) => {
     console.log('玩家出拳：', player)

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
       console.log('平局')

       return 0
     } else if (
       (player === '石头' && computer === '剪刀') ||
       (player === '剪刀' && computer === '布') ||
       (player === '布' && computer === '石头')
     ) {
       console.log('你赢了')

       return 1
     } else {
       console.log('你输了')

       return -1
     }
   }
   ```

2. 修改 `ch2-3-commonjs/index.js` 代码如下：

   ```js
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
   ```
