const checkAuthData = async () => {
  try {
    const auth = await chrome.storage.local.get("auth");
    const accessToken = auth.auth.accessToken;
    const userName = auth.auth.userName;
    if (!auth || !userName || !accessToken) return false;
    console.log('at, username', accessToken, userName);
    return true;
  } catch (err) {
    console.error(err)
  }
}

const verifyToken = async () => {
  // fetch로 해당 유저네임과 액세스토큰이 맞는지 검증한다.
  // test stub return value;
  const auth = await chrome.storage.local.get("auth");
  const accessToken = auth.auth.accessToken;
  const userName = auth.auth.userName;
  const verificationUrl = 'https://api.github.com/user';

  const verificationResult = await fetch(verificationUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${accessToken}`
    }
  })

  const parsedResult = await verificationResult.json();
  console.log(parsedResult);
  if (parsedResult.login === userName) {
    return true;
  } else {
    return false
  }
}

const updateStatus = async () => {
  const health = document.getElementById('health');
  health.innerText = '';
  health.style.color = 'black';
  if (!await checkAuthData()) {
    health.innerText = '저장된 인증 정보가 없습니다. username과 accessToken을 입력하세요'
    health.style.color = 'red';
    return;
  }
  const auth = await chrome.storage.local.get("auth");
  const accessToken = auth.auth.accessToken;
  const userName = auth.auth.userName;
  if (!await verifyToken()) {
    health.innerText = `저장된 인증정보가 유효하지 않습니다. 유저 ${userName}과 accessToken이 유효한지 확인하세요`;
    health.style.color = 'red';
    return;
  }
  health.innerText = `아이디 ${userName} 정상 작동 중\n 깃헙 API 사용가능합니다.\n 이제 코플릿에서 커밋해보세요.`
  health.style.color = 'green';
}

document.getElementById('saveBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  const accessToken = document.getElementById('accessToken').value.trim();
  const userName = document.getElementById('userName').value.trim();
  document.getElementById('accessToken').value = '';
  document.getElementById('userName').value = '';

  await chrome.storage.local.set({
    "auth": {
      "accessToken": accessToken,
      "userName": userName,
    }
  })
  updateStatus();
})
updateStatus();