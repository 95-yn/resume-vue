class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if(!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data,key, data[key]);
        })
    }

    defineReactive(obj, key, val) {
        let that = this;
        this.walk(val);
        let dep = new Dep
        Object.defineProperty(obj,key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set(newVal) {
                if(newVal === val) {
                    return
                }
                val = newVal;
                that.walk(newVal)
                dep.notify()
            }
        })
    }
}