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
    customStyleArray: [],
    findTextArray: [],
    alertMessage: '',
    alertDialog: false,
    isPreview: false,
    ebookTitle: '',
    isDark: false,
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
      if (state.ebookDirectory !== false) {
        const temp = state.ebookDirectory.split('\\')
        if (temp[temp.length - 1].includes('/')) {
          const temp2 = temp[temp.length - 1].split('/')
          const title = temp2[temp2.length - 2]
          state.ebookTitle = title;
          document.getElementById('electron-title').text = 'DABOOK - ' + title
        } else {
          const title = temp[temp.length - 1]
          state.ebookTitle = title;
          document.getElementById('electron-title').text = 'DABOOK - ' + title
        }
      } 
    },
    SET_CUSTOMSTYLEARRAY: function (state, value) {
      state.customStyleArray = value;
    },
    SET_FINDTEXTARRAY: function (state, value) {
      state.findTextArray = value;
    },
    SET_ALERTMESSAGE: function (state,value) {
      state.alertDialog = true;
      state.alertMessage = value;
    },
    CANCEL_ALERTMESSAGE: function (state) {
      state.alertDialog = false;
    },
    SET_ISPREVIEW: function (state, value) {
      state.isPreview = value;
    },
    SET_ISDARK: function (state) {
      state.isDark = !state.isDark;
    }
  },
  actions: {
    setEditingText: function ({ commit }, value) {
      commit('SET_EDITINGTEXT', value);
    },
    setEbookDirectory: function ({ commit }, value) {
      commit('SET_EBOOKDIRECTORY', value);
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
    setCustomStyleArray: function ({ commit }, value) {
      commit('SET_CUSTOMSTYLEARRAY', value);
    },
    setFindTextArray: function ({ commit }, value) {
      commit('SET_FINDTEXTARRAY', value);
    },
    setAlertMessage : function({ commit }, value) {
      commit('SET_ALERTMESSAGE', value);
      setTimeout(function () {
        commit('CANCEL_ALERTMESSAGE');
      }, 3000);
    },
    cancelAlertMessage: function({ commit }) {
      commit('CANCEL_ALERTMESSAGE');
    },
    setIsPreview: function ({ commit }, value) {
      commit('SET_ISPREVIEW', value);
    },
    setIsDark: function ({ commit }) {
      commit('SET_ISDARK');
    },
  },

  modules: {
  }
})
