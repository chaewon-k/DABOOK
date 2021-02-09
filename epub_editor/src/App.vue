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

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

export default {
  name: 'App',
  components: {
    Editor,
  },
  mounted: function (event, message) {
    ipcRenderer.on('isMac', function () {
      if (message === true) {
        this.$store.dispatch('setIsMac','./Contents/Resources/')
      } else if (message === false) {
        return
      }
    })
  },
  data: function () {
    return {
    }
  },
};
</script>
