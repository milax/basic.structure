"use strict";
(function() {
    var e = "landscape",
        t = !1,
        i = !1,
        o = {
            iframe: null,
            iOS: !1,
            jsScrolled: !1,
            scrollTimeout: null,
            resizeTimeout: null,
            windowLoaded: !1,
            isFocused: !1,
            eventObject: {},
            iframeResizeTimeout: null,
            offsetChangeMessageTimeout: null,
            iOSChromeScrollFixInterval: null,
            iOSChromeScrollFixTimeout: null,
            isChrome: !1,
            iPhoneWithTextIncreaseBug: !1,
            detectIos: function() {
                var e = navigator.platform;
                "iPad" !== e && "iPhone" !== e && "iPod" !== e || (this.iOS = !0)
            },
            detectIPhoneWithTextIncreaseBug: function() {
                var e = navigator.userAgent,
                    t = !!e.match("iPhone OS 11_"),
                    i = !!e.match("iPhone OS 12_"),
                    o = !!e.match(/Version\/([0-9._]+).*?Safari\/[0-9._]*/i),
                    n = window.screen.height >= 667;
                this.iPhoneWithTextIncreaseBug = (t || i) && o && n
            },
            scrollToTop: function(e) {
                if (this.jsScrolled && this.getScrollTop() <= 1) this.jsScrolled = !1;
                else if (!e) {
                    this.jsScrolled = !0;
                    var t = window.innerHeight < window.innerWidth;
                    this.iPhoneWithTextIncreaseBug && !t ? window.scroll(1, 1) : window.scroll(1, 0)
                }
            },
            getHeight: function() {
                var e = window.innerHeight;
                if (window.innerWidth > window.innerHeight) {
                    var t = Math.min(window.screen.width, window.screen.height);
                    t < 415 && e < 100 && (e = t + 1)
                }
                return e
            },
            setBodyHeight: function() {
                document.body.style.height = "calc(100vh + 100px)"
            },
            setMaxWidthHeight: function() {
                window.navigator.userAgent.match("SamsungBrowser") && this.iframe && (this.iframe.style.maxWidth = "100%", this.iframe.style.maxHeight = "100%")
            },
            fixiOSChromeScrollPosition: function(e) {
                var t = this;
                if (this.isChrome) {
                    var i = function() {
                        t.iOSChromeScrollFixInterval &&
                        (
                            window.clearInterval(t.iOSChromeScrollFixInterval),
                            t.iOSChromeScrollFixInterval = null
                        ),
                        t.iOSChromeScrollFixTimeout &&
                        (
                            window.clearTimeout(t.iOSChromeScrollFixTimeout),
                            t.iOSChromeScrollFixTimeout = null
                        )
                    };
                    i(), e && (this.iOSChromeScrollFixInterval = window.setInterval((function() {
                        t.getScrollTop() > 1 && t.scrollToTop(!1), t.iOSChromeScrollFixTimeout || (t.iOSChromeScrollFixTimeout = window.setTimeout((function() {
                            i(), t.getScrollTop() > 1 && (window.alert("  "), t.scrollToTop(!1))
                        }), 5e3))
                    }), 500))
                }
            },
            getScrollTop: function() {
                return document.body.scrollTop || document.documentElement.scrollTop
            },
            resizeIframe: function(e, o) {
                var n = this;
                this.iframeResizeTimeout &&
                    (
                        clearTimeout(this.iframeResizeTimeout),
                        this.iframeResizeTimeout = null
                    ),
                    this.iframeResizeTimeout = window.setTimeout((function() {
                        var r = window.innerWidth - n.getSideBarOffsetValue(),
                            s = n.getHeight() - n.getTopBarOffsetValue();
                        n.iframe &&
                            (
                                n.iframe.style.width = r + "px",
                                n.iframe.style.height = s + "px"
                            ),
                            n.scrollToTop(!!e),
                            o &&
                            (
                                n.offsetChangeMessageTimeout && (clearTimeout(n.offsetChangeMessageTimeout),
                                n.offsetChangeMessageTimeout = null),
                                n.offsetChangeMessageTimeout = window.setTimeout((function() {
                                    n.postOffsetChangeMessage(), t = !1, i = !1
                                }), 20)
                            )
                    }), 100)
            },
            createIframe: function(e) {
                var t, i = this;
                e
                    ? (t = document.querySelector("#" + e)) || console.error("iFrame element with ID:" + e + " was not found")
                    : ((t = document.createElement("iframe")).setAttribute("id", "iframe"),
                        t.setAttribute("scrolling", "no"),
                        t.setAttribute("allowfullscreen", ""),
                        t.setAttribute("webkitallowfullscreen", ""),
                        t.src = window.EvolutionGaming.url,
                        document.body.appendChild(t)),
                        this.iframe = t,
                        this.detectIos(),
                        this.detectIPhoneWithTextIncreaseBug(),
                        this.setBodyHeight(),
                        this.setMaxWidthHeight(),
                        this.resizeIframe();
                var o = navigator.userAgent;
                this.isChrome = !(!o.match(/Chrome\/([0-9._]*)/i) && !o.match(/CriOS\/([0-9._]*)/i)), this.iOS && this.isChrome && (document.documentElement.style.height = "150vh"), this.iframe && (this.iframe.onload = function() {
                    i.resizeIframe(!1)
                })
            },
            scrollEventHandler: function() {
                var e = this;
                this.scrollTimeout && (clearTimeout(this.scrollTimeout), this.scrollTimeout = null), i && (t = !0), this.scrollTimeout = setTimeout((function() {
                    e.resizeIframe(!1)
                }), 200)
            },
            resizeEventHandler: function() {
                var e = this;
                this.resizeTimeout && (clearTimeout(this.resizeTimeout), this.resizeTimeout = null), this.resizeTimeout = window.setTimeout((function() {
                    e.resizeIframe(!0, !0)
                }), 400)
            },
            triggerEvent: function(e, t) {
                var i = this;
                (this.eventObject[e] || []).slice().forEach((function(e) {
                    return e.call(i, t)
                }))
            },
            postMessageHandler: function(e) {
                console.log('[postMessageHandler]', e);
                var t = e.data,
                    i = t.type,
                    o = t.payload;
                switch (i) {
                    case "IFRAME_HANDLER_READY":
                        this.postOffsetChangeMessage();
                        break;
                    case "EVENT_FIELD_FOCUS":
                        this.isFocused = !0;
                        break;
                    case "EVENT_FIELD_BLUR":
                        this.isFocused = !1;
                        break;
                    case "GAME_STATE_BETS_OPENED":
                        this.triggerEvent("BETS_OPEN", o), this.triggerEvent(i, o);
                        break;
                    case "GAME_STATE_BETS_CLOSED":
                        this.triggerEvent("BETS_CLOSED", o), this.triggerEvent(i, o);
                        break;
                    case "IOS_FULL_SCREEN_STATE_CHANGED":
                        this.fixiOSChromeScrollPosition(o);
                        break;
                    case "DISABLE_SWIPE_TO_PLAY":
                        this.iOS && this.isChrome && (document.documentElement.style.height = "");
                        break;
                    default:
                        i && this.triggerEvent(i, o)
                }
            },
            postOffsetChangeMessage: function() {
                var e, t, i = this.getTopBarOffsetValue();
                null === (t = null === (e = this.iframe) || void 0 === e ? void 0 : e.contentWindow) || void 0 === t || t.postMessage({
                    type: "IFRAME_OFFSET_CHANGE",
                    offset: i
                }, "*")
            },
            getTopBarOffsetValue: function() {
                var t = this.getOrientation(),
                    i = window.EvolutionGaming.topBarLandscape,
                    o = window.EvolutionGaming.topBarPortrait;
                return i > 0 || o > 0 ? t === e ? i : o : window.EvolutionGaming.getTopBarHeight()
            },
            getSideBarOffsetValue: function() {
                return this.getOrientation() === e ? window.EvolutionGaming.sideBarLandscape : 0
            },
            getOrientation: function() {
                return window.innerWidth > window.innerHeight ? e : "portrait"
            }
        };

    function n() {
        o.resizeEventHandler()
    }

    function r() {
        o.scrollEventHandler()
    }

    function s() {
        t = !1
    }

    function a(e) {
        o.postMessageHandler(e)
    }

    function l() {
        "visible" === document.visibilityState && n()
    }

    function c(e) {
        i = !0, t && e.preventDefault()
    }

    function u() {
        window.EvolutionGaming.topBar = window.EvolutionGaming.getTopBarHeight(),
        o.createIframe(window.EvolutionGaming.iframeId),
        document.addEventListener("visibilitychange", l),
        window.addEventListener("resize", n),
        window.addEventListener("scroll", r),
        window.addEventListener("touchend", s),
        window.addEventListener("message", a),
        document.body.addEventListener("touchmove", c, {
            passive: !1,
            capture: !1
        }), document.body.addEventListener("touchstart", c, {
            passive: !1,
            capture: !1
        }), document.removeEventListener("DOMContentLoaded", u)
    }
    window.EvolutionGaming = {
        authToken: "",
        url: "",
        topBar: 0,
        offset: 0,
        topBarLandscape: 0,
        topBarPortrait: 0,
        sideBarLandscape: 0,
        iframeId: "",
        allowFullscreen: !1,
        init: function(e) {
            this.loadGame(e)
        },
        loadGame: function(e) {
            e &&
            (this.authToken = e.authToken || "",
                this.url = e.url || "",
                this.offset = e.offset || 0,
                this.topBar = e.topBar || e.offset || 0,
                this.topBarLandscape = e.topBarLandscape || 0,
                this.topBarPortrait = e.topBarPortrait || 0,
                this.sideBarLandscape = e.sideBarLandscape || 0,
                this.iframeId = e.iframeId || "",
                this.allowFullscreen = e.allowFullscreen || !1,
                e.getTopBarHeight && (this.getTopBarHeight = e.getTopBarHeight),
                "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", u) : u())
        },
        getTopBarHeight: function() {
            return this.topBar
        },
        exitFullScreen: function() {
            (document.exitFullscreen || document.webkitExitFullscreen || document.webkitCancelFullScreen).call(document)
        },
        removeEventListeners: function() {
            window.removeEventListener("resize", n),
            window.removeEventListener("scroll", r),
            window.removeEventListener("message", a),
            document.removeEventListener("DOMContentLoaded", u),
            document.removeEventListener("visibilitychange", l),
            document.body.removeEventListener("touchmove", c, {
                capture: !1
            }), document.body.removeEventListener("touchstart", c, {
                capture: !1
            })
        },
        on: function(e, t) {
            o.eventObject[e] = (o.eventObject[e] || []).concat(t)
        }
    }
})();
