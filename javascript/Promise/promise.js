const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

class Promise1 {
    status = PENDING
    value = undefined
    reason = undefined

    onFulfilledCbList = []
    onRejectedCbList = []
    constructor(executor) {
        try {
            executor(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }
    then(onFulfilled, onRejected){
        let thenPromise =new Promise((resolve, reject)=>{
            // then传入的如果不是function就传递上一个promise的状态
            onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v=>v
            onRejected = typeof onRejected === 'function' ? onRejected : err=>{throw err}

            if(this.status === PENDING) {
                this.onFulfilledCbList.push({
                    thenPromise,
                    onFulfilled,
                    resolve,
                    reject
                })
                this.onRejectedCbList.push({
                    thenPromise,
                    onRejected,
                    resolve,
                    reject
                })
                return
            }
            try {
                let res = this.status === FULFILLED 
                    ? onFulfilled(this.value)
                    : onRejected(this.reason)
                resolve(res)
            } catch (error) {
                reject(error)
            }
        })
        return thenPromise
    }
    resolve(value) {
        if(this.status === PENDING) {
            this.status = FULFILLED
            this.value = value
            this.onFulfilledCbList.forEach(obj=>{
                try {
                    let res = obj.onFulfilled(this.value)
                    // obj.resolve(res)
                    // res为promise时，then返回的promise状态与res 的状态一致
                    // 如果res 和 
                    if(res === obj.thenPromise) {
                        throw new Error('死循环')
                    }
                    if(typeof res === 'object' || typeof res === 'function') {
                        // res 是promise
                        if(typeof res.then === 'function') {
                            res.then((value)=>{
                                obj.resolve(value)
                            }, (err)=>{
                                obj.reject(err)
                            })
                            return 
                        }
                    }
                    obj.resolve(res)
                } catch (error) {
                    obj.reject(error)
                }
            })
        }
    }
    reject(reason) {
        if(this.status === PENDING) {
            this.status = REJECTED
            this.reason = reason
        }
        this.onRejectedCbList.forEach(obj=>{
            try {
                let res = obj.onRejected(this.reason)
                obj.resolve(res)
            } catch (error) {
                obj.reject(error)
            }
        })
    }
    static resolve(value) {
        return new Promise((reject, resolve)=>{
            resolve(value)
        })
    }
    finally(fn){
        return this.then((value)=>{
            return Promise.resolve(fn()).then(value=>value)
        }, (err)=>{
            return Promise.resolve(fn()).then(err=>{throw err})
        })
    }
}


// const promise = new Promise((resolve, reject) => {
//     reject('失败');
//   }).then().then().then(data=>{
//     console.log(data);
//   },err=>{
//     console.log('err',err);
//   })

