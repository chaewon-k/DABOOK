import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ebookDirectory: [], // ebook's root directory
    ebookDirectoryTree: [], // Directory's item
    selectedFileDirectory: '', // selected file's directory
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
