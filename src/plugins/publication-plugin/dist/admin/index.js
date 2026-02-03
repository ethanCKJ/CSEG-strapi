"use strict";
const react = require("react");
const jsxRuntime = require("react/jsx-runtime");
const icons = require("@strapi/icons");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "publication-plugin";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", fontSize: "16px", gap: "8px" }, children: [
  /* @__PURE__ */ jsxRuntime.jsx(icons.File, { width: 20, height: 20 }),
  /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Publications" })
] });
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/custom-content-manager3/collection-types/api::publication.publication`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "CSEG Publications"
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("../_chunks/en-Cz1iFDIV.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          try {
            const baseLocale = locale.split("-")[0];
            const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("../_chunks/en-Cz1iFDIV.js")) }), `./translations/${baseLocale}.json`, 3);
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }
      })
    );
  }
};
module.exports = index;
