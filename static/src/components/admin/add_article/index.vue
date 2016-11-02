<template>
  <section class="addArticleBox">
    <div class="addArticle">
      <mdl-select
        label="选择栏目"
        :value.sync="activityFirCode"
        :options="titleList"
        id="firTit"
        v-on:change="activityFirCode = $event"
      ></mdl-select>
      <mdl-select
        v-if="secTitleList.length > 0"
        label="二级栏目"
        :options.sync="secTitleList"
        id="secTit"
        :value="activitySecCode"
        v-on:change="activitySecCode = $event"
      ></mdl-select>
    </div>
    <div class="addArticle">
      <p>添加文章</p>
      <mdl-textfield
        id="addTit"
        label="标题"
        floatingLabel="true"
        v-on:change="addAtricleMsg.title = $event"
      ></mdl-textfield>
      <mdl-tabs selected="markdown" ref="contentInput">
        <mdl-tab tab="markdown">
          <textarea id="addArticleContentInput"></textarea>
        </mdl-tab>
        <mdl-tab tab="富文本">
          <editor></editor>
        </mdl-tab>
      </mdl-tabs>
      <p>
        <qiniu-upload
          upToken="sfesa"
          domain="scfwe"
        >
        <mdl-button
          v-mdl-ripple-effect
          raised
          colored="true"
        >添加附件</mdl-button>
        </qiniu-upload>
      </p>
      <p class="submitLine">
        <span @click="addArticle()">
          <mdl-button
            raised
            colored="true"
            v-mdl-ripple-effect
          >提交</mdl-button>
        </span>
      </p>
      <!-- 文章列表 -->
      <table class="mdl-data-table mdl-js-data-table" v-if="articleList.length > 0">
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
      <div class="">
        <span>
          <mdl-button
            raised
            colored="true"
            v-mdl-ripple-effect
          >
            添加栏目
          </mdl-button>
        </span>
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
  </section>
</template>

<style lang="less">
  html,
  body {
    min-height: 100%
  }
  .addArticleBox {
    padding: 30px;
  }

  #addArticleContentInput {
    min-height: 341px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-top: none;
    outline: none;
    color: #37474f;
    padding: 20px;
    box-sizing: border-box;
  }

  .submitLine {
    overflow: hidden;
    &>span {
      float: right;
    }
  }
</style>

<script>
import editor from '../../component/editor/index.vue'
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
  components: {
    editor
  },
  watch: {
    activityFirCode () {
      this.getSecTitleList()
    },
    activityTitleCode () {
      this.getArticleList()
    }
  },
  computed: {
    activityTitleCode () {
      if (this.secTitleList.length > 0 && this.activitySecCode.length > 0) {
        return this.activityFirCode + '|' + this.activitySecCode
      } else {
        return this.activityFirCode
      }
    }
  },
  methods: {
    async addTitle () {
      if (this.addTitleMsg.title && this.addTitleMsg.title.length > 0) {
        if (this.addTitleMsg.level === '2') {
          this.addTitleMsg.subTitle = this.addTitleMsg.title
        }
        let msg = await ajax('post', '/api/admin/title/add', this.addTitleMsg)
        console.log(msg)
        this.getTitleList()
        this.getSecTitleList()
      }
    },
    async getTitleList () {
      this.titleList = await ajax('get', '/api/title')
      this.activityFirCode = this.titleList[0].name
      this.getedTitleList = true
      this.getSecTitleList()
    },
    getSecTitleList () {
      this.secTitleList = []
      this.activitySecCode = ''
      for (let i = this.titleList.length - 1; i >= 0; i--) {
        if (this.titleList[i].name === this.activityFirCode && this.titleList[i].subTitle.length > 0) {
          this.secTitleList = this.titleList[i].subTitle
          this.getedSecTitleList = true
        }
      }
    },
    async getArticleList () {
      if (this.activityTitleCode !== '') {
        this.articleList = await ajax('get', '/api/article/' + this.activityTitleCode)
      }
    },
    async addArticle () {
      this.addAtricleMsg.belongs = this.activityTitleCode
      if (this.$refs.contentInput === '富文本') {
        this.addAtricleMsg.content = document.querySelector('.ql-editor').innerHTML
      } else {
        this.addAtricleMsg.content = document.querySelector('#addArticleContentInput').value
      }
      ajax('post', '/api/admin/article/add', this.addAtricleMsg)
      this.getArticleList()
    }
  },
  mounted () {
    this.getTitleList()
  }
}
</script>
