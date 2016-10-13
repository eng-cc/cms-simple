<template>
  <div class="">
    <br>
    <br>
    <br>
    <br>
    <br>
    <div v-if="getedTitleList">
      <label for="">选择栏目</label>
      <select class="" name="" v-model="activityFirCode" @change="getSecTitleList()">
        <option v-for="item in titleList" :value="item.id">{{item.name}}</option>
      </select>
      <select class="" name="" v-if="getedSecTitleList" v-model="activitySecCode" @change="getArticleList()">
        <option v-for="item in secTitleList" :value="item.id">{{item.name}}</option>
      </select>
    </div>
    <br>
    <br>
    <br>
    <p>添加文章</p>
    <label for="">title</label>
    <input type="text" v-model="addAtricleMsg.title">
    <p>
      <label for="">content</label>
      <div id="editor"></div>
    </p>
    <br>
    <button @click="addArticle()" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">submit</button>
    <br>
    <!-- 文章列表 -->
    <table class="mdl-data-table mdl-js-data-table">
      <thead>
        <tr>
          <th class="mdl-data-table__cell--non-numeric">id</th>
          <th>标题</th>
          <th>作者</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) of articleList">
          <td>{{index}}</td>
          <td>{{item.title}}</td>
          <td>{{item.author}}</td>
          <td>删除</td>
        </tr>
      </tbody>
    </table>
    <!-- 添加栏目 -->
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
        <input v-model="addTitleMsg.title" type="text" value="">
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
import common from '../../../common.js'
// import {ajax} from '../../../lib/ajax'
import Quill from '../../../../node_modules/quill/dist/quill'
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
        this.getSecTitleList()
      }
    },
    async getTitleList () {
      console.time(1)
      common.ajax('get', '/title', this.setTitleList)
      console.timeEnd(1)
      // if (msg.status) {
      //   this.titleList = msg.content
      //   this.getedTitleList = true
      // }
    },
    setTitleList (data) {
      console.log(data)
      if (data.status) {
        this.titleList = data.content
        this.getedTitleList = true
        this.getSecTitleList()
      }
    },
    getSecTitleList () {
      for (let i = this.titleList.length - 1; i >= 0; i--) {
        if (this.titleList[i].id === this.activityFirCode && this.titleList[i].subTitle.length > 0) {
          this.secTitleList = this.titleList[i].subTitle
          this.getedSecTitleList = true
        }
      }
      this.getArticleList()
    },
    getArticleList () {
      console.log(this.activitySecCode)
      if (this.activitySecCode || this.activitySecCode === 0) {
        common.ajax('get', '/article/' + this.activityFirCode + '|' + this.activitySecCode, this.setArticleList)
      }
    },
    setArticleList (data) {
      console.log(data)
      if (data.status) {
        this.articleList = data.content
      }
    },
    addArticle () {
      this.addAtricleMsg.belongs = this.activityFirCode + '|' + this.activitySecCode
      this.addAtricleMsg.content = document.querySelector('.ql-editor').innerHTML
      let jsonData = JSON.stringify(this.addAtricleMsg)
      common.ajax('post', '/article/add', this.doneThing, jsonData, 'json')
    }
  },
  mounted () {
    this.getTitleList()
    this.getArticleList()
    new Quill('#editor', { // eslint-disable-line
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline'],
          ['image', 'code-block']
        ]},
      theme: 'snow'
    })
  }
}
</script>
