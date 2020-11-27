/* eslint-disable no-undef */
const applyStoreButton = document.getElementById('applyStore');
const storeButton = document.getElementById('store');
const applyButton = document.getElementById('apply');
const titleInput = document.getElementById('title');
const cssInput = document.getElementById('content');
const defaultText = `Please input some css code`;

let entryObject = {
  title: titleInput,
  cssCode: cssInput,
};

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
init();
function onError(e) {
  console.log(`get a error ${e}`);
}

function init() {
  let gettingAllStorageItems = browser.storage.local.get(null);
  gettingAllStorageItems.then((result) => {
    resultKeys = Object.keys(result);
    for (let i of resultKeys) {
      display({ titleValue: i, cssCodeValue: result[i] });
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
  gettingItem.then((result) => {
    let resultKeys = Object.keys(result); //get the property number of the result object
    if (resultKeys.length == 0) {
      storeEntry(entryObject);
      titleInput.value = '';
      cssInput.value = '';
    } else {
      console.log('entry duplicate');
    }
  }, onError);
}

function storeEntry(entryObject) {
  const objectCopy = {
    titleValue: entryObject.title.value,
    cssCodeValue: entryObject.cssCode.value,
  };
  storingEntry = browser.storage.local.set({
    [entryObject.title.value]: entryObject.cssCode.value,
  });
  storingEntry.then(() => {
    display(objectCopy);
  }, onError);
}

function display(entryValueObject) {
  const unorderedList = document.createElement('ul');
  const entryDiv = document.createElement('div');
  const listItem = document.createElement('li');
  let titleDisplayArea = document.createElement('h2');
  let cssCodeDisplayArea = document.createElement('code');
  const titleEditArea = document.createElement('input');
  const cssCodeEditArea = document.createElement('textarea');
  const deleteButton = document.createElement('button');

  titleDisplayArea.textContent = entryValueObject.titleValue;
  cssCodeDisplayArea.textContent = entryValueObject.cssCodeValue;
  deleteButton.textContent = `delete`;
  unorderedList.appendChild(listItem);
  listItem.appendChild(entryDiv);
  entryDiv.appendChild(titleDisplayArea);
  entryDiv.appendChild(cssCodeDisplayArea);
  entryDiv.appendChild(deleteButton);
  document.body.appendChild(unorderedList);

  titleDisplayArea.addEventListener('click', editEntry);
  cssCodeDisplayArea.addEventListener('click', editEntry);

  function editEntry() {
    titleDisplayArea.style.display = 'none';
    cssCodeDisplayArea.style.display = 'none';
    titleEditArea.value = titleDisplayArea.textContent;
    cssCodeEditArea.value = titleDisplayArea.textContent;
    entryDiv.insertBefore(titleEditArea, deleteButton);
    entryDiv.insertBefore(cssCodeEditArea, deleteButton);
    
  }
  function deleteEntry() {
    const removing = browser.storage.local.remove(titleDisplayArea.textContent);
    removing.then(
      () => console.log(`success to remove`),
      () => console.log(`remove from storage failed`)
    );
    listItem.remove();
  }
  deleteButton.addEventListener('click', deleteEntry);
}
