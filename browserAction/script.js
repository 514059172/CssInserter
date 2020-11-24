/* eslint-disable no-undef */
const applyStoreButton = document.getElementsById('applyStore');
const storeButton = document.getElementById('store');
const titleInput = document.getElementById('title');
const cssInput = document.getElementById('content');
const BUTTON_CONTENT_A = `Apply CSS`;
const BUTTON_CONTENT_B = `Remove CSS`;
const defaultText = `Please input some css code`;
// let cssContent = cssTextarea.value;
let cssContent = 'body{border:5px solid red;}';

function onError(e) {
  console.log(e);
}

function init() {
  let gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((result) => {
    for (let i of result) {
      display(i);
    }
  }, onError);
}

function apply(cssObject) {
  // not consider the situation duplicate
  browser.tabs.insertCSS({ code: cssObject[cssCode] });
}

function enableButton() {
  //run when user input event
  if (titleInput.value !== '' && cssInput.value !== '') {
    applyStoreButton.disabled = false;
    storeButton.disabled = false;
  } else {
    applyStoreButton.disabled = true;
    storeButton.disabled = true;
  }
}

function addEntry() {
  // run when user click store button.
  // 判断输入的title是否重如果重复则不添加
  // 待完善提醒用户输入重复.
  let entry = { title: titleInput.value, cssCode: cssInput.value };
  let gettingItem = browser.storage.local.get(titleInput);
  gettingItem.then((result) => {
    let resultKeys = Object.keys(result);
    if (resultKeys.length < 1) {
      titleInput.value = '';
      cssInput.value = '';
      storeEntry(entry);
    }
  }, onError);
}

button.addEventListener('click', () => {
  if (button.textContent === BUTTON_CONTENT_A) {
    browser.tabs.insertCSS({ code: cssContent });
    button.textContent = BUTTON_CONTENT_B;
  } else {
    browser.tabs.removeCSS({ code: cssContent });
    button.textContent = BUTTON_CONTENT_A;
  }
});
cssTextarea.addEventListener('click', (e) => {
  if (e.target.textContent === defaultText) {
    e.target.textContent = '';
  }
});
