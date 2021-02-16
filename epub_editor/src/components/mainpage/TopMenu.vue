<template>
  <div id="topMenu">
    <v-card>
      <v-row>
        <v-col>
          <v-tabs show-arrows v-model="tab">
            <v-tabs-slider></v-tabs-slider>
            <v-tab
              v-for="(item, idx) in items"
              :key="idx"
              @click="selectedIndex(idx)"
            >
              {{ $t("tab." + item.tab) }}
            </v-tab>
            <v-btn id="helpBtn" @click="popUpEditor()" text>{{ $t("tab.help") }}</v-btn>
          </v-tabs>
        </v-col>
      </v-row>
      <SubMenu :itemIndex="itemIndex" />
    </v-card>
  </div>
</template>
<script>
import SubMenu from "./SubMenu.vue";
import { ipcRenderer } from 'electron';
const path = require("path");
const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
let win;

export default {
  name: "TopMenu",
  components: {
    SubMenu,
  },
  data: function () {
    return {
      itemIndex: 0,
      tab: null,
      items: [
        { tab: "file" },
        { tab: "edit" },
        { tab: "tool" },
        { tab: "style" },
      ],
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
    selectedIndex: function (idx) {
      this.itemIndex = idx;
    },
    popUpEditor: function() {
      console.log(BrowserWindow.getAllWindows());
      if (BrowserWindow.getAllWindows().length >= 2) {
        win.focus();
      } else {
        win = new BrowserWindow({ width: 800, height: 1500 });
          const p = path.resolve(`/Applications/DABOOK.app/Contents/Resources/src/assets/manual/manual.html`);
          // const p = path.resolve(`./src/assets/manual/manual.html`);
        win.loadURL("file://" + p, function() {
        });
      }
    },
  },
};
</script>