<template>
  <div>
    <!-------------------- file tap start -------------------->
    <div v-show="itemIndex===0">
      <FileTab/>
    </div>
    <!--------------------- file tap end --------------------->

    <!-------------------- edit tap start -------------------->
    <div v-show="itemIndex===1">
      <EditTab/>
    </div>
    <!---------------------- edit tap end ---------------------->

    <div v-show="itemIndex === 2">
      <ToolsTab/>
    </div>

    <!-------------------- style tap start -------------------->
    <div v-show="itemIndex === 3">
      <StyleTab/>
    </div>
    <!---------------------- style tap end ---------------------->

    <!-------------------- manual tap start -------------------->
    <div v-show="itemIndex === 4">
      <v-btn text @click="popUpEditor">editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </div>
    <!-------------------- manual tap end -------------------->

  </div>
</template>

<script>
import FileTab from '@/components/mainpage/menutabs/FileTab';
import EditTab from '@/components/mainpage/menutabs/EditTab';
import ToolsTab from '@/components/mainpage/menutabs/ToolsTab';
import StyleTab from '@/components/mainpage/menutabs/StyleTab';

const path=require('path');
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
  methods:{
    popUpEditor(){
      const win = new BrowserWindow({ width: 800, height: 1500 });
      const p=path.resolve("./src/assets/manual/manual.html");
      win.loadURL('file://'+p,function(){console.log("123");});
    }
  }
}
</script>