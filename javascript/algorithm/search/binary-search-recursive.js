/**
 * 方法一
 * @param {*} arr 
 * @param {*} data 
 */
function binSearch1(target, arr, start, end) {
    var start = start || 0;
    var end = end || arr.length - 1;
    var mid = Math.floor((start + end) / 2);
    if (target == arr[mid]) {
        return mid;
    } else if (target > arr[mid]) {
        return binSearch1(target, arr, mid + 1, end);
    } else {
        return binSearch1(target, arr, start, mid - 1);
    }
    return -1;
}