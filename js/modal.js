const submit = document.getElementById('submit');
// const height = document.body.clientHeight;
// const width = document.body.clientWidth;
const height = document.body.parentNode.scrollHeight;
const width = document.body.scrollWidth;
console.log({ height, width });
console.log(window.location.origin);

let parentOring;

// window.parent.postMessage(
//   {
//     action: 'SyncMessage',
//     message: { height, width },
//   },
//   /** 拡張のURLを渡す */
//   // `chrome-extension://${chrome.runtime.id}`
//   parentOring
// );

document.addEventListener('click', function (e) {
  console.log(`chrome-extension://${chrome.runtime.id}`);
  switch (e.target.id) {
    case 'cancel':
      window.parent.postMessage(
        {
          action: 'deleteDialog',
          message: 'popup-content',
        },
        parentOring
      );

    case 'submit':
  }
  const radio = document.querySelector('input[type="radio"]:checked');
  console.log(radio);
});
window.addEventListener('message', function (e) {
  console.log('子フレーム');
  console.log(e);
  // this.document.querySelector('textarea').textContent = '123';
  parentOring = e.origin;
  e.source.postMessage(
    {
      action: 'SyncMessage',
      message: { height, width },
    },
    e.origin
  );
});

let frameId = chrome.runtime.frameId;
console.log(frameId);
