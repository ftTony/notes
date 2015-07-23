// 最小生成树
const INF = Number.MAX_SAFE_INTEGER;
const find = (i, parent) => {
    while (parent[i]) {
        i = parent[i]
    }
    return i
}
const union = (i, j, parent) => {

}
const initializeCost = graph => {

}
const kruskal = graph => {
    const {
        length
    } = graph
    const parent = []
    let ne = 0
    let a;
    let b;
    let u;
    let v;
    const cost = initializeColor(graph)
}