import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { jsx } from "react/jsx-runtime";
import { lazy } from "react";
import { useParams } from "react-router-dom";
import { Page } from "@strapi/strapi/admin";
import "prismjs";
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
const appSlice = createSlice({
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
const reducer = combineReducers({
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
const ProtectedEditViewPage = lazy(
  () => import("./EditViewPage-CQE0faIJ.mjs").then((n) => n.E).then((mod) => ({ default: mod.ProtectedEditViewPage }))
);
const ProtectedListViewPage = lazy(
  () => import("./ListViewPage-jDPSxhVh.mjs").then((mod) => ({ default: mod.ProtectedListViewPage }))
);
const NoPermissions = lazy(
  () => import("./NoPermissionsPage-DPIE9gSe.mjs").then((mod) => ({ default: mod.NoPermissions }))
);
const ProtectedListMemberApplicationPage = lazy(
  () => import("./ListTabbedPage-B0W1a_lk.mjs").then((mod) => ({ default: mod.ProtectedListMemberApplicationPage }))
);
const CollectionTypePages = () => {
  const { collectionType, slug } = useParams();
  console.log("In router.tsx with params:", { collectionType, slug });
  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  if (slug === MEMBER_APPLICATION_MODEL) {
    return /* @__PURE__ */ jsx(ProtectedListMemberApplicationPage, {});
  }
  return collectionType === COLLECTION_TYPES ? /* @__PURE__ */ jsx(ProtectedListViewPage, {}) : /* @__PURE__ */ jsx(ProtectedEditViewPage, {});
};
const CLONE_RELATIVE_PATH = ":collectionType/:slug/clone/:origin";
const CLONE_PATH = `plugins/custom-content-manager3/${CLONE_RELATIVE_PATH}`;
const LIST_RELATIVE_PATH = ":collectionType/:slug";
const LIST_PATH = `plugins/custom-content-manager3/collection-types/:slug`;
const routes = [
  {
    path: LIST_RELATIVE_PATH,
    element: /* @__PURE__ */ jsx(CollectionTypePages, {})
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
        const { Layout } = await import("./layout-Dxby4huw.mjs");
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
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-CCEVvqGG.mjs"), "./translations/ca.json": () => import("./ca-5U32ON2v.mjs"), "./translations/cs.json": () => import("./cs-CM2aBUar.mjs"), "./translations/de.json": () => import("./de-C72KDNOl.mjs"), "./translations/en.json": () => import("./en-BQH2ym_1.mjs"), "./translations/es.json": () => import("./es-D_NgQEgP.mjs"), "./translations/eu.json": () => import("./eu-CdALomew.mjs"), "./translations/fr.json": () => import("./fr-Bfec4wcs.mjs"), "./translations/gu.json": () => import("./gu-CNpaMDpH.mjs"), "./translations/hi.json": () => import("./hi-Dwvd04m3.mjs"), "./translations/hu.json": () => import("./hu-CeYvaaO0.mjs"), "./translations/id.json": () => import("./id-BtwA9WJT.mjs"), "./translations/it.json": () => import("./it-BrVPqaf1.mjs"), "./translations/ja.json": () => import("./ja-BHqhDq4V.mjs"), "./translations/ko.json": () => import("./ko-HVQRlfUI.mjs"), "./translations/ml.json": () => import("./ml-BihZwQit.mjs"), "./translations/ms.json": () => import("./ms-m_WjyWx7.mjs"), "./translations/nl.json": () => import("./nl-D4R9gHx5.mjs"), "./translations/pl.json": () => import("./pl-sbx9mSt_.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-C71iDxnh.mjs"), "./translations/pt.json": () => import("./pt-BsaFvS8-.mjs"), "./translations/ru.json": () => import("./ru-D3jBXGmK.mjs"), "./translations/sa.json": () => import("./sa-Dag0k-Z8.mjs"), "./translations/sk.json": () => import("./sk-BFg-R8qJ.mjs"), "./translations/sv.json": () => import("./sv-CUnfWGsh.mjs"), "./translations/th.json": () => import("./th-BqbI8lIT.mjs"), "./translations/tr.json": () => import("./tr-CgeK3wJM.mjs"), "./translations/uk.json": () => import("./uk-DKbw8IH5.mjs"), "./translations/vi.json": () => import("./vi-DUXIk_fw.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-FOssYmB1.mjs"), "./translations/zh.json": () => import("./zh-BWZspA60.mjs") }), `./translations/${locale}.json`, 3);
          return { data: prefixPluginTranslations(data, "content-manager"), locale };
        } catch {
          try {
            const baseLocale = locale.split("-")[0];
            const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/ar.json": () => import("./ar-CCEVvqGG.mjs"), "./translations/ca.json": () => import("./ca-5U32ON2v.mjs"), "./translations/cs.json": () => import("./cs-CM2aBUar.mjs"), "./translations/de.json": () => import("./de-C72KDNOl.mjs"), "./translations/en.json": () => import("./en-BQH2ym_1.mjs"), "./translations/es.json": () => import("./es-D_NgQEgP.mjs"), "./translations/eu.json": () => import("./eu-CdALomew.mjs"), "./translations/fr.json": () => import("./fr-Bfec4wcs.mjs"), "./translations/gu.json": () => import("./gu-CNpaMDpH.mjs"), "./translations/hi.json": () => import("./hi-Dwvd04m3.mjs"), "./translations/hu.json": () => import("./hu-CeYvaaO0.mjs"), "./translations/id.json": () => import("./id-BtwA9WJT.mjs"), "./translations/it.json": () => import("./it-BrVPqaf1.mjs"), "./translations/ja.json": () => import("./ja-BHqhDq4V.mjs"), "./translations/ko.json": () => import("./ko-HVQRlfUI.mjs"), "./translations/ml.json": () => import("./ml-BihZwQit.mjs"), "./translations/ms.json": () => import("./ms-m_WjyWx7.mjs"), "./translations/nl.json": () => import("./nl-D4R9gHx5.mjs"), "./translations/pl.json": () => import("./pl-sbx9mSt_.mjs"), "./translations/pt-BR.json": () => import("./pt-BR-C71iDxnh.mjs"), "./translations/pt.json": () => import("./pt-BsaFvS8-.mjs"), "./translations/ru.json": () => import("./ru-D3jBXGmK.mjs"), "./translations/sa.json": () => import("./sa-Dag0k-Z8.mjs"), "./translations/sk.json": () => import("./sk-BFg-R8qJ.mjs"), "./translations/sv.json": () => import("./sv-CUnfWGsh.mjs"), "./translations/th.json": () => import("./th-BqbI8lIT.mjs"), "./translations/tr.json": () => import("./tr-CgeK3wJM.mjs"), "./translations/uk.json": () => import("./uk-DKbw8IH5.mjs"), "./translations/vi.json": () => import("./vi-DUXIk_fw.mjs"), "./translations/zh-Hans.json": () => import("./zh-Hans-FOssYmB1.mjs"), "./translations/zh.json": () => import("./zh-BWZspA60.mjs") }), `./translations/${baseLocale}.json`, 3);
            return { data: prefixPluginTranslations(data, "content-manager"), locale };
          } catch {
            return { data: {}, locale };
          }
        }
      })
    );
  }
};
export {
  APPLICATION_STATUS as A,
  COLLECTION_TYPES as C,
  EVENT_MODEL as E,
  LIST_PATH as L,
  MEMBER_APPLICATION_MODEL as M,
  PLUGIN_ID as P,
  SINGLE_TYPES as S,
  CLONE_PATH as a,
  ADMIN_HIDDEN_FIELDS as b,
  getTranslation as g,
  index as i
};
//# sourceMappingURL=index-C_8DKxGS.mjs.map
