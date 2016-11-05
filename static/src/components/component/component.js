// components
import listGuideBar from './listGuideBar.vue'
import rectList from './list/rectList.vue'
import filterSlidebar from './sidebar/filter.vue'
import qiniuUpload from './upload/upload.vue'
// mdl
import mdlSelect from './mdl/select.vue'
import mdlButton from './mdl/button.vue'
import mdlTextField from './mdl/textField.vue'
import mdlTabs from './mdl/tabs/tabs.vue'
import mdlTab from './mdl/tabs/tab.vue'
import mdlRadio from './mdl/radio.vue'
import mdlDialogs from './mdl/dialogs.vue'

// directives
import mdlRippleEffect from './mdl/directives/ripple-effect'
import mdl from './mdl/directives/mdl'

export const components = {
  listGuideBar,
  rectList,
  filterSlidebar,
  qiniuUpload,
  mdlSelect,
  mdlButton,
  mdlTextField,
  mdlTabs,
  mdlRadio,
  mdlDialogs
}

export const directives = {
  mdl,
  mdlRippleEffect
}

export default {
  install (Vue) {
    // components
    Vue.component('list-guide-bar', listGuideBar)
    Vue.component('rect-list', rectList)
    Vue.component('filter-slidebar', filterSlidebar)
    Vue.component('qiniu-upload', qiniuUpload)
    // mdl
    Vue.component('mdl-select', mdlSelect)
    Vue.component('mdl-button', mdlButton)
    Vue.component('mdl-textfield', mdlTextField)
    Vue.component('mdl-tab', mdlTab)
    Vue.component('mdl-tabs', mdlTabs)
    Vue.component('mdl-radio', mdlRadio)
    Vue.component('mdl-dialog', mdlDialogs)
    // directives
    Vue.directive('mdl', mdl)
    Vue.directive('mdlRippleEffect', mdlRippleEffect)
  }
}

export {
  listGuideBar,
  rectList,
  filterSlidebar,
  qiniuUpload,
  mdlSelect,
  mdlButton,
  mdlTextField,
  // directive
  mdl,
  mdlRippleEffect
}
