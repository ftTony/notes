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

}

function diffChildren(oldChildren, newChildren, index, patches, currentPatch) {

}

function diffProps(oldNode, newNode) {

}

function isIgnoreChildren(node) {
    return (node.props && node.props.hasOwnProperty('ignore'))
}

module.exports = diff