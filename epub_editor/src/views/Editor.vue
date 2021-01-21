<template>
  <div >
    <TopMenu/>

<v-container>
    <v-row  class="stretch">
      
      <Directory />
     <v-divider vertical></v-divider>
      <Textarea />
     <v-divider vertical></v-divider>
      <Preview />
     
    </v-row>
  </v-container>

  </div>
</template>

<script>
import TopMenu from '@/components/mainpage/TopMenu';
import Directory from '@/components/mainpage/Directory';
import Textarea from '@/components/mainpage/Textarea';
import Preview from '@/components/mainpage/Preview';

export default {
  name: 'Editor',
  components: {
    TopMenu,
    Directory,
    Textarea,
    Preview
  },
}
</script>

<style>

</style>