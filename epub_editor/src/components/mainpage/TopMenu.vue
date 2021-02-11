<template>
  <div id="topMenu">
    <v-card>
      <v-row>
        <v-col cols="11">
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
              {{ $t("tab." + item.tab) }}
            </v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="1" class="ma-0 px-0 pb-0">
          <v-switch
            dense
            class="mt-2"
            color="#9C9BBF"
            v-model="$vuetify.theme.dark"
            persistent-hint
          ></v-switch>
        </v-col>
      </v-row>
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
          { tab: 'file' },
          { tab: 'edit' },
          { tab: 'tool' },
          { tab: 'style' },
          { tab: 'help' }
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