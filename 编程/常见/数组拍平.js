// 数组拍平
const arr = [1, [2, [3, [4, 5]]], 6];

// 1. toString （会变成string）
let newArr = arr.toString().split(',')

// 2. flat (Infinity无穷大，表示嵌套数组的提取深度，不传默认为1)
newArr = arr.flat(Infinity)

// 3. reduce
function getArr(arr) {
    return arr.reduce((now, next)=>{
        if(!Array.isArray(next)) {
            now.push(next)
        }else{
            now = now.concat(getArr(next))
        }
        return now
    }, [])
}
newArr = getArr(arr)

// 4. 正则 (会变成string)
newArr = JSON.stringify(arr).replace(/[\[,\]]/g, '').split('')
// 改良版（不会变成string）
newArr = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']')

// 5. 递归
function fn(arr){
    let res = []
    arr.forEach(item=>{
        if(Array.isArray(item)) {
            res = res.concat(fn(item))
        }else{
            res.push(item)
        }
    })
    return res
}
newArr = fn(arr)



console.log(newArr)