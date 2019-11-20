chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.method) {
    case "getSelectin":
      sendResponse({ data: window.getSelection().toString() });
      break;
    default:
      sendResponse({});
  }
});
