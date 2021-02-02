import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ebookDirectory: '', // ebook's root directory
    ebookDirectoryTree: [], // Directory's item
    selectedFileDirectory: '', // selected file's directory
    tableOfContents: [], // TableOfContents' item
    editingText: '', //textarea's text value
    editingHTMLText: '',  //default HTML text value

    editingTextArr: [],
    editingTextArrPoint: 0,
    arrSize: 20,
  },

  mutations: {
    SET_EDITINGTEXT: function (state, value) {
      state.editingText = value;
    },
    SET_SELECTEDFILEDIRECTORY: function (state, value) {
      state.selectedFileDirectory = value;
    },
    SET_EBOOKDIRECTORYTREE: function (state, value) {
      state.ebookDirectoryTree = value;
    },
    SET_TABLEOFCONTENTS: function (state, value) {
      state.tableOfContents = value;
    },
    ADD_TABLEOFCONTENTS: function (state, value) {
      state.tableOfContents.push({text: value});
    },
    SET_EDITINGHTML: function (state, value) {
      state.editingHTMLText = value;
    },
    SET_EBOOKDIRECTORY: function (state, value) {
      state.ebookDirectory = value;
    },
    PUSH_EDITINGTEXTARR: function (state) {
      state.editingTextArr[state.editingTextArrPoint] = state.editingText;
    },
    SHIFT_EDITINGTEXTARR: function (state){
      state.editingTextArr.shift();
    },
    UP_EDITINGTEXTARRPOINT: function (state) {
      state.editingTextArrPoint = state.editingTextArrPoint + 1;
    },
    DOWN_EDITINGTEXTARRPOINT: function (state) {
      state.editingTextArrPoint = state.editingTextArrPoint - 1;
    }
  },
  actions: {
    setEditingText: function ({ commit }, value) {
      commit('SET_EDITINGTEXT', value);
    },
    setSelectedFileDirectory: function ({ commit }, value) {
      commit('SET_SELECTEDFILEDIRECTORY',value);
    },
    setEbookDirectoryTree: function ({ commit }, value) {
      commit('SET_EBOOKDIRECTORYTREE',value);
    },
    setTableOfContents: function ({ commit }, value) {
      commit('SET_TABLEOFCONTENTS',value);
    },
    addTableOfContents: function ({ commit }, value) {
      commit('ADD_TABLEOFCONTENTS', value);
    },
    setHTMLText: function ({ commit }, value) {
      commit('SET_EDITINGHTML', value);
    },
  },

  modules: {
  }
})
