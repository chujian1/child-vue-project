import Vue from 'vue'
import App from './App.vue'
import router from './router'
import singleSpaVue from 'single-spa-vue'

Vue.config.productionTip = false

const appOptions = {
  el: '#vue', // 挂载到父应用id为vue的标签上
  router,
  render: h => h(App)
}

// 父应用加载子应用，需要子应用暴露出bootstrap mount unmount这三个接口供父应用调用
// 可以使用single-spa-vue生成以上三个方法
const vueLiftCycle = singleSpaVue({
  Vue,
  appOptions
}) // 返回一个对象，包含bootstrap unmount mount方法

// 父应用调用时，手动修改路径 当为父应用调用时，singleSpaNavigate这个属性为true
if (window.singleSpaNavigate) {
  __webpack_public_path__ = 'http://localhost:10000/'
}

// 子应用也可独立访问
if(!window.singleSpaNavigate) {
  delete appOptions.el
  new Vue(appOptions).$mount('#app')
}

// 协议接入，父应用会调用这些方法
export const bootstrap = vueLiftCycle.bootstrap
export const unmount = vueLiftCycle.unmount
export const mount = vueLiftCycle.mount

// 将子应用打包成lib库供父应用使用，创建vue.config.js进行配置

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')

