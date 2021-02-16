<template>
  <div id="textarea">
    <iframe
      v-show="getUserMode"
      id="iframeArea"
      style="width:100%; height:100%;"
      marginwidth="3"
      marginheight="1"
    ></iframe>
    <v-textarea
      v-show="!getUserMode"
      id="area"
      solo
      hide-details
      spellcheck="false"
      style="width: auto; border-radius: 0%;"
      ma-auto
      height="100%"
      no-resize
      v-model="inputText"
    ></v-textarea>
    <div contentEditable="true" v-show="!getUserMode" height="100%"
      id="area"></div>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
// // import { readDirectory, tocToList } from "@/functions/file.js";
// import * as textStyle from "@/functions/text-style.js";
// import * as edit from "@/functions/edit.js";
import * as exec from "@/functions/exec-command.js";

export default {
  name: "Textarea",
  components: {},
  data: function() {
    return {
      inputText: "",
    };
  },
  mounted: function() {
    if (this.getUserMode) {
      var HTMLEDITOR = document.getElementById("iframeArea");
      var editorObj = HTMLEDITOR.innerHTML;
      window.onload = function() {
        if (
          editorObj.body &&
          editorObj.body.contentEditable != undefined &&
          window.ActiveXObject
        ) {
          editorObj.body.contentEditable = "true";
        } else {
          editorObj.designMode = "on";
          editorObj.open();
          editorObj.writeln("<style>");
          editorObj.writeln("P {margin-top:2px; margin-left:2px;}");
          editorObj.writeln(
            "BODY {font-size:25px; font-family: kopub_bat_l; } spellcheck:false;"
          );
          editorObj.writeln("</style>");
          editorObj.writeln('<link href="C:\\ssafy\\s04p13a103\\epub_editor\\src\\assets\\style.css" rel="stylesheet" type="text/css" />');
          // editorObj.writeln("<\\/script>");
          editorObj.close();
        }
      };
      eventBus.$on("pushIndexData2", (res) => {
        exec.addStyle(res);
      });
    }
  },
  watch: {
    inputText: function(newVal) {
      let area = document.getElementById("area");
      area.scrollTop = area.scrollHeight;
      this.$store.dispatch("setEditingText", this.inputText);

      console.log(newVal);

      var HTMLEDITOR = document.getElementById("iframeArea");
      var editorObj = HTMLEDITOR.contentWindow.document;

      editorObj.designMode = "on";
      editorObj.open();
      editorObj.writeln("<style>");
      editorObj.writeln("P {margin-top:2px; margin-left:2px;}");
      editorObj.writeln(
        "BODY {font-size:25px; font-family: kopub_bat_l; } spellcheck:false;"
      );
      editorObj.writeln("</style>");
      editorObj.write(newVal);
      editorObj.close();
    },
  },
  computed: {
    getUserMode: function() {
      return this.$store.state.userMode;
    },
  },
  methods: {
    // attachTag: function(tag) {
    //   if (tag === 'p') this.inputText = textStyle.pTag();
    //   else if (tag === '')
    // }
  },
};
</script>
