<template>
  <div id="alert" v-if="alertDialog">
    <div>
      <v-alert id="alertMessage"
        color="purple"
        dense
        outlined
        text
        type="success"
      >
        <!-- {{ "$t('" + alertMessage + "')"}}
        {{ alertMessage }} -->
        <!-- {{ $t("dialogtitle." + title) }} -->
        {{ $t(`"${alertMessage}"`) }}
        <!-- <v-btn icon x-small @click="cancel"><v-icon>mdi-close-circle</v-icon></v-btn> -->
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'Alert',
  computed: {
    ...mapState(['alertMessage', 'alertDialog']),
  },
  methods: {
    cancel: function () {
      // console.log(document.getElementById("alert").value);
      // console.log("cancel");
      this.$store.dispatch('cancelAlertMessage');
    },
  },
}
</script>

<style>
#alertMessage{
  color: white;
  position: fixed;
  float:  right;
  bottom: 3%;
  right:  2%;
  z-index: 99;
}
</style>