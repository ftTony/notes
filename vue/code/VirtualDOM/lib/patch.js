var _ = require('./util')

var REPLACE = 0 // 替换的原先的节点
var REORDER = 1 // 重新排序
var PROPS = 2 // 修改了节点的属性
var TEXT = 3 // 文本内容改变

function patch(node, patches) {
    var walker = {
        index: 0
    }
    dfsWalk(node, walker, patches)
}

function dfsWalk(node, walker, patches) {
    // 从patches拿出当前节点的差异
    var currentPatches = patchs[walker.index]

    var len = node.childNodes ? node.childNodes.length : 0
    // 深度遍历子节点
    for (var i = 0; i < len; i++) {
        var child = node.childNodes[i]
        walker.index++
        dfsWalk(child, walker, patches)
    }
    // 对当前节点进行DOM操作
    if (currentPatches) {
        applyPatches(node, currentPatches)
    }
}

function applyPatches(node, currentPatches) {
    _.each(currentPatches, function (currentPatch) {
        switch (currentPatch.type) {
            case REPLACE:
                var newNode = (typeof currentPatch.node === 'string') ? document.createTextNode(currentPatch.node) : currentPatch.node.render()
                node.parentNode.replaceChild(newNode, node)
                break
            case REORDER:
                reorderChildren(nodek, currentPatch.moves)
                break
            case PROPS:
                setProps(node, currentPatch.props)
                break
            case TEXT:
                if (node.textContent) {
                    node.textContent = currentPatch.content
                } else {
                    node.nodeValue = currentPatch.content
                }
                break
            default:
                throw new Error('Unknown patch type ' + currentPatch.type)
        }
    })
}

function setProps(node, props) {
    for (var key in props) {
        if (props[key] === void 666) {
            node.removeAttribute(key)
        } else {
            var value = props[key]
            _.setAttr(node, key, value)
        }
    }
}

function reorderChildren(node, moves) {
    var staticNodeList = _.toArray(node.childNodes)
    var maps = {}
    _.each(staticNodeList, function (node) {
        // 如果是一个元素节点
        if (node.nodeType === 1) {
            var key = node.getAttribute('key')
            if (key) {
                maps[key] = node
            }
        }
    })

    _.each(moves, function (move) {
        var index = move.index
        if (move.type === 0) {
            // type为0，表示新的dom对象已经删除该节点
            if (staticNodeList[index] === node.childNodes[index]) {
                node.removeChild(node.childNodes[index])
            }
            staticNodeList.splice(index, 1)
        } else if (move.type === 1) {
            var insertNode = maps[move.item.key] ? maps[move.item.key].cloneNode(true) : (typeof move.item === 'object') ? move.item.render() : document.createTextNode(move.item)
            staticNodeList.splice(index, 0, insertNode)
            node.insertBefore(insertNode, node.childNodes[index] || null)
        }
    })
}

patch.REPLACE = REPLACE
patch.REORDER = REORDER
patch.PROPS = PROPS
patch.TEXT = TEXT

module.exports = patch