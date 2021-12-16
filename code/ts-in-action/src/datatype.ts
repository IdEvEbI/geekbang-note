// 1. 原始类型
// let bool: boolean = true
// let num: number = 123
// let str: string = 'hello'
// 如果使用字面量给变量赋值，TypeScript 能够自动推断出变量类型。
let bool = true
let num = 123
let str = 'hello'

// 2. 数组
let arr1: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]

// 使用联合类型定义数组，允许数组保存多种数据类型的数据
let arr3: (number | string)[] = [1, 2, 'hello', 3]
console.log(arr3)

// 如果使用字面量给数组赋值，TypeScript 能够自动推断出变量类型。
let arr4 = [1, 2, 3]
let arr5 = [1, 2, 'hello']

// 3. 元组
let tuple: [number, string] = [1, 'xiaoming']
console.log(tuple)

// 在 TypeScript 中允许使用数组的方法操作元组，强烈不推荐
tuple.shift()
console.log(tuple)
tuple.push(2)
console.log(tuple)

// 4. 函数
const add = (x: number, y: number) => x + y
console.log(add)

// 在 TypeScript 中允许分别完成函数的类型定义和实现。
// 1> 定义函数类型 (x: number, y: number) => number 是函数的类型注解
let computer: (x: number, y: number) => number
// 2> 定义函数实现
computer = (a, b) => a + b

// 5. 对象
let obj1: { x: number, y: number } = { x: 1, y: 2 }

// 如果使用字面量给对象赋值，TypeScript 能够自动推断出变量类型。
let obj2 = { x: 1, y: 2 }

// 6. Symbol
const s1: symbol = Symbol()
const s2 = Symbol()
console.log(s1 === s2)

// 7. undifined & null
let un1: undefined = undefined
let un2 = undefined // undefined 是任何类型的子集，自动推断的结果是 any
let nu1: null = null
let nu2 = null // undefined 是任何类型的子集，自动推断的结果是 any

// 8. void
let noReturn = () => { }

// 9. any
let x
x = 1
x = []
x = () => { }

// 10. never
let error = () => {
  throw new Error('error')
}

let endless = () => {
  while (true) { }
}