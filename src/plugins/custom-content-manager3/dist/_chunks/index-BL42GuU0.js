"use strict";
const toolkit = require("@reduxjs/toolkit");
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const reactRouterDom = require("react-router-dom");
const admin = require("@strapi/strapi/admin");
require("prismjs");
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
const PLUGIN_ID$1 = "custom-content-manager3";
const initialState = {
  collectionTypeLinks: [],
  components: [],
  fieldSizes: {},
  models: [],
  singleTypeLinks: [],
  isLoading: true
};
const appSlice = toolkit.createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialData(state, action) {
      const {
        authorizedCollectionTypeLinks,
        authorizedSingleTypeLinks,
        components,
        contentTypeSchemas,
        fieldSizes
      } = action.payload;
      state.collectionTypeLinks = authorizedCollectionTypeLinks.filter(
        ({ isDisplayed }) => isDisplayed
      );
      state.singleTypeLinks = authorizedSingleTypeLinks.filter(({ isDisplayed }) => isDisplayed);
      state.components = components;
      state.models = contentTypeSchemas;
      state.fieldSizes = fieldSizes;
      state.isLoading = false;
    }
  }
});
const { actions, reducer: reducer$1 } = appSlice;
const { setInitialData } = actions;
const reducer = toolkit.combineReducers({
  app: reducer$1
});
const SINGLE_TYPES = "single-types";
const COLLECTION_TYPES = "collection-types";
const MEMBER_APPLICATION_MODEL = "api::member-application.member-application";
const APPLICATION_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected"
};
const ADMIN_HIDDEN_FIELDS = ["applicationStatus"];
const EVENT_MODEL = "api::event.event";
const ProtectedEditViewPage = React.lazy(
  () => Promise.resolve().then(() => require("./EditViewPage-CovlsIEx.js")).then((n) => n.EditViewPage).then((mod) => ({ default: mod.ProtectedEditViewPage }))
);
const ProtectedListViewPage = React.lazy(
  () => Promise.resolve().then(() => require("./ListViewPage-HvCUDnWe.js")).then((mod) => ({ default: mod.ProtectedListViewPage }))
);
const NoPermissions = React.lazy(
  () => Promise.resolve().then(() => require("./NoPermissionsPage-BlWWMAeJ.js")).then((mod) => ({ default: mod.NoPermissions }))
);
const ProtectedListMemberApplicationPage = React.lazy(
  () => Promise.resolve().then(() => require("./ListTabbedPage-rkYl9K24.js")).then((mod) => ({ default: mod.ProtectedListMemberApplicationPage }))
);
const CollectionTypePages = () => {
  const { collectionType, slug } = reactRouterDom.useParams();
  console.log("In router.tsx with params:", { collectionType, slug });
  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  if (slug === MEMBER_APPLICATION_MODEL) {
    return /* @__PURE__ */ jsxRuntime.jsx(ProtectedListMemberApplicationPage, {});
  }
  return collectionType === COLLECTION_TYPES ? /* @__PURE__ */ jsxRuntime.jsx(ProtectedListViewPage, {}) : /* @__PURE__ */ jsxRuntime.jsx(ProtectedEditViewPage, {});
};
const CLONE_RELATIVE_PATH = ":collectionType/:slug/clone/:origin";
const CLONE_PATH = `plugins/custom-content-manager3/${CLONE_RELATIVE_PATH}`;
const LIST_RELATIVE_PATH = ":collectionType/:slug";
const LIST_PATH = `plugins/custom-content-manager3/collection-types/:slug`;
const routes = [
  {
    path: LIST_RELATIVE_PATH,
    element: /* @__PURE__ */ jsxRuntime.jsx(CollectionTypePages, {})
  },
  {
    path: ":collectionType/:slug/:id",
    Component: ProtectedEditViewPage
  },
  // {
  //   path: CLONE_RELATIVE_PATH,
  //   Component: ProtectedEditViewPage,
  // },
  // {
  //   path: ':collectionType/:slug/configurations/list',
  //   Component: ProtectedListConfiguration,
  // },
  // {
  //   path: 'components/:slug/configurations/edit',
  //   Component: ProtectedComponentConfigurationPage,
  // },
  // {
  //   path: ':collectionType/:slug/configurations/edit',
  //   Component: ProtectedEditConfigurationPage,
  // },
  {
    path: "403",
    Component: NoPermissions
  }
  // {
  //   path: 'no-content-types',
  //   Component: NoContentType,
  // },
  // ...historyRoutes,
  // ...previewRoutes,
];
const prefixPluginTranslations = (trad, pluginId) => {
  return Object.keys(trad).reduce((acc, current) => {
    acc[`${pluginId}.${current}`] = trad[current];
    return acc;
  }, {});
};
const getTranslation = (id) => `content-manager.${id}`;
const PLUGIN_ID = "custom-content-manager3";
class ContentManagerPlugin {
  /**
   * The following properties are the stored ones provided by any plugins registering with
   * the content-manager. The function calls however, need to be called at runtime in the
   * application, so instead we collate them and run them later with the complete list incl.
   * ones already registered & the context of the view.
   */
  // bulkActions: BulkActionComponent[] = [...DEFAULT_BULK_ACTIONS];
  // documentActions: DocumentActionComponent[] = [
  //   ...DEFAULT_ACTIONS,
  //   ...DEFAULT_TABLE_ROW_ACTIONS,
  //   ...DEFAULT_HEADER_ACTIONS,
  // ];
  // editViewSidePanels: PanelComponent[] = [ActionsPanel];
  // headerActions: HeaderActionComponent[] = [];
  //
  // constructor() {}
  //
  // addEditViewSidePanel(panels: DescriptionReducer<PanelComponent>): void;
  // addEditViewSidePanel(panels: PanelComponent[]): void;
  // addEditViewSidePanel(panels: DescriptionReducer<PanelComponent> | PanelComponent[]) {
  //   if (Array.isArray(panels)) {
  //     this.editViewSidePanels = [...this.editViewSidePanels, ...panels];
  //   } else if (typeof panels === 'function') {
  //     this.editViewSidePanels = panels(this.editViewSidePanels);
  //   } else {
  //     throw new Error(
  //       `Expected the \`panels\` passed to \`addEditViewSidePanel\` to be an array or a function, but received ${getPrintableType(
  //         panels
  //       )}`
  //     );
  //   }
  // }
  //
  // addDocumentAction(actions: DescriptionReducer<DocumentActionComponent>): void;
  // addDocumentAction(actions: DocumentActionComponent[]): void;
  // addDocumentAction(
  //   actions: DescriptionReducer<DocumentActionComponent> | DocumentActionComponent[]
  // ) {
  //   if (Array.isArray(actions)) {
  //     this.documentActions = [...this.documentActions, ...actions];
  //   } else if (typeof actions === 'function') {
  //     this.documentActions = actions(this.documentActions);
  //   } else {
  //     throw new Error(
  //       `Expected the \`actions\` passed to \`addDocumentAction\` to be an array or a function, but received ${getPrintableType(
  //         actions
  //       )}`
  //     );
  //   }
  // }
  //
  // addDocumentHeaderAction(actions: DescriptionReducer<HeaderActionComponent>): void;
  // addDocumentHeaderAction(actions: HeaderActionComponent[]): void;
  // addDocumentHeaderAction(
  //   actions: DescriptionReducer<HeaderActionComponent> | HeaderActionComponent[]
  // ) {
  //   if (Array.isArray(actions)) {
  //     this.headerActions = [...this.headerActions, ...actions];
  //   } else if (typeof actions === 'function') {
  //     this.headerActions = actions(this.headerActions);
  //   } else {
  //     throw new Error(
  //       `Expected the \`actions\` passed to \`addDocumentHeaderAction\` to be an array or a function, but received ${getPrintableType(
  //         actions
  //       )}`
  //     );
  //   }
  // }
  //
  // addBulkAction(actions: DescriptionReducer<BulkActionComponent>): void;
  // addBulkAction(actions: BulkActionComponent[]): void;
  // addBulkAction(actions: DescriptionReducer<BulkActionComponent> | BulkActionComponent[]) {
  //   if (Array.isArray(actions)) {
  //     this.bulkActions = [...this.bulkActions, ...actions];
  //   } else if (typeof actions === 'function') {
  //     this.bulkActions = actions(this.bulkActions);
  //   } else {
  //     throw new Error(
  //       `Expected the \`actions\` passed to \`addBulkAction\` to be an array or a function, but received ${getPrintableType(
  //         actions
  //       )}`
  //     );
  //   }
  // }
  get config() {
    return {
      id: PLUGIN_ID,
      name: "Custom Content Manager",
      // injectionZones: INJECTION_ZONES,
      apis: {
        // addBulkAction: this.addBulkAction.bind(this),
        // addDocumentAction: this.addDocumentAction.bind(this),
        // addDocumentHeaderAction: this.addDocumentHeaderAction.bind(this),
        // addEditViewSidePanel: this.addEditViewSidePanel.bind(this),
        // getBulkActions: () => this.bulkActions,
        // getDocumentActions: (position?: DocumentActionPosition) => {
        //   /**
        //    * When possible, pre-filter the actions by the components static position property.
        //    * This avoids rendering the actions in multiple places where they weren't displayed,
        //    * which wasn't visible but created issues with useEffect for instance.
        //    * The response should still be filtered by the position, as the static property is new
        //    * and not mandatory to avoid a breaking change.
        //    */
        //   if (position) {
        //     return this.documentActions.filter((action) => {
        //       return action.position == undefined || [action.position].flat().includes(position);
        //     });
        //   }
        //
        //   return this.documentActions;
        // },
        // getEditViewSidePanels: () => this.editViewSidePanels,
        // getHeaderActions: () => this.headerActions,
      }
    };
  }
}
const index = {
  register(app) {
    const cm = new ContentManagerPlugin();
    app.addReducers({
      [PLUGIN_ID$1]: reducer
    });
    app.router.addRoute({
      path: "plugins/custom-content-manager3/*",
      lazy: async () => {
        const { Layout } = await Promise.resolve().then(() => require("./layout-B4qEk2wq.js"));
        return {
          Component: Layout
        };
      },
      children: routes
    });
    app.registerPlugin(cm.config);
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-BUUWXIYu.js")), "./translations/ca.json": () => Promise.resolve().then(() => require("./ca-Cmk45QO6.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-CkJy6B2v.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-CCEmbAah.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-DRCQ5GNB.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-B4FK7zPw.js")), "./translations/eu.json": () => Promise.resolve().then(() => require("./eu-VDH-3ovk.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-BvA-TbAU.js")), "./translations/gu.json": () => Promise.resolve().then(() => require("./gu-BRmF601H.js")), "./translations/hi.json": () => Promise.resolve().then(() => require("./hi-CCJBptSq.js")), "./translations/hu.json": () => Promise.resolve().then(() => require("./hu-sNV_yLYy.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-B5Ser98A.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-DkBIs7vD.js")), "./translations/ja.json": () => Promise.resolve().then(() => require("./ja-7sfIbjxE.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-woFZPmLk.js")), "./translations/ml.json": () => Promise.resolve().then(() => require("./ml-C2W8N8k1.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-BuFotyP_.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-bbEOHChV.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-uzwG-hk7.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-BiOz37D9.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-CeXQuq50.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-DZRJ-z5T.js")), "./translations/sa.json": () => Promise.resolve().then(() => require("./sa-CcvkYInH.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-CvY09Xjv.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("./sv-MYDuzgvT.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-D9_GfAjc.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-D9UH-O_R.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-l6ae-yv3.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-CJlYDheJ.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-Ds9l_goR.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-CQQfszqR.js")) }), `./translations/${locale}.json`, 3);
          return { data: prefixPluginTranslations(data, "content-manager"), locale };
        } catch {
          try {
            const baseLocale = locale.split("-")[0];
            const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => Promise.resolve().then(() => require("./ar-BUUWXIYu.js")), "./translations/ca.json": () => Promise.resolve().then(() => require("./ca-Cmk45QO6.js")), "./translations/cs.json": () => Promise.resolve().then(() => require("./cs-CkJy6B2v.js")), "./translations/de.json": () => Promise.resolve().then(() => require("./de-CCEmbAah.js")), "./translations/en.json": () => Promise.resolve().then(() => require("./en-DRCQ5GNB.js")), "./translations/es.json": () => Promise.resolve().then(() => require("./es-B4FK7zPw.js")), "./translations/eu.json": () => Promise.resolve().then(() => require("./eu-VDH-3ovk.js")), "./translations/fr.json": () => Promise.resolve().then(() => require("./fr-BvA-TbAU.js")), "./translations/gu.json": () => Promise.resolve().then(() => require("./gu-BRmF601H.js")), "./translations/hi.json": () => Promise.resolve().then(() => require("./hi-CCJBptSq.js")), "./translations/hu.json": () => Promise.resolve().then(() => require("./hu-sNV_yLYy.js")), "./translations/id.json": () => Promise.resolve().then(() => require("./id-B5Ser98A.js")), "./translations/it.json": () => Promise.resolve().then(() => require("./it-DkBIs7vD.js")), "./translations/ja.json": () => Promise.resolve().then(() => require("./ja-7sfIbjxE.js")), "./translations/ko.json": () => Promise.resolve().then(() => require("./ko-woFZPmLk.js")), "./translations/ml.json": () => Promise.resolve().then(() => require("./ml-C2W8N8k1.js")), "./translations/ms.json": () => Promise.resolve().then(() => require("./ms-BuFotyP_.js")), "./translations/nl.json": () => Promise.resolve().then(() => require("./nl-bbEOHChV.js")), "./translations/pl.json": () => Promise.resolve().then(() => require("./pl-uzwG-hk7.js")), "./translations/pt-BR.json": () => Promise.resolve().then(() => require("./pt-BR-BiOz37D9.js")), "./translations/pt.json": () => Promise.resolve().then(() => require("./pt-CeXQuq50.js")), "./translations/ru.json": () => Promise.resolve().then(() => require("./ru-DZRJ-z5T.js")), "./translations/sa.json": () => Promise.resolve().then(() => require("./sa-CcvkYInH.js")), "./translations/sk.json": () => Promise.resolve().then(() => require("./sk-CvY09Xjv.js")), "./translations/sv.json": () => Promise.resolve().then(() => require("./sv-MYDuzgvT.js")), "./translations/th.json": () => Promise.resolve().then(() => require("./th-D9_GfAjc.js")), "./translations/tr.json": () => Promise.resolve().then(() => require("./tr-D9UH-O_R.js")), "./translations/uk.json": () => Promise.resolve().then(() => require("./uk-l6ae-yv3.js")), "./translations/vi.json": () => Promise.resolve().then(() => require("./vi-CJlYDheJ.js")), "./translations/zh-Hans.json": () => Promise.resolve().then(() => require("./zh-Hans-Ds9l_goR.js")), "./translations/zh.json": () => Promise.resolve().then(() => require("./zh-CQQfszqR.js")) }), `./translations/${baseLocale}.json`, 3);
            return { data: prefixPluginTranslations(data, "content-manager"), locale };
          } catch {
            return { data: {}, locale };
          }
        }
      })
    );
  }
};
exports.ADMIN_HIDDEN_FIELDS = ADMIN_HIDDEN_FIELDS;
exports.APPLICATION_STATUS = APPLICATION_STATUS;
exports.CLONE_PATH = CLONE_PATH;
exports.COLLECTION_TYPES = COLLECTION_TYPES;
exports.EVENT_MODEL = EVENT_MODEL;
exports.LIST_PATH = LIST_PATH;
exports.MEMBER_APPLICATION_MODEL = MEMBER_APPLICATION_MODEL;
exports.PLUGIN_ID = PLUGIN_ID;
exports.SINGLE_TYPES = SINGLE_TYPES;
exports.getTranslation = getTranslation;
exports.index = index;
//# sourceMappingURL=index-BL42GuU0.js.map
