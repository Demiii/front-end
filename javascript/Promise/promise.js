class Promise {
    callbackList = []
    state = 'pending'
    value = null
    constructor(fn) {
        fn(this._resolve.bind(this))
    }
    then(onFulfilled) {
        return new Promise((resolve)=>{
            this._handle({
                onFulfilled,
                resolve
            })
        })
    }
    _handle(obj) {
        if(this.state === 'pending') {
            this.callbackList.push(obj)
            return
        }
        if(!obj.onFulfilled) {
            obj.resolve(this.value)
            return 
        }
        let res = obj.onFulfilled(this.value)
        obj.resolve(res)
        
    }
    _resolve(resolveValue) {
        // 保证回调已注册，否则fn如果是一个同步函数的话，还没有执行到then注册就执行_resolve函数了，此时callbackList = []
        if(this.state === 'pending') {
            this.state = 'fulfilled'
            this.value = resolveValue
            this.callbackList.forEach(cb=>{
                this._handle(cb)
            })
        }
    }
}

let p = new Promise(resolve => {
    setTimeout(() => {
        console.log('done');
        resolve('1秒');
    }, 1000);
}).then(tip=>{
    console.log(111111,tip)
}).then(tip=>{
    console.log(222222,tip)
}).then(tip=>{
    console.log(333333,tip)
})

