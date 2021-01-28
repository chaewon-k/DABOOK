<template>
  <div>
    <TopMenu/>
    <v-container class="d-flex flex-column" >
      <v-row class="stretch" style="width: auto;">
        <v-col cols="3">
          <v-card>
            <v-btn @click="toggle" block text>Toggle</v-btn>
            <Directory
              v-show="dirTableToggle===true"
            />
            <TableOfContents
              v-show="dirTableToggle===false"
            />
          </v-card>
          
        </v-col>
      <!-- <v-divider vertical></v-divider> -->
        <Textarea />
      <!-- <v-divider vertical></v-divider>
        <Preview /> -->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import TopMenu from '@/components/mainpage/TopMenu';
import Directory from '@/components/mainpage/Directory';
import TableOfContents from '@/components/mainpage/TableOfContents';
import Textarea from '@/components/mainpage/Textarea';
// import Preview from '@/components/mainpage/Preview';

export default {
  name: 'Editor',
  components: {
    TopMenu,
    Directory,
    TableOfContents,
    Textarea,
    // Preview
  },
  data: function () {
    return {
      dirTableToggle: true
    }
  },
  methods: {
    toggle: function () {
      this.dirTableToggle = !this.dirTableToggle
    },
  },
}
</script>

<style>

</style>