<template>
  <v-row>
    <v-text-field
      class="my-3"
      v-model="inputText"
      :label="label"
      :prepend-icon="icon"
      :rules="ruleText"
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
      label: "$t('dialoginput.'",
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
    this.label = this.label + this.labelText + ')';
  },
  methods: {
    resetText: function () {
      this.inputText = undefined;
    },
    sendData: function () {
      this.$emit("changeData", this.inputText);
    },
  },
};
</script>

<style></style>
