let list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

function sort(list) { // 递归
    let len = list.length
    if(len <= 1) {
        return list
    }else{
        let m = Math.floor(len/2)
        let l1 = list.slice(0, m)
        let l2 = list.slice(m)
        return merge(sort(l1), sort(l2))
    }
}

function sort1(list) { // 迭代
    let step = 1
    let len = list.length
    while(step<len) {
        let index = 0
        while(index<len) {
            let step1 = index+step < len ? index+step : len
            let step2 = index+step+step < len ? index+step+step : len
            list.splice(index, step2-index, ...merge(list.slice(index, step1), list.slice(step1, step2)))
            index = step2
        }
        step = step * 2
    }
    return list
}

function merge(l1, l2) {
    let i1 = 0, len1 = l1.length, i2 = 0, len2 = l2.length;
    let l3 = []
    while(i1 < len1 && i2 < len2) {
        let temp1 = l1[i1], temp2 = l2[i2]
        if(temp1 < temp2) {
            l3.push(temp1);
            i1++;
        }else {
            l3.push(temp2);
            i2++;
        }
    }
    l3 = [...l3, ...l1.slice(i1), ...l2.slice(i2)]
    return l3
}

// sort(list)
console.log('list', sort1(list))