<style>
.getmdl-select .mdl-icon-toggle__label {
  float:right;
  margin-top:-30px;
  color: rgba(0, 0, 0, 0.4);
}

.getmdl-select.is-focused .mdl-icon-toggle__label {
  color: #3f51b5;
}

.getmdl-select .mdl-menu__container {
  width: 100% !important;
}
.getmdl-select .mdl-menu__container .mdl-menu {
  width: 100%;
}
</style>

<template lang="html">
  <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label getmdl-select" ref="textfield">
    <input v-bind:id.once="id" v-model="name" :value="name" type="text" readonly="" tabindex="-1" class="mdl-textfield__input"/>
    <label v-bind:for.once="id"><i class="mdl-icon-toggle__label material-icons">keyboard_arrow_down</i></label>
    <label v-bind:for.once="id" class="mdl-textfield__label">{{label}}</label>
    <ul v-bind:for.once="id" ref="menu" class="mdl-menu mdl-menu--bottom-left mdl-js-menu">
      <li v-for="option in optionsObject" v-on:click="selectValue(option, $event)" class="mdl-menu__item">{{option.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mdl-sele',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    selectValue (option, event) {
      this.name = option.name
      if (this.$refs.menu.MaterialMenu) {
        this.$refs.menu.MaterialMenu.hide()
      }
      if (!this.value) {
        this.$refs.textfield.MaterialTextfield.boundBlurHandler()
        this.$refs.textfield.MaterialTextfield.change(this.name)
      }
      this.$emit('change', this.name)
    },
    setName () {
      this.name = null
      for (let i = 0; i < this.optionsObject.length; ++i) {
        let option = this.optionsObject[i]
        if (this.value === option.value) this.name = option.name
      }
      if (!this.name) this.name = this.value
      if (this.$refs.textfield.MaterialTextfield) {
        this.$refs.textfield.MaterialTextfield.change(this.name)
        this.$refs.textfield.MaterialTextfield.boundBlurHandler()
      }
    }
  },
  computed: {
    optionsObject () {
      if (this.options && this.options.length !== undefined) {
        return this.options.map((option) => {
          if (typeof option === 'string') {
            return {
              name: option,
              value: option
            }
          } else {
            return option
          }
        })
      } else {
        return []
      }
    }
  },
  props: {
    label: String,
    id: {
      required: true
    },
    value: {
      required: false,
      default: ''
    },
    options: {
      required: true
    }
  },
  mounted () {
    if (window.componentHandler) {
      window.componentHandler.upgradeElements(this.$el)
    }
    this.setName()
  },
  watch: {
    value () {
      this.setName()
    }
  }
}
</script>
