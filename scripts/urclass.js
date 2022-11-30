const url = new URL(window.location.href);
const problemId = url.pathname.split('/')[2];
const codeText = localStorage.getItem(problemId)
let antModalBody;
let antModalBtns;
let submitBtn

document.addEventListener('load', () => {
  submitBtn = document.querySelector("div.item.end").children[2];
  console.log(submitBtn);
  console.log(codeText);
  if (!submitBtn) throw new Error('no submitBtn');
  submitBtn.addEventListener('click', () => {
    /* github api fetch or save code to some variable*/
    alert("this code saved", codeText);
  })
})

// var xpath = "//span[text()='제출 하기']";
// var submitBtn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;


// let getModal = setInterval(() => {
//   console.log('setInterval called');
//   antModalBody = document.querySelector('div.ant-modal-body')
//   if (antModalBody) {
//     let getBtn = setInterval(() => {
//       console.log('inner setInterval called');
//       antModalBody = document.querySelector('div.ant-modal-body')
//       antModalBtns = antModalBody.querySelector('.button-group')
//       if (antModalBtns) {
//         const commitBtn = document.createElement('button')
//         commitBtn.setAttribute('id', 'commitBtn')
//         commitBtn.textContent = "Commit To GitHub"
//         antModalBtns.appendChild(commitBtn);
//         clearInterval(getBtn);
//         clearInterval(getModal);
//       }
//     }, 1000)
//   }
// }, 1000)
// 제출 결과가 나오면 이벤트를 등록해서
// 깃헙에 올릴지를 결정하는 함수를 호출한다.
// 1. 로그인한다
// 2. 리포지터리를 확인하고, 없으면 만든다
// 3. 파일이 없으면 만들고 커밋한다.
// 4. 파일이 있으면 커밋 추가한다.
// 5. 커밋 메시지를 입력할 수 있다. 디폴트는 문제 url과 몇번째 시도인지, 결과가 어땠는지 저장한다.
// 5. 해피해킹~
