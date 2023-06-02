const {A} = require('./index')

// 递归
function fristVisit1(node){
    if(node) {
        console.log(node.name)
        fristVisit(node?.left)
        fristVisit(node?.right)
    }
    return
}

//  非递归

function fristVisit2(node){
    let stack = []
    let curNode = node
    while(stack.length>0 || curNode) {
        while(curNode) {
            console.log(curNode.name)
            stack.push(curNode)
            curNode = curNode.left
        }
        curNode = stack.pop()
        curNode = curNode.right
    }
}

fristVisit2(A)
