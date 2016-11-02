<template lang="html">
  <div class="filterBox">
    <div class="filter-title">{{msg.title}}</div>
    <div class="filter-container">
      <label v-for="item of msg.list" class="filter mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events" :for="'filter-subject-' + item">
        <input class="filter__input mdl-checkbox__input" type="checkbox" :id="'filter-subject-' + item">
        <span class="filter__label mdl-checkbox__label">{{item}}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'filter-slidebar',
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  mounted () {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
  .filter-title {
    font-size: 22px;
    font-weight: 700;
    margin-bottom: 22px;
  }
  .filter-container {
    margin-bottom: 30px;
    display: block;
    label {
      margin-bottom: 12px;
    }
    .mdl-checkbox.is-checked .mdl-checkbox__tick-outline {
      background-color: #00bcd4;
    }
    .mdl-checkbox.is-checked .mdl-checkbox__box-outline {
      border-color: #00bcd4;
    }
  }
</style>
