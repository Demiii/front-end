let list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

function sort(list) {
    let len = list.length
    for(let i = len-1; i>=0; i--) {
        for(let j = 0; j<i; j++) {
            if(list[j] > list[j+1]) {
                ([list[j+1], list[j]] = [list[j], list[j+1]])
            }
        }
    }
    console.log('list', list)
}
// sort(list)

// 算法复杂度 O( n2 )
// 最优情况 就是有序数组， 算法复杂度为O( n )， 需要增加一个标志，如果一轮迭代都没有交换过位置，说明数组已经有序

function sort1(list) {
    let len = list.length
    let swap = false
    for(let i = len-1; i>=0; i--) {
        swap = false
        for(let j = 0; j<i; j++) {
            if(list[j] > list[j+1]) {
                swap = true;
                ([list[j+1], list[j]] = [list[j], list[j+1]])
            }
        }
        if(!swap) {
            return
        }
    }
}
sort1(list)
console.log('list', list)
