const shell = require("shelljs");

const excuteGitClone = (repoLink) => {
  return new Promise((resolve, reject) => {
    const res = shell.exec(`git clone ${repoLink}`, process.cwd());

    if (res.code === 0) {
      resolve(repoLink);
    } else {
      reject(repoLink);
    }
  });
};

const batchClone = async (reposList) => {
  const resReposList = [...new Set(reposList)];

  const results = await Promise.allSettled(
    resReposList.map((repo) => excuteGitClone(repo))
  );

  return results.reduce((res, cur) => {
    if (cur.status === "fulfilled") {
      res.success++;
      res.remind += `成功: ${cur.value}\n`;
    } else {
      res.fail++;
      res.remind += `失败: ${cur.reason}\n`;
    }
    return res;
  }, { success: 0, fail: 0, remind: '' });
};

module.exports = { batchClone };
