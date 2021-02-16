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
            <v-btn id="helpBtn" @click="popUpEditor()" text>도움말</v-btn>
          </v-tabs>
        </v-col>
      </v-row>
      <SubMenu :itemIndex="itemIndex" />
    </v-card>
  </div>
</template>
<script>
import SubMenu from "./SubMenu.vue";

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
        const p = path.resolve("./src/assets/manual/manual.html");
        win.loadURL("file://" + p, function() {
        });
      }
    },
  },
};
</script>
<style>

#helpBtn{
  background-color: white;
  color:rgba(0, 0, 0, 0.54);
  font-size: 15px;
  cursor: pointer;
  font-size: 0.875rem;
  justify-content: center;
  min-width: 90px;
  max-width: 360px;
  padding: 0 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  transition: none;
  z-index: 3;
  height: auto;
}

</style>