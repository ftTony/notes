/**
 * 使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类
 * 
 * 缺点：
 * 
 * 只能继承父类的实例属性和方法，不能继承原型属性/方法
 * 无法实现复用，每个子类都有父类实例函数的副本，影响性能
 */
function SuperType() {
    this.color = ['red', 'green', 'blue'];
}

function SubType(){
    SuperType.call(this);
}

var instance1=new SubType();
instance1.color.push('black');

var instance2=new SubType();
alert(instance2.color);


