"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const React = require("react");
const designSystem = require("@strapi/design-system");
const qs = require("qs");
const index = require("./index-CJAgv_Ni.js");
const useDeleteAction = require("./useDeleteAction-WNd52Gyv.js");
const reactRedux = require("react-redux");
require("@strapi/icons");
const styledComponents = require("styled-components");
function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const useTypedDispatch = reactRedux.useDispatch;
const useTypedSelector = reactRedux.useSelector;
const { MUTATE_COLLECTION_TYPES_LINKS, MUTATE_SINGLE_TYPES_LINKS } = useDeleteAction.HOOKS;
const useContentManagerInitData = () => {
  const { toggleNotification } = admin.useNotification();
  const dispatch = useTypedDispatch();
  const runHookWaterfall = admin.useStrapiApp(
    "useContentManagerInitData",
    (state2) => state2.runHookWaterfall
  );
  console.log("file: useContentManagerInitData.ts:94 ~ useContentManagerInitData ~ runHookWaterfall:", runHookWaterfall);
  const { notifyStatus } = designSystem.useNotifyAT();
  const { formatMessage } = reactIntl.useIntl();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler(useDeleteAction.getTranslation);
  const checkUserHasPermissions = admin.useAuth(
    "useContentManagerInitData",
    (state2) => state2.checkUserHasPermissions
  );
  console.log("file: useContentManagerInitData.ts:102 ~ useContentManagerInitData ~ checkUserHasPermissions:", checkUserHasPermissions);
  const state = useTypedSelector((state2) => state2[index.PLUGIN_ID].app);
  console.log("file: useContentManagerInitData.ts:106 ~ useContentManagerInitData ~ state:", state);
  const initialDataQuery = useDeleteAction.useGetInitialDataQuery(void 0, {
    /**
     * TODO: remove this when the CTB has been refactored to use redux-toolkit-query
     * and it can invalidate the cache on mutation
     */
    refetchOnMountOrArgChange: true
  });
  React.useEffect(() => {
    if (initialDataQuery.data) {
      notifyStatus(
        formatMessage({
          id: useDeleteAction.getTranslation("App.schemas.data-loaded"),
          defaultMessage: "The schemas have been successfully loaded."
        })
      );
    }
  }, [formatMessage, initialDataQuery.data, notifyStatus]);
  React.useEffect(() => {
    if (initialDataQuery.error) {
      toggleNotification({ type: "danger", message: formatAPIError(initialDataQuery.error) });
    }
  }, [formatAPIError, initialDataQuery.error, toggleNotification]);
  const contentTypeSettingsQuery = useDeleteAction.useGetAllContentTypeSettingsQuery();
  React.useEffect(() => {
    if (contentTypeSettingsQuery.error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(contentTypeSettingsQuery.error)
      });
    }
  }, [formatAPIError, contentTypeSettingsQuery.error, toggleNotification]);
  const formatData = async (components, contentTypes, fieldSizes, contentTypeConfigurations) => {
    const { collectionType: collectionTypeLinks, singleType: singleTypeLinks } = contentTypes.reduce(
      (acc, model) => {
        acc[model.kind].push(model);
        return acc;
      },
      {
        collectionType: [],
        singleType: []
      }
    );
    const collectionTypeSectionLinks = generateLinks(
      collectionTypeLinks,
      "collectionTypes",
      contentTypeConfigurations
    );
    const singleTypeSectionLinks = generateLinks(singleTypeLinks, "singleTypes");
    const collectionTypeLinksPermissions = await Promise.all(
      collectionTypeSectionLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
    );
    const authorizedCollectionTypeLinks = collectionTypeSectionLinks.filter(
      (_, index2) => collectionTypeLinksPermissions[index2].length > 0
    );
    const singleTypeLinksPermissions = await Promise.all(
      singleTypeSectionLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
    );
    const authorizedSingleTypeLinks = singleTypeSectionLinks.filter(
      (_, index2) => singleTypeLinksPermissions[index2].length > 0
    );
    const { ctLinks } = runHookWaterfall(MUTATE_COLLECTION_TYPES_LINKS, {
      ctLinks: authorizedCollectionTypeLinks,
      models: contentTypes
    });
    const { stLinks } = runHookWaterfall(MUTATE_SINGLE_TYPES_LINKS, {
      stLinks: authorizedSingleTypeLinks,
      models: contentTypes
    });
    dispatch(
      index.setInitialData({
        authorizedCollectionTypeLinks: ctLinks,
        authorizedSingleTypeLinks: stLinks,
        components,
        contentTypeSchemas: contentTypes,
        fieldSizes
      })
    );
  };
  React.useEffect(() => {
    if (initialDataQuery.data && contentTypeSettingsQuery.data) {
      formatData(
        initialDataQuery.data.components,
        initialDataQuery.data.contentTypes,
        initialDataQuery.data.fieldSizes,
        contentTypeSettingsQuery.data
      );
    }
  }, [initialDataQuery.data, contentTypeSettingsQuery.data]);
  return { ...state };
};
const generateLinks = (links, type, configurations = []) => {
  return links.filter((link) => link.isDisplayed).map((link) => {
    const collectionTypesPermissions = [
      { action: "plugin::content-manager.explorer.create", subject: link.uid },
      { action: "plugin::content-manager.explorer.read", subject: link.uid }
    ];
    const singleTypesPermissions = [
      { action: "plugin::content-manager.explorer.read", subject: link.uid }
    ];
    const permissions = type === "collectionTypes" ? collectionTypesPermissions : singleTypesPermissions;
    const currentContentTypeConfig = configurations.find(({ uid }) => uid === link.uid);
    let search = null;
    if (currentContentTypeConfig) {
      const searchParams = {
        page: 1,
        pageSize: currentContentTypeConfig.settings.pageSize,
        sort: `${currentContentTypeConfig.settings.defaultSortBy}:${currentContentTypeConfig.settings.defaultSortOrder}`
      };
      search = qs.stringify(searchParams, { encode: false });
    }
    return {
      permissions,
      search,
      kind: link.kind,
      title: link.info.displayName,
      to: `/content-manager/${link.kind === "collectionType" ? index.COLLECTION_TYPES : index.SINGLE_TYPES}/${link.uid}`,
      uid: link.uid,
      // Used for the list item key in the helper plugin
      name: link.uid,
      isDisplayed: link.isDisplayed
    };
  });
};
const LeftMenu = ({ isFullPage = false }) => {
  const [search, setSearch] = React__namespace.useState("");
  const [{ query }] = admin.useQueryParams();
  const { formatMessage, locale } = reactIntl.useIntl();
  const { isLoading } = useContentManagerInitData();
  const collectionTypeLinks = useTypedSelector(
    (state) => state["content-manager"].app.collectionTypeLinks
  );
  const singleTypeLinks = useTypedSelector((state) => state["content-manager"].app.singleTypeLinks);
  const { schemas } = useDeleteAction.useContentTypeSchema();
  const { contains } = designSystem.useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const menu = React__namespace.useMemo(
    () => [
      {
        id: "collectionTypes",
        title: formatMessage({
          id: useDeleteAction.getTranslation("components.LeftMenu.collection-types"),
          defaultMessage: "Collection Types"
        }),
        searchable: true,
        links: collectionTypeLinks
      },
      {
        id: "singleTypes",
        title: formatMessage({
          id: useDeleteAction.getTranslation("components.LeftMenu.single-types"),
          defaultMessage: "Single Types"
        }),
        searchable: true,
        links: singleTypeLinks
      }
    ].map((section) => ({
      ...section,
      links: section.links.filter((link) => contains(link.title, search.trim())).sort((a, b) => formatter.compare(a.title, b.title)).map((link) => {
        return {
          ...link,
          title: formatMessage({ id: link.title, defaultMessage: link.title })
        };
      })
    })),
    [collectionTypeLinks, search, singleTypeLinks, contains, formatMessage, formatter]
  );
  const handleClear = () => {
    setSearch("");
  };
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const label = formatMessage({
    id: useDeleteAction.getTranslation("header.name"),
    defaultMessage: "Content Manager"
  });
  const getPluginsParamsForLink = (link) => {
    const schema = schemas.find((schema2) => schema2.uid === link.uid);
    const isI18nEnabled = Boolean(schema?.pluginOptions?.i18n?.localized);
    if (query.plugins && "i18n" in query.plugins) {
      const { i18n, ...restPlugins } = query.plugins;
      if (!isI18nEnabled) {
        return restPlugins;
      }
      return { i18n, ...restPlugins };
    }
    return query.plugins;
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsxs(admin.SubNav.Main, { "aria-label": label, children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.SubNav.Header, { label }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { padding: 4, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.SubNav.Main, { "aria-label": label, children: [
    !isFullPage && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.SubNav.Header, { label }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.SubNav.Content, { children: [
      isFullPage && /* @__PURE__ */ jsxRuntime.jsx(admin.SubNav.Header, { label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Flex,
        {
          paddingLeft: {
            initial: 4,
            large: 5
          },
          paddingRight: {
            initial: 4,
            large: 5
          },
          paddingTop: isFullPage ? 0 : {
            initial: 4,
            large: 5
          },
          paddingBottom: 0,
          gap: 3,
          direction: "column",
          alignItems: "stretch",
          children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Searchbar,
            {
              value: search,
              onChange: handleChangeSearch,
              onClear: handleClear,
              placeholder: formatMessage({
                id: "search.placeholder",
                defaultMessage: "Search"
              }),
              size: "S",
              children: void 0,
              name: "search_contentType",
              clearLabel: formatMessage({ id: "clearLabel", defaultMessage: "Clear" })
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(admin.SubNav.Sections, { children: menu.map((section) => {
        return /* @__PURE__ */ jsxRuntime.jsx(
          admin.SubNav.Section,
          {
            label: section.title,
            badgeLabel: section.links.length.toString(),
            children: section.links.map((link) => {
              return /* @__PURE__ */ jsxRuntime.jsx(
                admin.SubNav.Link,
                {
                  to: {
                    pathname: link.to,
                    search: qs.stringify({
                      ...qs.parse(link.search ?? ""),
                      plugins: getPluginsParamsForLink(link)
                    })
                  },
                  label: link.title
                },
                link.uid
              );
            })
          },
          section.id
        );
      }) })
    ] })
  ] });
};
const ActionBox = styledComponents.styled(designSystem.Flex)`
  height: ${({ theme }) => theme.spaces[7]};

  &:last-child {
    padding: 0 ${({ theme }) => theme.spaces[3]};
  }
`;
styledComponents.styled(ActionBox)`
  border-right: 1px solid ${({ theme }) => theme.colors.primary200};

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
styledComponents.styled(designSystem.Flex)`
  border: 1px solid
    ${({ theme, $isSibling }) => $isSibling ? theme.colors.neutral150 : theme.colors.primary200};

  svg {
    width: 1rem;
    height: 1rem;

    path {
      fill: ${({ theme, $isSibling }) => $isSibling ? void 0 : theme.colors.primary600};
    }
  }
`;
styledComponents.styled(designSystem.Flex)`
  border-radius: 50%;

  svg {
    height: 0.6rem;
    width: 1.1rem;
    > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
styledComponents.styled.button`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  text-align: unset;
  padding: 0;
`;
const Layout = () => {
  const contentTypeMatch = reactRouterDom.useMatch("/custom-content-manager3/:kind/:uid/*");
  const isMobile = admin.useIsMobile();
  const models = [1, 2, 3, 4, 5];
  const authorisedModels = [1, 2, 3, 4, 5];
  const { pathname } = reactRouterDom.useLocation();
  const { formatMessage } = reactIntl.useIntl();
  const supportedModelsToDisplay = models;
  if (authorisedModels.length === 0 && supportedModelsToDisplay.length > 0 && pathname !== "/content-manager/403") {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "/403" });
  }
  if (supportedModelsToDisplay.length === 0 && pathname !== "/no-content-types") {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "/no-content-types" });
  }
  if (!contentTypeMatch && authorisedModels.length > 0) {
    if (!isMobile) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        reactRouterDom.Navigate,
        {
          to: "/admin",
          replace: true
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: formatMessage({
        id: useDeleteAction.getTranslation("plugin.name"),
        defaultMessage: "Content Manager"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(admin.SubNav.PageWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(LeftMenu, { isFullPage: true }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: formatMessage({
      id: useDeleteAction.getTranslation("plugin.name"),
      defaultMessage: "Content Manager"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Outlet, {}) })
  ] });
};
exports.Layout = Layout;
//# sourceMappingURL=layout-n8RGe7Y0.js.map
