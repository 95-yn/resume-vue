const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function MyPromise(excutor) {
    let self = this;
    self.value = null;
    self.error = null;
    self.status = PENDING;
    self.onFufilledCallbacks = [];
    self,onRejectedCallbacks = [];

    const resolve = (value) => {
        if(self.status !== PENDING){
            return
        }
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            self.onFufilledCallbacks.forEach((callback) => {
                callback(self.value);
            });
        })
    }

    const reject = (error) => {
        if(self.status !== PENDING) {
            return
        }
        setTimeout(() => {
            self.status = REJECTED;
            self.error = error;
            self.onRejectedCallbacks.forEach((callback) => {
                callback(self.error);
            })
        });
    }
    excutor(resolve,reject);

}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    let bridgePromise;
    let self = this;
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };
    if(this.status === PENDING) {
        return bridgePromise = new MyPromise((resolve,reject) => {
            self.onFufilledCallbacks.push((value) => {
                try {
                    let x = onFulfilled(value);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            });

            self.onRejectedCallbacks.push((error) => {
                try{
                    let x = onRejected(error);
                    resolvePromise(bridgePromise, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            })
        });
        
    } else if(this.status === FULFILLED) {
        return bridgePromise = new MyPromise((resolve,reject) => {
            try{
                let x = onFulfilled(self.error);
                resolvePromise(bridgePromise,x ,resolve,reject);
            } catch(e) {
                reject(e);
            }
        });
    } else if(this.status === REJECTED) {
        return bridgePromise = new MyPromise((resolve,reject) => {
            try{
                let x = onRejected(self.error);
                resolvePromise(bridgePromise,x ,resolve,reject);
            } catch(e) {
                reject(e);
            }
        });
    }
}

function resolvePromise(bridgePromise, x, resolve, reject) {
    if(x instanceof MyPromise) {
        if(x.status === PENDING) {
            x.then(y => {
                resolvePromise(bridgePromise, y, resolve, reject);
            }, error => {
                reject(error);
            })
        } else {
            x.then(resolve, reject);
        }
    } else {
        resolve(x);
    }
}