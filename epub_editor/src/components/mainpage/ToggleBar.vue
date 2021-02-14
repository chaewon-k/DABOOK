<template>
  <v-navigation-drawer mini-variant mini-variant-width="65" permanent>
    <v-list dense nav>
      <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-action>
          <v-icon @click="toggleIcon(item.title)">{{ item.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list-item>
        <v-icon @click="userInfoDialog=true">mdi-account-circle-outline</v-icon>
      </v-list-item>
      <v-list-item>
        <v-icon @click="logoutDialog=true">mdi-logout</v-icon>
      </v-list-item>
      <UserInfo
        :userInfoDialog="userInfoDialog"
        @close="userInfoDialog=false"
      />
    </v-list>

    <!----------- logout dialog ----------->
    <v-dialog
      v-model="logoutDialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="mb-3">{{ $t("togglebar.logout.title") }}</v-card-title>
        <v-card-text class="pb-0">
          <p>{{ $t("togglebar.logout.content-1") }}</p>
          <p>{{ $t("togglebar.logout.content-2") }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="logout"
          >
            {{ $t("togglebar.logout.logout-btn") }}
          </v-btn>
          <v-btn
            text
            @click="logoutDialog = false"
            style="color: #6A68A6;"
          >
            {{ $t("togglebar.logout.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      userInfoDialog: false,
      logoutDialog: false
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
      this.$vuetify.theme.dark = false;
      this.$router.push({ name: 'Login'});
    }
  },
};
</script>
