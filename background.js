import {
  getItemStorageLocalData,
  getAllStorageLocalData,
} from './js/LocalStorage.js';

async function getTabInfo(tabId) {
  chrome.tabs.get(tabId, async (tab) => {
    let muted = !tab.mutedInfo.muted;
    // await chrome.tabs.update(tabId, { muted });
    await new Promise((s) => setTimeout(s, 500));
    console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
    console.log(tab);
  });
}
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.sendMessage(
      tabId,
      {
        action: 'getTitle',
      },
      function (response) {
        console.log(`TabId: ${tabId}`);
        console.log(changeInfo);
        console.log(new Date());
        console.log(`Content.js → Background.js ${response}`);
        chrome.tabs.get(tabId, (tab) => {
          console.log(tab);
        });
        if (!chrome.runtime.lastError) {
          // message processing code goes here
        } else {
          // error handling code goes here
          console.log(chrome.runtime.lastError);
        }
      }
    );
    getTabInfo(tabId);
  }
  console.log(new Date());
});

async function awaitsleep(res) {
  if (res == 2) {
    await new Promise((s) => setTimeout(s, 5000));
  }
  console.log(res);
  console.log(getAllStorageLocalData());
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    console.log(tabs);
  });
  awaitsleep(request);
  sendResponse();
  return true;
});
/**
 * Promise wrapper for chrome.tabs.sendMessage
 * @param tabId
 * @param item
 * @returns {Promise<any>}
 */
function sendMessagePromise(tabId, item) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, { item }, (response) => {
      if (response.complete) {
        resolve();
      } else {
        reject('Something wrong');
      }
    });
  });
}
const handleRequest = (request, sender, sendResponse) => {
  console.info('Request received...');

  if (request && request.id > 0) {
    doLogic(request.id, sendResponse);

    // return true to send the response asynchronously
    return true;
  } else {
    // send synchronous response object back with an error message
    sendResponse({ success: false, message: 'Invalid Id received' });
  }
};
