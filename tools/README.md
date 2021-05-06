本文件夹存放有管理`/public/assets/lexicon/`下json文件的脚本。

在`/public/assets/lexicon/`内创建包含有单词的txt文件后，需要运行此处的脚本来生成json文件以供网页读取。

## 运行环境

脚本依赖Node.js环境，请始终确保本地安装了较新版本的Node。下载地址：[Download | Node.js](https://nodejs.org/en/download/)。

## 运行

在终端键入以下命令即可运行脚本：

```shell
node <脚本> <txt文件...>
```

例如：

```shell
node ./create.mjs ../lexicon/G3/G3-S1-F-k.txt
```

参数处可同时接受多个文件。例如：

```shell
node ./create.mjs ../lexicon/G3/G3-S1-F-k.txt ../lexicon/G3/G3-S1-F-g.txt
```

脚本最终会在`/public/assets/lexicon/`下生成对应的json数据文件，并更新`/public/assets/lexicon/guide.json`。

关于原始txt文件的信息，请移步[此处](../public/assets/lexicon/README.md)。