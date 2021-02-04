<template>
  <div>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click="edit('undo')"><v-icon medium>mdi-undo</v-icon></v-btn></template>
      <span>undo</span>
    </v-tooltip>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click="edit('redo')"><v-icon medium>mdi-redo</v-icon></v-btn></template>
      <span>redo</span>
    </v-tooltip>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click="edit('cut')"><v-icon medium>mdi-content-cut</v-icon></v-btn></template>
      <span>cut</span>
    </v-tooltip>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click="edit('copy')"><v-icon medium>mdi-content-copy</v-icon></v-btn></template>
      <span>copy</span>
    </v-tooltip>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click="edit('paste')"><v-icon medium>mdi-content-paste</v-icon></v-btn></template>
      <span>paste</span>
    </v-tooltip>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click.stop="findDialog = true" text><v-icon medium>mdi-file-find-outline</v-icon></v-btn></template>
      <span>find</span>
    </v-tooltip>
    <v-tooltip bottom><template v-slot:activator="{ on }">
      <v-btn v-on="on" icon medium @click.stop="replaceDialog = true" text><v-icon medium>mdi-find-replace</v-icon></v-btn></template>
      <span>replace</span>
    </v-tooltip>

    <Dialog
      :isDialog = "findDialog"
      title = "단어 찾기"
      labelText = "찾고싶은 단어"
      :dialogMethod = "find"
      @toggle-dialog = "findDialog = false"
    />
    
    <!-- replace dialog -->
    <v-dialog v-model="replaceDialog" max-width="500">
      <v-card>
        <v-card-title class="headline header-color">단어 변환</v-card-title>
        <v-card-text class="d-flex flex-row mt-4 pa-0">
          <v-text-field class="my-3 mx-5" label="찾고 싶은 단어" v-model="findText" required></v-text-field>
          <v-icon>mdi-arrow-right</v-icon>
          <v-text-field class="my-3 mx-5" label="바꾸고 싶은 단어" v-model="replaceText" required></v-text-field>
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
          <v-btn text @click="replace(findText, replaceText, replaceAlphabet, replaceAllText); replaceDialog = false;" style="color: #423F8C;">
            단어 변환
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
import eventBus from '@/eventBus.js';
import Dialog from '@/components/mainpage/Dialog';
export default {
  name: 'EditTab',
  data: function () {
    return {
      findDialog: false,
      replaceDialog: false,
      findText: '',
      replaceText: '',
      replaceAlphabet: false,
      replaceAllText: false,
    }
  },
  components: {
    Dialog
  },
  methods: {
    edit: function(res){
      eventBus.$emit('edit', res);
    },

    // 찾기
    find: function (findText) {
      this.findDialog = false;
      eventBus.$emit('findText', findText);
    },
    
    // 문자 대체하기
    replace: function (findText, replaceText, replaceAlphabet, replaceAllText) {
      this.find(findText);
      eventBus.$emit('replaceText', [replaceText, replaceAlphabet, replaceAllText]);
    },
  }
}
</script>
