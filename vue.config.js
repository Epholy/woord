module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  publicPath: '',
  outputDir: "docs",
  configureWebpack: {
    externals: {
      vue: "Vue",
      vuetify: "Vuetify",
      localforge: "localforage_js"
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: '背单词吧',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    }
  }
}
