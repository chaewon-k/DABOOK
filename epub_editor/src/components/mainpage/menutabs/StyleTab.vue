<template>
  <div class="d-flex">
    <div
      v-for="(tab, idx) in tabs"
      :key="idx"
    >
      <v-tooltip bottom><template v-slot:activator="{ on }">
        <v-btn v-on="on" icon medium @click="styleMethod(idx)"><v-icon v-bind:style="{ 'color': tab.color }" medium>{{ tab.icon }}</v-icon></v-btn></template>
        <span>{{ tab.name }}</span>
      </v-tooltip>
    </div>
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
          name: '빨갼색',
          icon: 'mdi-checkbox-blank-circle',
          color: 'red',
        },
      ]
    }
  },
  methods: {
    styleMethod: function (i) {
      if (i == 0) {
        this.$store.dispatch('setEditingText', css.alignText('left'))
      }
      if (i == 1) {
        this.$store.dispatch('setEditingText', css.alignText('center'))
      }
      if (i == 2) {
        this.$store.dispatch('setEditingText', css.alignText('right'))
      }
      if (i == 3) {
        this.$store.dispatch('setEditingText', css.alignText('justify'))
      }
      if (i == 4) {
        this.$store.dispatch('setEditingText', css.setColor('red'))
      }
    }
  }
}
</script>
