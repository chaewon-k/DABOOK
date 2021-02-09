<template>
  <!----------- StyleTab menus ----------->
  <v-tabs class="ml-3" show-arrows v-model="tab">
    <div class="d-flex">
      <div class="align-self-center" v-for="(tab, idx) in tabs" :key="idx">
        <div v-if="idx === 4">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="rounded-sm"
                v-on="on"
                icon
                medium
                @click="styleMethod(idx)"
                @mousedown.right.stop.prevent="colorDialog1 = true"
                ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                  tab.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ tab.name }}</span>
          </v-tooltip>
        </div>
        <div v-else-if="idx === 5">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                class="rounded-sm"
                v-on="on"
                icon
                medium
                @click="styleMethod(idx)"
                @mousedown.right.stop.prevent="colorDialog2 = true"
                ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                  tab.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ tab.name }}</span>
          </v-tooltip>
        </div>
        <div v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" class="rounded-sm" icon medium @click="styleMethod(idx)"
                ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                  tab.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ tab.name }}</span>
          </v-tooltip>
        </div>
      </div>
    </div>

    <v-dialog v-model="customDialog" class="mx-auto" max-width="400">
      <v-toolbar style="color: #423F8C;">
        <v-toolbar-title>나만의 스타일</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon class="rounded-sm" @click="customDialog = false"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-toolbar>

      <v-list subheader>
        <v-list-item
          v-for="(style, index) in customStyleList"
          :key="index"
          @click="applyCustomStyle(index)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="style"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="styleDialog = true">
          <v-list-item-icon>
            <v-icon> mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> 스타일 추가하기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
    </v-dialog>

    <v-dialog v-model="styleDialog" persistent max-width="400px">
      <v-card>
        <v-card-title class="header-color">
          <span>나만의 style 추가하기</span>
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
                :items="[
                  '왼쪽 정렬',
                  '오른쪽 정렬',
                  '가운데 정렬',
                  '양쪽 정렬',
                ]"
                label="정렬"
              ></v-select>
            </v-col>
            <v-col cols="10">
              <!-- <v-select
                v-model="customStyle.font"
                :items="fonts"
                label="글꼴"
                item-text="name"
                item-value="value"
              >
              </v-select> -->
              <select>
                <option
                  v-for="(font, idx) in fonts"
                  :key="idx"
                  :style="{ 'font-family' : font.value}"
                  >{{ font.name }}</option
                >
              </select>
            </v-col>
            <v-col sm>
              <v-row>
                <v-text-field
                  v-model="customStyle.fontColor"
                  label="글씨색"
                  @click="
                    selected = 'font';
                    colorDialog = true;
                  "
                ></v-text-field>
                <v-btn class="rounded-sm" v-if="customStyle.fontColor != ''" icon medium>
                  <v-icon medium v-bind:style="{ color: customStyle.fontColor }"
                    >mdi-checkbox-blank-circle</v-icon
                  >
                </v-btn>
              </v-row>
            </v-col>
            <v-col sm>
              <v-row>
                <v-text-field
                  v-model="customStyle.backgroundColor"
                  label="배경색"
                  @click="
                    selected = 'background';
                    colorDialog = true;
                  "
                ></v-text-field>
                <v-btn class="rounded-sm" v-if="customStyle.backgroundColor != ''" icon medium>
                  <v-icon
                    medium
                    :style="{ color: customStyle.backgroundColor }"
                    >mdi-checkbox-blank-circle</v-icon
                  ></v-btn
                >
              </v-row>
            </v-col>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="styleDialog = false"
            >닫기</v-btn
          >
          <v-btn
            style="color: #423F8C;"
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
        <v-card-title class="header-color">
          <span>색상 선택</span>
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
        <v-card-title class="header-color">
          <span>글씨 색상 선택</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-color-picker v-model="tabs[4].color"></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="colorDialog1 = false">
            닫기
          </v-btn>
          <v-btn style="color: #423F8C;" text @click="colorDialog1 = false">
            선택
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorDialog2" persistent max-width="400px">
      <v-card>
        <v-card-title class="header-color">
          <span>배경 색상 선택</span>
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
          <v-btn color="red darken-1" text @click="colorDialog2 = false"
            >닫기</v-btn
          >
          <v-btn style="color: #423F8C;" text @click="colorDialog2 = false">
            선택
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="fontDialog" max-width="300px" height="auto">
      <v-card>
        <v-card-title class="header-color">글꼴 선택</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <template>
            <v-radio-group v-model="selectedFont" column>
              <v-radio
                v-for="(font, idx) in fonts"
                :key="idx"
                :label="font.name"
                :value="font.value"
                v-bind:style="{ 'font-family': font.value }"
              >
              </v-radio>
            </v-radio-group>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="fontDialog = false">
            닫기
          </v-btn>
          <v-btn
            style="color: #423F8C;"
            text
            @click="
              fontDialog = false;
              setFont(selectedFont);
            "
          >
            선택
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
  data: function() {
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
          name: "글자색 적용",
          icon: "mdi-format-color-text",
          color: "red",
        },
        {
          name: "배경색 적용",
          icon: "mdi-square",
          color: "red",
        },
        {
          name: "글꼴",
          icon: "mdi-format-font",
        },
        {
          name: "글자크기 축소",
          icon: "mdi-format-font-size-decrease",
        },
        {
          name: "글자크기 확대",
          icon: "mdi-format-font-size-increase",
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
      customDialog: false,
      customStyleMenu: false,
      pickedColor: "",
      selected: "",
      customStyle: {
        title: "",
        range: "",
        font: "",
        fontColor: "",
        backgroundColor: "",
      },
      fonts: [
        {
          name: "바탕체",
          value: "바탕체",
        },
        {
          name: "돋움체",
          value: "돋움체",
        },
        {
          name: "굴림체",
          value: "굴림체",
        },
        {
          name: "궁서체",
          value: "궁서체",
        },
        {
          name: "KoPub 굵은 바탕체",
          value: "kopub_bat_b",
        },
        {
          name: "KoPub 얇은 바탕체",
          value: "kopub_bat_l",
        },
        {
          name: "KoPub 굵은 돋움체",
          value: "kopub_dot_b",
        },
        {
          name: "KoPub 얇은 돋움체",
          value: "kopub_dot_l",
        },
        {
          name: "NotoSerif-Lightitalic",
          value: "noto_li",
        },
      ],
      colorDialog1: false,
      colorDialog2: false,
      fontDialog: false,
      selectedFont: "",
    };
  },
  methods: {
    styleMethod: function(i) {
      if (!css.inTag()) {
        // console.log("tag 안입니다");
        this.$store.dispatch(
          "setAlertMessage",
          "태그 밖에서만 스타일 적용이 가능합니다."
        );
        return;
      }
      if (this.$store.state.selectedFileDirectory !== "") {
        if (i == 0) {
          this.$store.dispatch("setEditingText", css.alignText("left"));
        } else if (i == 1) {
          this.$store.dispatch("setEditingText", css.alignText("center"));
        } else if (i == 2) {
          this.$store.dispatch("setEditingText", css.alignText("right"));
        } else if (i == 3) {
          this.$store.dispatch("setEditingText", css.alignText("justify"));
        } else if (i == 4) {
          this.$store.dispatch(
            "setEditingText",
            css.setFontColor(this.tabs[4].color)
          );
        } else if (i == 5) {
          this.$store.dispatch(
            "setEditingText",
            css.setBackgroundColor(this.tabs[5].color)
          );
        } else if (i == 6) {
          this.fontDialog = !this.fontDialog;
        } else if (i == 7) {
          this.$store.dispatch("setEditingText", css.fontSize("down"));
        } else if (i == 8) {
          this.$store.dispatch("setEditingText", css.fontSize("up"));
        } else if (i == 9) {
          this.openCustomStyleMenu();
        }
        edit.set("");
      } else {
        this.$store.dispatch(
          "setAlertMessage",
          "text 폴더의 파일을 선택해주세요."
        );
      }
    },
    pickColor: function() {
      if (this.selected == "font") {
        this.customStyle.fontColor = this.pickedColor;
      } else {
        this.customStyle.backgroundColor = this.pickedColor;
      }
      this.colorDialog = false;
    },
    addStyle: function() {
      this.customStyleMenu = false;
      this.customStyleList.push(this.customStyle.title);
      css.makeCustomStyle(this.customStyle, this.$store.state.ebookDirectory);
      this.customStyle = {};
      this.$store.dispatch("setCustomStyleArray", this.customStyleList);
    },
    openCustomStyleMenu: function() {
      this.customStyleList = this.$store.state.customStyleArray;
      this.customDialog = true;
    },
    applyCustomStyle: function(index) {
      this.$store.dispatch(
        "setEditingText",
        css.attachCustomStyleTag(this.customStyleList[index])
      );
      this.customDialog = false;
    },
    setFont: function(font) {
      this.$store.dispatch("setEditingText", css.setFont(font));
    },
    fontBinding: function(val) {
      let font = '"font-family : ' + val + '"';
      console.log(font);
      return font;
    },
  },
};
</script>