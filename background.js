// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

//*******variables

let keys = [
  "Employer Name",
  "Job Title",
  "Flattery",
  "Candidate Quality",
  "Job d keyword"
];
const contexts = ["selection"];

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

//******functions

function chromeStorageOperation(action, key, func) {
  chrome.storage.sync[action](key, result => {
    func(result);
  });
}

function genericContextMenuClick(info, tab) {
  const { menuItemId, selectionText, parentMenuItemId } = info;
  const { windowId, id } = tab;
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

//******listeners

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set(
    {
      keys: [...keys],
      tabData: {}
    },
    function() {
      console.log("data initialized!");
    }
  );
});

chrome.runtime.onMessage.addListener(function(req, sender, sendResponse) {
  console.log("adfasdfasdfasdfa", req, sender);
  sendResponse({ message: "message received, this is the response" });
});

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            schemes: ["http", "https"]
          }
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }
  ]);
});

chrome.tabs.onCreated.addListener(tab => {
  chrome.storage.sync.get(["tabData"], res => {
    console.log(res.tabData);
    const newTabData = {
      ...res.tabData,
      [tab.id]: {}
    };
    for (let key in keys) {
      let word = keys[key];
      console.log(key);
      if (word === "Candidate Quality" || word === "Job d keyword") {
        newTabData[tab.id][word] = [];
      } else {
        newTabData[tab.id][word] = null;
      }
    }
    chrome.storage.sync.set({ tabData: newTabData });
  });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  chrome.storage.sync.get(["tabData"], res => {
    const newTabData = { ...res.tabData };
    delete newTabData[tabId];

    chrome.storage.sync.set({ tabData: newTabData });
  });
});

chrome.contextMenus.onClicked.addListener(genericContextMenuClick);

//*******exectue

keys.forEach(key => {
  // keys[key] = null;
  chrome.contextMenus.create({
    title: key,
    parentId: setValParent,
    contexts: [contexts[0]],
    id: key
  });
});
