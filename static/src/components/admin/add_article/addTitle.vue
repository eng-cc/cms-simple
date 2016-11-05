<template lang="html">
  <div class="">
    <div>
      <mdl-radio
      value="1"
      v-mdl-ripple-effect
      checked="false"
      name="select"
      v-on:change="addTitleMsg.level = $event"
      >1</mdl-radio>
      <mdl-radio
        v-mdl-ripple-effect
        value="2"
        checked="false"
        name="select"
        v-on:change="addTitleMsg.level = $event"
      >2</mdl-radio>
  </div>
  <mdl-select
    v-if="addTitleMsg.level == 2"
    label="选择栏目"
    :value.sync="$parent.activityFirCode"
    :options="$parent.titleList"
    id="firTitAdd"
    v-on:change="addTitleMsg.firTitle = $event"
  ></mdl-select>
  <div class="">
    <mdl-textfield
      id="addTitMsg"
      label="栏目名称"
      floatingLabel="true"
      v-on:change="addTitleMsg.title = $event"
    ></mdl-textfield>
    <span @click="addTitle()">
      <mdl-button
        v-mdl-ripple-effect
        colored="true"
        >
        添加
      </mdl-button>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addTitleMsg: {
        level: '',
        title: '',
        firTitle: '',
        subTitle: ''
      }
    }
  },
  methods: {
    async addTitle () {
      if (this.addTitleMsg.title && this.addTitleMsg.title.length > 0) {
        if (this.addTitleMsg.level === '2') {
          this.addTitleMsg.subTitle = this.addTitleMsg.title
          this.addTitleMsg.firTitle = this.addTitleMsg.firTitle.length > 0 ? this.addTitleMsg.firTitle : this.$parent.activityFirCode
        }
        await ajax('post', '/api/admin/title/add', this.addTitleMsg)
        this.$parent.getTitleList()
      }
    }
  }
}
</script>

<style lang="css">
</style>
