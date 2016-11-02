<template>
  <div class="public-box">
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header has-drawer is-upgraded">
      <header role="banner" class="mdl-layout__header is-casting-shadow">
        <div class="mdl-layout__drawer-button">
          <i class="material-icons">menu</i>
        </div>
        <div class="mdl-layout__header-row">
          <span class="mdl-layout-title">logo</span>
          <div class="mdl-layout-spacer"></div>
          <div class="mdl-layout-search mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
            <label class="mdl-button mdl-js-button mdl-button--icon js-search-button" for="fixed-header-drawer-exp">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
              <input class="mdl-textfield__input" type="text" name="q" id="fixed-header-drawer-exp">
            </div>
          </div>
          <nav class="mdl-navigation mdl-layout--large-screen-only">
            <router-link :to="'/article/' + item.name" v-for="item of titleList" class="mdl-navigation__link">{{item.name}}</router-link>
          </nav>
        </div>
      </header>
      <div class="mdl-layout__drawer public-drawer">
        <div @click="closeDrawer()" class="mdl-layout__drawer-button mdl-layout__drawer-button--close">
          <i class="material-icons">close</i>
        </div>
        <nav class="mdl-navigation">
          <router-link :to="'/article/' + item.name" v-for="item of titleList" class="mdl-navigation__link">{{item.name}}</router-link>
          <router-link to="/admin/" class="mdl-navigation__link">admin</router-link>
        </nav>
      </div>
      <main class="mdl-layout__content">
        <div class="page-content">
          <list-guide-bar :msg="test"></list-guide-bar>
          <list></list>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import list from './list/index.vue'
export default {
  data () {
    return {
      titleList: [],
      inited: false,
      test: {fir: 'fir', sec: 'sec'}
    }
  },
  components: {
    list
  },
  async created () {
    this.titleList = await ajax('get', '/api/title')
  },
  methods: {
    closeDrawer () {
      document.querySelector('.mdl-layout__drawer').classList.remove('is-visible')
      document.querySelector('.mdl-layout__obfuscator').classList.remove('is-visible')
    }
  }
}
</script>

<style lang="less">
  html,
  body {
    min-height: 100%;
    color: #37474f;
  }

  a {
    color: #008394;
    text-decoration: none;
    &:hover {
      text-decoration: underline;;
    }
  }

  .public-box .mdl-layout__header-row,
  .public-box .mdl-layout__header {
    height: 56px;
    min-height: 56px;
    background-color: #37474f;
  }

  .public-box .mdl-layout__header .mdl-layout__header-row {
    .mdl-layout-search {
      padding: 20px;
    }

    .mdl-navigation {
      .mdl-navigation__link {
        border-bottom: 3px solid transparent;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 400;
        line-height: 50px;
        margin: 0 24px;
        padding: 3px 0 0;
        &:hover {
          border-bottom: 3px solid #00bcd4;
          text-decoration: none;
        }
      }
      .router-link-active {
        border-bottom: 3px solid #00bcd4;
      }
    }
  }
  @media only screen and (min-width: 841px) {
    .public-box {
      .mdl-layout__header .mdl-layout__header-row {
          padding: 0 100px 0 40px;
      }
    }
  }

    .mdl-layout__drawer.public-drawer.is-visible {
      webkit-transform: translateX(0);
      transform: translateX(0);
    }
    .mdl-layout__drawer.public-drawer {
      background-color: #00a4b5;
      opacity: .9;
      position: fixed;
      transform: translateX(100%);
      width: 100%;
      .mdl-navigation {
        margin: 50px 0;
      }
      .mdl-layout__drawer-button {
        color: #fff;
        height: 56px;
        left: auto;
        line-height: 53px;
        margin: 0 30px;
        right: 0;
        width: 56px;
        i {
            vertical-align: middle;
        }
        &:hover {
          border-bottom: 3px solid #00bcd4;
        }
      }
      .mdl-navigation__link {
        color: #fff;
        text-align: center;
        font-size: 24px;
        &:hover {
          background-color: #fff !important;
          color: #008394;
          text-decoration: none;
        }
      }
    }
    .mdl-layout__header .mdl-layout__drawer-button {
      color: #fff;
      height: 56px;
      left: auto;
      outline: none;
      line-height: 53px;
      margin: 0 30px;
      right: 0;
      width: 56px;
      &:hover {
        border-bottom: 3px solid #00bcd4;
      }
      i {
          vertical-align: middle;
      }
    }
</style>
