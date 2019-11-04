/* eslint-disable linebreak-style */
/* eslint-disable no-var */
/* eslint-disable func-names */
(function () {
    //Read query strings
    var qs = (function (a) {
        if (a === "") {
            return {};
        }
        a = a.split('&');
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length === 1) {
                b[p[0]] = "";
            } else {
                b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
            }
        }
        return b;
    })(window.location.search.substr(1));

    function getSearchQuery() {
        var query = window.location.search.substr(1);
        return query;
    }

    // Set framework preferences
    window.getFrameworkPreferences = function () {
        return {
            BrandID: '120',
            Language: 'ENG',
            Currency: 'USD',
            Platform: qs["platform"] || 'W',
            URLParams: getSearchQuery(),
            IsGameStandaloneMode: qs["IsGameStandaloneMode"] !== 'false',
            hooks: {
                onFetch
            }
        };

        function onFetch(ngApi) {
            return new Promise((resolve) => {
                const $sportIframeContainer = document.getElementById('sbtechIframeContainer');

                console.log('%c[sportbet] Executing open sport onFetch hook', 'color: green');

                ngApi
                    .openSport($sportIframeContainer)
                    .then((sbtechApi) => {
                        const $betSlipCounterView = document.getElementById('bet-slip-count');
                        const $goToBetSlipBtn = document.getElementById('bet-slip-btn');

                        sbtechApi.addEventListener('betSlipCountChange', (eventData) => {
                            $betSlipCounterView.innerText = eventData.count;
                        });
                        sbtechApi.addEventListener('setDeviceTypeAndOrientation', (eventData) => {
                            console.log('%c[sportbet] event "setDeviceTypeAndOrientation"\n', 'color:green', eventData);
                        });
                        sbtechApi.addEventListener('orientationChange', (eventData) => {
                            console.log('%c[sportbet] event "orientationChange"\n', 'color:green', eventData);
                        });
                        sbtechApi.addEventListener('setCurrentLocationMobile', (locationData) => {
                            console.log('%c[sportbet] event "setCurrentLocationMobile"\nCURRENT LOCATION in SBTECH Iframe is: ', 'color:green', locationData);
                        });
                        sbtechApi.addEventListener('isBetSlipView', (isVisible) => {
                            console.log('%c[sportbet] event "isBetSlipView"\nBet slip window is opened in sbtech:', 'color:green', isVisible);
                        });
                        $goToBetSlipBtn.addEventListener('click', () => {
                            sbtechApi.goToBetSlip();
                        });
                        resolve();
                    });
            });
        }
    };
})();
