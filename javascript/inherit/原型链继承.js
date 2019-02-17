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
    
}