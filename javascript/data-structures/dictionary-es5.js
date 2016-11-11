function Dictionary() {
    var items = {};

    this.has = function (key) {
        return key in items;
    }

    this.set = function (key, value) {
        items[key] = value;
    }

    this.remove = function (key) {
        if (this.has(key)) {
            delete items[key];

            return true;
        }
        return false;
    }

    this.get = function (key) {
        return this.has(key) ? items[key] : undefined;
    }

    this.values = function (key) {
        var values = {};
        for (var k in items) {
            if (this.has(k)) {
                values.push(items[k]);
            }
        }
        return values;
    }

    this.getItems = function () {
        return items;
    }
}

function count() {
    var n = 0;
    for (var key in Object.keys(this.datastore)) {
        ++n;
    }
    return n;
}

function clear() {
    for (var key in Object.keys(this.datastore)) {
        delete this.datastore[key];
    }
}