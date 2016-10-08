import Vue from 'vue'
// import selfComponent from './components/component/component'
import VueRouter from 'vue-router'
import App from './components/index.vue'
import addArticle from './components/admin/add_article/index.vue'
import login from './components/admin/login/index.vue'
import addUser from './components/admin/add_user/index.vue'
import adminBox from './components/admin/index.vue'
Vue.use(VueRouter)
// Vue.use(selfComponent)

const router = new VueRouter({
  // mode: 'history',
  base: __dirname,
  routes: [{
    path: '/',
    redirect: '/admin/add_article'
  }, {
    path: '/admin/',
    component: adminBox,
    children: [
      {
        path: 'add_article',
        component: addArticle
      }, {
        path: 'login',
        component: login
      }, {
        path: 'add_user',
        component: addUser
      }
    ]
  }]
})

window.router = router

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
