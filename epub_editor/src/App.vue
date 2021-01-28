<template>
  <v-app>
    <v-main>
      <Editor />
    </v-main>
  </v-app>
</template>

<script>
import Editor from './views/Editor';

export default {
  name: 'App',

  components: {
    Editor,
  },

  data: () => ({
    //
  }),
};
</script>
