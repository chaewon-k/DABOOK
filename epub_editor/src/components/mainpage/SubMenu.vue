<template>
  <div>
    <template v-if="itemIndex===0">
     
        <v-dialog v-model="newEBook" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on">새 e-book 생성</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">E-Book 생성</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6" md="4">
                    <v-text-field label="E-Book Title *" required v-model="newEBookTitle"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <div>
                      <v-btn @click="load">위치 선택</v-btn>
                      {{newEBookLocation[0]}}
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="7">
                    <v-file-input
                      v-model="newEBookCover"
                      accept="image/png, image/jpeg, image/bmp"
                      prepend-icon="mdi-camera"
                      label="E-Book Image"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="newEBook = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="createNewEBook">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
     

      <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
      <v-btn text @click="storeInputText">저장하기</v-btn>
      <!-- <v-btn text @click="storeNewInputText">다른 이름으로 저장하기</v-btn> -->
      <v-btn @click.stop="titleDialog = true" text>e-pub으로 내보내기</v-btn>
    </template>
    <template v-else-if="itemIndex===1">
      <v-btn icon medium @click="undo"><v-icon medium>mdi-undo</v-icon></v-btn>
      <v-btn icon medium @click="redo"><v-icon medium>mdi-redo</v-icon></v-btn>
      <v-btn icon medium @click="cut"><v-icon medium>mdi-content-cut</v-icon></v-btn>
      <v-btn icon medium @click="copy"><v-icon medium>mdi-content-copy</v-icon></v-btn>
      <v-btn icon medium @click="paste"><v-icon medium>mdi-content-paste</v-icon></v-btn>
      <v-btn icon medium @click.stop="findDialog = true" text><v-icon medium>mdi-file-find-outline</v-icon></v-btn>
      <v-btn icon medium @click.stop="replaceDialog = true" text><v-icon medium>mdi-find-replace</v-icon></v-btn>
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

    <v-dialog v-model="findDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">단어 찾기</v-card-title>
        <v-card-text>
          <v-text-field label="찾고 싶은 단어" v-model="findText" required></v-text-field>
        </v-card-text>
        
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="findDialog = false">
            취소
          </v-btn>

          <v-btn color="green darken-1" text @click="find(findText); findDialog = false;">
            단어 찾기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="replaceDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">단어 변환</v-card-title>
        <v-card-text>
          <v-text-field label="찾고 싶은 단어" v-model="findText" required></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field label="바꾸고 싶은 단어" v-model="replaceText" required></v-text-field>
        </v-card-text>
        <v-checkbox v-model="replaceAlphabet" label="Aa"></v-checkbox>
        <v-checkbox v-model="replaceAllText" label="All"></v-checkbox>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="replaceDialog = false">
            취소
          </v-btn>

          <v-btn color="green darken-1" text @click="replace(findText, replaceText, replaceAlphabet, replaceAllText); replaceDialog = false;">
            단어 변환
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
const path=require('path')
const electron = require('electron')
const { dialog } = require('electron').remote
const BrowserWindow = electron.remote.BrowserWindow
const ncp=require('ncp').ncp;

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
      findDialog: false,
      replaceDialog: false,

      /* itemIndex 0 :  */
      newEBook:false,
      newEBookCover:[],
      newEBookTitle:'',
      newEBookLocation:'',

    }
  },
  computed: {
    ...mapState(["editingText", "editingHTMLText"]),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT","SET_EBOOKDIRECTORY"]),
    // 파일 탭
    // storeNewInputText: function () {  //다른 이름으로 저장하기 기능
    //   const options = {
    //     title: '다른 이름으로 저장하기',
    //     properties: ['openDirectory','nameFieldLabel']
    //   }
    //   const directory = dialog.showSaveDialogSync(options)
    //   console.log(directory)
    //   // fs.writeFileSync(directory[0]+'/temp', this.$store.state.editingText)
    // },
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


    /* 새 ebook 만들기 */
    load: function(){
      const options = {
        properties: ['openDirectory']
      }
      this.newEBookLocation = dialog.showOpenDialogSync(options)
      if (!this.newEBookLocation) return
      console.log(this.newEBookLocation);
      
    },
    createNewEBook(){
      /*
      새 EBOOK 만들기
      - 선택한 위치에 TITLE 명의 폴더 생성 
      - src.assets.NewEbook에 있는 기본 EPUB파일 복사
      */
      let eBookLocation=path.resolve(this.newEBookLocation+'/'+this.newEBookTitle+'/');
      console.log("ebooklocation : "+eBookLocation);

      fs.mkdir(eBookLocation,function(err){
        if(err){
          console.log("make directory error : "+err);
        }
        else{
          console.log("success, make directory in eBookLocation ");
        }
      });
      let eBookSettingDirectory=path.resolve('src/assets/NewEbook');

      console.log("ebooklocation : "+eBookLocation);
      console.log("before : "+this.$store.state.ebookDirectory);
      this.SET_EBOOKDIRECTORY(eBookLocation);
      console.log("after : "+this.$store.state.ebookDirectory);
      
      ncp(eBookSettingDirectory,eBookLocation,function(err){
        if(err){
          console.log("copy directory error : "+ err);
        }
        else{
          console.log("success, copy  directory");
        }
      });

      /* 파일 복사 이후, 함수호출을 위해 타임이벤트 추가 */
      setTimeout(()=>{this.eBookCoverSet(eBookLocation);},500);

      this.newEBook=false;

      console.log("ebooklocation : "+eBookLocation);
      setTimeout(()=>{this.readToc(eBookLocation);},500);
    },
    eBookCoverSet(eBookLocation){
        /*
       새 ebook 만들기 
       - 표지 이미지 파일 EPUB 폴더 내 image 폴더로 파일로 복사
        */
      let coverLocation=path.resolve(eBookLocation+'/EPUB/images/'+this.newEBookCover.name);
      ncp(this.newEBookCover.path,coverLocation,function(err){
        if(err)
          console.log("Cover Image save in directory : "+ err);
        else
          console.log("success, Cover Image save in directory");
      });
    },
    readToc(eBookLocation){
      const data = readDirectory(eBookLocation, [], [])
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      console.log(data);
      this.getToc(data['toc'])
    },
   


    loadEbook: function () { // E-BOOK 불러오기
      const options = {
        properties: ['openDirectory']
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.$store.state.ebookDirectory = r[0]

      console.log(r[0]);
      const data = readDirectory(r[0], [], [])
      console.log(data);
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
      this.savePath = makeEpubFile(this.$store.state.ebookDirectory, this.titleText); // file.js 안의 makeEpub 실행
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