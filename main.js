"use strict";

const app = new Vue({
    el: "main",
    data: {
        deck: null, // 乱序后的所有单词
        currentWord: null, // 当前单词
        type: "", // "k","g","v"
        guide: null, // 所有资源路径
        resource: null, // 当前引用的资源路径
        index: 0, // 从0开始
        length: null,
        lightTheme: false,
        kanjiOpacity: 1,
        kanaOpacity: 0,
    },
    methods: {
        init: function (url) {
            fetch(url)
                .then((res) => res.json())
                .then((json) => {
                    this.deck = this.__shuffle(json);
                    this.index = 0;
                    this.length = this.deck.length;
                    this.currentWord = this.deck[0];
                });
        },
        __shuffle: function (arr) {
            let len = arr.length;
            for (let i = 0; i < len - 1; i++) {
                let index = Math.floor(Math.random() * (len - i));
                [arr[index], arr[len - i - 1]] = [arr[len - i - 1], arr[index]];
            }
            return arr;
        },
        showAnswer: function (event) {
            this.kanjiOpacity = this.kanaOpacity = 1;
        },
        __updateCurrentWord: function(event) {
            this.kanjiOpacity = this.kanaOpacity = 0;
            //等待过渡动画结束再切换
            setTimeout(() => {
                this.currentWord = this.deck[this.index];
                this.kanjiOpacity = Math.floor(Math.random() * 2);
                this.kanaOpacity = 1 - this.kanjiOpacity; // f(0)=1,f(1)=0
            }, 200);
        },
        previous: function (event) {
            if (this.index > 0) {
                --this.index;
            }
            this.__updateCurrentWord();
        },
        next: function (event) {
            if (this.index < this.length - 1) {
                ++this.index;
            } else {
                // 到达列表末尾后重新洗牌
                this.__shuffle(this.deck);
                this.index = 0;
            }
            this.__updateCurrentWord();
        },
    },
    watch: {
        index: function (val, oldVal) {
            // 到达最小值时禁用button
            if (val == 0) {
                document
                    .querySelector("section.page button:nth-child(1)")
                    .setAttribute("disabled", "disabled");
            } else if (oldVal == 0) {
                document
                    .querySelector("section.page button:nth-child(1)")
                    .removeAttribute("disabled");
            }
        },
    },
});

app.init("/woord/asserts/lexicon/G3/G3-S1-F-k.json");
