Api:
* **Promise.all**(PromiseIterable): 返回一个Promise对象，PromiseIterable中所有promise对象都成功时才触发成功，成功状态会将所有promise对象的成功状态返回值组成的数组作为**成功状态**的返回值；如果PromiseIterable中有一个promise触发了失败状态，新的promise也会转为**失败状态**，失败状态的返回值为第一个失败的promise的失败信息。

---
  
* **Promise.allSettled**(PromiseIterable): 返回一个Promise对象，PromiseIterable中所有promise对象都为已敲定状态时，新的promise为**成功状态**，返回值为所有promise对象的结果。
    
    ```
    例如:[
            { status: 'fulfilled', value: undefined },
            { status: 'rejected', reason: undefined }
        ]
---
* **Promise.any**(PromiseIterable): 返回一个Promise对象，PromiseIterable中任意一个promise返回触发成功状态，则新promise触发**成功状态**，返回值为第一个成功的promise的返回值；如果PromiseIterable中所有的promise都失败了，新promise触发**失败状态**。
---

* **Promise.race**(PromiseIterable): 返回一个Promise对象，PromiseIterable中任意一个promise触发成功或者失败，新promise的状态与第一个敲定状态的promise状态一致。