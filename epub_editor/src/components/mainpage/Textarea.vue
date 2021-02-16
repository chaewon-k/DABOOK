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
      no-resize
      :placeholder="getPlaceholder"
      v-model="inputText"
      @keydown="isSave"
      @mousedown.left="closeMenu"
      @mousedown.right.stop.prevent="openMenu"
    ></v-textarea>

    <v-dialog v-model="linkDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="tool-link"
          @toggle-dialog="linkDialog = false"
        /> 
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="tool-link"
              icon="mdi-link-variant"
              required="true"
              check="true"
              @changeData="setLinkText"
              ref="linkTextInput"
            />
          </v-container>
        </v-card-text>
        <DialogButton buttonText="add" :dialogMethod="attachLinkTag" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="tableDialog" max-width="300">
      <v-card>
        <DialogTitle title="tool-table" @toggle-dialog="tableDialog = false" />
        <v-card-text style="padding: 10% 6% 3% 6%">
          <v-row>
            <v-text-field
            class="my-3"
              :label="getLabelRow"
              v-model="tableRow"
            >
              <v-icon slot="append" color="red" @click="plusRow()"
                >mdi-plus</v-icon
              >
              <v-icon slot="prepend" color="green" @click="minusRow()"
                >mdi-minus</v-icon
              >
            </v-text-field>
          </v-row>
          <v-row>
            <v-text-field
            class="my-3"
              :label="getLabelCol"
              v-model="tableCol"
            >
              <v-icon slot="append" color="red" @click="plusCol()"
                >mdi-plus</v-icon
              >
              <v-icon slot="prepend" color="green" @click="minusCol()"
                >mdi-minus</v-icon
              >
            </v-text-field>
          </v-row>
        </v-card-text>
        <DialogButton buttonText="add" :dialogMethod="attachTableTag" />
      </v-card>
    </v-dialog>

    <div class="contextmenu" id="menu" @click="closeMenu">
      <span @click="edits('cut')">{{ $t('edittab.cut') }}</span>
      <span @click="edits('copy')">{{ $t('edittab.copy') }}</span>
      <span @click="edits('paste')">{{ $t('edittab.paste') }}</span>
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

      <span @mouseover="openHeaders">{{$t('title')}}  ▸</span>
    </div>

    <div id="headers" class="contextmenu" @click="closeMenu">
      <span v-for="hTag in hTags" :key="hTag" @click="attachHTag(hTag)">{{$t('title') + hTag}} </span>
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
import { readDirectory, tocToList } from "@/functions/file.js";
import { findText, replaceText } from "@/functions/edit.js";
import * as textStyle from "@/functions/text-style.js";
import * as edit from "@/functions/edit.js";
import DialogButton from "@/components/Dialog/DialogButton";
import DialogInput from "@/components/Dialog/DialogInput";
import DialogTitle from "@/components/Dialog/DialogTitle";

const fs = require("fs");


export default {
  name: "Textarea",
  components: {
    DialogButton,
    DialogInput,
    DialogTitle,
  },
  mounted: function () {
    window.onmousewheel=(e)=>{
      if(e.ctrlKey==false)
        return;
      if (e.wheelDelta > 0 ) {
        this.fontSize+=1;
        document.getElementById("area").style.fontSize=this.fontSize+"px";
        console.log(this.fontSize);
      }
      else {
        this.fontSize-=1;
        document.getElementById("area").style.fontSize=this.fontSize+"px";
        console.log(this.fontSize);
      }
    };
    window.onkeypress = (e) => {
      if(e.keyCode==1&&e.ctrlKey==true&&e.shiftKey==true){
        eventBus.$emit("shortcut","preview");
      }
      else if (e.keyCode === 19 && e.ctrlKey === true) {
        eventBus.$emit("shortcut", "save");
      } else if (e.keyCode === 5 && e.ctrlKey === true) {
        edit.copy();
      } else if (e.keyCode === 23 && e.ctrlKey === true) {
        console.log("shortcut cut");
        this.inputText=edit.cut();
      } else if (e.keyCode === 4 && e.ctrlKey === true) {
        this.inputText=edit.paste();
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
      this.edits(res);
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
    inputText: function () {
      let area =document.getElementById("area");
      area.scrollTop=area.scrollHeight;
      this.$store.dispatch("setEditingText", this.inputText);
      this.$store.dispatch("setHTMLText", this.defaultHTMLText);
    },
    getEditingText: function () {
      this.inputText = this.getEditingText;
    },
  },
  data: function () {
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
      tableRow: 1,
      tableCol: 1,
      findText: "",
      findIndexArray: [],
      cursorPosition: { posX: 0, posY: 0 },

      fontSize:15,
    };
  },
  computed: {
    getEditingText: function () {
      return this.$store.state.editingText;
    },
    getPlaceholder: function () {
      return this.$t('textarea-placeholder');
    },
    getLabelLink: function () {
      return this.$t('dialoginput.tool-link');
    },
    getLabelCol: function () {
      return this.$t('dialoginput.tool-table-col');
    },
    getLabelRow: function () {
      return this.$t('dialoginput.tool-table-row');
    },
  },
  methods: {
    edits: function (res) {
      console.log("edits");
      switch (res) {
        case "cut":
          this.inputText=edit.cut();
          break;
        case "copy":
          edit.copy();
          break;
        case "paste":
          this.inputText=edit.paste();
          break;
        case "undo":
          this.inputText = edit.undo();
          break;
        case "redo":
          this.inputText = edit.redo();
          break;
      }
    },
    isSave: function (event) {
      edit.Save(event.keyCode);
    },
    plusRow: function () {
      this.tableRow++;
    },
    minusRow: function () {
      if (this.tableRow == 1) return;
      this.tableRow--;
    },
    plusCol: function () {
      this.tableCol++;
    },
    minusCol: function () {
      if (this.tableCol == 1) return;
      this.tableCol--;
    },
    attachPTag: function () {
      this.inputText = textStyle.pTag();
    },
    attachEnterTag: function () {
      this.inputText = textStyle.enterTag();
    },
    attachLineTag: function () {
      this.inputText = textStyle.lineTag();
    },
    attachHTag: function (index) {
      this.inputText = textStyle.hTag(index);
    },
    attachItalicTag: function () {
      this.inputText = textStyle.italicTag();
    },
    attachBlockquoteTag: function () {
      this.inputText = textStyle.blockquoteTag();
    },
    attachCiteTag: function () {
      this.inputText = textStyle.citeTag();
    },
    attachBoldTag: function () {
      this.inputText = textStyle.boldTag();
    },
    attachUnderlineTag: function () {
      this.inputText = textStyle.underlineTag();
    },
    attachMediumlineTag: function () {
      this.inputText = textStyle.mediumlineTag();
    },
    attachSubscriptTag: function () {
      this.inputText = textStyle.subscriptTag();
    },
    attachSuperscriptTag: function () {
      this.inputText = textStyle.superscriptTag();
    },
    attachImageTag: function () {
      this.inputText = textStyle.imageTag(this.$store.state.ebookDirectory);
    },
    attachLinkTag: function () {
      this.linkDialog = false;
      this.inputText = textStyle.linkTag(this.linkText);
      this.linkText = "";
      this.$refs.linkTextInput.resetText();
    },
    attachTableTag: function () {
      this.tableDialog = false;
      this.inputText = textStyle.tableTag(this.tableRow, this.tableCol);
      this.tableRow = 1;
      this.tableCol = 1;
    },
    attachUnorderedListTag: function () {
      this.inputText = textStyle.unorderedListTag();
    },
    attachOrderedListTag: function () {
      this.inputText = textStyle.orderedListTag();
    },
    closeMenu: function () {
      let menu = document.getElementById("menu");
      menu.style.display = "none";
      this.cursorPosition.posX = 0;
      this.cursorPosition.posY = 0;
      this.closeHeaders();
    },
    openMenu: function (event) {
      this.closeHeaders();
      let menu = document.getElementById("menu");
      menu.style.left = event.offsetX+20+ "px";
      menu.style.top = event.offsetY+20+ "px";
      menu.style.display = "block";
      this.cursorPosition.posX = event.offsetX;
      this.cursorPosition.posY = event.offsetY;
    },
    openHeaders: function () {
      let menu = document.getElementById("headers");
      menu.style.left = this.cursorPosition.posX +20 +180 + "px";
      menu.style.top = this.cursorPosition.posY +20+ 190 + "px";
      menu.style.height = "auto";
      menu.style.display = "block";
    },
    closeHeaders: function () {
      let menu = document.getElementById("headers");
      menu.style.display = "none";
    },
    setCursor: function (index, length) {
      edit.setCursor(index, length);
    },
    setLinkText: function (sendData) {
      this.linkText = sendData;
    },
  },
};
</script>
