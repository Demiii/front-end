const PENDING = 'pending'
const RESOLVED = 'resolved'
const REJECTED = 'rejected'
class Promise {
  constructor(fn) {
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;
    this.resolvedCbs = [];
    this.rejectedCbs = [];
    try {
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }
  resolve(value) {
    if(this.state == PENDING) {
      this.state = RESOLVED
      this.value = value
      // 这里的处理是针对同一个promise多次挂了then的情况
      queueMicrotask(()=>{
        this.resolvedCbs.forEach(cb=>{
          cb(value)
        })
      })
    }
  }
  reject(reason) {
    if(this.state == PENDING) {
      this.state = REJECTED
      this.reason = reason
      queueMicrotask(()=>{
        this.rejectedCbs.forEach(cb=>{
          cb(reason)
        })
      })
    }
  }
  then(onFulfilled, onRejected) {
    if(this.state == PENDING) {
      this.resolvedCbs.push(onFulfilled)
      this.rejectedCbs.push(onRejected)
    }
    if(this.state == RESOLVED) {
      onFulfilled(this.value)
    }
    if(this.state == REJECTED) {
      onRejected(this.reason)
    }
  }
}

// 测试一下
var p = new Promise(function(resolve,reject){
  setTimeout(()=>{
    resolve(1000)
  },2000)
})

p.then(function(res){
   console.log(res);
});

p.then(function(res){
   console.log(res);
});