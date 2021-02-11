<template>
  <!----------- ToolsTab menus ----------->
  <div id="subMenuBar">
    <v-tabs show-arrows v-model="tab" class="left ml-3">
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(1)">mdi-format-header-1</v-icon></v-btn></template>
        <span>{{ $t('toolstab.h1') }}</span>
      </v-tooltip>  
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(2)">mdi-format-header-2</v-icon></v-btn></template>
      <span>{{ $t('toolstab.h2') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(3)">mdi-format-header-3</v-icon></v-btn></template>
      <span>{{ $t('toolstab.h3') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(4)">mdi-format-header-4</v-icon></v-btn></template>
      <span>{{ $t('toolstab.h4') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(5)">mdi-format-header-5</v-icon></v-btn></template>
      <span>{{ $t('toolstab.h5') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag(6)">mdi-format-header-6</v-icon></v-btn></template>
      <span>{{ $t('toolstab.h6') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Italic')">mdi-format-italic</v-icon></v-btn></template>
      <span>{{ $t('toolstab.italic') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Enter')">mdi-format-paragraph</v-icon></v-btn></template>
      <span>{{ $t('toolstab.enter') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('LineTag')">mdi-minus</v-icon></v-btn></template>
      <span>{{ $t('toolstab.line') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('BlockquoteTag')">mdi-comment-text-multiple-outline</v-icon></v-btn></template>
      <span>{{ $t('toolstab.quote') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('CiteTag')">mdi-comment-text-outline</v-icon></v-btn></template>
      <span>{{ $t('toolstab.cite') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('BoldTag')">mdi-format-bold</v-icon></v-btn></template>
      <span>{{ $t('toolstab.bold') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('UnderlineTag')">mdi-format-underline</v-icon></v-btn></template>
      <span>{{ $t('toolstab.underline') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('MediumlineTag')">mdi-format-strikethrough</v-icon></v-btn></template>
      <span>{{ $t('toolstab.mediumline') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('SubscriptTag')">mdi-format-letter-case-lower</v-icon></v-btn></template>
      <span>{{ $t('toolstab.subscript') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('SuperscriptTag')">mdi-format-letter-case-upper</v-icon></v-btn></template>
      <span>{{ $t('toolstab.superscript') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('UnorderedListTag')">mdi-format-list-bulleted</v-icon></v-btn></template>
      <span>{{ $t('toolstab.unorderedlist') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('OrderedListTag')">mdi-format-list-numbered</v-icon></v-btn></template>
      <span>{{ $t('toolstab.orderedlist') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('ImageTag')">mdi-image-search-outline</v-icon></v-btn></template>
      <span>{{ $t('toolstab.image') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Link')">mdi-link-box-variant-outline</v-icon></v-btn></template>
      <span>{{ $t('toolstab.link') }}</span>
      </v-tooltip>
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn class="align-self-center rounded-sm" v-on="on" icon medium><v-icon medium @click="selectTag('Table')">mdi-table-large-plus</v-icon></v-btn></template>
      <span>{{ $t('toolstab.table') }}</span>
      </v-tooltip>
    </v-tabs>
  </div>
</template>

<script>
import eventBus from '@/eventBus.js';

export default {
  name: 'ToolsTab',
  data: function () {
    return {
      tab: null,
    }
  },
  methods: {
    selectTag: function(index) {
      if (this.$store.state.selectedFileDirectory !== '') {
        eventBus.$emit('pushIndexData', index);
      } else {
        this.$store.dispatch('setAlertMessage', 'error.select-file')
      }
    }
  }
}
</script>