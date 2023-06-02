let list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

function sort(list) {
    let len = list.length
    fn(0, len-1)
    function fn(start, end) {
        if(end-start < 1) return
        let base = list[start]
        let curStart = start, curEnd = end
        let empty = curStart
        while(curStart != curEnd) {
            if(empty == curStart) {
                if(list[curEnd] < base) {
                    list[curStart] = list[curEnd]
                    curStart ++;
                    empty = curEnd
                }else{
                    curEnd --;
                }
            }else {
                if(list[curStart] > base) {
                    list[curEnd] = list[curStart]
                    curEnd --;
                    empty = curStart
                }else{
                    curStart ++;
                }
            }
        }
        list[curStart] = base
        fn(start, curStart-1)
        fn(curStart+1, end)
    }
    console.log('list', list)

}


sort(list)