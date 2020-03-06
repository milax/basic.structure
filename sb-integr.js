!function(n) {
    var t = {};
    function e(o) {
        if (t[o])
            return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return n[o].call(i.exports, i, i.exports, e),
        i.l = !0,
        i.exports
    }
    e.m = n,
    e.c = t,
    e.d = function(n, t, o) {
        e.o(n, t) || Object.defineProperty(n, t, {
            enumerable: !0,
            get: o
        })
    }
    ,
    e.r = function(n) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(n, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(n, "__esModule", {
            value: !0
        })
    }
    ,
    e.t = function(n, t) {
        if (1 & t && (n = e(n)),
        8 & t)
            return n;
        if (4 & t && "object" == typeof n && n && n.__esModule)
            return n;
        var o = Object.create(null);
        if (e.r(o),
        Object.defineProperty(o, "default", {
            enumerable: !0,
            value: n
        }),
        2 & t && "string" != typeof n)
            for (var i in n)
                e.d(o, i, function(t) {
                    return n[t]
                }
                .bind(null, i));
        return o
    }
    ,
    e.n = function(n) {
        var t = n && n.__esModule ? function() {
            return n.default
        }
        : function() {
            return n
        }
        ;
        return e.d(t, "a", t),
        t
    }
    ,
    e.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }
    ,
    e.p = "",
    e(e.s = 41)
}({
    41: function(n, t, e) {
        n.exports = e(42)
    },
    42: function(n, t) {
        !function(n) {
            function t(n) {
                var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : e;
                window.addEventListener("message", function e(o) {
                    o.data.action === n.action && (window.removeEventListener("message", e),
                    t(o.data))
                }),
                window.top.postMessage(n, "*")
            }
            function e() {}
            function o(n) {
                n.meta.reload && i()
            }
            function i() {
                location.reload()
            }
            n.status = function(n) {
                console.log('>>>> status');
                t({
                    action: "status"
                }, function(t) {
                    n(t.data)
                })
            }
            ,
            n.refreshSession = function(n) {
                console.log('>>>> session');
                t({
                    action: "session"
                }, function(t) {
                    n(t.data)
                })
            }
            ,
            n.logout = function() {
                console.log('>>>> logout');
                t({
                    action: "logout"
                }, function() {
                    for (var n = arguments.length, t = new Array(n), e = 0; e < n; e++)
                        t[e] = arguments[e];
                    return function(n) {
                        t.forEach(function(t) {
                            return t(n)
                        })
                    }
                }(o))
            }
            ,
            n.notLoggedInBetPlacement = function() {
                console.log('>>>> notLoggedInBetPlacement');
                t({
                    action: "notLoggedInBetPlacement"
                }, function(n) {
                    n.data.reload && i()
                })
            }
            ,
            n.betAccepted = function(n) {
                console.log('>>>> betAccepted');
                t({
                    action: "betAccepted",
                    purchaseIds: n
                })
            }
            ,
            n.setBetSlipItemsCount = function(n) {
                console.log('>>>> betSlipCountChange');
                t({
                    action: "betSlipCountChange",
                    count: n
                })
            }
            ,
            n.registerGoToResponsiveBetSlipCallback = function(n) {
                window.addEventListener("message", function(t) {
                    "goToResposiveBetslip" === t.data.action && n()
                })
            }
            ,
            n.setDeviceTypeAndOrientation = function(n) {
                console.log('>>>> setDeviceTypeAndOrientation');
                t({
                    action: "setDeviceTypeAndOrientation",
                    deviceData: n
                })
            }
            ,
            n.orientationChange = function(n) {
                console.log('>>>> orientationChange');
                t({
                    action: "orientationChange",
                    height: n
                })
            }
            ,
            n.setCurrentLocationMobile = function(n) {
                console.log('>>>> setCurrentLocationMobile');
                t({
                    action: "setCurrentLocationMobile",
                    location: n
                })
            }
            ,
            n.isBetSlipView = function(n) {
                console.log('>>>> isBetSlipView');
                t({
                    action: "isBetSlipView",
                    isVisible: n
                })
            }
            ,
            n.notAMLVerified = function() {
                console.log('>>>> notAMLVerified');
                t({
                    action: "notAMLVerified"
                })
            }
            ,
            n.notCDDVerified = function() {
                console.log('>>>> notCDDVerified');
                t({
                    action: "notCDDVerified"
                })
            }
            ,
            n.scrollToTop = function() {
                window.scrollTo(0, 0)
            }
        }(window.whl = {})
    }
});
