const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

// 1. set
let newArr
newArr = Array.from(new Set(arr))

// 2. 遍历比较 (inclues indexOf)
newArr = []
arr.forEach((item)=>{
    if(newArr.includes(item)) return
    newArr.push(item)
})

// 3. map
newArr = new Map()
arr.forEach(item=>{
    if(!newArr.has(item)) {
        newArr.set(item, true)
    }
})
newArr = Array.from(newArr.keys())





console.log(newArr)