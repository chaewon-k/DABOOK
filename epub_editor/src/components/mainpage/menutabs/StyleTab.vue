<template>
  <div class="d-flex">
    <div
      v-for="(tab, idx) in tabs"
      :key="idx"
    >
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="styleMethod(idx)"><v-icon v-bind:style="{ 'background': tab.color }" medium>{{ tab.icon }}</v-icon></v-btn></template>
        <span>{{ tab.name }}</span>
      </v-tooltip>
    </div>
    <v-dialog
      v-model="colorDialog"
      width="316px"
    >
      <v-color-picker
        class="ma-2"
        show-swatches
        swatches-max-height="300px"
        v-model="tabs[5].color"
      ></v-color-picker>
    </v-dialog>
  </div>
</template>

<script>
import * as css from '@/functions/add-css.js';

export default {
  name: 'StyleTab',
  data: function () {
    return {
      tabs: [
        {
          name: '왼쪽 정렬',
          icon: 'mdi-format-align-left',
        },
        {
          name: '가운데 정렬',
          icon: 'mdi-format-align-center',
        },
        {
          name: '오른쪽 정렬',
          icon: 'mdi-format-align-right',
        },
        {
          name: '양쪽 정렬',
          icon: 'mdi-format-align-justify',
        },
        {
          name: '색 선택',
          icon: 'mdi-eyedropper-variant',
        },
        {
          name: '색 적용',
          icon: '',
          color: 'red',
        },
      ],
      colorDialog: false,
      swatches : [
        ['#FF0000', '#AA0000', '#550000'],
        ['#FFFF00', '#AAAA00', '#555500'],
        ['#00FF00', '#00AA00', '#005500'],
        ['#00FFFF', '#00AAAA', '#005555'],
        ['#0000FF', '#0000AA', '#000055'],  
      ],
    }
  },
  methods: {
    styleMethod: function (i) {
      if (i == 0) {
        this.$store.dispatch('setEditingText', css.alignText('left'));
      }
      if (i == 1) {
        this.$store.dispatch('setEditingText', css.alignText('center'));
      }
      if (i == 2) {
        this.$store.dispatch('setEditingText', css.alignText('right'));
      }
      if (i == 3) {
        this.$store.dispatch('setEditingText', css.alignText('justify'));
      }
      if (i == 4) {
        this.colorDialog = !this.colorDialog
      }
      if (i == 5) {
        this.$store.dispatch('setEditingText', css.setColor(this.tabs[5].color));
      }
    },
  }
}
</script>
