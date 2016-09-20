import Vue from 'vue'
import VueRouter from 'vue-router'
import common from './common.js'
// import store from './vuex/store.js'
import routerMap from './router.js'

Vue.use(VueRouter)
// var App = Vue.extend({store})
var router = new VueRouter({
  mode: 'history',
  routers: routerMap
})

window.router = router
router.beforeEach(() => {
  console.clear()
})
router.afterEach(() => {
  setTimeout(function () {
    $('.tablesorter').tablesorter()
  }, 3000)
  setTimeout(function () {
    common.autoChangeTitle()
  }, 250)
})

// const App = {
//   temponent: require('./components/index.vue')
// }

new Vue({
  router,
  render: h => h(require('./components/index.vue'))
}).$mount('#app')
