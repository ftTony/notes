!function(e) {
    function t(t) {
        for (var n, o, u = t[0], i = t[1], c = 0, a = []; c < u.length; c++)
            o = u[c],
            r[o] && a.push(r[o][0]),
            r[o] = 0;
        for (n in i)
            Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
        for (l && l(t); a.length; )
            a.shift()()
    }
    var n = {}
      , r = {
        2: 0
    };
    function o(t) {
        if (n[t])
            return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, o),
        r.l = !0,
        r.exports
    }
    o.e = function(e) {
        var t = []
          , n = r[e];
        if (0 !== n)
            if (n)
                t.push(n[2]);
            else {
                var u = new Promise(function(t, o) {
                    n = r[e] = [t, o]
                }
                );
                t.push(n[2] = u);
                var i, c = document.getElementsByTagName("head")[0], l = document.createElement("script");
                l.charset = "utf-8",
                l.timeout = 120,
                o.nc && l.setAttribute("nonce", o.nc),
                l.src = function(e) {
                    return o.p + "" + e + ".index.js"
                }(e),
                i = function(t) {
                    l.onerror = l.onload = null,
                    clearTimeout(a);
                    var n = r[e];
                    if (0 !== n) {
                        if (n) {
                            var o = t && ("load" === t.type ? "missing" : t.type)
                              , u = t && t.target && t.target.src
                              , i = new Error("Loading chunk " + e + " failed.\n(" + o + ": " + u + ")");
                            i.type = o,
                            i.request = u,
                            n[1](i)
                        }
                        r[e] = void 0
                    }
                }
                ;
                var a = setTimeout(function() {
                    i({
                        type: "timeout",
                        target: l
                    })
                }, 12e4);
                l.onerror = l.onload = i,
                c.appendChild(l)
            }
        return Promise.all(t)
    }
    ,
    o.m = e,
    o.c = n,
    o.d = function(e, t, n) {
        o.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        })
    }
    ,
    o.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    o.t = function(e, t) {
        if (1 & t && (e = o(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var n = Object.create(null);
        if (o.r(n),
        Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var r in e)
                o.d(n, r, function(t) {
                    return e[t]
                }
                .bind(null, r));
        return n
    }
    ,
    o.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return o.d(t, "a", t),
        t
    }
    ,
    o.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    o.p = "",
    o.oe = function(e) {
        throw console.error(e),
        e
    }
    ;
    var u = window.webpackJsonp = window.webpackJsonp || []
      , i = u.push.bind(u);
    u.push = t,
    u = u.slice();
    for (var c = 0; c < u.length; c++)
        t(u[c]);
    var l = i;
    o(o.s = 0)
}([function(e, t, n) {
    document.getElementById("aBtn").onclick = function() {
        n.e(1).then(function() {
            let e = n(2);
            alert(e)
        }
        .bind(null, n)).catch(n.oe)
    }
    ,
    document.getElementById("bBtn").onclick = function() {
        n.e(0).then(function() {
            let e = n(1);
            alert(e)
        }
        .bind(null, n)).catch(n.oe)
    }
}
]);
