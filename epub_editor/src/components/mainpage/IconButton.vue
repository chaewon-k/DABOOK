<template>

  <v-icon 
	id="iconBtn" fab large bottom left
	@click="btnClick">
    mdi-folder
  </v-icon>

</template>

<script>
import { mapState } from 'vuex'
export default {
	name: 'IconButton',
	computed:{
    ...mapState(['dirToggle']),
	},
	methods:{
		btnClick: function(){
      this.$store.dispatch("setDirToggle");
		}
	}
}
</script>

<style>

</style>