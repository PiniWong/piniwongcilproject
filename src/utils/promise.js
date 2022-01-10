class myPromise {
    //状态
    static PENDING = 'pending';
    static FULFILLED  = 'fulfilled';
    static REJECTED  = 'rejected';
    constructor(func){
        this.PromiseState = myPromise.PENDING
        this.PromiseResult = null
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调
        try{
            //指向this
            func(this.resolve.bind(this),this.reject.bind(this));
        } catch (error){
            this.reject(error)
        }
        
    }
    resolve(result){
        if(this.PromiseState == myPromise.PENDING){
            setTimeout(()=>{

                this.PromiseState = myPromise.FULFILLED
                this.PromiseResult = result
                this.onFulfilledCallbacks.forEach(callback => {
                    callback(result)
                })
            })

        }
    }
    reject(reason){
        if(this.PromiseState == myPromise.PENDING){
            setTimeout(()=>{
                this.PromiseState = myPromise.REJECTED
                this.PromiseResult = reason
                this.onRejectedCallbacks.forEach(callback => {
                    callback(result)
                })
            })
        }
    }
    then(onFulfilled,onRejected){
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :value=>value
        onRejected = typeof onRejected === 'function' ? onRejected :reason => {
            throw reason;
        }
        if (this.PromiseState === myPromise.PENDING) {
            this.onFulfilledCallbacks.push(onFulfilled);
            this.onRejectedCallbacks.push(onRejected);
        }
        if(this.PromiseState==myPromise.FULFILLED){
            setTimeout(()=>{
                onFulfilled(this.PromiseResult)
            })
        }
        if(this.PromiseState==myPromise.REJECTED){
            setTimeout(()=>{
                onRejected(this.PromiseResult)
            })
        }
    }
}
const promise = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('success')
    }, 2000);
})
promise.then(value => {
    console.log(1)
    console.log('resolve', value)
})
promise.then(value => {
    console.log(2)
    console.log('resolve', value)
})
promise.then(value => {
    console.log(3)
    console.log('resolve', value)
})






