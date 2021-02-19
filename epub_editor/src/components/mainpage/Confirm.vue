<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="350"
      persistent
    >
      <v-card>
        <v-card-title class="ml-1" style="font-size: 2em">
          {{ $t(`${title}`) }}
        </v-card-title>

        <templete v-if="content2==''">
          <v-card-text style="padding: 3% 6% 3% 8%">
            <p>{{ $t(`${content1}`) }}</p>
          </v-card-text>
        </templete>

        <templete v-if="content2!==''">
          <v-card-text style="padding: 3% 6% 3% 8%">
            <p>{{ $t(`${content1}`) }}</p>
            <p>{{ $t(`${content2}`) }}</p>
          </v-card-text>
        </templete>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            text
            @click="cancelButton"
          >
            {{ $t(`${cancel}`) }}
          </v-btn>

          <v-btn
            color="primary"
            text
            @click="confirmButton"
          >
            {{ $t(`${confirm}`) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "Confirm",
  props: ['dialog', 'title', 'confirm', 'cancel', 'content1', 'content2'],
  computed: {
  },
  methods: {
    // 취소 버튼
    cancelButton: function () {
      this.$emit("cancel");
    },
    
    // 확인 버튼
    confirmButton: function () {
      this.$emit("confirm");
    },
  }
}
</script>

<style>

</style>