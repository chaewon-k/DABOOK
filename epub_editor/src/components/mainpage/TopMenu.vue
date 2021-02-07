<template>
  <div id="topMenu">
    <v-card>
      <v-tabs
        show-arrows
        v-model="tab"
      >
        <v-tabs-slider></v-tabs-slider>
        <v-tab
          v-for="(item, idx) in items"
          :key="idx"
          @click="selectedIndex(idx)"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>
      <SubMenu
        :itemIndex="itemIndex"
      />
    </v-card>
  </div>
</template>
<script>
import SubMenu from './SubMenu.vue';

export default {
  name: 'TopMenu',
  components: {
    SubMenu
  },
  data: function () {
      return {
        itemIndex: 0,
        tab: null,
        items: [
          { tab: '파일' },
          { tab: '편집' },
          { tab: '도구상자' },
          { tab: '스타일' },
          { tab: '도움말' }
        ],
      };
    },
  methods: {
    selectedIndex: function (idx) {
      this.itemIndex = idx;
    }
  }
}
</script>