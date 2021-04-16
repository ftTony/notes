// 获取配置文件
const config = require('./minipack.config');
// 入口
const entry = config.entry;

const babelParser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

const {transformFromAst} = require('@babel/core');
const { output } = require('./minipack.config');


function createAsset(filename){
    const content = fs.readFile(entry,'utf-8');
    const ast = babelParser.parse(content,{
        sourceType:"module"
    });
    const dependencies = [];
    traverse(ast,{
        ImportDeclaration:({node})=>{
            dependencies.push(node.source.value)
        }
    });

    // 获取文件内容
    const {code} = transformFromAst(ast,null,{
        presets:['@babel/preset-env'],
    });
    // 返回结果
    return {
        dependencies,
        code
    }
}

/**
 * 从入口文件开始，获取整个依赖图
 * @param {*} entry 
 */
function createGraph(entry){
    const mainAssert = createAsset(entry);
    const queue = {
        [entry]:mainAssert
    }

    /**
     * 递归遍历，获取所有的依赖
     * @param {*} filename 
     * @param {*} assert 
     */
    function recursionDep(filename,assert){
        // 跟踪所有依赖文件
        assert.mapping = {};

        const dirname = path.dirname(filename);
        assert.dependencies.forEach(relativePath =>{
            // 获取绝对路径，以便于createAsset读取文件
            const absolutePath = path.join(dirname,relativePath);
            // 与当前assert关联
            assert.dependencies.forEach(relativePath=>{
                // 获取绝对路径，以便于crateAsset读取文件
                const absolutePath = path.join(dirname,relativePath);
            })
        })
    }
}


/**
 * 打包（使用依赖图，返回一个可以在浏览器运行的包）
 * 所以返回一个立即执行函数
 * @param {*} graph 
 */
function bundle(graph){
    let modules = '';
    for(let filename in graph){
        let mod = graph[filename];
        modules +=`'${filename}':[
            function(require,module,exports){
                ${mod.code}
            },
            ${JSON.stringify(mod.mapping)}
        ]`
    }

    const result = `()({${modules}})`;
    return result;
}

function writeFile(path,result){
    fs.writeFile(path,result,(err)=>{
        if(err) throw err;
        console.log('文件已被保存！');
    });
}

// 获取依赖图
const graph = createGraph(entry);

// 打包
const result = bundle(graph);
// 输出
fs.access(`${output.path}/${output.filename}`,(err)=>{
    if(!err){
        writeFile(`${output.path}/${output.filename}`,result);
    }else{
        fs.mkdir(output.path,{recursive:true},(err)=>{
            if(err) throw err;
            writeFile(`${output.path}/${output.filename}`,result);
        })
    }
});