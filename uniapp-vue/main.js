import App from './App.vue'
import VeLine from 'v-charts/lib/line.common'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.component(VeLine.name, VeLine)
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  app.component(VeLine.name, VeLine)
  return {
    app
  }
}
// #endif