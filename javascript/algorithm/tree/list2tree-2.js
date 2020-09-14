// 树形结构数据示例
let treeData = [
    {
        id: '1', pid: null, label: '1',
        children: [
            {
                id: '1-1', pid: '1', label: '1-1',
                children: [
                    {
                        id: '1-1-1', pid: '1-1', label: '1-1-1',
                    }
                ]
            },
            {
                id: '1-2', pid: '1', label: '1-2'
            }
        ]
    },
    {
        id: '2', pid: null, label: '2',
        children: [
            {
                id: '2-1', pid: '2', label: '2-1'
            },
            {
                id: '2-2', pid: '2', label: '2-2'
            }
        ]
    }
]

// 表型结构数据示例
let tableData = [
    {id: '1', pid: null, label: '1'},
    {id: '1-1', pid: '1', label: '1-1'},
    {id: '1-1-1', pid: '1-1', label: '1-1-1'},
    {id: '1-2', pid: '1', label: '1-2'},
    {id: '2', pid: null, label: '2'},
    {id: '2-1', pid: '2', label: '2-1'},
    {id: '2-2', pid: '2', label: '2-2'}
]

// 表转树
const TableToTree = (tableData)=>{
    // ...
    return treeData
}