<template v-if="content">
  <div class="sndq_toggle">
    <div class="toggle-row">
      <input
        ref="input"
        :class="{ [content.variant]: true, pressed, editing: isEditing }"
        type="checkbox"
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
@import "briicks-design/styles/typography";
@import "briicks-design/styles/colors";

.sndq_toggle {
  @include typo(h6);

  $brand: sndq;

  display: flex;
  flex-direction: column;
  gap: 4px;

  .toggle-row {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 8px;
  }

  .label {
    flex: 1;
  }

  .error-message {
    color: brand-color($brand, error, 700);
  }

  input[type="checkbox"] {
    position: relative;
    background: none;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    -moz-appearance: none;
    -webkit-appearance: none;
    -o-appearance: none;

    &.editing {
      pointer-events: none;
    }

    &.checkbox {
      width: 24px;
      height: 24px;

      &:before {
        position: relative;
        display: block;
        width: 24px;
        height: 24px;
        content: "";
        background: brand-color($brand, neutral, 50);
        border-radius: 4px;
        transition: background-color 0.2s, border 0.2s;
        border: 1px solid transparent;
      }

      &:after {
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
        border-color: brand-color($brand, primary, 600);
      }

      &.pressed::before {
        background-color: brand-color($brand, neutral, 200);
      }

      &:hover:before {
        background-color: brand-color($brand, neutral, 100);
      }

      &:checked {
        &:before {
          background-color: brand-color($brand, primary, 700);
        }
        &:after {
          background: url("checkmark.svg") no-repeat center;
        }
      }

      &:indeterminate {
        &:before {
          background-color: brand-color($brand, primary, 700);
        }
        &:after {
          background: url("indeterminate.svg") no-repeat center;
        }
      }

      &:disabled {
        cursor: not-allowed;
        &:before {
          background-color: brand-color($brand, neutral, 300);
        }
      }
    }

    &.switch {
      width: 40px;
      height: 24px;

      &:before {
        position: relative;
        display: block;
        width: 40px;
        height: 24px;
        content: "";
        background: brand-color($brand, neutral, 50);
        border-radius: 16px;
        transition: background-color 0.2s;
        border: 1px solid transparent;
      }

      &:after {
        position: absolute;
        display: block;
        top: 50%;
        left: 2px;
        transform: translateY(-50%);
        background-color: brand-color($brand, neutral, 900);
        width: 20px;
        height: 20px;
        border-radius: 50%;
        transition: 0.2s;

        content: "";
      }

      &:focus-visible,
      &.pressed {
        &::before {
          background-color: brand-color($brand, neutral, 200);
        }
      }

      &:checked {
        &:after {
          background-color: brand-color($brand, neutral, 0);
          left: 18px;
        }
        &:before {
          background-color: brand-color($brand, primary, 700);
        }
      }

      &:indeterminate {
        &:before {
          background-color: brand-color($brand, primary, 700);
        }
        &:after {
          left: 9px;
        }
      }
      &:disabled {
        cursor: not-allowed;
        &:before {
          background-color: brand-color($brand, neutral, 500);
        }
        &:after {
          background-color: brand-color($brand, neutral, 700);
        }
      }
    }
  }
}
</style>
