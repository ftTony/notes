function sayHello(person: string) {
  return 'Hello, ' + person
}

let user = 'tony'
console.log(sayHello(user))

let isDone: boolean = false

let createdByNewBoolean: Boolean = new Boolean(1)

let decLiteral: number = 6

let myName: string = 'Tom'
let myAge: number = 25

// 模板字符串

let sentence: string = `Hello,my name is ${myName},I'll be ${myAge +
  1} years old next month.`

function alertName(): void {
  console.log('My name is tony')
}

let unusabel: void = undefined

let myFavoriteNumber: any = 'seven'

myFavoriteNumber = 7

let anyThing: any = 'Tom'
anyThing.setName('Jerry')
anyThing.setName('Jerry').sayHello()
anyThing.myName.setFirstName('Cat')

let myNumber: string | number
myNumber = 'seven'
myNumber = 7

function getString(something: string | number): string {
  return something.toString()
}

interface Person {
  readonly id: number
  name: string
  age: number
  [propName: string]: any
}

let tom: Person = {
  id: 89757,
  name: 'Tom',
  age: 25,
  gender: 'male'
}

let fibonacci: number[] = [1, 1, 2, 3, 5]

interface NumberArray {
  [index: number]: number
}

let nacci: NumberArray = [1, 1, 2, 3, 5]

// 函数声明
function sum(x: number, y: number): number {
  return x + y
}

// 函数表达式
let mySum: (x: number, y: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}

// 用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean
}
let mySearch: SearchFunc
mySearch = function(source: string, subString: string) {
  return source.search(subString) !== -1
}

// 参数默认值
function buildName(firstName: string, lastName: string = 'Cat') {
  return firstName + ' ' + lastName
}
let tomcat = buildName('Tom', 'Cat')
let tony = buildName('Tony')

function push(array: any[], ...items: any[]) {
  items.forEach(function(item) {
    array.push(item)
  })
}

let ab: any[] = []
push(ab, 1, 2, 3)

// 重载

function reverse(x: number): number
function reverse(x: string): string
function reverse(x: number | string): number | string {
  if (typeof x === 'number') {
    return Number(
      x
        .toString()
        .split('')
        .reverse()
        .join('')
    )
  } else if (typeof x === 'string') {
    return x
      .split('')
      .reverse()
      .join('')
  } else {
    return ''
  }
}

// 类型断言

function getLength(something: string | number): number {
  if ((<string>something).length) {
    return (<string>something).length
  } else {
    return something.toString().length
  }
}
