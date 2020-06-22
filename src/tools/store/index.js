import Vue from 'vue'
import vuex from 'vuex'
import token from './token'

Vue.use(vuex)

export default new vuex.Store({
  modules: {
    token: token
  }
})
