function defaultToString(item) {
    if (item === null) {
        return 'NULL';
    } else if (item === undefined) {
        return 'UNDEFINED';
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`
    }
    return item.toString();
}

class Dictionary {
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn;
        this.table = {};
    }
    set(key, value) {
        if (key != null && value != null) {
            const tableKey = this.toStrFn(key);
            this.table[tableKey] = new ValuePair(key)
        }
        return false;
    }
    get(key) {

    }
    hasKey(key) {

    }
    remove(key) {

    }
    values() {

    }
    keys() {

    }
    keyValues() {

    }
    forEach(callbackFn) {

    }
    isEmpty() {
        return this.size() === 0;
    }
    size() {
        return Object.keys(this.table).length;
    }
    clear() {
        this.table = {};
    }
    toString() {

    }
}