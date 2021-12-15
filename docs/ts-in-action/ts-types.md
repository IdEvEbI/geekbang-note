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

1. **原始类型**：一旦指定类型，就不允许用其他类型的变量赋值。

   ```ts
   let bool: boolean = true
   let num: number = 123
   let str: string = 'hello'
   ```

2. **数组**：一旦指定保存数据的数据类型，就不允许向数组中添加其他类型的数据。

   ```ts
   let arr1: number[] = [1, 2, 3]
   let arr2: Array<number> = [1, 2, 3]
   ```

   > 提示： 如果要向数组中保存不同的数据类型的数据，可以使用**联合类型**。

   ```ts
   let arr3: (number | string)[] = [1, 2, 'hello', 3]
   ```

3. **元组**：是一种特殊类型的数组，限定了元组数据的类型和个数。

   ```ts
   let tuple: [number, string] = [1, 'xiaoming']
   ```

   > 提示：在 TypeScript 中允许**使用数组的方法操作元组**，并且不会报错，但实际开发中，**强烈不建议这样使用**。

   ```ts
   tuple.shift()
   tuple.push(2)
   ```

4. **函数**：在定义函数时，返回值的类型通常可以**自动推断**，此种情况下不需要使用类型注解指定函数的返回类型。

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
