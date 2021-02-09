<template>
  <!----------- ToolsTab menus ----------->
  <div id="subMenuBar">
    <v-tabs show-arrows v-model="tab" class="left ml-3">
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(1)">mdi-format-header-1</v-icon></v-btn></template>
        <span>제목1</span>
      </v-tooltip>  
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(2)">mdi-format-header-2</v-icon></v-btn></template>
      <span>제목2</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(3)">mdi-format-header-3</v-icon></v-btn></template>
      <span>제목3</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(4)">mdi-format-header-4</v-icon></v-btn></template>
      <span>제목4</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(5)">mdi-format-header-5</v-icon></v-btn></template>
      <span>제목5</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(6)">mdi-format-header-6</v-icon></v-btn></template>
      <span>제목6</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Italic')">mdi-format-italic</v-icon></v-btn></template>
      <span>이탤릭체</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Enter')">mdi-format-paragraph</v-icon></v-btn></template>
      <span>줄 바꿈</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('LineTag')">mdi-minus</v-icon></v-btn></template>
      <span>선</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('BlockquoteTag')">mdi-comment-text-multiple-outline</v-icon></v-btn></template>
      <span>인용구</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('CiteTag')">mdi-comment-text-outline</v-icon></v-btn></template>
      <span>인용문</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('BoldTag')">mdi-format-bold</v-icon></v-btn></template>
      <span>굵게</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('UnderlineTag')">mdi-format-underline</v-icon></v-btn></template>
      <span>밑줄</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('MediumlineTag')">mdi-format-strikethrough</v-icon></v-btn></template>
      <span>취소선</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('SubscriptTag')">mdi-format-letter-case-lower</v-icon></v-btn></template>
      <span>아래첨자</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('SuperscriptTag')">mdi-format-letter-case-upper</v-icon></v-btn></template>
      <span>윗첨자</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('UnorderedListTag')">mdi-format-list-bulleted</v-icon></v-btn></template>
      <span>순서 없는 목록</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('OrderedListTag')">mdi-format-list-numbered</v-icon></v-btn></template>
      <span>순서 있는 목록</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('ImageTag')">mdi-image-search-outline</v-icon></v-btn></template>
      <span>이미지</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Link')">mdi-link-box-variant-outline</v-icon></v-btn></template>
      <span>링크</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Table')">mdi-table-large-plus</v-icon></v-btn></template>
      <span>표</span>
      </v-tooltip>
    </v-tabs>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js';

const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

export default {
  name: 'ToolsTab',
  data: function () {
    return {
      tab: null,
    }
  },
  mounted: function () {
    this.eBookDialog = false;
    ipcRenderer.on('toolsTab', function (event, message) {
      this.selectTag(message)
    }.bind(this))
  },
  methods: {
    selectTag: function(index) {
      if (this.$store.state.selectedFileDirectory !== '') {
        eventBus.$emit('pushIndexData', index);
      } else {
        this.$store.dispatch('setAlertMessage', 'text 폴더의 파일을 선택해주세요.')
      }
    }
  }
}
</script>