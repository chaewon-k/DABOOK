<template>
  <v-tabs id="fileTab" show-arrows v-model="tab">
    <v-btn v-if="dirToggle" class="align-self-center" @click="changeToggle" text>디렉토리 닫기</v-btn>
    <v-btn v-else class="align-self-center" @click="changeToggle" text>디렉토리 열기</v-btn>
    <v-btn class="align-self-center" @click.stop="eBookDialog = true" text>이북 생성하기</v-btn>
    <v-btn class="align-self-center" @click="loadEbook" text>이북 불러오기</v-btn>
    <v-btn class="align-self-center" @click="storeInputText" text>저장하기</v-btn>
    <v-btn class="align-self-center" @click="preview" text>이북 미리보기</v-btn>
    <v-btn class="align-self-center" @click="exportFile" text>ePUB으로 내보내기</v-btn>
    <v-btn class="align-self-center" @click="addChapter" text>목차 추가하기</v-btn>
    
    <!------- eBook dialog ------>
    <v-dialog v-model="eBookDialog" max-width="500">
      <v-card>
        <v-card-title class="header-color font-weight-black">
          이북 생성하기
        </v-card-title>
        <v-card-text>
          <v-container>
              <v-row class="my-3">
                <v-icon style="color: #423F8C;" class="mr-3 header-color">mdi-book-open-outline</v-icon>
                <v-text-field class="my-3" :rules="[rules.required, rules.check]" label="e-book 이름" v-model="eBookText" required></v-text-field>
              </v-row>
              <v-row>
                <div class="my-3 d-flex align-center">
                  <v-btn outlineds style="color: #423F8C;" @click="selectPath">위치 선택</v-btn>
                  <p class="my-0 mx-3">{{selectedEBookLocation}}</p>
                </div>
              </v-row>
              <v-row>
                <p class="mt-3 confirmMessage"  style="visibility:hidden"  id="location"> Required. </p>
              </v-row>
              <v-row class="my-3">
                <v-file-input
                  v-model="eBookCover"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-image-search-outline"
                  label="기본 이미지"
                ></v-file-input>
              </v-row>
            </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="eBookDialog = false">취소</v-btn>
          <v-btn text @click="createNewEBook" style="color: #423F8C;">이북 생성하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="epubDialog" max-width="500">
      <v-card>
        <v-card-title>
          <v-icon style="color: #423F8C;">mdi-book-check-outline</v-icon>
          <div class="ml-3 font-weight-bold header-color">ePUB 내보내기</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="my-3">
              <v-icon class="mr-5" style="color: #423F8C;">mdi-book-open-outline</v-icon>
              <v-text-field class="my-3" label="책 이름" v-model="eBookText" required></v-text-field>
            </v-row>
            <v-row class="my-3">
              <v-icon class="mr-5" style="color: #423F8C;">mdi-account-outline</v-icon>
              <v-text-field class="my-3" label="작성자" v-model="eBookAuthor" required></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="epubDialog = false">취소</v-btn>
          <v-btn text @click="makeEpub(eBookText)" style="color: #423F8C;">ePUB 내보내기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- chapter dialog -->
    <Dialog
      :isDialog = "chapterDialog"
      title = "목차 추가하기"
      labelText = "목차 이름"
      :dialogMethod = "makeChapter"
      @toggle-dialog = "chapterDialog = false"
    /> 
  </v-tabs>
</template>

<script>
import { readDirectory, tocToList, makeEpubFile, addContentOpf, addTocNcx, changeHtag, readPath, readCustomStyle, changeTitleAuthor } from '@/functions/file.js';
import { mapState } from 'vuex';
import eventBus from "@/eventBus.js";
import Dialog from '@/components/mainpage/Dialog';

const fs = require('fs');
const path=require('path');
const electron = require('electron');
const BrowserWindow = electron.remote.BrowserWindow;
const fse = require('fs-extra');

export default {
  name: 'FileTab',
  components: {
    Dialog
  },
  data: function () {
    return {
      // dialog
      tab: null,
      chapterDialog: false,
      epubDialog: false,
      eBookDialog: false,

      // string
      eBookText: '',
      eBookAuthor: '',
      eBookLocation: '',
      selectedEBookLocation: '',

      // boolean
      selectDefaultImg: false,

      // number
      hTags: [1, 2, 3, 4, 5, 6],
      chapterNum: 0,

      // Array
      findIndexArray: [],
      eBookCover: [],
      
      rules: {
          required: value => !!value || 'Required.',
          check: value => !this.checkExp(value)|| '특수문자 사용불가',
        },
    }
  }, 
  created: function () {
    eventBus.$on('shortcut',(res) => {
      if (res=="save") {
        this.storeInputText();
      }
    })
  },
  computed: {
    ...mapState(["alertDialog","editingText", "editingHTMLText", "ebookDirectory",'editingTextArr', 'dirToggle']),
  },
  watch:{
    selectedEBookLocation: function(){
      if(this.selectedEBookLocation==undefined){
        document.getElementById("location").style.visibility="visible";
      }
      else{
        document.getElementById("location").style.visibility="hidden";
      }
    }
  },
  methods: {
    checkExp: function(value){
      var special_pattern =  /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi;
      if(special_pattern.test(value)==true){
        return true;
      }
      else{
        return false;
      }
    },


    // 새 e-book 생성
    // 위치 선택
    selectPath: function () {
      /*
      E-BOOK 생성하기 > 위치 선택 버튼을 눌렀을 때 선택한 위치 + ebook 제목 반환
      */
      this.eBookLocation = readPath();
      this.selectedEBookLocation = this.eBookLocation;
    },
    createNewEBook: function () {
      /*
      새 EBOOK 만들기
      - 선택한 위치에 TITLE 명의 폴더 생성 
      - src.assets.NewEbook에 있는 기본 EPUB파일 복사
      */
      try {
        if(this.eBookText=='' || this.selectedEBookLocation==undefined)
          return;
        if(this.checkExp(this.eBookText))
          return;
        this.eBookLocation = this.eBookLocation + '/' + this.eBookText + '/';
        this.$store.dispatch('setEbookDirectory', this.eBookLocation); // store에 현재 위치 저장, 그럼 스토어에는 저장을 왜하는 것일까?
        fs.mkdir(this.eBookLocation, function (err) {
          if (err) {
            console.log('디렉토리 생성 실패');
          }
        });

        this.eBookDialog = false;
        let eBookSettingDirectory = 'src/assets/NewEbook'; //기본 ebook 디렉토리 위치
        fse.copySync(eBookSettingDirectory,this.eBookLocation); //기본 ebook 디렉토리를 새 ebook 디렉토리에 복사
        /*
        새 ebook 만들기 
        - 표지 이미지 파일 EPUB 폴더 내 image 폴더로 파일로 복사
          */
        if (this.eBookCover.length === 0) {   // 기본 이미지를 선택할 경우
          this.eBookCover.name = 'default.jpg';
        } else {  // 이미지를 선택할 경우
          const coverLocation = this.eBookLocation + '/EPUB/images/' + this.eBookCover.name; //이미지 저장할 위치 
          fse.copySync(this.eBookCover.path, coverLocation); // 입력받은 이미지를 저장할 위치로 복사
        }
        this.renameImageTag();
        this.readToc();
        // Dialog 초기화
        this.eBookDialog = false;
        this.eBookText = '';
        this.selectedEBookLocation = '';
        this.$store.dispatch('setEditingText', '');
        this.$store.dispatch('setAlertMessage', "새로운 이북 생성에 성공했습니다");
      }
      catch (err) {
        console.log(err);
        this.eBookDialog = false;
        this.eBookText = '';
        this.selectedEBookLocation = '';
        this.$store.dispatch('setAlertMessage', "새로운 이북 생성에 실패했습니다");
      }
    },

    // 목차 읽어오기
    readToc: function () {
      try {
        const data = readDirectory(this.eBookLocation, [], [], 0);
        this.chapterNum = data['maxV'];

        const folders = []  // 선택한 디렉토리의 폴더들을 리스트에 저장한다.
        for (let i = 0; i < data['arrayOfFiles'].length; i++) {
          folders.push(data['arrayOfFiles'][i].name)
        }
        
        if (folders.includes('EPUB') && folders.includes('META-INF') && folders.includes('mimetype')) {
          // 선택한 디렉토리에 필수 폴더들이 모두 있는 경우에만 디렉토리에 로드한다.
          this.$store.dispatch('setEbookDirectoryTree', data['arrayOfFiles']);
          console.log(data['arrayOfFiles'])
          const fileToText = fs.readFileSync(data['toc'][0]).toString();
          this.$store.dispatch('setTableOfContents', tocToList(fileToText, []));
          return true
        } else {  // 필수 폴더들이 모두 있지 않은 경우 알림창을 띄운다. 
          this.$store.dispatch('setAlertMessage',"EPUB 폴더가 아닙니다.")
          return false
        }
      } catch (err) {
        console.log('목차 읽어오기 실패');
        this.$store.dispatch('setAlertMessage',"목차 읽어오기에 실패했습니다");
      }
    },

    // 나만의 style 읽어오기
    readCustomStyle: function () {
      // let data = readCustomStyle(this.eBookLocation);
      // console.log(data);
      this.$store.dispatch('setCustomStyleArray', readCustomStyle(this.eBookLocation));
    },

    // 이미지 이름 재설정
    renameImageTag: function () {
      let coverLocation = path.resolve(this.eBookLocation + '/EPUB/images/' + this.eBookCover.name);
      let newCoverLocation = path.resolve(this.eBookLocation + '/EPUB/images/cover.jpg');
      fs.rename(coverLocation, newCoverLocation, function(err) {
        if (err) throw err;
        // console.log('File Renamed!');
      });
    },

    // 저장하기
    storeInputText: function () { 
      try {
        const updatedText = this.$store.state.editingHTMLText + this.$store.state.editingText + '</html>';
        fs.writeFileSync(this.$store.state.selectedFileDirectory, updatedText);
        this.$store.dispatch('setAlertMessage',"저장되었습니다");
      } catch (err) {
        console.log('저장하기 실패');
        if (this.eBookLocation) {    // 이북을 생성한 상태에서 textarea가 비어있을 경우
          this.$store.dispatch('setAlertMessage',"저장할 xhtml 파일을 선택해주세요");
        } else {  // 이북을 생성하지 않은 상태에서 저장할 경우
          this.$store.dispatch('setAlertMessage',"이북을 생성해주세요");
        }
      }
    },
 
    // e-book 불러오기
    loadEbook: function () { 
      try {
        this.eBookLocation = readPath();
        if (this.eBookLocation) {
          if (this.readToc()) {   // EPUB 필수 폴더들이 있는 경로를 선택한 경우에만 디렉토리에 로드한다.
            this.$store.dispatch('setEbookDirectory', this.eBookLocation);
            this.readCustomStyle();
            this.$store.dispatch('setEditingText', '');
            this.$store.dispatch('setAlertMessage',"이북 불러오기에 성공했습니다"); 
          }
        }
      }
      catch (err) {
        console.log(err);
        this.$store.dispatch('setAlertMessage',"이북 불러오기에 실패했습니다"); 
      }
    },

    // epub 내보내기
    makeEpub: function (val) { 
      try {
        changeTitleAuthor(this.eBookLocation, val, this.eBookAuthor)
        this.epubDialog = false;
        this.savePath = makeEpubFile(this.eBookLocation, val);
        this.$store.dispatch('setAlertMessage', "ePUB 내보내기에 성공했습니다");
      } catch (err) {
        console.log('epub 내보내기 실패');
        this.$store.dispatch('setAlertMessage', "ePUB 내보내기에 실패했습니다");
      }
      this.eBookText = '';
      this.eBookAuthor = '';
    },

    // epub 내보내기 조건 추가 (생성한 후에만 내보내기 가능)
    exportFile: function () {
      if (this.$store.state.ebookDirectoryTree.length === 0) {
        this.$store.dispatch('setAlertMessage', "내보내기할 이북이 없습니다.");
      } else {
        this.epubDialog = true;
      }
    },

    // e-book 미리보기
    preview: function () { 
      try {
        if (this.$store.state.selectedFileDirectory === '') {
          this.$store.dispatch('setAlertMessage', "미리보기할 이북이 없습니다.");
        } else {
          const win = new BrowserWindow({ width: 800, height: 1500 });
          win.loadURL("file://" + this.$store.state.selectedFileDirectory);
        }  
      } catch {
        console.log('ebook 미리보기 실패')
      }
    },

    // chapter 추가하기
    makeChapter: function (val) {
      try {
        this.chapterDialog = false;
        let num = '';
        let path = this.eBookLocation + '/EPUB/text/';
        const temp = fs.readFileSync('src/assets/chapter01.xhtml').toString();
        this.chapterNum++;
        if (this.chapterNum < 10) {
          num = '0' + this.chapterNum;
        } else {
          num = this.chapterNum;
        }
        changeHtag(path, num, temp, val);
        addContentOpf(this.eBookLocation, num);
        addTocNcx(this.eBookLocation, val, num);
        
        const data = readDirectory(this.eBookLocation, [], [], 0);
        //alert('새 chapter가 추가되었습니다!');
        this.$store.dispatch('setAlertMessage',"목차 추가에 성공했습니다");
 
        this.$store.dispatch('setEbookDirectoryTree', data['arrayOfFiles']);
        this.$store.dispatch('addTableOfContents', val);
        this.chapterText = '';
      } catch (err) {
        console.log('chapter 추가 실패');
        this.$store.dispatch('setAlertMessage',"목차 추가에 실패했습니다");
      }
    },
    addChapter: function () {
      if (this.$store.state.ebookDirectoryTree.length === 0) {
        this.$store.dispatch('setAlertMessage', "이북을 먼저 생성해주세요!");
      } else {
        this.chapterDialog = true;
      }
    },
    changeToggle: function () {
      this.$store.dispatch('setDirToggle');
    }
  }
}
</script>