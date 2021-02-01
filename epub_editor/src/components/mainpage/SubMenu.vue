<template>
  <div>
    <!-------------------- file tap start -------------------->
    <template v-if="itemIndex===0">
      <v-btn @click.stop="eBookDialog = true" text>e-book 생성하기</v-btn>
      <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
      <v-btn text @click="storeInputText">저장하기</v-btn>
      <v-btn @click="preview" text>e-book 미리보기</v-btn>
      <!-- <v-btn text @click="storeNewInputText">다른 이름으로 저장하기</v-btn> -->
      <v-btn @click.stop="epubDialog = true" text>e-pub으로 내보내기</v-btn>
      <v-btn @click.stop="chapterDialog = true" text>chapter 추가하기</v-btn>
    </template>
    <!--------------------- file tap end --------------------->

    <!-------------------- edit tap start -------------------->
    <template v-else-if="itemIndex===1">
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="undo"><v-icon medium>mdi-undo</v-icon></v-btn></template>
        <span>undo</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="redo"><v-icon medium>mdi-redo</v-icon></v-btn></template>
        <span>redo</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="cut"><v-icon medium>mdi-content-cut</v-icon></v-btn></template>
        <span>cut</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="copy"><v-icon medium>mdi-content-copy</v-icon></v-btn></template>
        <span>copy</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="paste"><v-icon medium>mdi-content-paste</v-icon></v-btn></template>
        <span>paste</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click.stop="findDialog = true" text><v-icon medium>mdi-file-find-outline</v-icon></v-btn></template>
        <span>findDialog</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click.stop="replaceDialog = true" text><v-icon medium>mdi-find-replace</v-icon></v-btn></template>
        <span>replaceDialog</span>
      </v-tooltip>
    </template>
    <!---------------------- edit tap end ---------------------->

    <!-------------------- manual tap start -------------------->
    <template v-else-if="itemIndex===2">
      <ToolsTab/>
    </template>
    <template v-else>
      <v-btn text>editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>
    <!-------------------- manual tap start -------------------->

    <!---------------------- dialog start ---------------------->

    <!-- find dialog -->
    <v-dialog v-model="findDialog" max-width="500">
      <v-card>
        <v-card-title class="headline header-color">단어 찾기</v-card-title>
        <v-card-text>
          <v-text-field class="my-5" label="찾고 싶은 단어" v-model="findText" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="findDialog = false">
            취소
          </v-btn>
          <v-btn text @click="find(findText); findDialog = false;" style="color: #423F8C;">
            단어 찾기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- replace dialog -->
    <v-dialog v-model="replaceDialog" max-width="500">
      <v-card>
        <v-card-title class="headline header-color">단어 변환</v-card-title>
        <v-card-text class="d-flex flex-row mt-4 pa-0">
          <v-text-field class="my-3 mx-5" label="찾고 싶은 단어" v-model="findText" required></v-text-field>
          <v-icon>mdi-arrow-right</v-icon>
          <v-text-field class="my-3 mx-5" label="바꾸고 싶은 단어" v-model="replaceText" required></v-text-field>
        </v-card-text>
        <v-container>
          <v-row class="ml-2">
            <v-col cols="3">
              <v-checkbox v-model="replaceAlphabet" label="Aa"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="replaceAllText" label="All"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="replaceDialog = false">
            취소
          </v-btn>
          <v-btn text @click="replace(findText, replaceText, replaceAlphabet, replaceAllText); replaceDialog = false;" style="color: #423F8C;">
            단어 변환
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- eBook dialog -->
    <v-dialog v-model="eBookDialog" max-width="600">
      <v-card>
        <v-card-title class="headline header-color">
          E-BOOK 생성하기
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-row class="my-3">
          <v-text-field class="my-3" label="e-book 이름" v-model="eBookText" required></v-text-field>
              </v-row>
              <v-row>
                <div class="my-3 d-flex align-center">
                  <v-btn @click="load">위치 선택</v-btn>
                  <p class="my-0 mx-3">{{eBookLocation[0]}}</p>
                </div>
              </v-row>
              <v-row class="my-3">
                <v-file-input
                  v-model="eBookCover"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="E-Book Image"
                ></v-file-input>
              </v-row>
              <v-row class="d-flex align-center">
                <v-btn class="my-3" @click="selectDefaultImg=true">기본 이미지로 저장</v-btn>
                <p class="my-3 mx-3" v-if="selectDefaultImg===true">기본 이미지를 선택</p>
                <p class="my-3 mx-3" v-else>*indicates required field</p>
              </v-row>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="eBookDialog = false">
            취소
          </v-btn>
          <v-btn text @click="createNewEBook" style="color: #423F8C;">
            e-book 생성하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- epub dialog -->
    <v-dialog v-model="epubDialog" max-width="500">
      <v-card>
        <v-card-title class="headline header-color">
          E-PUB으로 내보내기
        </v-card-title>
        <v-card-text>
          <v-text-field class="my-3" label="epub 이름" v-model="epubText" required></v-text-field>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="epubDialog = false">
            취소
          </v-btn>
          <v-btn text @click="makeEpub" style="color: #423F8C;">
            epub 내보내기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- chapterDialog -->
    <v-dialog v-model="chapterDialog" max-width="400">
      <v-card>
        <v-card-title class="headline header-color">chapter 추가하기</v-card-title>
        <v-card-text>
          <v-text-field class="my-3" label="chapter 이름" v-model="chapterText" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="chapterDialog = false">
            취소
          </v-btn>
          <v-btn text @click="makeChapter(chapterText)" style="color: #423F8C;">
            chapter 만들기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-------------------- dialog end -------------------->

  </div>
</template>

<script>
import { readDirectory, tocToList, makeEpubFile, addContentOpf, addTocNcx, changeHtag } from '@/functions/file.js'
import eventBus from '@/eventBus.js'
import { mapMutations, mapState } from 'vuex'
import ToolsTab from '@/components/mainpage/menutabs/ToolsTab'

const fs = require('fs')
const path=require('path')
const electron = require('electron')
const { dialog } = require('electron').remote
const BrowserWindow = electron.remote.BrowserWindow
const fse=require('fs-extra')
export default {
  name: 'SubMenu',
  components: {
    ToolsTab
  },
  data() {
    return {
      // dialog
      chapterDialog: false,
      epubDialog: false,
      findDialog: false,
      replaceDialog: false,
      eBookDialog: false,

      // string
      chapterText: '',
      epubText: '',
      findText: '',
      replaceText: '',
      eBookText: '',
      eBookLocation: '',

      // boolean
      replaceAlphabet: false,
      replaceAllText: false,
      selectDefaultImg: false,

      // number
      hTags: [1, 2, 3, 4, 5, 6],
      chapterNum: 0,

      // Array
      findIndexArray: [],
      eBookCover: [],
    }
  },
  computed: {
    ...mapState(["editingText", "editingHTMLText", "ebookDirectory",'editingTextArrPoint','editingTextArr','arrSize']),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT","SET_EBOOKDIRECTORY", "SET_EBOOKDIRECTORY",'PUSH_EDITINGTEXTARR','SHIFT_EDITINGTEXTARR',"UP_EDITINGTEXTARRPOINT","DOWN_EDITINGTEXTARRPOINT"]),

    //-------------------- file tab start --------------------

    // 새 e-book 생성
    load: function(){
      const options = {
        properties: ['openDirectory']
      }
      this.eBookLocation = dialog.showOpenDialogSync(options)
      if (!this.eBookLocation) return
    },
    dirAndFileCopy: function(source, destination){
      fse.copySync(source,destination);
      console.log("success, copy");
    },
    createNewEBook: function() {
      /*
      새 EBOOK 만들기
      - 선택한 위치에 TITLE 명의 폴더 생성 
      - src.assets.NewEbook에 있는 기본 EPUB파일 복사
      */
      this.eBookLocation=path.resolve(this.eBookLocation+'/'+this.eBookText+'/'); //ebook 폴더까지 경로
      this.SET_EBOOKDIRECTORY(this.eBookLocation); //store에 현재 위치 저장

      fs.mkdir(this.eBookLocation,function(err){
        if(err){
          console.log("make directory error : "+err);
        }
        else{
          console.log("success, make directory in eBookLocation ");
        }
      });

      this.eBookDialog = false;
      let eBookSettingDirectory=path.resolve('src/assets/NewEbook'); //기본 ebook 디렉토리 위치
      this.dirAndFileCopy(eBookSettingDirectory,this.eBookLocation); //기본 ebook 디렉토리를 새 ebook 디렉토리에 복사

      /*
       새 ebook 만들기 
       - 표지 이미지 파일 EPUB 폴더 내 image 폴더로 파일로 복사
        */
      if (this.selectDefaultImg === true) {   // 기본 이미지를 선택할 경우
        this.eBookCover.name = 'default.jpg'
        this.selectDefaultImg = false
      } else {  // 이미지를 선택할 경우
        let coverLocation=path.resolve(this.eBookLocation+'/EPUB/images/'+this.eBookCover.name); //이미지 저장할 위치 
        this.dirAndFileCopy(this.eBookCover.path,coverLocation); // 입력받은 이미지를 저장할 위치로 복사
      }
      this.renameImageTag();
      this.eBookDialog = false;
      this.eBookText = '';
      this.readToc();
    },

    // 목차 읽어오기
    readToc: function () {
      const data = readDirectory(this.eBookLocation, [], [])
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      console.log(data);
      this.getToc(data['toc'])
    },

    // 이미지 이름 재설정
    renameImageTag: function () {
      let coverLocation=path.resolve(this.eBookLocation+'/EPUB/images/'+this.eBookCover.name);
      let newCoverLocation=path.resolve(this.eBookLocation+'/EPUB/images/cover.jpg');
      fs.rename(coverLocation, newCoverLocation, function(err){
        if( err ) throw err;
        console.log('File Renamed!');
      });
    },

    //다른 이름으로 저장하기
    // storeNewInputText: function () {  
    //   const options = {
    //     title: '다른 이름으로 저장하기',
    //     properties: ['openDirectory','nameFieldLabel']
    //   }
    //   const directory = dialog.showSaveDialogSync(options)
    //   console.log(directory)
    //   // fs.writeFileSync(directory[0]+'/temp', this.$store.state.editingText)
    // },

    // 저장하기
    storeInputText: function () { 
      const updatedText = this.$store.state.editingHTMLText + this.$store.state.editingText + '</html>'
      fs.writeFileSync(this.$store.state.selectedFileDirectory, updatedText)
    },

    // e-book 불러오기
    loadEbook: function () { 
      const options = {
        properties: ['openDirectory']
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.$store.state.ebookDirectory = r[0]
      const data = readDirectory(r[0], [], [], 0)
      this.chapterNum = data['maxV']
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      this.getToc(data['toc'])
    },

    // 목차 읽어오기
    getToc: function (val) { 
      const fileToText = fs.readFileSync(val[0]).toString()
      // 챕터 추가할 때 readFileSync 안됨.
      this.$store.state.tableOfContents = tocToList(fileToText, [])
    },

    // epub 내보내기
    makeEpub: function () { 
      this.epubDialog = false;
      this.savePath = makeEpubFile(this.$store.state.ebookDirectory, this.epubText);
      this.epubText = '';
    },

    // e-book 미리보기
    preview: function () { 
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
      alert('새 chapter가 추가되었습니다!');
      this.$store.state.ebookDirectoryTree = data['arrayOfFiles']
      this.$store.state.tableOfContents.push({text: val})
      this.chapterText = '';
    },
    //-------------------- file tab end --------------------

    
   //-------------------- edit tab start --------------------
   /* 
      < itemIndex 1 : 편집 >
      cut/copy : 드래그 필수,
      paste : chrome 환경에서 작동 안됨,
    */
   //자르기
    cut(){ 
      document.execCommand('cut');
    },

    //복사
    copy(){ 
      document.execCommand('copy');
    },

    // 붙여넣기
    paste(){ 
      document.execCommand('paste');
    },

    // 실행 취소
    undo(){ 
      //document.execCommand('undo');
      this.inputTextUndo();
    },

    // 실행 취소 되돌리기
    redo(){ 
      //document.execCommand('redo');
      this.inputTextRedo();
    },

    // 찾기
    find: function (findText) {
      eventBus.$emit('findText', findText);
    },

    // 문자 대체하기
    replace: function (findText, replaceText, replaceAlphabet, replaceAllText) {
      this.find(findText)
      eventBus.$emit('replaceText', [replaceText, replaceAlphabet, replaceAllText]);
    },
    
    inputTextRedo: function(){
      if(this.editingTextArrPoint==this.arrSize)
        return;
      this.UP_EDITINGTEXTARRPOINT();
      
      this.inputTextSet();
    },
    inputTextUndo: function(){
      if(this.editingTextArrPoint==0){
        return;
      }
      this.DOWN_EDITINGTEXTARRPOINT();
      this.inputTextSet();
    },
    inputTextSet: function(){
      this.SET_EDITINGTEXT(this.editingTextArr[this.editingTextArrPoint]);
      eventBus.$emit('set');
    },
    //-------------------- edit tab end --------------------

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
.header-color{
  background-color: #C0BFD9;
}
.font-color{
  color: #423F8C;
}
</style>