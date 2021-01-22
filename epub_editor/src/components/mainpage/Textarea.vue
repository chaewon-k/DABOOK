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
import eventBus from '@/eventBus.js'
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
} from "@/functions/text-style.js";

export default {
  data() {
    return {
      position: 0,
      inputText: "",
      linkText: "",
      hTags: [1, 2, 3, 4, 5, 6],
      linkDialog: false,
    };
  },
  created() {
    eventBus.$on('pushIndexData', res => {
      if (res === 'Italic') {
        this.attachItalicTag()
      } else {
        this.attachHTag(res)
      }
    })
  },
  computed: {},
  methods: {
    ...mapMutations(["SET_EDITINGTEXT"]),
    attachPTag() {
      this.inputText = pTag();
    },
    attachEnterTag() {
      this.inputText = enterTag();
    },
    attachLineTag() {
      this.inputText = lineTag();
    },
    attachHTag(index) {
      this.inputText = hTag(index);
    },
    attachItalicTag() {
      this.inputText = italicTag();
    },
    attachBlockquoteTag() {
      this.inputText = blockquoteTag();
    },
    attachCiteTag() {
      this.inputText = citeTag();
    },
    attachBoldTag() {
      this.inputText = boldTag();
    },
    attachUnderlineTag() {
      this.inputText = underlineTag();
    },
    attachMediumlineTag() {
      this.inputText = mediumlineTag();
    },
    attachSubscriptTag() {
      this.inputText = subscriptTag();
    },
    attachSuperscriptTag() {
      this.inputText = superscriptTag();
    },
    attachImageTag() {
      this.inputText = imageTag();
    },
    attachLinkTag() {
      this.linkDialog = false;
      this.inputText = linkTag(this.linkText);
      this.linkText = "";
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