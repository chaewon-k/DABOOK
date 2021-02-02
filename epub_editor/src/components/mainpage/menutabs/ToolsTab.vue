<template>
  <div id="subMenuBar">
    <div class="left">
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag(1)">mdi-format-header-1</v-icon></v-btn></template>
        <span>H1</span>
      </v-tooltip>  
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag(2)">mdi-format-header-2</v-icon></v-btn></template>
      <span>H2</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag(3)">mdi-format-header-3</v-icon></v-btn></template>
      <span>H3</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag(4)">mdi-format-header-4</v-icon></v-btn></template>
      <span>H4</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag(5)">mdi-format-header-5</v-icon></v-btn></template>
      <span>H5</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag(6)">mdi-format-header-6</v-icon></v-btn></template>
      <span>H6</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('Italic')">mdi-format-italic</v-icon></v-btn></template>
      <span>Italic</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('Enter')">mdi-format-paragraph</v-icon></v-btn></template>
      <span>Enter</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('LineTag')">mdi-minus</v-icon></v-btn></template>
      <span>Line</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('BlockquoteTag')">mdi-comment-text-multiple-outline</v-icon></v-btn></template>
      <span>Blockquote</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium text><v-icon medium @click="selectTag('CiteTag')">mdi-comment-text-outline</v-icon></v-btn></template>
      <span>Cite</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('BoldTag')">mdi-format-bold</v-icon></v-btn></template>
      <span>Bold</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('UnderlineTag')">mdi-format-underline</v-icon></v-btn></template>
      <span>Underline</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('MediumlineTag')">mdi-format-strikethrough</v-icon></v-btn></template>
      <span>Mediumline</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('SubscriptTag')">mdi-format-letter-case-lower</v-icon></v-btn></template>
      <span>Subscript</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('SuperscriptTag')">mdi-format-letter-case-upper</v-icon></v-btn></template>
      <span>Superscript</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('UnorderedListTag')">mdi-format-list-bulleted</v-icon></v-btn></template>
      <span>UnorderedList</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium><v-icon medium @click="selectTag('OrderedListTag')">mdi-format-list-numbered</v-icon></v-btn></template>
      <span>OrderedList</span>
      </v-tooltip>
    </div>
    <v-divider inset vertical/>
    <div class="right" style="height: 100%">
      <v-btn text x-large value="images">
        <div>
          <v-icon large @click="selectTag('ImageTag')">mdi-image-search-outline</v-icon>
          <p class="caption">Images</p>
        </div>
      </v-btn>
      <v-btn text x-large>
        <div>
          <v-icon large @click="selectTag('Link')">mdi-link-box-variant-outline</v-icon>
          <p class="caption">Link</p>
        </div>
        </v-btn>
      <v-btn text x-large>
        <div>
          <v-icon large @click="selectTag('Table')">mdi-table-large-plus</v-icon>
          <p class="caption">Table</p>
        </div>
      </v-btn>
    </div>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js';

export default {
  name: 'ToolsTab',
  methods: {
    selectTag: function(index) {
      eventBus.$emit('pushIndexData', index);
    }
  }
}
</script>

<style>
#subMenuBar {
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