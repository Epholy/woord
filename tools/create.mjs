/**
 * 将普通文本序列化并依据存在的json文件生成一份映射文件
 * 运行环境：node.js
 * 所需参数为未序列化的纯文本文件名，无上限，utf8编码
 */

import { readdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { exit } from "process";
import { fileURLToPath } from "url";
const args = process.argv.slice(2);

if (args.length == 0) {
    console.log("至少输入一个路径参数。");
    exit();
}

/* 序列化纯文本 */
function serialize() {
    let succeeded = 0;
    for (const file of args) {
        let rawText;
        try {
            rawText = readFileSync(file, "utf-8");
        } catch (error) {
            console.log(`有误的文件，已跳过：${file}( ${error.message} )`);
            continue;
        }

        // 格式化（合并多余空格）并按行分成数组
        let lines = rawText
            .trim()
            .replace(/[\u0020\u00a0\u3000\u002c\uff0c\u3001]+/g, " ")
            .split(/[\r\n]+/);

        let words = [];
        for (let index in lines) {
            //对于外来语，kanji是片假名，kana是汉语意思
            let [kanji, kana] = lines[index].trim().split(" ", 2);
            words.push({
                id: index,
                kanji,
                kana,
            });
        }

        const basename = file.match(/(.+)\..+$/)[1];
        const output = basename + ".json";
        try {
            writeFileSync(output, JSON.stringify(words, null, 2));
        } catch (error) {
            console.log(`写入失败: ${output}( ${error.message} )`);
        }

        succeeded++;
    }

    console.log(`成功：${succeeded}/${args.length}`);
}

/* 记录文件的路径 */
function mapPath() {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const lexicon = join(__dirname, "../asserts/lexicon/");
    const dir = readdirSync(lexicon, { withFileTypes: true });
    const infoMap = new Map([
        ["G1", "一年级"],
        ["G2", "二年级"],
        ["G3", "三年级"],
        ["G4", "四年级"],
        ["S1", "上"],
        ["S2", "下"],
        ["M", "期中"],
        ["F", "期末"],
        // ["k", ""],
        // ["g", ""]
    ]);

    // 尝试读取已有文件的version建
    let version;
    try {
        version = JSON.parse(readFileSync(join(lexicon, "guide.json"), "utf-8"))
            .version;
    } catch (e) {} // 这里的异常可以不用处理

    let guide = {
        version: version ?? 0,
        path: {
            k: {
                G1: [],
                G2: [],
                G3: [],
                G4: [],
            },
            g: {
                G1: [],
                G2: [],
                G3: [],
                G4: [],
            },
        },
    };
    for (const dirent of dir) {
        if (!dirent.isDirectory()) continue;

        const subdirent = join(lexicon, dirent.name);
        for (const file of readdirSync(subdirent)) {
            if (!/^G[1-4]-S[12]-[M|F]-[k|g]\.json$/.test(file)) continue;

            const info = /^((G[1-4])-(S[12])-([M|F])-([k|g])).*$/.exec(file);
            guide.path[info[5]][info[2]].push({
                name: info[1],
                group: info[2],
                title:
                    infoMap.get(info[2]) +
                    infoMap.get(info[3]) +
                    infoMap.get(info[4]),
                type: info[5],
                // 此处需保持相对于网站根目录的绝对路径
                url: `/woord/asserts/lexicon/${dirent.name}/${file}`,
            });
        }
    }
    guide.version++;

    writeFileSync(join(lexicon, "guide.json"), JSON.stringify(guide, null, 2));
}

serialize();
mapPath();