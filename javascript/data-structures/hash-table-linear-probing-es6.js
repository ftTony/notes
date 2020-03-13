function defaultToString (item) {
    if (item === null) {
        return 'NULL'
    } else if (item === undefined) {
        return 'UNDEFINED'
    } else if (typeof item === 'string' || item instanceof String) {
        return `${item}`;
    }
    return item.toString()
}
class HashTableLinearProbing{
    constructor(toStrFn = defaultToString) {
        this.toStrFn = toStrFn
        this.table = {}
    }
    loseloseHashCode (key) {
        
    }
    hashCode (key) {
        
    }
    put (key, value) {
        
    }
    get (key) {
        
    }
    verifyRemoveSideEffect (key, removedPosition) {
        
    }
    isEmpty () {
        
    }
 }
