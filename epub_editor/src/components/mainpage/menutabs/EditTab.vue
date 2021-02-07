<template>
  <v-tabs show-arrows v-model="tab">
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click="edit('undo')"
          ><v-icon medium>mdi-undo</v-icon></v-btn
        ></template
      >
      <span>undo</span>
    </v-tooltip>
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click="edit('redo')"
          ><v-icon medium>mdi-redo</v-icon></v-btn
        ></template
      >
      <span>redo</span>
    </v-tooltip>
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click="edit('cut')"
          ><v-icon medium>mdi-content-cut</v-icon></v-btn
        ></template
      >
      <span>cut</span>
    </v-tooltip>
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click="edit('copy')"
          ><v-icon medium>mdi-content-copy</v-icon></v-btn
        ></template
      >
      <span>copy</span>
    </v-tooltip>
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click="edit('paste')"
          ><v-icon medium>mdi-content-paste</v-icon></v-btn
        ></template
      >
      <span>paste</span>
    </v-tooltip>
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click.stop="openFindMenu" text
          ><v-icon medium>mdi-file-find-outline</v-icon></v-btn
        ></template
      >
      <span>find</span>
    </v-tooltip>
    <v-tooltip bottom
      ><template v-slot:activator="{ on }">
        <v-btn class="align-self-center" v-on="on" icon medium @click.stop="replaceDialog = true" text
          ><v-icon medium>mdi-find-replace</v-icon></v-btn
        ></template
      >
      <span>replace</span>
    </v-tooltip>

    <!-- replace dialog -->
    <v-dialog v-model="replaceDialog" max-width="500">
      <v-card>
        <v-card-title class="header-color">단어 변환</v-card-title>
        <v-card-text class="d-flex flex-row mt-4 pa-0">
          <v-text-field
            class="my-3 mx-5"
            label="찾고 싶은 단어"
            v-model="findText"
            required
          ></v-text-field>
          <v-icon>mdi-arrow-right</v-icon>
          <v-text-field
            class="my-3 mx-5"
            label="바꾸고 싶은 단어"
            v-model="replaceText"
            required
          ></v-text-field>
        </v-card-text>
        <v-container>
          <v-row class="ml-2">
            <v-col cols="3">
              <v-checkbox v-model="replaceAlphabet" label="Aa"></v-checkbox>
            </v-col>
            <v-col cols="3">
              <v-checkbox v-model="replaceAllText" label="All"></v-checkbox>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="replaceDialog = false">
            취소
          </v-btn>
          <v-btn
            text
            @click="
              replace(findText, replaceText, replaceAlphabet, replaceAllText);
              replaceDialog = false;
            "
            style="color: #423f8c"
          >
            단어 변환
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-card id="findMenu" class="pa-2" flat>
      <v-toolbar dense floating>
        <v-text-field
          label="단어 찾기"
          v-model="findText"
          hide-details
          append-outer-icon="mdi-magnify"
          single-line
          @click:append-outer="find"
        ></v-text-field>
        <span v-show="this.findTextArray.length != 0" style="color: gray; margin:10px;"
          >{{ this.findTextIndex + 1 }} of {{ this.findTextArray.length }}</span
        >
        <v-btn icon small @click="findUp">
          <v-icon>mdi-chevron-up</v-icon>
        </v-btn>

        <v-btn icon small @click="findDown">
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>

        <v-btn icon small @click="closeFindMenu">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </v-tabs>
</template>

<script>
import eventBus from "@/eventBus.js";
export default {
  name: "EditTab",
  data: function () {
    return {
      tab: null,
      findDialog: false,
      replaceDialog: false,
      findText: "",
      replaceText: "",
      replaceAlphabet: false,
      replaceAllText: false,
      findTextArray: [],
      findTextIndex: 0,
    };
  },
  methods: {
    edit: function (res) {
      eventBus.$emit("edit", res);
    },

    // 찾기
    find: function () {
      eventBus.$emit("findText", this.findText);
      this.findTextArray = this.$store.state.findTextArray;
      eventBus.$emit(
        "setCursor",
        this.findTextArray[this.findTextIndex],
        this.findText.length
      );
    },
    openFindMenu: function () {
      let findMenu = document.getElementById("findMenu");
      findMenu.style.display = "block";
    },
    closeFindMenu: function () {
      let findMenu = document.getElementById("findMenu");
      findMenu.style.display = "none";
      this.findText = "";
      this.findTextIndex = 0;
      this.findTextArray = [];
    },
    findUp: function () {
      if (this.findTextIndex == 0) {
        eventBus.$emit(
          "setCursor",
          this.findTextArray[0],
          this.findText.length
        );
        return;
      } else {
        eventBus.$emit(
          "setCursor",
          this.findTextArray[--this.findTextIndex],
          this.findText.length
        );
      }
    },
    findDown: function () {
      if (this.findTextIndex == this.findTextArray.length - 1) {
        eventBus.$emit(
          "setCursor",
          this.findTextArray[this.findTextArray.length - 1],
          this.findText.length
        );
        return;
      } else {
        eventBus.$emit(
          "setCursor",
          this.findTextArray[++this.findTextIndex],
          this.findText.length
        );
      }
    },

    // 문자 대체하기
    replace: function (findText, replaceText, replaceAlphabet, replaceAllText) {
      this.find(findText);
      eventBus.$emit("replaceText", [
        replaceText,
        replaceAlphabet,
        replaceAllText,
      ]);
    },
  },
};
</script>