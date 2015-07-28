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
    for (let i = 0; i < neighbors.length; i++) {
        depthFirstSearchVisit(w, color, adjList, callback)
    }
    color[u] = Color.BLACK
}

const depthFirstSearch = (gragh, callback) => {
    const vertices = gragh.getVertices()
    const adjList = gragh.getAdjList()
    const color = initializeColor(vertices)

    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            depthFirstSearchVisit(vertices[i], color, adjList, callback)
        }
    }
};

const DFSVisit = (v, color, d, f, p, time, adjList) => {
    color[u] = Colors.GREY
    d[u] = ++time.count
    const neighbors = adjList.get(u)
    for (let i = 0; i < neighbors.length; i++) {
        const w = neighbors[i]
        if (color[w] === Colors.WHITE) {
            p[w] = u
            DFSVisit(w, color, d, f, p, time, adjList)
        }
    }
    color[u] = Colors.BLACK
    f[u] = ++time.count
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
        f[vertices[i]] = 0
        d[vertices[i]] = 0
        p[vertices[i]] = null

    }
    for (let i = 0; i < vertices.length; i++) {
        if (color[vertices[i]] === Colors.WHITE) {
            DFSVisit(vertices[i], color, d, f, p, time, adjList);
        }
    }
    return {
        discovery: d,
        finished: f,
        predecessors: p
    }
}