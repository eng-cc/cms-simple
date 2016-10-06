<template>
  <div class="">
    <br>
    <br>
    <br>
    <br>
    <br>
    <div v-if="getedTitleList">
      <label for="">选择栏目</label>
      <select class="" name="" v-model="activityFirCode" @change="getSecArticleList()">
        <option v-for="item in titleList" :value="item.id">{{item.name}}</option>
      </select>
      <select class="" name="" v-if="getedSecTitleList" v-model="activitySecCode">
        <option v-for="item in secTitleList" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <br>
    <br>
    <br>
    <p>添加文章</p>
    <label for="">title</label>
    <input type="text" v-model="addAtricleMsg.title">
    <label for="">content</label>
    <input type="text" v-model="addAtricleMsg.content">
    <br>
    <button @click="addArticle()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">submit</button>
    <br>
    <br>
    <div class="">
      <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">添加栏目</button>
      <div>
        <label  class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="radio-1">
          <input v-model="addTitleMsg.level" value="1" name="addTitleLevel" type="radio" id="radio-1" class="mdl-radio__button">
          <span class="mdl-checkbox__label">1</span>
        </label>
        <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect" for="radio-2">
          <input type="radio" value="2" v-model="addTitleMsg.level" name="addTitleLevel" id="radio-2" class="mdl-radio__button">
          <span class="mdl-checkbox__label">2</span>
        </label>
      </div>
      <label for="">选择栏目</label>
      <select class="" name="" v-model="addTitleMsg.firTitle">
        <option v-for="item in titleList" :value="item.id">{{item.name}}</option>
      </select>
      <div class="">
        <label for="">栏目名称</label>
        <input v-model="addTitleMsg.title" type="text" name="name" value="">
        <button @click="addTitle()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">添加</button>
      </div>
    </div>
  </div>
</template>

<style>
  html,
  body {
    min-height: 100%
  }
</style>

<script>
import common from '../../common.js'
export default {
  data () {
    return {
      addTitleMsg: {
        level: '',
        title: '',
        firTitle: '',
        subTitle: ''
      },
      addAtricleMsg: {
        content: '',
        title: '',
        belongs: null
      },
      getedTitleList: false,
      getedSecTitleList: false,
      titleList: [],
      articleList: [],
      activityFirCode: '',
      activitySecCode: '',
      secTitleList: []
    }
  },
  methods: {
    doneThing (data) {
      console.log(data)
      if (data.status) {
        this.getArticleList()
      }
    },
    addTitle () {
      if (this.addTitleMsg.title && this.addTitleMsg.title.length > 0) {
        if (this.addTitleMsg.level === '2') {
          this.addTitleMsg.subTitle = this.addTitleMsg.title
        }
        let jsonData = JSON.stringify(this.addTitleMsg)
        common.ajax('post', '/title/add', this.addedTitle, jsonData, 'json')
      }
    },
    addedTitle (data) {
      console.log(data)
      if (data.status) {
        this.getTitleList()
      }
    },
    getTitleList () {
      common.ajax('get', '/title', this.setTitleList)
    },
    setTitleList (data) {
      console.log(data)
      if (data.status) {
        this.titleList = data.content
        this.getedTitleList = true
      }
    },
    getSecArticleList () {
      for (let i = this.titleList.length - 1; i >= 0; i--) {
        if (this.titleList[i].id === this.activityFirCode && this.titleList[i].subTitle.length > 0) {
          this.secTitleList = this.titleList[i].subTitle
          this.getedSecTitleList = true
        }
      }
    },
    getArticleList () {
      common.ajax('get', '/article/' + this.activityFirCode + '|' + this.activitySecCode, this.setArticleList)
    },
    setArticleList (data) {
      console.log(data)
      if (data.status) {
        this.articleList = data.content
      }
    },
    addArticle () {
      this.addAtricleMsg.belongs = this.activityFirCode + '|' + this.activitySecCode
      let jsonData = JSON.stringify(this.addAtricleMsg)
      common.ajax('post', '/article/add', this.doneThing, jsonData, 'json')
    }
  },
  mounted () {
    this.getTitleList()
  }
}
</script>
