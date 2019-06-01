const BAR = Symbol('Context#bar')
module.exports = {
    foo (param) {

    },
    get bar () {
        if (!this[BAR]) {
            this[BAR] = this.get('x-bar');
        }
        return thisp[BAR]
    }
}