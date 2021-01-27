import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ebookDirectory: '', // ebook's root directory
    ebookDirectoryTree: [], // Directory's item
    selectedFileDirectory: '', // selected file's directory
    tableOfContents: [], // TableOfContents' item
    editingText: '', //textarea's text value
    editingHTMLText: '',  //default HTML text value
    // currentFileDir: ''  //default HTML text value
  },
  mutations: {
    SET_EDITINGTEXT(state, value){
      state.editingText=value;
    },
    SET_EDITINGHTML(state, value){
      state.editingHTMLText=value;
    },
    SET_EBOOKDIRECTORY(state,value){
      state.ebookDirectory=value;
    }
  },
  actions: {
    setEditingText:function({commit},value){
      commit('SET_EDITINGTEXT',value);
    },
    setHTMLText:function({commit},value){
      commit('SET_EDITINGHTML',value);
    },
  },
  modules: {
  }
})
