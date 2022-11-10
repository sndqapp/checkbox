<template v-if="content">
  <div class="ww-input-checkbox sndq_input">
    <div class="input-group">
      <div class="input-group-flex">
        <div class="input-group__label">{{ content.label }}</div>
        <div
          v-if="this.content.descriptionLocation === 'leftlabel'"
          class="input-group__description"
        >
          {{ content.description }}
        </div>
        <span v-if="content.reddot" class="required"></span>
      </div>
      <div
        v-if="this.content.descriptionLocation === 'belowlabel'"
        class="input-group__description"
      >
        {{ content.description }}
      </div>
    </div>

    <div class="checkbox-group">
      <div v-if="content.allOption" class="entry">
        <Checkbox
          @click="handleAllClick"
          :status="allState"
          :ww-editor-state="wwEditorState"
        />

        <label>
          {{ this.content.allLabel }}
        </label>
      </div>
      <div :class="content.layout" class="container">
        <div v-for="(option, index) in options" :key="index" class="entry">
          <template v-if="option">
            <Checkbox
              @click="handleCheckboxClick($event, option)"
              :status="isSelected(option) ? 'checked' : 'unchecked'"
              :ww-editor-state="wwEditorState"
            />

            <component :is="isEditing ? 'div' : 'label'">
              <wwElement
                v-bind="content.choicesElement"
                :ww-props="{ text: this.optionLabel(option) }"
              />
            </component>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Checkbox from "./Checkbox.vue";
export default {
  components: { Checkbox },
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
    const { value: variableValue, setValue } =
      wwLib.wwVariable.useComponentVariable({
        uid: props.uid,
        name: "values",
        defaultValue: props.content.value || [],
      });
    return { variableValue, setValue, uniqueId: wwLib.wwUtils.getUid() };
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
    allState() {
      if (this.variableValue.length === 0) {
        return "unchecked";
      }
      if (this.variableValue.length === this.content.options.length) {
        return "checked";
      }
      return "intermediate";
    },
    options() {
      if (!this.content.options) return;
      let data = this.content.options;
      if (data && !Array.isArray(data) && typeof data === "object") {
        data = new Array(data);
      } else if ((data && !Array.isArray(data)) || typeof data !== "object") {
        return [];
      }

      return data
        .filter((item) => !!item)
        .map((item) => {
          if (typeof item !== "object") return { label: item, value: item };
          return {
            label: wwLib.wwLang.getText(
              item[this.content.labelField || "label"] || ""
            ),
            value: item[this.content.valueField || "value"],
          };
        });
    },
    values() {
      return this.options.map(
        (option) => option[this.content.valueField || "value"]
      );
    },
  },
  watch: {
    /* wwEditor:start */
    "content.options": {
      immediate: true,
      handler(options) {
        const objectOptions = (options || []).filter(
          (option) => option && typeof option === "object"
        );
        if (objectOptions[0]) {
          this.$emit("update:sidepanel-content", {
            path: "itemsProperties",
            value: Object.keys(objectOptions[0]),
          });
        } else {
          this.$emit("update:sidepanel-content", {
            path: "itemsProperties",
            value: [],
          });
        }
      },
    },
    "wwEditorState.sidepanelContent.itemsProperties"(
      newProperties,
      oldProperties
    ) {
      if (_.isEqual(newProperties, oldProperties)) return;
      if (
        this.wwEditorState.boundProps.options &&
        newProperties &&
        newProperties[0]
      ) {
        this.$emit("update:content:effect", {
          labelField: newProperties[0],
          valueField: newProperties[0],
        });
      } else {
        this.$emit("update:content:effect", {
          labelField: null,
          valueField: null,
        });
      }
    },
    "wwEditorState.boundProps.options"(isBind) {
      if (!isBind)
        this.$emit("update:content:effect", {
          labelField: null,
          valueField: null,
        });
    },
    /* wwEditor:end */
    "content.value"(newValue) {
      newValue = `${newValue}`;
      if (newValue === this.value) return;
      this.setValue(newValue);
      this.$emit("trigger-event", {
        name: "initValueChange",
        event: { value: newValue },
      });
    },
  },
  methods: {
    isSelected(option) {
      return this.variableValue.indexOf(this.optionValue(option)) !== -1;
    },

    optionLabel(option) {
      return option[this.content.labelField || "label"];
    },

    optionValue(option) {
      return option[this.content.valueField || "value"];
    },

    handleAllClick(event) {
      console.log(this.allState);
      if (this.allState === "unchecked") {
      this.setValue(this.values);
      } else {
        this.setValue([]);
      }
    },

    handleCheckboxClick(event, option) {
      if (this.isSelected(option)) {
        this.setValue(
          this.variableValue.filter(
            (value) => value !== this.optionValue(option)
          )
        );
      } else {
        this.setValue([...this.variableValue, this.optionValue(option)]);
      }
      this.$emit("trigger-event", {
        name: "change",
        event: { domEvent: event, value: this.variableValue },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sndq_input {
  font-family: Graphic, sans-serif;
}

.hidden {
  display: none;
}

.input-group {
  margin-bottom: 4px;
}

.input-group__label {
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  color: #121826;
  margin-right: 8px;
  height: 24px;
}

.input-group__description {
  color: #364052;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}

.bottomdescriptionbox {
  margin: 4px 0;
  padding: 0 8px;
}

.input-group-flex {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.required {
  width: 4px;
  height: 4px;
  background: #fd5754;
  border-radius: 3px;
}

.ww-input-checkbox {
  .checkbox-group {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
    margin-top: 16px;
  }

  .entry {
    gap: 8px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    column-gap: 24px;
    row-gap: 16px;
  }

  .container.horizontal {
    flex-direction: row;
  }
  .container.vertical {
    flex-direction: column;
  }
}
</style>
