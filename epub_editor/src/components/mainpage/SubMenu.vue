<template>
  <div>
    <!-------------------- file tap start -------------------->
    <template v-if="itemIndex===0">
      <FileTab/>
    </template>
    <!--------------------- file tap end --------------------->

    <!-------------------- edit tap start -------------------->
    <template v-else-if="itemIndex===1">
      <EditTab/>
    </template>
    <!---------------------- edit tap end ---------------------->

    <template v-else-if="itemIndex === 2">
      <ToolsTab/>
    </template>
    <!-------------------- manual tap start -------------------->
    <template v-else>
      <v-btn text @click="popUpEditor">editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>
    <!-------------------- manual tap end -------------------->

  </div>
</template>

<script>
import FileTab from '@/components/mainpage/menutabs/FileTab';
import EditTab from '@/components/mainpage/menutabs/EditTab';
import ToolsTab from '@/components/mainpage/menutabs/ToolsTab';

const path=require('path');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
export default {
  name: 'SubMenu',
  components: {
    FileTab,
    EditTab,
    ToolsTab
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