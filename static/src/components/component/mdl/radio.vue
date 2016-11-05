<template lang="html">
  <label v-bind:for.once="id" :class="{'is-disabled': disabled}" class="mdl-radio mdl-js-radio" :for="id">
    <input @change="changeCheck()" ref="input" v-bind:id.once="id" type="radio" v-bind:name.once="name" v-bind:value="value" v-bind:disabled="disabled" class="mdl-radio__button"/>
    <span class="mdl-radio__label">
      <slot></slot>
    </span>
</label>
</template>

<script>
import propFill from './mixins/prop-fill'

export default {
  data () {
    return {
    }
  },
  props: {
    id: String,
    name: String,
    value: {
      required: true
    },
    checked: {
      required: false,
      twoWay: true
    },
    disabled: {
      fill: true
    }
  },
  methods: {
    changeCheck () {
      this.$emit('change', this.value)
    }
  },
  mounted () {
    if (window.componentHandler) {
      componentHandler.upgradeElements(this.$el)
    }
    if (this.checked === 'true') {
      this.$el.classList.add('is-checked')
    } else {
      this.$el.classList.remove('is-checked')
    }
  },
  mixins: [propFill]
}
</script>
