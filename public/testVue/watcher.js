class Watcher{
    constructor(vm, key, callback) {
        this.vm = vm
        this.key = key
        this.callback = callback

        Dep.target = this
        this.oldValue = vm[key]
        Dep.target = null
    }

    update() {
        let newValue= this.vm[this.key]
        if(this.oldValue === newValue) {
            return
        }
        this.callback(newValue)
    }
}