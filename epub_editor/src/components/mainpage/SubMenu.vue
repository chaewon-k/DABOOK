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

    <!-------------------- style tap start -------------------->
    <template v-else-if="itemIndex === 3">
      <StyleTab/>
    </template>
    <!---------------------- style tap end ---------------------->

    <!-------------------- manual tap start -------------------->
    <template v-else>
      <v-btn text>editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>
    <!-------------------- manual tap end -------------------->

  </div>
</template>

<script>
import FileTab from '@/components/mainpage/menutabs/FileTab';
import EditTab from '@/components/mainpage/menutabs/EditTab';
import ToolsTab from '@/components/mainpage/menutabs/ToolsTab';
import StyleTab from '@/components/mainpage/menutabs/StyleTab';

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
}
</script>