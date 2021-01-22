<template>
  <v-col>
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
import eventBus from '@/eventBus.js'
import {hTag, italicTag} from '@/functions/text-style.js'

export default {
  data() {
    return {
      inputText : '',
    }
  },
  created() {
    eventBus.$on('pushIndexData', res => {
      if (res === 'Italic') {
        this.attachItalicTag()
      } else {
        this.attachHTag(res)
      }
    })
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