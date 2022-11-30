const main = async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));
  await delay(1000);

  const h3 = document.createElement('h3');
  h3.textContent = "크롬익스텐션 설정 되었습니다 content.js."
  const rootElem = document.getElementById("root");
  rootElem.insertBefore(h3, rootElem.firstChild);

  document.title = 'CoplitToGithub Testing'

  const url = new URL(window.location.href);
  const problemId = url.pathname.split('/')[2];

  btnGroup = document.querySelector('div.item.end');
  submitBtn = document.querySelector("div.item.end")?.children[2];

  const githubBtn = document.createElement('button');
  githubBtn.textContent = "Coplit to github"
  githubBtn.classList = submitBtn.classList;
  githubBtn.style = submitBtn.style;
  githubBtn.style.backgroundColor = 'crimson'
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
}
main();

window.addEventListener('popstate', function (event) {
  main()
});
window.addEventListener('pushstate', function (event) {
  main()
});