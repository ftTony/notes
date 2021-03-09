export default ({
    app
}, inject) => {
    inject('myInjectedFunction', (string) => console.log('That was easy!', string))
}