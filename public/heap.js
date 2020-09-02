
class minHeap {
    constructor() {
        this.heap = [];
    }
    getParentIndex(i) {
        return i-1 >> 1;
    }
    swap(i1,i2) {
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    getLeftChildIndex(i) {
        return (i*2) + 1;
    }
    getRightChildIndex(i) {
        return (i*2) + 2;
    }
    shiftUp(index) {
        if(index === 0) {return};
        const parentIndex = this.getParentIndex(index);
        if(this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    shiftDown(index) {
        const leftIndex = this.getLeftChildIndex(index);
        const rightIndex =  this.getRightChildIndex(index);
        if(this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex,index);
            this.shiftDown(leftIndex);
        }
        if(this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex,index);
            this.shiftDown(rightIndex);
        }
    }
    pop() {
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
    }
    insert(value) {
        this.heap.push(value);
        this.shiftUp(this.heap.length-1);
    }
    getLength() {
        return this.heap.length;
    }
}
const h1 = new minHeap;
h1.insert(1);

h1.insert(3);
h1.insert(5);
h1.insert(2);
h1.insert(4);
h1.insert(99);
h1.insert(9);
h1.pop();
console.log(h1);