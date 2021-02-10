<template>
  <v-card flat>
    <v-container>
      <v-row class="mx-2 mt-2">
        <v-toolbar-title class="ml-1" style="font-size: 2em">
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" icon @click="toggleDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
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