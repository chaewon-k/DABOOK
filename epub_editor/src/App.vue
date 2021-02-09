<template>
  <v-app>
    <v-main>
      <Editor />
    </v-main>
  </v-app>
</template>

<script>
import Editor from './views/Editor';
import "./assets/style.css";

export default {
  name: 'App',

  components: {
    Editor,
  },

  data: () => ({
    
  }),
};
</script>
