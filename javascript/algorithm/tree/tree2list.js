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


// 树转表  方法一
// const TreeToTable = (treeData)=>{
//     let result = [];
//     treeData.forEach(node=>getItemsFromNode(node))

//     function getItemsFromNode(node){
//        let {children,...copy} = node;
//        result.push(copy);
//        if(children && children.length>0){
//            children.forEach(child=>getItemsFromNode(child));
//        }
//     }
//     return result;
// }



// 方法二
// function tree2table (tree = []) {
//     return  tree.reduce((accumulator,{children,...props})=>[...accumulator,props,...tree2table(children)],[]);
// }

// 方法三
function tree2table(tree=[],table=[]){
    tree.forEach(({children,...props})=>{
        table.push(props);
        children && children.length>0 && tree2table(children,table);
    })
    return table;
}

console.log(tree2table(treeData));