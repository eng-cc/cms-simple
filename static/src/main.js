import Vue from 'vue'
import selfComponent from './components/component/component'
import VueRouter from 'vue-router'
import ajax from './lib/ajax'
import routerConfig from './router'
import App from './components/index.vue'

Vue.use(VueRouter)
Vue.use(selfComponent)

const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  routes: routerConfig
})

window.router = router
window.ajax = ajax

Vue.nextTick(() => {
  setTimeout(() => {
    window.componentHandler.upgradeDom()
  }, 1000)
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
