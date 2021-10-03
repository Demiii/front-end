var list = {}
var F = function(m) {
    list[m] = list[m-1] + list[m-2]
    if(!isNaN(list[m])){
        return list[m]
    }
    if(m == 1 || m == 2){
        list[m] = m
        return m
    }else if(m<=0) {
        list[m] = 0
        return 0 
    }
    return list[m]
};

var climbStairs = function(n) {
    for(let i = 1; i<=n; i++) {
        F(i)
    }
    return F(n)
}
console.log(climbStairs(44))