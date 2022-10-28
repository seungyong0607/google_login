chrome.action.onClicked.addListener(function() {
  chrome.tabs.create({url: 'index.html'});
});

const REDIRECT_URL = chrome.identity.getRedirectURL();
console.log(REDIRECT_URL);
// 
// chrome.identity.getAuthToken()