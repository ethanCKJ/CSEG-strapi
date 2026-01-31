import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNotification, useStrapiApp, useAPIErrorHandler, useAuth, useQueryParams, SubNav, useIsMobile, Page, Layouts } from "@strapi/strapi/admin";
import { useIntl } from "react-intl";
import { useMatch, useLocation, Navigate, Outlet } from "react-router-dom";
import * as React from "react";
import { useEffect } from "react";
import { useNotifyAT, useFilter, useCollator, Divider, Flex, Loader, Searchbar } from "@strapi/design-system";
import { stringify, parse } from "qs";
import { P as PLUGIN_ID, s as setInitialData, C as COLLECTION_TYPES, S as SINGLE_TYPES } from "./index-D2iAzhCr.mjs";
import { g as getTranslation, h as useGetInitialDataQuery, i as useGetAllContentTypeSettingsQuery, H as HOOKS, j as useContentTypeSchema } from "./useDeleteAction-DqMEfkh9.mjs";
import { useSelector, useDispatch } from "react-redux";
import "@strapi/icons";
import { styled } from "styled-components";
const useTypedDispatch = useDispatch;
const useTypedSelector = useSelector;
const { MUTATE_COLLECTION_TYPES_LINKS, MUTATE_SINGLE_TYPES_LINKS } = HOOKS;
const useContentManagerInitData = () => {
  const { toggleNotification } = useNotification();
  const dispatch = useTypedDispatch();
  const runHookWaterfall = useStrapiApp(
    "useContentManagerInitData",
    (state2) => state2.runHookWaterfall
  );
  console.log("file: useContentManagerInitData.ts:94 ~ useContentManagerInitData ~ runHookWaterfall:", runHookWaterfall);
  const { notifyStatus } = useNotifyAT();
  const { formatMessage } = useIntl();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  const checkUserHasPermissions = useAuth(
    "useContentManagerInitData",
    (state2) => state2.checkUserHasPermissions
  );
  console.log("file: useContentManagerInitData.ts:102 ~ useContentManagerInitData ~ checkUserHasPermissions:", checkUserHasPermissions);
  const state = useTypedSelector((state2) => state2[PLUGIN_ID].app);
  console.log("file: useContentManagerInitData.ts:106 ~ useContentManagerInitData ~ state:", state);
  const initialDataQuery = useGetInitialDataQuery(void 0, {
    /**
     * TODO: remove this when the CTB has been refactored to use redux-toolkit-query
     * and it can invalidate the cache on mutation
     */
    refetchOnMountOrArgChange: true
  });
  useEffect(() => {
    if (initialDataQuery.data) {
      notifyStatus(
        formatMessage({
          id: getTranslation("App.schemas.data-loaded"),
          defaultMessage: "The schemas have been successfully loaded."
        })
      );
    }
  }, [formatMessage, initialDataQuery.data, notifyStatus]);
  useEffect(() => {
    if (initialDataQuery.error) {
      toggleNotification({ type: "danger", message: formatAPIError(initialDataQuery.error) });
    }
  }, [formatAPIError, initialDataQuery.error, toggleNotification]);
  const contentTypeSettingsQuery = useGetAllContentTypeSettingsQuery();
  useEffect(() => {
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
      (_, index) => collectionTypeLinksPermissions[index].length > 0
    );
    const singleTypeLinksPermissions = await Promise.all(
      singleTypeSectionLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
    );
    const authorizedSingleTypeLinks = singleTypeSectionLinks.filter(
      (_, index) => singleTypeLinksPermissions[index].length > 0
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
      setInitialData({
        authorizedCollectionTypeLinks: ctLinks,
        authorizedSingleTypeLinks: stLinks,
        components,
        contentTypeSchemas: contentTypes,
        fieldSizes
      })
    );
  };
  useEffect(() => {
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
      search = stringify(searchParams, { encode: false });
    }
    return {
      permissions,
      search,
      kind: link.kind,
      title: link.info.displayName,
      to: `/content-manager/${link.kind === "collectionType" ? COLLECTION_TYPES : SINGLE_TYPES}/${link.uid}`,
      uid: link.uid,
      // Used for the list item key in the helper plugin
      name: link.uid,
      isDisplayed: link.isDisplayed
    };
  });
};
const LeftMenu = ({ isFullPage = false }) => {
  const [search, setSearch] = React.useState("");
  const [{ query }] = useQueryParams();
  const { formatMessage, locale } = useIntl();
  const { isLoading } = useContentManagerInitData();
  const collectionTypeLinks = useTypedSelector(
    (state) => state["content-manager"].app.collectionTypeLinks
  );
  const singleTypeLinks = useTypedSelector((state) => state["content-manager"].app.singleTypeLinks);
  const { schemas } = useContentTypeSchema();
  const { contains } = useFilter(locale, {
    sensitivity: "base"
  });
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const menu = React.useMemo(
    () => [
      {
        id: "collectionTypes",
        title: formatMessage({
          id: getTranslation("components.LeftMenu.collection-types"),
          defaultMessage: "Collection Types"
        }),
        searchable: true,
        links: collectionTypeLinks
      },
      {
        id: "singleTypes",
        title: formatMessage({
          id: getTranslation("components.LeftMenu.single-types"),
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
    id: getTranslation("header.name"),
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
    return /* @__PURE__ */ jsxs(SubNav.Main, { "aria-label": label, children: [
      /* @__PURE__ */ jsx(SubNav.Header, { label }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsx(Flex, { padding: 4, justifyContent: "center", children: /* @__PURE__ */ jsx(Loader, {}) })
    ] });
  }
  return /* @__PURE__ */ jsxs(SubNav.Main, { "aria-label": label, children: [
    !isFullPage && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(SubNav.Header, { label }),
      /* @__PURE__ */ jsx(Divider, {})
    ] }),
    /* @__PURE__ */ jsxs(SubNav.Content, { children: [
      isFullPage && /* @__PURE__ */ jsx(SubNav.Header, { label }),
      /* @__PURE__ */ jsx(
        Flex,
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
          children: /* @__PURE__ */ jsx(
            Searchbar,
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
      /* @__PURE__ */ jsx(SubNav.Sections, { children: menu.map((section) => {
        return /* @__PURE__ */ jsx(
          SubNav.Section,
          {
            label: section.title,
            badgeLabel: section.links.length.toString(),
            children: section.links.map((link) => {
              return /* @__PURE__ */ jsx(
                SubNav.Link,
                {
                  to: {
                    pathname: link.to,
                    search: stringify({
                      ...parse(link.search ?? ""),
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
const ActionBox = styled(Flex)`
  height: ${({ theme }) => theme.spaces[7]};

  &:last-child {
    padding: 0 ${({ theme }) => theme.spaces[3]};
  }
`;
styled(ActionBox)`
  border-right: 1px solid ${({ theme }) => theme.colors.primary200};

  svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;
styled(Flex)`
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
styled(Flex)`
  border-radius: 50%;

  svg {
    height: 0.6rem;
    width: 1.1rem;
    > path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
  }
`;
styled.button`
  border: none;
  background: transparent;
  display: block;
  width: 100%;
  text-align: unset;
  padding: 0;
`;
const Layout = () => {
  const contentTypeMatch = useMatch("/custom-content-manager3/:kind/:uid/*");
  const isMobile = useIsMobile();
  const models = [1, 2, 3, 4, 5];
  const authorisedModels = [1, 2, 3, 4, 5];
  const { pathname } = useLocation();
  const { formatMessage } = useIntl();
  const supportedModelsToDisplay = models;
  if (authorisedModels.length === 0 && supportedModelsToDisplay.length > 0 && pathname !== "/content-manager/403") {
    return /* @__PURE__ */ jsx(Navigate, { to: "/403" });
  }
  if (supportedModelsToDisplay.length === 0 && pathname !== "/no-content-types") {
    return /* @__PURE__ */ jsx(Navigate, { to: "/no-content-types" });
  }
  if (!contentTypeMatch && authorisedModels.length > 0) {
    if (!isMobile) {
      return /* @__PURE__ */ jsx(
        Navigate,
        {
          to: "/admin",
          replace: true
        }
      );
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Page.Title, { children: formatMessage({
        id: getTranslation("plugin.name"),
        defaultMessage: "Content Manager"
      }) }),
      /* @__PURE__ */ jsx(SubNav.PageWrapper, { children: /* @__PURE__ */ jsx(LeftMenu, { isFullPage: true }) })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage({
      id: getTranslation("plugin.name"),
      defaultMessage: "Content Manager"
    }) }),
    /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};
export {
  Layout
};
//# sourceMappingURL=layout-U-QzfEay.mjs.map
