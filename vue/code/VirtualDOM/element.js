/**
 * Element virdual-dom对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Arrray<Element|String>} - 子节点
 */

function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children
    
}

Element.prototype.render = function () {

}