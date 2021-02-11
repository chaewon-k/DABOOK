<template>
  <v-row>
    <v-text-field
      class="my-3"
      v-model="inputText"
      label="$t('dialoginput.' + labelText)"
      :prepend-icon="icon"
      :rules="[rules.required]"
      @keyup="sendData()"
    >
    </v-text-field>
    {{ $t("dialoginput." + labelText) }}
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
        required: (value) => !!value || "필수 입력 항목입니다.",
        check: (value) => !this.checkExp(value) || "특수문자 사용불가",
      },
    };
  },
  created: function () {
    if (this.required && this.check)
      this.ruleText = "[rules.required, rules.check]";
    else if (this.required) this.ruleText = "[rules.required]";
    else if (this.check) this.ruleText = "[rules.check]";
  },
  methods: {
    resetText: function () {
      this.inputText = null;
    },
    sendData: function () {
      this.$emit("changeData", this.inputText);
    },
  },
};
</script>

<style></style>
