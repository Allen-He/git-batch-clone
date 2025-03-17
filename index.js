#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const { batchClone } = require("./core");
const { version } = require("./package.json"); 

function parseJsonFile(content) {
  try {
    const data = JSON.parse(content);
    if (Array.isArray(data)) {
      return data;
    }
    throw new Error("JSON文件内容不是数组格式");
  } catch (error) {
    throw new Error(`解析JSON失败: ${error.message}`);
  }
}

program.version(version, "-v, --version", "显示当前版本号");

program
  .description('一个批量执行"git clone"命令的cli工具')
  .argument("<filepath>", "Git仓库链接所在的JSON文件的路径（文件内容必须是JSON数组）")
  .action(async (filepath, options) => {
    try {
      const resPath = path.resolve(process.cwd(), filepath);

      if (!fs.existsSync(resPath)) {
        console.error(`错误： 文件 "${resPath}" 不存在`);
        process.exit(1);
      }
      if (!filepath.toLowerCase().endsWith(".json")) {
        console.error("错误: 只支持JSON文件格式");
        process.exit(1);
      }
      const fileContent = fs.readFileSync(filepath, "utf8");
      const reposList = parseJsonFile(fileContent);

      console.log('开始克隆');
      console.log('====================================')
    
      const res = await batchClone(reposList);

      console.log('====================================')
      console.log('克隆完成');
      console.log(`总数量（已去重）: ${reposList.length}`);
      console.log(`克隆结果：成功: ${res.success} | 失败: ${res.fail}): \n${res.remind}`);
    } catch (error) {
      console.error('出错啦:', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv); 
