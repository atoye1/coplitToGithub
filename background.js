import { checkRepoExists, checkFileExists, createNewFile, createRepo, createCommit } from './scripts/api.js';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenu.create({
//     "id": "sampleContextMenu",
//     "title": "Sample Context Menu",
//     "contexts": ["selection"],
//   });
// });

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");

  if (request.action === "FINISH")
    sendResponse({ farewell: "goodbye" });
});

// chrome.runtime.onMessage.addListener((message, sender, reply) => {
//   chrome.runtime.onMessage.removeListener(event);
// });
// // This will run when a bookmark is created.
// chrome.bookmarks.onCreated.addListener(() => {
//   // do something
// });

//https://developer.chrome.com/docs/extensions/mv3/service_workers/
//https://projecteli.tistory.com/203