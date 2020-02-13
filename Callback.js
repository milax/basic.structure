/* jshint ignore:start */

/*
 * This is NOT an angular file.
 * Used by SERVER to call into MWC Angular App Routes.
 * Do NOT change function names.
 */

/*
    Cashier action has been requested by the client
*/
function Cashier(bonusPolicyId) {
	console.log("Callback.js: Cashier");
	debugger;
    // get query string
    var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "gamecashier" }];
    var url = generateUrl(additionalParams, true);

    if (bonusPolicyId) {
        url = updateQueryString('bpid', bonusPolicyId, url);
    }

    redirectToLink(url);
}

/*
    Switch to money action has been requested by the client
*/
function SwitchToMoney() {
	console.log("Callback.js: SwitchToMoney");
	debugger;	
    var url = window.location.href;

    var canUserPlayMoneyMode = !!getQueryString('ISID') // player is logged in 
        && EnvData.MMA // Money mode is allowed for player
        && (!EnvData.GLVE || EnvData.PIVL) // When GeoLocation flow enabled(EnvData.GLVE) player must be in allowed location(EnvData.PIVL)

    if (canUserPlayMoneyMode) {
        url = updateQueryString('REQUESTEDPLAYMODE', 'M', url);
        url = updateQueryString('PlayMode', 'M', url);
    }
    else {
        var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "StMoney" }];
        url = generateUrl(additionalParams, false);
    }

    redirectToLink(url);
}


/*
    Chat action has been requested by the client
*/
function Chat() {
    window.location.href = RedirectURL;
}

/*
    ContactUs action has been requested by the client
*/
function ContactUs() {
    var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "contact" }];
    generateUrlAndRedirect(additionalParams, false);
}

/*
    Logout action has been requested by the client
*/
function Logout() {
	console.log("Callback.js: Logout");
	debugger;		
    var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "logout" }];
    generateUrlAndRedirect(additionalParams, false);
}

function PausePlay(){
    var url = EnvData.PauseplayUrl;

    if (url) {
        redirectToLink(url);
    }
}

function Selftest(){
    var url = EnvData.SelftestUrl;

    if (url) {
        redirectToLink(url);
    }
}

function DepositLimits(){
    var gameId = GameData.GID;
    var playMode = GameData.PM;

    if (gameId && playMode) {
        var additionalParams = [{key: 'action', value: 'depositLimit'}, { key: 'backToTheGame', value: gameId }, { key: 'playMode', value: playMode }];
        generateUrlAndRedirect(additionalParams, false);
    }
}

/*
    Session Timeout flow
*/
function SessionTimeout(event) {
	console.log("Callback.js: SessionTimeout");
	debugger;		
    var action;
    switch (event) {
        case "LoginExpired":
            action = "loginexpired";
            break;
        case "EndSession":
            action = "sessiontimeout";
            break;
    }

    var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: action }];
    generateUrlAndRedirect(additionalParams, false);
}

/*
HostingSystemAPIError - Error was received from the hosting system API, and not mapped to specific action inside the client.
errorCode - integer variable - Represents the error code received by the Hosting system.
errorMessage - String variable - Represents the error Message received by the Hosting system.
*/
function HostingSystemAPIError(errorCode, errorMessage) {
}

/* 
    NGSystemError - Error detected on NG system
    errorCode - integer variable - Represents the error code received by Neogames system.
    errorMessage - String variable - Represents the error Message received by Neogames system.
    Possible Error codes:
    154 - Multiple sessions
    100 - Session Time out.
    200 - Login Failure
*/
function NGSystemError(errorCode, errorMessage) {
    ShowMessagePopup("GenericMessage", errorCode, null);
}

/*
    Callback method called by game whenever the server returns to the game an
    indication that a dialog should be shown
*/
function ShowDialog(pSSDLG, pCustomInfo) {
    ShowMessagePopup(pSSDLG, null, pCustomInfo);
}

/* 
    Generic event which called on popup closing
*/
function MessagePopUpClosed() {
    resumeGame();
}

/*
	Called whenever the game should be reloaded
*/
function ReloadGame() {
	console.log("Callback.js: ReloadGame");
	debugger;		
	var url = removeQueryString("FreeGamePlayerBonusID", window.location.href)
	redirectToLink(url);
}

var IsExternalGame = false;

/*
    Called whenever the player exits the game
*/
function Lobby(lobbyUrl) {
	console.log("Callback.js: Lobby");
	debugger;	
    // set query string parameters    
    var url = getBaseUrl();
    if (!url && lobbyUrl) {
        url = lobbyUrl;
    }
    else {
        var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "lobby" }, { key: "bonusOffer", value: "1" }];
        url = generateUrl(additionalParams, true);
        url = removeQueryString('GAMESELECTED', url);
    }

    redirectToLink(url);
}

/*
    Called whenever the player exits the game
*/
function AccountHistory() {
    var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "gameshistory" }, { key: "selectedgametype", value: "IG" }];
    generateUrlAndRedirect(additionalParams, true);
}

/*
    Called whenever the player exits the game
*/
function PlayLimitSettings() {
    var additionalParams = [{ key: "referral", value: "true" }, { key: "action", value: "playlimitsettings" }];
    generateUrlAndRedirect(additionalParams, true);
}

/*
    Show Claim History has been requested by the client
*/
function ShowClaimHistory() {
    var additionalParams = [{ key: "neoDl", value: "pendingprizeshistory" }];
    generateUrlAndRedirect(additionalParams, true);
}

/*
    Get pair value

    pKeyValuePairs - stores key value pairs
    pKey would be used to pull it's matching value, or empty string if such key wasn't found

*/
function getPairValue(pKeyValuePairs, pKey) {

    var strResult = ""; // default is empty string
    // Remove first '?' character
    if (pKeyValuePairs && pKeyValuePairs.substring(0, 1) == '?') {
        pKeyValuePairs = pKeyValuePairs.substring(1);
    }
    var arrKeyValuePairs = pKeyValuePairs.split('&');

    var intIndex = 0;

    // Loop through key value pairs collection as long as no match was found
    while (intIndex < arrKeyValuePairs.length && strResult == "") {

        var arrKeyValuePair = arrKeyValuePairs[intIndex].split('=');

        if (arrKeyValuePair[0] == pKey) {

            // A match was found - update result
            strResult = decodeURIComponent(arrKeyValuePair[1]);
        }

        intIndex++;
    }

    return strResult;
}


function updateQueryString(key, value, url) {
    if (!url) url = window.location.href;
    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi");

    if (re.test(url)) {
        if (typeof value !== 'undefined' && value !== null)
            return url.replace(re, '$1' + key + "=" + value + '$2$3');
        else {
            var hash = url.split('#');
            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
    }
    else {
        if (typeof value !== 'undefined' && value !== null) {
            var separator = (url.indexOf('&') !== -1) ? '&' : '?',
                hash = url.split('#');
            url = hash[0] + separator + key + '=' + value;
            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                url += '#' + hash[1];
            return url;
        }
        else
            return url;
    }
}

function removeQueryString(key, url) {
    var hostUrl = '';
    if (url.indexOf('?') !== -1) {
        hostUrl = url.substring(0, url.indexOf('?') + 1);
        url = url.substring(url.indexOf('?') + 1);
    }
    // get params without '?'
    var params = url.split('&');

    // Delete all parameters that needs to delete
    for (var i = 0; i < params.length; i++) {
        var parameter = params[i].split('=')[0];
        if (parameter.toLowerCase() == key.toLowerCase()) {
            params.splice(i, 1);
            i--;
        }
    }

    // Return all joined params
    return hostUrl + params.join('&');
}

/*
 * For "Free Round Conclusion" popup (when FG bonus 
 * fully completed and need to move to money mode).
 * Handles game reloading process initiated by game, 
 * after this function game calls ReloadGame() 
 * (in this file also).
 */
function freeGamesComplete() {
    sessionStorage.FreeGamesEnded = 1;
}
/*
 * For "Free Round Partial Conclusion" popup (when FG 
 * bonus fully completed, but there is another one for 
 * the same game, so need to reload game in Free mode).
 * Handles game reloading process initiated by game, 
 * after this function game calls ReloadGame() (in this 
 * file also).
 */
function freeRoundsPartialComplete() {
	sessionStorage.FreeGamesEnded = 1;
}

var paramsToDelete = ['baseUrl'];

function formquerystring(queryString) {

    var params = queryString.split('&');

    // Delete all parameters that needs to delete
    for (var i = 0; i < params.length; i++) {
        var parameter = params[i].split('=')[0];
        for (var j = 0; j < paramsToDelete.length; j++) {
            if (parameter.toLowerCase() == paramsToDelete[j].toLowerCase()) {
                params.splice(i, 1);
                i--;
                break;
            }
        }

    }

    // Return all joined params
    return params.join('&');
}

function redirectToLink(url) {
    window.top.location.href = url;
}

function getSeparatorFromUrl(url) {
    return url.indexOf('?') !== -1 ? '&' : '?';
}

function getBaseUrl() {
    var strQSParameters = sessionStorage.NG_QSParameters || document.location.search.substr(1);
    return getPairValue(strQSParameters, 'baseUrl').toString();
}

function getQSParameters() {
    var strQSParameters = sessionStorage.NG_QSParameters || document.location.search.substr(1);

    if (typeof IsExternalGame === 'undefined' || !IsExternalGame) {
        // for ng 
        strQSParameters = document.location.search.substr(1);
    }

    strQSParameters = formquerystring(strQSParameters);
    return strQSParameters;
}

function hideLayoutForExternalGame() {
    if (IsExternalGame) {
        // hide layout and use black background color till redirection is done
        document.body.style.background = 'black';
        $("#GlobalContainer").hide();
    }
}

function checkFreeGamesEnded(url) {
    if (sessionStorage.FreeGamesEnded) {
        url += '&freeGamesEnded=1';
        sessionStorage.removeItem('FreeGamesEnded');
    }

    return url;
}

function cashierAfterFreeGamesCompleted(bonusPolicyId) {
    freeGamesComplete();
    Cashier(bonusPolicyId);
}

/*
    Get query string value of the given key name
*/
function getQueryString(key) {
    var params = document.location.search.split('&');
    var param = key;
    for (var i = 0; i < params.length; i++) {
        if (params[i].split('=')[0] == param) {
            return params[i].split('=')[1];
        }
    }
}

function updateMoneyMode() {
    if (!!getQueryString('ISID')) {

    }
}

function generateUrl(queryStringParams, checkFreeGameEnded) {
    hideLayoutForExternalGame();

    var strQSParameters = getQSParameters();
    var url = getBaseUrl();
    url = url + getSeparatorFromUrl(url) + strQSParameters;

    for (var i = 0; i < queryStringParams.length; i++) {
        url = updateQueryString(queryStringParams[i].key, queryStringParams[i].value, url);
    }

    if (checkFreeGameEnded == true) {
        url = checkFreeGamesEnded(url);
    }

    return url;
}

function generateUrlAndRedirect(queryStringParams, checkFreeGameEnded) {
    var url = generateUrl(queryStringParams, checkFreeGameEnded);
    redirectToLink(url);
}

/* jshint ignore:end */
