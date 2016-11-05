<template>
  <div v-show="show" class="mdl-dialog-container">
    <div class="mdl-dialog">
      <div class="mdl-dialog__title">{{title}}</div>
      <div class="mdl-dialog__content">
        <slot></slot>
      </div>
      <div v-bind:class="{ &quot;mdl-dialog__actions--full-width&quot;: fullWidth }" class="mdl-dialog__actions">
        <slot name="actions">
          <span @click.stop="close">
            <mdl-button class="mdl-js-ripple-effect">Close</mdl-button>
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import propFill from './mixins/prop-fill'
import mdlButton from './button.vue'

export default {
  components: {
    mdlButton
  },
  data () {
    return {
      show: false
    }
  },
  props: {
    title: {
      type: String
    },
    fullWidth: {
      fill: true,
      default: false
    }
  },
  methods: {
    open () {
      this.show = true
      this.$emit('open')
    },
    close () {
      this.show = false
      this.$emit('close')
    }
  },
  mixins: [propFill]
}
</script>
<style>
.mdl-dialog-container {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  align-items: center;
  top:0;
  left: 0;
  z-index: 10000;
  background: rgba(0,0,0,0.3);
}
.mdl-dialog-container .mdl-dialog {
  background-color:white;
  padding: 1em;
  color: black;
  width: initial;
  min-width: 280px;
}
</style>
