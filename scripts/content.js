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

  // if (!submitBtn) {
  //   location.reload();
  //   alert('no submitBtn found')
  // } else {
  //   alert('adding submit eventlistener')
  //   submitBtn.addEventListener('click', () => {
  //     /* github api fetch or save code to some variable*/
  //     alert(`this code will be saved\n\n\n ${localStorage.getItem(problemId)}`);
  //   })
  // }
  githubBtn.addEventListener('click', () => {
    const scoreText = document.querySelector('div.codeproblem-console-content > div > div')?.textContent;
    if (scoreText === undefined || scoreText === '테스트 결과가 없습니다.') {
      alert('채점후에 커밋하세요!')
      return;
    }
    const commitCode = localStorage.getItem(problemHash);
    const inputCommitMessage = '커스텀 인풋메시지 입니다. 나중에 입력가능하게 바뀝니다.';

    const commitMessage = scoreText + inputCommitMessage ? ', ' + inputCommitMessage.trim() : '';
    alert(commitMessage)
    // 수동으로 accessToken을 등록하게 한다.
    chrome.runtime.sendMessage({ action: "FINISH" }, function (response) {
      alert(response);
      console.log(response);
    });

    window.open('https://www.github.com/login', '_blank').focus();
    // https://api.github.com/repos/OWNER/REPO/commits

    // 리퀘스트를 보내서 리포가 있으면 계속하고, 없으면 만든다.
    const githubKey = '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';
    const url = 'https://api.github.com/repos/atoye1/coplit'
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${githubKey}`,
      }
    })
      .then(response => {
        console.log(response.body);
        console.log(response.body.toString());
        console.log('fetch response', JSON.parse(response.body))
      })
      .catch(response => console.log('fetch error', response))

    // response.body가 Readable stream 으로 나오므로, 파싱해야됨.
  })


}

main();

const mainInterval = setInterval(() => {
  if (!document.getElementById('githubBtn') && window.location.href.includes('codeproblem')) {
    main();
  }
}, 2000);
// personal access token
// check if repo exists
// if not make repo
// setup post url

// make branch main
// if there is repo post file
// if no file create file
// if there is file commit with
