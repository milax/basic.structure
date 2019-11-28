import EventEmitter from './event-emitter/event-emitter.js';

const nativeAppPlatform = location.search.toLowerCase().match(/nativeappplatform=([^&?]+)/)[1];
const eventEmitter = new EventEmitter(nativeAppPlatform);

(function(w) {
    w.Cashier = goToCashier;
    w.SwitchToMoney = switchToMoney;
    w.Chat = openChat;
    w.ContactUs = showContactUs;
    w.Logout = logout;
    w.SessionTimeout = onSessionTimeout;
    w.Lobby = goToLobby;
    w.AccountHistory = goToAccountHistory;
    w.PlayLimitSettings = goToPlayLimitSettings;
    w.ShowClaimHistory = goToClaimHistory;
    w.openPage = openPage;

    function openPage(key, customInfo) {
        eventEmitter.emit('mwc.instantGame.openPage', {key, customInfo});
    }

    function goToCashier(bonusPolicyId) {
        eventEmitter.emit('mwc.instantGame.goToCashier', {bonusPolicyId});
    }

    function switchToMoney() {
        eventEmitter.emit('mwc.instantGame.switchToMoneyMode');
    }

    function openChat() {
        eventEmitter.emit('mwc.instantGame.openChat');
    }

    function showContactUs() {
        eventEmitter.emit('mwc.instantGame.showContactUs');
    }

    function logout() {
        eventEmitter.emit('mwc.instantGame.logout');
    }

    function onSessionTimeout(event) {
        switch (event) {
            case 'LoginExpired':
                eventEmitter.emit('mwc.instantGame.loginExpired');
                break;
            case 'EndSession':
                eventEmitter.emit('mwc.instantGame.endSession');
                break;
        }
    }

    function goToLobby() {
        debugger;
        eventEmitter.emit('mwc.instantGame.goToLobby');
    }

    function goToAccountHistory() {
        eventEmitter.emit('mwc.instantGame.goToAccountHistory');
    }

    function goToPlayLimitSettings() {
        eventEmitter.emit('mwc.instantGame.goToPlaylimitSettings');
    }

    function goToClaimHistory() {
        eventEmitter.emit('mwc.instantGame.goToClaimHistory');
    }

})(window);
