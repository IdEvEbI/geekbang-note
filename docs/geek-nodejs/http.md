# HTTP 服务

## 1. 基础概念

- 概念：HTTP 协议全称 Hyper Text Transfer Protocol（超文本传输协议），是整个 Web 应用的基础。
- 作用：负责在**浏览器**与**服务器**之间传送文档；
  1. 把**网络资源**打包成一个**网络数据包**，以便于在网络上传输；
  2. 在目的地接收到**网络数据包**之后，把网络数据包还原成对应的网络资源，例如 HTML、CSS、图片等。
- 一个网页请求，包含两次 HTTP 包交换：
  1. 浏览器向 HTTP 服务器发送请求 HTTP 包，服务器解析进来的 HTTP **请求**（`request`）报文；
  2. HTTP 服务器向浏览器返回 HTTP 包，返回对请求处理结果的 HTTP **响应**（`response`）报文。

## 2. 简单实现一个 HTTP 服务器

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
   2. `es.end` 设置响应内容；
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

4. 修改服务器代码单独处理一下 `/facicon.ico`，代码如下：

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

> 扩展模块 [httpserver](https://www.npmjs.com/package/httpserver)
