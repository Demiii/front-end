const {A} = require('./index')
let dep = 0
let max = 0
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

getMaxDep(A)
console.log('max', max)