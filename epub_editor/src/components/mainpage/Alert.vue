<template>
  <div v-if="alertDialog">
    <div>
      <v-alert id="alertMessage" border="left" color="#433e8a">
        {{alertMessage}}
        <v-btn icon x-small @click="cancel">
          <v-icon> mdi-close-circle </v-icon>
        </v-btn>
      </v-alert>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'alert',
  computed: {
    ...mapState(['alertMessage','alertDialog']),
  },
  methods:{
    cancel:function(){
      console.log("cancel");
      this.$store.dispatch('cancelAlertMessage');
    }
  },
}
</script>

<style>
#alertMessage{
  position: fixed;
  float:  right;
  bottom: 3%;
  right:  2%;
  z-index: 99;
}
</style>