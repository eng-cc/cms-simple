<template lang="html">
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
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="css">
</style>
