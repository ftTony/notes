/**
 * 原型链方案存在的缺点：多个实例对引用类型的操作被篡改
 */

function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

SubType.prototype=new SuperType();

SubType.prototype.getSubValue=function(){
    return this.subproperty;
}

var instance=new SubType();
console.log(instance.getSuperValue());
