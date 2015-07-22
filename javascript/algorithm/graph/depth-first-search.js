/**
 * 深度遍历
 */
const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}

const initializeColor = vertices => {
    const color = {}
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }
    return color
}

const depthFirstSearchVisit = (u, color, adjList, callback) => {
    color[u] = Colors.GREY
    if (callback) {
        callback(u)
    }
    const neighbors = adjList.get(u)
}

const depthFirstSearch = (gragh, callback) => {

};

const DFSVisit = (v, color, d, f, p, time, adjList) => {

};

const DFS = gragh => {
    const vertices = gragh.getVertices()
    const adjList = gragh.getAdjList()
    const color = initializeColor(vertices)
    const d = {}
    const f = {}
    const p = {}
    const time = {
        count: 0
    }
    for (let i = 0; i < vertices.length; i++) {

    }
}