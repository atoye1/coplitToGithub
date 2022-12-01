const main = async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(1000);
  console.log(window.location)

  const header = document.getElementById('extensionIndicator');
  if (!header) {
    const h3 = document.createElement('h3');
    h3.id = 'extentionIndicator'
    h3.textContent = "크롬익스텐션 설정 되었습니다 content.js."
    const rootElem = document.getElementById("root");
    rootElem.insertBefore(h3, rootElem.firstChild);
    document.title = 'CoplitToGithub Testing'
  }

  const url = new URL(window.location.href);
  const problemHash = url.pathname.split('/')[2];

  const btnGroup = document.querySelector('div.item.end');
  const submitBtn = document.querySelector("div.item.end")?.children[2];

  const githubBtn = document.createElement('button');
  if (!githubBtn) return;
  githubBtn.textContent = "Coplit to github"
  githubBtn.classList = submitBtn.classList;
  githubBtn.style = submitBtn.style;
  githubBtn.style.backgroundColor = 'crimson';
  githubBtn.id = "githubBtn";

  btnGroup.appendChild(githubBtn);

  githubBtn.addEventListener('click', async () => {
    const scoreText = document.querySelector('div.codeproblem-console-content > div > div')?.textContent;
    if (scoreText === undefined || scoreText === '테스트 결과가 없습니다.') {
      alert('채점후에 커밋하세요!')
      return;
    }
    const fileName = document.querySelector('span.problem-title').textContent + '.js';
    const fileContent = localStorage.getItem(problemHash);
    const inputCommitMessage = '커스텀 인풋메시지 입니다. 나중에 입력가능하게 바뀝니다.';
    const commitMessage = scoreText + inputCommitMessage ? ', ' + inputCommitMessage.trim() : '';
    alert(commitMessage)
    // 수동으로 accessToken을 등록하게 한다.

    const response = await chrome.runtime.sendMessage({ action: "Commit", fileName, fileContent, commitMessage });
    alert(response);
  })

  const storageTest = document.createElement('button');
  storageTest.textContent = "StorageTest"
  storageTest.classList = submitBtn.classList;
  storageTest.style = submitBtn.style;
  storageTest.style.backgroundColor = 'skyblue';
  storageTest.id = "storageTest";
  btnGroup.appendChild(storageTest);

  storageTest.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: "StorageTest" }, function (response) {
      alert(response);
      console.log(response);
    });
  })
}

main();

const mainInterval = setInterval(() => {
  if (!document.getElementById('githubBtn') && window.location.href.includes('codeproblem')) {
    main();
  }
}, 2000);