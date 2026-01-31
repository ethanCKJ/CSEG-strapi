import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Layouts, Page } from "@strapi/strapi/admin";
const NoPermissions = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: "Content"
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(Page.NoPermissions, {}) })
  ] });
};
export {
  NoPermissions
};
//# sourceMappingURL=NoPermissionsPage-DPIE9gSe.mjs.map
