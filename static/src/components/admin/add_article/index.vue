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
    <!-- 文章列表 -->
    <article-list-bar :articleList="articleList"></article-list-bar>
    <span @click="isAddArticle = !isAddArticle">
      <mdl-button
        raised
        colored="true"
        v-mdl-ripple-effect
        >
        添加文章
      </mdl-button>
    </span>
    <!-- 添加文章 -->
    <add-article-bar v-if="isAddArticle"></add-article-bar>
      <!-- 添加栏目 -->
      <span @click="isAddTitle = !isAddTitle">
        <mdl-button
        raised
        colored="true"
        v-mdl-ripple-effect
        >
        添加栏目
      </mdl-button>
    </span>
    <add-title-bar v-if="isAddTitle"></add-title-bar>
    </div>
  </section>
</template>

<script>
import addTitleBar from './addTitle.vue'
import addArticleBar from './addArtivle.vue'
import articleListBar from './articleList.vue'
export default {
  data () {
    return {
      isAddArticle: false,
      isAddTitle: false,
      titleList: [],
      articleList: [],
      activityFirCode: '',
      activitySecCode: '',
      secTitleList: []
    }
  },
  components: {
    addArticleBar,
    articleListBar,
    addTitleBar
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
  created () {
    ajax('get', '/api/admin')
  },
  methods: {
    async getTitleList () {
      let msg = await ajax('get', '/api/title')
      this.titleList = msg.content
      this.activityFirCode = this.titleList[0].name
      this.getSecTitleList()
    },
    getSecTitleList () {
      this.secTitleList = []
      this.activitySecCode = ''
      for (let i = this.titleList.length - 1; i >= 0; i--) {
        if (this.titleList[i].name === this.activityFirCode && this.titleList[i].subTitle.length > 0) {
          this.secTitleList = this.titleList[i].subTitle
        }
      }
      this.activitySecCode = this.secTitleList[0].name
    },
    async getArticleList () {
      if (this.activityTitleCode !== '') {
        let msg = await ajax('get', '/api/article/' + this.activityTitleCode)
        this.articleList = msg.content
      }
    }
  },
  mounted () {
    this.getTitleList()
  }
}
</script>

<style lang="less">
  html,
  body {
    min-height: 100%
  }
  .addArticleBox {
    padding: 30px;
    max-width: 960px;
    margin: auto;
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
