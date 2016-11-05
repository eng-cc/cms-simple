<template lang="html">
  <div class="addArticle">
    <mdl-textfield
      id="addTit"
      label="标题"
      floatingLabel="true"
      v-on:change="addAtricleMsg.title = $event"
    ></mdl-textfield>
    <mdl-tabs selected="markdown" ref="contentInput">
      <mdl-tab tab="markdown">
        <p>
          <span @click="$refs.markdown.open()">预览</span>
          <textarea id="addArticleContentInput"></textarea>
        </p>
      </mdl-tab>
      <mdl-tab tab="富文本">
        <editor></editor>
      </mdl-tab>
    </mdl-tabs>
    <mdl-dialog ref="markdown" title="预览">
      efg
    </mdl-dialog>
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
  </div>
</template>

<script>
import marked from '../../../lib/marked_config'
import editor from '../../component/editor/index.vue'
export default {
  data () {
    return {
      addAtricleMsg: {
        content: '',
        title: '',
        belongs: null
      }
    }
  },
  components: {
    editor
  },
  methods: {
    async addArticle () {
      this.addAtricleMsg.belongs = this.$parent.activityTitleCode
      if (this.$refs.contentInput === '富文本') {
        this.addAtricleMsg.content = document.querySelector('.ql-editor').innerHTML
      } else {
        this.addAtricleMsg.content = marked(document.querySelector('#addArticleContentInput').value)
      }
      await ajax('post', '/api/admin/article/add', this.addAtricleMsg)
      this.$parent.getArticleList()
    }
  }
}
</script>

<style lang="css">
</style>
