// if (typeof window === 'undefined') {
//   var fetch = require('node-fetch');
// }

const checkRepoExists = async (userName = 'atoye1', repoTitle = 'coplit') => {
  const url = `https://api.github.com/repos/${userName}/${repoTitle}`;
  try {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json'
      },
    })
    console.log('exists')
    return true;
  } catch (err) {
    console.log('NOT exists')
    return false;
  }
}

const createRepo = async (repoTitle) => {
  const url = 'https://api.github.com/user/repos';
  const accessToken = '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';
  const data = {
    name: repoTitle,
    type: 'public'
  }
  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    })
    console.log(result.json());
  } catch (err) {
    console.error(err)
  }
}

const checkFileExists = async (userName = 'atoye1', repoTitle = 'coplit', fileName = '05_tiling.js') => {
  const url = `https://api.github.com/repos/${userName}/${repoTitle}/${fileName}`;
  const accessToken = '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';
  try {
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json'
      },
    })
    console.log(`${fileName} exists`)
    return true;
  } catch (err) {
    console.log(`${fileName} NOT exists`)
    return false;
  }
}

const createNewFile = async (userName = 'atoye1', repoTitle = 'coplit', fileName = '05_tiling61200.js') => {
  const url = `https://api.github.com/repos/${userName}/${repoTitle}/contents/${fileName}`;
  const accessToken = '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';
  let content = '05_tiling, it should be base64 encoded for request, second commit'
  content = btoa(content);
  const data = {
    "message": `Creating ${fileName} 2`,
    content
  }
  try {
    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    })
    const responseData = await result.json();
    console.log(responseData.commit.sha);
    return responseData;
  } catch (err) {
    console.error(err)
    return false;
  }
}

const createCommit = async (userName = 'atoye1', repoTitle = 'coplit', fileName = '05_tiling.js') => {
  const checkingUrl = `https://api.github.com/repos/${userName}/${repoTitle}/commits`
  const accessToken = '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';
  try {
    const checkResult = await fetch(checkingUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const checkData = await checkResult.json();
    console.log(checkData);
    const treeUrl = checkData[0].commit.tree.url;
    const treeResult = await fetch(treeUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${accessToken}`
      }
    })
    const treeData = await treeResult.json();
    let fileSha = null;
    console.log(treeData);
    treeData.tree.forEach((elem) => {
      if (elem.path === fileName) {
        fileSha = elem.sha;
        return true;
      }
    })
    if (!fileSha) throw new Error(`Sha of ${fileName} not found`);

    // sha value found! moving to commit logics
    const url = `https://api.github.com/repos/${userName}/${repoTitle}/contents/${fileName}`;
    let content = '05_tiling, it should be base64 encoded for request, second commit'
    content = btoa(content);

    const data = {
      "message": `Updating ${fileName}`,
      content,
      sha: fileSha,
    }

    const result = await fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': 'application/vnd.github+json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(data)
    })
    const updateData = await result.json();
    console.log(updateData);
    return updateData;
  } catch (err) {
    console.error(err)
    return false;
  }
}


export { checkRepoExists, checkFileExists, createNewFile, createRepo, createCommit }
