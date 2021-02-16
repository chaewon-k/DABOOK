<template>
  <div id="subMenu">
    <!-------------------- file tap start -------------------->
    <FileTab v-show="itemIndex === 0" />

    <!-------------------- edit tap start -------------------->
    <EditTab v-show="itemIndex === 1" />

    <ToolsTab v-show="itemIndex === 2" />

    <!-------------------- style tap start -------------------->
    <StyleTab v-show="itemIndex === 3" />

  </div>
</template>

<script>
import FileTab from "@/components/mainpage/menutabs/FileTab";
import EditTab from "@/components/mainpage/menutabs/EditTab";
import ToolsTab from "@/components/mainpage/menutabs/ToolsTab";
import ToolsTab2 from "@/components/mainpage/menutabs/ToolsTab2";
import StyleTab from "@/components/mainpage/menutabs/StyleTab";
import StyleTab2 from "@/components/mainpage/menutabs/StyleTab2";

export default {
  name: "SubMenu",
  components: {
    FileTab,
    EditTab,
    ToolsTab,
    ToolsTab2,
    StyleTab,
    StyleTab2
  },
  props: {
    itemIndex: { type: Number },
  },
  data: function() {
    return {
      tab: null,
    };
  },
};
</script>
