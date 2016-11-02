<template lang="html">
  <div class="editorBox">
    <div id="toolbar"></div>
    <div id="editor"></div>
  </div>
</template>

<script>
import Quill from '../../../../node_modules/quill/dist/quill.min'
export default {
  name: 'my-editor',
  props: {
    size: {
      type: String
    }
  },
  methods: {
    async getUpToken () {
      this.upToken = await ajax('get', '/api/admin/uploadtoken/' + this.bucket.name)
      this.upload()
    }
  },
  mounted () {
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

<style lang="css">
  .ql-editor.ql-blank {
    min-height: 300px;
  }
  .ql-toolbar {
    border-left: 0 !important;
    border-right: 0 !important;
    border-top: 1px solid rgba(0, 0, 0, 0.12) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important
  }
  .ql-toolbar,
  .ql-container, {
    border-color: rgba(0, 0, 0, 0.12) !important;
  }
  .ql-container {
    border-width: 0 !important;
  }
  .editorBox {
    min-height: 343px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    border-right: 1px solid rgba(0, 0, 0, 0.12);
  }
</style>
