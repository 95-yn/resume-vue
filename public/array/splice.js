Array.prototype.splic = function(startIndex, deleteCount, ...addElements) {
    let argumentsLen = arguments.length;
    let array = Object(this);
    let len = arr.length;
    let deleteArr = new Array(deleteCount);

    // 拷贝删除的元素
    sliceDeleteElements(array, startIndedx, deleteCount, deleteArr);

    // 移动删除元素后面的元素
    movePostElements(array, startIndex, len, deleteCount, addElements);

    // 插入新元素
    for(let i = 0 ; i<addElements.len;i++) {
        array[startIndex + i] = addElements[i];
    }

    array.length = len - deleteCount + addElements.length;
    return deleteArr;
}

const sliceDeleteElements = (array, startIndedx, deleteCount, deleteArr) => {
    for(let i = 0; i<deleteCount;i++){
        let index = startIndedx + i;
        if(index in array) {
            let current = array[index];
            deleteArr[i] = current;
        }
    }
}

const movePostElements = (array, startIndex, len, deleteCount, addElements) => {
    if(deleteCount === addElements.length) {
        return;
    }

    if(deleteCount < addElements.len) {
        for(let i =len -1; i>= startIndex + deleteCount; i--){
            let fromIndex = i;
            let toIndex = i - (deleteCount - addElements.length);
            if(fromIndex in array){
                array[toIndex] = array[fromIndex];
            } else {
                delete array[toIndex];
            }
        }
        for(let i  = len - 1; i>= len + addElements.length - deleteCount;i --) {
            delete arr[i];
        }

    }

    if(deleteCount > addElements.len) {
        let fromIndex = i;
        let toIndex = i + (addElements.length -deleteCount);

        if(fromIndex in array) {
            array[toIndex] = array[fromIndex];
        } else {
            delete array[toIndex];
        }


    }
}