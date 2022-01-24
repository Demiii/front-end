// 数组全排列
function fn(arr) {
    let first = arr[0]
    let res = []
    let n = arr.length
    if(n <= 1) {
        return [...arr]
    }
    fn(arr.slice(1)).forEach(item=>{
        for(let i=0; i<n; i++){
            // 插入first
            let temp = Array.isArray(item)?[...item]:[item]
            temp.splice(i, 0, first)
            res.push(temp)
        }
    })
    return res
}
const res = fn([1, 2, 3, 4])
console.log('结果', res)

// async function async1(){
//     console.log(1)
//     await async2()
//     console.log(3)
// }

// async function async2(){
//     console.log(2)
// }

// async1()

// new Promise((resolve, reject)=>{
//     console.log(4)
//     resolve()
// }).then(()=>{
//     console.log(5)
// })