<template>
  <div>
    <template v-if="itemIndex===0">
      <v-btn text>새 e-book 만들기</v-btn>
      <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
      <v-btn text>저장하기</v-btn>
      <v-btn text>다른 이름으로 저장하기</v-btn>
      <v-btn text>e-pub으로 내보내기</v-btn>
    </template>
    <template v-else-if="itemIndex===1">
      <v-btn text>취소하기</v-btn>
      <v-btn text>되돌리기</v-btn>
      <v-btn text>잘라내기</v-btn>
      <v-btn text>복사하기</v-btn>
      <v-btn text>붙여넣기</v-btn>
      <v-btn text>찾기</v-btn>
      <v-btn text>바꾸기</v-btn>
    </template>
    <template v-else-if="itemIndex===2">
      <v-btn text>e-book 미리보기</v-btn>
      <v-btn text>e-book 확대하기</v-btn>
      <v-btn text>e-book 축소하기</v-btn>
    </template>
    <template v-else-if="itemIndex===3">
      <div class="d-flex justify-start">
        <div v-for="tag in hTags" :key="tag">
          <v-btn @click="selectHTag(tag)">{{'h' + tag}}</v-btn>
        </div>
        <v-btn @click="selectItalicTag()">Italic</v-btn>
      </div>
    </template>
    <template v-else>
      <v-btn text>editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>

  </div>
</template>

<script>
import { readDirectory, test3 } from '@/functions/file.js'
import eventBus from '@/eventBus.js'
const { dialog } = require('electron').remote

export default {
  name: 'SubMenu',
  data() {
    return {
      hTags: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    selectHTag: function(index) {
      eventBus.$emit('pushIndexData', index);
    },
    selectItalicTag: function () {
      eventBus.$emit('pushIndexData', 'Italic');
    },
    loadEbook: function () {
      const options = {
        properties: ['openDirectory']
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.$store.state.currentDirectory = readDirectory(r[0], [])
    },
    test: function () {
      test3()
    }
  },
  props: {
    itemIndex: { type: Number }
  },
}
</script>

<style>

</style>