<template>
  <div id="textarea">
    <div class="buttons">
        <input type="button" class="BOLD" value="B" onclick="document.execCommand('bold'); " />
        <input type="button" class="ITALIC" value="Italic" onclick="document.execCommand('Italic')" />
        <input type="button" class="UNDERBAR" value="abc" onclick="document.execCommand('Underline')" />
        <input type="button" class="BAR" value="abc" onclick="document.execCommand('StrikeThrough')" />
        <input type="button" class="aignLeft" value="왼쪽 정렬" onclick="document.execCommand('justifyleft')" />
        <input type="button" class="aignCenter" value="가운데 정렬" onclick="document.execCommand('justifycenter')" />
        <input type="button" class="aignRight" value="오른쪽 정렬" onclick="document.execCommand('justifyright')" />
    </div>
    <div>
        <div id="editorDIV" contenteditable="true" style="height: 500px;">
        </div>
        <div id="editorHTMLDIV" contenteditable="true" style="height: 500px;">
        </div>
    </div>
    <div class="buttons">
        <input type="button" value="에디터로 보기" @click="convertToEditor" />
        <input type="button" value="HTML로 보기" @click="convertToHTML" />
    </div>
  </div>
</template>

<script>
import eventBus from "@/eventBus.js";
import * as exec from "@/functions/exec-command.js";
import $ from 'jquery'

export default {
  name: "Textarea",
  components: {},
  data: function() {
    return {
      inputText: "",
    };
  },
  mounted: function() {
    document.execCommand('defaultParagraphSeparator', false, 'p');
    $(document).ready(function () {
        $('.editorHTMLDIV').hide();
    });
    $('#editorDIV').execCommand("defaultParagraphSeparator", false, "p");
    eventBus.$on("pushIndexData2", (res) => {
      exec.addStyle(res);
    });
  },
  watch: {},
  computed: {},
  methods: {
    convertToHTML: function () {
      $('#editorHTMLDIV').text($('#editorDIV').html());
      $('#editorHTMLDIV').show();
      $('#editorDIV').hide();
    },
    convertToEditor: function () {
      $('#editorDIV').html($('#editorHTMLDIV').text());
      $('#editorDIV').show();
      $('#editorHTMLDIV').hide();
    },
  },
};
</script>
