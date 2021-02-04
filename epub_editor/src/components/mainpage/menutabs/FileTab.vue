<template>
  <div>
    <v-btn @click.stop="eBookDialog = true" text>e-book 생성하기</v-btn>
    <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
    <v-btn @click="storeInputText" text>저장하기</v-btn>
    <v-btn @click="preview" text>e-book 미리보기</v-btn>
    <v-btn @click.stop="epubDialog = true" text>e-pub으로 내보내기</v-btn>
    <v-btn @click.stop="chapterDialog = true" text>chapter 추가하기</v-btn>
    
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
                  <v-btn @click="selectPath">위치 선택</v-btn>
                  <p class="my-0 mx-3">{{selectedEBookLocation}}</p>
                </div>
              </v-row>
              <v-row class="my-3">
                <v-file-input
                  v-model="eBookCover"
                  accept="image/png, image/jpeg, image/bmp"
                  prepend-icon="mdi-camera"
                  label="기본 이미지"
                ></v-file-input>
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
    <Dialog
      :isDialog = "epubDialog"
      title = "epub 내보내기"
      labelText = "epub 이름"
      :dialogMethod = "makeEpub"
      @toggle-dialog = "epubDialog = false"
     /> 

    <!-- chapter dialog -->
     <Dialog
      :isDialog = "chapterDialog"
      title = "chapter 추가하기"
      labelText = "chapter 이름"
      :dialogMethod = "makeChapter"
      @toggle-dialog = "chapterDialog = false"
     /> 
  </div>
</template>

<script>
import { readDirectory, tocToList, makeEpubFile, addContentOpf, addTocNcx, changeHtag, readPath } from '@/functions/file.js';
import { mapState } from 'vuex';
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
      chapterDialog: false,
      epubDialog: false,
      eBookDialog: false,

      // string
      eBookText: '',
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
    }
  },
  computed: {
    ...mapState(["editingText", "editingHTMLText", "ebookDirectory",'editingTextArr']),
  },
  methods: {
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
      this.eBookLocation = this.eBookLocation + '/' + this.eBookText + '/';
      this.$store.dispatch('setEbookDirectory', this.eBookLocation); // store에 현재 위치 저장, 그럼 스토어에는 저장을 왜하는 것일까?
      fs.mkdir(this.eBookLocation, function (err) {
        if (err) {
          console.log(err);
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
    },

    // 목차 읽어오기
    readToc: function () {
      const data = readDirectory(this.eBookLocation, [], [], 0);
      this.chapterNum = data['maxV'];
      this.$store.dispatch('setEbookDirectoryTree', data['arrayOfFiles']);

      const fileToText = fs.readFileSync(data['toc'][0]).toString();
      this.$store.dispatch('setTableOfContents', tocToList(fileToText, []));
    },

    // 이미지 이름 재설정
    renameImageTag: function () {
      let coverLocation=path.resolve(this.eBookLocation+'/EPUB/images/'+this.eBookCover.name);
      let newCoverLocation=path.resolve(this.eBookLocation+'/EPUB/images/cover.jpg');
      fs.rename(coverLocation, newCoverLocation, function(err){
        if (err) throw err;
        console.log('File Renamed!');
      });
    },

    // 저장하기
    storeInputText: function () { 
      const updatedText = this.$store.state.editingHTMLText + this.$store.state.editingText + '</html>';
      fs.writeFileSync(this.$store.state.selectedFileDirectory, updatedText);
    },

    // e-book 불러오기
    loadEbook: function () { 
      this.eBookLocation = readPath();
      this.$store.dispatch('setEbookDirectory', this.eBookLocation)
      if (this.eBookLocation) {
        this.readToc();
      }
    },

    // epub 내보내기
    makeEpub: function (val) { 
      this.epubDialog = false;
      this.savePath = makeEpubFile(this.eBookLocation, val);
      this.epubText = '';
    },

    // e-book 미리보기
    preview: function () { 
      const win = new BrowserWindow({ width: 800, height: 1500 });
      win.loadURL(this.$store.state.selectedFileDirectory);
    },

    // chapter 추가하기
    makeChapter: function (val) {
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
      alert('새 chapter가 추가되었습니다!');
      this.$store.dispatch('setEbookDirectoryTree', data['arrayOfFiles']);
      this.$store.dispatch('addTableOfContents', val);
      this.chapterText = '';
    },
  }
}
</script>