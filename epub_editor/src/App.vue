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
  mounted: function () {
    ipcRenderer.on('isMac', function (event, message) {
      console.log('22')
      if (message === true) {
        console.log('33')
        this.$store.dispatch('setOsDirectory','/Contents/Resources/')
      }
    }.bind(this))
  },
  data: function () {
    return {
    }
  },
};
</script>
