<template>
  <v-col style="border: 1px solid black; height:35em; overflow:scroll;">
    <v-treeview
      v-model="tree"
      :open="initiallyOpen"
      :items="items"
      activatable
      item-key="name"
      open-on-click
      @input="openFile"
    >
      <template slot="label" slot-scope="{ item }">
        <v-icon style="padding: 0 5px;" v-if="!item.file">
          {{ 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
        <span @click="openFile(item)">{{ item.name }}</span>
      </template>
      <!-- <template v-slot:prepend="{ item, open }">
        <v-icon v-if="!item.file">
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else>
          {{ files[item.file] }}
        </v-icon>
      </template> -->
    </v-treeview>
  </v-col>
</template>

<script>
import eventBus from '@/eventBus.js'
const fs = require('fs')

export default {
  computed: {
    items: function () {
      return this.$store.state.currentDirectory
    },
  },
  data: function () {
    return {
      initiallyOpen: [],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-code-json',
        md: 'mdi-language-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
      },
      tree: [],
    }
  },
  methods: {
    openFile: function (val) {
      if (val.children) return
      const aa = fs.readFileSync(val.dirPath).toString()
      eventBus.$emit('loadData', aa)
    }
  },
}
</script>