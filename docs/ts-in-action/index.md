# TypeScript 开发实战

## 1. 课程信息

1. 课程名称：TypeScript 开发实战
2. 主讲：梁宵
3. 课程链接：<https://time.geekbang.org/course/intro/100032201>

## 2. 课程介绍

JavaScript 是一门动态弱类型语言，对变量的类型非常宽容，而且不会在变量和它们的调用者之间建立**结构化的契约**。如果长期在没有类型约束的环境下开发，会造成“类型思维”的缺失，养成不良的编程习惯。

TypeScript 的出现很好地解决了这个问题，它为 JavaScript 提供了良好的类型检查支持，而且能够编译成标准的 JavaScript。在可预见的未来，TypeScript 将成为前端开发者必须掌握的开发语言之一。

这门课程将从 TypeScript 的基础语法开始讲起，详细解读 TypeScript 的每个特性以及它与 JavaScript 的区别，并通过工程篇和实战篇的讲解，让你能够熟练使用 TypeScript 进行实战项目的开发。

TypeScript 是拥有类型系统的 JavaScript 的超级，**可以编译成纯 JavaScript**。

使用 TypeScript 的好处如下：

- 类型检查
- 语言扩展
- 用接口定义代替文档
- IDE 能够提高开发效率，降低维护成本
- 重塑“类型思维”

> TypeScript 官网在线测试平台（Playground）：<https://www.typescriptlang.org/play>。

## 3. 类型基础

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

## 4. 课程笔记

1. [构建开发环境](./webpack-env.md)
2. [TypeScript 基本类型](./ts-types.md)
3. [接口](./interface.md)
