<template>
  <div id="subMenuBar">
    <div class="left">
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectHTag(1)">mdi-format-header-1</v-icon></v-btn></template>
        <span>H1</span>
      </v-tooltip>  
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectHTag(2)">mdi-format-header-2</v-icon></v-btn></template>
      <span>H2</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectHTag(3)">mdi-format-header-3</v-icon></v-btn></template>
      <span>H3</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectHTag(4)">mdi-format-header-4</v-icon></v-btn></template>
      <span>H4</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectHTag(5)">mdi-format-header-5</v-icon></v-btn></template>
      <span>H5</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectHTag(6)">mdi-format-header-6</v-icon></v-btn></template>
      <span>H6</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectItalicTag()">mdi-format-italic</v-icon></v-btn></template>
      <span>Italic</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectPTag()">mdi-format-paragraph</v-icon></v-btn></template>
      <span>Enter</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectLineTag()">mdi-minus</v-icon></v-btn></template>
      <span>Line</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectBlockquoteTag()">mdi-comment-text-multiple-outline</v-icon></v-btn></template>
      <span>Blockquote</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium text><v-icon medium @click="selectCiteTag()">mdi-comment-text-outline</v-icon></v-btn></template>
      <span>Cite</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectBoldTag()">mdi-format-bold</v-icon></v-btn></template>
      <span>Bold</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectUnderlineTag()">mdi-format-underline</v-icon></v-btn></template>
      <span>Underline</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectMediumlineTag()">mdi-format-strikethrough</v-icon></v-btn></template>
      <span>Mediumline</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectSubscriptTag()">mdi-format-letter-case-lower</v-icon></v-btn></template>
      <span>Subscript</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectSuperscriptTag()">mdi-format-letter-case-upper</v-icon></v-btn></template>
      <span>Superscript</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectUnorderedListTag()">mdi-format-list-bulleted</v-icon></v-btn></template>
      <span>UnorderedList</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectOrderedListTag()">mdi-format-list-numbered</v-icon></v-btn></template>
      <span>OrderedList</span>
      </v-tooltip>
    </div>
    <v-divider inset vertical/>
    <div class="right" style="height: 100%">
      <v-btn text x-large value="images">
        <div>
          <v-icon large @click="selectImageTag()">mdi-image-search-outline</v-icon>
          <p class="caption">Images</p>
        </div>
      </v-btn>
      <v-btn text x-large>
        <div>
          <v-icon large @click="selectLink()">mdi-link-box-variant-outline</v-icon>
          <p class="caption">Link</p>
        </div>
        </v-btn>
      <v-btn text x-large>
        <div>
          <v-icon large @click="selectTable()">mdi-table-large-plus</v-icon>
          <p class="caption">Table</p>
        </div>
      </v-btn>
    </div>
    
  </div>
</template>

<script>
import eventBus from '@/eventBus.js'
export default {
  methods: {
    // 도구상자 모음 탭
    selectHTag: function(index) {
      eventBus.$emit('pushIndexData', index);
    },
    selectItalicTag: function () {
      eventBus.$emit('pushIndexData', 'Italic');
    },
    selectPTag: function () {
      eventBus.$emit('pushIndexData', 'Enter');
    },
    selectLineTag: function () {
      eventBus.$emit('pushIndexData', 'LineTag');
    },
    selectBlockquoteTag: function () {
      eventBus.$emit('pushIndexData', 'BlockquoteTag');
    },
    selectCiteTag: function () {
      eventBus.$emit('pushIndexData', 'CiteTag');
    },
    selectBoldTag: function () {
      eventBus.$emit('pushIndexData', 'BoldTag');
    },
    selectUnderlineTag: function () {
      eventBus.$emit('pushIndexData', 'UnderlineTag');
    },
    selectMediumlineTag: function () {
      eventBus.$emit('pushIndexData', 'MediumlineTag');
    },
    selectSubscriptTag: function () {
      eventBus.$emit('pushIndexData', 'SubscriptTag');
    },
    selectSuperscriptTag: function () {
      eventBus.$emit('pushIndexData', 'SuperscriptTag');
    },
    selectUnorderedListTag: function () {
      eventBus.$emit('pushIndexData', 'UnorderedListTag');
    },
    selectOrderedListTag: function () {
      eventBus.$emit('pushIndexData', 'OrderedListTag');
    },
    selectImageTag: function () {
      eventBus.$emit('pushIndexData', 'ImageTag');
    },
    selectLink: function () {
      eventBus.$emit('pushIndexData', 'Link');
    },
    selectTable: function () {
      eventBus.$emit('pushIndexData', 'Table');
    },

  }
}
</script>

<style>
    #subMenuBar{
      width: 100%;
      height: 80px;
    }
    div.left {
        width: 60%;
        float: left;
        height: 10%;
    }
    div.right {
      top:20%;
      width: 39%;
      float: right;
      position: relative;
    }
</style>