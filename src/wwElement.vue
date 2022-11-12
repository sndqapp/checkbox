<template v-if="content">
  <div class="sndq_checkbox">
    <div class="checkbox-row">
      <input
        type="checkbox"
        :disabled="content.disabled"
        :required="content.required"
        :checked="checked"
        @change="handleChange"
        @invalid.prevent="handleInvalidInput"
      />
      <wwElement v-bind="content.labelElement"></wwElement>
    </div>
    <div class="error-message" v-if="content.required && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { debounce } from "./utils";
export default {
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    handleInvalidInput(e) {
      this.errorMessage = e.target.validationMessage;
    },
    handleChange(e) {
      this.setChecked(e.target.checked);
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
      debounce,
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
  },
};
</script>

<style lang="scss" scoped>
@import "./sndq.scss";

.sndq_checkbox {
  font-family: Graphic, sans-serif;
  font-size: 14px;
  line-height: 24px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .checkbox-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }

  .error-message {
    color: get_color_with_shade($error, 700);
  }

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 24px;
    background: none;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    -o-appearance: none;

    &:before {
      opacity: 1;
      position: relative;
      display: block;
      width: 24px;
      height: 24px;
      content: "";
      background: get_color_with_shade($neutral, 50);
      border-radius: 4px;
      transition: 0.2s;
      border: 1px solid transparent;
    }

    &:after {
      opacity: 1;
      position: absolute;
      display: block;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 12px;
      height: 12px;
      border-radius: 50%;
      content: "";
    }

    &:focus-visible::before {
      border-color: get_color_with_shade($primary, 500);
      visibility: visible;
    }

    &:disabled {
      cursor: not-allowed;
    }

    &:disabled:before {
      background-color: get_color_with_shade($neutral, 300);
    }
    &:checked:after {
      background: url("./checkmark.svg") no-repeat center;
    }

    &:not(:disabled) {
      &:not(:checked):hover {
        &:before {
          background-color: get_color_with_shade($neutral, 100);
        }
      }
      &:checked:before {
        background-color: get_color_with_shade($primary, 700);
      }
    }
  }
}
</style>
