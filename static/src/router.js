import publicBox from './components/public/index.vue'
// const addArticle = resolve => require(['./components/admin/add_article/index.vue'], resolve)
// const login = resolve => require(['./components/admin/login/index.vue'], resolve)
// const addUser = resolve => require(['./components/admin/add_user/index.vue'], resolve)
import addArticle from './components/admin/add_article/index.vue'
import login from './components/admin/login/index.vue'
import addUser from './components/admin/add_user/index.vue'
import adminBox from './components/admin/index.vue'

module.exports = [{
  path: '/article/:id',
  component: publicBox
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
