<template>
  <v-navigation-drawer mini-variant mini-variant-width="65" permanent>
    <v-layout column fill-height>
      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-action class="ma-0">
            <v-btn icon class="align-self-center rounded-sm"><v-icon @click="toggleIcon(item.title)">{{ item.icon }}</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item>
          <v-list-item-action class="ma-0" @click="toggleIcon('IsPreview')">
            <v-btn icon class="align-self-center rounded-sm">
              <v-icon v-if="isPreview">mdi-monitor</v-icon>
              <v-icon v-else-if="!isPreview">mdi-monitor-off</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-list dense nav>
        <v-list-item>
          <v-btn icon class="align-self-center rounded-sm"><v-icon @click="userInfoDialog=true">mdi-account-circle-outline</v-icon></v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn icon class="align-self-center rounded-sm ml-1"><v-icon @click="logoutDialog=true">mdi-logout</v-icon></v-btn>
        </v-list-item>
        <UserInfo
          :userInfoDialog="userInfoDialog"
          @close="userInfoDialog=false"
        />
      </v-list>
    </v-layout>
    

    <Confirm
      :dialog="logoutDialog"
      title="togglebar.logout.title"
      content1="togglebar.logout.content-1"
      content2="togglebar.logout.content-2"
      confirm="togglebar.logout.logout-btn"
      cancel="togglebar.logout.cancel"
      @confirm="logout"
      @cancel="logoutDialog = false"
    />
  </v-navigation-drawer>
</template>

<script>
import UserInfo from '@/components/mainpage/UserInfo'
import Confirm from '@/components/mainpage/Confirm'

let ipc = require('electron').ipcRenderer;

export default {
  components: {
    UserInfo,
    Confirm
  },
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
  computed: {
    isPreview(){
      return this.$store.state.isPreview;
    }
  },
  methods: {
    toggleIcon: function (val) {
      if (val === "Dir") {
        this.$emit('toggleDir');
      } else if (val === "Lang") {
        if (this.$i18n.locale === "en") {
          this.$i18n.locale = "ko";
          ipc.send('close_dialog', true);
          }
        else {
          this.$i18n.locale = "en";
          ipc.send('close_dialog', false);
          }
      } else if (val === "Dark") {
        this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
        this.$store.dispatch("setIsDark");
      } else {
        if (this.isPreview) {
          this.$store.dispatch("setIsPreview", false);
        } else {
          this.$store.dispatch("setIsPreview", true);
        }
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
