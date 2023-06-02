const {A} = require('./index')
let dep = 0
let max = 0
// 二叉树遍历法
function getMaxDep(node){
    if(!node) {
        max = Math.max(dep, max)
        return
    }
    dep++;
    console.log(node?.name, dep)
    getMaxDep(node.left);
    getMaxDep(node.right);
    dep--;
}

// getMaxDep(A)
// 递归
function getMaxDep(node) {
    if(!node) return 0
    return Math.max(getMaxDep(node.left), getMaxDep(node.right))+1
}


max = getMaxDep(A)

console.log('max', max)