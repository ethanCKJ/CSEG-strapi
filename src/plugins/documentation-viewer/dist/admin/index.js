"use strict";
const react = require("react");
const PLUGIN_ID = "documentation-viewer";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const index = {
  register(app) {
    app.customFields.register({
      name: "doc-viewer",
      pluginId: "documentation-viewer",
      type: "string",
      intlLabel: {
        id: "documentation-viewer.label",
        defaultMessage: "Documentation Viewer"
      },
      intlDescription: {
        id: "documentation-viewer.description",
        defaultMessage: "Display markdown documentation"
      },
      components: {
        Input: async () => Promise.resolve().then(() => require("../_chunks/Input-CE10xWhl.js"))
      },
      options: {
        base: [{
          sectionTitle: {
            id: "documentation-viewer.section",
            defaultMessage: "Documentation"
          },
          items: [
            {
              name: "options.documentId",
              type: "text",
              intlLabel: {
                id: "documentation-viewer.documentId.label",
                defaultMessage: "Document ID"
              },
              description: {
                id: "documentation-viewer.documentId.description",
                defaultMessage: "Enter the documentId from api::documentation"
              }
            },
            {
              name: "options.dividerText",
              require: false,
              type: "text",
              intlLabel: {
                id: "documentation-viewer.divider.label",
                defaultMessage: "Divider text"
              },
              description: {
                id: "documentation-viewer.documentId.description",
                defaultMessage: "Section divider text"
              }
            },
            {
              intlLabel: {
                id: "documentation-viewer.type.label",
                defaultMessage: "Component Type"
              },
              description: {
                id: "documentation-viewer.type.description",
                defaultMessage: "Markdown renders plain markdown by searching api::documentation.documentation for a documentId. Accordion is the same as Markdown but uses Accordion. Divider is hr"
              },
              name: "options.type",
              type: "select",
              value: "markdown",
              options: [
                {
                  key: "accordion",
                  value: "accordion",
                  metadatas: {
                    intlLabel: {
                      id: "documentation-viewer.component-type.accordion",
                      defaultMessage: "Accordion"
                    }
                  }
                },
                {
                  key: "markdown",
                  value: "markdown",
                  metadatas: {
                    intlLabel: {
                      id: "documentation-viewer.component-type.markdown",
                      defaultMessage: "Markdown"
                    }
                  }
                },
                {
                  key: "divider",
                  value: "divider",
                  metadatas: {
                    intlLabel: {
                      id: "documentation-viewer.component-type.divider",
                      defaultMessage: "Divider"
                    }
                  }
                }
              ]
            }
          ]
        }]
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  }
  // async registerTrads({ locales }: { locales: string[] }) {
  //   return Promise.all(
  //     locales.map(async (locale) => {
  //       try {
  //         const { default: data } = await import(`./translations/${locale}.json`);
  //
  //         return { data, locale };
  //       } catch {
  //         return { data: {}, locale };
  //       }
  //     })
  //   );
  // },
};
module.exports = index;
