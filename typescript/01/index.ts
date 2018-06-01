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

// 内置对象
let b: Boolean = new Boolean(1)
let e: Error = new Error('Error occurred')
let d: Date = new Date()
let r: RegExp = /[a-z]/
let body: HTMLElement = document.body
let allDiv: NodeList = document.querySelectorAll('div')

// 类型别名
type Name = string
type NameResolver = () => string
type NameOrResolver = Name | NameResolver
function getName(n: NameOrResolver): Name {
  if (typeof n === 'string') {
    return n
  } else {
    return n()
  }
}

// 字符串字面量类型
type EventNames = 'click' | 'scroll' | 'mousemove'
function handleEvent(ele: Element, event: EventNames) {}

// handleEvent(document.getElementById('hello'), 'scroll') // 没问题

// 元组
let ton: [string, number] = ['Tom', 25]
ton[0].slice(1)
ton[1].toFixed(2)

//枚举
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat
}

enum Color {
  Red,
  Green,
  Blue = 'blue'.length
}

// 类
class Animal {
  protected name: string
  public constructor(name: string) {
    this.name = name
  }
}

// let a = new Animal('Jack')
// console.log(a.name)
// a.name = 'Tom'

class Cat extends Animal {
  constructor(name: string) {
    super(name)
    console.log(this.name)
  }
}

abstract class Animal1 {
  public name: string
  public constructor(name: string) {
    this.name = name
  }
  public abstract sayHi(): void
}

class Cat1 extends Animal1 {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`)
  }
}

// 类与接口
interface Alarm {
  alert(): void
}

interface Light {
  lightOn(): void
  lightOff(): void
}

class Door {}

class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log('SecurityDoor alert')
  }
}

class Car implements Alarm, Light {
  alert() {
    console.log('Car alert')
  }
  lightOn() {
    console.log('Car light on')
  }
  lightOff() {
    console.log('Car light off')
  }
}

// 接口继承接口
interface LightableAlarm extends Alarm {
  lightOn(): void
  lightOff(): void
}

// 接口继承类
class Point {
  x: number = 0
  y: number = 0
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = { x: 1, y: 2, z: 3 }
