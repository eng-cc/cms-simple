import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/logger'
// import location from './modules/location.js'
// import selectBars from './modules/selectBars.js'
// import peopleMsg from './modules/peopleMsg.js'
// import upload from './modules/upload.js'
// import indexMsg from './modules/indexMsg.js'

Vue.use(Vuex)
Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
//     location,
//     selectBars,
//     peopleMsg,
//     upload,
//     indexMsg
  },
  strick: debug,
  plugins: debug ? [createLogger()] : []
})
