<template lang="html">
  <section class="listBox mdl-grid">
    <div class="mdl-cell mdl-cell--3-col section-block">
      <filter-slidebar :msg="filterBar"></filter-slidebar>
    </div>
    <div class="mdl-cell mdl-cell--9-col section-block">
      <div class="content-container">
        <rect-list :msg="linkMsg"></rect-list>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      filterBar: {
        title: 'qqq',
        list: ['www', 'qqq']
      },
      linkMsg: {
        id: 'ww',
        img: '/dist/dark-background.jpg?49ff45765e2cb69ab67ab77cab2a7d7f',
        extract: 'eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        title: 'rrrrrrrrrrrrrrrrrrrrrrrrrrrrr'
      }
    }
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
  .listBox {
    padding: 30px 50px;
  }

  .section-block {
    padding: 20px;
    flex-direction: column;
    .content-container {
      align-items: stretch;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

@media only screen and (min-width: 841px) {

}
</style>
