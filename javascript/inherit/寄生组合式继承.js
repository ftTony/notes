/**
 * 寄生组合式继承:结合借用构造函数传递参数和寄生模式实现继承
 */
function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); //创建对象，创建父类原型的一个副本
    prototype.constructor = subType; //增强对象，弥补因重写原型而失去的默认的constructor 属性
    subType.prototype = prototype; // 指定对象，将新创建的对象赋值给子类的原型
}

function SuperType(name) {
    this.name=name;
    this.colors=['red','blue','green'];
}
SubType.prototype.sayName=function(){
    console.log(this.name);
}

// 借用构造函数传递增强子类实例属性
function SubType(name, age) {
    SuperType.call(this,name);
    this.age=age;
}

inheritPrototype(SubType, SubType);

// 新增子类原型属性
SubType.prototype.sayAge=function(){
    console.log(this.age);
}

var instance1=new SubType('xyc',23);
var instance2=new SubType('tony',23);

instance1.colors.push('2');
instance1.colors.push('3');