<template>
  <v-tabs show-arrows v-model="tab">
    <div class="d-flex">
      <div v-for="(tab, idx) in tabs" :key="idx">
        <v-tooltip bottom
          ><template v-slot:activator="{ on }">
            <v-btn v-on="on" icon medium @click="styleMethod(idx)"
              ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                tab.icon
              }}</v-icon></v-btn
            ></template
          >
          <span>{{ tab.name }}</span>
        </v-tooltip>
      </div>
    </div>

    <!-- <v-card id="customStyleMenu" class="mx-auto" style="display:none;" max-width="300" flat>
      <v-toolbar dense floating>
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(style, i) in customStyleList" :key="i" @click="applyCustomStyle(i)">
            <v-list-item-content>
              <v-list-item-title v-text="style.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="styleDialog = true">
            <v-icon style="margin-right: 5px">mdi-plus-circle-outline</v-icon>
            <v-list-item-content> 스타일 추가하기 </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      </v-toolbar>
    </v-card> -->

    <v-card
    id="customStyleMenu" style="display:none;"
    class="mx-auto"
    max-width="500"
  >
    <v-toolbar
      color="deep-purple accent-4"
      dark
    >

      <v-toolbar-title>나만의 style</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="styleDialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list subheader>

      <v-list-item
        v-for="(style, i) in customStyleList" :key="i" @click="applyCustomStyle(i)"
      >

        <v-list-item-content>
          <v-list-item-title v-text="style.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-icon>
          <v-icon>
            mdi-check-bold
          </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
  </v-card>

    <v-dialog v-model="styleDialog" persistent width="300px">
      <v-card>
        <v-card-title>
          <span class="headline">나만의 style 추가하기</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-col sm>
              <v-text-field
                v-model="customStyle.title"
                label="style 이름"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="10">
              <v-select
                v-model="customStyle.range"
                :items="['왼쪽 정렬', '오른쪽 정렬', '가운데 정렬', '양쪽 정렬']"
                label="정렬"
                required
              ></v-select>
            </v-col>
            <v-col cols="10">
              <v-select
                v-model="customStyle.font"
                :items="['바탕체', '굴림체', '돋움체', '궁서체']"
                label="글꼴"
                required
              ></v-select>
            </v-col>
            <v-col sm>
              <v-row>
                <v-text-field
                  v-model="customStyle.fontColor"
                  label="글씨색"
                  required
                  @click="
                    selected = 'font';
                    colorDialog = true;
                  "
                ></v-text-field>
                <v-btn v-if="customStyle.fontColor != ''" icon medium
                  ><v-icon medium v-bind:style="{ color: customStyle.fontColor }"
                    >mdi-checkbox-blank-circle</v-icon
                  ></v-btn
                >
              </v-row>
            </v-col>
            <v-col sm>
              <v-row>
                <v-text-field
                  v-model="customStyle.backgroundColor"
                  label="배경색"
                  required
                  @click="
                    selected = 'background';
                    colorDialog = true;
                  "
                ></v-text-field>
                <v-btn v-if="customStyle.backgroundColor != ''" icon medium
                  ><v-icon medium v-bind:style="{ color: customStyle.backgroundColor }"
                    >mdi-checkbox-blank-circle</v-icon
                  ></v-btn
                >
              </v-row>
            </v-col>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="styleDialog = false">
            닫기
          </v-btn>
          <v-btn
            color="green darken-1"
            text
            @click="
              addStyle();
              styleDialog = false;
            "
          >
            만들기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorDialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">색상 선택</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-color-picker v-model="pickedColor"></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="colorDialog = false">
            닫기
          </v-btn>
          <v-btn color="green darken-1" text @click="pickColor"> 선택 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorDialog1" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">글씨 색상 선택</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-color-picker v-model="tabs[5].color"></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="colorDialog1 = false">
            닫기
          </v-btn>
          <v-btn color="green darken-1" text @click="colorDialog1 = false"> 선택 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    

    <v-dialog v-model="colorDialog2" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">배경 색상 선택</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-color-picker v-model="tabs[7].color"></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="colorDialog2 = false">
            닫기
          </v-btn>
          <v-btn color="green darken-1" text @click="colorDialog2 = false"> 선택 </v-btn>
        </v-card-actions>
      </v-card>
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
  </v-tabs>
</template>

<script>
import * as css from "@/functions/add-css.js";
import * as edit from "@/functions/edit.js";

export default {
  name: "StyleTab",
  data: function () {
    return {
      tab: null,
      tabs: [
        {
          name: "왼쪽 정렬",
          icon: "mdi-format-align-left",
        },
        {
          name: "가운데 정렬",
          icon: "mdi-format-align-center",
        },
        {
          name: "오른쪽 정렬",
          icon: "mdi-format-align-right",
        },
        {
          name: "양쪽 정렬",
          icon: "mdi-format-align-justify",
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
        {
          name: "나만의 style",
          icon: "mdi-bookmark",
        },
      ],
      customStyleList: [],
      styleListIndex: 0,
      styleDialog: false,
      colorDialog: false,
      customStyleMenu: false,
      pickedColor: "",
      selected: "",
      customStyle: {
        title: '',
        range: '',
        font: '',
        fontColor: '',
        backgroundColor: ''
      },
    fonts: [
      {
        name: '바탕체',
        value: '바탕체',
      },
      {
        name: '돋움체',
        value: '돋움체',
      },
      {
        name: '굴림체',
        value: '굴림체',
      },
      {
        name: '궁서체',
        value: '궁서체',
      },
      {
        name: 'KoPubBatangBold',
        value: 'kopub_bat_b',
      },
      {
        name: 'KoPubBatangLight',
        value: 'kopub_bat_l',
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
        name: 'NotoSerif-Lightitalic',
        value: 'noto_li',
      },
    ],
      colorDialog1: false,
      colorDialog2: false,
      fontDialog: false,
      selectedFont: '',
    }
  },
  methods: {
    styleMethod: function (i) {
      if (i == 0) {
        this.$store.dispatch("setEditingText", css.alignText("left"));
      }
      else if (i == 1) {
        this.$store.dispatch('setEditingText', css.alignText('center'));
      }
      else if (i == 2) {
        this.$store.dispatch('setEditingText', css.alignText('right'));
      }
      else if (i == 3) {
        this.$store.dispatch('setEditingText', css.alignText('justify'));
      }
      else if (i == 4) {
        this.colorDialog1 = !this.colorDialog1;
      }
      else if (i == 5) {
        this.$store.dispatch('setEditingText', css.setFontColor(this.tabs[5].color));
      }
      else if (i == 6) {
        this.colorDialog2 = !this.colorDialog2;
      }
      else if (i == 7) {
        this.$store.dispatch('setEditingText', css.setBackgroundColor(this.tabs[7].color));
      }
      else if (i == 8) {
        this.fontDialog = !this.fontDialog;
      }
      else if (i == 9) {
        this.$store.dispatch('setEditingText', css.fontSize('down'));
      }
      else if (i == 10) {
        this.$store.dispatch('setEditingText', css.fontSize('up'));
      }
      else if (i == 11) {
        this.customStyleMenu = !this.customStyleMenu;
        this.openCustomStyleMenu();
      }
      edit.set('');
    },
    pickColor: function () {
      if (this.selected == "font") {
        this.customStyle.fontColor = this.pickedColor;
      } else {
        this.customStyle.backgroundColor = this.pickedColor;
      }
      this.colorDialog = false;
    },
    addStyle: function () {
      //css.makeCustomStyle(this.customStyle, this.$store.state.ebookDirectory);
      this.customStyleMenu = false;
      this.customStyleList.push(this.customStyle);
      this.customStyle = {};
      this.$store.dispatch('setCustomStyleArray', this.customStyleList);
    },
    openCustomStyleMenu: function () {
       let menu = document.getElementById('customStyleMenu');
       if (this.customStyleMenu) {
          menu.style.display = 'block';
       }
       else {
         menu.style.display = 'none';
       }
    },
    applyCustomStyle: function (index) {
      css.attachCustomStyleTag(this.customStyle.title);
      this.$store.dispatch("setEditingText", css.makeCustomStyle(this.customStyleList[index], this.$store.state.ebookDirectory));
    },
    setFont: function (font) {
      this.$store.dispatch('setEditingText', css.setFont(font))
    },
  }
}
</script>
