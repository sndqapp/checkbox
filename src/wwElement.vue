<template v-if="content">
  <div class="sndq_input">
    <input type="checkbox" :disabled="content.disabled" />
    <div class="label">
      {{ content.label }}
    </div>
  </div>
</template>

<script>
export default {
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
        defaultValue: false,
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
    options() {},
    values() {
      return this.options.map(
        (option) => option[this.content.valueField || "value"]
      );
    },
  },
  watch: {
    "content.value"(newValue) {
      if (newValue === this.value) return;
      this.setChecked(newValue);
      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
  },
  methods: {
    isSelected(option) {
      return this.checked.indexOf(this.optionValue(option)) !== -1;
    },

    optionLabel(option) {
      return option[this.content.labelField || "label"];
    },

    optionValue(option) {
      return option[this.content.valueField || "value"];
    },

    handleAllClick(event) {
      if (this.allState === "unchecked") {
        this.setChecked(this.values);
      } else {
        this.setChecked([]);
      }
    },

    handleCheckboxClick(event, option) {
      if (this.isSelected(option)) {
        this.setChecked(
          this.checked.filter((value) => value !== this.optionValue(option))
        );
      } else {
        this.setChecked([...this.checked, this.optionValue(option)]);
      }
      this.$emit("trigger-event", {
        name: "change",
        event: { domEvent: event, value: this.checked },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./sndq.scss";

.sndq_input {
  font-family: Graphic, sans-serif;
  display: flex;
  align-items: center;
  gap: 8px;

  input[type="checkbox"] {
    position: relative;
    width: 24px;
    height: 24px;
    background: none;
    visibility: hidden;

    &:before {
      visibility: visible;
      position: relative;
      display: block;
      width: 24px;
      height: 24px;
      content: "";
      background: get_color_with_shade($neutral, 50);
      border-radius: 4px;
      transition: 0.2s;
    }

    &:after {
      visibility: visible;
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

    &:focus-within {
      border: 1px solid get_color_with_shade($primary, 500);
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
