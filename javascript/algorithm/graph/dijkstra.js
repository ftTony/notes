/**
 * 最短路径
 */
const INF = Number.MAX_SAFE_INTEGER
const minDistance = (dist, visited) => {
    let min = INF
    let minIndex = -1
    for (let v = 0; v < dist.length; v++) {
        if (visited[v] === false && dist[v] <= min) {
            min = dist[v]
            minIndex = v
        }
    }
    return minIndex
}

const dijkstra = (graph, src) => {
    const dist = [];
    const visited = [];
    const {
        length
    } = graph
    for (let i = 0; i < length; i++) {
        dist[i] = INF
        visited[i] = false
    }
    dist[src] = 0
}