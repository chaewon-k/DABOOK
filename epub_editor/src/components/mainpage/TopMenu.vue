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
          </v-tabs>
        </v-col>
      </v-row>
      <SubMenu :itemIndex="itemIndex" />
    </v-card>
  </div>
</template>
<script>
import SubMenu from "./SubMenu.vue";

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
        { tab: "setting" },
        { tab: "help" },
        { tab: "exec1" },
        { tab: "exec2" }
      ],
    };
  },
  methods: {
    selectedIndex: function (idx) {
      this.itemIndex = idx;
    },
  },
};
</script>