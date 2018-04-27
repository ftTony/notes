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
