/*

    Project name
    JavaScript functions

    Author: Author / www.site.com
    Copyright: 2013, Author. All rights resevered

-----------------------------------------------------------------------*/

var ProjectName = ProjectName || {};

(function ($) {

    // ==========================================================================
    // Utils used on the sites
    // ==========================================================================
    ProjectName.Utils = function() {

        /* Ajax wrapper
           @options - custom options
           ========================================================================== */
        this.ajax = function(options) {
            var ajaxPostType = 'post',
                ajaxContentType = 'application/json; charset=utf-8',
                ajaxDataType = 'json',
                defaults = {
                    type: ajaxPostType,
                    contentType: ajaxContentType,
                    dataType: ajaxDataType,
                    url: '',
                    success: function(result) {
                        var res = eval(result); res = eval('(' + res.d + ')');
                        if ($.isFunction(options.callBack)) options.callBack(res);
                    },
                    error: function(xmlHttpRequest) {
                        if ($.isFunction(options.serverError)) {
                            options.serverError(xmlHttpRequest);
                        }
                    }
                };

            if(options.post && options.post.toLoweCase() === 'post') {
                defaults.data = {};
            }

            var opts = $.extend({ }, defaults, options);
            opts.data = $.toJSON(opts.data);
            $.ajax(opts);
        };
    };

    // ==========================================================================
    // Site options
    // ==========================================================================
    ProjectName.Opts = function() {

        var ua = navigator.userAgent.toLowerCase(),
            that = this;

        /* user's browser
           ========================================================================== */
        this.browser = {
            version: (ua.match( /.+(?:me|ox|on|rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [0,'0'])[1],
            opera: /opera/i.test(ua),
            msie: (/msie/i.test(ua) && !/opera/i.test(ua)),
            msie6: (/msie 6/i.test(ua) && !/opera/i.test(ua)),
            msie7: (/msie 7/i.test(ua) && !/opera/i.test(ua)),
            msie8: (/msie 8/i.test(ua) && !/opera/i.test(ua)),
            msie9: (/msie 9/i.test(ua) && !/opera/i.test(ua)),
            mozilla: /firefox/i.test(ua),
            chrome: /chrome/i.test(ua),
            safari: (!(/chrome/i.test(ua)) && /webkit|safari|khtml/i.test(ua)),
            iphone: /iphone/i.test(ua),
            ipod: /ipod/i.test(ua),
            iphone4: /iphone.*OS 4/i.test(ua),
            ipod4: /ipod.*OS 4/i.test(ua),
            ipad: /ipad/i.test(ua),
            safari_mobile: /iphone|ipod|ipad/i.test(ua),
            android: /android/i.test(ua),
            opera_mobile: /opera mini|opera mobi/i.test(ua),
            mobile: /iphone|ipod|ipad|opera mini|opera mobi/i.test(ua),
            mac: /mac/i.test(ua)
        };

        /* get screen width
           ========================================================================== */
        this.getScreenWidth = function() {
            return !!that.browser.mozilla ? window.innerWidth : document.documentElement.clientWidth;
        };
    };


    // =================================================
    // Document ready function
    // =================================================
    $(function() {

    });

})(jQuery);
