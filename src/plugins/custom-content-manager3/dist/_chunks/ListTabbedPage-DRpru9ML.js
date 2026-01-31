"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const React = require("react");
const admin = require("@strapi/strapi/admin");
const designSystem = require("@strapi/design-system");
const Icons = require("@strapi/icons");
const Symbols = require("@strapi/icons/symbols");
const isEqual = require("lodash/isEqual");
const qs = require("qs");
const reactRouterDom = require("react-router-dom");
const styledComponents = require("styled-components");
const Filters = require("./Filters-BTEji7gM.js");
const EditViewPage = require("./EditViewPage-CK_dHv8K.js");
const index = require("./index-DXoJY2j3.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
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
const isEqual__default = /* @__PURE__ */ _interopDefault(isEqual);
const ActionsCell = styledComponents.styled(admin.Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
function PageHeaderCustom(props) {
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { paddingLeft: 10, paddingBottom: 4, paddingTop: 4, direction: "column", alignItems: "start", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: props.contentTypeTitle }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: `${props.pagination?.total ?? 0} found` })
  ] });
}
const CreateButton = ({ variant, contentTypeTitle }) => {
  const [{ query }] = admin.useQueryParams();
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Button,
    {
      variant,
      tag: reactRouterDom.Link,
      startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}),
      style: { textDecoration: "none" },
      to: {
        pathname: "create",
        search: qs.stringify({ plugins: query.plugins })
      },
      minWidth: "max-content",
      marginLeft: 2,
      children: `Create new ${contentTypeTitle || "entry"}`
    }
  );
};
function ListTabbedPage({
  tabsConfig,
  hideCreateButton = false
}) {
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler(index.getTranslation);
  const { collectionType, model, schema } = EditViewPage.useDoc();
  const { list } = EditViewPage.useDocumentLayout(model);
  const [displayedHeaders, setDisplayedHeaders] = React__namespace.useState([]);
  const listLayout = EditViewPage.usePrev(list.layout);
  React__namespace.useEffect(() => {
    if (!isEqual__default.default(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);
  const handleSetHeaders = (headers) => {
    setDisplayedHeaders(
      EditViewPage.convertListLayoutToFieldLayouts(headers, schema.attributes, list.metadatas)
    );
  };
  const [{ query: tabQuery }, setQuery] = admin.useQueryParams({
    tab: tabsConfig.defaultTab
  });
  const currentTab = tabQuery.tab || tabsConfig.defaultTab;
  const buildTabFilter = React__namespace.useCallback(
    (tab) => {
      const tabConfig = tabsConfig.tabs.find((t) => t.value === tab);
      if (tabConfig?.filter) {
        return tabConfig.filter;
      }
      return { [tabsConfig.filterField]: tab };
    },
    [tabsConfig]
  );
  const [{ query }] = admin.useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : "",
    filters: buildTabFilter(currentTab)
  });
  const params = React__namespace.useMemo(() => EditViewPage.buildValidParams(query), [query]);
  const { data, error, isFetching } = EditViewPage.useGetAllDocumentsQuery({
    model,
    params
  });
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const { results = [], pagination } = data ?? {};
  React__namespace.useEffect(() => {
    if (pagination && pagination.pageCount > 0 && pagination.page > pagination.pageCount) {
      navigate(
        {
          search: qs.stringify({
            ...query,
            page: pagination.pageCount
          })
        },
        { replace: true }
      );
    }
  }, [pagination, query, navigate]);
  const tableHeaders = React__namespace.useMemo(() => {
    const formattedHeaders = displayedHeaders.map((header) => {
      const translation = typeof header.label === "string" ? {
        id: `content-manager.content-types.${model}.${header.name}`,
        defaultMessage: header.label
      } : header.label;
      return {
        ...header,
        label: translation.defaultMessage,
        name: `${header.name}${header.mainField?.name ? `.${header.mainField.name}` : ""}`
      };
    });
    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: { type: "custom" },
        name: "status",
        label: "status",
        searchable: false,
        sortable: false
      });
    }
    return formattedHeaders;
  }, [displayedHeaders, schema?.options?.draftAndPublish, model]);
  if (isFetching) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName || "Untitled";
  const handleRowClick = (id) => () => {
    navigate({
      pathname: id.toString(),
      search: qs.stringify({ plugins: query.plugins })
    });
  };
  const handleTabChange = (newTab) => {
    const isValidTab = tabsConfig.tabs.some((t) => t.value === newTab);
    if (isValidTab) {
      setQuery({ tab: newTab }, "push", true);
    }
  };
  const renderCellContent = (row, header) => {
    const headerBaseName = header.name.split(".")[0];
    if (header.name === "status") {
      return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(EditViewPage.DocumentStatus, { status: row.status, maxWidth: "min-content" }) }, header.name);
    }
    if (["createdBy", "updatedBy"].includes(headerBaseName)) {
      return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: row[headerBaseName] ? Filters.getDisplayName(row[headerBaseName]) : "-" }) }, header.name);
    }
    if (typeof header.cellFormatter === "function") {
      return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: header.cellFormatter(row, header, { collectionType, model }) }, header.name);
    }
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(Filters.CellContent, { content: row[headerBaseName], rowId: row.documentId, ...header }) }, header.name);
  };
  if (results.length === 0 && !isFetching) {
    return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: contentTypeTitle }),
      /* @__PURE__ */ jsxRuntime.jsx(PageHeaderCustom, { contentTypeTitle, pagination }),
      /* @__PURE__ */ jsxRuntime.jsx(
        admin.Layouts.Action,
        {
          startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            !hideCreateButton && /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "primary", contentTypeTitle }),
            list.settings.searchable && /* @__PURE__ */ jsxRuntime.jsx(
              admin.SearchInput,
              {
                label: `Search for ${contentTypeTitle}`,
                placeholder: "Search",
                trackedEvent: "didSearch"
              }
            ),
            list.settings.filterable && schema ? /* @__PURE__ */ jsxRuntime.jsx(Filters.FiltersImpl, { schema }) : null
          ] }),
          endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(Filters.InjectionZone, { area: "listView.actions" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              Filters.ViewSettingsMenu,
              {
                setHeaders: handleSetHeaders,
                resetHeaders: () => setDisplayedHeaders(list.layout),
                headers: displayedHeaders.map((header) => header.name)
              }
            )
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Content, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Root, { value: currentTab, onValueChange: handleTabChange, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.List, { "aria-label": tabsConfig.ariaLabel || "Filter tabs", children: tabsConfig.tabs.map((tab) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: tab.value, children: tab.label }, tab.value)) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", shadow: "filterShadow", hasRadius: true, marginTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.EmptyStateLayout,
          {
            action: !hideCreateButton ? /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "secondary", contentTypeTitle }) : void 0,
            content: "No content found",
            hasRadius: true,
            icon: /* @__PURE__ */ jsxRuntime.jsx(Symbols.EmptyDocuments, { width: "16rem" })
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: contentTypeTitle }),
    /* @__PURE__ */ jsxRuntime.jsx(PageHeaderCustom, { contentTypeTitle, pagination }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          list.settings.searchable && /* @__PURE__ */ jsxRuntime.jsx(
            admin.SearchInput,
            {
              disabled: results.length === 0,
              label: `Search for ${contentTypeTitle}`,
              placeholder: "Search"
            }
          ),
          list.settings.filterable && schema ? /* @__PURE__ */ jsxRuntime.jsx(Filters.FiltersImpl, { disabled: results.length === 0, schema }) : null
        ] }),
        endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(Filters.InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Filters.ViewSettingsMenu,
            {
              setHeaders: handleSetHeaders,
              resetHeaders: () => setDisplayedHeaders(list.layout),
              headers: displayedHeaders.map((header) => header.name)
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(admin.Layouts.Content, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Root, { value: currentTab, onValueChange: handleTabChange, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.List, { "aria-label": tabsConfig.ariaLabel || "Filter tabs", children: tabsConfig.tabs.map((tab) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: tab.value, children: tab.label }, tab.value)) }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
        /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Table.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Head, { children: tableHeaders.map((header) => /* @__PURE__ */ jsxRuntime.jsx(admin.Table.HeaderCell, { ...header }, header.name)) }),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Loading, {}),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Empty, {}),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Body, { children: results.map((row) => /* @__PURE__ */ jsxRuntime.jsxs(
            admin.Table.Row,
            {
              cursor: "pointer",
              onClick: handleRowClick(row.documentId),
              children: [
                tableHeaders.map((header) => renderCellContent(row, header)),
                /* @__PURE__ */ jsxRuntime.jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(Filters.TableActions, { document: row, schema }) })
              ]
            },
            row.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(admin.Pagination.Root, { ...pagination, children: [
          /* @__PURE__ */ jsxRuntime.jsx(admin.Pagination.PageSize, {}),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Pagination.Links, {})
        ] })
      ] })
    ] })
  ] });
}
function ProtectedListTabbedPage(props) {
  const { slug = "" } = reactRouterDom.useParams();
  if (!slug) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ListTabbedPage, { ...props });
}
const memberApplicationTabsConfig = {
  filterField: "applicationStatus",
  defaultTab: "pending",
  ariaLabel: "View types of member applications",
  tabs: [
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" }
  ]
};
const ProtectedListMemberApplicationPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(ProtectedListTabbedPage, { tabsConfig: memberApplicationTabsConfig });
};
exports.ListTabbedPage = ListTabbedPage;
exports.ProtectedListMemberApplicationPage = ProtectedListMemberApplicationPage;
exports.ProtectedListTabbedPage = ProtectedListTabbedPage;
//# sourceMappingURL=ListTabbedPage-DRpru9ML.js.map
