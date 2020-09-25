module.exports = {
  configureWebpack: {
    output: {
      library: 'childVue',
      libraryTarget: 'umd', // 打包完之后，会将导出的方法挂载到window上，可以通过window.childVue.mount/bootstrap/unmount调用子应用
    },
    devServer: {
      port: 10000
    }
  }
}