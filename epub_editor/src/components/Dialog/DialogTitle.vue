<template>
  <v-app-bar flat color="white" style="padding: 4% 2% 13% 2%">
    <v-toolbar-title class="header-color" style="font-size: 2em">
      <!-- {{ $t("dialogtitle." + title) }} -->
      {{title}}
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn color="primary" icon @click="toggleDialog()">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "DialogTitle",
  props: ["title"],
  methods: {
    toggleDialog: function () {
      this.$emit("toggle-dialog");
    },
  },
};
</script>

<style></style>
