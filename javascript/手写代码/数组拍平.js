// let newList = []
// function process(list) {
//     list.forEach(element => {
//         if(!Array.isArray(element)) {
//             newList.push(element)
//         }else{
//             process(element)
//         }
//     });
// }

// let list = [1, [2, 3], [4, [7, [9]]]]
// process(list)



// console.log(newList)
let res = []
function F(arr) {
    if(Array.isArray(arr)) {
        arr.forEach(item=>{
            if(Array.isArray(item)) {
                F(item)
            }else{
                res.push(item)
            }
        })
    }
}

let list = [1, [2, 3], [4, [7, [9]]], [5,6], 10]
F(list)



console.log(list.flat(3))
