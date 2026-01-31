"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const reactDnd = require("react-dnd");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
const styledComponents = require("styled-components");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const index = require("./index-CJAgv_Ni.js");
const ListViewPage = require("./ListViewPage-fgFn6ii0.js");
const useDeleteAction = require("./useDeleteAction-WNd52Gyv.js");
const React = require("react");
require("@strapi/icons");
require("@strapi/icons/symbols");
const isEqual = require("lodash/isEqual");
const qs = require("qs");
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
function memoize(fn) {
  var cache = /* @__PURE__ */ Object.create(null);
  return function(arg) {
    if (cache[arg] === void 0) cache[arg] = fn(arg);
    return cache[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(
  function(prop) {
    return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
  }
  /* Z+1 */
);
const getTranslation = (id) => `${index.PLUGIN_ID}.${id}`;
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsxs("h1", { children: [
    "Welcome to ",
    formatMessage({ id: getTranslation("plugin.name") })
  ] }) });
};
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
const ListMemberApplicationPage = () => {
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler(useDeleteAction.getTranslation);
  const { collectionType, model, schema } = useDeleteAction.useDoc();
  const { list } = useDeleteAction.useDocumentLayout(model);
  const [displayedHeaders, setDisplayedHeaders] = React__namespace.useState([]);
  const listLayout = useDeleteAction.usePrev(list.layout);
  React__namespace.useEffect(() => {
    if (!isEqual__default.default(listLayout, list.layout)) {
      setDisplayedHeaders(list.layout);
    }
  }, [list.layout, listLayout]);
  const handleSetHeaders = (headers) => {
    setDisplayedHeaders(
      useDeleteAction.convertListLayoutToFieldLayouts(headers, schema.attributes, list.metadatas)
    );
  };
  const [{
    query: { tab }
  }, setQuery] = admin.useQueryParams({
    tab: "pending"
  });
  const [{ query }] = admin.useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : "",
    filters: {
      applicationStatus: tab
    }
  });
  console.log("query", query);
  const params = React__namespace.useMemo(() => useDeleteAction.buildValidParams(query), [query]);
  const { data, error, isFetching } = useDeleteAction.useGetAllDocumentsQuery({
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
    const headers = {
      displayedHeaders
    };
    const formattedHeaders = headers.displayedHeaders.map((header) => {
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
    list,
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
  console.log("ListMemberApplicationPage contentTypeTitle:", contentTypeTitle);
  const handleRowClick = (id) => () => {
    navigate({
      pathname: id.toString(),
      search: qs.stringify({ plugins: query.plugins })
    });
  };
  const handleTabChange = (newTab) => {
    if (newTab === "pending" || newTab === "approved" || newTab === "rejected") {
      setQuery({ tab: newTab }, "push", true);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: `${contentTypeTitle}` }),
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
          list.settings.filterable && schema ? /* @__PURE__ */ jsxRuntime.jsx(ListViewPage.FiltersImpl, { disabled: results.length === 0, schema }) : null
        ] }),
        endActions: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(ListViewPage.InjectionZone, { area: "listView.actions" }),
          /* @__PURE__ */ jsxRuntime.jsx(
            ListViewPage.ViewSettingsMenu,
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
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Root, { value: tab, onValueChange: handleTabChange, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.List, { "aria-label": "View types of member applications", children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "pending", children: "Pending" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "approved", children: "Approved" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "rejected", children: "Rejected" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
        /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: /* @__PURE__ */ jsxRuntime.jsxs(admin.Table.Content, { children: [
          /* @__PURE__ */ jsxRuntime.jsxs(admin.Table.Head, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(admin.Table.HeaderCheckboxCell, {}),
            tableHeaders.map((header) => /* @__PURE__ */ jsxRuntime.jsx(admin.Table.HeaderCell, { ...header }, header.name))
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Loading, {}),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Empty, {}),
          /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Body, { children: results.map((row) => {
            return /* @__PURE__ */ jsxRuntime.jsxs(
              admin.Table.Row,
              {
                cursor: "pointer",
                onClick: handleRowClick(row.documentId),
                children: [
                  /* @__PURE__ */ jsxRuntime.jsx(admin.Table.CheckboxCell, { id: row.id }),
                  tableHeaders.map(({ cellFormatter, ...header }) => {
                    if (header.name === "status") {
                      const { status } = row;
                      return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(useDeleteAction.DocumentStatus, { status, maxWidth: "min-content" }) }, header.name);
                    }
                    if (["createdBy", "updatedBy"].includes(header.name.split(".")[0])) {
                      return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: row[header.name.split(".")[0]] ? useDeleteAction.getDisplayName(row[header.name.split(".")[0]]) : "-" }) }, header.name);
                    }
                    if (typeof cellFormatter === "function") {
                      return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: cellFormatter(row, header, { collectionType, model }) }, header.name);
                    }
                    return /* @__PURE__ */ jsxRuntime.jsx(admin.Table.Cell, { children: /* @__PURE__ */ jsxRuntime.jsx(
                      ListViewPage.CellContent,
                      {
                        content: row[header.name.split(".")[0]],
                        rowId: row.documentId,
                        ...header
                      }
                    ) }, header.name);
                  }),
                  /* @__PURE__ */ jsxRuntime.jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(ListViewPage.TableActions, { document: row }) })
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
      ] })
    ] })
  ] }) });
};
const ActionsCell = styledComponents.styled(admin.Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
const ProtectedListMemberApplicationPage = () => {
  const { slug = "" } = reactRouterDom.useParams();
  if (!slug) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  console.log("ProtectedListMemberApplicationPage before return");
  return /* @__PURE__ */ jsxRuntime.jsx(ListMemberApplicationPage, {});
};
const CollectionTypePages = () => {
  const { collectionType, slug } = reactRouterDom.useParams();
  if (collectionType !== index.COLLECTION_TYPES && collectionType !== index.SINGLE_TYPES) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  if (slug === useDeleteAction.MEMBER_APPLICATION_MODEL) {
    return /* @__PURE__ */ jsxRuntime.jsx(ProtectedListMemberApplicationPage, {});
  }
  return collectionType === index.COLLECTION_TYPES ? /* @__PURE__ */ jsxRuntime.jsx(ListViewPage.ProtectedListViewPage, {}) : /* @__PURE__ */ jsxRuntime.jsx(useDeleteAction.ProtectedEditViewPage, {});
};
const App = () => {
  const parentTheme = styledComponents.useTheme();
  const mergedTheme = { ...designSystem.darkTheme, sizes: parentTheme.sizes };
  return (
    // StyleSheetManager silences warnings about invalid HTML attributes from 'styled-components'
    /* @__PURE__ */ jsxRuntime.jsx(
      styledComponents.StyleSheetManager,
      {
        shouldForwardProp: (propName, elementToBeCreated) => {
          if (typeof elementToBeCreated === "string") {
            return isPropValid(propName);
          }
          return true;
        },
        children: /* @__PURE__ */ jsxRuntime.jsx(reactDnd.DndProvider, { backend: reactDndHtml5Backend.HTML5Backend, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.DesignSystemProvider, { theme: mergedTheme, locale: "en-GB", children: /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/:collectionType/:slug", element: /* @__PURE__ */ jsxRuntime.jsx(CollectionTypePages, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "/:collectionType/:slug/:id", element: /* @__PURE__ */ jsxRuntime.jsx(useDeleteAction.ProtectedEditViewPage, {}) }),
          /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
        ] }) }) })
      }
    )
  );
};
exports.App = App;
//# sourceMappingURL=App-Y17rQgss.js.map
