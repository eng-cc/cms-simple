<template lang="html">
  <div v-bind:class="{'mdl-textfield--floating-label': floatingLabel, 'mdl-textfield--expandable': expandable, 'is-dirty': isDirty, 'is-disabled': disabled}" class="mdl-textfield mdl-js-textfield">
  <slot v-if="expandable" name="expandable-button">
    <label v-bind:for.once="id" class="mdl-button mdl-js-button mdl-button--icon"><i class="material-icons">{{expandable}}</i></label>
  </slot>
  <div v-bind:class="{'mdl-textfield__expandable-holder': expandable}">
    <slot v-if="textarea" name="textarea">
      <textarea type="text" v-model="result" v-bind:required="required" v-bind:id.once="id" v-bind:rows="rows" v-bind:disabled="disabled" v-bind:readonly="readonly" v-bind:maxlength="maxlength" class="mdl-textfield__input"></textarea>
    </slot>
    <slot v-else name="input">
      <input type="text" v-model="result" v-bind:id.once="id" v-bind:pattern="pattern" v-bind:disabled="disabled" v-bind:required="required" v-bind:readonly="readonly" v-bind:maxlength="maxlength" class="mdl-textfield__input"/>
    </slot>
    <slot name="label">
      <label v-bind:for.once="id" class="mdl-textfield__label">{{label}}</label>
    </slot>
    <slot name="error">
      <label v-if="error" class="mdl-textfield__error">{{error}}</label>
    </slot>
  </div>
</div>
</template>

<script>
import propFill from './mixins/prop-fill'

export default {
  data () {
    return {
      isDirty: '',
      result: ''
    }
  },
  props: {
    maxlength: {
      required: false
    },
    expandable: String,
    rows: {
      required: false
    },
    id: String,
    value: {
      required: false
    },
    disabled: {
      type: [Boolean, String],
      fill: true,
      required: false,
      default: false
    },
    required: {
      type: [Boolean, String],
      fill: true,
      required: false,
      default: false
    },
    readonly: {
      type: [Boolean, String],
      fill: true,
      required: false,
      default: false
    },
    label: String,
    pattern: String,
    error: String,
    textarea: {
      fill: true
    },
    floatingLabel: {
      required: false
    }
  },
  watch: {
    result () {
      this.$emit('change', this.result)
    }
  },
  mounted () {
    if (window.componentHandler) {
      window.componentHandler.upgradeElement(this.$el)
    }
    this.result = this.value
    if (this.floatingLabel && this.label == null) {
      this.label = this.floatingLabel
      this.$watch('floatingLabel', function (val) {
        this.label = val
      })
    }
  },
  mixins: [propFill]
}
</script>
