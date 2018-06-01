var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
function reverse(x) {
    if (typeof x === 'number') {
        return Number(x
            .toString()
            .split('')
            .reverse()
            .join(''));
    }
    else if (typeof x === 'string') {
        return x
            .split('')
            .reverse()
            .join('');
    }
    else {
        return '';
    }
}
// 类型断言
function getLength(something) {
    if (something.length) {
        return something.length;
    }
    else {
        return something.toString().length;
    }
}
// 内置对象
var b = new Boolean(1);
var e = new Error('Error occurred');
var d = new Date();
var r = /[a-z]/;
var body = document.body;
var allDiv = document.querySelectorAll('div');
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
function handleEvent(ele, event) { }
// handleEvent(document.getElementById('hello'), 'scroll') // 没问题
// 元组
var ton = ['Tom', 25];
ton[0].slice(1);
ton[1].toFixed(2);
//枚举
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 'blue'.length] = "Blue";
})(Color || (Color = {}));
// 类
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    return Animal;
}());
// let a = new Animal('Jack')
// console.log(a.name)
// a.name = 'Tom'
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    return Cat;
}(Animal));
var Animal1 = /** @class */ (function () {
    function Animal1(name) {
        this.name = name;
    }
    return Animal1;
}());
var Cat1 = /** @class */ (function (_super) {
    __extends(Cat1, _super);
    function Cat1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat1.prototype.sayHi = function () {
        console.log("Meow, My name is " + this.name);
    };
    return Cat1;
}(Animal1));
var Door = /** @class */ (function () {
    function Door() {
    }
    return Door;
}());
var SecurityDoor = /** @class */ (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('SecurityDoor alert');
    };
    return SecurityDoor;
}(Door));
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.alert = function () {
        console.log('Car alert');
    };
    Car.prototype.lightOn = function () {
        console.log('Car light on');
    };
    Car.prototype.lightOff = function () {
        console.log('Car light off');
    };
    return Car;
}());
// 接口继承类
var Point = /** @class */ (function () {
    function Point() {
        this.x = 0;
        this.y = 0;
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
