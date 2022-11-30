import { checkRepoExists, checkFileExists, createNewFile, createRepo, createCommit } from './scripts/api.js';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenu.create({
//     "id": "sampleContextMenu",
//     "title": "Sample Context Menu",
//     "contexts": ["selection"],
//   });
// });

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");

  if (request.action === "FINISH")
    sendResponse("goodbye");
  if (request.action === "token") {
    sendResponse(localStorage.getItem('accessToken'))
  }
  if (request.action === "Commit") {
    const accessToken = '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'; // TODO make variable
    const userName = 'atoye1'; // TODO make variable
    const repoTitle = 'coplit'; // TODO make variable
    const { fileName, fileContent, commitMessage } = request;
    const isRepoExists = await checkRepoExists(userName, repoTitle)
    if (!isRepoExists) {
      await createRepo(repoTitle, accessToken);
    }
    const isFileExists = await checkFileExists(userName, repoTitle, fileName);
    if (!isFileExists) {
      await createNewFile(userName, repoTitle, fileName, fileContent, commitMessage, accessToken);
    } else {
      await createCommit(userName, repoTitle, fileName, fileContent, commitMessage, accessToken);
    }
  }
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