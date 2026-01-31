import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Page, useNotification, useAPIErrorHandler, useQueryParams, useStrapiApp, Layouts, SearchInput, Table, Pagination } from "@strapi/strapi/admin";
import { Flex, Typography, Box, EmptyStateLayout, Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { EmptyDocuments } from "@strapi/icons/symbols";
import isEqual from "lodash/isEqual";
import { stringify } from "qs";
import { useIntl } from "react-intl";
import { useParams, useNavigate, Link } from "react-router-dom";
import { styled } from "styled-components";
import { I as InjectionZone, V as ViewSettingsMenu, F as FiltersImpl, g as getDisplayName, C as CellContent, T as TableActions } from "./Filters-B575nibt.mjs";
import { u as useDoc, a as useDocumentLayout, b as usePrev, c as buildValidParams, d as useGetAllDocumentsQuery, D as DocumentStatus, e as convertListLayoutToFieldLayouts } from "./EditViewPage-BzadJf0a.mjs";
import { g as getTranslation } from "./index-C7lE0pgH.mjs";
const HOOKS = {
  /**
   * Hook that allows to mutate the displayed headers of the list view table
   * @constant
   * @type {string}
   */
  INJECT_COLUMN_IN_TABLE: "Admin/CM/pages/ListView/inject-column-in-table"
};
const { INJECT_COLUMN_IN_TABLE } = HOOKS;
styled(Layouts.Header)`
  overflow-wrap: anywhere;
`;
function PageHeaderCustom(props) {
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      paddingLeft: 10,
      paddingBottom: 4,
      paddingTop: 4,
      direction: "column",
      alignItems: "start",
      children: [
        /* @__PURE__ */ jsx(Typography, { variant: "alpha", children: `${props.contentTypeTitle}` }),
        /* @__PURE__ */ jsx(Typography, { variant: "omega", children: `${props.pagination?.total} found` })
      ]
    }
  );
}
function NoEntriesPage(props) {
  return /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: `${props.contentTypeTitle}` }),
    /* @__PURE__ */ jsx(PageHeaderCustom, { contentTypeTitle: props.contentTypeTitle, pagination: props.pagination }),
    /* @__PURE__ */ jsx(
      Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(CreateButton, { variant: "primary", contentTypeTitle: props.contentTypeTitle }),
          props.list.settings.searchable && /* @__PURE__ */ jsx(
            SearchInput,
            {
              label: `Search for ${props.contentTypeTitle}`,
              placeholder: "Search",
              trackedEvent: "didSearch"
            }
          ),
          props.list.settings.filterable && props.schema ? /* @__PURE__ */ jsx(FiltersImpl, { schema: props.schema }) : null
        ] }),
        endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsx(
            ViewSettingsMenu,
            {
              setHeaders: props.headers,
              resetHeaders: props.resetHeaders,
              headers: props.listFieldLayouts.map(props.callbackfn)
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsx(Box, { background: "neutral0", shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        action: props.canCreate ? /* @__PURE__ */ jsx(CreateButton, { variant: "secondary", contentTypeTitle: props.contentTypeTitle }) : null,
        content: "No content found",
        hasRadius: true,
        icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" })
      }
    ) }) })
  ] });
}
const ListViewPage = () => {
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation);
  const { collectionType, model, schema } = useDoc();
  const { list } = useDocumentLayout(model);
  const [displayedHeaders, setDisplayedHeaders] = React.useState([]);
  const listLayout = usePrev(list.layout);
  React.useEffect(() => {
    if (!isEqual(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);
  const handleSetHeaders = (headers) => {
    setDisplayedHeaders(
      convertListLayoutToFieldLayouts(headers, schema.attributes, list.metadatas)
    );
  };
  const [{ query }] = useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : ""
  });
  const params = React.useMemo(() => buildValidParams(query), [query]);
  const { data, error, isFetching } = useGetAllDocumentsQuery({
    model,
    params
  });
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const { results = [], pagination } = data ?? {};
  React.useEffect(() => {
    if (pagination && pagination.pageCount > 0 && pagination.page > pagination.pageCount) {
      navigate(
        {
          search: stringify({
            ...query,
            page: pagination.pageCount
          })
        },
        { replace: true }
      );
    }
  }, [pagination, formatMessage, query, navigate]);
  const canCreate = true;
  const runHookWaterfall = useStrapiApp("ListViewPage", (state) => state.runHookWaterfall);
  const tableHeaders = React.useMemo(() => {
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName ? schema.info.displayName : "Untitled";
  const handleRowClick = (id) => () => {
    if (schema?.options?.draftAndPublish) {
      navigate({
        pathname: id.toString(),
        search: stringify({ plugins: query.plugins, status: "draft" })
      });
      return;
    }
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins })
    });
  };
  if (!isFetching && results.length === 0) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: `${contentTypeTitle}` }),
    /* @__PURE__ */ jsx(PageHeaderCustom, { contentTypeTitle, pagination }),
    /* @__PURE__ */ jsx(
      Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(CreateButton, { variant: "primary", contentTypeTitle }),
          list.settings.searchable && /* @__PURE__ */ jsx(
            SearchInput,
            {
              disabled: results.length === 0,
              label: `Search for ${contentTypeTitle}`,
              placeholder: "Search",
              trackedEvent: "didSearch"
            }
          ),
          list.settings.filterable && schema ? /* @__PURE__ */ jsx(FiltersImpl, { disabled: results.length === 0, schema }) : null
        ] }),
        endActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsx(
            ViewSettingsMenu,
            {
              setHeaders: handleSetHeaders,
              resetHeaders: () => setDisplayedHeaders(list.layout),
              headers: displayedHeaders.map((header) => header.name)
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
      /* @__PURE__ */ jsx(Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: /* @__PURE__ */ jsxs(Table.Content, { children: [
        /* @__PURE__ */ jsx(Table.Head, { children: tableHeaders.map((header) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...header }, header.name)) }),
        /* @__PURE__ */ jsx(Table.Loading, {}),
        /* @__PURE__ */ jsx(Table.Empty, { action: /* @__PURE__ */ jsx(CreateButton, { variant: "secondary", contentTypeTitle }) }),
        /* @__PURE__ */ jsx(Table.Body, { children: results.map((row) => {
          if (row.publishedAt !== null) {
            console.log("Alert", row);
          }
          console.log(row);
          return /* @__PURE__ */ jsxs(
            Table.Row,
            {
              cursor: "pointer",
              onClick: handleRowClick(row.documentId),
              children: [
                tableHeaders.map(({ cellFormatter, ...header }) => {
                  if (header.name === "status") {
                    const { status } = row;
                    return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(DocumentStatus, { status, maxWidth: "min-content" }) }, header.name);
                  }
                  if (["createdBy", "updatedBy"].includes(header.name.split(".")[0])) {
                    return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: row[header.name.split(".")[0]] ? getDisplayName(row[header.name.split(".")[0]]) : "-" }) }, header.name);
                  }
                  if (typeof cellFormatter === "function") {
                    return /* @__PURE__ */ jsx(Table.Cell, { children: cellFormatter(row, header, { collectionType, model }) }, header.name);
                  }
                  return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(
                    CellContent,
                    {
                      content: row[header.name.split(".")[0]],
                      rowId: row.documentId,
                      ...header
                    }
                  ) }, header.name);
                }),
                /* @__PURE__ */ jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(TableActions, { document: row, schema }) })
              ]
            },
            row.id
          );
        }) })
      ] }) }),
      /* @__PURE__ */ jsxs(
        Pagination.Root,
        {
          ...pagination,
          children: [
            /* @__PURE__ */ jsx(Pagination.PageSize, {}),
            /* @__PURE__ */ jsx(Pagination.Links, {})
          ]
        }
      )
    ] }) })
  ] }) });
};
const ActionsCell = styled(Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
const CreateButton = ({ variant, contentTypeTitle }) => {
  const [{ query }] = useQueryParams();
  return /* @__PURE__ */ jsx(
    Button,
    {
      variant,
      tag: Link,
      startIcon: /* @__PURE__ */ jsx(Plus, {}),
      style: { textDecoration: "none" },
      to: {
        pathname: "create",
        search: stringify({ plugins: query.plugins })
      },
      minWidth: "max-content",
      marginLeft: 2,
      children: `Create new ${contentTypeTitle || "entry"}`
    }
  );
};
const ProtectedListViewPage = () => {
  const { slug = "" } = useParams();
  if (!slug) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsx(ListViewPage, {});
};
export {
  ListViewPage,
  ProtectedListViewPage
};
//# sourceMappingURL=ListViewPage--rLnaS5Z.mjs.map
