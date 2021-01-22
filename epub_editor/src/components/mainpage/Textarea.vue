<template>
  <v-col>

    <div v-for="tag in hTags" :key="tag">
      <v-btn @click="attachHTag(tag)">{{'h' + tag}}</v-btn>
    </div>

    <v-btn @click="attachItalicTag()">Italic</v-btn>

    <v-textarea
    id="area"
    outlined
    height="35em"
    label="textarea 입니다"
    placeholder="책 내용을 작성해볼까요?"
    v-model="inputText"
    >
    </v-textarea>

  </v-col>

</template>

<script>
import {mapMutations} from "vuex";
import {hTag, italicTag} from '@/functions/text-style.js'

export default {
  data() {
    return {
      inputText : '',
      hTags: [1, 2, 3, 4, 5, 6]
    }
  },
  computed:{
  },
  methods:{
    ...mapMutations(["SET_EDITINGTEXT"]),
    attachHTag(index) {
       this.inputText = hTag(index);
    },
    attachItalicTag() {
      this.inputText = italicTag();
    }
  },
  watch:{
    inputText:function(){
      this.SET_EDITINGTEXT(this.inputText);
    }
  }
}
</script>

<style>

</style>