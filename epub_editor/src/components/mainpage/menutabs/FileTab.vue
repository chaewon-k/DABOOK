<template>
  <v-tabs id="fileTab" show-arrows v-model="tab">
    <v-btn class="align-self-center" @click.stop="eBookDialog = true" text
      >{{ $t("filetab.create") }}</v-btn
    >
    <v-btn class="align-self-center" @click="loadEbook" text
      >{{ $t("filetab.load") }}</v-btn
    >
    <v-btn class="align-self-center" @click="storeInputText" text
      >{{ $t("filetab.save") }}</v-btn
    >
    <v-btn class="align-self-center" @click="preview" text>{{ $t("filetab.preview") }}</v-btn>
    <v-btn class="align-self-center" @click="exportFile" text
      >{{ $t("filetab.epub") }}</v-btn
    >
    <v-btn class="align-self-center" @click="addChapter" text
      >{{ $t("filetab.chapter") }}</v-btn
    >

    <v-dialog v-model="chapterDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="file-chapter"
          @toggle-dialog="chapterDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="file-chapter"
              icon="mdi-book-open-outline"
              required="true"
              check="true"
              @changeData="setChapterText"
              ref="chapterTextInput"
            />
          </v-container>
        </v-card-text>
        <DialogButton buttonText="add" :dialogMethod="makeChapter" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="eBookDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="file-ebook"
          @toggle-dialog="eBookDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="file-title"
              icon="mdi-book-open-outline"
              required="true"
              check="true"
              @changeData="setEbookText"
              ref="ebookTextInput"
            />
            <v-row>
              <v-text-field
                class="my-3"
                :rules="[rules.required]"
                label="`$t('dialoginput.file-path')`"
                v-model="selectedEBookLocation"
                required
                @click="selectPath"
                prepend-icon="mdi-folder-open-outline"
              ></v-text-field>
            </v-row>
            <v-row>
              <v-file-input
                class="my-3"
                v-model="eBookCover"
                accept="image/png, image/jpeg, image/bmp"
                prepend-icon="mdi-image-search-outline"
                label="커버 이미지"
              >
              </v-file-input>
            </v-row>
          </v-container>
        </v-card-text>
        <DialogButton buttonText="create" :dialogMethod="createNewEBook" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="epubDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="file-epub"
          @toggle-dialog="epubDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="file-title"
              icon="mdi-book-open-outline"
              required="true"
              check="true"
              @changeData="setEbookText"
              ref="ebookTextInput"
            />
            <DialogInput
              labelText="file-author"
              icon="mdi-account-outline"
              required="true"
              check="true"
              @changeData="setEbookAuthor"
              ref="ebookAuthorInput"
            />
          </v-container>
        </v-card-text>
        <DialogButton buttonText="export" :dialogMethod="makeEpub" />
      </v-card>
    </v-dialog>
  </v-tabs>
</template>

<script>
import {
  readDirectory,
  tocToList,
  makeEpubFile,
  addContentOpf,
  addTocNcx,
  changeHtag,
  readPath,
  readCustomStyle,
  changeTitleAuthor,
} from "@/functions/file.js";
import { mapState } from "vuex";
import eventBus from "@/eventBus.js";
import DialogButton from "@/components/Dialog/DialogButton";
import DialogInput from "@/components/Dialog/DialogInput";
import DialogTitle from "@/components/Dialog/DialogTitle";

const fs = require("fs");
const path = require("path");
const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const fse = require("fs-extra");

export default {
  name: "FileTab",
  components: {
    DialogButton,
    DialogInput,
    DialogTitle,
  },
  data: function () {
    return {
      // dialog
      tab: null,
      chapterDialog: false,
      epubDialog: false,
      eBookDialog: false,

      // string
      eBookText: "",
      eBookAuthor: "",
      eBookLocation: "",
      selectedEBookLocation: "",

      // boolean
      selectDefaultImg: false,

      // number
      hTags: [1, 2, 3, 4, 5, 6],
      chapterNum: 0,

      // Array
      findIndexArray: [],
      eBookCover: [],

      rules: {
        required: (value) => !!value || "필수 입력 항목입니다.",
        check: (value) => !this.checkExp(value) || "특수문자 사용불가",
      },
    };
  },
  created: function () {
    eventBus.$on("shortcut", (res) => {
      if (res == "save") {
        this.storeInputText();
      }
      else if(res=="preview"){
        this.preview();
      }
    });
  },
  computed: {
    ...mapState([
      "alertDialog",
      "editingText",
      "editingHTMLText",
      "ebookDirectory",
      "editingTextArr",
    ]),
  },
  watch: {
    // selectedEBookLocation: function(){
    //   if(this.selectedEBookLocation==undefined){
    //     document.getElementById("location").style.visibility="visible";
    //   }
    //   else{
    //     document.getElementById("location").style.visibility="hidden";
    //   }
    // }
  },
  methods: {
    checkExp: function (value) {
      var special_pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9 | ' ']/gi;
      if (special_pattern.test(value) == true) {
        return true;
      } else {
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
        if (
          this.eBookText == "" ||
          this.selectedEBookLocation == undefined ||
          this.selectedEBookLocation == ""
        ) {
          this.$store.dispatch(
            "setAlertMessage",
            "error.create-ebook-input"
          );
          return;
        }
        if (this.checkExp(this.eBookText)) return;
        this.eBookLocation = this.eBookLocation + "/" + this.eBookText + "/";
        this.$store.dispatch("setEbookDirectory", this.eBookLocation); // store에 현재 위치 저장, 그럼 스토어에는 저장을 왜하는 것일까?
        fs.mkdir(this.eBookLocation, function (err) {
          if (err) {
            console.log("디렉토리 생성 실패");
          }
        });

        this.eBookDialog = false;
        let eBookSettingDirectory = "src/assets/NewEbook"; //기본 ebook 디렉토리 위치
        fse.copySync(eBookSettingDirectory, this.eBookLocation); //기본 ebook 디렉토리를 새 ebook 디렉토리에 복사
        /*
        새 ebook 만들기 
        - 표지 이미지 파일 EPUB 폴더 내 image 폴더로 파일로 복사
          */
        if (this.eBookCover.length === 0) {
          // 기본 이미지를 선택할 경우
          this.eBookCover.name = "default.jpg";
        } else {
          // 이미지를 선택할 경우
          const coverLocation =
            this.eBookLocation + "/EPUB/images/" + this.eBookCover.name; //이미지 저장할 위치
          fse.copySync(this.eBookCover.path, coverLocation); // 입력받은 이미지를 저장할 위치로 복사
        }
        this.renameImageTag();
        this.readToc();
        // Dialog 초기화
        this.eBookDialog = false;
        this.eBookText = "";
        this.selectedEBookLocation = "";
        this.$store.dispatch("setEditingText", "");
        this.$store.dispatch(
          "setAlertMessage",
          "success.create-ebook"
        );
        this.$refs.ebookTextInput.resetText();
      } catch (err) {
        console.log(err);
        this.eBookDialog = false;
        this.eBookText = "";
        this.selectedEBookLocation = "";
        this.$store.dispatch(
          "setAlertMessage",
          "error.create-ebook"
        );
        this.$refs.ebookTextInput.resetText();
      }
    },

    // 목차 읽어오기
    readToc: function () {
      try {
        const data = readDirectory(this.eBookLocation, [], [], 0);
        this.chapterNum = data["maxV"];

        const folders = []; // 선택한 디렉토리의 폴더들을 리스트에 저장한다.
        for (let i = 0; i < data["arrayOfFiles"].length; i++) {
          folders.push(data["arrayOfFiles"][i].name);
        }

        if (
          folders.includes("EPUB") &&
          folders.includes("META-INF") &&
          folders.includes("mimetype")
        ) {
          // 선택한 디렉토리에 필수 폴더들이 모두 있는 경우에만 디렉토리에 로드한다.
          this.$store.dispatch('setEbookDirectoryTree', data['arrayOfFiles']);
          const fileToText = fs.readFileSync(data['toc'][0]).toString();
          this.$store.dispatch('setTableOfContents', tocToList(fileToText, []));
          return true
        } else {  // 필수 폴더들이 모두 있지 않은 경우 알림창을 띄운다. 
          this.$store.dispatch('setAlertMessage',"error.load-not-ebook")
          return false
        }
      } catch (err) {
        console.log("목차 읽어오기 실패");
        this.$store.dispatch("setAlertMessage", "error.load-toc");
      }
    },

    // 나만의 style 읽어오기
    readCustomStyle: function () {
      this.$store.dispatch(
        "setCustomStyleArray",
        readCustomStyle(this.eBookLocation)
      );
    },

    // 이미지 이름 재설정
    renameImageTag: function () {
      let coverLocation = path.resolve(
        this.eBookLocation + "/EPUB/images/" + this.eBookCover.name
      );
      let newCoverLocation = path.resolve(
        this.eBookLocation + "/EPUB/images/cover.jpg"
      );
      fs.rename(coverLocation, newCoverLocation, function (err) {
        if (err) throw err;
      });
    },

    // 저장하기
    storeInputText: function () {
      try {
        const updatedText =
          this.$store.state.editingHTMLText +
          this.$store.state.editingText +
          "</html>";
        fs.writeFileSync(this.$store.state.selectedFileDirectory, updatedText);
        this.$store.dispatch("setAlertMessage", "success.save-ebook");
      } catch (err) {
        console.log("저장하기 실패");
        if (this.eBookLocation) {
          // 이북을 생성한 상태에서 textarea가 비어있을 경우
          this.$store.dispatch(
            "setAlertMessage",
            "error.save-ebook-file-none"
          );
        } else {
          // 이북을 생성하지 않은 상태에서 저장할 경우
          this.$store.dispatch("setAlertMessage", "error.ebook-none");
        }
      }
    },

    // e-book 불러오기
    loadEbook: function () {
      try {
        this.eBookLocation = readPath();
        if (this.eBookLocation != null) {
          if (this.readToc()) {
            // EPUB 필수 폴더들이 있는 경로를 선택한 경우에만 디렉토리에 로드한다.
            this.$store.dispatch("setEbookDirectory", this.eBookLocation);
            this.readCustomStyle();
            this.$store.dispatch("setEditingText", "");
            this.$store.dispatch(
              "setAlertMessage",
              "success.load-ebook"
            );
            this.$store.dispatch("setDirToggle");
          }
        }
      } catch (err) {
        console.log(err);
        this.$store.dispatch("setAlertMessage", "error.load-ebook");
      }
    },

    // epub 내보내기
    makeEpub: function () {
      try {
        let val = this.eBookText;
        if (
          this.eBookText.trim() == "" ||
          this.eBookAuthor.trim() == "" ||
          this.eBookLocation == undefined ||
          this.eBookLocation == ""
        ) {
          this.$store.dispatch("setAlertMessage", "error.input");
          return;
        }
        changeTitleAuthor(this.eBookLocation, val, this.eBookAuthor);
        this.epubDialog = false;
        if (makeEpubFile(this.eBookLocation, val) == true)
          this.$store.dispatch(
            "setAlertMessage",
            "success.create-epub"
          );
      } catch (err) {
        console.log("epub 내보내기 실패");
        this.$store.dispatch("setAlertMessage", "error.create-epub");
      }
      this.eBookText = "";
      this.eBookAuthor = "";
      this.$refs.ebookTextInput.resetText();
      this.$refs.ebookAuthorInput.resetText();
    },

    // epub 내보내기 조건 추가 (생성한 후에만 내보내기 가능)
    exportFile: function () {
      if (this.$store.state.ebookDirectoryTree.length === 0) {
        this.$store.dispatch("setAlertMessage", "error.create-epub-none");
      } else {
        this.epubDialog = true;
      }
    },

    // e-book 미리보기
    preview: function () {
      try {
        if (this.$store.state.selectedFileDirectory === "") {
          this.$store.dispatch(
            "setAlertMessage",
            "error.preview"
          );
        } else {
          const win = new BrowserWindow({ width: 800, height: 1500 });
          win.loadURL("file://" + this.$store.state.selectedFileDirectory);
        }
      } catch {
        console.log("ebook 미리보기 실패");
      }
    },

    // chapter 추가하기
    makeChapter: function () {
      try {
        this.chapterDialog = false;
        let val = this.chapterText;
        if (val == undefined || val.trim() == "") {
          this.$store.dispatch("setAlertMessage", "error.add-chapter-input");
          return;
        }
        let num = "";
        let path = this.eBookLocation + "/EPUB/text/";
        const temp = fs.readFileSync("src/assets/chapter01.xhtml").toString();
        this.chapterNum++;
        if (this.chapterNum < 10) {
          num = "0" + this.chapterNum;
        } else {
          num = this.chapterNum;
        }
        changeHtag(path, num, temp, val);
        addContentOpf(this.eBookLocation, num);
        addTocNcx(this.eBookLocation, val, num);

        const data = readDirectory(this.eBookLocation, [], [], 0);
        this.$store.dispatch("setAlertMessage", "success.add-chapter");
        this.$store.dispatch("setEbookDirectoryTree", data["arrayOfFiles"]);
        this.$store.dispatch("addTableOfContents", val);
        this.chapterText = "";
        this.$refs.chapterTextInput.resetText();
      } catch (err) {
        console.log("chapter 추가 실패");
        this.$store.dispatch("setAlertMessage", "error.add-chapter");
      }
    },
    addChapter: function () {
      if (this.$store.state.ebookDirectoryTree.length === 0) {
        this.$store.dispatch("setAlertMessage", "error.ebook-none");
      } else {
        this.chapterDialog = true;
      }
    },
    //eBookText 값 받아오기
    setEbookText: function (sendData) {
      this.eBookText = sendData;
    },
    //eBookAuthor 값 받아오기
    setEbookAuthor: function (sendData) {
      this.eBookAuthor = sendData;
    },
    //chapterText 값 받아오기
    setChapterText: function (sendData) {
      this.chapterText = sendData;
    },
  },
};
</script>
