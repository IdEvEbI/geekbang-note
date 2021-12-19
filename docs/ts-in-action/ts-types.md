# TypeScript 类型

## 1. ES6 和 TypeScript 类型对比

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了一些实用的数据类型方便开发中使用。

| ES 6 的数据类型 | TypeScript 的数据类型 |
| --------------- | --------------------- |
| Boolean         | Boolean               |
| Number          | Number                |
| String          | String                |
| Array           | Array                 |
| Function        | Function              |
| Object          | Object                |
| Symbol          | Symbol                |
| undefined       | undefined             |
| null            | null                  |
|                 | void                  |
|                 | any                   |
|                 | never                 |
|                 | 元组                  |
|                 | 枚举                  |
|                 | 高级类型              |

## 2. TypeScript 的基本类型

### 2.1 类型注解

1. 作用：在 TypeScript 使用可以使用**类型注解**的方式**定义变量**并**指定变量类型**；
2. 结果：一旦**指定了变量的类型**之后，再给变量赋值时，就必须**使用同类型的变量赋值**，否则会报错；
3. 语法：`(变量/函数): type`

### 2.2 基本类型

#### 2.2.1 原始类型

原始类型指的是：**布尔**、**数字**和**字符串**，一旦指定了变量的类型，就不允许用其他类型的变量赋值。

```ts
let bool: boolean = true
let num: number = 123
let str: string = 'hello'
```

> 提示：如果使用字面量给变量赋值，TypeScript 能够**自动推断**出变量类型。

```ts
let bool = true
let num = 123
let str = 'hello'
```

#### 2.2.2 数组

一旦指定了数组保存数据的数据类型，就不允许向数组中添加其他类型的数据。

```ts
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]
```

> 提示：如果要向数组中保存不同的数据类型的数据，可以使用**联合类型**。

```ts
let arr3: (number | string)[] = [1, 2, 'hello', 3]
```

> 提示：如果使用字面量给数组赋值，TypeScript 能够**自动推断**出变量类型。

```ts
let arr4 = [1, 2, 3]
let arr5 = [1, 2, 'hello']
```

#### 2.2.3 元组

**元组**是一种特殊类型的数组，限定了元组数据的**类型**和**个数**。

```ts
let tuple: [number, string] = [1, 'xiaoming']
```

> 提示：在 TypeScript 中允许**使用数组的方法操作元组**，并且不会报错，但实际开发中，**强烈不建议这样使用**。

```ts
tuple.shift()
tuple.push(2)
```

#### 2.2.4 函数

在定义函数时，返回值的类型通常可以**自动推断**，此种情况下不需要使用类型注解指定函数的返回类型。

```ts
const add = (x: number, y: number) => x + y
```

> 提示：在 TypeScript 中允许分别完成**函数的类型定义**和**实现**。

```ts
// 1> 定义函数类型 (x: number, y: number) => number 是函数的类型注解
let computer: (x: number, y: number) => number
// 2> 定义函数实现
computer = (a, b) => a + b
```

#### 2.2.5 对象

一旦指定了对象的键以及对应的数据类型，就不允许增加其他的键。

```ts
let obj1: { x: number, y: number } = { x: 1, y: 2 }
obj1.z = 3 // Error
```

> 提示：如果使用字面量给对象赋值，TypeScript 能够**自动推断**出变量类型。

```ts
let obj2 = { x: 1, y: 2 }
```

#### 2.2.6 Symbol

**`Symbol`** 具有唯一的值，在初始化时可以自动推断类型，不过类型不再是 `symbol`：

```ts
const s1: symbol = Symbol()
const s2 = Symbol() // 因为具有唯一的值，推断类型是 s2
console.log(s1 === s2) // false
```

#### 2.2.7 `undefined` && `null`

可以给变量声明成 `undefined` 或 `null` 类型，但是一旦声明，就不能再给该变量赋予其他类型的值。

```ts
let un1: undefined = undefined
let nu1: null = null
```

> 提示：在 TypeScript 中 `undefined` 和 `null` 是任何类型的子集，因此在定义变量时，如果赋值为 `undefined` 或 `null`，自动推断的结果是 `any`。

```ts
let un2 = undefined // undefined 是任何类型的子集，自动推断的结果是 any
let nu2 = null // undefined 是任何类型的子集，自动推断的结果是 any
```

#### 2.2.8 `void`

**`void`** 表示没有任何返回值的类型，常用于没有任何返回值的函数。

1. 在 JavaScript 中 `void` 是一个操作符，可以让任何一个表达式返回 `undefined`，例如 `void(0)`；
2. 注意：在 JavaScript 中 `undefined` 不是一个保留字，我们可以自定义一个 `undefined` 变量覆盖全局的 `undefined`：

```js
(function () {
   let undefined = 100
   console.log(undefined) // 100
})()
```

> 提示：在 TypeScript 中使用 `void` 可以确保返回的值一定是 `undefined`：

```ts
let noReturn = () => { }
```

#### 2.2.9 `any`

可以使用任意类型的数据给 `any` 类型的变量赋值，在 TypeScript 中，定义变量时如果不指定变量的类型，默认就是 `any` 类型。

```ts
let x

x = 1
x = []
x = () => { }
```

> 提示：在 TypeScript 中如果所有的类型都使用 `any` 那基本等同于用 JavaScript 开发了。所以，在开发中建议尽量避免使用 `any` 类型。

#### 2.2.10 `never`

**`never`** 表示永远不会有返回值的类型，有两种情况：

1. 函数总是抛出异常；
2. 无限循环的函数，例如事件循环。

```ts
let error = () => {
  throw new Error('error')
}

let endless = () => {
  while (true) { }
}
```

### 2.3 基本类型小结

1. **原始类型**、**数组**、**对象类型**的变量如果是使用字面量赋值，都能够自动推断，不需要使用类型注解；
2. **函数**的**形参定义**需要使用类型注解，返回值可以自动推断；
3. 在做函数定义时，如果没有返回值，需要使用到 **`void`**；
4. **元组**需要使用类型注解，因为元组需要**指定每个位置数据的类型**；
5. **`Symbol`** 不需要使用类型注解；
6. **`undefined`**、**`null`**、**`never`** 用在类型注解的场景较少。

## 3. 枚举类型

### 3.1 不使用枚举在开发中的常见问题

以下是一段根据数值判断用户角色的示例代码：

```js
function initByRole(role) {
  if (role === 1 || role === 2) {
    // do sth
  } else if (role === 3 || role == 4) {
    // do sth
  } else if (role === 5) {
    // do sth
  } else {
    // do sth
  }
}
```

这段代码存在以下问题：

- **可读性差**：很难记住数字的含义；
- **可维护差**：硬编码，牵一发动全身。

### 3.2 枚举的概念

**枚举**：一组有名字的**常量集合**，使用枚举类型可以为一组数值赋予更友好的名字，增强代码的可读性，避免在开发时使用魔法数字。

枚举类型包括**数字枚举**和**字符串枚举**两种类型。

#### 3.2.1 数字枚举

```ts
/** 角色枚举类型 */
enum Role {
  Reporter,
  Developer,
  Maintainer,
  Owner,
  Guest
}

console.log('报告者角色', Role.Reporter) // 0
```

- 默认情况下，枚举类型从 0 开始为元素编号；
- 在开发时，可以手动指定枚举类型中任意成员的数值，同时还可以通过枚举的**数值**索引得到对应的名称字符串，代码如下：

```ts
/** 角色枚举类型 */
enum Role {
  Reporter = 1,
  Developer = 2,
  Maintainer = 4,
  Owner = 8,
  Guest = 0
}

console.log(Role[2], typeof Role[2]) // Developer string
```

以上代码编译成 JavaScript 之后的代码如下：

```js
var Role;
(function (Role) {
    Role[Role["Reporter"] = 1] = "Reporter";
    Role[Role["Developer"] = 2] = "Developer";
    Role[Role["Maintainer"] = 4] = "Maintainer";
    Role[Role["Owner"] = 8] = "Owner";
    Role[Role["Guest"] = 0] = "Guest";
})(Role || (Role = {}));
```

> 提示：在枚举对象中，枚举**成员名称**被作为 `Key`，**值**被作为 `Value`，同时 `Value` 又被作为 `Key`，**成员名称**被作为 `Value`，这种方式叫做**反向映射**。

#### 3.2.2 字符串枚举

```ts
/** 请求消息 */
enum Message {
  Success = '恭喜，请求成功',
  Fail = '抱歉，请求失败'
}
```

字符串枚举被编译成 JavaScript 之后的代码如下：

```js
var Message;
(function (Message) {
    Message["Success"] = "\u606D\u559C\uFF0C\u8BF7\u6C42\u6210\u529F";
    Message["Fail"] = "\u62B1\u6B49\uFF0C\u8BF7\u6C42\u5931\u8D25";
})(Message || (Message = {}));
```

> 提示：在字符串枚举对象中，只有成员的名称被作为了 `Key`，因此字符串枚举不支持**反向映射**。

#### 3.2.3 常量枚举

用 `const` 声明的枚举就是一个**常量枚举**，常量枚举**在编译阶段会被移除** —— 只有值会被保留，而枚举的名称不会被保留。

```ts
const enum WeekDay {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday
}
console.log(WeekDay.Monday) // 1
// console.log(WeekDay) // Error
```

> 提示：当我们不需要对象，而**只需要对象值的时候**，可以使用常量枚举，这样可以简化编译后的代码。

如下代码：

```ts
const weekDay = [
  WeekDay.Sunday,
  WeekDay.Monday,
  WeekDay.Thursday,
  WeekDay.Wednesday,
  WeekDay.Thursday,
  WeekDay.Friday,
  WeekDay.Saturday
]
```

在编译后会被翻译成：

```js
const weekDay = [
    0 /* Sunday */,
    1 /* Monday */,
    4 /* Thursday */,
    3 /* Wednesday */,
    4 /* Thursday */,
    5 /* Friday */,
    6 /* Saturday */
];
```
