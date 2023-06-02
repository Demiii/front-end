let list = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48]

function sort(list) {
    let len = list.length
    for(let i=len-1; i>=0; i--){
        let max = list[0]
        let maxIndex = 0
        for(let j=0; j<=i; j++) {
            if(list[j] > max) {
                max = list[j]
                maxIndex = j
            }
        };
        ([list[maxIndex], list[i]] = [list[i], list[maxIndex]])
    }
}


sort(list)