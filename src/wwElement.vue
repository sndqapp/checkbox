<template v-if="content">
  <div class="briicks-toggle" :class="[this.content.brand]">
    <div class="toggle-row">
      <input
        class="toggle-input"
        ref="input"
        :class="{ [content.variant]: true, pressed, editing: isEditing }"
        :type="content.variant === 'radio' ? 'radio' : 'checkbox'"
        :disabled="content.disabled"
        :required="content.required"
        :checked="checked"
        @mousedown="pressed = true"
        @mouseup="pressed = false"
        @change="handleChange"
        @invalid.prevent="handleInvalidInput"
      />
      <wwLayout
        path="labelElement"
        direction="row"
        class="label"
        v-if="!content.hideLabel"
      />
    </div>
    <div class="error-message" v-if="content.required && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: "",
      pressed: false,
    };
  },
  methods: {
    handleInvalidInput(e) {
      this.errorMessage = e.target.validationMessage;
    },
    handleChange(e) {
      this.setChecked(e.target.checked);
      this.$emit("trigger-event", {
        name: "change",
        event: { value: e.target.checked },
      });
      this.errorMessage = "";
      e.target.reportValidity();
    },
  },
  props: {
    content: { type: Object, required: true },
    /* wwEditor:start */
    wwEditorState: { type: Object, required: true },
    /* wwEditor:end */
    wwElementState: { type: Object, required: true },
    uid: { type: String, required: true },
  },
  emits: ["trigger-event", "update:content:effect", "update:sidepanel-content"],
  setup(props) {
    const { value: checked, setValue: setChecked } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: "checked",
        type: "boolean",
        defaultValue: props.content.value,
      });
    return {
      checked,
      setChecked,
      uniqueId: wwLib.wwUtils.getUid(),
    };
  },
  computed: {
    isEditing() {
      /* wwEditor:start */
      return (
        this.wwEditorState.editMode === wwLib.wwEditorHelper.EDIT_MODES.EDITION
      );
      /* wwEditor:end */
      // eslint-disable-next-line no-unreachable
      return false;
    },
  },
  watch: {
    "content.value"(newValue) {
      if (newValue === this.value) return;
      this.setChecked(newValue);

      this.errorMessage = "";

      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
    "content.indeterminate"(value, oldValue) {
      if (value !== oldValue) {
        this.$refs.input.indeterminate = value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~briicks-design/styles/const";
@import "./element.scss";

@each $brand in $brands {
  .briicks-toggle.#{$brand} {
    @include briicks-toggle($brand);
  }
}
</style>
