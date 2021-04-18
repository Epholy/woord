"use strict";

const app = new Vue({
    el: "div.app",
    data: {
        deck: null, // 乱序后的所有单词
        currentWord: null, // 当前单词
        index: 0, // 当前单词的当前序号（非id字段），从0开始
        type: "k", // "k","g","v"。汉语、外来语或单词本
        guide: null, // 所有资源路径
        length: null,
        lightTheme: false,
        kanjiOpacity: 1,
        kanaOpacity: 0,
    },
    beforeCreate: function () {
        fetch("asserts/lexicon/guide.json")
            .then((res) => res.json())
            .then((json) => this.guide = json);
    },
    created: function () {
        this.init("asserts/lexicon/G3/G3-S1-F-k.json");
    },
    methods: {
        init: function (url) {
            fetch(url)
                .then((res) => res.json())
                .then((json) => {
                    this.deck = this.shuffle__(json);
                    this.index = 0;
                    this.length = this.deck.length;
                    this.currentWord = this.deck[0];
                });
        },
        shuffle__: function (arr) {
            let len = arr.length;
            for (let i = 0; i < len - 1; i++) {
                let index = Math.floor(Math.random() * (len - i));
                [arr[index], arr[len - i - 1]] = [arr[len - i - 1], arr[index]];
            }
            return arr;
        },
        showAnswer: function () {
            this.kanjiOpacity = this.kanaOpacity = 1;
        },
        updateCurrentWord__: function() {
            this.kanjiOpacity = this.kanaOpacity = 0;
            //等待过渡动画结束再切换
            setTimeout(() => {
                this.currentWord = this.deck[this.index];
                this.kanjiOpacity = Math.floor(Math.random() * 2);
                this.kanaOpacity = 1 - this.kanjiOpacity; // f(0)=1,f(1)=0
            }, 200);
        },
        previous: function () {
            if (this.index > 0) {
                --this.index;
            }
            this.updateCurrentWord__();
        },
        next: function () {
            if (this.index < this.length - 1) {
                ++this.index;
            } else {
                // 到达列表末尾后重新洗牌
                this.shuffle__(this.deck);
                this.index = 0;
            }
            this.updateCurrentWord__();
        },
        changeLexicon: function (lexiconUrl) {
            this.init(lexiconUrl);
            document.querySelector("button.menu-btn").click(); // 关闭抽屉
        }
    },
    watch: {
        index: function (val, oldVal) {
            // 到达最小值时禁用button
            if (val == 0) {
                document
                    .querySelector("section.pagination button:nth-child(1)")
                    .setAttribute("disabled", "disabled");
            } else if (oldVal == 0) {
                document
                    .querySelector("section.pagination button:nth-child(1)")
                    .removeAttribute("disabled");
            }
        },
    },
});
