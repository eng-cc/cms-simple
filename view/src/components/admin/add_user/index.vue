<template>
  <div class="mdl-grid">
    <div class="demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--6-col mdl-cell--3-offset">
      <div class="mdl-card__title mdl-card--expand">
        <h2 class="mdl-card__title-text">add user</h2>
      </div>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" v-model="loginMsg.username">
          <label class="mdl-textfield__label" for="sample3">用户名</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input class="mdl-textfield__input" type="text" v-model="loginMsg.password">
          <label class="mdl-textfield__label" for="sample3">密码</label>
        </div>
        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect" type="button" name="button" @click="login()">添加</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.demo-card-square.mdl-card {
width: 320px;
height: 320px;
}
.demo-card-square > .mdl-card__title {
color: #fff;
background: bottom right 15% no-repeat #46B6AC;
}
</style>

<script>
import common from '../../../common.js'
export default {
  data () {
    return {
      loginMsg: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      let jsonData = JSON.stringify(this.loginMsg)
      common.ajax('post', '/admin/adduser', this.afterLogin, jsonData, 'json')
    },
    afterLogin (data) {
      console.log(data)
    }
  }
}
</script>
