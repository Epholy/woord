(function(t){function e(e){for(var i,o,r=e[0],s=e[1],l=e[2],d=0,v=[];d<r.length;d++)o=r[d],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&v.push(a[o][0]),a[o]=0;for(i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i]);u&&u(e);while(v.length)v.shift()();return c.push.apply(c,l||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],i=!0,r=1;r<n.length;r++){var s=n[r];0!==a[s]&&(i=!1)}i&&(c.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},a={index:0},c=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var r=window["webpackJsonp"]=window["webpackJsonp"]||[],s=r.push.bind(r);r.push=e,r=r.slice();for(var l=0;l<r.length;l++)e(r[l]);var u=s;c.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0767":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("8bbf"),a=n.n(i),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",[t.guide?n("v-navigation-drawer",{attrs:{app:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{nav:""}},[n("v-list-item",[n("v-list-item-content",[n("v-list-item-title",{staticClass:"title",staticStyle:{"line-height":"32px"}},[t._v(" 选择词库 ")])],1)],1),n("v-divider"),n("v-chip-group",{attrs:{column:"",mandatory:"","active-class":"primary--text"},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},t._l(t.types,(function(e){return n("v-chip",{key:e.val,attrs:{value:e.val,filter:"",outlined:""}},[t._v(" "+t._s(e.desc)+" ")])})),1),t._l(t.guide.path[t.type],(function(e,i){return n("v-list-group",{key:i,attrs:{"no-action":""},scopedSlots:t._u([{key:"activator",fn:function(){return[n("v-list-item-title",[t._v(" "+t._s(e[0].title.substr(0,3))+" ")])]},proxy:!0}],null,!0)},[n("v-list-item-group",{attrs:{mandatory:""},model:{value:t.source,callback:function(e){t.source=e},expression:"source"}},t._l(e,(function(e,i){return n("v-list-item",{key:i,staticClass:"pl-6",attrs:{value:e.name},on:{click:function(n){t.changeLexicon(e.url),t.drawer=!t.drawer}}},[n("v-list-item-content",[n("v-list-item-title",[t._v(" "+t._s(e.title)+" ")])],1)],1)})),1)],1)}))],2)],1):t._e(),n("v-main",[n("v-container",{staticStyle:{height:"100%"}},[n("v-row",{staticStyle:{height:"100%"},attrs:{justify:"center",align:"center"}},[n("v-col",{attrs:{cols:"10",sm:"7",md:"6",lg:"4"}},[n("v-card",{staticClass:"rounded-xl d-flex flex-column elevation-8",staticStyle:{height:"500px","background-color":"#e8f5e9cf","backdrop-filter":"blur(25px)"}},[n("v-tabs-items",{staticStyle:{"background-color":"transparent"},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}},t._l(["lexicon","collection"],(function(e,i){return n("v-tab-item",{key:i,attrs:{value:e}},[t.activeData.deck.length?n("v-card-text",{staticClass:"text-center"},[n("v-list-item-group",{attrs:{"active-class":"teal--text text--darken-4"},model:{value:t.pinned,callback:function(e){t.pinned=e},expression:"pinned"}},[n("v-list-item",{staticClass:"mt-16 mb-1 py-3 pl-10 justify-center align-end",attrs:{value:"kanji"}},[n("v-list-item-icon",{directives:[{name:"show",rawName:"v-show",value:"kanji"==t.pinned,expression:"pinned == 'kanji'"}],staticClass:"my-0 ml-2",staticStyle:{position:"absolute",left:"0",top:"0",height:"100%"}},[n("v-icon",[t._v("mdi-lock-outline")])],1),n("p",{staticClass:"text-h3 jp-serif ma-0",style:{opacity:t.activeData.kanjiOpacity}},[t._v(" "+t._s(t.currentWord.kanji)+" ")])],1),n("v-list-item",{staticClass:"py-2 pl-7 justify-center",attrs:{value:"kana"}},[n("v-list-item-icon",{directives:[{name:"show",rawName:"v-show",value:"kana"==t.pinned,expression:"pinned == 'kana'"}],staticClass:"my-0 ml-2",staticStyle:{position:"absolute",left:"0",top:"0",height:"100%"}},[n("v-icon",[t._v("mdi-lock-outline")])],1),n("p",{staticClass:"text-h5 text--primary sc-serif ma-0",style:{opacity:t.activeData.kanaOpacity}},[t._v(" "+t._s(t.currentWord.kana)+" ")])],1)],1)],1):t._e()],1)})),1),t.activeData.deck.length?n("v-card-subtitle",{staticClass:"text-center mt-auto mb-2"},[n("span",{staticClass:"indicator"},[t._v(" "+t._s(t.activeData.index+1+"/"+t.activeData.deck.length)+" ")])]):t._e(),n("v-card-actions",{staticClass:"mb-4 mt-auto",staticStyle:{width:"100%"}},[t.uncollected?n("v-btn",{attrs:{disabled:!t.activeData.deck.length,color:"success",icon:"",xLarge:"",absolute:"",right:"",top:""},on:{click:t.collect}},[n("v-icon",[t._v("mdi-bookmark-plus-outline")])],1):n("v-btn",{attrs:{disabled:!t.activeData.deck.length,color:"error",icon:"",xLarge:"",absolute:"",right:"",top:""},on:{click:t.remove}},[n("v-icon",[t._v("mdi-bookmark-minus-outline")])],1),n("v-row",[n("v-col",{staticClass:"d-flex",attrs:{cols:"12",md:"7"}},[n("v-btn",{staticClass:"flex-grow-1 mx-2",attrs:{disabled:!t.activeData.deck.length,color:"success",rounded:"",xLarge:""},on:{click:t.showAnswer}},[t._v(" 显示答案 ")])],1),n("v-col",{staticClass:"d-flex justify-end",attrs:{cols:"12",md:"5"}},[n("v-btn",{staticClass:"flex-grow-1",attrs:{disabled:t.min,color:"green darken-3",text:"",xLarge:""},on:{click:t.previous}},[n("v-icon",[t._v("mdi-chevron-left")])],1),n("v-btn",{staticClass:"flex-grow-1",attrs:{disabled:!t.activeData.deck.length,color:"green darken-3",text:"",xLarge:""},on:{click:t.next}},[n("v-icon",[t._v("mdi-chevron-right")])],1)],1)],1)],1)],1)],1)],1)],1)],1),n("v-bottom-navigation",{staticClass:"elevation-0",staticStyle:{"background-color":"#e3f2fdcc","backdrop-filter":"blur(25px)"},attrs:{app:"",color:"teal darken-3",grow:"",shift:""},model:{value:t.mode,callback:function(e){t.mode=e},expression:"mode"}},[n("v-btn",{attrs:{value:"lexicon"}},[n("span",[t._v("词库")]),n("v-icon",[t._v("mdi-book-multiple")])],1),n("v-btn",{attrs:{value:"collection"},on:{click:function(e){t.uncollected=!1}}},[n("span",[t._v("收藏")]),n("v-icon",[t._v("mdi-bookmark")])],1)],1),n("v-btn",{staticClass:"orange lighten-1",attrs:{fixed:"",fab:"",top:"",left:"",dark:""},on:{click:function(e){t.drawer=!0}}},[n("v-icon",[t._v("mdi-menu")])],1)],1)},o=[],r=(n("d3b7"),n("99af"),n("c740"),n("a434"),n("d81d"),n("caad"),n("2532"),n("ddb0"),n("a002")),s=n.n(r);s.a.config({name:"Woord",storeName:"G3-S1-F"});var l={name:"App",data:function(){return{drawer:!1,lexicon:{deck:[],index:0,kanjiOpacity:1,kanaOpacity:0},collection:{deck:[],index:0,kanjiOpacity:1,kanaOpacity:0},type:"",types:[{val:"k",desc:"漢語"},{val:"g",desc:"外来語"}],guide:null,source:"",mode:"",uncollected:!0,pinned:""}},beforeCreate:function(){var t=this;fetch("assets/lexicon/guide.json").then((function(t){return t.json()})).then((function(e){return t.guide=e}))},created:function(){this.type="k",this.source="G3-S1-F-k",this.mode="lexicon",this.init("assets/lexicon/".concat(this.source.substr(0,2),"/").concat(this.source,".json"))},methods:{init:function(t){var e=this;fetch(t).then((function(t){return t.json()})).then((function(t){e.lexicon.deck=e.shuffle__(t),e.lexicon.index=0,e.currentWord=e.lexicon.deck[0]}))},shuffle__:function(t){for(var e=t.length,n=0;n<e-1;n++){var i=Math.floor(Math.random()*(e-n)),a=[t[e-n-1],t[i]];t[i]=a[0],t[e-n-1]=a[1]}return t},showAnswer:function(){this.activeData.kanjiOpacity=this.activeData.kanaOpacity=1},updateCurrentWord__:function(t){var e=this;this.activeData.kanjiOpacity=this.activeData.kanaOpacity=0,setTimeout((function(){0==t?e.activeData.index=0:e.activeData.index+=t,e.pinned?e.activeData[e.pinned+"Opacity"]=1:(e.activeData.kanjiOpacity=Math.floor(2*Math.random()),e.activeData.kanaOpacity=1-e.activeData.kanjiOpacity)}),200)},previous:function(){this.activeData.index>0&&this.updateCurrentWord__(-1)},next:function(){this.activeData.index<this.activeData.deck.length-1?this.updateCurrentWord__(1):(this.shuffle__(this.activeData.deck),this.updateCurrentWord__(0))},changeLexicon:function(t){this.init(t)},collect:function(){var t=this;s.a.setItem(this.currentWord.id,this.currentWord).then((function(e){t.collection.deck.push(e),1==t.collection.deck.length&&(t.currentWord=t.collection.deck[0]),t.uncollected=!1}))},remove:function(){var t=this;s.a.removeItem(this.currentWord.id).then((function(){var e=t.collection.deck.findIndex((function(e){return e.id==t.currentWord.id}));t.collection.deck.splice(e,1),"lexicon"==t.mode?t.uncollected=!0:(t.collection.index==t.collection.deck.length&&0!=t.collection.index&&--t.collection.index,t.currentWord=t.collection.deck[t.collection.index])}))}},computed:{activeData:function(){return this[this.mode]},min:function(){return 0==this.activeData.index},keys:function(){return this.collection.deck.map((function(t){return t.id}))},currentWord:function(){return this.activeData.deck[this.activeData.index]},observer:function(){return[this.mode,this.lexicon.index,this.collection.index]}},watch:{source:function(t,e){var n=this;t.substr(0,7)!==(null===e||void 0===e?void 0:e.substr(0,7))&&(s.a.config({storeName:t.substr(0,7)}),s.a.iterate((function(t){n.collection.deck.push(t)})).then((function(){n.collection.index=0,n.currentWord=n.collection.deck[0]})))},observer:function(){var t;this.uncollected=!this.keys.includes(null===(t=this.currentWord)||void 0===t?void 0:t.id)}}},u=l,d=(n("7539"),n("2877")),v=Object(d["a"])(u,c,o,!1,null,"6f4e2e28",null),p=v.exports,f=n("a2c9"),h=n.n(f),m=n("f531");a.a.use(h.a);var k=new h.a({lang:{locales:{zhHans:m["a"]},current:"zhHans"}});a.a.config.productionTip=!1,new a.a({vuetify:k,render:function(t){return t(p)}}).$mount("#app")},7539:function(t,e,n){"use strict";n("0767")},"8bbf":function(t,e){t.exports=Vue},a2c9:function(t,e){t.exports=Vuetify}});