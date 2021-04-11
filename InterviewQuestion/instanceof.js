/**
 * instanceof可以判断一个实例是否是其父类型或者祖先类型的实例
 * 
 * instanceof主要的实现原理就是只要右边变量的prototype在左边变量的原型链上即可。因此，instanceof在查找的过程中会遍历左边变量的原型链，直到找到右边变量的prototype，如果查找失败，则会返回false，告诉我们左边变量并非是右边变量的实例。
 * 
 * 参考资料https://juejin.im/post/5b0b9b9051882515773ae714
 */
function new_instance_of(leftValue,rightValue){
    let rightValue=rightValue.prototype;
    leftValue=leftValue.__proto__;
    while(true){
        if(leftValue===null){
            return false;
        }
        if(leftValue===rightProto){
            return true;
        }
        leftValue=leftValue.__proto__
    }
}