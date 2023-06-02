let list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

function sort(list) {
    let len = list.length
    for(let i = 1; i<len; i++) {
        let curVal = list[i]
        let curIndex = i
        while(curIndex>0 && list[curIndex-1] > curVal) {
            list[curIndex] = list[curIndex-1]
            list[curIndex-1] = curVal
            curIndex -- ;
        }
    }
    console.log('list', list)
}


sort(list)