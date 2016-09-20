import {
  GET_LOCATION,
  REGAIN_LOCATION
} from '../mutation_types.js'

const state = {
  location: '正在获取......',
  geted: false
}

const mutations = {
  [GET_LOCATION] (state, location) {
    state.location = location
    state.geted = true
  },
  [REGAIN_LOCATION] (state) {
    state.location = '正在获取......'
    state.geted = false
  }
}

export default {
  state,
  mutations
}
