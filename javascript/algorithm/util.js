export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
}

export const DOES_NOT_EXIST = -1

export function defaultEquals(a, b) {
    return a === b
}

export function defaultCompare(a, b) {
    if (a === b) {
        return Compare.EQUALS
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN
}

export function lesserEquals(a, b, compareFn) {
    const comp = compareFn(a, b)
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS
}

export function defaultDiff() {
    return Number(a) - Number(b)
}

export function biggerEquals(a, b, compareFn) {
    const comp = compareFn(a, b)
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS
}

export function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]]
}