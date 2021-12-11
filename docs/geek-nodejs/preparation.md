# 基础概念及快速体验

## 1. 基础知识

### 1.1 Node.js 是什么？

Node.js 是一个 JavaScript 的运行环境，与 Chrome 的区别是：

- Node.js 没有浏览器 API，如：`document`、`window` 等；
- Node.js 中增加了许多 API，如：文件系统、进程等。

对于开发者来说：

- 在 Chrome 里写 JavaScript 可以控制浏览器；
- 使用 Node.js 可以让你用类似的方式控制整个计算机。

官网概念：

1. Node.js 是一个基于 **Chrome V8 引擎**的 JavaScript 运行环境；
2. Node.js 使用了一个**事件驱动**、**非阻塞式 I/O** 的模型，使其轻量又高效。

### 1.2 Node.js 可以用来做什么？

1. Web 服务器（服务端渲染 + 前后端同构）
   1. 服务端渲染 = 搜索引擎优化 + 首屏速度优化
2. 构建工作流
   1. 使用 Node.js 做 JS 构建工具比较保险
   2. 常用构建工具：gulp、webpack
3. 开发工具 - Visual Studio Code
4. 游戏 - wayward
5. 客户端应用 - twitch.tv

## 2. 软件安装

1. Chrome：<https://www.google.com/chrome/thank-you.html?standalone=1>
2. Visual Studio Code：<https://code.visualstudio.com/Download>
3. Node.js：<https://nodejs.org>

在控制台输入以下命令可以测试 Node.js 是否安装成功：

```bash
# 测试 Node.js 安装
node -v

# 测试 npm 安装
npm -v
```

## 3. 快速体验 - 石头剪刀布

> 目标：了解 Node.js 的**运行方式**以及在 Node.js 中的**全局变量**。

### 3.1 运行方式及全局变量

1. 在命令行输入：`node js文件名.js` 可以运行对应的 js 脚本
2. 新建 `ch2-2-global-var.js` 并输入以下代码：

   ```js
   /**
    * 与 Chrome 一致的对象或函数
    */
   console.log(Date)
   console.log(Math)

   console.log(setTimeout)
   console.log(setInterval)

   // 注意：requestAnimationFrame 是浏览器渲染的下一帧，Node.js 中不支持
   // console.log(requestAnimationFrame)
   // Node.js 中提供了替代函数，当要异步（但要尽可能快）执行某些代码时使用
   console.log(setImmediate)

   /**
    * Node.js 特有的环境变量
    */
   // 当前运行脚本的文件名
   console.log(__filename)
   // 当前运行脚本所在目录位置
   console.log(__dirname)

   // 进程对象
   console.log(process)
   ```

3. `process` 对象中几个重要属性如下：

   1. `argv`：命令行程序的命令及参数列表
   2. `env`：Node 当前运行环境的环境变量，程序员可以根据需要增加环境变量
   3. `cpuUsage`：CPU 占用率
   4. `memoryUsage`：内存占用率
   5. `hrtime`：可以用于时间统计

### 3.2 石头剪刀布（原始版）

#### 3.2.1 需求说明

1. 用户在命令行输入 `node ch2-2-rock.js 石头`，表示用户出拳是**石头**
2. 电脑**随机**生成石头、剪刀、布
3. 判定胜负并输出胜负结果

#### 3.2.2 代码实现

1. 新建 `ch2-2-rock.js` 并输入以下代码：

   ```js
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
   ```

2. 在控制台多次输入 `node ch2-2-rock.js 石头` 验证游戏效果
