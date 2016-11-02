<template lang="html">
  <span :ref="'ripple'"
        v-show="!noRippleEffect"
        class="mdl-tabs__ripple-container mdl-js-ripple-effect">
    <span class="mdl-ripple"></span>
  </span>
</template>

<script>
export default {
  props: {
    noRippleEffect: {
      required: false,
      default: false
    }
  },
  mounted () {
    if (window.componentHandler) {
      window.componentHandler.upgradeElement(this.$refs.ripple, 'MaterialRipple')
    }
  }
}
</script>

<style lang="css">
</style>
