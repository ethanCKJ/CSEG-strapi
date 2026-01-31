"use strict";
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const index = require("./index-C1QM3Ssu.js");
const designSystem = require("@strapi/design-system");
const Icons = require("@strapi/icons");
const qs = require("qs");
const reactRouterDom = require("react-router-dom");
const styledComponents = require("styled-components");
const EditViewPage = require("./EditViewPage-DORLrjOz.js");
const isEmpty = require("lodash/isEmpty");
const parseISO = require("date-fns/parseISO");
const toString = require("lodash/toString");
const reactIntl = require("react-intl");
const React = require("react");
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
const isEmpty__default = /* @__PURE__ */ _interopDefault(isEmpty);
const parseISO__default = /* @__PURE__ */ _interopDefault(parseISO);
const toString__default = /* @__PURE__ */ _interopDefault(toString);
const React__namespace = /* @__PURE__ */ _interopNamespace(React);
const InjectionZone = ({ area, ...props }) => {
  const components = useInjectionZone(area);
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: components.map((component) => /* @__PURE__ */ jsxRuntime.jsx(component.Component, { ...props }, component.name)) });
};
const useInjectionZone = (area) => {
  const getPlugin = admin.useStrapiApp("useInjectionZone", (state) => state.getPlugin);
  const contentManagerPlugin = getPlugin(index.PLUGIN_ID);
  const [page, position] = area.split(".");
  return contentManagerPlugin.getInjectedComponents(page, position);
};
const getDisplayName = ({
  firstname,
  lastname,
  username,
  email
} = {}) => {
  if (username) {
    return username;
  }
  if (firstname) {
    return `${firstname} ${lastname ?? ""}`.trim();
  }
  return email ?? "";
};
const StyledPencil = styledComponents.styled(Icons.Pencil)`
  path {
    fill: currentColor;
  }
`;
const TableActions = ({ document, schema }) => {
  const { model, collectionType } = EditViewPage.useDoc();
  const navigate = reactRouterDom.useNavigate();
  const [{ query }] = admin.useQueryParams();
  const deleteAction = EditViewPage.useDeleteAction(document.documentId, model, collectionType);
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
      search: qs.stringify({ status })
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          onClick: handleEdit,
          label: "Edit",
          variant: "ghost",
          children: /* @__PURE__ */ jsxRuntime.jsx(StyledPencil, {})
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          onClick: deleteAction.dialog.open,
          label: deleteAction.label,
          variant: deleteAction.variant,
          children: deleteAction.icon
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      EditViewPage.DocumentActionConfirmDialog,
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
  const { formatDate, formatTime, formatNumber } = reactIntl.useIntl();
  let formattedValue = value;
  if (type === "date") {
    formattedValue = formatDate(parseISO__default.default(value), { dateStyle: "full" });
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
  return toString__default.default(formattedValue);
};
const SingleComponent = ({ content, mainField }) => {
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { label: content[mainField.name], children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "25rem", textColor: "neutral800", ellipsis: true, children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: mainField.type, value: content[mainField.name] }) }) });
};
const RepeatableComponent = ({ content, mainField }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (!mainField) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Badge, { children: content.length }),
      formatMessage(
        {
          id: "content-manager.containers.list.items",
          defaultMessage: "{number, plural, =0 {items} one {item} other {items}}"
        },
        { number: content.length }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Content, { children: content.map((item) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { disabled: true, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "50rem", ellipsis: true, children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: mainField.type, value: item[mainField.name] }) }) }, item.id)) })
  ] });
};
const getFileExtension = (ext) => ext && ext[0] === "." ? ext.substring(1) : ext;
const MediaSingle = ({ url, mime, alternativeText, name, ext, formats }) => {
  const fileURL = EditViewPage.prefixFileUrlWithBackendUrl(url);
  if (mime.includes("image")) {
    const thumbnail = formats?.thumbnail?.url;
    const mediaURL = EditViewPage.prefixFileUrlWithBackendUrl(thumbnail) || fileURL;
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Avatar.Item,
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
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { label: fileName, children: /* @__PURE__ */ jsxRuntime.jsx("span", { children: /* @__PURE__ */ jsxRuntime.jsx(FileWrapper, { children: fileExtension }) }) });
};
const FileWrapper = ({ children }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
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
      children: /* @__PURE__ */ jsxRuntime.jsx(FileTypography, { variant: "sigma", textColor: "neutral600", children })
    }
  );
};
const FileTypography = styledComponents.styled(designSystem.Typography)`
  font-size: 0.9rem;
  line-height: 0.9rem;
`;
const MediaMultiple = ({ content }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Avatar.Group, { children: content.map((file, index2) => {
    const key = `${file.id}${index2}`;
    if (index2 === 3) {
      const remainingFiles = `+${content.length - 3}`;
      return /* @__PURE__ */ jsxRuntime.jsx(FileWrapper, { children: remainingFiles }, key);
    }
    if (index2 > 3) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntime.jsx(MediaSingle, { ...file }, key);
  }) });
};
const RelationSingle = ({ mainField, content }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "50rem", textColor: "neutral800", ellipsis: true, children: EditViewPage.getRelationLabel(content, mainField) });
};
const RelationMultiple = ({ mainField, content, rowId, name }) => {
  const { model } = EditViewPage.useDoc();
  const { formatMessage } = reactIntl.useIntl();
  const { notifyStatus } = designSystem.useNotifyAT();
  const [isOpen, setIsOpen] = React__namespace.useState(false);
  const [{ query }] = admin.useQueryParams();
  const locale = query.plugins?.i18n?.locale;
  const [targetField] = name.split(".");
  const { data, isLoading } = EditViewPage.useGetRelationsQuery(
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
  React__namespace.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage({
          id: index.getTranslation("DynamicTable.relation-loaded"),
          defaultMessage: "Relations have been loaded"
        })
      );
    }
  }, [data, formatMessage, notifyStatus]);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { onOpenChange: (isOpen2) => setIsOpen(isOpen2), children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Trigger, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { style: { cursor: "pointer" }, textColor: "neutral800", fontWeight: "regular", children: contentCount > 0 ? formatMessage(
      {
        id: "content-manager.containers.list.items",
        defaultMessage: "{number} {number, plural, =0 {items} one {item} other {items}}"
      },
      { number: contentCount }
    ) : "-" }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Content, { children: [
      isLoading && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { disabled: true, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { small: true, children: formatMessage({
        id: index.getTranslation("ListViewTable.relation-loading"),
        defaultMessage: "Relations are loading"
      }) }) }),
      data?.results && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        data.results.map((entry) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "50rem", ellipsis: true, children: EditViewPage.getRelationLabel(entry, mainField) }) }, entry.documentId)),
        data?.pagination && data?.pagination.total > 10 && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            "aria-disabled": true,
            "aria-label": formatMessage({
              id: index.getTranslation("ListViewTable.relation-more"),
              defaultMessage: "This relation contains more entities than displayed"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "…" })
          }
        )
      ] })
    ] })
  ] });
};
const CellContent = ({ content, mainField, attribute, rowId, name }) => {
  if (!hasContent(content, mainField, attribute)) {
    return /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Typography,
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
        return /* @__PURE__ */ jsxRuntime.jsx(MediaSingle, { ...content });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(MediaMultiple, { content });
    case "relation": {
      if (isSingleRelation(attribute.relation)) {
        return /* @__PURE__ */ jsxRuntime.jsx(RelationSingle, { mainField, content });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(RelationMultiple, { rowId, mainField, content, name });
    }
    case "component":
      if (attribute.repeatable) {
        return /* @__PURE__ */ jsxRuntime.jsx(RepeatableComponent, { mainField, content });
      }
      return /* @__PURE__ */ jsxRuntime.jsx(SingleComponent, { mainField, content });
    case "string":
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { label: content, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: attribute.type, value: content }) }) });
    default:
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { maxWidth: "30rem", ellipsis: true, textColor: "neutral800", children: /* @__PURE__ */ jsxRuntime.jsx(CellValue, { type: attribute.type, value: content }) });
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
    return !isEmpty__default.default(value);
  }
  if (attribute.type === "relation") {
    if (isSingleRelation(attribute.relation)) {
      return !isEmpty__default.default(content);
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
  return !isEmpty__default.default(content);
};
const isSingleRelation = (type) => ["oneToOne", "manyToOne", "oneToOneMorph"].includes(type);
const ViewSettingsMenu = (props) => {
  const [{ query }] = admin.useQueryParams();
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        label: formatMessage({
          id: "components.ViewSettings.tooltip",
          defaultMessage: "View Settings"
        }),
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cog, {})
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { side: "bottom", align: "end", sideOffset: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { alignItems: "stretch", direction: "column", padding: 3, gap: 3, children: /* @__PURE__ */ jsxRuntime.jsx(FieldPicker, { ...props }) }) })
  ] });
};
const FieldPicker = ({ headers = [], resetHeaders, setHeaders }) => {
  const { formatMessage, locale } = reactIntl.useIntl();
  const { schema, model } = EditViewPage.useDoc();
  const { list } = EditViewPage.useDocumentLayout(model);
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const attributes = schema?.attributes ?? {};
  const columns = Object.keys(attributes).filter((name) => EditViewPage.checkIfAttributeIsDisplayable(attributes[name])).map((name) => ({
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
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
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", gap: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "legend", variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "containers.list.displayedFields",
            defaultMessage: "Displayed fields"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.TextButton, { onClick: handleReset, children: formatMessage({
            id: "app.components.Button.reset",
            defaultMessage: "Reset"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", children: columns.map((header) => {
          const isActive = headers.includes(header.name);
          return /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Flex,
            {
              wrap: "wrap",
              gap: 2,
              background: isActive ? "primary100" : "transparent",
              hasRadius: true,
              padding: 2,
              marginBottom: 1,
              children: /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Checkbox,
                {
                  onCheckedChange: () => handleChange(header.name),
                  checked: isActive,
                  name: header.name,
                  children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontSize: 1, children: header.label })
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
const USER_FILTER_ATTRIBUTES = [...EditViewPage.CREATOR_FIELDS, "strapi_assignee"];
const FiltersImpl = ({ disabled, schema }) => {
  const { attributes, uid: model, options } = schema;
  const { formatMessage, locale } = reactIntl.useIntl();
  const allPermissions = admin.useAuth("FiltersImpl", (state) => state.permissions);
  const [{ query }] = admin.useQueryParams();
  const { schemas } = EditViewPage.useContentTypeSchema();
  const canReadAdminUsers = React__namespace.useMemo(
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
  const { data: userData, isLoading: isLoadingAdminUsers } = admin.useAdminUsers(
    { filters: { id: { $in: selectedUserIds } } },
    {
      // fetch the list of admin users only if the filter contains users and the
      // current user has permissions to display users
      skip: selectedUserIds.length === 0 || !canReadAdminUsers
    }
  );
  const { users = [] } = userData ?? {};
  const { metadata } = EditViewPage.useGetContentTypeConfigurationQuery(model, {
    selectFromResult: ({ data }) => ({ metadata: data?.contentType.metadatas ?? {} })
  });
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const displayedFilters = React__namespace.useMemo(() => {
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
      ...canReadAdminUsers ? EditViewPage.CREATOR_FIELDS : []
    ].filter((name) => !index.ADMIN_HIDDEN_FIELDS.includes(name)).map((name) => {
      const attribute = attributes[name];
      if (NOT_ALLOWED_FILTERS.includes(attribute.type)) {
        return null;
      }
      const { mainField: mainFieldName = "", label } = metadata[name].list;
      let filter = {
        name,
        label: label ?? "",
        mainField: EditViewPage.getMainField(attribute, mainFieldName, { schemas, components: {} }),
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
  return /* @__PURE__ */ jsxRuntime.jsxs(
    admin.Filters.Root,
    {
      disabled,
      options: displayedFilters,
      onChange: handleFilterChange,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(admin.Filters.Trigger, {}),
        /* @__PURE__ */ jsxRuntime.jsx(admin.Filters.Popover, { zIndex: 499 }),
        /* @__PURE__ */ jsxRuntime.jsx(admin.Filters.List, {})
      ]
    }
  );
};
const AdminUsersFilter = ({ name }) => {
  const [pageSize, setPageSize] = React__namespace.useState(10);
  const [search, setSearch] = React__namespace.useState("");
  const { formatMessage } = reactIntl.useIntl();
  const debouncedSearch = EditViewPage.useDebounce(search, 300);
  const { data, isLoading } = admin.useAdminUsers({
    pageSize,
    _q: debouncedSearch
  });
  const field = admin.useField(name);
  const handleOpenChange = (isOpen) => {
    if (!isOpen) {
      setPageSize(10);
    }
  };
  const { users = [], pagination } = data ?? {};
  const { pageCount = 1, page = 1 } = pagination ?? {};
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Combobox,
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
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: user.id.toString(), children: getDisplayName(user) }, user.id);
      })
    }
  );
};
exports.CellContent = CellContent;
exports.FiltersImpl = FiltersImpl;
exports.InjectionZone = InjectionZone;
exports.TableActions = TableActions;
exports.ViewSettingsMenu = ViewSettingsMenu;
exports.getDisplayName = getDisplayName;
//# sourceMappingURL=Filters-BnuwZQKa.js.map
