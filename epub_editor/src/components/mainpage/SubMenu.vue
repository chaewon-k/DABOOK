<template>
  <div>
    <template v-if="itemIndex===0">
     
        <v-dialog v-model="eBook" persistent max-width="600px">
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
                    <v-text-field label="E-Book Title *" required v-model="eBookTitle"></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <div>
                      <v-btn @click="load">위치 선택</v-btn>
                      {{eBookLocation[0]}}
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="7">
                    <v-file-input
                      v-model="eBookCover"
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
              <v-btn color="blue darken-1" text @click="eBook = false">
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
      <v-btn @click.stop="chapterDialog = true" text>chapter 추가하기</v-btn>
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

    <!-- chapterDialog -->
    <v-dialog v-model="chapterDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> chapter 이름을 입력해주세요. </v-card-title>
        <v-card-text>
          <v-text-field label="chapter 이름" v-model="chapterText" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="chapterDialog = false">
            취소
          </v-btn>

          <v-btn color="green darken-1" text @click="makeChapter(chapterText)">
            chapter 만들기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- -------------------- dialog end -------------------- -->

  </div>
</template>

<script>
import { readDirectory, tocToList, makeEpubFile, addContentOpf, addTocNcx, changeHtag } from '@/functions/file.js'
import eventBus from '@/eventBus.js'
import { mapMutations, mapState } from 'vuex'
const fs = require('fs')
const path=require('path')
const electron = require('electron')
const { dialog } = require('electron').remote
const BrowserWindow = electron.remote.BrowserWindow
//const ncp=require('ncp').ncp;
const fse=require('fs-extra')
export default {
  name: 'SubMenu',
  data() {
    return {
      hTags: [1, 2, 3, 4, 5, 6],
      chapterNum: 0,
      /* itemIndex 1 : 편집 */
      findText:'',
      findIndexArray:[],
      replaceText:'',
      replaceAlphabet:false,
      replaceAllText:false,
      chapterText: '',
      titleText:'',
      chapterDialog: false,
      titleDialog:false,
      findDialog: false,
      replaceDialog: false,

      /* itemIndex 0 :  */
      eBook:false, // 새 eBook 만들기 Dialog 활성화/비활성화
      eBookCover:[], // 새 eBook 이미지
      eBookTitle:'', // 새 eBook 이름
      eBookLocation:'', //eBook 폴더까지 경로

    }
  },
  computed: {
    ...mapState(["editingText", "editingHTMLText", "ebookDirectory"]),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT","SET_EBOOKDIRECTORY", "SET_EBOOKDIRECTORY"]),
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
      this.eBookLocation = dialog.showOpenDialogSync(options)
      if (!this.eBookLocation) return
      //console.log(this.eBookLocation);
    },
    dirAndFileCopy(source, destination){
      fse.copySync(source,destination);
      console.log("success, copy");
    },
    createNewEBook(){
      /*
      새 EBOOK 만들기
      - 선택한 위치에 TITLE 명의 폴더 생성 
      - src.assets.NewEbook에 있는 기본 EPUB파일 복사
      */
      this.eBookLocation=path.resolve(this.eBookLocation+'/'+this.eBookTitle+'/'); //ebook 폴더까지 경로
      //console.log("ebooklocation : "+eBookLocation);

      //console.log("before : "+this.$store.state.ebookDirectory);
      this.SET_EBOOKDIRECTORY(this.eBookLocation); //store에 현재 위치 저장
      //console.log("after : "+this.$store.state.ebookDirectory);

      fs.mkdir(this.eBookLocation,function(err){
        if(err){
          console.log("make directory error : "+err);
        }
        else{
          console.log("success, make directory in eBookLocation ");
        }
      });

      let eBookSettingDirectory=path.resolve('src/assets/NewEbook'); //기본 ebook 디렉토리 위치

      //console.log("ebooklocation : "+this.eBookLocation);
      //console.log("before : "+this.$store.state.ebookDirectory);
      //console.log("after : "+this.$store.state.ebookDirectory);
      
      this.dirAndFileCopy(eBookSettingDirectory,this.eBookLocation); //기본 ebook 디렉토리를 새 ebook 디렉토리에 복사

      /*
       새 ebook 만들기 
       - 표지 이미지 파일 EPUB 폴더 내 image 폴더로 파일로 복사
        */
      let coverLocation=path.resolve(this.eBookLocation+'/EPUB/images/'+this.eBookCover.name); //이미지 저장할 위치 
      this.dirAndFileCopy(this.eBookCover.path,coverLocation); // 입력받은 이미지를 저장할 위치로 복사

      this.renameImageTag(this.eBookLocation);
      this.eBook=false;

      this.readToc(this.eBookLocation);
      
    },
    readToc(eBookLocation){
      const data = readDirectory(eBookLocation, [], [], 0)
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      console.log(data);
      this.getToc(data['toc'])
    },
    renameImageTag: function (eBookLocation) {
      let coverLocation=path.resolve(eBookLocation+'/EPUB/images/'+this.eBookCover.name);
      let newCoverLocation=path.resolve(eBookLocation+'/EPUB/images/cover.jpg');
      fs.rename(coverLocation, newCoverLocation, function(err){
      if( err ) throw err;
      console.log('File Renamed!');
      });
    },

    loadEbook: function () { // E-BOOK 불러오기
      const options = {
        properties: ['openDirectory']
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.$store.state.ebookDirectory = r[0]
      // console.log(r[0])

      // console.log(r[0]);
      const data = readDirectory(r[0], [], [], 0)
      // console.log('loadEbook: ',data);
      // console.log(data['maxV'])
      this.chapterNum = data['maxV']
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      this.getToc(data['toc'])
    },
    getToc: function (val) { // 목차 읽어오기
      const fileToText = fs.readFileSync(val[0]).toString()
      // 챕터 추가할 때 readFileSync 안됨.
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

    // chapter 추가하기
    makeChapter: function (val) {
      this.chapterDialog = false;
      let num = ''
      let path = this.$store.state.ebookDirectory + '/EPUB/text/';
      const temp = fs.readFileSync('src/assets/chapter01.xhtml').toString()
      this.chapterNum++
      if (this.chapterNum < 10) {
        num = '0' + this.chapterNum
      }
      changeHtag(path, num, temp, val)
      addContentOpf(this.$store.state.ebookDirectory, num)
      addTocNcx(this.$store.state.ebookDirectory, val, num)
      const data = readDirectory(this.$store.state.ebookDirectory, [], [], 0)
      // this.SET_EBOOKDIRECTORY(data['arrayOfFiles'])
      // console.log('makeChapter: ', data)
      alert('새 chapter가 추가되었습니다!');
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      this.$store.state.tableOfContents.push({text: val})
      this.chapterText = '';
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