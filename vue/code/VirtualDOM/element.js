/**
 * 参考 https://github.com/livoras/simple-virtual-dom
 * Element virdual-dom对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Arrray<Element|String>} - 子节点
 */

var _ = require('./util')

function Element(tagName, props, children) {
    this.tagName = tagName
    this.props = props
    this.children = children

}

Element.prototype.render = function () {
    var el = document.createElement(this.tagName)
    var props = this.props

    for (var propName in props) {

    }
}

module.exports = Element