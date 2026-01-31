"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const NoPermissions = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Header,
      {
        title: "Content"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.NoPermissions, {}) })
  ] });
};
exports.NoPermissions = NoPermissions;
//# sourceMappingURL=NoPermissionsPage-BlWWMAeJ.js.map
