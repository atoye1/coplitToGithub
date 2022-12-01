const DATABASE = 'coplitToGithub';
const DB_VERSION = 1;
const DB_STORE_NAME = 'auth';

var db;

openDB = () => {
  // DB 생성
  var req = indexedDB.open(DATABASE, DB_VERSION);

  // DB 생성 성공
  req.onsuccess = function (evt) {
    db = this.result;
  };
  // DB 생성 오류
  req.onerror = function (evt) {
    console.error("indexedDB : ", evt.target.errorCode);
  };
  // DB 초기화
  req.onupgradeneeded = function (evt) {
    var store = evt.currentTarget.result.createObjectStore(DB_STORE_NAME,
      { keyPath: 'userName', autoIncrement: false });

    store.createIndex('userName', 'userName', { unique: true });
    store.createIndex('accessToken', 'accessToken', { unique: true });
    store.createIndex('timeStamp', 'timeStamp', { unique: false });
  };
}

// openDB()
// this transaction worksFine
// var transaction = db.transaction("auth", "readwrite").objectStore("auth").add(payload);

document.getElementById('saveBtn').addEventListener('click', async (e) => {

  e.preventDefault();
  const accessToken = document.getElementById('accessToken').value;
  const userName = document.getElementById('userName').value;
  await chrome.storage.local.set({
    "auth": {
      "accessToken": accessToken,
      "userName": userName,
    }
  })
  const result = await chrome.storage.local.get("auth")
  console.log(result);

  //TODO: remove below on production
  var test_statement = document.createElement('h1')
  test_statement.textContent = accessToken
  document.getElementById('main').appendChild(test_statement);
})