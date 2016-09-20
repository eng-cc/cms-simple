import {
  REGET_INDEX_MSG
} from '../mutation_types.js'

const state = {
  reget: 1
}

const mutations = {
  [REGET_INDEX_MSG] (state) {
    state.reget++
  }
}

export default {
  state,
  mutations
}
