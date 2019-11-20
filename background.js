// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";

let keys = [
  "Employer Name",
  "Job Title",
  "Flattery",
  "Candidate Quality",
  "Job d keyword"
];

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

chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  chrome.declarativeContent.onPageChanged.addRules([
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {
            // hostEquals:
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
      let word = keys[key]
      console.log(key)
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
