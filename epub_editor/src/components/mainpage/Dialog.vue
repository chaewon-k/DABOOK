<template>
  <v-dialog v-model="isDialog" max-width="500">
      <v-card>
        <v-card-title class="headline header-color">{{ title }}</v-card-title>
        <v-card-text>
          <v-text-field class="my-3" :label="labelText" v-model="inputText"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="toggleDialog">
            취소
          </v-btn>
          <v-btn text @click="dialogMethod(inputText)" style="color: #423F8C;">
            {{ title }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: ['isDialog', 'title', 'labelText', 'inputText', 'dialogMethod'],
    created() {
        console.log(this.isDialog, this.title, this.labelText, this.inputText);
    },
    data() {
        return {
            changedText: ''
        }
    },
    methods: {
        toggleDialog() {
            this.$emit('toggle-dialog');
        }
    }

}
</script>

<style>

</style>