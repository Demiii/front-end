const {A} = require('./index')

// 打印每个节点所在层数（前序）
function getNodeDep(node, dep) {
    if(!node) return
    console.log(`${node.name}在第${dep}层`)
    getNodeDep(node.left, dep+1)
    getNodeDep(node.right, dep+1)
}
// getNodeDep(A, 1)

// 每个节点左右子树各有多少个节点（后序）
function getChildNum(node){
    if(!node) return 0
    let leftNum = getChildNum(node.left);
    let rightNum = getChildNum(node.right);
    console.log(`${node.name}左子树有${leftNum}个节点`)
    console.log(`${node.name}右子树有${rightNum}个节点`)
    return leftNum+rightNum+1
}
// getChildNum(A)

let maxDepSum = 0
function getDepSum(node) {
    if(!node) return 0
    getMaxDep(node)
    return Math.max(leftDep, rightDep)+1
}

function getMaxDep(node) {
    if(!node) return 0
    let depSum = 0
    let leftDep = getMaxDep(node.left)
    let rightDep = getMaxDep(node.right)
    depSum = leftDep+rightDep
    maxDepSum = Math.max(maxDepSum, depSum)
    return Math.max(leftDep, rightDep)+1
}
getMaxDep(A)
console.log('最深和为', maxDepSum)
