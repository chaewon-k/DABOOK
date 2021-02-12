<template>
  <v-app>
    <v-main>
      <Editor />
    </v-main>
  </v-app>
</template>

<script>
import Editor from './views/Editor';
import "./assets/style.css";
let ipc = require('electron').ipcRenderer;

export default {
  name: 'App',

  components: {
    Editor,
  },
  created: function() {
    this.$i18n.locale = 'ko';
    let data = [];
    data.push({"title": this.$t('confirm.close-title')});
    data.push({"confirm": this.$t('confirm.close-confirm')});
    data.push({"cancel": this.$t('confirm.close-cancel')});
    ipc.send('close_dialog', data);
  },
};
</script>
<style>
/* 스크롤바 웹킷 엔진 */
::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background: #ffffff;
    /* display: none; */
}
::-webkit-scrollbar-thumb {
    border-radius: 3.5px;
    background-color: #dedeeb;
}
::-webkit-scrollbar-track {
    background: #ffffff;
}
</style>