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
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const styledComponents = require("styled-components");
const Filters = require("./Filters-CQc7QTvM.js");
const EditViewPage = require("./EditViewPage-DAIYEQ_p.js");
const index = require("./index-nk_OOTuE.js");
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
const HOOKS = {
  /**
   * Hook that allows to mutate the displayed headers of the list view table
   * @constant
   * @type {string}
   */
  INJECT_COLUMN_IN_TABLE: "Admin/CM/pages/ListView/inject-column-in-table"
};
const { INJECT_COLUMN_IN_TABLE } = HOOKS;
styledComponents.styled(admin.Layouts.Header)`
  overflow-wrap: anywhere;
`;
function PageHeaderCustom(props) {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      paddingLeft: 10,
      paddingBottom: 4,
      paddingTop: 4,
      direction: "column",
      alignItems: "start",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", children: `${props.contentTypeTitle}` }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", children: `${props.pagination?.total} found` })
      ]
    }
  );
}
function NoEntriesPage(props) {
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: `${props.contentTypeTitle}` }),
    /* @__PURE__ */ jsxRuntime.jsx(PageHeaderCustom, { contentTypeTitle: props.contentTypeTitle, pagination: props.pagination }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "primary", contentTypeTitle: props.contentTypeTitle }),
          props.list.settings.searchable && /* @__PURE__ */ jsxRuntime.jsx(
            admin.SearchInput,
            {
              label: `Search for ${props.contentTypeTitle}`,
              placeholder: "Search",
              trackedEvent: "didSearch"
            }
          ),
          props.list.settings.filterable && props.schema ? /* @__PURE__ */ jsxRuntime.jsx(Filters.FiltersImpl, { schema: props.schema }) : null
        ] }),
        endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(Filters.InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            Filters.ViewSettingsMenu,
            {
              setHeaders: props.headers,
              resetHeaders: props.resetHeaders,
              headers: props.listFieldLayouts.map(props.callbackfn)
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        action: props.canCreate ? /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "secondary", contentTypeTitle: props.contentTypeTitle }) : null,
        content: "No content found",
        hasRadius: true,
        icon: /* @__PURE__ */ jsxRuntime.jsx(Symbols.EmptyDocuments, { width: "16rem" })
      }
    ) }) })
  ] });
}
const ListViewPage = () => {
  const navigate = reactRouterDom.useNavigate();
  const { formatMessage } = reactIntl.useIntl();
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
  const [{ query }] = admin.useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : ""
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
  }, [pagination, formatMessage, query, navigate]);
  const canCreate = true;
  const runHookWaterfall = admin.useStrapiApp("ListViewPage", (state) => state.runHookWaterfall);
  const tableHeaders = React__namespace.useMemo(() => {
    const headers = runHookWaterfall(INJECT_COLUMN_IN_TABLE, {
      displayedHeaders,
      layout: list
    });
    const formattedHeaders = headers.displayedHeaders.map((header) => {
      const translation = typeof header.label === "string" ? {
        id: `content-manager.content-types.${model}.${header.name}`,
        defaultMessage: header.label
      } : header.label;
      return {
        ...header,
        label: formatMessage(translation),
        name: `${header.name}${header.mainField?.name ? `.${header.mainField.name}` : ""}`
      };
    });
    if (schema?.options?.draftAndPublish) {
      formattedHeaders.push({
        attribute: {
          type: "custom"
        },
        name: "status",
        label: "status",
        searchable: false,
        sortable: false
      });
    }
    return formattedHeaders;
  }, [
    displayedHeaders,
    formatMessage,
    list,
    runHookWaterfall,
    schema?.options?.draftAndPublish,
    model
  ]);
  if (isFetching) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName ? schema.info.displayName : "Untitled";
  const handleRowClick = (id) => () => {
    if (schema?.options?.draftAndPublish) {
      navigate({
        pathname: id.toString(),
        search: qs.stringify({ plugins: query.plugins, status: "draft" })
      });
      return;
    }
    navigate({
      pathname: id.toString(),
      search: qs.stringify({ plugins: query.plugins })
    });
  };
  if (!isFetching && results.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(
      NoEntriesPage,
      {
        contentTypeTitle,
        pagination,
        list,
        schema,
        headers: handleSetHeaders,
        resetHeaders: () => setDisplayedHeaders(list.layout),
        listFieldLayouts: displayedHeaders,
        callbackfn: (header) => header.name,
        canCreate
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: `${contentTypeTitle}` }),
    /* @__PURE__ */ jsxRuntime.jsx(PageHeaderCustom, { contentTypeTitle, pagination }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "primary", contentTypeTitle }),
          list.settings.searchable && /* @__PURE__ */ jsxRuntime.jsx(
            admin.SearchInput,
            {
              disabled: results.length === 0,
              label: `Search for ${contentTypeTitle}`,
              placeholder: "Search",
              trackedEvent: "didSearch"
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
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Table.Content, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Head, { children: tableHeaders.map((header) => /* @__PURE__ */ jsxRuntime.jsx(admin.Table.HeaderCell, { ...header }, header.name)) }),
        /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Loading, {}),
        /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Empty, { action: /* @__PURE__ */ jsxRuntime.jsx(CreateButton, { variant: "secondary", contentTypeTitle }) }),
        /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Body, { children: results.map((row) => {
          if (row.publishedAt !== null) {
            console.log("Alert", row);
          }
          console.log(row);
          return /* @__PURE__ */ jsxRuntime.jsxs(
            admin.Table.Row,
            {
              cursor: "pointer",
              onClick: handleRowClick(row.documentId),
              children: [
                tableHeaders.map(({ cellFormatter, ...header }) => {
                  if (header.name === "status") {
                    const { status } = row;
                    return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(EditViewPage.DocumentStatus, { status, maxWidth: "min-content" }) }, header.name);
                  }
                  if (["createdBy", "updatedBy"].includes(header.name.split(".")[0])) {
                    return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: row[header.name.split(".")[0]] ? Filters.getDisplayName(row[header.name.split(".")[0]]) : "-" }) }, header.name);
                  }
                  if (typeof cellFormatter === "function") {
                    return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: cellFormatter(row, header, { collectionType, model }) }, header.name);
                  }
                  return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(
                    Filters.CellContent,
                    {
                      content: row[header.name.split(".")[0]],
                      rowId: row.documentId,
                      ...header
                    }
                  ) }, header.name);
                }),
                /* @__PURE__ */ jsxRuntime.jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(Filters.TableActions, { document: row, schema }) })
              ]
            },
            row.id
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(
        admin.Pagination.Root,
        {
          ...pagination,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(admin.Pagination.PageSize, {}),
            /* @__PURE__ */ jsxRuntime.jsx(admin.Pagination.Links, {})
          ]
        }
      )
    ] }) })
  ] }) });
};
const ActionsCell = styledComponents.styled(admin.Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
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
const ProtectedListViewPage = () => {
  const { slug = "" } = reactRouterDom.useParams();
  if (!slug) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ListViewPage, {});
};
exports.ListViewPage = ListViewPage;
exports.ProtectedListViewPage = ProtectedListViewPage;
//# sourceMappingURL=ListViewPage-CQsP8yK2.js.map
