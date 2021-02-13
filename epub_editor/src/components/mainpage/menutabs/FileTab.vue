<template>
  <v-tabs id="fileTab" show-arrows v-model="tab">
    <v-btn v-if="dirToggle" class="align-self-center" @click="changeToggle" text
      >디렉토리 닫기</v-btn
    >
    <v-btn v-else class="align-self-center" @click="changeToggle" text
      >디렉토리 열기</v-btn
    >
    <v-btn class="align-self-center" @click.stop="eBookDialog = true" text
      >이북 생성하기</v-btn
    >
    <v-btn class="align-self-center" @click="loadEbook" text
      >이북 불러오기</v-btn
    >
    <v-btn class="align-self-center" @click="storeInputText" text
      >저장하기</v-btn
    >
    <v-btn class="align-self-center" @click="preview" text>이북 미리보기</v-btn>
    <v-btn class="align-self-center" @click="exportFile" text
      >ePUB으로 내보내기</v-btn
    >
    <v-btn class="align-self-center" @click="addChapter" text
      >목차 추가하기</v-btn
    >
    <v-btn class="align-self-center" @click="getEbookList" text
      >서버에서 불러오기</v-btn
    >
    <v-dialog v-model="chapterDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="목차 추가하기"
          @toggle-dialog="chapterDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="목차 이름"
              icon="mdi-book-open-outline"
              required="true"
              check="true"
              @changeData="setChapterText"
              ref="chapterTextInput"
            />
          </v-container>
        </v-card-text>
        <DialogButton buttonText="추가하기" :dialogMethod="makeChapter" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="eBookDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="이북 생성하기"
          @toggle-dialog="eBookDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="이북 이름"
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
                label="저장 위치"
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
        <DialogButton buttonText="생성하기" :dialogMethod="createNewEBook" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="epubDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="ePUB으로 내보내기"
          @toggle-dialog="epubDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="이북 이름"
              icon="mdi-book-open-outline"
              required="true"
              check="true"
              @changeData="setEbookText"
              ref="ebookTextInput"
            />
            <DialogInput
              labelText="작가"
              icon="mdi-account-outline"
              required="true"
              check="true"
              @changeData="setEbookAuthor"
              ref="ebookAuthorInput"
            />
          </v-container>
        </v-card-text>
        <DialogButton buttonText="내보내기" :dialogMethod="makeEpub" />
      </v-card>
    </v-dialog>
    
    <v-dialog v-model="eBookListDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="서버에서 불러오기"
          @toggle-dialog="eBookListDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <v-item-group
              v-model="eBookSelected"
            >
              <v-row>
                <v-col
                  v-for="(eBook, i) in eBookList"
                  :key="i"
                >
                  <v-item v-slot="{ active, toggle }">
                    <div @click="toggle">
                      <p>{{ eBook.epubName }}</p>
                      <v-btn
                        icon                        
                      >
                        <v-icon>{{ active ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
                      </v-btn>
                    </div>
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-container>
        </v-card-text>
        <DialogButton buttonText="불러오기" :dialogMethod="loadFromServer" />
      </v-card>
    </v-dialog>
  </v-tabs>
</template>

<script>
import * as file from "@/functions/file.js";
import { mapState } from "vuex";
import eventBus from "@/eventBus.js";
import DialogButton from "@/components/Dialog/DialogButton";
import DialogInput from "@/components/Dialog/DialogInput";
import DialogTitle from "@/components/Dialog/DialogTitle";
import axios from 'axios';

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
      eBookListDialog: false,

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
      eBookList: [],
      eBookSelected: [],

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
      "dirToggle",
    ]),
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
      this.eBookLocation = file.readPath();
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
            "이북 이름과 저장 위치를 입력해주세요."
          );
          return;
        }
        if (this.checkExp(this.eBookText)) return;
        this.eBookLocation = this.eBookLocation + "/" + this.eBookText + "/";
        this.$store.dispatch("setEbookDirectory", this.eBookLocation); // store에 현재 위치 저장
        axios.get("https://contact.dabook.site/api/user/epub", { params: { email: localStorage.getItem('email'), epubName: this.eBookText }})
          .then(res => {
            if (res.data === true) {
              const data = { email: localStorage.getItem('email'), epubName: this.eBookText }
              axios.post("https://contact.dabook.site/api/user/epub", data)
                .then(res => {
                  if (res.data === true) {
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
                    file.uploadDirectory(this.$store.state.ebookDirectoryTree, this.eBookText, localStorage.getItem('email'))
                    // Dialog 초기화
                    this.eBookDialog = false;
                    this.eBookText = "";
                    this.selectedEBookLocation = "";
                    this.$store.dispatch("setEditingText", "");
                    this.$store.dispatch(
                      "setAlertMessage",
                      "새로운 이북 생성에 성공했습니다"
                    );
                    this.$refs.ebookTextInput.resetText();
                  } else {
                    throw new Error('전자책 생성 실패')
                  }
                })
                .catch(err => {
                  console.log('여기니?')
                  console.log(err)
                })
            } else {
              // alert 메시지로 동일한 이름의 책을 만들었다고 알려주기
              console.log(res)
              this.$store.dispatch('setAlertMessage', '동일한 이름의 이북이 이미 있습니다.')
            }
          })
          .catch(err => console.log(err))
      } catch (err) {
        console.log(err);
        this.eBookDialog = false;
        this.eBookText = "";
        this.selectedEBookLocation = "";
        this.$store.dispatch(
          "setAlertMessage",
          "새로운 이북 생성에 실패했습니다"
        );
        this.$refs.ebookTextInput.resetText();
      }
    },

    // 목차 읽어오기
    readToc: function () {
      try {
        const data = file.readDirectory(this.eBookLocation, [], [], 0);
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
          this.$store.dispatch('setTableOfContents', file.tocToList(fileToText, []));
          return true
        } else {  // 필수 폴더들이 모두 있지 않은 경우 알림창을 띄운다. 
          this.$store.dispatch('setAlertMessage',"EPUB 폴더가 아닙니다.")
          return false
        }
      } catch (err) {
        console.log("목차 읽어오기 실패");
        this.$store.dispatch("setAlertMessage", "목차 읽어오기에 실패했습니다");
      }
    },

    // 나만의 style 읽어오기
    readCustomStyle: function () {
      // let data = readCustomStyle(this.eBookLocation);
      // console.log(data);
      this.$store.dispatch(
        "setCustomStyleArray",
        file.readCustomStyle(this.eBookLocation)
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
        // console.log('File Renamed!');
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
        this.$store.dispatch("setAlertMessage", "저장되었습니다");

        // 서버 업로드
        let email = localStorage.getItem('email');
        let filePath = this.$store.state.selectedFileDirectory
        let bookName = this.$store.state.ebookTitle
        let serverPath = "/EPUB/text"
        file.uploadFile(filePath, serverPath, bookName, email);

      } catch (err) {
        console.log("저장하기 실패");
        if (this.eBookLocation) {
          // 이북을 생성한 상태에서 textarea가 비어있을 경우
          this.$store.dispatch(
            "setAlertMessage",
            "저장할 xhtml 파일을 선택해주세요"
          );
        } else {
          // 이북을 생성하지 않은 상태에서 저장할 경우
          this.$store.dispatch("setAlertMessage", "이북을 생성해주세요");
        }
      }
    },

    // e-book 불러오기
    loadEbook: function () {
      try {  // 시도한다.
        this.eBookLocation = file.readPath();
        if (this.eBookLocation) {
          if (this.readToc()) {
            // EPUB 필수 폴더들이 있는 경로를 선택한 경우에만 디렉토리에 로드한다.
            this.$store.dispatch("setEbookDirectory", this.eBookLocation);
            this.readCustomStyle();
            this.$store.dispatch("setEditingText", "");
            this.$store.dispatch(
              "setAlertMessage",
              "이북 불러오기에 성공했습니다"
            );
          }
        } else {
          this.$store.dispatch(
            "setAlertMessage",
            "ebook 불러오기에 실패했습니다"
          );
        }
      } catch (err) {
        console.log(err);
        this.$store.dispatch("setAlertMessage", "이북 불러오기에 실패했습니다");
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
          this.$store.dispatch("setAlertMessage", "모든 입력값을 넣어주세요.");
          return;
        }
        file.changeTitleAuthor(this.eBookLocation, val, this.eBookAuthor);
        this.epubDialog = false;
        if (file.makeEpubFile(this.eBookLocation, val) == true)
          this.$store.dispatch(
            "setAlertMessage",
            "ePUB 내보내기에 성공했습니다"
          );
      } catch (err) {
        console.log("epub 내보내기 실패");
        this.$store.dispatch("setAlertMessage", "ePUB 내보내기에 실패했습니다");
      }
      this.eBookText = "";
      this.eBookAuthor = "";
      this.$refs.ebookTextInput.resetText();
      this.$refs.ebookAuthorInput.resetText();
    },

    // epub 내보내기 조건 추가 (생성한 후에만 내보내기 가능)
    exportFile: function () {
      if (this.$store.state.ebookDirectoryTree.length === 0) {
        this.$store.dispatch("setAlertMessage", "내보내기할 이북이 없습니다.");
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
            "미리보기할 이북이 없습니다."
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
        let num = "";
        let path = this.eBookLocation + "/EPUB/text/";
        if (val == undefined || val.trim() == "") {
          this.$store.dispatch("setAlertMessage", "목차를 입력하세요.");
          return;
        }
        const temp = fs.readFileSync("src/assets/chapter01.xhtml").toString();
        this.chapterNum++;
        if (this.chapterNum < 10) {
          num = "0" + this.chapterNum;
        } else {
          num = this.chapterNum;
        }
        file.changeHtag(path, num, temp, val);
        file.addContentOpf(this.eBookLocation, num);
        file.addTocNcx(this.eBookLocation, val, num);

        const data = file.readDirectory(this.eBookLocation, [], [], 0);
        //alert('새 chapter가 추가되었습니다!');
        this.$store.dispatch("setAlertMessage", "목차 추가에 성공했습니다");
        this.$store.dispatch("setEbookDirectoryTree", data["arrayOfFiles"]);
        this.$store.dispatch("addTableOfContents", val);
        this.chapterText = "";

        // 서버 업로드
        let email = localStorage.getItem('email');
        let fileName = 'chapter' + num + '.xhtml'
        let bookName = this.$store.state.ebookTitle
        file.uploadFile(path + fileName, '/EPUB/text', bookName, email)
        file.uploadFile(this.eBookLocation + '/EPUB/content.opf', '/EPUB', bookName, email);
        file.uploadFile(this.eBookLocation + '/EPUB/toc.ncx', '/EPUB', bookName, email);
      } catch (err) {
        console.log("chapter 추가 실패");
        this.$store.dispatch("setAlertMessage", "목차 추가에 실패했습니다");
      }
    },
    addChapter: function () {
      if (this.$store.state.ebookDirectoryTree.length === 0) {
        this.$store.dispatch("setAlertMessage", "이북을 먼저 생성해주세요!");
      } else {
        this.chapterDialog = true;
      }
    },
    changeToggle: function () {
      this.$store.dispatch("setDirToggle");
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
    //ebook list 받아오기
    getEbookList: function () {
      this.eBookListDialog = true;
      axios.get("https://contact.dabook.site/api/user/epub/list", { params: { email: localStorage.getItem('email') }})
        .then((res) => {
          this.eBookList = res.data
        })
        .catch(err => console.log(err))
    },
    loadFromServer: function () {
      const eBookId = this.eBookList[this.eBookSelected]['_id']
      const eBookName = this.eBookList[this.eBookSelected]['epubName']
      axios.get("https://contact.dabook.site/api/epub/file/list", { params: { id: eBookId }})
        .then((res) => {
          console.log(res.data)
          const fileList = res.data
          for (let file of fileList) {
            console.log(file)
            axios.get("https://contact.dabook.site/api/download", { headers: { accept: '*/*' }, responseType: 'blob', params: { email: localStorage.getItem('email'), epubName: eBookName, fileName: file.fileName, path: file.path }})
              .then(res => {
                console.log(res)
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                const contentDisposition = res.headers['content-disposition']; // 파일 이름
                let fileName = 'unknown';
                if (contentDisposition) {
                  const [ fileNameMatch ] = contentDisposition.split(';').filter(str => str.includes('filename'));
                  if (fileNameMatch)
                    [ , fileName ] = fileNameMatch.split('=');
                }
                link.href = url;
                link.setAttribute('download', `${fileName}`);
                link.style.cssText = 'display:none';
                document.body.appendChild(link);
                link.click();
                link.remove();
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    },
  },
};
</script>
