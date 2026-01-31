import { useRef, useEffect } from "react";
import { jsxs, jsx } from "react/jsx-runtime";
import { User } from "@strapi/icons";
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
const PLUGIN_ID = "membership-list";
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const MembershipIcon = () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", fontSize: "16px", gap: "8px" }, children: [
  /* @__PURE__ */ jsx(User, { width: 20, height: 20 }),
  /* @__PURE__ */ jsx("span", { children: "Membership List" })
] });
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/custom-content-manager3/collection-types/api::member.member`,
      icon: MembershipIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID
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
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("../_chunks/en-BYaYhvJn.mjs") }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          try {
            const baseLocale = locale.split("-")[0];
            const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => import("../_chunks/en-BYaYhvJn.mjs") }), `./translations/${baseLocale}.json`, 3);
            return { data, locale };
          } catch {
            return { data: {}, locale };
          }
        }
      })
    );
  }
};
export {
  index as default
};
