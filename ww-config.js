export default {
  editor: {
    label: {
      fr: "Choix de Formulaire",
      en: "Checkbox Group",
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
    label: {
      label: {
        en: "Label",
      },
      type: "Text",
      bindable: true,
      defaultValue: "Label",
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
  },
};
