<template>
  <v-col cols="9" style="height:35em;">
    <v-textarea
      id="area"
      solo
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
import {
  pTag,
  enterTag,
  lineTag,
  hTag,
  italicTag,
  blockquoteTag,
  citeTag,
  boldTag,
  underlineTag,
  mediumlineTag,
  subscriptTag,
  superscriptTag,
  imageTag,
  linkTag,
  tableTag,
  unorderedListTag,
  orderedListTag
} from "@/functions/text-style.js";

export default {
  data() {
    return {
      inputText: "",
      defaultHTMLText: "",
      linkText: "",
      tableData: { col: [], row: [] },
      hTags: [1, 2, 3, 4, 5, 6],
      linkDialog: false,
      tableDialog: false,
      tableRow: 0,
      tableCol: 0,
      findText: '',
      findIndexArray: [],

      
    };
  },
  created() {
    eventBus.$on('set',()=>{
      this.inputText=this.editingText;
    });
    eventBus.$on("findText", (res) => {
      this.findText = res
      this.findIndexArray = findText(this.inputText, res)
      console.log(this.findIndexArray)
    });
    eventBus.$on("replaceText", (res) => {
      this.inputText = replaceText(this.inputText, res[0], this.findText, this.findIndexArray, res[1], res[2])
    });
    eventBus.$on("loadData", (res) => {
      console.log(res)
      this.inputText = res.slice(res.indexOf("<body"), res.indexOf("</body>")+7);
      this.defaultHTMLText = res.slice(res.indexOf("<?xml"), res.indexOf("<body"));
    });
    eventBus.$on("pushIndexData", (res) => {
      if (res === "Italic") {
        this.attachItalicTag();
      } else if (res === "LineTag") {
        this.attachLineTag();
      } else if (res === "Enter") {
        this.attachEnterTag();
      } else if (res === "BlockquoteTag") {
        this.attachBlockquoteTag();
      } else if (res === "CiteTag") {
        this.attachCiteTag();
      } else if (res === "BoldTag") {
        this.attachBoldTag();
      } else if (res === "UnderlineTag") {
        this.attachUnderlineTag();
      } else if (res === "MediumlineTag") {
        this.attachMediumlineTag();
      } else if (res === "SubscriptTag") {
        this.attachSubscriptTag();
      } else if (res === "SuperscriptTag") {
        this.attachSuperscriptTag();
      } else if (res === "ImageTag") {
        this.attachImageTag();
      } else if (res === "UnorderedListTag") {
        this.attachUnorderedListTag();
      } else if (res === "OrderedListTag") {
        this.attachOrderedListTag();
      } else if (res === "Link") {
        this.linkDialog = true;
      } else if (res === "Table") {
        this.tableDialog = true;
      } else {
        this.attachHTag(res);
      }
    });
  },
  computed: {
    ...mapState(['editingText','editingTextArrPoint','arrSize','editingTextArr']),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT", "SET_EDITINGHTML",'PUSH_EDITINGTEXTARR','SHIFT_EDITINGTEXTARR','DOWN_EDITINGTEXTARRPOINT','UP_EDITINGTEXTARRPOINT']),
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
      this.inputText = pTag();
    },
    attachEnterTag: function () {
      this.inputText = enterTag();
    },
    attachLineTag: function () {
      this.inputText = lineTag();
    },
    attachHTag: function (index) {
      this.inputText = hTag(index);
    },
    attachItalicTag: function () {
      this.inputText = italicTag();
    },
    attachBlockquoteTag: function () {
      this.inputText = blockquoteTag();
    },
    attachCiteTag: function () {
      this.inputText = citeTag();
    },
    attachBoldTag: function () {
      this.inputText = boldTag();
    },
    attachUnderlineTag: function () {
      this.inputText = underlineTag();
    },
    attachMediumlineTag: function () {
      this.inputText = mediumlineTag();
    },
    attachSubscriptTag: function () {
      this.inputText = subscriptTag();
    },
    attachSuperscriptTag: function () {
      this.inputText = superscriptTag();
    },
    attachImageTag: function () {
      this.inputText = imageTag();
    },
    attachLinkTag: function () {
      this.linkDialog = false;
      this.inputText = linkTag(this.linkText);
      this.linkText = "";
    },
    attachTableTag: function () {
      this.tableDialog = false;
      this.inputText = tableTag(this.tableRow, this.tableCol);
      this.tableRow = 0;
      this.tableCol = 0;
    },
    attachUnorderedListTag: function () {
      this.inputText = unorderedListTag();
    },
    attachOrderedListTag: function () {
      this.inputText = orderedListTag();
    },
  },
  watch: {
    inputText: function () {
      this.SET_EDITINGTEXT(this.inputText);
      this.SET_EDITINGHTML(this.defaultHTMLText);

      if(this.editingTextArr[this.editingTextArrPoint]!=this.inputText){
        if(this.editingTextArrPoint==this.arrSize){
          this.DOWN_EDITINGTEXTARRPOINT();
          this.SHIFT_EDITINGTEXTARR();
          //console.log("shiFT : "+this.editingTextArr);
        }
        this.UP_EDITINGTEXTARRPOINT();
        this.PUSH_EDITINGTEXTARR();
        //console.log(this.editingTextArr);
        //console.log(this.editingTextArrPoint);
      }
   },
  },
};
</script>

<style>
#app > div > main > div > div > div.container.d-flex.flex-column > div > div.col.col-9 > div.v-input.v-textarea.v-input--hide-details.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-text-field--placeholder {
  height: 100%;
}
#app > div > main > div > div > div.container.d-flex.flex-column > div > div.col.col-9 > div.v-input.v-textarea.v-input--hide-details.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-text-field--placeholder > div {
  height: 100%;
}
#app > div > main > div > div > div.container.d-flex.flex-column > div > div.col.col-9 > div.v-input.v-textarea.v-input--hide-details.theme--light.v-text-field.v-text-field--single-line.v-text-field--solo.v-text-field--is-booted.v-text-field--enclosed.v-text-field--placeholder > div > div {
  height: 100%;
}
</style>