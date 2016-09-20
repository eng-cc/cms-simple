import {
  CHANGE_JGBAR,
  CHANGE_FAMILYBAR,
  CHANGE_ZCJBBAR,
  CHANGE_ZGLBBAR,
  CHANGE_JTDQBAR
} from '../mutation_types.js'

const state = {
  jgBar: null,
  familyBar: null,
  zcjbBar: null,
  zgxlBar: null,
  jtdqBar: null
}

const mutations = {
  [CHANGE_JGBAR] (state, code) {
    state.jgBar = code
  },
  [CHANGE_FAMILYBAR] (state, code) {
    state.familyBar = code
  },
  [CHANGE_ZCJBBAR] (state, code) {
    state.zcjbBar = code
  },
  [CHANGE_ZGLBBAR] (state, code) {
    state.zgxlBar = code
  },
  [CHANGE_JTDQBAR] (state, code) {
    state.jtdqBar = code
  }
}

export default {
  state,
  mutations
}
