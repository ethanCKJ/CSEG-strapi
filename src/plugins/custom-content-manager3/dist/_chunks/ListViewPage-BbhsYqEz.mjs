import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useStrapiApp, useQueryParams, useAuth, useAdminUsers, Filters, useField, Page, useNotification, useAPIErrorHandler, Layouts, SearchInput, Table, Pagination } from "@strapi/strapi/admin";
import { Flex, IconButton, Menu, Badge, Typography, Tooltip, Avatar, useNotifyAT, Loader, Popover, useCollator, TextButton, Checkbox, Combobox, ComboboxOption, Box, EmptyStateLayout, Button } from "@strapi/design-system";
import { Pencil, Cog, Plus } from "@strapi/icons";
import { EmptyDocuments } from "@strapi/icons/symbols";
import isEqual from "lodash/isEqual";
import { stringify } from "qs";
import { useIntl } from "react-intl";
import { useNavigate, useParams, Link } from "react-router-dom";
import { styled } from "styled-components";
import { a as PLUGIN_ID } from "./index-D2iAzhCr.mjs";
import { u as useDoc, k as useDeleteAction, l as DocumentActionConfirmDialog, p as prefixFileUrlWithBackendUrl, m as getRelationLabel, n as useGetRelationsQuery, g as getTranslation, a as useDocumentLayout, o as checkIfAttributeIsDisplayable, j as useContentTypeSchema, C as CREATOR_FIELDS, q as useGetContentTypeConfigurationQuery, A as ADMIN_HIDDEN_FIELDS, r as getMainField, e as getDisplayName, s as useDebounce, b as usePrev, c as buildValidParams, d as useGetAllDocumentsQuery, H as HOOKS, D as DocumentStatus, f as convertListLayoutToFieldLayouts } from "./useDeleteAction-DqMEfkh9.mjs";
import isEmpty from "lodash/isEmpty";
import parseISO from "date-fns/parseISO";
import toString from "lodash/toString";
const InjectionZone = ({ area, ...props }) => {
  const components = useInjectionZone(area);
  return /* @__PURE__ */ jsx(Fragment, { children: components.map((component) => /* @__PURE__ */ jsx(component.Component, { ...props }, component.name)) });
};
const useInjectionZone = (area) => {
  const getPlugin = useStrapiApp("useInjectionZone", (state) => state.getPlugin);
  const contentManagerPlugin = getPlugin(PLUGIN_ID);
  const [page, position] = area.split(".");
  return contentManagerPlugin.getInjectedComponents(page, position);
};
const StyledPencil = styled(Pencil)`
  path {
    fill: currentColor;
  }
`;
const TableActions = ({ document, schema }) => {
  const { model, collectionType } = useDoc();
  const navigate = useNavigate();
  const [{ query }] = useQueryParams();
  const deleteAction = useDeleteAction(document.documentId, model, collectionType);
  const handleEdit = () => {
    if (!document.documentId) {
      console.error(
        "You're trying to edit a document without an id, this is likely a bug with Strapi. Please open an issue."
      );
      return;
    }
    const status = schema?.options?.draftAndPublish ? "draft" : "published";
    navigate({
      pathname: document.documentId,
      search: stringify({ status })
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Flex, { gap: 2, children: [
      /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: handleEdit,
          label: "Edit",
          variant: "ghost",
          children: /* @__PURE__ */ jsx(StyledPencil, {})
        }
      ),
      /* @__PURE__ */ jsx(
        IconButton,
        {
          onClick: deleteAction.dialog.open,
          label: deleteAction.label,
          variant: deleteAction.variant,
          children: deleteAction.icon
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      DocumentActionConfirmDialog,
      {
        title: "Confirmation",
        onClose: deleteAction.dialog.close,
        isOpen: deleteAction.dialog.isOpen,
        onConfirm: deleteAction.onClick,
        content: deleteAction.dialog.content
      }
    )
  ] });
};
const CellValue = ({ type, value }) => {
  const { formatDate, formatTime, formatNumber } = useIntl();
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(parseISO(value), { dateStyle: "full" });
  }
  if (type === "datetime") {
    formattedValue = formatDate(value, { dateStyle: "full", timeStyle: "short" });
  }
  if (type === "time") {
    const [hour, minute, second] = value.split(":");
    const date = /* @__PURE__ */ new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(second);
    formattedValue = formatTime(date, {
      timeStyle: "short"
    });
  }
  if (["float", "decimal"].includes(type)) {
    formattedValue = formatNumber(value, {
      // Should be kept in sync with the corresponding value
      // in the design-system/NumberInput: https://github.com/strapi/design-system/blob/main/packages/strapi-design-system/src/NumberInput/NumberInput.js#L53
      maximumFractionDigits: 20
    });
  }
  if (["integer", "biginteger"].includes(type)) {
    formattedValue = formatNumber(value, { maximumFractionDigits: 0 });
  }
  return toString(formattedValue);
};
const SingleComponent = ({ content, mainField }) => {
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsx(Tooltip, { label: content[mainField.name], children: /* @__PURE__ */ jsx(Typography, { maxWidth: "25rem", textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsx(CellValue, { type: mainField.type, value: content[mainField.name] }) }) });
};
const RepeatableComponent = ({ content, mainField }) => {
  const { formatMessage } = useIntl();
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsxs(Menu.Root, { children: [
    /* @__PURE__ */ jsxs(Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsx(Badge, { children: content.length }),
      formatMessage(
        {
          id: "content-manager.containers.list.items",
          defaultMessage: "{number, plural, =0 {items} one {item} other {items}}"
        },
        { number: content.length }
      )
    ] }),
    /* @__PURE__ */ jsx(Menu.Content, { children: content.map((item) => /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(Typography, { maxWidth: "50rem", ellipsis: true, children: /* @__PURE__ */ jsx(CellValue, { type: mainField.type, value: item[mainField.name] }) }) }, item.id)) })
  ] });
};
const getFileExtension = (ext) => ext && ext[0] === "." ? ext.substring(1) : ext;
const MediaSingle = ({ url, mime, alternativeText, name, ext, formats }) => {
  const fileURL = prefixFileUrlWithBackendUrl(url);
  if (mime.includes("image")) {
    const thumbnail = formats?.thumbnail?.url;
    const mediaURL = prefixFileUrlWithBackendUrl(thumbnail) || fileURL;
    return /* @__PURE__ */ jsx(
      Avatar.Item,
      {
        src: mediaURL,
        alt: alternativeText || name,
        fallback: alternativeText || name,
        preview: true
      }
    );
  }
  const fileExtension = getFileExtension(ext);
  const fileName = name.length > 100 ? `${name.substring(0, 100)}...` : name;
  return /* @__PURE__ */ jsx(Tooltip, { label: fileName, children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsx(FileWrapper, { children: fileExtension }) }) });
};
const FileWrapper = ({ children }) => {
  return /* @__PURE__ */ jsx(
    Flex,
    {
      tag: "span",
      position: "relative",
      borderRadius: "50%",
      width: "26px",
      height: "26px",
      borderColor: "neutral200",
      background: "neutral150",
      paddingLeft: "1px",
      justifyContent: "center",
      alignItems: "center",
      children: /* @__PURE__ */ jsx(FileTypography, { variant: "sigma", textColor: "neutral600", children })
    }
  );
};
const FileTypography = styled(Typography)`
  font-size: 0.9rem;
  line-height: 0.9rem;
`;
const MediaMultiple = ({ content }) => {
  return /* @__PURE__ */ jsx(Avatar.Group, { children: content.map((file, index) => {
    const key = `${file.id}${index}`;
    if (index === 3) {
      const remainingFiles = `+${content.length - 3}`;
      return /* @__PURE__ */ jsx(FileWrapper, { children: remainingFiles }, key);
    }
    if (index > 3) {
      return null;
    }
    return /* @__PURE__ */ jsx(MediaSingle, { ...file }, key);
  }) });
};
const RelationSingle = ({ mainField, content }) => {
  return /* @__PURE__ */ jsx(Typography, { maxWidth: "50rem", textColor: "neutral800", ellipsis: true, children: getRelationLabel(content, mainField) });
};
const RelationMultiple = ({ mainField, content, rowId, name }) => {
  const { model } = useDoc();
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const [isOpen, setIsOpen] = React.useState(false);
  const [{ query }] = useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const [targetField] = name.split(".");
  const { data, isLoading } = useGetRelationsQuery(
    {
      model,
      id: rowId,
      targetField,
      params: { locale }
    },
    {
      skip: !isOpen,
      refetchOnMountOrArgChange: true
    }
  );
  const contentCount = Array.isArray(content) ? content.length : content.count;
  React.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: getTranslation("DynamicTable.relation-loaded"),
          defaultMessage: "Relations have been loaded"
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return /* @__PURE__ */ jsxs(Menu.Root, { onOpenChange: (isOpen2) => setIsOpen(isOpen2), children: [
    /* @__PURE__ */ jsx(Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(Typography, { style: { cursor: "pointer" }, textColor: "neutral800", fontWeight: "regular", children: contentCount > 0 ? formatMessage(
      {
        id: "content-manager.containers.list.items",
        defaultMessage: "{number} {number, plural, =0 {items} one {item} other {items}}"
      },
      { number: contentCount }
    ) : "-" }) }),
    /* @__PURE__ */ jsxs(Menu.Content, { children: [
      isLoading && /* @__PURE__ */ jsx(Menu.Item, { disabled: true, children: /* @__PURE__ */ jsx(Loader, { small: true, children: formatMessage({
        id: getTranslation("ListViewTable.relation-loading"),
        defaultMessage: "Relations are loading"
      }) }) }),
      data?.results && /* @__PURE__ */ jsxs(Fragment, { children: [
        data.results.map((entry) => /* @__PURE__ */ jsx(Menu.Item, { children: /* @__PURE__ */ jsx(Typography, { maxWidth: "50rem", ellipsis: true, children: getRelationLabel(entry, mainField) }) }, entry.documentId)),
        data?.pagination && data?.pagination.total > 10 && /* @__PURE__ */ jsx(
          Menu.Item,
          {
            "aria-disabled": true,
            "aria-label": formatMessage({
              id: getTranslation("ListViewTable.relation-more"),
              defaultMessage: "This relation contains more entities than displayed"
            }),
            children: /* @__PURE__ */ jsx(Typography, { children: "…" })
          }
        )
      ] })
    ] })
  ] });
};
const CellContent = ({ content, mainField, attribute, rowId, name }) => {
  if (!hasContent(content, mainField, attribute)) {
    return /* @__PURE__ */ jsx(
      Typography,
      {
        textColor: "neutral800",
        paddingLeft: attribute.type === "relation" ? "1.6rem" : 0,
        paddingRight: attribute.type === "relation" ? "1.6rem" : 0,
        children: "-"
      }
    );
  }
  switch (attribute.type) {
    case "media":
      if (!attribute.multiple) {
        return /* @__PURE__ */ jsx(MediaSingle, { ...content });
      }
      return /* @__PURE__ */ jsx(MediaMultiple, { content });
    case "relation": {
      if (isSingleRelation(attribute.relation)) {
        return /* @__PURE__ */ jsx(RelationSingle, { mainField, content });
      }
      return /* @__PURE__ */ jsx(RelationMultiple, { rowId, mainField, content, name });
    }
    case "component":
      if (attribute.repeatable) {
        return /* @__PURE__ */ jsx(RepeatableComponent, { mainField, content });
      }
      return /* @__PURE__ */ jsx(SingleComponent, { mainField, content });
    case "string":
      return /* @__PURE__ */ jsx(Tooltip, { label: content, children: /* @__PURE__ */ jsx(Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsx(CellValue, { type: attribute.type, value: content }) }) });
    default:
      return /* @__PURE__ */ jsx(Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsx(CellValue, { type: attribute.type, value: content }) });
  }
};
const hasContent = (content, mainField, attribute) => {
  if (attribute.type === "component") {
    if (attribute.repeatable || !mainField) {
      return content?.length > 0;
    }
    const value = content?.[mainField.name];
    if (mainField.name === "id" && ![void 0, null].includes(value)) {
      return true;
    }
    return !isEmpty(value);
  }
  if (attribute.type === "relation") {
    if (isSingleRelation(attribute.relation)) {
      return !isEmpty(content);
    }
    if (Array.isArray(content)) {
      return content.length > 0;
    }
    return content?.count > 0;
  }
  if (["integer", "decimal", "float", "number"].includes(attribute.type)) {
    return typeof content === "number";
  }
  if (attribute.type === "boolean") {
    return content !== null;
  }
  return !isEmpty(content);
};
const isSingleRelation = (type) => ["oneToOne", "manyToOne", "oneToOneMorph"].includes(type);
const ViewSettingsMenu = (props) => {
  const [{ query }] = useQueryParams();
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Popover.Root, { children: [
    /* @__PURE__ */ jsx(Popover.Trigger, { children: /* @__PURE__ */ jsx(
      IconButton,
      {
        label: formatMessage({
          id: "components.ViewSettings.tooltip",
          defaultMessage: "View Settings"
        }),
        children: /* @__PURE__ */ jsx(Cog, {})
      }
    ) }),
    /* @__PURE__ */ jsx(Popover.Content, { side: "bottom", align: "end", sideOffset: 4, children: /* @__PURE__ */ jsx(Flex, { alignItems: "stretch", direction: "column", padding: 3, gap: 3, children: /* @__PURE__ */ jsx(FieldPicker, { ...props }) }) })
  ] });
};
const FieldPicker = ({ headers = [], resetHeaders, setHeaders }) => {
  const { formatMessage, locale } = useIntl();
  const { schema, model } = useDoc();
  const { list } = useDocumentLayout(model);
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const attributes = schema?.attributes ?? {};
  const columns = Object.keys(attributes).filter((name) => checkIfAttributeIsDisplayable(attributes[name])).map((name) => ({
    name,
    label: list.metadatas[name]?.label ?? ""
  })).sort((a, b) => formatter.compare(a.label, b.label));
  const handleChange = (name) => {
    const newHeaders = headers.includes(name) ? headers.filter((header) => header !== name) : [...headers, name];
    setHeaders(newHeaders);
  };
  const handleReset = () => {
    resetHeaders();
  };
  return /* @__PURE__ */ jsxs(
    Flex,
    {
      tag: "fieldset",
      direction: "column",
      alignItems: "stretch",
      gap: 1,
      borderWidth: 0,
      maxHeight: "240px",
      padding: 1,
      overflow: "auto",
      children: [
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", gap: 2, children: [
          /* @__PURE__ */ jsx(Typography, { tag: "legend", variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "containers.list.displayedFields",
            defaultMessage: "Displayed fields"
          }) }),
          /* @__PURE__ */ jsx(TextButton, { onClick: handleReset, children: formatMessage({
            id: "app.components.Button.reset",
            defaultMessage: "Reset"
          }) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", children: columns.map((header) => {
          const isActive = headers.includes(header.name);
          return /* @__PURE__ */ jsx(
            Flex,
            {
              wrap: "wrap",
              gap: 2,
              background: isActive ? "primary100" : "transparent",
              hasRadius: true,
              padding: 2,
              marginBottom: 1,
              children: /* @__PURE__ */ jsx(
                Checkbox,
                {
                  onCheckedChange: () => handleChange(header.name),
                  checked: isActive,
                  name: header.name,
                  children: /* @__PURE__ */ jsx(Typography, { fontSize: 1, children: header.label })
                }
              )
            },
            header.name
          );
        }) })
      ]
    }
  );
};
const NOT_ALLOWED_FILTERS = [
  "json",
  "component",
  "media",
  "richtext",
  "dynamiczone",
  "password",
  "blocks"
];
const DEFAULT_ALLOWED_FILTERS = ["createdAt", "updatedAt"];
const USER_FILTER_ATTRIBUTES = [...CREATOR_FIELDS, "strapi_assignee"];
const FiltersImpl = ({ disabled, schema }) => {
  const { attributes, uid: model, options } = schema;
  const { formatMessage, locale } = useIntl();
  const allPermissions = useAuth("FiltersImpl", (state) => state.permissions);
  const [{ query }] = useQueryParams();
  const { schemas } = useContentTypeSchema();
  const canReadAdminUsers = React.useMemo(
    () => allPermissions.filter(
      (permission) => permission.action === "admin::users.read" && permission.subject === null
    ).length > 0,
    [allPermissions]
  );
  const selectedUserIds = (query?.filters?.$and ?? []).reduce((acc, filter) => {
    const [key, value] = Object.entries(filter)[0];
    if (typeof value.id !== "object") {
      return acc;
    }
    const id = value.id.$eq || value.id.$ne;
    const attribute = attributes[key];
    const isAdminUserRelation = attribute?.type === "relation" && "target" in attribute && attribute.target === "admin::user";
    if (id && (isAdminUserRelation || USER_FILTER_ATTRIBUTES.includes(key)) && !acc.includes(id)) {
      acc.push(id);
    }
    return acc;
  }, []);
  const { data: userData, isLoading: isLoadingAdminUsers } = useAdminUsers(
    { filters: { id: { $in: selectedUserIds } } },
    {
      // fetch the list of admin users only if the filter contains users and the
      // current user has permissions to display users
      skip: selectedUserIds.length === 0 || !canReadAdminUsers
    }
  );
  const { users = [] } = userData ?? {};
  const { metadata } = useGetContentTypeConfigurationQuery(model, {
    selectFromResult: ({ data }) => ({ metadata: data?.contentType.metadatas ?? {} })
  });
  const formatter = useCollator(locale, {
    sensitivity: "base"
  });
  const displayedFilters = React.useMemo(() => {
    const [{ properties: { fields = [] } = { fields: [] } }] = allPermissions.filter(
      (permission) => permission.action === "plugin::content-manager.explorer.read" && permission.subject === model
    );
    const allowedFields = fields.filter((field) => {
      const attribute = attributes[field] ?? {};
      return attribute.type && !NOT_ALLOWED_FILTERS.includes(attribute.type);
    });
    return [
      "id",
      "documentId",
      ...allowedFields,
      ...DEFAULT_ALLOWED_FILTERS,
      ...canReadAdminUsers ? CREATOR_FIELDS : []
    ].filter((name) => !ADMIN_HIDDEN_FIELDS.includes(name)).map((name) => {
      const attribute = attributes[name];
      if (NOT_ALLOWED_FILTERS.includes(attribute.type)) {
        return null;
      }
      const { mainField: mainFieldName = "", label } = metadata[name].list;
      let filter = {
        name,
        label: label ?? "",
        mainField: getMainField(attribute, mainFieldName, { schemas, components: {} }),
        // @ts-expect-error – TODO: this is filtered out above in the `allowedFields` call but TS complains, is there a better way to solve this?
        type: attribute.type
      };
      if (attribute.type === "relation" && "target" in attribute && attribute.target === "admin::user") {
        filter = {
          ...filter,
          input: AdminUsersFilter,
          options: users.map((user) => ({
            label: getDisplayName(user),
            value: user.id.toString()
          })),
          operators: [
            {
              label: formatMessage({
                id: "components.FilterOptions.FILTER_TYPES.$eq",
                defaultMessage: "is"
              }),
              value: "$eq"
            },
            {
              label: formatMessage({
                id: "components.FilterOptions.FILTER_TYPES.$ne",
                defaultMessage: "is not"
              }),
              value: "$ne"
            }
          ],
          mainField: {
            name: "id",
            type: "integer"
          }
        };
      }
      if (attribute.type === "enumeration") {
        filter = {
          ...filter,
          options: attribute.enum.map((value) => ({
            label: value,
            value
          }))
        };
      }
      return filter;
    }).filter(Boolean).toSorted((a, b) => formatter.compare(a.label, b.label));
  }, [
    allPermissions,
    canReadAdminUsers,
    model,
    attributes,
    metadata,
    schemas,
    users,
    formatMessage,
    formatter
  ]);
  const handleFilterChange = (data) => {
    attributes[data.name];
  };
  return /* @__PURE__ */ jsxs(
    Filters.Root,
    {
      disabled,
      options: displayedFilters,
      onChange: handleFilterChange,
      children: [
        /* @__PURE__ */ jsx(Filters.Trigger, {}),
        /* @__PURE__ */ jsx(Filters.Popover, { zIndex: 499 }),
        /* @__PURE__ */ jsx(Filters.List, {})
      ]
    }
  );
};
const AdminUsersFilter = ({ name }) => {
  const [pageSize, setPageSize] = React.useState(10);
  const [search, setSearch] = React.useState("");
  const { formatMessage } = useIntl();
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useAdminUsers({
    pageSize,
    _q: debouncedSearch
  });
  const field = useField(name);
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setPageSize(10);
    }
  };
  const { users = [], pagination } = data ?? {};
  const { pageCount = 1, page = 1 } = pagination ?? {};
  return /* @__PURE__ */ jsx(
    Combobox,
    {
      value: field.value,
      "aria-label": formatMessage({
        id: "content-manager.components.Filters.usersSelect.label",
        defaultMessage: "Search and select a user to filter"
      }),
      onOpenChange: handleOpenChange,
      onChange: (value) => field.onChange(name, value),
      loading: isLoading,
      onLoadMore: () => setPageSize(pageSize + 10),
      hasMoreItems: page < pageCount,
      onInputChange: (e) => {
        setSearch(e.currentTarget.value);
      },
      children: users.map((user) => {
        return /* @__PURE__ */ jsx(ComboboxOption, { value: user.id.toString(), children: getDisplayName(user) }, user.id);
      })
    }
  );
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
const ListViewPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ListViewPage,
  ProtectedListViewPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  CellContent as C,
  FiltersImpl as F,
  InjectionZone as I,
  ListViewPage$1 as L,
  ProtectedListViewPage as P,
  TableActions as T,
  ViewSettingsMenu as V
};
//# sourceMappingURL=ListViewPage-BbhsYqEz.mjs.map
