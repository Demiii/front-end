// 动态规划
let dp = {}
function  jump(num) {
    if(dp[num] !== void 0) {
        return dp[num]
    }
    if(num <= 0) {
        dp[num] = 0
    }else if(num === 1) {
        dp[num] = 1
    }
    else if(num === 2) {
        dp[num] = 2
    }
    else{
        dp[num] = jump(num-1) + jump(num-2)
    }
    return dp[num]
}


function main(n) {
    for(let i = 0; i<n; i++) {
        jump(i)
    }
    return jump(n)
}

let res = main(10000)
console.log(res)