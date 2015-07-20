/**
 * 广度遍历
 */

import Queue from '../../data-structures/queue-es6'

const Colors = {
    WHITE: 0,
    GREY: 1,
    BLACK: 2
}

const inittializeColor = vertices => {
    const color = {};
    for (let i = 0; i < vertices.length; i++) {
        color[vertices[i]] = Colors.WHITE
    }
    return color
}

const breadthFristSearch = (graph, startVertex, callback) => {
    const vertices = graph.getVertices()
    const adjList = graph.getAdjList()
    const color = inittializeColor(vertices)
    const queue = new Queue()

    queue.enqueue(startVertex)

    while (!queue.isEmpty()) {
        const u = queue.dequeue();
        const neighbors = adjList.get(u);
        color[u] = Colors.GREY
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i];
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
        if (callback) {
            callback(u)
        }
    }
}

const BFS = (graph, startVertex) => {
    const vertices = graph.getVertices();
    const adjList = graph.getAdjList();
    const color = inittializeColor(vertices);
    const queue = new Queue()
    const distances = {}
    const predecessors = {}
    queue.enqueue(startVertex)
    for (let i = 0; i < vertices.length; i++) {
        distances[vertices[i]] = 0
        predecessors[vertices[i]] = null
    }
    while (!queue.isEmpty()) {
        const u = queue.dequeue()
        const neighbors = adjList.get(u)
        color[u] = Colors.GREY
        for (let i = 0; i < neighbors.length; i++) {
            const w = neighbors[i]
            if (color[w] === Colors.WHITE) {
                color[w] = Colors.GREY
                distances[w] = distances[u] + 1
                predecessors[w] = u
                queue.enqueue(w)
            }
        }
        color[u] = Colors.BLACK
    }
    return {
        distances,
        predecessors
    }
}