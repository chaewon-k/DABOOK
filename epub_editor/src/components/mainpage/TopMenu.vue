<template>
  <div>
    <!-- <v-system-bar>
      <v-icon>mdi-message</v-icon>
      <span>로고?</span>
    </v-system-bar> -->
    <v-card class="rounded-0">
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
import SubMenu from './SubMenu.vue'
export default {
  components: {
    SubMenu
  },
  data: function () {
      return {
        itemIndex: 0,     //선택한 메뉴 인덱스
        tab: null,
        items: [
          { tab: '파일' },
          { tab: '편집' },
          { tab: '도구상자' },
          { tab: '도움말' }
        ],
      }
    },
  methods: {
    selectedIndex: function (idx) {
      this.itemIndex = idx
    }
  }
}
</script>

<style>

</style>