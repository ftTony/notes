/**
 * 参考 https://github.com/livoras/simple-virtual-dom
 * Element virdual-dom对象定义
 * @param {String} tagName - dom 元素名称
 * @param {Object} props - dom 属性
 * @param {Arrray<Element|String>} - 子节点
 */

var _ = require('./util')

function Element(tagName, props, children) {
    if (!(this instanceof Element)) {
        if (!_.isArray(children) && children != null) {
            children = _.slice(arguments, props, children)
        }
        return new Element(tagName, props, children)
    }

    if (_.isArray(props)) {
        children = props
        props = {}
    }

    this.tagName = tagName
    this.props = props || {}
    this.children = children || []

}

Element.prototype.render = function () {
    var el = document.createElement(this.tagName)
    var props = this.props

    for (var propName in props) {
        var propValue = props[propName]
        _.setAttr(el, propName, propValue)
    }

    _.each(this.children, function (child) {
        var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
        el.appendChild(childEl)
    })
    return el
}

module.exports = Element