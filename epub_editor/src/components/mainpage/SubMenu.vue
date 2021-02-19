<template>
  <div id="subMenu">
    <FileTab v-show="itemIndex === 0" />
    <EditTab v-show="itemIndex === 1" />
    <ToolsTab v-show="itemIndex === 2" />
    <StyleTab v-show="itemIndex === 3" />
  </div>
</template>

<script>
import FileTab from "@/components/mainpage/menutabs/FileTab";
import EditTab from "@/components/mainpage/menutabs/EditTab";
import ToolsTab from "@/components/mainpage/menutabs/ToolsTab";
import StyleTab from "@/components/mainpage/menutabs/StyleTab";

export default {
  name: "SubMenu",
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
};
</script>
