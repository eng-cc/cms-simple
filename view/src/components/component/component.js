import listGuideBar from './listGuideBar.vue'
import rectList from './list/rectList.vue'
import filterSlidebar from './sidebar/filter.vue'

const selfComponent = {}
selfComponent.install = function (Vue) {
  Vue.component('list-guide-bar', listGuideBar)
  Vue.component('rect-list', rectList)
  Vue.component('filter-slidebar', filterSlidebar)
}

export default selfComponent
