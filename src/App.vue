<template>
    <v-app>
        <v-navigation-drawer app temporary v-model="drawer" v-if="guide">
            <v-list nav>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title
                            class="title"
                            style="line-height: 32px"
                        >
                            选择词库
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-chip-group
                    v-model="type"
                    column
                    mandatory
                    active-class="primary--text"
                >
                    <v-chip
                        v-for="item in types"
                        :key="item.val"
                        :value="item.val"
                        filter
                        outlined
                    >
                        {{ item.desc }}
                    </v-chip>
                </v-chip-group>

                <v-list-group
                    v-for="(grade, index) in guide.path[type]"
                    :key="index"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-title>
                            {{ grade[0].title.substr(0, 3) }}
                        </v-list-item-title>
                    </template>
                    <v-list-item-group v-model="source" mandatory>
                        <v-list-item
                            v-for="(lexicon, lindex) in grade"
                            :key="lindex"
                            @click="
                                changeLexicon(lexicon.url);
                                drawer = !drawer;
                            "
                            :value="lexicon.name"
                            class="pl-6"
                        >
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ lexicon.title }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <v-container style="height: 100%">
                <v-row justify="center" align="center" style="height: 100%">
                    <v-col cols="10" sm="7" md="6" lg="4">
                        <v-card
                            class="rounded-xl d-flex flex-column elevation-8"
                            style="
                                height: 500px;
                                background-color: #e8f5e9cf;
                                backdrop-filter: blur(25px);
                            "
                        >
                            <v-tabs-items
                                v-model="mode"
                                style="background-color: transparent"
                            >
                                <v-tab-item
                                    v-for="(mode, index) in [
                                        'lexicon',
                                        'collection',
                                    ]"
                                    :value="mode"
                                    :key="index"
                                >
                                    <v-card-text
                                        class="text-center"
                                        v-if="activeData.deck.length"
                                    >
                                        <v-list-item-group
                                            v-model="pinned"
                                            active-class="teal--text text--darken-4"
                                        >
                                            <v-list-item
                                                class="mt-16 mb-1 py-3 pl-10 justify-center align-end"
                                                value="kanji"
                                            >
                                                <v-list-item-icon
                                                    v-show="pinned == 'kanji'"
                                                    style="
                                                        position: absolute;
                                                        left: 0;
                                                        top: 0;
                                                        height: 100%;
                                                    "
                                                    class="my-0 ml-2"
                                                >
                                                    <v-icon
                                                        >mdi-lock-outline</v-icon
                                                    >
                                                </v-list-item-icon>
                                                <p
                                                    class="text-h3 jp-serif ma-0"
                                                    :style="{
                                                        opacity:
                                                            activeData.kanjiOpacity,
                                                    }"
                                                >
                                                    {{ currentWord.kanji }}
                                                </p>
                                            </v-list-item>
                                            <v-list-item
                                                class="py-2 pl-7 justify-center"
                                                value="kana"
                                            >
                                                <v-list-item-icon
                                                    v-show="pinned == 'kana'"
                                                    style="
                                                        position: absolute;
                                                        left: 0;
                                                        top: 0;
                                                        height: 100%;
                                                    "
                                                    class="my-0 ml-2"
                                                >
                                                    <v-icon
                                                        >mdi-lock-outline</v-icon
                                                    >
                                                </v-list-item-icon>
                                                <p
                                                    class="text-h5 text--primary sc-serif ma-0"
                                                    :style="{
                                                        opacity:
                                                            activeData.kanaOpacity,
                                                    }"
                                                >
                                                    {{ currentWord.kana }}
                                                </p>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-card-text>
                                </v-tab-item>
                            </v-tabs-items>

                            <v-card-subtitle
                                class="text-center mt-auto mb-2"
                                v-if="activeData.deck.length"
                            >
                                <span class="indicator">
                                    {{
                                        activeData.index +
                                        1 +
                                        "/" +
                                        activeData.deck.length
                                    }}
                                </span>
                            </v-card-subtitle>

                            <v-card-actions
                                class="mb-4 mt-auto"
                                style="width: 100%"
                            >
                                <v-btn
                                    :disabled="!activeData.deck.length"
                                    color="success"
                                    icon
                                    xLarge
                                    absolute
                                    right
                                    top
                                    v-if="uncollected"
                                    @click="collect"
                                >
                                    <v-icon>mdi-bookmark-plus-outline</v-icon>
                                </v-btn>
                                <v-btn
                                    :disabled="!activeData.deck.length"
                                    color="error"
                                    icon
                                    xLarge
                                    absolute
                                    right
                                    top
                                    v-else
                                    @click="remove"
                                >
                                    <v-icon>mdi-bookmark-minus-outline</v-icon>
                                </v-btn>
                                <v-row>
                                    <v-col class="d-flex" cols="12" md="7">
                                        <v-btn
                                            :disabled="!activeData.deck.length"
                                            color="success"
                                            class="flex-grow-1 mx-2"
                                            @click="showAnswer"
                                            rounded
                                            xLarge
                                        >
                                            显示答案
                                        </v-btn>
                                    </v-col>

                                    <v-col
                                        class="d-flex justify-end"
                                        cols="12"
                                        md="5"
                                    >
                                        <v-btn
                                            :disabled="min"
                                            class="flex-grow-1"
                                            color="green darken-3"
                                            text
                                            @click="previous"
                                            xLarge
                                        >
                                            <v-icon>mdi-chevron-left</v-icon>
                                        </v-btn>
                                        <v-btn
                                            :disabled="!activeData.deck.length"
                                            class="flex-grow-1"
                                            color="green darken-3"
                                            text
                                            @click="next"
                                            xLarge
                                        >
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <v-bottom-navigation
            app
            v-model="mode"
            color="teal darken-3"
            grow
            shift
            class="elevation-0"
            style="background-color: #e3f2fdcc; backdrop-filter: blur(25px)"
        >
            <v-btn value="lexicon">
                <span>词库</span>
                <v-icon>mdi-book-multiple</v-icon>
            </v-btn>

            <!-- 收藏模式下默认只有删除行为 -->
            <v-btn value="collection" @click="uncollected = false">
                <span>收藏</span>
                <v-icon>mdi-bookmark</v-icon>
            </v-btn>
        </v-bottom-navigation>

        <v-btn
            fixed
            fab
            top
            left
            dark
            class="orange lighten-1"
            @click="drawer = true"
        >
            <v-icon>mdi-menu</v-icon>
        </v-btn>
    </v-app>
</template>

<style scoped>
#app {
    background: url("https://cn.bing.com/th?id=OHR.AppalachianTrail_ZH-CN5076145300_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp")
        no-repeat center/cover fixed !important;
}
.v-tabs-items p {
    transition: opacity 0.2s;
}
.v-window p.jp-serif {
    font-family: "Source Han Serif", "Noto Serif JP", serif !important;
    font-weight: 600;
}
.v-window p.sc-serif {
    font-family: "Source Han Serif", "Noto Serif SC", serif !important;
    font-weight: 400;
}
</style>

<script type="module">
import localforage from "localforage";

let db = localforage.createInstance({
    name: "Woord",
    storeName: "G3-S2-F", // 需与source的初始值保持同步
});

export default {
    name: "App",

    data: () => ({
        drawer: false,
        // mode=lexicon时页面用到的数据
        lexicon: {
            deck: [], // 乱序后的所有单词
            index: 0, // 当前单词的当前序号（非id字段），从0开始
            kanjiOpacity: 1,
            kanaOpacity: 0,
        },
        // mode=collection时用到的数据
        collection: {
            deck: [],
            index: 0,
            kanjiOpacity: 1,
            kanaOpacity: 0,
        },
        type: "", // "k","g"。汉语或外来语
        types: [
            { val: "k", desc: "漢語" },
            { val: "g", desc: "外来語" },
        ],
        guide: null, // 所有资源的路径信息
        source: "", // 单词的来源（哪一场考试）
        mode: "", // 词库或收藏
        uncollected: true,
        pinned: "", // 固定显示哪一行单词
    }),

    beforeCreate() {
        fetch("assets/lexicon/guide.json")
            .then((res) => res.json())
            .then((json) => (this.guide = json));
    },
    created() {
        this.type = "k";
        this.source = "G3-S2-F-k";
        this.mode = "lexicon";
        this.init(
            `assets/lexicon/${this.source.substr(0, 2)}/${this.source}.json`
        );
    },
    methods: {
        init(url) {
            fetch(url)
                .then((res) => res.json())
                .then((json) => {
                    this.lexicon.deck = this.shuffle__(json);
                    this.lexicon.index = 0;
                    this.currentWord = this.lexicon.deck[0];
                });
        },
        shuffle__(arr) {
            let len = arr.length;
            for (let i = 0; i < len - 1; i++) {
                let index = Math.floor(Math.random() * (len - i));
                [arr[index], arr[len - i - 1]] = [arr[len - i - 1], arr[index]];
            }
            return arr;
        },
        showAnswer() {
            this.activeData.kanjiOpacity = this.activeData.kanaOpacity = 1;
        },
        // 参数step指明index前进几
        updateCurrentWord__(step) {
            this.activeData.kanjiOpacity = this.activeData.kanaOpacity = 0;
            setTimeout(() => {
                if (step == 0) {
                    this.activeData.index = 0;
                } else {
                    this.activeData.index += step;
                }
                // 当pinned有值时固定显示被选中的单词
                if (this.pinned) {
                    this.activeData[this.pinned + "Opacity"] = 1;
                } else {
                    this.activeData.kanjiOpacity = Math.floor(
                        Math.random() * 2
                    );
                    this.activeData.kanaOpacity =
                        1 - this.activeData.kanjiOpacity; // f(0)=1,f(1)=0
                }
            }, 200);
        },
        previous() {
            if (this.activeData.index > 0) {
                this.updateCurrentWord__(-1);
            }
        },
        next() {
            if (this.activeData.index < this.activeData.deck.length - 1) {
                this.updateCurrentWord__(1);
            } else {
                // 到达列表末尾后重新洗牌
                this.shuffle__(this.activeData.deck);
                this.updateCurrentWord__(0);
            }
        },
        changeLexicon(lexiconUrl) {
            this.init(lexiconUrl);
        },
        collect() {
            db.setItem(this.currentWord.id, this.currentWord).then((val) => {
                // 存至数据库后更新this.collection数据
                this.collection.deck.push(val);
                // 第一次向数据库/collection.deck添加数据后，初始化currentWord
                if (this.collection.deck.length == 1) {
                    this.currentWord = this.collection.deck[0];
                }
                this.uncollected = false;
            });
        },
        remove() {
            db.removeItem(this.currentWord.id).then(() => {
                // 更新this.collection数据
                const pos = this.collection.deck.findIndex(
                    (element) => element.id == this.currentWord.id
                );
                this.collection.deck.splice(pos, 1);
                // 只在词库模式下更新按钮状态，收藏模式始终默认为只有删除
                if (this.mode == "lexicon") {
                    this.uncollected = true;
                } else {
                    // 在收藏模式下时更新当前单词（currentWord）
                    if (
                        this.collection.index == this.collection.deck.length &&
                        this.collection.index != 0
                    ) {
                        --this.collection.index;
                    }
                    this.currentWord = this.collection.deck[this.collection.index];
                }
            });
        },
    },
    computed: {
        // 当前活跃的数据，即当前该使用lexicon还是collection的数据
        activeData() {
            return this[this.mode];
        },
        // 是否处于列表最前端
        min() {
            return 0 == this.activeData.index;
        },
        // collection.deck的id字段集合
        keys() {
            return this.collection.deck.map((val) => val.id);
        },
        currentWord() {
            return this.activeData.deck[this.activeData.index];
        },
        // watch currentWord时无法监视到其变化（监视activeData.id也无效），
        // 因而采取该方法：当mode、lexicon.index、collection.index中任意
        // 一项发生变化时，检测currentWord是否存在于数据库中
        observer() {
            return [this.mode, this.lexicon.index, this.collection.index];
        },
    },
    watch: {
        // 更换词库时切换数据表
        source(val, oldVal) {
            if (val.substr(0, 7) !== oldVal?.substr(0, 7)) {
                db = localforage.createInstance({
                    name: "Woord",
                    storeName: val.substr(0, 7),
                });
                // 清空之前所显示的收藏
                this.collection.deck = [];
                db.iterate((value) => {
                    this.collection.deck.push(value);
                }).then(() => {
                    this.collection.index = 0;
                    this.currentWord = this.collection.deck[0];
                });
            }
        },
        // 检测单词是否存在于收藏数据库中
        observer() {
            this.uncollected = !this.keys.includes(this.currentWord?.id);
        },
    },
};
</script>