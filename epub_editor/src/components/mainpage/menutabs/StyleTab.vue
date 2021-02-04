<template>
  <div>
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

    <v-card id="customStyleMenu" class="mx-auto" style="display:none;" max-width="300" tile>
      <v-list flat>
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
              <!-- <span style= "font-family:"></span> -->
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
  </div>
</template>

<script>
import * as css from "@/functions/add-css.js";

export default {
  name: "StyleTab",
  data: function () {
    return {
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
          name: "빨갼색",
          icon: "mdi-checkbox-blank-circle",
          color: "red",
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
      }
    };
  },
  methods: {
    styleMethod: function (i) {
      if (i == 0) {
        this.$store.dispatch("setEditingText", css.alignText("left"));
      }
      if (i == 1) {
        this.$store.dispatch("setEditingText", css.alignText("center"));
      }
      if (i == 2) {
        this.$store.dispatch("setEditingText", css.alignText("right"));
      }
      if (i == 3) {
        this.$store.dispatch("setEditingText", css.alignText("justify"));
      }
      if (i == 4) {
        this.$store.dispatch("setEditingText", css.setColor("red"));
      }
      if (i == 5) {
        this.customStyleMenu = !this.customStyleMenu;
        this.openCustomStyleMenu();
      }
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
      this.$store.dispatch("setEditingText", css.makeCustomStyle(this.customStyleList[index], this.$store.state.ebookDirectory));
    }
  },
};
</script>

<style>
</style>