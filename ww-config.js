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
      section: "settings",
      bindable: true,
      defaultValue: "Label",
    },
    description: {
      label: {
        en: "Description",
      },
      type: "Text",
      section: "settings",
      bindable: true,
      defaultValue: "Description",
    },
    descriptionLocation: {
      label: {
        en: "Description text location",
      },
      type: "TextSelect",
      options: {
        options: [
          {
            value: "belowlabel",
            label: {
              en: "Below label",
            },
          },
          {
            value: "leftlabel",
            label: {
              en: "Left label",
            },
          },
        ],
      },
      bindable: true,
      responsive: true,
      section: "settings",
      defaultValue: "belowlabel",
    },
    reddot: {
      label: {
        en: "Show the red dot",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
    },
    allOption: {
      label: {
        en: "Show select all toggle",
      },
      type: "OnOff",
      section: "settings",
      defaultValue: false,
    },
    allLabel: {
      label: {
        en: "Label for select all toggle",
      },
      type: "Text",
      bindable: true,
      section: "settings",
      defaultValue: "All",
    },
    layout: {
      label: {
        en: "Option layout",
      },
      type: "TextSelect",
      options: {
        options: [
          {
            value: "horizontal",
            label: {
              en: "Horizontal",
            },
          },
          {
            value: "vertical",
            label: {
              en: "Vertical",
            },
          },
        ],
      },
      bindable: true,
      responsive: true,
      section: "settings",
      defaultValue: "horizontal",
    },

    options: {
      label: {
        en: "Choices values",
        fr: "Choices values",
      },
      type: "Array",
      section: "settings",
      options: {
        item: {
          type: "Object",
          options: {
            item: {
              label: {
                label: {
                  en: "Label",
                },
                bindable: true,
                type: "Text",
                options: {
                  placeholder: "Label",
                },
                defaultValue: "New Option Label",
              },
              value: {
                label: {
                  en: "Value",
                },
                bindable: true,
                type: "Text",
                options: {
                  placeholder: "Value",
                },
                defaultValue: "New Option Value",
              },
            },
          },
        },
      },
      defaultValue: [
        {
          value: "first value",
          label: "First label",
        },
        {
          value: "second value",
          label: "Second label",
        },
      ],
      multilang: true,
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip:
          'A collection of data in array format: \n\n `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
      },
      /* wwEditor:end */
    },
    value: {
      label: {
        en: "Init value",
      },
      type: "Array",
      section: "settings",
      options: {
        item: {
          type: "Text",
        }
      },
      bindable: true,
      defaultValue: [],
      /* wwEditor:start */
      bindingValidation: {
        type: "array",
        tooltip:
          'A collection of data in array format: \n\n `[{}, {}, ...] || ["string1", "string2", ...] || [1, 2, ...]`',
      },
      /* wwEditor:end */
    },
    labelField: {
      hidden: (content, sidepanelContent, boundProps) =>
        !boundProps.options ||
        !content.options ||
        (content.options && typeof content.options[0] !== "object"),
      label: {
        en: "Label field",
        fr: "Label field",
      },
      type: "TextSelect",
      options: (content, sidepanelContent) => {
        const data = content.options;
        const options = sidepanelContent.itemsProperties
          .map((item) => {
            return data &&
              (typeof data[0][item] === "string" ||
                typeof data[0][item] === "number")
              ? {
                  value: item,
                  label: {
                    en: item,
                  },
                }
              : null;
          })
          .filter((item) => !!item);

        return {
          options: [
            {
              value: null,
              label: {
                en: "Select a property",
              },
            },
            ...options,
          ],
        };
      },
      defaultValue: null,
      section: "settings",
    },
    valueField: {
      hidden: (content, sidepanelContent, boundProps) =>
        !boundProps.options ||
        !content.options ||
        (content.options && typeof content.options[0] !== "object"),
      label: {
        en: "Value field",
        fr: "Value field",
      },
      type: "TextSelect",
      options: (content, sidepanelContent) => {
        const options = sidepanelContent.itemsProperties
          .map((item) => {
            return {
              value: item,
              label: {
                en: item,
              },
            };
          })
          .filter((item) => !!item);

        return {
          options: [
            {
              value: null,
              label: {
                en: "Select a property",
              },
            },
            ...options,
          ],
        };
      },
      defaultValue: null,
      section: "settings",
    },
    choicesElement: {
      hidden: true,
      defaultValue: {
        isWwObject: true,
        type: "ww-text",
      },
    },
    itemsProperties: {
      hidden: true,
      defaultValue: [],
      editorOnly: true,
    },
  },
};
