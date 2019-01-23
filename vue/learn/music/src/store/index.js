
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import mutations from './mutations.js'
import * as actions from './actions.js'
import * as getters from './getters.js'
import createLogger from 'vuex/dist/logger'

Vuex.use(Vuex)

const debug=process.env.NODE_ENV!=='production'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict:debug,
    plugins:debug?[createLogger()]:[]
});