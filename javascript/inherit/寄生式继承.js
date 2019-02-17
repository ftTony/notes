/**
 * 寄生式继承：在原型式继承的基础上，增加对象，返回构造函数
 * 
 * 缺点：
 * 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
* 无法传递参数
 */

function object(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}


 function createAnother(original){
     var clone=object(original);
     clone.sayHi=function(){
         console.log('hi');
     };
     return clone;
 }

var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"