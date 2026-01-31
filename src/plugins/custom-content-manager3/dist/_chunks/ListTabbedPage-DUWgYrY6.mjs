import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Page, useNotification, useAPIErrorHandler, useQueryParams, Layouts, SearchInput, Table, Pagination } from "@strapi/strapi/admin";
import { Tabs, Box, EmptyStateLayout, Flex, Typography, Button } from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import { EmptyDocuments } from "@strapi/icons/symbols";
import isEqual from "lodash/isEqual";
import { stringify } from "qs";
import { useParams, useNavigate, Link } from "react-router-dom";
import { styled } from "styled-components";
import { I as InjectionZone, V as ViewSettingsMenu, F as FiltersImpl, T as TableActions, g as getDisplayName, C as CellContent } from "./Filters-DWXpQ5GI.mjs";
import { u as useDoc, a as useDocumentLayout, b as usePrev, c as buildValidParams, d as useGetAllDocumentsQuery, e as convertListLayoutToFieldLayouts, D as DocumentStatus } from "./EditViewPage-CNvIJRVO.mjs";
import { g as getTranslation } from "./index-BnJbh4qZ.mjs";
const ActionsCell = styled(Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
function PageHeaderCustom(props) {
  return /* @__PURE__ */ jsxs(Flex, { paddingLeft: 10, paddingBottom: 4, paddingTop: 4, direction: "column", alignItems: "start", children: [
    /* @__PURE__ */ jsx(Typography, { variant: "alpha", children: props.contentTypeTitle }),
    /* @__PURE__ */ jsx(Typography, { variant: "omega", children: `${props.pagination?.total ?? 0} found` })
  ] });
}
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
function ListTabbedPage({
  tabsConfig,
  hideCreateButton = false
}) {
  const navigate = useNavigate();
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
  const [{ query: tabQuery }, setQuery] = useQueryParams({
    tab: tabsConfig.defaultTab
  });
  const currentTab = tabQuery.tab || tabsConfig.defaultTab;
  const buildTabFilter = React.useCallback(
    (tab) => {
      const tabConfig = tabsConfig.tabs.find((t) => t.value === tab);
      if (tabConfig?.filter) {
        return tabConfig.filter;
      }
      return { [tabsConfig.filterField]: tab };
    },
    [tabsConfig]
  );
  const [{ query }] = useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : "",
    filters: buildTabFilter(currentTab)
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
  }, [pagination, query, navigate]);
  const tableHeaders = React.useMemo(() => {
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName || "Untitled";
  const handleRowClick = (id) => () => {
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins })
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
      return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(DocumentStatus, { status: row.status, maxWidth: "min-content" }) }, header.name);
    }
    if (["createdBy", "updatedBy"].includes(headerBaseName)) {
      return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: row[headerBaseName] ? getDisplayName(row[headerBaseName]) : "-" }) }, header.name);
    }
    if (typeof header.cellFormatter === "function") {
      return /* @__PURE__ */ jsx(Table.Cell, { children: header.cellFormatter(row, header, { collectionType, model }) }, header.name);
    }
    return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(CellContent, { content: row[headerBaseName], rowId: row.documentId, ...header }) }, header.name);
  };
  if (results.length === 0 && !isFetching) {
    return /* @__PURE__ */ jsxs(Page.Main, { children: [
      /* @__PURE__ */ jsx(Page.Title, { children: contentTypeTitle }),
      /* @__PURE__ */ jsx(PageHeaderCustom, { contentTypeTitle, pagination }),
      /* @__PURE__ */ jsx(
        Layouts.Action,
        {
          startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
            !hideCreateButton && /* @__PURE__ */ jsx(CreateButton, { variant: "primary", contentTypeTitle }),
            list.settings.searchable && /* @__PURE__ */ jsx(
              SearchInput,
              {
                label: `Search for ${contentTypeTitle}`,
                placeholder: "Search",
                trackedEvent: "didSearch"
              }
            ),
            list.settings.filterable && schema ? /* @__PURE__ */ jsx(FiltersImpl, { schema }) : null
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
      /* @__PURE__ */ jsxs(Layouts.Content, { children: [
        /* @__PURE__ */ jsx(Tabs.Root, { value: currentTab, onValueChange: handleTabChange, children: /* @__PURE__ */ jsx(Tabs.List, { "aria-label": tabsConfig.ariaLabel || "Filter tabs", children: tabsConfig.tabs.map((tab) => /* @__PURE__ */ jsx(Tabs.Trigger, { value: tab.value, children: tab.label }, tab.value)) }) }),
        /* @__PURE__ */ jsx(Box, { background: "neutral0", shadow: "filterShadow", hasRadius: true, marginTop: 4, children: /* @__PURE__ */ jsx(
          EmptyStateLayout,
          {
            action: !hideCreateButton ? /* @__PURE__ */ jsx(CreateButton, { variant: "secondary", contentTypeTitle }) : void 0,
            content: "No content found",
            hasRadius: true,
            icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" })
          }
        ) })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: contentTypeTitle }),
    /* @__PURE__ */ jsx(PageHeaderCustom, { contentTypeTitle, pagination }),
    /* @__PURE__ */ jsx(
      Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxs(Fragment, { children: [
          list.settings.searchable && /* @__PURE__ */ jsx(
            SearchInput,
            {
              disabled: results.length === 0,
              label: `Search for ${contentTypeTitle}`,
              placeholder: "Search"
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
    /* @__PURE__ */ jsxs(Layouts.Content, { children: [
      /* @__PURE__ */ jsx(Tabs.Root, { value: currentTab, onValueChange: handleTabChange, children: /* @__PURE__ */ jsx(Tabs.List, { "aria-label": tabsConfig.ariaLabel || "Filter tabs", children: tabsConfig.tabs.map((tab) => /* @__PURE__ */ jsx(Tabs.Trigger, { value: tab.value, children: tab.label }, tab.value)) }) }),
      /* @__PURE__ */ jsxs(Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
        /* @__PURE__ */ jsx(Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: /* @__PURE__ */ jsxs(Table.Content, { children: [
          /* @__PURE__ */ jsx(Table.Head, { children: tableHeaders.map((header) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...header }, header.name)) }),
          /* @__PURE__ */ jsx(Table.Loading, {}),
          /* @__PURE__ */ jsx(Table.Empty, {}),
          /* @__PURE__ */ jsx(Table.Body, { children: results.map((row) => /* @__PURE__ */ jsxs(
            Table.Row,
            {
              cursor: "pointer",
              onClick: handleRowClick(row.documentId),
              children: [
                tableHeaders.map((header) => renderCellContent(row, header)),
                /* @__PURE__ */ jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(TableActions, { document: row, schema }) })
              ]
            },
            row.id
          )) })
        ] }) }),
        /* @__PURE__ */ jsxs(Pagination.Root, { ...pagination, children: [
          /* @__PURE__ */ jsx(Pagination.PageSize, {}),
          /* @__PURE__ */ jsx(Pagination.Links, {})
        ] })
      ] })
    ] })
  ] });
}
function ProtectedListTabbedPage(props) {
  const { slug = "" } = useParams();
  if (!slug) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  return /* @__PURE__ */ jsx(ListTabbedPage, { ...props });
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
  return /* @__PURE__ */ jsx(ProtectedListTabbedPage, { tabsConfig: memberApplicationTabsConfig });
};
export {
  ListTabbedPage,
  ProtectedListMemberApplicationPage,
  ProtectedListTabbedPage
};
//# sourceMappingURL=ListTabbedPage-DUWgYrY6.mjs.map
