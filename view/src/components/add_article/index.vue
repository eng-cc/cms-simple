<template>
    <div class="">
      <br>
      <br>
      <br>
      <br>
      <br>
      <label for="">选择栏目</label>
      <select class="" name="">
        <option>1</option>
        <option>1</option>
        <option>1</option>
        <option>1</option>
        <option>1</option>
      </select>
      <select class="" name="">
        <option>1</option>
        <option>1</option>
        <option>1</option>
        <option>1</option>
        <option>1</option>
      </select>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <div class="">
        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">添加栏目</button>
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
        title: ''
      }
    }
  },
  methods: {
    addTitle () {
      let jsonData = JSON.stringify(this.addTitleMsg)
      common.ajax('post', '/article/add', this.addedTitle, jsonData, 'json')
    },
    addedTitle (data) {
      console.log(data)
    }
  }
}
</script>
