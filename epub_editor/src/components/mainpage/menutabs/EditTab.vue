<template>
  <!----------- EditTab menus ----------->
  <v-tabs class="ml-3" show-arrows v-model="tab">
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click="edit('undo')"
          ><v-icon medium>mdi-undo</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.undo") }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click="edit('redo')"
          ><v-icon medium>mdi-redo</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.redo") }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click="edit('cut')"
          ><v-icon medium>mdi-content-cut</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.cut") }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click="edit('copy')"
          ><v-icon medium>mdi-content-copy</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.copy") }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click="edit('paste')"
          ><v-icon medium>mdi-content-paste</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.paste") }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click.stop="openFindMenu"
          text
          ><v-icon medium>mdi-file-find-outline</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.find") }}</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          class="align-self-center rounded-sm"
          v-on="on"
          icon
          medium
          @click.stop="replaceDialog = true"
          text
          ><v-icon medium>mdi-find-replace</v-icon></v-btn
        >
      </template>
      <span>{{ $t("edittab.replace") }}</span>
    </v-tooltip>

    <!----------- replace dialog ----------->
    <v-dialog v-model="replaceDialog" max-width="400">
      <v-card>
        <DialogTitle
          title="edit-replace"
          @toggle-dialog="replaceDialog = false"
        />
        <v-card-text style="padding: 3% 6% 3% 6%">
          <v-container>
            <DialogInput
              labelText="edit-find"
              required="true"
              @changeData="setFindText"
              ref="findTextInput"
            />
            <v-row class="my-3">
              <v-icon large style="margin:auto;">mdi-arrow-down</v-icon>
            </v-row>
            <DialogInput
              labelText="edit-replace"
              required="true"
              @changeData="setReplaceText"
              ref="replaceTextInput"
            />
          </v-container>
          <v-container>
            <v-row class="ml-2">
              <v-col>
                <v-checkbox v-model="replaceAlphabet" label="Aa"></v-checkbox>
              </v-col>
              <v-col>
                <v-checkbox v-model="replaceAllText" label="All"></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <DialogButton buttonText="replace" :dialogMethod="replace" />
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
        <span
          v-show="this.findTextArray.length != 0"
          style="color: gray; margin:10px;"
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
import DialogButton from "@/components/Dialog/DialogButton";
import DialogInput from "@/components/Dialog/DialogInput";
import DialogTitle from "@/components/Dialog/DialogTitle";

export default {
  name: "EditTab",
  components: {
    DialogButton,
    DialogInput,
    DialogTitle,
  },
  data: function() {
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
    edit: function(res) {
      if (this.$store.state.selectedFileDirectory !== "") {
        eventBus.$emit("edit", res);
      } else {
        this.$store.dispatch(
          "setAlertMessage",
          "error.select-text"
        );
      }
    },
    // 찾기
    find: function() {
      if (this.$store.state.selectedFileDirectory !== "") {
        if (this.findText === "") {
          this.$store.dispatch("setAlertMessage", "error.find-input");
        } else {
          eventBus.$emit("findText", this.findText);
          this.findTextArray = this.$store.state.findTextArray;
          if (this.findTextArray.length === 0) {
            this.$store.dispatch("setAlertMessage", "error.find-word");
          } else {
            eventBus.$emit(
              "setCursor",
              this.findTextArray[this.findTextIndex],
              this.findText.length
            );
          }
        }
      } else {
        this.$store.dispatch(
          "setAlertMessage",
          "error.select-text"
        );
      }
    },
    openFindMenu: function() {
      if (this.$store.state.selectedFileDirectory !== "") {
        let findMenu = document.getElementById("findMenu");
        findMenu.style.display = "block";
      } else {
        this.$store.dispatch(
          "setAlertMessage",
          "error.select-text"
        );
      }
    },

    // 찾기 창 닫기
    closeFindMenu: function() {
      let findMenu = document.getElementById("findMenu");
      findMenu.style.display = "none";
      this.findText = "";
      this.findTextIndex = 0;
      this.findTextArray = [];
    },
    findUp: function() {
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

    findDown: function() {
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
    replace: function() {
      this.replaceDialog = false;
      let findText = this.findText;
      let replaceText = this.replaceText;
      let replaceAlphabet = this.replaceAlphabet;
      let replaceAllText = this.replaceAllText;
      if (this.$store.state.selectedFileDirectory !== "") {
        this.find(findText);
        eventBus.$emit("replaceText", [
          replaceText,
          replaceAlphabet,
          replaceAllText,
        ]);
        this.$store.dispatch(
          "setAlertMessage",
          "success.replace"
        );
        this.findText = "";
        this.replaceText = "";
        this.$refs.findTextInput.resetText();
        this.$refs.replaceTextInput.resetText();
      } else {
        this.$store.dispatch(
          "setAlertMessage",
          "select-text"
        );
      }
    },
    setFindText: function(sendData) {
      this.findText = sendData;
    },
    setReplaceText: function(sendData) {
      this.replaceText = sendData;
    },
  },
};
</script>
<style scoped>
.v-btn {
  min-width: 0;
  padding: 0;
}
</style>
