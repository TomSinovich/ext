const contexts = ["selection"];

function genericOnClick(info, tab) {
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
}

// Create one test item for each context type.

for (let i = 0; i < contexts.length; i++) {
  let context = contexts[i];
  let title = "Test '" + context + "' menu item";
  let parent = chrome.contextMenus.create({
    title: title,
    contexts: [context],
    id: contexts[i],
  });
  const child1 = chrome.contextMenus.create({
    title: "Child 1",
    parentId: parent,
    id: `empName${parent}`
  });
}
