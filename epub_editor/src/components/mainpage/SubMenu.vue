<template>
  <div id="subMenu">
    <!-------------------- file tap start -------------------->
    <FileTab v-show="itemIndex === 0" />

    <!-------------------- edit tap start -------------------->
    <EditTab v-show="itemIndex === 1" />

    <ToolsTab v-show="itemIndex === 2" />

    <!-------------------- style tap start -------------------->
    <StyleTab v-show="itemIndex === 3" />

    <!-------------------- setting tap start -------------------->
    <div v-show="itemIndex === 4">
      <v-tabs show-arrows v-model="tab">
        <v-btn class="align-self-center" @click="changeLocale" text>{{
          $i18n.locale == 'ko' ? '한글' : 'English'
        }}</v-btn>
        <v-btn class="align-self-center" v-model="$vuetify.theme.dark" @click="changeTheme" text>{{
          $vuetify.theme.dark == true ? 'dark mode' : 'light mode'
        }}</v-btn>
      </v-tabs>
    </div>

    <!-------------------- manual tap start -------------------->
    <div v-show="itemIndex === 5">
      <v-tabs show-arrows v-model="tab">
        <v-btn class="align-self-center" text @click="popUpEditor">{{ $t('manual') }}</v-btn>
        <!-- <v-btn class="align-self-center" text>마크다운 설명서 보기</v-btn> -->
      </v-tabs>
    </div>
  </div>
</template>

<script>
import FileTab from '@/components/mainpage/menutabs/FileTab';
import EditTab from '@/components/mainpage/menutabs/EditTab';
import ToolsTab from '@/components/mainpage/menutabs/ToolsTab';
import StyleTab from '@/components/mainpage/menutabs/StyleTab';

const path = require('path');
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;
let win;

export default {
  name: 'SubMenu',
  components: {
    FileTab,
    EditTab,
    ToolsTab,
    StyleTab,
  },
  props: {
    itemIndex: { type: Number },
  },
  data: function() {
    return {
      tab: null,
    };
  },
  mounted: function() {
    this.eBookDialog = false;
    ipcRenderer.on(
      'helpTab',
      function(event, message) {
        if (message === 0) {
          this.popUpEditor();
        }
      }.bind(this)
    );
  },
  methods: {
    popUpEditor: function() {
      console.log(BrowserWindow.getAllWindows());
      if (BrowserWindow.getAllWindows().length >= 2) {
        win.focus();
      } else {
        win = new BrowserWindow({ width: 800, height: 1500 });
        const p = path.resolve(
          `/Applications/DABOOK.app/Contents/Resources/src/assets/manual/manual.html`
        ); // for build
        //const p = path.resolve(`.src/assets/manual/manual.html`);  // for mac test
        //const p = path.resolve(`./resources/src/assets/manual/manual.html`);  // for win build
        //const p = path.resolve("./src/assets/manual/manual.html"); // for win test
        win.loadURL('file://' + p, function() {});
      }
    },
    changeLocale: function() {
      if (this.$i18n.locale === 'en') this.$i18n.locale = 'ko';
      else this.$i18n.locale = 'en';
    },
    changeTheme: function() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
