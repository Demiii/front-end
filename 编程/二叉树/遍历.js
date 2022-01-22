const {A} = require('./index')

function firstVisit(node) {
    if(!node) return
    console.log(node.name)
    firstVisit(node.left)
    firstVisit(node.right)
}

function middleVisit(node) {
    if(!node) return
    middleVisit(node.left)
    console.log(node.name)
    middleVisit(node.right)
}

function endVisit(node) {
    if(!node) return
    endVisit(node.left)
    endVisit(node.right)
    console.log(node.name)
}

// 先序
// firstVisit(A)
// 中序
// middleVisit(A)
// 后序
endVisit(A)