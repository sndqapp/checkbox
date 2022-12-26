export default {
  editor: {
    label: {
      en: "Toggle",
    },
    deprecated: "Use sndq-toggle-{x} element with the highest x"

  },
  triggerEvents: [
    {
      name: "change",
      label: {
        en: "On Change",
      },
      event: {
        value: "",
      },
      default: true,
    },
    {
      name: "initValueChange",
      label: {
        en: "On Init value change",
      },
      event: {
        value: "",
      },
    },
  ],

  properties: {
    about: {
      label: "sndq-toggle",
      type: "Info",
      editorOnly: true,
      options: {
          text: {
              en: "v0.0.7"
          }
      }
  },
    variant: {
      label: {
        en: "Variant",
      },
      type: "TextSelect",
      defaultValue: "checkbox",
      options: {
        options: [
          { label: "Checkbox", value: "checkbox" },
          { label: "Switch", value: "switch" },
        ],
      },
    },
    value: {
      label: {
        en: "Init value",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Yes/No",
      },
      /* wwEditor:end */
    },
    required: {
      label: {
        en: "Required",
      },
      section: "settings",
      type: "OnOff",
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Yes/No",
      },
      /* wwEditor:end */
    },
    disabled: {
      label: {
        en: "Disabled",
      },
      section: "settings",
      type: "OnOff",
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Yes/No",
      },
      /* wwEditor:end */
    },
    hideLabel: {
      label: {
        en: "Hide Label",
      },
      type: "OnOff",
      bindable: true,
      defaultValue: false,
      /* wwEditor:start */
      bindingValidation: {
        type: "boolean",
        tooltip: "Yes/No",
      },
      /* wwEditor:end */
    },
    labelElement: {
      hidden: true,
      defaultValue: [
        {
          isWwObject: true,
          type: "ww-text",
          state: {
            name: "Label",
          },
          content: { text: "Label" },
        },
      ],
    },
  },
};
