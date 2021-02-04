<template>
  <v-dialog v-model="isDialog" max-width="500" @click:outside="toggleDialog(); resetDialog();">
    <v-card>
      <v-card-title class="headline header-color">{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field class="my-3" :label="labelText" v-model="inputText" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="toggleDialog">
          취소
        </v-btn>
        <v-btn text @click="dialogMethod(inputText); resetDialog();" style="color: #423F8C;">
          {{ title }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Dialog',
  data: function () {
    return {
      inputText: ''
    };
  },
  props: ['isDialog', 'title', 'labelText', 'dialogMethod'],
  methods: {
      toggleDialog() {
        this.$emit('toggle-dialog');
      },
      resetDialog() {
        this.inputText = ''
      }
  }
}
</script>