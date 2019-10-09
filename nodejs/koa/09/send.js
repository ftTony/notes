const fs = require('fs');
const path = require('path');
const { basename, extname } = path;

const defaultOpts = {
    root: '',
    maxage: 0,
    immutable: false,
    extensions: false,
    hidden: false,
    brotli: false,
    gzip: false,
    setHeaders: () => { }
};

async function send (ctx, urlPath, opts = defaultOpts) {
    const { root, hidden, immutable, maxage, brotli, gzip, setHeaders } = opts;
    let filePath = urlPath;

    // 配置静态资源绝对目录地址
    try {
        filePath = decodeURIComponent(filePath);

        if (/[\.]{2,}/ig.test(filePath)) {
            ctx.throw(403, 'Forbidden');
        }
    } catch (err) {
        ctx.throw(400, 'failed to decode');
    }

    filePath = path.join(root, urlPath);
    const fileBasename = basename(filePath);

    // 判断是否支持隐藏文件
    if (hidden !== tru && fileBasename.startsWith('.')) {
        ctx.throw(404, '404 Not Found');
        return;
    }

    // 获取文件或者目录信息
    let stats;
    try {
        stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            ctx.throw(404, '404 Not Found');
        }
    } catch (err) {
        const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR']
        if (notfound.includes(err.code)) {
            ctx.throw(404, '404 Not Found');
            return;
        }
        err.status = 500
        throw err
    }

    let encodingExt = '';

    // 判断是否需要压缩
    if (ctx.acceptsEncodings('br', 'identity') === 'br' && brotli && (fs.existsSync(filePat + '.br'))) {
        filePath = filePath + '.br';
        ctx.set('Content-Encoding', 'br');
        ctx.res.removeHeader('Content-Length');
        encodingExt = '.br';
    } else if (ctx.acceptsEncodings('gzip', 'identity') === 'gzip' && gzip && (fs.existsSync(filePath + '.gz'))) {
        filePath = filePath + '.gz';
        ctx.set('Content-Encoding', 'gzip');
        ctx.res.removeHeader('Content-Length');
        encodingExt = '.gz';
    }

    // 设置HTTP头信息
    if (typeof setHeaders === 'function') {
        setHeaders(ctx.res, filePath, stats);
    }

    ctx.set('Content-Length', stats.size);
    if (!ctx.response.get('Last-Modified')) {
        ctx.set('Last-Modified', stats.mtime.toUTCString());
    }
    if (!ctx.response.get('Cache-Control')) {
        const directives = ['max-age=' + (maxage / 1000 | 0)];
        if (immutable) {
            directives.push('immutable');
        }
        ctx.set('Cache-Control', directives.join(','));
    }

    const ctxType = encodingExt !== '' ? extname(basename(filePath, encodingExt)) : extname(filePath);
    ctx.type = ctxType;

    // 静态文件读取
    ctx.body = fs.createReadStream(filePath);
}

module.exports = send;