import Vue from 'vue'
import App from './components/index.vue'
import VueRouter from 'vue-router'
import addArticle from './components/add_article/index.vue'
import login from './components/login/index.vue'
import addUser from './components/add_user/index.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [{
    path: '/add_article',
    component: addArticle
  }, {
    path: '/login',
    component: login
  }, {
    path: '/add_user',
    component: addUser
  }]
})

window.router = router

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
