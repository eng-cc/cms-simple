import {
  UPLOAD_BACK_MSG
} from '../mutation_types.js'

const state = {
  url: null
}

const mutations = {
  [UPLOAD_BACK_MSG] (state, url) {
    state.url = url
  }
}

export default {
  state,
  mutations
}
