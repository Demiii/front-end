
  Object.defineProperty(Object, 'assign', {
      value: (target, ...args)=>{
        if(target === null) {
            new Error.TypeError('目标对象不能为空')
        }
        const o = Object(target) // Object传入为对象时，具有幂等性,所以实际操作的还是target
        for(let i = 0; i < args.length; i++) {
            let curObj = args[i]
            for(let key in curObj) {
                if(curObj.hasOwnProperty(key)){
                    o[key] = curObj[key]
                }
            }
        }
        return o
      },
      // 不可枚举
        enumerable: false,
        writable: true,
        configurable: true,
  })