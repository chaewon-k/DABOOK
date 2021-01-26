<template>
  <div>
    <template v-if="itemIndex===0">
      <v-btn text>새 e-book 만들기</v-btn>
      <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
      <v-btn text @click="storeInputText">저장하기</v-btn>
      <v-btn text>다른 이름으로 저장하기</v-btn>
      <v-btn @click.stop="titleDialog = true" text>e-pub으로 내보내기</v-btn>
    </template>
    <template v-else-if="itemIndex===1">

      <v-btn @click="undo">취소하기</v-btn>
      <v-btn @click="redo">되돌리기</v-btn>
      <v-btn @click="cut">잘라내기</v-btn>
      <v-btn @click="copy">복사하기</v-btn>
      <v-btn @click="paste">붙여넣기</v-btn>
      <v-btn @click="find(findText)">찾기</v-btn>
      <v-btn @click="replace(findText, replaceText, replaceAlphabet, replaceAllText)">바꾸기</v-btn>
      <br>
      찾을 단어 : <v-text-field clearable v-model="findText"></v-text-field>
      바꿀 단어 : <v-text-field clearable v-model="replaceText"></v-text-field>
      <v-checkbox v-model="replaceAlphabet" label="Aa"></v-checkbox>
      <v-checkbox v-model="replaceAllText" label="All"></v-checkbox>
       
    </template>
    <template v-else-if="itemIndex===2">
      <v-btn @click="preview" text>e-book 미리보기</v-btn>
      <v-btn text>e-book 확대하기</v-btn>
      <v-btn text>e-book 축소하기</v-btn>
    </template>
    <template v-else-if="itemIndex===3">
      <div style="height: 100%">
        <v-btn text x-large value="images">
          <div>
            <v-icon large class="d-flex justify-center" @click="selectImageTag()">mdi-image-search-outline</v-icon>
            <p class="caption">Images</p>
          </div>
        </v-btn>
        <v-btn text x-large>
          <div>
            <v-icon large @click="selectLink()">mdi-link-box-variant-outline</v-icon>
            <p class="caption">Link</p>
          </div>
          </v-btn>
        <v-btn text x-large>
          <div>
            <v-icon large @click="selectTable()">mdi-table-large-plus</v-icon>
            <p class="caption">Table</p>
          </div>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <div>
        <v-btn icon medium><v-icon medium @click="selectHTag(1)">mdi-format-header-1</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectHTag(2)">mdi-format-header-2</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectHTag(3)">mdi-format-header-3</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectHTag(4)">mdi-format-header-4</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectHTag(5)">mdi-format-header-5</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectHTag(6)">mdi-format-header-6</v-icon></v-btn>

        <v-btn icon medium><v-icon medium @click="selectItalicTag()">mdi-format-italic</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectPTag()">mdi-format-paragraph</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectLineTag()">mdi-minus</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectBlockquoteTag()">mdi-comment-text-multiple-outline</v-icon></v-btn>
        <v-btn icon medium text><v-icon medium @click="selectCiteTag()">mdi-comment-text-outline</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectBoldTag()">mdi-format-bold</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectUnderlineTag()">mdi-format-underline</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectMediumlineTag()">mdi-format-strikethrough</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectSubscriptTag()">mdi-format-letter-case-lower</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectSuperscriptTag()">mdi-format-letter-case-upper</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectUnorderedListTag()">mdi-format-list-bulleted</v-icon></v-btn>
        <v-btn icon medium><v-icon medium @click="selectOrderedListTag()">mdi-format-list-numbered</v-icon></v-btn>
      </div>
    </template>
    <template v-else>
      <v-btn text>editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>

    <v-dialog v-model="titleDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> epub 이름을 입력해주세요. </v-card-title>
        <v-card-text>
          <v-text-field label="epub 이름" v-model="titleText" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="titleDialog = false">
            취소
          </v-btn>

          <v-btn color="green darken-1" text @click="makeEpub">
            epub 내보내기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { readDirectory, tocToList, makeEpubFile } from '@/functions/file.js'
import eventBus from '@/eventBus.js'
import { mapMutations, mapState } from 'vuex'
const fs = require('fs')
const electron = require('electron')
const { dialog } = require('electron').remote
const BrowserWindow = electron.remote.BrowserWindow

export default {
  name: 'SubMenu',
  data() {
    return {
      hTags: [1, 2, 3, 4, 5, 6],
      
      /* itemIndex 1 : 편집 */
      findText:'',
      findIndexArray:[],
      replaceText:'',
      replaceAlphabet:false,
      replaceAllText:false,
      titleText:'',
      titleDialog:false,
      rootPath:''
    }
  },
  computed: {
    ...mapState(["editingText", "editingHTMLText"]),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT"]),
    // 파일 탭
    storeInputText: function () {     // 저장하기 기능
      const updatedText = this.$store.state.editingHTMLText + this.$store.state.editingText + '</html>'
      fs.writeFileSync(this.$store.state.selectedFileDirectory, updatedText)
    },

    // 도구상자 모음 탭
    selectHTag: function(index) {
      eventBus.$emit('pushIndexData', index);
    },
    selectItalicTag: function () {
      eventBus.$emit('pushIndexData', 'Italic');
    },
    selectPTag: function () {
      eventBus.$emit('pushIndexData', 'Enter');
    },
    selectLineTag: function () {
      eventBus.$emit('pushIndexData', 'LineTag');
    },
    selectBlockquoteTag: function () {
      eventBus.$emit('pushIndexData', 'BlockquoteTag');
    },
    selectCiteTag: function () {
      eventBus.$emit('pushIndexData', 'CiteTag');
    },
    selectBoldTag: function () {
      eventBus.$emit('pushIndexData', 'BoldTag');
    },
    selectUnderlineTag: function () {
      eventBus.$emit('pushIndexData', 'UnderlineTag');
    },
    selectMediumlineTag: function () {
      eventBus.$emit('pushIndexData', 'MediumlineTag');
    },
    selectSubscriptTag: function () {
      eventBus.$emit('pushIndexData', 'SubscriptTag');
    },
    selectSuperscriptTag: function () {
      eventBus.$emit('pushIndexData', 'SuperscriptTag');
    },
    selectImageTag: function () {
      eventBus.$emit('pushIndexData', 'ImageTag');
    },
    selectUnorderedListTag: function () {
      eventBus.$emit('pushIndexData', 'UnorderedListTag');
    },
    selectOrderedListTag: function () {
      eventBus.$emit('pushIndexData', 'OrderedListTag');
    },
    selectLink: function () {
      eventBus.$emit('pushIndexData', 'Link');
    },
    selectTable: function () {
      eventBus.$emit('pushIndexData', 'Table');
    },
    loadEbook: function () { // E-BOOK 불러오기
      const options = {
        properties: ['openDirectory']
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.rootPath = r[0];
      this.$store.state.ebookDirectory = r[0]
      const data = readDirectory(r[0], [], [])
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      this.getToc(data['toc'])
    },
    getToc: function (val) { // 목차 읽어오기
      const fileToText = fs.readFileSync(val[0]).toString()
      // console.log(tocToList(fileToText, []))
      this.$store.state.tableOfContents = tocToList(fileToText, [])
    },
    makeEpub: function () { // epub 내보내기
      this.titleDialog = false; // title 적는 dialog 창 닫기
      this.savePath = makeEpubFile(this.rootPath, this.titleText); // file.js 안의 makeEpub 실행
      this.titleText = '';
    },
    preview: function () { // e-book 미리보기
      const win = new BrowserWindow({ width: 800, height: 1500 })
      win.loadURL(this.$store.state.selectedFileDirectory)
    },
    /* 
      < itemIndex 1 : 편집 >
      cut/copy : 드래그 필수,
      paste : chrome 환경에서 작동 안됨,
    */
    cut(){ //자르기
      document.execCommand('cut');
    },
    copy(){ //복사
      document.execCommand('copy');
    },
    paste(){ // 붙여넣기
      document.execCommand('paste');
    },
    undo(){ // 실행 취소
      document.execCommand('undo');
    },
    redo(){ // 실행 취소 되돌리기
      document.execCommand('redo');
    },
    find: function (findText) {
      eventBus.$emit('findText', findText);
    },
    replace: function (findText, replaceText, replaceAlphabet, replaceAllText) {
      this.find(findText)
      eventBus.$emit('replaceText', [replaceText, replaceAlphabet, replaceAllText]);
    },
  },
  props: {
    itemIndex: { type: Number }
  },
}
</script>

<style>
.v-text-field{
  width: 150px;
}
</style>