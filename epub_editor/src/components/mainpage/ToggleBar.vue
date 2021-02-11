<template>
  <v-navigation-drawer dark mini-variant mini-variant-width="65" permanent>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-action @click="toggleIcon(item.title)">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      dirTableToggle: true,
      dirOpen: true,
      items: [
        { title: "Dir", icon: "mdi-folder" },
        { title: "Lang", icon: "mdi-translate" },
        { title: "Dark", icon: "mdi-lightbulb-on-outline" },
      ],
    };
  },
  methods: {
    toggleIcon: function(val) {
      if (val == "Dir") {
        this.dirTableToggle = !this.dirTableToggle;
      } else if (val == "Lang") {
        if (this.$i18n.locale === "en") this.$i18n.locale = "ko";
        else this.$i18n.locale = "en";
      } else {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }
    },
  },
};
</script>
