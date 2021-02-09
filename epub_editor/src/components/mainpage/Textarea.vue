<template>
  <div id="textarea">
    <v-textarea
      id="area"
      solo
      hide-details
      spellcheck="false"
      style="width: auto; border-radius: 0%;"
      ma-auto
      height="100%"
      label="textarea 입니다"
      no-resize
      placeholder="책을 작성해볼까요?"
      v-model="inputText"
      @keydown="isSave"
      @mousedown.left="closeMenu"
      @mousedown.right.stop.prevent="openMenu"
    ></v-textarea>
    
    <v-dialog v-model="linkDialog" max-width="500">
      <v-card>
        <v-container>
          <v-row class="header-color">
            <v-card-title> 링크를 입력해주세요. </v-card-title>
          </v-row>
          <v-row class="mt-7">
            <v-icon class="ml-4" style="color: #423F8C;">mdi-link-variant</v-icon>
            <v-text-field class="mx-4" label="Link" v-model="linkText" required></v-text-field>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="linkDialog = false"
            >취소</v-btn
          >
          <v-btn style="color: #423F8C;" text @click="attachLinkTag()"
            >생성</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="tableDialog" max-width="250">
      <v-card>
        <v-card-title class="header-color">표 생성</v-card-title>
        <v-space></v-space>
        <v-card-text >
            <v-text-field label="행" v-model="tableRow" style="left:70%; margin-top:15%;">
              <v-icon slot="append" color="red" @click="plusRow()"
                >mdi-plus</v-icon
              >
              <v-icon slot="prepend" color="green" @click="minusRow()"
                >mdi-minus</v-icon
              >
            </v-text-field>
        </v-card-text>

        <v-card-text width="auto">
            <v-text-field label="열" v-model="tableCol" style="left:70%;">
              <v-icon slot="append" color="red" @click="plusCol()"
                >mdi-plus</v-icon
              >
              <v-icon slot="prepend" color="green" @click="minusCol()"
                >mdi-minus</v-icon
              >
            </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="tableDialog = false"
            >취소</v-btn
          >
          <v-btn style="color: #423F8C;" text @click="attachTableTag()"
            >생성</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div class="contextmenu" id="menu" @click="closeMenu">
      <span>오려두기</span>
      <span>복사하기</span>
      <span>붙여넣기</span>
      <v-divider class="divider-margin"></v-divider>

      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachBoldTag()">mdi-format-bold</v-icon></v-btn
      >
      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachItalicTag()"
          >mdi-format-italic</v-icon
        ></v-btn
      >
      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachUnderlineTag()"
          >mdi-format-underline</v-icon
        ></v-btn
      >

      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachMediumlineTag()"
          >mdi-format-strikethrough</v-icon
        ></v-btn
      >
      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachUnorderdListTag()"
          >mdi-format-list-bulleted</v-icon
        ></v-btn
      >
      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachOrderedListTag()"
          >mdi-format-list-numbered</v-icon
        ></v-btn
      >

      <v-btn x-small class="mx-1"
        ><v-icon medium @click="attachImageTag()"
          >mdi-image-search-outline</v-icon
        ></v-btn
      >
      <v-btn x-small class="mx-1"
        ><v-icon medium @click="linkDialog = true"
          >mdi-link-box-variant-outline</v-icon
        ></v-btn
      >
      <v-btn x-small class="mx-1"
        ><v-icon medium @click="tableDialog = true"
          >mdi-table-large-plus</v-icon
        ></v-btn
      >

      <v-divider class="divider-margin"></v-divider>

      <span @mouseover="openHeaders">제목▸</span>
    </div>

    <div id="headers" class="contextmenu" @click="closeMenu">
      <span v-for="hTag in hTags" :key="hTag" @click="attachHTag(hTag)">{{
        "제목" + hTag
      }}</span>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
import { readDirectory, tocToList } from "@/functions/file.js";
import { findText, replaceText } from "@/functions/edit.js";
import * as textStyle from "@/functions/text-style.js";
import * as edit from "@/functions/edit.js";

const fs = require("fs");

export default {
  name: "Textarea",
  created: function() {
    window.onkeypress = (e) => {
      if (e.keyCode === 83 && e.ctrlKey === true) {
        eventBus.$emit("shortcut", "save");
      } else if (e.keyCode === 5 && e.ctrlKey === true) {
        edit.copy();
      } else if (e.keyCode === 23 && e.ctrlKey === true) {
        edit.cut();
      } else if (e.keyCode === 4 && e.ctrlKey === true) {
        edit.paste();
      } else if (e.keyCode === 17 && e.ctrlKey === true) {
        this.inputText = edit.undo();
      } else if (e.keyCode === 6 && e.ctrlKey === true) {
        this.inputText = edit.redo();
      } else if (e.keyCode === 13) {
        e.preventDefault();
        this.attachPTag();
      }
    };
    eventBus.$on("edit", (res) => {
      this.edit(res);
    });
    eventBus.$on("findText", (res) => {
      this.findText = res;
      this.findIndexArray = findText(this.inputText, res);
      this.$store.dispatch("setFindTextArray", this.findIndexArray);
    });
    eventBus.$on("setCursor", (res, length) => {
      this.setCursor(res, length);
    });
    eventBus.$on("replaceText", (res) => {
      this.inputText = replaceText(
        this.inputText,
        res[0],
        this.findText,
        this.findIndexArray,
        res[1],
        res[2]
      );
    });
    eventBus.$on("loadData", (res) => {
      this.inputText = res.slice(
        res.indexOf("<body"),
        res.indexOf("</body>") + 7
      );
      this.defaultHTMLText = res.slice(
        res.indexOf("<?xml"),
        res.indexOf("<body")
      );
      edit.set(this.inputText);
    });
    eventBus.$on("pushIndexData", (res) => {
      if (res === "Italic") {
        this.inputText = textStyle.italicTag();
      } else if (res === "LineTag") {
        this.inputText = textStyle.lineTag();
      } else if (res === "Enter") {
        this.inputText = textStyle.enterTag();
      } else if (res === "BlockquoteTag") {
        this.inputText = textStyle.blockquoteTag();
      } else if (res === "CiteTag") {
        this.inputText = textStyle.citeTag();
      } else if (res === "BoldTag") {
        this.inputText = textStyle.boldTag();
      } else if (res === "UnderlineTag") {
        this.inputText = textStyle.underlineTag();
      } else if (res === "MediumlineTag") {
        this.inputText = textStyle.mediumlineTag();
      } else if (res === "SubscriptTag") {
        this.inputText = textStyle.subscriptTag();
      } else if (res === "SuperscriptTag") {
        this.inputText = textStyle.superscriptTag();
      } else if (res === "ImageTag") {
        this.inputText = textStyle.imageTag(this.$store.state.ebookDirectory);
        const data = readDirectory(this.$store.state.ebookDirectory, [], [], 0);
        this.chapterNum = data["maxV"];
        this.$store.dispatch("setEbookDirectoryTree", data["arrayOfFiles"]);
        const fileToText = fs.readFileSync(data["toc"][0]).toString();
        this.$store.dispatch("setTableOfContents", tocToList(fileToText, []));
      } else if (res === "UnorderedListTag") {
        this.inputText = textStyle.unorderedListTag();
      } else if (res === "OrderedListTag") {
        this.inputText = textStyle.orderedListTag();
      } else if (res === "Link") {
        this.linkDialog = true;
      } else if (res === "Table") {
        this.tableDialog = true;
      } else {
        this.inputText = textStyle.hTag(res);
      }
      edit.set("");
    });
  },
  watch: {
    inputText: function() {
      this.$store.dispatch("setEditingText", this.inputText);
      this.$store.dispatch("setHTMLText", this.defaultHTMLText);
    },
    getEditingText: function() {
      this.inputText = this.getEditingText;
    },
  },
  data: function() {
    return {
      test: "",
      inputText: "",
      defaultHTMLText: "",
      linkText: "",
      tableData: {
        col: [],
        row: [],
      },
      hTags: [1, 2, 3, 4, 5, 6],
      linkDialog: false,
      tableDialog: false,
      tableRow: 0,
      tableCol: 0,
      findText: "",
      findIndexArray: [],
      cursorPosition: { posX: 0, posY: 0 },
    };
  },
  computed: {
    getEditingText: function() {
      return this.$store.state.editingText;
    },
  },
  methods: {
    edit: function(res) {
      switch (res) {
        case "cut":
          edit.cut();
          break;
        case "copy":
          edit.copy();
          break;
        case "paste":
          edit.paste();
          break;
        case "undo":
          this.inputText = edit.undo();
          break;
        case "redo":
          this.inputText = edit.redo();
          break;
      }
    },
    isSave: function(event) {
      edit.Save(event.keyCode);
    },
    plusRow: function() {
      this.tableRow++;
    },
    minusRow: function() {
      this.tableRow--;
    },
    plusCol: function() {
      this.tableCol++;
    },
    minusCol: function() {
      this.tableCol--;
    },
    attachPTag: function() {
      this.inputText = textStyle.pTag();
    },
    attachEnterTag: function() {
      this.inputText = textStyle.enterTag();
    },
    attachLineTag: function() {
      this.inputText = textStyle.lineTag();
    },
    attachHTag: function(index) {
      this.inputText = textStyle.hTag(index);
    },
    attachItalicTag: function() {
      this.inputText = textStyle.italicTag();
    },
    attachBlockquoteTag: function() {
      this.inputText = textStyle.blockquoteTag();
    },
    attachCiteTag: function() {
      this.inputText = textStyle.citeTag();
    },
    attachBoldTag: function() {
      this.inputText = textStyle.boldTag();
    },
    attachUnderlineTag: function() {
      this.inputText = textStyle.underlineTag();
    },
    attachMediumlineTag: function() {
      this.inputText = textStyle.mediumlineTag();
    },
    attachSubscriptTag: function() {
      this.inputText = textStyle.subscriptTag();
    },
    attachSuperscriptTag: function() {
      this.inputText = textStyle.superscriptTag();
    },
    attachImageTag: function() {
      this.inputText = textStyle.imageTag();
    },
    attachLinkTag: function() {
      this.linkDialog = false;
      this.inputText = textStyle.linkTag(this.linkText);
      this.linkText = "";
    },
    attachTableTag: function() {
      this.tableDialog = false;
      this.inputText = textStyle.tableTag(this.tableRow, this.tableCol);
      this.tableRow = 0;
      this.tableCol = 0;
    },
    attachUnorderedListTag: function() {
      this.inputText = textStyle.unorderedListTag();
    },
    attachOrderedListTag: function() {
      this.inputText = textStyle.orderedListTag();
    },
    closeMenu: function() {
      let menu = document.getElementById("menu");
      menu.style.display = "none";
      this.cursorPosition.posX = 0;
      this.cursorPosition.posY = 0;
      this.closeHeaders();
    },
    openMenu: function(event) {
      let menu = document.getElementById("menu");
      menu.style.left = event.pageX + "px";
      menu.style.top = event.pageY + "px";
      menu.style.display = "block";
      this.cursorPosition.posX = event.pageX;
      this.cursorPosition.posY = event.pageY;
    },
    openHeaders: function() {
      let menu = document.getElementById("headers");
      menu.style.left = this.cursorPosition.posX + 180 + "px";
      menu.style.top = this.cursorPosition.posY + 190 + "px";
      menu.style.height = "auto";
      menu.style.display = "block";
    },
    closeHeaders: function() {
      let menu = document.getElementById("headers");
      menu.style.display = "none";
    },
    setCursor: function(index, length) {
      edit.setCursor(index, length);
    },
  },
};
</script>
