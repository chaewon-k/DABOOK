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
    <v-dialog
      v-model="colorDialog2"
      width="316px"
    >
      <v-color-picker
        class="ma-2"
        show-swatches
        swatches-max-height="300px"
        v-model="tabs[7].color"
      ></v-color-picker>
    </v-dialog>
    <v-dialog
      v-model="fontDialog"
      scrollable
      max-width="300px"
    >
      <v-card>
        <v-card-title>글꼴을 선택해주세요.</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <v-radio-group
            v-model="selectedFont"
            column
          >
            <div
              v-for="(font, idx) in fonts"
              :key="idx"
            >
              <v-radio
                :label="font.name"
                :value="font.value"
              ></v-radio>
            </div>
          </v-radio-group>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue darken-1"
            text
            @click="fontDialog = false"
          >
            취소
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="fontDialog = false; setFont(selectedFont)"
          >
            적용
          </v-btn>
        </v-card-actions>
      </v-card>
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
          name: '글자색 선택',
          icon: 'mdi-eyedropper-variant',
        },
        {
          name: '글자색 적용',
          icon: 'mdi-format-color-text',
          color: 'red',
        },
        {
          name: '배경색 선택',
          icon: 'mdi-eyedropper-variant',
        },
        {
          name: '배경색 적용',
          icon: 'mdi-square',
          color: 'red',
        },
        {
          name: '글꼴',
          icon: 'mdi-format-font',
        },
        {
          name: '글자크기 축소',
          icon: 'mdi-format-font-size-decrease',
        },
        {
          name: '글자크기 확대',
          icon: 'mdi-format-font-size-increase',
        },
      ],
      fonts: [
        {
          name: 'KoPubBatangBold',
          value: 'kopub_bat_b',
        },
        {
          name: 'KoPubBatangLight',
          value: 'kopub_bat_l',
        },
        {
          name: 'KoPubBatangMedium',
          value: 'kopub_bat_m',
        },
        {
          name: 'KoPubDotumBold',
          value: 'kopub_dot_b',
        },
        {
          name: 'KoPubDotumLight',
          value: 'kopub_dot_l',
        },
        {
          name: 'KoPubDotumMedium',
          value: 'kopub_dot_m',
        },
        {
          name: 'NotoSerif-Lightitalic',
          value: 'noto_li',
        },
        {
          name: 'HanaMinA',
          value: 'hanamina',
        },
      ],
      colorDialog: false,
      colorDialog2: false,
      fontDialog: false,
      selectedFont: '',
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
        this.colorDialog = !this.colorDialog;
      }
      if (i == 5) {
        this.$store.dispatch('setEditingText', css.setFontColor(this.tabs[5].color));
      }
      if (i == 6) {
        this.colorDialog2 = !this.colorDialog2;
      }
      if (i == 7) {
        this.$store.dispatch('setEditingText', css.setBackgroundColor(this.tabs[7].color));
      }
      if (i == 8) {
        this.fontDialog = !this.fontDialog;
      }
      if (i == 9) {
        this.$store.dispatch('setEditingText', css.fontSize('down'));
      }
      if (i == 10) {
        this.$store.dispatch('setEditingText', css.fontSize('up'));
      }
    },
    setFont: function (font) {
      this.$store.dispatch('setEditingText', css.setFont(font))
    },
  }
}
</script>
