<template>
  <v-navigation-drawer mini-variant mini-variant-width="65" permanent>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-action @click="toggleIcon(item.title)">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-list-item-action @click="toggleIcon('UserMode')">
          <v-icon v-if ="getUserMode">mdi-account-edit</v-icon>
          <v-icon v-else-if ="!getUserMode">mdi-laptop</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data: function () {
    return {
      dirOpen: true,
      items: [
        { title: "Dir", icon: "mdi-folder" },
        { title: "Lang", icon: "mdi-translate" },
        { title: "Dark", icon: "mdi-lightbulb-on-outline" },
      ],
    };
  },
  props: {
    dirTableToggle: {
      type: Boolean
    },
  },
  computed: {
    getUserMode(){
      return this.$store.state.userMode;
    }
  },
  methods: {
    toggleIcon: function(val) {
      if (val == "Dir") {
        this.$emit('toggleDir');
      } else if (val == "Lang") {
        if (this.$i18n.locale === "en") this.$i18n.locale = "ko";
        else this.$i18n.locale = "en";
      } else if (val == "Dark"){
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      } else {
        if (this.getUserMode) {
          this.$store.dispatch("setUserMode", false);
        } else {
          this.$store.dispatch("setUserMode", true);
        }
      }
    },
  },
};
</script>
