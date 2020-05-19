import {
    biggerEquals,
    Compare,
    defaultCompare,
    defaultEquals,
    defaultDiff,
    DOES_NOT_EXIST,
    lesserEquals
} from '../util'

export function interpolationSearch(array, value, compareFn = defaultCompare, equalsFn = defaultEquals, diffFn = defaultDiff) {
    const {
        length
    } = array
    let low = 0
    let high = length - 1
    let position = -1
    let delta = -1
    while (low <= high && biggerEquals(value, array[low], compareFn) && lesserEquals(value, array[high], compareFn)) {

    }
    return DOES_NOT_EXIST
}