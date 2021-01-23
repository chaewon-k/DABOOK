<template>
  <v-col>
    <div style="display:inline" v-for="tag in hTags" :key="tag">
      <v-btn @click="attachHTag(tag)">{{'h' + tag}}</v-btn>
    </div>
    <v-btn @click="attachItalicTag()">Italic</v-btn>
    <v-btn @click="attachPTag()">Enter</v-btn>
    <v-btn @click="attachLineTag()">Line</v-btn>
    <v-btn @click="attachBlockquoteTag()">Blockquote</v-btn>
    <v-btn @click="attachCiteTag()">Cite</v-btn>
    <v-btn @click="attachBoldTag()">Bold</v-btn>
    <v-btn @click="attachUnderlineTag()">Underline</v-btn>
    <v-btn @click="attachMediumlineTag()">Mediumline</v-btn>
    <v-btn @click="attachSubscriptTag()">Subscript</v-btn>
    <v-btn @click="attachSuperscriptTag()">Superscript</v-btn>
    <v-btn @click="attachImageTag()">Image</v-btn>
    <v-btn @click.stop="linkDialog = true">Link</v-btn>
    <v-btn @click.stop="tableDialog = true">table</v-btn>
    <v-btn @click="attachUnorderedListTag()">unorderedList</v-btn>
    <v-btn @click="attachOrderedListTag()">orderedList</v-btn>

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

    <v-textarea
      id="area"
      outlined
      height="35em"
      label="textarea 입니다"
      placeholder="책을 작성해볼까요?"
      v-model="inputText"
      @keyup.enter="attachEnterTag()"
    >
    </v-textarea>
  </v-col>
</template>

<script>
import { mapMutations } from "vuex";
import eventBus from "@/eventBus.js";
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
      linkText: "",
      tableData: { col: [], row: [] },
      hTags: [1, 2, 3, 4, 5, 6],
      linkDialog: false,
      tableDialog: false,
      tableRow: 0,
      tableCol: 0,
    };
  },
  created() {
    eventBus.$on("loadData", (res) => {
      this.inputText = res;
    });
    eventBus.$on("pushIndexData", (res) => {
      if (res === "Italic") {
        this.attachItalicTag();
      } else {
        this.attachHTag(res);
      }
    });
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_EDITINGTEXT"]),
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
    },
  },
};
</script>

<style>
</style>