document.getElementById('saveBtn').addEventListener('click', e => {
  e.preventDefault();
  const accessToken = document.getElementById('accessToken').value;
  localStorage.setItem('accessToken', accessToken);
  var test_statement = document.createElement('h1')
  test_statement.textContent = accessToken
  document.getElementById('main').appendChild(test_statement);
})