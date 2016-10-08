import editor from './editor/index.vue'

const selfComponent = {}
selfComponent.install = function (Vue) {
  Vue.component('my-editor', editor)
}

export default selfComponent
