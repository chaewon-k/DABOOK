<template>
  <div id="subMenu">
    <!-------------------- file tap start -------------------->
    <FileTab
      v-show="itemIndex===0"
    />
    <!--------------------- file tap end --------------------->

    <!-------------------- edit tap start -------------------->
    <EditTab
      v-show="itemIndex===1"
    />
    <!---------------------- edit tap end ---------------------->

    <ToolsTab
      v-show="itemIndex === 2"
    />

    <!-------------------- style tap start -------------------->
    <StyleTab
      v-show="itemIndex === 3"
    />
    <!---------------------- style tap end ---------------------->

    <!-------------------- manual tap start -------------------->
    <div v-show="itemIndex === 4">
      <v-tabs show-arrows v-model="tab">
        <v-btn class="align-self-center" text @click="popUpEditor">{{ $t("manual") }}</v-btn>
        <!-- <v-btn class="align-self-center" text>마크다운 설명서 보기</v-btn> -->
      </v-tabs>
    </div>
    <!-------------------- manual tap end -------------------->

  </div>
</template>

<script>
import FileTab from '@/components/mainpage/menutabs/FileTab';
import EditTab from '@/components/mainpage/menutabs/EditTab';
import ToolsTab from '@/components/mainpage/menutabs/ToolsTab';
import StyleTab from '@/components/mainpage/menutabs/StyleTab';

const path = require('path');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
export default {
  name: 'SubMenu',
  components: {
    FileTab,
    EditTab,
    ToolsTab,
    StyleTab
  },
  props: {
    itemIndex: { type: Number }
  },
  data: function () {
    return {
      tab: null,
    }
  },
  methods:{
    popUpEditor: function (){
      const win = new BrowserWindow({ width: 800, height: 1500 });
      const p = path.resolve("./src/assets/manual/manual.html");
      win.loadURL('file://' + p, function () { 
        // console.log("123");
      });
    }
  }
}
</script>