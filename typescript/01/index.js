function sayHello(person) {
    return 'Hello, ' + person;
}
var user = 'tony';
console.log(sayHello(user));
var isDone = false;
var createdByNewBoolean = new Boolean(1);
var decLiteral = 6;
var myName = 'Tom';
var myAge = 25;
// 模板字符串
var sentence = "Hello,my name is " + myName + ",I'll be " + (myAge +
    1) + " years old next month.";
function alertName() {
    console.log('My name is tony');
}
var unusabel = undefined;
var myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
var anyThing = 'Tom';
anyThing.setName('Jerry');
anyThing.setName('Jerry').sayHello();
anyThing.myName.setFirstName('Cat');
var myNumber;
myNumber = 'seven';
myNumber = 7;
function getString(something) {
    return something.toString();
}
var tom = {
    id: 89757,
    name: 'Tom',
    age: 25,
    gender: 'male'
};
var fibonacci = [1, 1, 2, 3, 5];
var nacci = [1, 1, 2, 3, 5];
// 函数声明
function sum(x, y) {
    return x + y;
}
// 函数表达式
var mySum = function (x, y) {
    return x + y;
};
var mySearch;
mySearch = function (source, subString) {
    return source.search(subString) !== -1;
};
// 参数默认值
function buildName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'Cat'; }
    return firstName + ' ' + lastName;
}
var tomcat = buildName('Tom', 'Cat');
var tony = buildName('Tony');
function push(array) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        array.push(item);
    });
}
var ab = [];
push(ab, 1, 2, 3);
// 重载
// function reverse(x: number): number
// function reverse(x: string): string
// function reverse(x: number | string): number | string {
//   if (typeof x === 'number') {
//     return Number(
//       x
//         .toString()
//         .split('')
//         .reverse()
//         .join('')
//     )
//   } else if (typeof x === 'string') {
//     return x
//       .split('')
//       .reverse()
//       .join('')
//   }
// }
// 类型断言
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
