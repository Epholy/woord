本文件夹下收集各个阶段的单词。文件夹 G1、G2、G3、G4 分别存放大一至大四的单词。

## 文件命名

一份标准的文件名：`G3-S1-F-k.txt`。

文件名由四部分组成，这四部分所表示的信息：`年级-上半学期或下半学期-期中或期末-漢語或外来語`。

文件名应满足下列正则规则：`^G[1-4]-S[12]-[M|F]-[k|g]\.txt$`。其中，`G[1-4]`分别表示一至四年级；`S1`表示上学期（秋季学期）、`S2`表示下学期（春季学期）；`M`表示该学期期中考试范围内的单词、`F`表示期末；`k`表示漢語（也可能包含和語）、`g`表示外来語。

## 文件内容的格式

-   #### 漢語

    文件的每一行被视为一个单词。每一行应当包含 2 项内容：词汇的汉字写法及读音（应按此顺序填入内容）。项与项之间使用空格（全角、半角皆可）、逗号（全角、半角皆可）或顿号（“、”）分隔。分隔符可以以任意数量的字符出现。例如：

    ```text
    変転    へんてん
    宿命，しゅくめい
    ```

    注意：尽管分隔符的选择多样化，但强烈建议**在同一份文件中只使用一种风格的分隔符**。

-   #### 外来語
    格式类同于上述规则。每一行应当包含 2 项内容：词汇的片假名写法及汉语解释。例如：

    ```text
    カウンター    柜台
    コンロ    炉灶
    ```

## json文件的生成

本文件夹下还包含有json格式的文件，这些文件是网页中JavaScript脚本运行时所直接访问的数据。有关生成这些json文件的操作步骤请移步[此处](../../../tools/README.md)。每次修改txt文件后都应该重新生成json文件。

注意：**请勿随意修改json文件**，除非你知道你在做什么。