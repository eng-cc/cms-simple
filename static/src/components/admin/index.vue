<template>
    <div id="app" class="mdl-layout mdl-js-layout mdl-layout--fixed-header
            mdl-layout--fixed-header">
      <header class="mdl-layout__header">
        <div class="mdl-layout-icon"></div>
        <div class="mdl-layout__header-row">
          <div class="mdl-layout-spacer"></div>
        </div>
      </header>
      <div class="mdl-layout__drawer">
        <span class="mdl-layout-title">用户面板</span>
        <nav class="mdl-navigation">
          <router-link class="mdl-navigation__link" to="/admin/add_article">添加文章</router-link>
          <!-- <a class="mdl-navigation__link" href="">添加文章</a> -->
          <!-- <router-link class="mdl-navigation__link" to="/add_article">添加文章</router-link> -->
          <a class="mdl-navigation__link" href="">首页设置</a>
          <a class="mdl-navigation__link" href="">换肤</a>
          <router-link class="mdl-navigation__link" to="/admin/add_user">添加管理员</router-link>
          <!-- <a class="mdl-navigation__link" href="">添加管理员</a> -->
        </nav>
      </div>
      <main class="mdl-layout__content">
        <div class="page-content">
          <router-view></router-view>
        </div>
      </main>
    </div>
</template>

<style>
  html,
  body {
    min-height: 100%
  }
</style>

<script>
export default {
  data () {
    return {
      msg: 'Hello my cms'
    }
  }
}
</script>
