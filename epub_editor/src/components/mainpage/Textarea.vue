<template>
  <v-col cols="9" style="height:35em;">
    <v-textarea
      solo
      id="area"
      hide-details
      style="width: auto;"
      ma-auto
      height="100%"
      label="textarea 입니다"
      placeholder="책을 작성해볼까요?"
      v-model="inputText"
      @keyup.enter="attachPTag()"
    ></v-textarea>
    <v-dialog v-model="linkDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> 링크를 입력해주세요. </v-card-title>
        <v-card-text>
          <v-text-field label="Link" v-model="linkText" required></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="linkDialog = false">
            취소
          </v-btn>

          <v-btn color="green darken-1" text @click="attachLinkTag()">
            링크 추가
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="tableDialog" max-width="290">
      <v-card>
        <v-card-title class="headline"> 생성할 표의 행과 열을 입력하세요. </v-card-title>
        <v-row>
          <v-col>
            <v-text-field label="행" v-model="tableRow">
              <v-icon slot="append" color="red" @click="plusRow()"> mdi-plus </v-icon>
              <v-icon slot="prepend" color="green" @click="minusRow()"> mdi-minus </v-icon>
            </v-text-field>
          </v-col>
          <v-col>
            <v-text-field label="열" v-model="tableCol">
              <v-icon slot="append" color="red" @click="plusCol()"> mdi-plus </v-icon>
              <v-icon slot="prepend" color="green" @click="minusCol()"> mdi-minus </v-icon>
            </v-text-field>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="tableDialog = false">
            취소
          </v-btn>

          <v-btn color="green darken-1" text @click="attachTableTag()">
            표 생성
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-col>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import eventBus from "@/eventBus.js";
import { findText, replaceText } from "@/functions/edit.js";
import * as textStyle from "@/functions/text-style.js";
import * as edit from "@/functions/edit.js";

export default {
  name: 'Textarea',
  created: function () {
    eventBus.$on('edit',(res)=>{
      this.edit(res);
    });
    
    eventBus.$on("findText", (res) => {
      this.findText = res;
      this.findIndexArray = findText(this.inputText, res);
      console.log(this.findIndexArray);
    });
    eventBus.$on("replaceText", (res) => {
      this.inputText = replaceText(this.inputText, res[0], this.findText, this.findIndexArray, res[1], res[2]);
    });
    eventBus.$on("loadData", (res) => {
      console.log(res);
      this.inputText = res.slice(res.indexOf("<body"), res.indexOf("</body>") + 7);
      this.defaultHTMLText = res.slice(res.indexOf("<?xml"), res.indexOf("<body"));
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
        this.inputText = textStyle.imageTag();
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
    });
  },
  watch: {
    inputText: function () {
      this.SET_EDITINGTEXT(this.inputText);
      this.SET_EDITINGHTML(this.defaultHTMLText);
      this.set();
    },
  },
  data: function () {
    return {
      inputText: "",
      defaultHTMLText: "",
      linkText: "",
      tableData: {
        col: [], 
        row: []
      },
      hTags: [1, 2, 3, 4, 5, 6],
      linkDialog: false,
      tableDialog: false,
      tableRow: 0,
      tableCol: 0,
      findText: '',
      findIndexArray: [],      
    };
  },
  computed: {
    ...mapState(['editingText','editingTextArrPoint','arrSize','editingTextArr']),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT", "SET_EDITINGHTML",'PUSH_EDITINGTEXTARR','SHIFT_EDITINGTEXTARR','DOWN_EDITINGTEXTARRPOINT','UP_EDITINGTEXTARRPOINT']),
    edit:function(res){
      switch (res){
        case 'cut': 
          edit.cut();
          break;
        case 'copy':
          edit.copy();
          break;
        case 'paste':
          edit.paste();
          break;
        case 'undo':
          this.inputText=edit.undo();
          break;
        case 'redo':
          this.inputText=edit.redo();
          break;
      }
    },
    set:function(){
      edit.set(this.inputText);
    },
    plusRow: function () {
      this.tableRow++;
    },
    minusRow: function () {
      this.tableRow--;
    },
    plusCol: function () {
      this.tableCol++;
    },
    minusCol: function () {
      this.tableCol--;
    },
    attachPTag: function () {
      this.inputText = textStyle.pTag();
    },
    attachLinkTag: function () {
      this.linkDialog = false;
      this.inputText = textStyle.linkTag(this.linkText);
      this.linkText = "";
    },
    attachTableTag: function () {
      this.tableDialog = false;
      this.inputText = textStyle.tableTag(this.tableRow, this.tableCol);
      this.tableRow = 0;
      this.tableCol = 0;
    },
  },
};
</script>