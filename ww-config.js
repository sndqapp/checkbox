export default {
  editor: {
    label: {
      en: "Toggle",
    },
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
    aboutname: {
      label: "About",
      type: "Info",
      editorOnly: true,
      options: {
        text: {
          en: "checkbox",
        },
      },
    },
    aboutversion: {
      label: "Version",
      type: "Info",
      editorOnly: true,
      options: {
        text: {
          en: "3.0.6",
        },
      },
    },
    brand: {
      label: { en: 'Brand' },
      type: 'TextSelect',
      options: {
          options: [
              { value: 'sndq', label: { en: 'SNDQ' } },
              { value: 'struqta', label: { en: 'Struqta' } },
              { value: 'nuvoni', label: { en: 'Nuvoni' } },
              { value: 'immogeste', label: { en: 'Immogeste' } },
          ],
      },
      responsive: true,
      defaultValue: 'sndq',
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
          { label: "Radio", value: "radio" },
        ],
      },
    },
    radioTips: {
      type: "Info",
      options: {
        text: "Radio element cannot be disabled on click. You should bind the init value + listen on the change event to update the element status",
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
    indeterminate: {
      label: {
        en: "Indeterminate",
      },
      section: "settings",
      type: "Info",
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
          type: "0bb24f42-7f3c-4bdb-b30e-24092080bdac",
          state: {
            name: "Label",
          },
          content: { text: "Label" },
        },
      ],
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
    }
  }
};