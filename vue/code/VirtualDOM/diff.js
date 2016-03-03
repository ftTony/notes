var _ = require("./util")
var patch = require("./patch")
var listDiff = require('list-diff2')

function diff(oldTree, newTree) {
    var index = 0
    var patches = {}
    dfsWalk(oldTree, newTree, index, patches)
    return patches
}

function dfsWalk(oldNode, newNode, index, patches) {
    var currentPatch = []

    if (newNode === null) {

    } else if (_.isString(oldNode) && _.isString(newNode)) {

    } else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key) {

    } else {

    }

    if (currentPatch.length) {
        patches[index] = currentPatch
    }
}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {

}

function diffProps(oldNode, newNode) {
    var count = 0
    var oldProps = oldNode.props
    var newProps = newNode.props

    var key, value
    var propsPatches = {}

    for (key in oldProps) {
        value = oldProps[key]

    }

    for (key in newProps) {

    }
}

function isIgnoreChildren(node) {
    return (node.props && node.props.hasOwnProperty('ignore'))
}

module.exports = diff