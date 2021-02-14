<template>
  <div id="textarea">
    <v-btn @click="bold">하이</v-btn>
    <div contentEditable="true" id="area" style="height:100%;"></div>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
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
    let HTMLEDITOR = document.getElementById("area");
    let editorObj = HTMLEDITOR.innerHTML;
    HTMLEDITOR.execCommand("defaultParagraphSeparator", false, "p");

    eventBus.$on("pushIndexData2", (res) => {
      console.log(editorObj)
      exec.addStyle(res);
    });
  },
  watch: {},
  computed: {},
  methods: {
    bold: function() {
      let HTMLEDITOR = document.getElementById("area");
      let editorObj = HTMLEDITOR.value;
      editorObj.execCommand("Bold", false, null);
    },
  },
};
</script>
