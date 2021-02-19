<template>
  <v-card-actions style="padding: 1% 6% 5% 6%">
    <v-spacer></v-spacer>
    <v-btn color="primary" @click="dialogMethod()">{{ $t("dialogbutton." + buttonText) }}</v-btn>
  </v-card-actions>
</template>

<script>
export default {
  name: "DialogButton",
  props: ["buttonText", "dialogMethod"],
  methods: {},
};
</script>

<style></style>
