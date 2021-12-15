# 基础篇

JavaScript 是一门动态弱类型语言，对变量的类型非常宽容，而且不会在这些变量和它们的调用者之间建立**结构化的契约**。

TypeScript 是拥有类型系统的 JavaScript 的超级，**可以编译成纯 JavaScript**。

使用 TypeScript 的好处如下：

- 类型检查
- 语言扩展
- 用接口定义代替文档
- IDE 能够提高开发效率，降低维护成本
- 重塑“类型思维”

> TypeScript 官网在线测试平台（Playground）：<https://www.typescriptlang.org/play>。

## 1. 类型基础

- **强类型语言**：不允许改变变量的数据类型，除非进行强制类型转换，不同类型的变量不能相互赋值；
- **弱类型语言**：变量可以被赋予不同的数据类型，虽然更灵活，但更容易产生 BUG；
- **静态语言**：在编译阶段确定所有变量的类型，特点如下：
  - 对类型严格 / 立即发现错误 / 运行时性能好 / 自文档化；
- **动态语言**：在执行阶段确定所有变量的类型，特点如下：
  - 对类型宽松 / Bug 可能隐藏很久 / 运行时性能差 / 可读性差。

动态语言的支持者认为：

- 性能是可以改善的（V8 引擎），语言的灵活性更重要
- 隐藏的错误可以通过单元测试发现
- 文档可以通过工具生成

## 2. 开发环境准备 - Hello TypeScript

### 2.1 基础环境准备

1. 安装软件 VS Code 和 Node.js；
2. 新建 `ts-in-action` 目录；
3. 初始化工程：

   ```bash
   # 创建 npm 包
   npm init -y

   # 安装 TypeScript
   yarn add -D typescript

   # 创建 TypeScript 编译配置项 tsconfig.json
   npx tsc --init
   ```

4. 新建 `src/index.ts` 并实现如下代码：

   ```ts
   const hello: string = 'Hello TypeScript'
   ```

   > 以上代码中的 `: string` 在 TypeScript 被称为类型注解。

5. 使用 `tsc` 编译 `index.ts`：

   ```bash
   npx tsc ./src/index.ts
   ```

6. 生成的 `index.js` 内容如下：

   ```js
   var hello = 'Hello TypeScript';
   ```

### 2.2 webpack 构建工具

1. 安装 `webpack`、`webpack-cli`、`webpack-dev-server`

   ```bash
   yarn add -D webpack webpack-cli webpack-dev-server
   ```

#### 2.2.1 公共环境配置

1. 安装 `html-webpack-plugin` 和 `ts-loader`：

   ```bash
   yarn add -D html-webpack-plugin ts-loader
   ```

   - `html-webpack-plugin` 可以通过一个模板生成网站首页，并且把输出文件自动嵌入到首页中
   - `ts-loader` 可以把 ts 文件编译成 js 文件

2. 新建模板文件 `./str/tpl/index.html`：

   ```html
   <!DOCTYPE html>
   <html lang="en">

   <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Type in Action</title>
   </head>

   <body>
     <div class="app"></div>
   </body>

   </html>
   ```

3. 新建 `./build/webpack.base.config.js` **公共环境配置**：

   ```js
   const HtmlWebpackPlugin = require('html-webpack-plugin')

   module.exports = {
     entry: './src/index.ts',
     output: {
       filename: 'app.js'
     },
     resolve: {
       extensions: ['.js', '.ts', '.tsx']
     },
     module: {
       rules: [
         {
           test: /\.tsx?$/i,
           use: [{
             loader: 'ts-loader'
           }],
           exclude: /node_modules/
         }
       ]
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './src/tpl/index.html'
       })
     ]
   }
   ```

#### 2.2.2 开发环境和生产环境配置

1. 新建 `./build/webpack.dev.config.js` **开发环境配置**：

   ```js
   module.exports = {
     devtool: 'cheap-module-eval-source-map'
   }
   ```

   - 开启 `source-map`
   - `cheap`：忽略列信息
   - `moudle`：定位到源码

2. 安装 `clean-webpack-plugin`：

   ```bash
   yarn add -D clean-webpack-plugin
   ```

   - 每次成功构建前，清空 dist 目录，避免多次构建生成无用的带哈希的文件。

3. 新建 `./build/webpack.pro.config.js` **生产环境配置**：

   ```js
   const { CleanWebpackPlugin } = require('clean-webpack-plugin')

   module.exports = {
     plugins: [
       new CleanWebpackPlugin()
     ]
   }
   ```

#### 2.2.3 配置入口

1. 安装 `webpack-merge`：

   ```bash
   yarn add -D webpack-merge
   ```

   - 可以合并配置文件

2. 新建 `./build/webpack.config.js` **配置文件入口**：

   ```js
   const { merge } = require('webpack-merge')

   const baseConfig = require('./webpack.base.config')
   const devConfig = require('./webpack.dev.config')
   const proConfig = require('./webpack.pro.config')

   const config = process.NODE_ENV === 'development' ? devConfig : proConfig

   module.exports = merge(baseConfig, config)
   ```

#### 2.2.4 修改 package.json

1. 修改包入口：

   ```json
   "main": "./src/index.ts"
   ```

2. 设置**开发脚本命令**：

   ```json
   "start": "webpack-dev-server --mode=development --config ./build/webpack.config.js"
   ```

3. 使用 `yarn start` 并访问 `http://localhost:8080/` 测试启动开发环境。

4. 保持开发环境的开启，并修改 `./src/index.ts` 如下：

   ```ts
   const hello: string = 'Hello TypeScript'

   const el = document.querySelector('.app') as HTMLDivElement
   el.innerText = hello
   ```

5. 设置**生产脚本命令**：

   ```json
   "build": "webpack --mode=production --config ./build/webpack.config.js"
   ```

6. 使用 `yarn build` 确认能够在 `./dist` 目录下生成打包结果。
