// console.log("popup says hi");

// const button = document.getElementById("testButton");

// const coverData = {
//   name: null,
//   jobD: null
// };

// const getSelection = () => {
//   chrome.tabs.query(
//     { active: true, windowId: chrome.windows.WINDOW_ID_CURRENT },
//     tab => {
//       chrome.tabs.sendMessage(
//         tab[0].id,
//         { method: "getSelection" },
//         response => {
//           const text = document.getElementById("testDiv");
//           text.innerText = response.data;
//         }
//       );
//     }
//   );
// };

// button.addEventListener("click", () => {
//   getSelection();
// });
