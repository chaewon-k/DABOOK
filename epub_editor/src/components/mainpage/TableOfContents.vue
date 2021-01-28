
<template>
  <v-list shaped>
    <v-list-item-group
      v-model="selectedItem"
      color="primary"
    >
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  computed: {
    items: function () {
      return this.$store.state.tableOfContents
    },
  },
  data: function () {
    return {
      selectedItem: 1,
    }
  },
}
</script>