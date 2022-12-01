const main = async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(1000);
  console.log(window.location)

  const url = new URL(window.location.href);
  const problemHash = url.pathname.split('/')[2];

  const btnGroup = document.querySelector('div.item.end');

  const githubBtn = document.createElement('button');
  githubBtn.textContent = "Commit To Github"
  githubBtn.style.backgroundColor = "#ff9900"
  githubBtn.style.color = "white"
  githubBtn.style.height = "white"

  githubBtn.style.padding = "10px"
  githubBtn.style.borderRadius = "10px"
  githubBtn.style.margin = "0px 10px"
  githubBtn.id = "githubBtn";

  btnGroup.appendChild(githubBtn);

  githubBtn.addEventListener('click', async () => {
    const scoreText = document.querySelector('div.codeproblem-console-content > div > div')?.textContent;
    if (scoreText === undefined || scoreText === '테스트 결과가 없습니다.') {
      alert('테스트 후에 커밋하세요!')
      return;
    }
    const fileName = document.querySelector('span.problem-title').textContent + '.js';
    const fileContent = localStorage.getItem(problemHash);

    //TODO 커밋 메시지 입력 가능하게 만든다.
    const commitMessage = '';
    alert(commitMessage)

    const response = await chrome.runtime.sendMessage({ action: "Commit", fileName, fileContent, commitMessage });
    alert(response);
  })
}

main();

const mainInterval = setInterval(() => {
  if (!document.getElementById('githubBtn') && window.location.href.includes('codeproblem')) {
    main();
  }
}, 2000);

// https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
