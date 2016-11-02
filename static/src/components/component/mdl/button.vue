<template lang="html">
  <button v-bind:disabled="disabled" v-bind:class="cssClasses" class="mdl-button mdl-js-button">
  <slot><i v-if="icon" class="material-icons">{{icon}}</i></slot>
</button>
</template>

<script>
import button from './mixins/button'

export default {
  mixins: [button]
}
</script>
