<template>
  <v-row>
    <v-text-field
      class="my-3"
      v-model="inputText"
      :label="GET_DIALOG_INPUT"
      :prepend-icon="icon"
      :rules="[rules.required]"
      @keyup="sendData()"
    >
    </v-text-field>
  </v-row>
</template>

<script>
export default {
  name: "DialogInput",
  props: ["labelText", "icon", "required", "check"],
  data: function () {
    return {
      inputText: "",
      ruleText: "",
      rules: {
        required: (value) => !!value || this.GET_RULE_TEXT,
      },
    };
  },
  computed: {
    GET_DIALOG_INPUT() {
      return this.$t("dialoginput." + this.labelText);
    },
    GET_RULE_TEXT() {
      return this.$t("message.required");
    }
  },
  methods: {
    // resetText: function () {
    //   this.inputText = '';
    // },
    sendData: function () {
      this.$emit("changeData", this.inputText);
    },
  },
};
</script>

<style></style>
