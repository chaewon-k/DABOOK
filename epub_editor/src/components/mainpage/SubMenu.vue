<template>
  <div>
    <template v-if="itemIndex===0">
      <v-btn text>새 e-book 만들기</v-btn>
      <v-btn @click="loadEbook" text>e-book 불러오기</v-btn>
      <v-btn text>저장하기</v-btn>
      <v-btn text>다른 이름으로 저장하기</v-btn>
      <v-btn text>e-pub으로 내보내기</v-btn>
    </template>
    <template v-else-if="itemIndex===1">

      <v-btn @click="undo">취소하기</v-btn>
      <v-btn @click="redo">되돌리기</v-btn>
      <v-btn @click="cut">잘라내기</v-btn>
      <v-btn @click="copy">복사하기</v-btn>
      <v-btn @click="paste">붙여넣기</v-btn>
      <v-btn @click="find">찾기</v-btn>
      <v-btn @click="replace">바꾸기</v-btn>
      <br>
      찾을 단어 : <v-text-field clearable v-model="findText"></v-text-field>
      바꿀 단어 : <v-text-field clearable v-model="replaceText"></v-text-field>
      <v-checkbox v-model="replaceAlphabet" label="Aa"></v-checkbox>
      <v-checkbox v-model="replaceAllText" label="All"></v-checkbox>
       
    </template>
    <template v-else-if="itemIndex===2">
      <v-btn text>e-book 미리보기</v-btn>
      <v-btn text>e-book 확대하기</v-btn>
      <v-btn text>e-book 축소하기</v-btn>
    </template>
    <template v-else-if="itemIndex===3">
      <div class="d-flex justify-start">
        <div v-for="tag in hTags" :key="tag">
          <v-btn @click="selectHTag(tag)">{{'h' + tag}}</v-btn>
        </div>
        <v-btn @click="selectItalicTag()">Italic</v-btn>
      </div>
    </template>
    <template v-else>
      <v-btn text>editor 사용 설명서 보기</v-btn>
      <v-btn text>마크다운 설명서 보기</v-btn>
    </template>

  </div>
</template>

<script>
import { readDirectory, test3 } from '@/functions/file.js'
import eventBus from '@/eventBus.js'
import { mapMutations, mapState } from 'vuex'
const { dialog } = require('electron').remote

export default {
  name: 'SubMenu',
  data() {
    return {
      hTags: [1, 2, 3, 4, 5, 6],
      
      /* itemIndex 1 : 편집 */
      findText:'',
      findIndexArray:[],
      replaceText:'',
      replaceAlphabet:false,
      replaceAllText:false,
    }
  },
  computed:{
    ...mapState(["editingText"]),
  },
  methods: {
    ...mapMutations(["SET_EDITINGTEXT"]),
    selectHTag: function(index) {
      eventBus.$emit('pushIndexData', index);
    },
    selectItalicTag: function () {
      eventBus.$emit('pushIndexData', 'Italic');
    },
    loadEbook: function () {
      const options = {
        properties: ['openDirectory']
      }
      const r = dialog.showOpenDialogSync(options)
      if (!r) return
      this.$store.state.currentDirectory = readDirectory(r[0], [])
    },
    test: function () {
      test3()
    },


    /* 
      < itemIndex 1 : 편집 >
      cut/copy : 드래그 필수,
      paste : chrome 환경에서 작동 안됨,
    */
    cut(){ //자르기
      document.execCommand('cut');
    },
    copy(){ //복사
      document.execCommand('copy');
    },
    paste(){ // 붙여넣기
      document.execCommand('paste');
    },
    undo(){ // 실행 취소
      document.execCommand('undo');
    },
    redo(){ // 실행 취소 되돌리기
      document.execCommand('redo');
    },
    find(){ //찾기
      this.findIndexArray=[];
      let index=0;
      console.log(this.editingText);
      do{
        index=this.editingText.indexOf(this.findText,index);
        if(index==-1)
          break;
        this.findIndexArray.push(index);
        index+=this.findText.length;
      }while(index<this.editingText.length);
      console.log(this.findIndexArray);
    },
    replace(){
      find();
      console.log("editingText: "+this.editingText);
      console.log("findText:"+this.findText);
      console.log("replaceText: "+this.replaceText);
      
      if(this.replaceAlphabet&&this.replaceAllText){
        //all change and allCaseReplace
        console.log("all change and all case replace");
        let reqularExpression=new RegExp(this.findText,"gi");
        let result=this.editingText.replace(reqularExpression,this.replaceText);
        this.SET_EDITINGTEXT(result);
      }
      else if(this.replaceAlphabet){
        //allCaseReplace
        console.log("all case replace");
        let reqularExpression=new RegExp(this.findData,"i");
        let result=this.editingText.replace(reqularExpression,this.replaceText);
        this.SET_EDITINGTEXT(result);
      }
      else if(this.replaceAllText){
        //allchange
        console.log("all change");
        let reqularExpression=new RegExp(this.findText,"g");
        let result=this.editingText.replace(reqularExpression,this.replaceText);
        this.SET_EDITINGTEXT(result);
      }
      else{
        //just one change
        console.log("one change");
        let result=this.editingText.replace(this.findText,this.replaceText);
        this.SET_EDITINGTEXT(result);
      }
    },

  },
  props: {
    itemIndex: { type: Number }
  },
}
</script>

<style>
.v-text-field{
  width: 150px;
}
</style>