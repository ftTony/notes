/**
 * 组合继承，组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承
 * 
 * 缺点：
 *  第一次调用`SuperType()`：给`SubType.prototype`写入两个属性name，color。
 *  第二次调用`SuperType()`：给`instance1`写入两个属性name，color。
 */

function SuperType(name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

SuperType.prototype.sayName=function(){
    alert(this.name);
}

function SubTyper(name,age){
    SuperType.call(this,name);
    this.age=age;
}

SubType.prototype=new SuperType();

SubType.prototype.constructor=SubType;
SubType.prototype.sayAge=function(){
    console.log(this.age);
}

var instance1=new SubType('Nicholas',29);
instance1.colors.push('black');
console.log(instance1.colors);      //red,blue,green,black
instance1.sayName();      
instance1.sayAge();     //29

var instance2=new SubType('Greg',27);
console.log(instance2.colors);
instance2.sayAge();
instance2.sayAge();