// Put all the javascript code here, that you want to execute in background.
function onCreated(tab) {
  console.log(`success to open tab ${tab.id}`);
}

function onError(e) {
  console.log(`creat new tab failed with error:${e}`);
}
browser.browserAction.onClicked.addListener(creatTabs);
function creatTabs() {
  const creatingTab = browser.tabs.create({
    active: true,
    url: `/testPage/index.html`,
  });
  creatingTab.then(onCreated,onError);
}
