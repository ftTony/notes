// 获取配置文件
const config = require('./minipack.config');
// 入口
const entry = config.entry;
const content = fs.readFile(entry,'utf-8');

const babelParser = require('@babel/parser');
const ast = babelParser.parse(content,{
    sourceType:"module"
});

const {transformFromAst} = require('@babel/core');
const {code} = transformFromAst(ast,null,{
    presets:['@babel/preset-env'],
})