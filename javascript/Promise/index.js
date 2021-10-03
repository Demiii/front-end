

let promise1 = new Promise(function(resolve, reject) {
    setTimeout(function(){
        resolve('hahaha1')
    }, 0)
})


let promise2 = new Promise(function(resolve, reject) {
    setTimeout(function(){
        reject('xixixi2')
    }, 0)
})
Promise.race([promise1, promise2]).then((res)=>{
    console.log('1111', res)
}).catch((res)=>{
    console.log('2222', res)
})