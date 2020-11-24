/* eslint-disable no-undef */
const applyStoreButton = document.getElementById('applyStore');
const storeButton = document.getElementById('store');
const applyButton = document.getElementById('apply');
const titleInput = document.getElementById('title');
const cssInput = document.getElementById('content');
const BUTTON_CONTENT_A = `Apply CSS`;
const BUTTON_CONTENT_B = `Remove CSS`;
const defaultText = `Please input some css code`;

let entryObject = {
  title: titleInput,
  cssCode: cssInput,
};

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

function apply(entryObject) {
  // not consider the situation duplicate
  browser.tabs.insertCSS({ code: entryObject.cssCode.value });
}

function enableButton() {
  //run when user input event
  if (titleInput.value !== '' && cssInput.value !== '') {
    applyStoreButton.disabled = false;
    storeButton.disabled = false;
    applyButton.disabled = false;
  } else {
    applyStoreButton.disabled = true;
    storeButton.disabled = true;
    applyButton.disabled = true;
  }
}

function addEntry(entryObject) {
  // run when user click store button.
  // 判断输入的title是否重如果重复则不添加
  // 待完善提醒用户输入重复.
  const gettingItem = browser.storage.local.get(entryObject.title.value);
  debugger
  gettingItem.then((result) => {
    let resultKeys = Object.keys(result);
    if (resultKeys.length < 1) {
      storeEntry(entryObject);
      titleInput.value = '';
      cssInput.value = '';
    } else {
      console.log('entry duplicate');
    }
  }, onError);
}

function storeEntry(entryObject) {
  storingEntry = browser.storage.local.set({
    [entryObject.title.value]: entryObject.cssCode.value,
  });
  storingEntry.then(() => {
    display(entryObject);
  }, onError);
}

function display(entryObject) {}
storeButton.addEventListener('click', () => {
  addEntry(entryObject);
});
applyButton.addEventListener('click', () => {
  apply(entryObject);
});
applyStoreButton.addEventListener('click', () => {
  apply(entryObject);
  addEntry(entryObject);
});
cssInput.addEventListener('input', enableButton);
titleInput.addEventListener('input', enableButton);
cssInput.addEventListener('click', (e) => {
  if (e.target.textContent === defaultText) {
    e.target.textContent = '';
  }
});
enableButton();
