Array.prototype.map1 = function(fn) {
    let res = []
    let array = this
    for(let i=0; i<array.length; i++) {
        res.push(fn(array[i]))
    } 
    return res  
}


let A = [1,2,3,4,5]

let B = A.map1(item=>{return item+1})
console.log(B)