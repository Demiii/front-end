var fs = require('fs')
var path = require('path')
var readLine = require("readline");
var ts = require('typescript')
const parse = require('@babel/parser').parse;




let visiablePlatformPath = './packages/visiable-platform/'


function getFilesPath(){
    let basePath = visiablePlatformPath+'src/pages/playground/components/'
    let files = fs.readdirSync(basePath)
    let dirIndexPath = []
    files.forEach(file=>{
        let path = basePath+file
        let stat = fs.statSync(path)
        stat.isDirectory() && dirIndexPath.push(path+'/index.tsx') 
    })
    // console.log(dirIndexPath)
}

getFilesPath()


let testpath = './packages/visiable-platform/src/pages/playground/components/LinkButton/index.tsx'
// fs.readFile(testpath, function(error, data){
//     console.log(data.toString())
// })
let fileContent = fs.readFileSync(testpath, 'utf-8')
// let reg = new RegExp('createVoidFieldSchem\(.*')
let reg = /createVoidFieldSchema\({([\s\S]*)}\)/


// console.log('fileContent', reg.exec(fileContent)[0])

// const js = ts.transpileModule(fileContent, {
//     compilerOptions: {},
//   }).outputText

// const ast = parse(js, {sourceType: 'module'});
// console.log(ast)


// 创建ast根结点
const rootNode = ts.createSourceFile(
    `input.ts`,
    fileContent,
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  )

//   console.log('rootNode', rootNode)
let index= 0
const traverse = (node) => {
    let text = node.getText()
    if(text.includes('createVoidFieldSchema')) {
        index ++;
        // if(index == 14) {
        //     // ts.expression(node)

        //     console.log(node.expression.escapedText === 'createVoidFieldSchema')
        //     return 
        // }
        if(node.expression.escapedText === 'createVoidFieldSchema') {
            console.log(999999999)
        }
        
    }
    // if(node.expression)
    // console.log(node)
    // 递归遍历每个节点
    ts.forEachChild(node, node => traverse(node))
  }

  traverse(rootNode)

//   console.log(index)
