<template>
  <div>
    <template v-if="itemIndex===0">
      <v-dialog v-model="eBook" persistent max-width="600px">
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">새 e-book 생성</v-btn>
        </template>
        <v-card>
          <v-card-title class="headline header-color">
            <span>E-Book 생성</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row class="my-3">
                <v-text-field label="E-Book Title *" required v-model="eBookTitle"></v-text-field>
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
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="eBook = false">
              Close
            </v-btn>
            <v-btn text @click="createNewEBook" style="color: #423F8C;">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
      <v-btn text @click="storeInputText">저장하기</v-btn>
      <v-btn @click="preview" text>e-book 미리보기</v-btn>
      <!-- <v-btn text @click="storeNewInputText">다른 이름으로 저장하기</v-btn> -->
      <v-btn @click.stop="titleDialog = true" text>e-pub으로 내보내기</v-btn>
      <v-btn @click.stop="chapterDialog = true" text>chapter 추가하기</v-btn>
    </template>
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
    <template v-else-if="itemIndex===2">
      <ToolsTab/>
    </template>
    <template v-else>
      <v-btn text>editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>

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

    <v-dialog v-model="titleDialog" max-width="500">
      <v-card>
        <v-card-title class="headline header-color">
          E-PUB으로 내보내기
        </v-card-title>
        <v-card-text>
          <v-text-field class="my-3" label="epub 이름" v-model="titleText" required></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="titleDialog = false">
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

<!-- -------------------- dialog end -------------------- -->

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
//const ncp=require('ncp').ncp;
const fse=require('fs-extra')
export default {
  name: 'SubMenu',
  components: {
    ToolsTab
  },
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
      selectDefaultImg: false,

      /* itemIndex 0 :  */
      eBook:false, // 새 eBook 만들기 Dialog 활성화/비활성화
      eBookCover:[], // 새 eBook 이미지
      eBookTitle:'', // 새 eBook 이름
      eBookLocation:'', //eBook 폴더까지 경로

    }
  },
  computed: {
    ...mapState(["editingText", "editingHTMLText", "ebookDirectory",'editingTextArrPoint','editingTextArr','arrSize']),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT","SET_EBOOKDIRECTORY", "SET_EBOOKDIRECTORY",'PUSH_EDITINGTEXTARR','SHIFT_EDITINGTEXTARR',"UP_EDITINGTEXTARRPOINT","DOWN_EDITINGTEXTARRPOINT"]),
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
      if (this.selectDefaultImg === true) {   // 기본 이미지를 선택할 경우
        this.eBookCover.name = 'default.jpg'
        this.selectDefaultImg = false
      } else {  // 이미지를 선택할 경우
        let coverLocation=path.resolve(this.eBookLocation+'/EPUB/images/'+this.eBookCover.name); //이미지 저장할 위치 
        this.dirAndFileCopy(this.eBookCover.path,coverLocation); // 입력받은 이미지를 저장할 위치로 복사
      }
      this.renameImageTag();
      this.eBook=false;

      this.readToc();
    },
    readToc(){
      const data = readDirectory(this.eBookLocation, [], [])
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
      //document.execCommand('undo');
      this.inputTextUndo();
    },
    redo(){ // 실행 취소 되돌리기
      //document.execCommand('redo');
      this.inputTextRedo();
    },
    find: function (findText) {
      eventBus.$emit('findText', findText);
    },
    replace: function (findText, replaceText, replaceAlphabet, replaceAllText) {
      this.find(findText)
      eventBus.$emit('replaceText', [replaceText, replaceAlphabet, replaceAllText]);
    },


    inputTextRedo(){
      //console.log("Redo");
      //console.log(this.editingTextArrPoint);
      if(this.editingTextArrPoint==this.arrSize)
        return;
      this.UP_EDITINGTEXTARRPOINT();
      
      this.inputTextSet();
    },
    inputTextUndo(){
      //console.log("Undo");
      //console.log(this.editingTextArrPoint);
      if(this.editingTextArrPoint==0){
        return;
      }
      this.DOWN_EDITINGTEXTARRPOINT();
      //console.log(this.editingTextArrPoint)
      //console.log(this.editingTextArrPoint);
      this.inputTextSet();
    },
    inputTextSet(){
      //console.log("set");
      //console.log(this.editingTextArr);
      //console.log(this.editingTextArrPoint);
      //console.log(this.editingTextArr[this.editingTextArrPoint]);
      this.SET_EDITINGTEXT(this.editingTextArr[this.editingTextArrPoint]);
      //console.log(this.editingText);
      eventBus.$emit('set');
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
.header-color{
  background-color: #C0BFD9;
}
.font-color{
  color: #423F8C;
}
</style>