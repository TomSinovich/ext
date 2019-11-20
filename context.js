const contexts = ["selection"];

// let keys = {};

const context = chrome.contextMenus.create({
  title: "Paste Cover Letter",
  contexts: ["editable"],
  id: "paste"
});

const setValParent = chrome.contextMenus.create({
  title: "Set value",
  contexts: [contexts[0]],
  id: "set"
});

function chromeStorageOperation(action, key, func) {
  chrome.storage.sync[action](key, result => {
    func(result);
  });
}

function genericOnClick(info, tab) {
  const { menuItemId, selectionText, parentMenuItemId } = info;
  const { windowId, id } = tab;
  // console.log("item " + info.menuItemId + " was clicked");
  // console.log("info: " + JSON.stringify(info));
  // console.log("tab: " + JSON.stringify(tab));

  // if (Object.keys(keys).includes(menuItemId)) {
  //   keys[menuItemId] = selectionText;
  // } else {
  //   console.log('hey')
  // }
  // console.log(keys)
  // chromeStorageOperation('set', 'window')
}

keys.forEach(key => {
  // keys[key] = null;
  chrome.contextMenus.create({
    title: key,
    parentId: setValParent,
    contexts: [contexts[0]],
    id: key
  });
});

chrome.contextMenus.onClicked.addListener(genericOnClick);
