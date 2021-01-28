<template>
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
      <v-icon small style="padding: 0 5px;" v-if="!item.file">
        {{ 'mdi-folder' }}
      </v-icon>
      <v-icon small v-else>
        {{ files[item.file] }}
      </v-icon>
      <span @click="openFile(item)">{{ item.name }}</span>
    </template>
  </v-treeview>
</template>

<script>
import eventBus from '@/eventBus.js'
const fs = require('fs')

export default {
  computed: {
    items: function () {
      return this.$store.state.ebookDirectoryTree
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
    openFile: function (val) { // 디렉토리에서 선택한 파일을 텍스트로 읽는 함수
      if (val.children) return
      const temp = fs.readFileSync(val.dirPath).toString()
      this.$store.state.selectedFileDirectory = val.dirPath
      eventBus.$emit('loadData', temp)
    }
  },
}
</script>