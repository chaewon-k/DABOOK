import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDirectory: [], // Directory's item
    tableOfContents: [], // TableOfContents' item
    editingText: '' //textarea's text value
  },
  mutations: {
    SET_EDITINGTEXT(state, value){
      state.editingText=value;
    },
  },
  actions: {
    setEditingText:function({commit},value){
      commit('SET_EDITINGTEXT',value);
    }
  },
  modules: {
  }
})
