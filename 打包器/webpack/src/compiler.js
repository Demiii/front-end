const fs = require('fs');
const path = require('path');
const options = require('../demo/webpack.config');
const parse = require('@babel/parser').parse;
const traverse = require('@babel/traverse').default;
const createAsset = require('./css-loader.js').createAsset;

const {entry, output} = options
const entry_abs = path.join(__dirname, '../demo/', entry)
const output_abs = output.path + output.filename

let modules = {}


function fileToModule(path) { // 文件转模块，就是将文件内容外加上一个function的壳子，以此来实现环境隔离
    let fileContent = fs.readFileSync(path, 'utf-8')
    let module = {} 
    module.id = path
    fileContent = createAsset(path, fileContent)
    module.code = `function(require, exports) {
        ${fileContent}
    }`
    module.dependencies = getDependencies(fileContent, path)
    return module
}

function getDependencies(fileContent, filePath) { // 获取该模块下的所有依赖
    let dir = path.dirname(filePath)
    let reg = /require\(['"](.+?)['"]\)/g;
    let dependentStr = fileContent.matchAll(reg)
    let dependencies = []
    // 借助babel找出依赖模块
    // const ast = parse(fileContent, {sourceType: 'CommonJs'});
    // traverse(ast, {
    //     enter: (item) => {
    //         if(item.node.type === "CallExpression" && item.node.callee.name === "require"){
    //             let dependentPath = path.join(dir, item.node.arguments[0].value)
    //             dependencies.push(dependentPath)
    //         }
    //     }
    // })
    for(let item of dependentStr) {
        let dependentPath = path.join(dir, item[1])
        dependencies.push(dependentPath)
    }
    return dependencies
}

function createGraph(path) { // 将所有模块保存起来
    let module = fileToModule(path)
    modules[module.id] = module.code
    module.dependencies.forEach(dependent => {
        if(modules[dependent] === void(0)) {
           createGraph(dependent)
        }
    });
}

function exec(moduleId) { // 为每个模块注入require 和 exports
    const fn = modules[moduleId]
    let exports = {}
    const require = function(filepath) {
        const dir = path.dirname(moduleId)
        const filepath_abs = path.join(dir, filepath)
        return exec(filepath_abs)
    }
    fn(require, exports)
    return exports
}

function createBundle() {  // 生成最终的bundle文件，写入出口路径文件
    createGraph(entry_abs)
    // console.log('modules:', modules)
    let modulesStr = ''
    for(let module in modules) {
        modulesStr += `"${module}": ${modules[module]},`
    }
    const reslut = `
    import path from "path";
     (function(){
        const modules = {${modulesStr}};
        const exec = function(moduleId) {
            const fn = modules[moduleId]
            let exports = {}
            const require = function(filepath) {
                const dir = path.dirname(moduleId)
                const filepath_abs = path.join(dir, filepath)
                return exec(filepath_abs)
            }
            fn(require, exports)
            return exports
        };
        exec("${entry_abs}")
     })()
    `
    // console.log(reslut)
    let writeStream = fs.WriteStream(output_abs, {encoding:'utf8'})
    writeStream.write(reslut)
}

// function enter(entry_abs) {
//     createGraph(entry_abs)
//     exec(entry_abs)
//     // console.log('modules:', modules)
// }

createBundle()


