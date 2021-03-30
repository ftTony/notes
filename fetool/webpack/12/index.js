// 获取配置文件
const config = require('./minipack.config');
// 入口
const entry = config.entry;

const babelParser = require('@babel/parser');

const traverse = require('@babel/traverse').default;

const {transformFromAst} = require('@babel/core');


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

