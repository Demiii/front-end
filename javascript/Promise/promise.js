class Promise {
    callbacks = []
    constructor(fn) {
        fn(this._resolve.bind(this))
    }
    then(onFulfilled) {
        this.callbacks.push(onFulfilled)
    }
    _resolve(value){
        this.callbacks.forEach(fn=>fn(value))
    }
}

let p = new Promise(resolve => {
    setTimeout(() => {
        console.log('done');
        resolve('5秒');
    }, 5000);
}).then((tip) => {
    console.log(tip);
})

