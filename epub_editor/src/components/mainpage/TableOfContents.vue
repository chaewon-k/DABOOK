
<template>
  <v-card
    id="tableOfContents"
    height="0"
    class="mx-auto"
    max-width="400"
  >
    <v-list>
      <v-list-item-group
        v-model="model"
        mandatory
        color="indigo"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  name: 'TableOfContents',
  computed: {
    items: function () {
      return this.$store.state.tableOfContents;
    },
  },
  data: function () {
    return {
      model: 0,
    };
  }
}
</script>
