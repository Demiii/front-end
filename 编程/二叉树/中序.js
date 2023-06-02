const {A} = require('./index')

//  递归
// function middleVisit(node) {
//     if(!node) return
//     middleVisit(node?.left)
//     console.log(node?.name)
//     middleVisit(node?.right)
// }

// 非递归
function middleVisit(node) {
   let stack = []
   let cur = node
   while(stack.length || cur) {
    if(cur){
        stack.push(cur)
        cur = cur.left
    }
    else {
        cur = stack.pop()
        console.log(cur.name)
        cur = cur.right
    }
   }

}
middleVisit(A)
