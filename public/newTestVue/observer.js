const { set } = require("vue/types/umd");

class ObServer{
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if(!data || typeof data !== 'object') {
            return
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data,key,data[key])
        })
    }

    defineReactive(obj,key,value) {
        let that = this;
        this.walk(value);
        let dep = new Dep;
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable: true,
            get() {
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set(newValue) {
                if()
            }
        })
    }
}