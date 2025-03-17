# git-batch-clone-cli

批量并行克隆 Git 仓库的命令行工具（基于 Node.js）

---

## 安装

通过以下命令全局安装 `git-batch-clone-cli`：

```bash
npm install -g git-batch-clone-cli
```

## 查看版本

运行以下命令查看当前版本：

```bash
git-batch-clone --version
```

## 使用方法

### 1. 准备仓库列表文件

在目标路径下新建一个 JSON 文件，例如 `repos.json`（文件扩展名必须为 `.json`）。文件内容格式如下：

```json
[
  "https://github.com/Allen-He/git-batch-clone.git"
]
```

### 2. 执行批量克隆

运行以下命令开始批量克隆仓库：

```bash
git-batch-clone ./repos.json
```

---

## 示例

假设你有一个包含多个仓库地址的 JSON 文件 `repos.json`，内容如下：

```json
[
  "https://github.com/Allen-He/git-batch-clone.git",
  "https://github.com/another-user/another-repo.git"
]
```

运行以下命令即可批量克隆这些仓库：

```bash
git-batch-clone ./repos.json
```

---

## 注意事项

- 确保 JSON 文件格式正确，避免因格式错误导致工具无法正常运行。
- 如果需要克隆的仓库较多，请确保网络连接稳定，以避免中断。

---

欢迎使用 `git-batch-clone-cli`，希望它能帮助你高效克隆多个 Git 仓库！
