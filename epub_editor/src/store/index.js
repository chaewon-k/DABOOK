import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentDirectory: [], // Directory's item
    tableOfContents: [], // TableOfContents' item
    editingText: '', //textarea's text value
    editingHTMLText: '',  //default HTML text value
    currentFileDir: ''  //default HTML text value
  },
  mutations: {
    SET_EDITINGTEXT(state, value){
      state.editingText=value;
    },
    SET_EDITINGHTML(state, value){
      state.editingHTMLText=value;
    },
    SET_CURRENTFILEDIR(state, value){
      state.currentFileDir=value;
    }
  },
  actions: {
    setEditingText:function({commit},value){
      commit('SET_EDITINGTEXT',value);
    },
    setHTMLText:function({commit},value){
      commit('SET_EDITINGHTML',value);
    },
    setCurrentFileDir:function({commit},value){
      commit('SET_EDITINGHTML',value);
    }
  },
  modules: {
  }
})
