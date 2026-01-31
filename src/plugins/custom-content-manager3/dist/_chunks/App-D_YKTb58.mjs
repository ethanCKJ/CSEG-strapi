import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { Page, useNotification, useAPIErrorHandler, useQueryParams, Layouts, SearchInput, Table, Pagination } from "@strapi/strapi/admin";
import { useParams, useNavigate, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { styled, useTheme, StyleSheetManager } from "styled-components";
import { Main, Tabs, Flex, Typography, darkTheme, DesignSystemProvider } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { P as PLUGIN_ID, C as COLLECTION_TYPES, S as SINGLE_TYPES } from "./index-D2iAzhCr.mjs";
import { I as InjectionZone, V as ViewSettingsMenu, F as FiltersImpl, C as CellContent, T as TableActions, P as ProtectedListViewPage } from "./ListViewPage-BbhsYqEz.mjs";
import { g as getTranslation$1, u as useDoc, a as useDocumentLayout, b as usePrev, c as buildValidParams, d as useGetAllDocumentsQuery, D as DocumentStatus, e as getDisplayName, f as convertListLayoutToFieldLayouts, P as ProtectedEditViewPage, M as MEMBER_APPLICATION_MODEL } from "./useDeleteAction-DqMEfkh9.mjs";
import * as React from "react";
import "@strapi/icons";
import "@strapi/icons/symbols";
import isEqual from "lodash/isEqual";
import { stringify } from "qs";
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
const getTranslation = (id) => `${PLUGIN_ID}.${id}`;
const HomePage = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs("h1", { children: [
    "Welcome to ",
    formatMessage({ id: getTranslation("plugin.name") })
  ] }) });
};
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
const ListMemberApplicationPage = () => {
  const navigate = useNavigate();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler(getTranslation$1);
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
  const [{
    query: { tab }
  }, setQuery] = useQueryParams({
    tab: "pending"
  });
  const [{ query }] = useQueryParams({
    page: "1",
    pageSize: list.settings.pageSize.toString(),
    sort: list.settings.defaultSortBy ? `${list.settings.defaultSortBy}:${list.settings.defaultSortOrder}` : "",
    filters: {
      applicationStatus: tab
    }
  });
  console.log("query", query);
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  if (error) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  const contentTypeTitle = schema?.info.displayName ? schema.info.displayName : "Untitled";
  console.log("ListMemberApplicationPage contentTypeTitle:", contentTypeTitle);
  const handleRowClick = (id) => () => {
    navigate({
      pathname: id.toString(),
      search: stringify({ plugins: query.plugins })
    });
  };
  const handleTabChange = (newTab) => {
    if (newTab === "pending" || newTab === "approved" || newTab === "rejected") {
      setQuery({ tab: newTab }, "push", true);
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: `${contentTypeTitle}` }),
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
      /* @__PURE__ */ jsx(Tabs.Root, { value: tab, onValueChange: handleTabChange, children: /* @__PURE__ */ jsxs(Tabs.List, { "aria-label": "View types of member applications", children: [
        /* @__PURE__ */ jsx(Tabs.Trigger, { value: "pending", children: "Pending" }),
        /* @__PURE__ */ jsx(Tabs.Trigger, { value: "approved", children: "Approved" }),
        /* @__PURE__ */ jsx(Tabs.Trigger, { value: "rejected", children: "Rejected" })
      ] }) }),
      /* @__PURE__ */ jsxs(Flex, { gap: 4, direction: "column", alignItems: "stretch", children: [
        /* @__PURE__ */ jsx(Table.Root, { rows: results, headers: tableHeaders, isLoading: isFetching, children: /* @__PURE__ */ jsxs(Table.Content, { children: [
          /* @__PURE__ */ jsxs(Table.Head, { children: [
            /* @__PURE__ */ jsx(Table.HeaderCheckboxCell, {}),
            tableHeaders.map((header) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...header }, header.name))
          ] }),
          /* @__PURE__ */ jsx(Table.Loading, {}),
          /* @__PURE__ */ jsx(Table.Empty, {}),
          /* @__PURE__ */ jsx(Table.Body, { children: results.map((row) => {
            return /* @__PURE__ */ jsxs(
              Table.Row,
              {
                cursor: "pointer",
                onClick: handleRowClick(row.documentId),
                children: [
                  /* @__PURE__ */ jsx(Table.CheckboxCell, { id: row.id }),
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
                  /* @__PURE__ */ jsx(ActionsCell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(TableActions, { document: row }) })
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
      ] })
    ] })
  ] }) });
};
const ActionsCell = styled(Table.Cell)`
  display: flex;
  justify-content: flex-end;
`;
const ProtectedListMemberApplicationPage = () => {
  const { slug = "" } = useParams();
  if (!slug) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  console.log("ProtectedListMemberApplicationPage before return");
  return /* @__PURE__ */ jsx(ListMemberApplicationPage, {});
};
const CollectionTypePages = () => {
  const { collectionType, slug } = useParams();
  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  if (slug === MEMBER_APPLICATION_MODEL) {
    return /* @__PURE__ */ jsx(ProtectedListMemberApplicationPage, {});
  }
  return collectionType === COLLECTION_TYPES ? /* @__PURE__ */ jsx(ProtectedListViewPage, {}) : /* @__PURE__ */ jsx(ProtectedEditViewPage, {});
};
const App = () => {
  const parentTheme = useTheme();
  const mergedTheme = { ...darkTheme, sizes: parentTheme.sizes };
  return (
    // StyleSheetManager silences warnings about invalid HTML attributes from 'styled-components'
    /* @__PURE__ */ jsx(
      StyleSheetManager,
      {
        shouldForwardProp: (propName, elementToBeCreated) => {
          if (typeof elementToBeCreated === "string") {
            return isPropValid(propName);
          }
          return true;
        },
        children: /* @__PURE__ */ jsx(DndProvider, { backend: HTML5Backend, children: /* @__PURE__ */ jsx(DesignSystemProvider, { theme: mergedTheme, locale: "en-GB", children: /* @__PURE__ */ jsxs(Routes, { children: [
          /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/:collectionType/:slug", element: /* @__PURE__ */ jsx(CollectionTypePages, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "/:collectionType/:slug/:id", element: /* @__PURE__ */ jsx(ProtectedEditViewPage, {}) }),
          /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
        ] }) }) })
      }
    )
  );
};
export {
  App
};
//# sourceMappingURL=App-D_YKTb58.mjs.map
