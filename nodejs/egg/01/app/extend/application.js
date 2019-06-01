const BAR = Symbol('Application#bar');
module.exports = {
    foo (param) {

    },
    get bar () {
        if (!this[BAR]) {
            this[BAR] = this.config + this.config
        }
        return this[BAR]
    }
}