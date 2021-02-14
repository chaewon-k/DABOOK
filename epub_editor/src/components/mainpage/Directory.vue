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
      <v-icon v-else small style="padding: 0 5px;">
        {{ files[item.file] }}
      </v-icon>
      <span @click="openFile(item)">{{ item.name }}</span>
    </template>
  </v-treeview>
</template>

<script>
import eventBus from '@/eventBus.js';
import * as edit from '@/functions/edit.js';

const { dialog } = require('electron').remote;
const fs = require('fs');

export default {
  name: 'Directory',
  watch: {
    items: function () {
      this.initiallyOpen = ['EPUB', 'text']
    },

  },
  computed: {
    items: function () {
      return this.$store.state.ebookDirectoryTree;
    },
    GET_CONFIRM_BUTTON() {
      return this.$t('confirm.save-confirm');
    },
    GET_CANCEL_BUTTON() {
      return this.$t('confirm.save-cancel');
    },
  },
  data: function () {
    return {
      initiallyOpen: ['EPUB', 'text'],
      files: {
        xhtml: 'mdi-book-open-page-variant',
        html: 'mdi-book-open-page-variant',
        ncx: 'mdi-table-of-contents',
        opf: 'mdi-cogs',
        ttf: 'mdi-format-font',
        png: 'mdi-file-image',
        jpg: 'mdi-file-image',
        xml: 'mdi-xml',
        css: 'mdi-language-css3',
      },
      tree: [],
    };
  },
  methods: {
    openFile: function (val) { // 디렉토리에서 선택한 파일을 텍스트로 읽는 함수
      if (val.children) {
        return  // 폴더면 그냥 return
      } else {  // 파일을 클릭한 것이면
        if (this.$store.state.selectedFileDirectory !== '' && this.$store.state.selectedFileDirectory !== val.dirPath) {  
          // 처음 여는게 아니거나 다른 파일을 열려고 하는 것이면, 변경여부 확인하고 저장여부를 물어본다.
          let original = fs.readFileSync(this.$store.state.selectedFileDirectory).toString();  // original: 원래 작성중이던 파일의 원본
          original = original.slice(original.indexOf("<body"), original.indexOf("</body>") + 7);
          if (original !== this.$store.state.editingText) {  // 원본과 수정 중 파일이 다르다면
            // 저장 할 것인지 물어보고 저장 / 취소
            const options = {
              type: 'question',
              message: this.$t('confirm.save-title'),
              buttons: [this.GET_CONFIRM_BUTTON, this.GET_CANCEL_BUTTON],
            };
            const result = dialog.showMessageBoxSync(options);
            if (result === 0) {
              const updatedText = this.$store.state.editingHTMLText + this.$store.state.editingText + '</html>';
              fs.writeFileSync(this.$store.state.selectedFileDirectory, updatedText);
              this.$store.dispatch('setAlertMessage', 'success.save-ebook');
            }
          } 
        }
        if (this.$store.state.selectedFileDirectory !== val.dirPath) {  // 자기 자신을 다시 클릭한 것이 아니라면 새 파일을 가져온다.
          if (val.dirPath.slice(-5) === 'xhtml') {    // xhtml 파일이라면 불러온다.
            const temp = fs.readFileSync(val.dirPath).toString();
            this.$store.dispatch('setSelectedFileDirectory', val.dirPath);
            eventBus.$emit('loadData', temp);
          } else {    // xhtml 파일이 아니라면 alert 를 띄운다. 
            this.$store.dispatch('setAlertMessage', 'error.select-text');
          }
        }
        edit.reset();
      }
    }
  },
}
</script>
