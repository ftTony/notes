import {
    Compare,
    defaultCompare,
    DOES_NOT_EXIST
} from '../util'

import {
    quickSort2
} from './sorting/quicksort'

export function binarySearch(array, value, compareFn = defaultCompare) {
    const sortedArray = quickSort2(array)
    let low = 0
    let high = sortedArray.length - 1
    while (low <= high) {

    }
}