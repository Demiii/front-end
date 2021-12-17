
let dp
function F(x, y) {
    if(x<0 || y<0) {
        return 0
    }
    if(dp[x][y] !== void 0) {
        return dp[x][y]
    }

    if(x==0 && y==0) {
        dp[0][0] = 0
    }
    if(x==1 && y==0) {
        dp[x][y] = 1
    }else if(y==1 && x==0) {
        dp[x][y] = 1
    }else{
        dp[x][y] = F(x-1, y) + F(x, y-1)
    }
    return dp[x][y]
}
function main(m,n) {
    dp = new Array(m+1).fill([])
    return F(m,n)
}
let res = main(1, 2)
console.log('res', res)
