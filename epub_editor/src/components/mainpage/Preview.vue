<template>
  <v-col style="border: 1px solid black; height:35em; overflow:scroll;">
    <div>
      <h1>Preview</h1>
      <p v-html=this.editingText></p>
    </div>
  </v-col>
</template>

<script>
import {mapState} from "vuex";
export default {

  computed:{
    ...mapState(["editingText"]),
  },
  methods:{
    
  },


}
</script>

<style>

</style>