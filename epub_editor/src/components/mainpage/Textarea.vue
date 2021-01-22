<template>
  <v-textarea
    outlined
    height="35em"
    label="textarea 입니다"
    placeholder="책 내용을 작성해볼까요?"
    v-model="text"
  >
  </v-textarea>


</template>

<script>
import {mapMutations} from "vuex";

export default {
  data() {
    return {
      text:''
    }
  },
  computed:{
  },
  methods:{
    ...mapMutations(["SET_EDITINGTEXT"]),
  },
  watch:{
    text:function(){
      //console.log("watch");
      //console.log(this.text);
      this.SET_EDITINGTEXT(this.text);
    }
  }
}
</script>

<style>

</style>