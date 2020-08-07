class Compiler {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  //编译模板
  compile(el) {
    let childNodes = el.childNodes;
    Array.from(childNodes).forEach((node) => {
      if (this.isTextNode(node)) {
        this.compileText(node);
      } else if (this.isElementNode(node)) {
        this.compileElement(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    });
  }

  compileElement(node) {
      Array.from(node.attributes).forEach(attr => {
          let attrName = attr.name
          if(this.isDirective(attrName)) {
              attrName = attrName.substr(2)
              let key = attr.value
              this.update(node, key, attrName)
          }
      })
  }

  update(node, key, attrName) {
      let updateFn = this[attrName + 'Update']
      updateFn && updateFn.call(this, node, this.vm[key], key)
  }

  textUpdate(node,value,key) {
      node.textContent = value;
      console.log(2);
      console.log(node.textContent);
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue
    })
  }

  modelUpdate(node,value,key) {
    node.value = value
    new Watcher(this.vm, key, newValue => {
        node.value = newValue
    })

    node.addEventListener('input', () => {
        this.vm[key] = node.value;
    })
  }

  compileText(node) {
      let reg = /\{\{(.+?)\}\}/
      let value = node.textContent
      if(reg.test(value)){
            let key = RegExp.$1.trim();
            console.log(node);
            node.textContent = value.replace(reg, this.vm[key])
            new Watcher(this.vm, key, newValue => {
                node.textContent = newValue
            })
      }

  }

  isDirective(attrName) {
    return attrName.startsWith("v-");
  }

  isTextNode(node) {
    return node.nodeType === 3;
  }

  isElementNode(node) {
    return node.nodeType === 1;
  }
}
