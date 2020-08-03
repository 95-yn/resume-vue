Array.prototype.reduce = function (callback, current) {
    if (this === null || this === undefined) {
        throw new TypeError("cannot read propertype 'reduce' of null or undefined");
    }
    console.log(Object.prototype.toString.call(callback));
    if (Object.prototype.toString.call(callback) != '[object Function]') {
        throw new TypeError(callback + ' is not a function');
    }

    let O = Object(this);
    let len = O.length >>> 0;
    let k = 0;
    let accumulator = current;
    if (accumulator === undefined) {
        for (; k < len; k++) {
            if (k in O) {
                accumulator = O[k];
                k++;
                break;
            }
        }
        throw new Error('Each element of the array is empty');
    }
    for (; k < len; k++) {
        if (k in O) {
            accumulator = callback.call(undefined, accumulator, O[k], k, O);
        }
    }
    return accumulator;

}


let list = [1, 2, 3, 4];
list.reduce(function (accumulator, currentValue, currentIndex, array) {
    console.log(...arguments);
    return accumulator + currentValue;
}, 5);