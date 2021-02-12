<template>
  <v-navigation-drawer mini-variant mini-variant-width="65" permanent>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-action @click="toggleIcon(item.title)">
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-icon @click="userInfoDialog=true">mdi-account-circle-outline</v-icon>
      </v-list-item>
      <v-list-item>
        <v-icon @click="logout">mdi-logout</v-icon>
      </v-list-item>
      <UserInfo
        :userInfoDialog="userInfoDialog"
        @close="userInfoDialog=false"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import UserInfo from '@/components/mainpage/UserInfo'
export default {
  data: function () {
    return {
      dirOpen: true,
      items: [
        { title: "Dir", icon: "mdi-folder" },
        { title: "Lang", icon: "mdi-translate" },
        { title: "Dark", icon: "mdi-lightbulb-on-outline" },
      ],
      userInfoDialog: false
    };
  },
  props: {
    dirTableToggle: {
      type: Boolean
    },
  },
  components: {
    UserInfo
  },
  methods: {
    toggleIcon: function(val) {
      if (val == "Dir") {
        this.$emit('toggleDir');
      } else if (val == "Lang") {
        if (this.$i18n.locale === "en") this.$i18n.locale = "ko";
        else this.$i18n.locale = "en";
      } else {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      }
    },
    logout: function () {
      localStorage.clear();
      this.$router.push({ name: 'Login'});
    }
  },
};
</script>
