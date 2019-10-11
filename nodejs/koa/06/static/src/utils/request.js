import 'whatwg-fetch';

function fetchEvent (options) {
    if (!options) {
        return;
    }
    let _url = options.url || '';
    let _type = options.type || 'GET';
    let _data = options.data || {};
}