Array.prototype.map = function (callback, thisArgument) {
    if (this === null || this === undefined) {
        throw new TypeError('Cannot rea property "map" of null or undefined');
    }

    if(Object.prototype.toString.call(callback) != '[object Function]') {
        throw new TypeError(callback + ' is not a function');
    }
    let O = Object(this);
    let T = thisArgument;

    let len = O.length >>> 0;
    let A = new Array(len);
    for(let i = 0; i< len;i++){
        if(i in O)  {
            let iValue = O[i]
            let mappedValue = callback.call(T,iValue, i, O);
            A[i] = mappedValue;
        } 
    }
    return A;
}

let list = [1,2,3,4];
list.map(function(v,k){
    console.log(...arguments);
})