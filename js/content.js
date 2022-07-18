'use strict';
console.log('module');

import { test } from './module1.js';
import { elementReady } from './element-ready.js';
import { sleep, jstDate, formatDate } from './common.js';
test();

window.addEventListener('load', () => {
  // createShadowDom()
  console.log('load');
  if (window !== parent) return;
  //   await new Promise((resolve) => setTimeout(resolve, 1000));

  //   createShadowDom();
  //   let notification = new Notification('Hi there!');
});

/**
 * Description
 * @param {any} (request
 * @param {any} sender
 * @param {any} sendResponse
 * @returns {any}
 */
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('onMessage');
  console.log(request);
  if (request.action !== 'getTitle') return;
  sendResponse(1);
  return true;
});

async function createShadowDom(rootClassName) {
  const url = new URL(location.href);
  const iframe = document.createElement('iframe');
  const el = document.createElement('div');
  el.classList.add((rootClassName = 'shadowDom'));

  const root = el.attachShadow({ mode: 'closed' });
  iframe.width = '100%';
  const p = document.createElement('p');
  p.textContent = 'aaaaaaaab';
  const div = document.createElement('div');
  div.appendChild(iframe);
  root.appendChild(
    document.createElement('style')
  ).textContent = `:host { color:red;border:1px solid red; }
        :host(div){position:relative;width:1000px}
        :host(iframe) {position: absolute;diplay:block;top: 0;left: 0;width: 100%important;}`;
  // ':host { display: none !important }';
  root.appendChild(p);
  root.appendChild(div);
  iframe.src = url.origin;
  document.body.appendChild(el);
  // const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log('直');
  console.log(iframe.contentDocument.documentElement);
  const elem = await elementReady('a', iframe.contentDocument);
  console.log(elem);
  iframe.contentDocument.querySelector('[name="q"]').value = 'aaaaa';
  iframe.contentDocument.querySelector('[name="btnK"]').click();

  // postMessage({
  //     action: 'SyncMessage',
  //     message: 'Hello'
  // }, '*');
}

[1, 2, 3].forEach((x) => {
  console.log(x);
  chrome.runtime.sendMessage(x);
});

window.addEventListener('message', function (e) {
  // if (event.origin !== "https://example.com")  //送信元のドメインが明確な場合は、チェックすることが強く推奨されています
  //   return;
  // console.log('こっちがWindow');
  // console.log(`chrome-extension://${chrome.runtime.id}`);
});
const showModal = async () => {
  const modal = document.createElement('dialog');
  window.addEventListener('message', function (e) {
    console.log(`e.origin ${e.origin}`);
    if (e.origin !== `chrome-extension://${chrome.runtime.id}`) return;
    console.log('走ってる？');
    switch (e.data.action) {
      case 'SyncMessage':
        console.log('message');
        console.log(e);
        const iframe = document.getElementById('popup-content');
        iframe.height = e.data.message.height;
        iframe.width = e.data.message.width;

        break;
      case 'deleteDialog':
        console.log(document.getElementById('popup-content').parentNode);
        document.getElementById('popup-content').parentNode.remove();
        break;
    }
    // if (e.data.action === 'deleteDialog') {
    //   console.log(document.getElementById('popup-content').parentNode);
    //   document.getElementById('popup-content').parentNode.remove();
    // }
  });
  // modal.setAttribute(
  //   'style',
  //   `
  // height:450px;
  // border: none;
  // top:150px;
  // border-radius:20px;
  // background-color:white;
  // position: fixed; box-shadow: 0px 12px 48px rgba(29, 5, 64, 0.32);
  // `
  // );
  modal.innerHTML = `<iframe id="popup-content"; ></iframe>
  <div style="position:absolute; top:0px; left:5px;">
  <button style="padding: 8px 12px; font-size: 16px; border: none; border-radius: 20px;">x</button>
  </div>`;
  document.body.appendChild(modal);
  const dialog = document.querySelector('dialog');
  dialog.showModal();
  const iframe = document.getElementById('popup-content');
  const html = chrome.runtime.getURL('infobox.html');
  iframe.src = html;
  iframe.addEventListener('load', () => {
    iframe.contentWindow.postMessage(
      {
        action: 'transferOrigin',
        message: window.origin,
      },
      '*'
    );
  });

  console.log({
    action: 'transferOrigin',
    message: window.origin,
  });

  // elementReady('.main-container', iframe.contentDocument).then((element) => {
  //   const height = iframe.contentDocument.body.clientHeight;
  //   const width = iframe.contentDocument.body.clientWidth;
  //   console.log(height);
  //   iframe.height = height;
  //   iframe.width = width;
  // });

  iframe.frameBorder = 0;
  dialog.querySelector('button').addEventListener('click', () => {
    dialog.close();
  });
};
// showModal();
document.addEventListener('dblclick', (e) => {
  showModal();
});
console.log(chrome.runtime.id);
console.log(chrome.runtime.getURL(''));
// Get frameId of current window.
let frameId = chrome.runtime.frameId;
// console.log(chrome.tabs.getCurrent());
