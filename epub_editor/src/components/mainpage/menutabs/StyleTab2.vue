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
                @mousedown.right.stop.prevent="selected = 'tab-font'; colorDialog = true;"
                ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                  tab.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ $t("styletab." + tab.name) }}</span>
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
                @mousedown.right.stop.prevent="selected = 'tab-background'; colorDialog = true;"
                ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                  tab.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ $t("styletab." + tab.name) }}</span>
          </v-tooltip>
        </div>
        <div v-else>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                class="rounded-sm"
                icon
                medium
                @click="styleMethod(idx)"
                ><v-icon v-bind:style="{ color: tab.color }" medium>{{
                  tab.icon
                }}</v-icon></v-btn
              >
            </template>
            <span>{{ $t("styletab." + tab.name) }}</span>
          </v-tooltip>
        </div>
      </div>
    </div>

    <v-dialog v-model="customDialog" max-width="320">
      <v-card>
        <DialogTitle
          title="style-custom"
          @toggle-dialog="customDialog = false"
        />
        <v-list style="padding: 3% 6% 3% 6%">
          <v-list-item
            v-for="(style, index) in customStyleList"
            :key="index"
            @click="applyCustomStyle(index)"
          >
            <v-list-item-content>
              <v-list-item-title style="font-size:1.1em; color:gray;" v-text="style"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item @click="styleDialog = true">
            <v-list-item-icon>
              <v-icon> mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title style="font-size:1.2em;">{{ $t('addstyle') }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>

    <v-dialog v-model="styleDialog" max-width="350">
      <v-card>
        <DialogTitle
          title="style-add"
          @toggle-dialog="styleDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              :labelText="label.title"
              icon="mdi-textbox"
              required="true"
              check="true"
              @changeData="setStyleText"
              ref="styleTextInput"
            />
            <v-row>
              <v-select
              class="my-3"
                prepend-icon="mdi-reorder-horizontal"
                v-model="customStyle.range"
                :items="[
                  '왼쪽 정렬',
                  '오른쪽 정렬',
                  '가운데 정렬',
                  '양쪽 정렬',
                ]"
                :label="label.align"
              ></v-select>
            </v-row>
            <v-row>
              <!-- <select>
                <option
                  v-for="(font, idx) in fonts"
                  :key="idx"
                  :style="{ 'font-family': font.value }"
                  >{{ font.name }}</option
                >
              </select> -->
              <v-select
                class="my-3"
                prepend-icon="mdi-format-font"
                v-model="customStyle.font"
                :items="fonts"
                item-text="name"
                item-value="value"
                :label="label.font"
              >
              </v-select>
            </v-row>
            <v-row>
              <v-btn icon medium style="margin-top:5%; margin-left:-2%">
                <v-icon medium v-bind:style="{ color: customStyle.fontColor }"
                  >mdi-format-color-text</v-icon
                >
              </v-btn>
              <v-text-field
              class="my-3"
                v-model="customStyle.fontColor"
                :label="label.fontcolor"
                @click="
                  selected = 'font';
                  colorDialog = true;
                "
              ></v-text-field>
            </v-row>
            <v-row>
              <v-btn icon medium style="margin-top:5%; margin-left:-2%">
                <v-icon
                  medium
                  v-bind:style="{ color: customStyle.backgroundColor }"
                  >mdi-square</v-icon
                >
              </v-btn>
              <v-text-field
              class="my-3"
                v-model="customStyle.backgroundColor"
                :label="label.backgroundcolor"
                @click="
                  selected = 'background';
                  colorDialog = true;
                "
              ></v-text-field>
            </v-row>
          </v-container>
        </v-card-text>
        <DialogButton buttonText="add" :dialogMethod="addStyle" />
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorDialog" max-width="350">
      <v-card>
        <DialogTitle
          title="style-color"
          @toggle-dialog="colorDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <v-row>
              <v-col class="d-flex justify-center">
                <v-color-picker v-model="pickedColor"></v-color-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <DialogButton buttonText="apply" :dialogMethod="pickColor" />
      </v-card>
    </v-dialog>
   
    <v-dialog v-model="fontDialog" max-width="300">
      <v-card>
        <DialogTitle
          title="style-font"
          @toggle-dialog="fontDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <template>
            <v-radio-group v-model="selectedFont" column style="padding-left: 3%;">
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
        <DialogButton buttonText="apply" :dialogMethod="setFont" />
      </v-card>
    </v-dialog>

  </v-tabs>
</template>

<script>
import * as css from "@/functions/add-css.js";
import * as edit from "@/functions/edit.js";
import DialogButton from "@/components/Dialog/DialogButton";
import DialogInput from "@/components/Dialog/DialogInput";
import DialogTitle from "@/components/Dialog/DialogTitle";
import * as exec from "@/functions/exec-command.js";

export default {
  name: "StyleTab",
  components: {
    DialogButton,
    DialogInput,
    DialogTitle,
  },
  data: function() {
    return {
      tab: null,
      tabs: [
        {
          name: "left",
          icon: "mdi-format-align-left",
        },
        {
          name: "center",
          icon: "mdi-format-align-center",
        },
        {
          name: "right",
          icon: "mdi-format-align-right",
        },
        {
          name: "justify",
          icon: "mdi-format-align-justify",
        },
        {
          name: "fontcolor",
          icon: "mdi-format-color-text",
          color: "red",
        },
        {
          name: "backgroundcolor",
          icon: "mdi-square",
          color: "red",
        },
        {
          name: "font",
          icon: "mdi-format-font",
        },
        {
          name: "reducefont",
          icon: "mdi-format-font-size-decrease",
        },
        {
          name: "expandfont",
          icon: "mdi-format-font-size-increase",
        },
        {
          name: "customstyle",
          icon: "mdi-bookmark",
        },
      ],
      customStyleList: [],
      styleListIndex: 0,
      styleDialog: false,
      colorDialog: false,
      customDialog: false,
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
      label: {
        "title": "style-title",
        "align" : "style-align",
        "font" : "style-font",
        "fontcolor": "style-fontcolor",
        "backgroundcolor": "style-backgroundcolor"
      },
      fontSize: 5
    };
  },
  methods: {
    styleMethod: function(i) {
      if (!css.inTag()) {
        this.$store.dispatch(
          "setAlertMessage",
          "error.in-tag"
        );
        return;
      }
        if (i == 0) {
          this.$store.dispatch("setEditingText", exec.addStyle('justifyleft'));
        } else if (i == 1) {
          this.$store.dispatch("setEditingText", exec.addStyle("justifycenter"));
        } else if (i == 2) {
          this.$store.dispatch("setEditingText", exec.addStyle("justifyright"));
        } else if (i == 3) {
          this.$store.dispatch("setEditingText", exec.addStyle("justifyfull"));
        } else if (i == 4) {
          this.$store.dispatch(
            "setEditingText",
            exec.addStyle("forecolor", this.tabs[4].color)
          );
        } else if (i == 5) {
          this.$store.dispatch(
            "setEditingText",
            exec.addStyle("backcolor", this.tabs[5].color)
          );
        } else if (i == 6) {
          this.fontDialog = !this.fontDialog;
        } else if (i == 7) {
          if (this.fontSize <= 1) return;
          this.$store.dispatch("setEditingText", exec.addStyle("fontsize", --this.fontSize));
        } else if (i == 8) {
          if (this.fontSize >= 7) return;
          this.$store.dispatch("setEditingText", exec.addStyle("fontsize", ++this.fontSize));
        } else if (i == 9) {
          this.openCustomStyleMenu();
        }
        edit.set("");
    },
    pickColor: function() {
      if (this.selected == "font") {
        this.customStyle.fontColor = this.pickedColor;
      } else if (this.selected == "background") {
        this.customStyle.backgroundColor = this.pickedColor;
      } else if (this.selected == "tab-font") {
        this.tabs[4].color = this.pickedColor;
      } else {
        this.tabs[5].color = this.pickedColor;
      }
      this.colorDialog = false;
    },
    addStyle: function() {
      if (this.customStyle.title.trim() == "" || this.customStyle.title == undefined) {
        this.$store.dispatch(
          "setAlertMessage",
          "error.add-style"
        );
        return;
      }
      this.styleDialog = false;
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
    setFont: function() {
      this.fontDialog = false;
      let font = this.selectedFont;
      this.$store.dispatch("setEditingText", exec.addStyle("fontname", font));
    },
    fontBinding: function(val) {
      let font = '"font-family : ' + val + '"';
      console.log(font);
      return font;
    },
    setStyleText: function(sendData) {
      this.customStyle.title = sendData;
    },
  },
};
</script>
