<template>
  <div class="mdl-tabs is-upgraded">
    <!-- Generated tab links -->
    <div class="mdl-tabs__tab-bar">
      <a
        class="mdl-tabs__tab"
        track-by="id"
        :class="{ 'is-active': isSelected(tab) }"
        @click="selectTab(tab)"
        :no-ripple-effect="noRippleEffect"
        v-for="(tab, index) in tabs">
        {{tab.title}}
        <tab-button></tab-button>
      </a>
    </div>
    <!-- Tabs content -->
    <slot></slot>
  </div>
</template>
<style scoped>
  a {
    cursor: pointer;
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }
</style>
<script>
import propFill from '../mixins/prop-fill'
import tabButton from './tab-button.vue'

// indexOf with object
function findTabIndex (tabs, id) {
  for (let i = 0; i < tabs.length; ++i) {
    if (tabs[i].id === id) {
      return i
    }
  }
  return -1
}

export default {
  props: {
    selected: {
      required: true,
      twoWay: true
    },
    noRippleEffect: {
      fill: true,
      required: false
    }
  },
  data () {
    return {
      tabs: [],
      sele: ''
    }
  },
  methods: {
    selectTab ({id}) {
      this.sele = id
    },
    isSelected ({id}) {
      return id === this.sele
    },
    addTab (tab) {
      // TODO check for duplicates and throw error
      this.tabs.push(tab)
    },
    updateTab ({id}, tab) {
      const index = findTabIndex(this.tabs, id)
      if (index > -1) this.tabs.splice(index, 1, tab)
    },
    removeTab ({id}) {
      const index = findTabIndex(this.tabs, id)
      if (index > -1) this.tabs.splice(index, 1)
    }
  },
  mixins: [propFill],
  components: {
    tabButton
  },
  mounted () {
    this.sele = this.selected
  }
}
</script>
