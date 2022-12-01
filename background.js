import { checkRepoExists, checkFileExists, createNewFile, createRepo, createCommit } from './scripts/api.js';

chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
  console.log(sender.tab ?
    "from a content script:" + sender.tab.url :
    "from the extension");

  if (request.action === "Commit") {
    try {
      console.log('Commit action triggerd');
      const auth = await chrome.storage.local.get("auth")
      if (!auth) {
        console.log('access token and user name NOT found!');
        sendResponse("NO ACCESS TOKEN or USERNAME PROVIDED")
        return;
      }
      console.log(auth);
      const accessToken = auth.auth.accessToken;
      const userName = auth.auth.userName;
      console.log('access token and user name found!', accessToken, userName);
      const repoTitle = 'coplit'; // TODO make variable
      const { fileName, fileContent, commitMessage } = request;
      const isRepoExists = await checkRepoExists(userName, repoTitle)
      if (!isRepoExists) {
        console.log('repo not exist, creating repo')
        await createRepo(repoTitle, accessToken);
      }
      const isFileExists = await checkFileExists(userName, repoTitle, fileName);
      if (!isFileExists) {
        console.log('file not exist, creating ne file')
        await createNewFile(userName, repoTitle, fileName, fileContent, commitMessage, accessToken);
      } else {
        console.log('file exists, creating new commit')
        await createCommit(userName, repoTitle, fileName, fileContent, commitMessage, accessToken);
      }
      console.log("all process done");
      sendResponse("done");
      return;
    } catch (err) {
      console.error(err)
      return;
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