import {
  CHANGE_PEOPLENUMBER,
  SET_PEOPLEMSG
} from '../mutation_types.js'

const state = {
  peopleNumber: null,
  peopleMsg: null
}

const mutations = {
  [CHANGE_PEOPLENUMBER] (state, number) {
    state.peopleNumber = number
  },
  [SET_PEOPLEMSG] (state, peopleMsg) {
    state.peopleMsg = peopleMsg
  }
}

export default {
  state,
  mutations
}
