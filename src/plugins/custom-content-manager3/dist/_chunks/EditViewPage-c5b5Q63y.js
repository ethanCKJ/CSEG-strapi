"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const reactRouterDom = require("react-router-dom");
const styledComponents = require("styled-components");
const index = require("./index-Dhk6CWoo.js");
const React = require("react");
const yup = require("yup");
const fractionalIndexing = require("fractional-indexing");
const pipe$1 = require("lodash/fp/pipe");
const qs = require("qs");
const react = require("@reduxjs/toolkit/query/react");
const Icons = require("@strapi/icons");
const dateFns = require("date-fns");
const mapValues = require("lodash/fp/mapValues");
require("lodash/get");
require("lodash/merge");
require("lodash/set");
const slate = require("slate");
const slateHistory = require("slate-history");
const slateReact = require("slate-react");
const Prism = require("prismjs");
require("prismjs/themes/prism-solarizedlight.css");
require("prismjs/components/prism-asmatmel");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-basic");
require("prismjs/components/prism-c");
require("prismjs/components/prism-clojure");
require("prismjs/components/prism-cobol");
require("prismjs/components/prism-cpp");
require("prismjs/components/prism-csharp");
require("prismjs/components/prism-dart");
require("prismjs/components/prism-docker");
require("prismjs/components/prism-elixir");
require("prismjs/components/prism-erlang");
require("prismjs/components/prism-fortran");
require("prismjs/components/prism-fsharp");
require("prismjs/components/prism-go");
require("prismjs/components/prism-graphql");
require("prismjs/components/prism-groovy");
require("prismjs/components/prism-haskell");
require("prismjs/components/prism-haxe");
require("prismjs/components/prism-ini");
require("prismjs/components/prism-java");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-json");
require("prismjs/components/prism-julia");
require("prismjs/components/prism-kotlin");
require("prismjs/components/prism-latex");
require("prismjs/components/prism-lua");
require("prismjs/components/prism-markdown");
require("prismjs/components/prism-matlab");
require("prismjs/components/prism-makefile");
require("prismjs/components/prism-objectivec");
require("prismjs/components/prism-perl");
require("prismjs/components/prism-php");
require("prismjs/components/prism-powershell");
require("prismjs/components/prism-python");
require("prismjs/components/prism-r");
require("prismjs/components/prism-ruby");
require("prismjs/components/prism-rust");
require("prismjs/components/prism-sas");
require("prismjs/components/prism-scala");
require("prismjs/components/prism-scheme");
require("prismjs/components/prism-sql");
require("prismjs/components/prism-stata");
require("prismjs/components/prism-swift");
require("prismjs/components/prism-typescript");
require("prismjs/components/prism-tsx");
require("prismjs/components/prism-vbnet");
require("prismjs/components/prism-yaml");
const reactDnd = require("react-dnd");
const Toolbar = require("@radix-ui/react-toolbar");
const reactDndHtml5Backend = require("react-dnd-html5-backend");
require("lodash/clone");
const toPath = require("lodash/toPath");
const Symbols = require("@strapi/icons/symbols");
const reactWindow = require("react-window");
const CodeMirror = require("codemirror5");
const sanitizeHtml = require("sanitize-html");
const highlight_js = require("highlight.js");
const Markdown = require("markdown-it");
const abbr = require("markdown-it-abbr");
const container = require("markdown-it-container");
const deflist = require("markdown-it-deflist");
const emoji = require("markdown-it-emoji");
const footnote = require("markdown-it-footnote");
const ins = require("markdown-it-ins");
const mark = require("markdown-it-mark");
const sub = require("markdown-it-sub");
const sup = require("markdown-it-sup");
require("highlight.js/styles/solarized-dark.css");
require("codemirror5/addon/display/placeholder");
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
const yup__namespace = /* @__PURE__ */ _interopNamespace(yup);
const pipe__default = /* @__PURE__ */ _interopDefault(pipe$1);
const Icons__namespace = /* @__PURE__ */ _interopNamespace(Icons);
const mapValues__default = /* @__PURE__ */ _interopDefault(mapValues);
const Prism__namespace = /* @__PURE__ */ _interopNamespace(Prism);
const Toolbar__namespace = /* @__PURE__ */ _interopNamespace(Toolbar);
const toPath__default = /* @__PURE__ */ _interopDefault(toPath);
const Symbols__namespace = /* @__PURE__ */ _interopNamespace(Symbols);
const CodeMirror__default = /* @__PURE__ */ _interopDefault(CodeMirror);
const sanitizeHtml__default = /* @__PURE__ */ _interopDefault(sanitizeHtml);
const Markdown__default = /* @__PURE__ */ _interopDefault(Markdown);
const abbr__default = /* @__PURE__ */ _interopDefault(abbr);
const container__default = /* @__PURE__ */ _interopDefault(container);
const deflist__default = /* @__PURE__ */ _interopDefault(deflist);
const emoji__default = /* @__PURE__ */ _interopDefault(emoji);
const footnote__default = /* @__PURE__ */ _interopDefault(footnote);
const ins__default = /* @__PURE__ */ _interopDefault(ins);
const mark__default = /* @__PURE__ */ _interopDefault(mark);
const sub__default = /* @__PURE__ */ _interopDefault(sub);
const sup__default = /* @__PURE__ */ _interopDefault(sup);
const ID = "id";
const CREATED_BY_ATTRIBUTE_NAME = "createdBy";
const UPDATED_BY_ATTRIBUTE_NAME = "updatedBy";
const CREATOR_FIELDS = [CREATED_BY_ATTRIBUTE_NAME, UPDATED_BY_ATTRIBUTE_NAME];
const PUBLISHED_BY_ATTRIBUTE_NAME = "publishedBy";
const CREATED_AT_ATTRIBUTE_NAME = "createdAt";
const UPDATED_AT_ATTRIBUTE_NAME = "updatedAt";
const PUBLISHED_AT_ATTRIBUTE_NAME = "publishedAt";
const DOCUMENT_META_FIELDS = [
  ID,
  ...CREATOR_FIELDS,
  PUBLISHED_BY_ATTRIBUTE_NAME,
  CREATED_AT_ATTRIBUTE_NAME,
  UPDATED_AT_ATTRIBUTE_NAME,
  PUBLISHED_AT_ATTRIBUTE_NAME
];
const BLOCK_LIST_ATTRIBUTE_KEYS = ["__component", "__temp_key__"];
const traverseData = (predicate, transform) => (schema, components = {}) => (data = {}) => {
  const traverse = (datum, attributes) => {
    return Object.entries(datum).reduce((acc, [key, value]) => {
      const attribute = attributes[key];
      if (BLOCK_LIST_ATTRIBUTE_KEYS.includes(key) || value === null || value === void 0) {
        acc[key] = value;
        return acc;
      }
      if (attribute.type === "component") {
        if (attribute.repeatable) {
          const componentValue = predicate(attribute, value) ? transform(value, attribute) : value;
          acc[key] = componentValue.map(
            (componentData) => traverse(componentData, components[attribute.component]?.attributes ?? {})
          );
        } else {
          const componentValue = predicate(attribute, value) ? transform(value, attribute) : value;
          acc[key] = traverse(componentValue, components[attribute.component]?.attributes ?? {});
        }
      } else if (attribute.type === "dynamiczone") {
        const dynamicZoneValue = predicate(attribute, value) ? transform(value, attribute) : value;
        acc[key] = dynamicZoneValue.map(
          (componentData) => traverse(componentData, components[componentData.__component]?.attributes ?? {})
        );
      } else if (predicate(attribute, value)) {
        acc[key] = transform(value, attribute);
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});
  };
  return traverse(data, schema.attributes);
};
const removeProhibitedFields = (prohibitedFields) => traverseData(
  (attribute) => prohibitedFields.includes(attribute.type),
  () => ""
);
const prepareRelations = traverseData(
  (attribute) => attribute.type === "relation",
  () => ({
    connect: [],
    disconnect: []
  })
);
const prepareTempKeys$1 = traverseData(
  (attribute) => attribute.type === "component" && attribute.repeatable || attribute.type === "dynamiczone",
  (data) => {
    if (Array.isArray(data) && data.length > 0) {
      const keys = fractionalIndexing.generateNKeysBetween(void 0, void 0, data.length);
      return data.map((datum, index2) => ({
        ...datum,
        __temp_key__: keys[index2]
      }));
    }
    return data;
  }
);
const removeFieldsThatDontExistOnSchema = (schema) => (data) => {
  const schemaKeys = Object.keys(schema.attributes);
  const dataKeys = Object.keys(data);
  const keysToRemove = dataKeys.filter((key) => !schemaKeys.includes(key));
  const revisedData = [...keysToRemove, ...DOCUMENT_META_FIELDS].reduce((acc, key) => {
    delete acc[key];
    return acc;
  }, structuredClone(data));
  return revisedData;
};
const removeNullValues = (schema, components = {}) => traverseData(
  (attribute, value) => value === null && attribute.type !== "boolean",
  () => void 0
)(schema, components);
const transformDocument = (schema, components = {}) => (document2) => {
  const transformations = pipe__default.default(
    removeFieldsThatDontExistOnSchema(schema),
    removeProhibitedFields(["password"])(schema, components),
    removeNullValues(schema, components),
    prepareRelations(schema, components),
    prepareTempKeys$1(schema, components)
  );
  return transformations(document2);
};
const getItemInitialValue = (initialValue, item) => {
  if (initialValue && Array.isArray(initialValue)) {
    const matchingInitialItem = initialValue.find(
      (initialItem) => initialItem.__temp_key__ === item.__temp_key__
    );
    if (matchingInitialItem) {
      return matchingInitialItem;
    }
  }
  return {};
};
const collectInvisibleAttributes = (data, schema, components, path = []) => {
  if (!schema?.attributes) return [];
  const rulesEngine2 = admin.createRulesEngine();
  const removedPaths = [];
  const evaluatedData = {};
  for (const [attrName, attrDef] of Object.entries(schema.attributes)) {
    const fullPath = [...path, attrName].join(".");
    if ("visible" in attrDef && attrDef.visible === false) {
      continue;
    }
    const condition = attrDef?.conditions?.visible;
    const isVisible = condition ? rulesEngine2.evaluate(condition, { ...data, ...evaluatedData }) : true;
    if (!isVisible) {
      removedPaths.push(fullPath);
      continue;
    }
    if (attrName in data) {
      evaluatedData[attrName] = data[attrName];
    }
    if (attrDef.type === "component") {
      const compSchema = components[attrDef.component];
      const value = data[attrName];
      if (attrDef.repeatable && Array.isArray(value)) {
        value.forEach((item) => {
          const nestedPaths = collectInvisibleAttributes(item, compSchema, components, [
            ...path,
            `${attrName}[${item.__temp_key__}]`
          ]);
          removedPaths.push(...nestedPaths);
        });
      } else if (value && typeof value === "object") {
        const nestedPaths = collectInvisibleAttributes(value, compSchema, components, [
          ...path,
          attrName
        ]);
        removedPaths.push(...nestedPaths);
      }
    }
    if (attrDef.type === "dynamiczone" && Array.isArray(data[attrName])) {
      data[attrName].forEach((dzItem) => {
        const compUID = dzItem?.__component;
        const compSchema = components[compUID];
        const nestedPaths = collectInvisibleAttributes(dzItem, compSchema, components, [
          ...path,
          `${attrName}[${dzItem.__temp_key__}]`
        ]);
        removedPaths.push(...nestedPaths);
      });
    }
  }
  return removedPaths;
};
const filterDataByRemovedPaths = (data, initialValues, schema, components, removedPaths, currentPath = []) => {
  if (!schema?.attributes) return data;
  const result = {};
  for (const [attrName, attrDef] of Object.entries(schema.attributes)) {
    const fullPath = [...currentPath, attrName].join(".");
    if (removedPaths.includes(fullPath)) {
      continue;
    }
    if ("visible" in attrDef && attrDef.visible === false) {
      const userProvided2 = Object.hasOwn(data, attrName);
      if (userProvided2) {
        result[attrName] = data[attrName];
      } else if (attrName in initialValues) {
        result[attrName] = initialValues[attrName];
      }
      continue;
    }
    const userProvided = Object.hasOwn(data, attrName);
    const currentValue = userProvided ? data[attrName] : void 0;
    const initialValue = initialValues?.[attrName];
    if (attrDef.type === "component") {
      const compSchema = components[attrDef.component];
      const value = currentValue === void 0 ? initialValue : currentValue;
      if (!value) {
        result[attrName] = attrDef.repeatable ? [] : null;
        continue;
      }
      if (attrDef.repeatable && Array.isArray(value)) {
        result[attrName] = value.map((item) => {
          const componentInitialValue = getItemInitialValue(initialValue, item);
          return filterDataByRemovedPaths(
            item,
            componentInitialValue,
            compSchema,
            components,
            removedPaths,
            [...currentPath, `${attrName}[${item.__temp_key__}]`]
          );
        });
      } else {
        result[attrName] = filterDataByRemovedPaths(
          value,
          initialValue ?? {},
          compSchema,
          components,
          removedPaths,
          [...currentPath, attrName]
        );
      }
      continue;
    }
    if (attrDef.type === "dynamiczone") {
      if (!Array.isArray(currentValue)) {
        result[attrName] = [];
        continue;
      }
      result[attrName] = currentValue.map((dzItem) => {
        const compUID = dzItem?.__component;
        const compSchema = components[compUID];
        const componentInitialValue = getItemInitialValue(initialValue, dzItem);
        const cleaned = filterDataByRemovedPaths(
          dzItem,
          componentInitialValue,
          compSchema,
          components,
          removedPaths,
          [...currentPath, `${attrName}[${dzItem.__temp_key__}]`]
        );
        const processedItem = dzItem.id === void 0 || dzItem.id === null ? { __component: compUID, ...cleaned, id: void 0 } : { __component: compUID, ...cleaned };
        return processedItem;
      });
      continue;
    }
    if (currentValue !== void 0) {
      result[attrName] = currentValue;
    } else if (initialValue !== void 0) {
      result[attrName] = initialValue;
    }
  }
  for (const [key, value] of Object.entries(data)) {
    if (!(key in result) && !(key in (schema?.attributes || {}))) {
      result[key] = value;
    }
  }
  return result;
};
const handleInvisibleAttributes = (data, { schema, initialValues = {}, components = {} }) => {
  if (!schema?.attributes) return { data, removedAttributes: [] };
  const removedAttributes = collectInvisibleAttributes(data, schema, components);
  const filteredData = filterDataByRemovedPaths(
    data,
    initialValues,
    schema,
    components,
    removedAttributes
  );
  return {
    data: filteredData,
    removedAttributes
  };
};
const createDefaultForm = (contentType, components = {}) => {
  const traverseSchema = (attributes) => {
    return Object.entries(attributes).reduce((acc, [key, attribute]) => {
      if ("default" in attribute) {
        acc[key] = attribute.default;
      } else if (attribute.type === "component" && attribute.required) {
        const defaultComponentForm = traverseSchema(components[attribute.component].attributes);
        if (attribute.repeatable) {
          acc[key] = attribute.min ? [...Array(attribute.min).fill(defaultComponentForm)] : [];
        } else {
          acc[key] = defaultComponentForm;
        }
      } else if (attribute.type === "dynamiczone" && attribute.required) {
        acc[key] = [];
      }
      return acc;
    }, {});
  };
  return traverseSchema(contentType.attributes);
};
const contentManagerApi = admin.adminApi.enhanceEndpoints({
  addTagTypes: [
    "ComponentConfiguration",
    "ContentTypesConfiguration",
    "ContentTypeSettings",
    "Document",
    "InitialData",
    "HistoryVersion",
    "Relations",
    "UidAvailability",
    "RecentDocumentList",
    "GuidedTourMeta",
    "CountDocuments",
    "UpcomingReleasesList",
    "AILocalizationJobs"
  ]
});
react.createApi({
  reducerPath: "custom-content-manager-api",
  baseQuery: react.fetchBaseQuery({ baseUrl: "/admin" }),
  tagTypes: [
    "ComponentConfiguration",
    "ContentTypesConfiguration",
    "ContentTypeSettings",
    "Document",
    "InitialData",
    "HistoryVersion",
    "Relations",
    "UidAvailability",
    "RecentDocumentList",
    "GuidedTourMeta",
    "CountDocuments",
    "UpcomingReleasesList",
    "AILocalizationJobs"
  ],
  // We inject them later
  endpoints: () => ({})
});
const documentApi = contentManagerApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    autoCloneDocument: builder.mutation({
      query: ({ model, sourceId, params }) => ({
        url: `/content-manager/collection-types/${model}/auto-clone/${sourceId}`,
        method: "POST",
        config: {
          params
        }
      }),
      invalidatesTags: (_result, error, { model }) => {
        if (error) {
          return [];
        }
        return [
          { type: "Document", id: `${model}_LIST` },
          "RecentDocumentList",
          "CountDocuments",
          "UpcomingReleasesList"
        ];
      }
    }),
    cloneDocument: builder.mutation({
      query: ({ model, sourceId, data, params }) => ({
        url: `/content-manager/collection-types/${model}/clone/${sourceId}`,
        method: "POST",
        data,
        config: {
          params
        }
      }),
      invalidatesTags: (_result, _error, { model }) => [
        { type: "Document", id: `${model}_LIST` },
        { type: "UidAvailability", id: model },
        "RecentDocumentList",
        "CountDocuments",
        "UpcomingReleasesList"
      ]
    }),
    /**
     * Creates a new collection-type document. This should ONLY be used for collection-types.
     * single-types should always be using `updateDocument` since they always exist.
     */
    createDocument: builder.mutation({
      query: ({ model, data, params }) => ({
        url: `/content-manager/collection-types/${model}`,
        method: "POST",
        data,
        config: {
          params
        }
      }),
      invalidatesTags: (result, _error, { model }) => [
        { type: "Document", id: `${model}_LIST` },
        "Relations",
        { type: "UidAvailability", id: model },
        "RecentDocumentList",
        "CountDocuments",
        "UpcomingReleasesList"
      ],
      transformResponse: (response, meta, arg) => {
        if (!("data" in response) && arg.model === "plugin::users-permissions.user") {
          return {
            data: response,
            meta: {
              availableStatus: [],
              availableLocales: []
            }
          };
        }
        return response;
      }
    }),
    deleteDocument: builder.mutation({
      query: ({ collectionType, model, documentId, params }) => ({
        url: `/content-manager/${collectionType}/${model}${collectionType !== index.SINGLE_TYPES && documentId ? `/${documentId}` : ""}`,
        method: "DELETE",
        config: {
          params
        }
      }),
      invalidatesTags: (_result, _error, { collectionType, model, documentId }) => [
        { type: "Document", id: collectionType !== index.SINGLE_TYPES ? `${model}_LIST` : model },
        {
          type: "Document",
          id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
        },
        { type: "Document", id: `${model}_ALL_ITEMS` },
        "RecentDocumentList",
        "CountDocuments",
        "UpcomingReleasesList"
      ]
    }),
    deleteManyDocuments: builder.mutation({
      query: ({ model, params, ...body }) => ({
        url: `/content-manager/collection-types/${model}/actions/bulkDelete`,
        method: "POST",
        data: body,
        config: {
          params
        }
      }),
      invalidatesTags: (_res, _error, { model }) => [
        { type: "Document", id: `${model}_LIST` },
        "RecentDocumentList",
        "CountDocuments",
        "UpcomingReleasesList"
      ]
    }),
    discardDocument: builder.mutation({
      query: ({ collectionType, model, documentId, params }) => ({
        url: documentId ? `/content-manager/${collectionType}/${model}/${documentId}/actions/discard` : `/content-manager/${collectionType}/${model}/actions/discard`,
        method: "POST",
        config: {
          params
        }
      }),
      invalidatesTags: (_result, _error, { collectionType, model, documentId }) => {
        return [
          {
            type: "Document",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
          },
          { type: "Document", id: `${model}_LIST` },
          "Relations",
          { type: "UidAvailability", id: model },
          "RecentDocumentList",
          "CountDocuments",
          "UpcomingReleasesList"
        ];
      }
    }),
    /**
     * Gets all documents of a collection type or single type.
     * By passing different params you can get different results e.g. only published documents or 'es' documents.
     */
    getAllDocuments: builder.query({
      query: ({ model, params }) => ({
        url: `/content-manager/collection-types/${model}`,
        method: "GET",
        config: {
          params: qs.stringify(params, { encode: true })
        }
      }),
      providesTags: (result, _error, arg) => {
        return [
          { type: "Document", id: `ALL_LIST` },
          { type: "Document", id: `${arg.model}_LIST` },
          ...result?.results.map(({ documentId }) => ({
            type: "Document",
            id: `${arg.model}_${documentId}`
          })) ?? []
        ];
      }
    }),
    getDraftRelationCount: builder.query({
      query: ({ collectionType, model, documentId, params }) => ({
        url: documentId ? `/content-manager/${collectionType}/${model}/${documentId}/actions/countDraftRelations` : `/content-manager/${collectionType}/${model}/actions/countDraftRelations`,
        method: "GET",
        config: {
          params
        }
      })
    }),
    getDocument: builder.query({
      // @ts-expect-error – TODO: fix ts error where data unknown doesn't work with response via an assertion?
      queryFn: async ({ collectionType, model, documentId, params }, _api, _extraOpts, baseQuery) => {
        const res = await baseQuery({
          url: `/content-manager/${collectionType}/${model}${documentId ? `/${documentId}` : ""}`,
          method: "GET",
          config: {
            params
          }
        });
        if (res.error && res.error.name === "NotFoundError" && collectionType === index.SINGLE_TYPES) {
          return { data: { document: void 0 }, error: void 0 };
        }
        return res;
      },
      providesTags: (result, _error, { collectionType, model, documentId }) => {
        return [
          // we prefer the result's id because we don't fetch single-types with an ID.
          {
            type: "Document",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${result && "documentId" in result ? result.documentId : documentId}` : model
          },
          // Make it easy to invalidate all individual documents queries for a model
          {
            type: "Document",
            id: `${model}_ALL_ITEMS`
          }
        ];
      }
    }),
    getManyDraftRelationCount: builder.query({
      query: ({ model, ...params }) => ({
        url: `/content-manager/collection-types/${model}/actions/countManyEntriesDraftRelations`,
        method: "GET",
        config: {
          params
        }
      }),
      transformResponse: (response) => response.data
    }),
    /**
     * This endpoint will either create or update documents at the same time as publishing.
     */
    publishDocument: builder.mutation({
      query: ({ collectionType, model, documentId, params, data }) => ({
        url: documentId ? `/content-manager/${collectionType}/${model}/${documentId}/actions/publish` : `/content-manager/${collectionType}/${model}/actions/publish`,
        method: "POST",
        data,
        config: {
          params
        }
      }),
      invalidatesTags: (_result, _error, { collectionType, model, documentId }) => {
        return [
          {
            type: "Document",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
          },
          { type: "Document", id: `${model}_LIST` },
          "Relations",
          "RecentDocumentList",
          "CountDocuments",
          "UpcomingReleasesList",
          {
            type: "AILocalizationJobs",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
          }
        ];
      }
    }),
    publishManyDocuments: builder.mutation({
      query: ({ model, params, ...body }) => ({
        url: `/content-manager/collection-types/${model}/actions/bulkPublish`,
        method: "POST",
        data: body,
        config: {
          params
        }
      }),
      invalidatesTags: (_res, _error, { model, documentIds }) => {
        return [
          ...documentIds.map((id) => ({ type: "Document", id: `${model}_${id}` })),
          "RecentDocumentList",
          "CountDocuments",
          "UpcomingReleasesList"
        ];
      }
    }),
    updateDocument: builder.mutation({
      query: ({ collectionType, model, documentId, data, params }) => ({
        url: `/content-manager/${collectionType}/${model}${documentId ? `/${documentId}` : ""}`,
        method: "PUT",
        data,
        config: {
          params
        }
      }),
      invalidatesTags: (_result, _error, { collectionType, model, documentId }) => {
        return [
          {
            type: "Document",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
          },
          "Relations",
          { type: "UidAvailability", id: model },
          "RecentDocumentList",
          "CountDocuments",
          "UpcomingReleasesList",
          {
            type: "AILocalizationJobs",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
          }
        ];
      },
      async onQueryStarted({ data, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          documentApi.util.updateQueryData("getDocument", patch, (draft) => {
            Object.assign(draft.data, data);
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
      transformResponse: (response, meta, arg) => {
        if (!("data" in response) && arg.model === "plugin::users-permissions.user") {
          return {
            data: response,
            meta: {
              availableStatus: [],
              availableLocales: []
            }
          };
        }
        return response;
      }
    }),
    unpublishDocument: builder.mutation({
      query: ({ collectionType, model, documentId, params, data }) => ({
        url: documentId ? `/content-manager/${collectionType}/${model}/${documentId}/actions/unpublish` : `/content-manager/${collectionType}/${model}/actions/unpublish`,
        method: "POST",
        data,
        config: {
          params
        }
      }),
      invalidatesTags: (_result, _error, { collectionType, model, documentId }) => {
        return [
          {
            type: "Document",
            id: collectionType !== index.SINGLE_TYPES ? `${model}_${documentId}` : model
          },
          "RecentDocumentList",
          "CountDocuments",
          "UpcomingReleasesList"
        ];
      }
    }),
    unpublishManyDocuments: builder.mutation({
      query: ({ model, params, ...body }) => ({
        url: `/content-manager/collection-types/${model}/actions/bulkUnpublish`,
        method: "POST",
        data: body,
        config: {
          params
        }
      }),
      invalidatesTags: (_res, _error, { model, documentIds }) => [
        ...documentIds.map((id) => ({ type: "Document", id: `${model}_${id}` })),
        "RecentDocumentList",
        "CountDocuments",
        "UpcomingReleasesList"
      ]
    })
  })
});
const {
  useAutoCloneDocumentMutation,
  useCloneDocumentMutation,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
  useDeleteManyDocumentsMutation,
  useDiscardDocumentMutation,
  useGetAllDocumentsQuery,
  useLazyGetDocumentQuery,
  useGetDocumentQuery,
  useLazyGetDraftRelationCountQuery,
  useGetManyDraftRelationCountQuery,
  usePublishDocumentMutation,
  usePublishManyDocumentsMutation,
  useUpdateDocumentMutation,
  useUnpublishDocumentMutation,
  useUnpublishManyDocumentsMutation
} = documentApi;
const buildValidParams = (query) => {
  if (!query) return query;
  const { plugins: _, ...validQueryParams } = {
    ...query,
    ...Object.values(query?.plugins ?? {}).reduce(
      (acc, current) => Object.assign(acc, current),
      {}
    )
  };
  return validQueryParams;
};
const isBaseQueryError = (error) => {
  return typeof error === "object" && error !== null && // use 'in' to check for presence, then confirm it's a string
  "name" in error && typeof error.name === "string";
};
const arrayValidator = (attribute, options) => ({
  message: admin.translatedErrors.required,
  test(value) {
    if (options.status === "draft") {
      return true;
    }
    if (!attribute.required) {
      return true;
    }
    if (!value) {
      return false;
    }
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }
    return true;
  }
});
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const createYupSchema = (attributes = {}, components = {}, options = { status: null }) => {
  const createModelSchema = (attributes2, removedAttributes = []) => yup__namespace.object().shape(
    Object.entries(attributes2).reduce((acc, [name2, attribute]) => {
      const getNestedPathsForAttribute = (removed, attrName) => {
        const prefix = `${attrName}.`;
        const bracketRegex = new RegExp(`^${escapeRegex(attrName)}\\[[^\\]]+\\]\\.`);
        return removed.filter((p) => p.startsWith(prefix) || bracketRegex.test(p)).map(
          (p) => p.startsWith(prefix) ? p.slice(prefix.length) : p.replace(bracketRegex, "")
        );
      };
      if (DOCUMENT_META_FIELDS.includes(name2)) {
        return acc;
      }
      if (removedAttributes?.includes(name2)) {
        return acc;
      }
      const nestedRemoved = getNestedPathsForAttribute(removedAttributes, name2);
      const validations = [
        addNullableValidation,
        addRequiredValidation,
        addMinLengthValidation,
        addMaxLengthValidation,
        addMinValidation,
        addMaxValidation,
        addRegexValidation
      ].map((fn) => fn(attribute, options));
      const transformSchema = pipe__default.default(...validations);
      switch (attribute.type) {
        case "component": {
          const { attributes: attributes3 } = components[attribute.component];
          if (attribute.repeatable) {
            return {
              ...acc,
              [name2]: transformSchema(
                yup__namespace.array().of(createModelSchema(attributes3, nestedRemoved).nullable(false))
              ).test(arrayValidator(attribute, options))
            };
          } else {
            return {
              ...acc,
              [name2]: transformSchema(createModelSchema(attributes3, nestedRemoved).nullable())
            };
          }
        }
        case "dynamiczone":
          return {
            ...acc,
            [name2]: transformSchema(
              yup__namespace.array().of(
                yup__namespace.lazy(
                  (data) => {
                    const attributes3 = components?.[data?.__component]?.attributes;
                    const validation = yup__namespace.object().shape({
                      __component: yup__namespace.string().required().oneOf(Object.keys(components))
                    }).nullable(false);
                    if (!attributes3) {
                      return validation;
                    }
                    return validation.concat(createModelSchema(attributes3, nestedRemoved));
                  }
                )
              )
            ).test(arrayValidator(attribute, options))
          };
        case "relation":
          return {
            ...acc,
            [name2]: transformSchema(
              yup__namespace.lazy((value) => {
                if (!value) {
                  return yup__namespace.mixed().nullable(true);
                } else if (Array.isArray(value)) {
                  return yup__namespace.array().of(
                    yup__namespace.object().shape({
                      id: yup__namespace.number().required()
                    })
                  );
                } else if (typeof value === "object") {
                  return yup__namespace.object();
                } else {
                  return yup__namespace.mixed().test(
                    "type-error",
                    "Relation values must be either null, an array of objects with {id} or an object.",
                    () => false
                  );
                }
              })
            )
          };
        default:
          return {
            ...acc,
            [name2]: transformSchema(createAttributeSchema(attribute))
          };
      }
    }, {})
  ).default(null);
  return createModelSchema(attributes, options.removedAttributes);
};
const createAttributeSchema = (attribute) => {
  switch (attribute.type) {
    case "biginteger":
      return yup__namespace.string().matches(/^-?\d*$/);
    case "boolean":
      return yup__namespace.boolean().nullable();
    case "blocks":
      return yup__namespace.mixed().test("isBlocks", admin.translatedErrors.json, (value) => {
        if (!value || Array.isArray(value)) {
          return true;
        } else {
          return false;
        }
      });
    case "decimal":
    case "float":
    case "integer":
      return yup__namespace.number();
    case "email":
      return yup__namespace.string().email(admin.translatedErrors.email);
    case "enumeration":
      return yup__namespace.string().oneOf([...attribute.enum, null]);
    case "json":
      return yup__namespace.mixed().test("isJSON", admin.translatedErrors.json, (value) => {
        if (!value || typeof value === "string" && value.length === 0) {
          return true;
        }
        if (typeof value === "object") {
          try {
            JSON.stringify(value);
            return true;
          } catch (err) {
            return false;
          }
        }
        try {
          JSON.parse(value);
          return true;
        } catch (err) {
          return false;
        }
      });
    case "password":
      return yup__namespace.string().nullable();
    case "richtext":
    case "string":
    case "text":
      return yup__namespace.string();
    case "uid":
      return yup__namespace.string().matches(attribute.regex ? new RegExp(attribute.regex) : /^[A-Za-z0-9-_.~]*$/);
    default:
      return yup__namespace.mixed();
  }
};
const nullableSchema = (schema) => {
  return schema?.nullable ? schema.nullable() : (
    // In some cases '.nullable' will not be available on the schema.
    // e.g. when the schema has been built using yup.lazy (e.g. for relations).
    // In these cases we should just return the schema as it is.
    schema
  );
};
const addNullableValidation = () => (schema) => {
  return nullableSchema(schema);
};
const addRequiredValidation = (attribute, options) => (schema) => {
  if (options.status === "draft" || !attribute.required || attribute.type === "password") {
    return schema;
  }
  if (attribute.required && "required" in schema) {
    return schema.required(admin.translatedErrors.required);
  }
  return schema;
};
const addMinLengthValidation = (attribute, options) => (schema) => {
  if (options.status === "draft") {
    return schema;
  }
  if ("minLength" in attribute && attribute.minLength && Number.isInteger(attribute.minLength) && "min" in schema) {
    return schema.min(attribute.minLength, {
      ...admin.translatedErrors.minLength,
      values: {
        min: attribute.minLength
      }
    });
  }
  return schema;
};
const addMaxLengthValidation = (attribute) => (schema) => {
  if ("maxLength" in attribute && attribute.maxLength && Number.isInteger(attribute.maxLength) && "max" in schema) {
    return schema.max(attribute.maxLength, {
      ...admin.translatedErrors.maxLength,
      values: {
        max: attribute.maxLength
      }
    });
  }
  return schema;
};
const addMinValidation = (attribute, options) => (schema) => {
  if (options.status === "draft") {
    return schema;
  }
  if ("min" in attribute && "min" in schema) {
    const min = toInteger(attribute.min);
    if (min) {
      return schema.min(min, {
        ...admin.translatedErrors.min,
        values: {
          min
        }
      });
    }
  }
  return schema;
};
const addMaxValidation = (attribute) => (schema) => {
  if ("max" in attribute) {
    const max = toInteger(attribute.max);
    if ("max" in schema && max) {
      return schema.max(max, {
        ...admin.translatedErrors.max,
        values: {
          max
        }
      });
    }
  }
  return schema;
};
const toInteger = (val) => {
  if (typeof val === "number" || val === void 0) {
    return val;
  } else {
    const num = Number(val);
    return isNaN(num) ? void 0 : num;
  }
};
const addRegexValidation = (attribute) => (schema) => {
  if ("regex" in attribute && attribute.regex && "matches" in schema) {
    return schema.matches(new RegExp(attribute.regex), {
      message: {
        id: admin.translatedErrors.regex.id,
        defaultMessage: "The value does not match the defined pattern."
      },
      excludeEmptyString: !attribute.required
    });
  }
  return schema;
};
const initApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getInitialData: builder.query({
      query: () => "/content-manager/init",
      transformResponse: (response) => response.data,
      providesTags: ["InitialData"]
    })
  })
});
const { useGetInitialDataQuery } = initApi;
const useContentTypeSchema = (model) => {
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler();
  const { data, error, isLoading, isFetching } = useGetInitialDataQuery(void 0);
  const { components, contentType, contentTypes } = React__namespace.useMemo(() => {
    const contentType2 = data?.contentTypes.find((ct) => ct.uid === model);
    const componentsByKey = data?.components.reduce((acc, component) => {
      acc[component.uid] = component;
      return acc;
    }, {});
    const components2 = extractContentTypeComponents(contentType2?.attributes, componentsByKey);
    return {
      components: Object.keys(components2).length === 0 ? void 0 : components2,
      contentType: contentType2,
      contentTypes: data?.contentTypes ?? []
    };
  }, [model, data]);
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [toggleNotification, error, formatAPIError]);
  return {
    // This must be memoized to avoid inifiinite re-renders where the empty object is different everytime.
    components: React__namespace.useMemo(() => components ?? {}, [components]),
    schema: contentType,
    schemas: contentTypes,
    isLoading: isLoading || isFetching
  };
};
const extractContentTypeComponents = (attributes = {}, allComponents = {}) => {
  const getComponents = (attributes2) => {
    return attributes2.reduce((acc, attribute) => {
      if (attribute.type === "component") {
        const componentAttributes = Object.values(
          allComponents[attribute.component]?.attributes ?? {}
        );
        acc.push(attribute.component, ...getComponents(componentAttributes));
      } else if (attribute.type === "dynamiczone") {
        acc.push(
          ...attribute.components,
          ...attribute.components.flatMap((componentUid) => {
            const componentAttributes = Object.values(
              allComponents[componentUid]?.attributes ?? {}
            );
            return getComponents(componentAttributes);
          })
        );
      }
      return acc;
    }, []);
  };
  const componentUids = getComponents(Object.values(attributes));
  const uniqueComponentUids = [...new Set(componentUids)];
  const componentsByKey = uniqueComponentUids.reduce((acc, uid) => {
    acc[uid] = allComponents[uid];
    return acc;
  }, {});
  return componentsByKey;
};
const contentTypesApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getContentTypeConfiguration: builder.query({
      query: (uid) => ({
        url: `/content-manager/content-types/${uid}/configuration`,
        method: "GET"
      }),
      transformResponse: (response) => response.data,
      providesTags: (_result, _error, uid) => [
        { type: "ContentTypesConfiguration", id: uid },
        { type: "ContentTypeSettings", id: "LIST" }
      ]
    }),
    getAllContentTypeSettings: builder.query({
      query: () => "/content-manager/content-types-settings",
      transformResponse: (response) => response.data,
      providesTags: [{ type: "ContentTypeSettings", id: "LIST" }]
    }),
    updateContentTypeConfiguration: builder.mutation({
      query: ({ uid, ...body }) => ({
        url: `/content-manager/content-types/${uid}/configuration`,
        method: "PUT",
        data: body
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (_result, _error, { uid }) => [
        { type: "ContentTypesConfiguration", id: uid },
        { type: "ContentTypeSettings", id: "LIST" },
        // Is this necessary?
        { type: "InitialData" }
      ]
    })
  })
});
const {
  useGetContentTypeConfigurationQuery,
  useGetAllContentTypeSettingsQuery,
  useUpdateContentTypeConfigurationMutation
} = contentTypesApi;
const checkIfAttributeIsDisplayable = (attribute) => {
  const { type } = attribute;
  if (type === "relation") {
    return !attribute.relation.toLowerCase().includes("morph");
  }
  return !["json", "dynamiczone", "richtext", "password", "blocks"].includes(type) && !!type;
};
const getMainField = (attribute, mainFieldName, { schemas, components }) => {
  if (!mainFieldName) {
    return void 0;
  }
  const mainFieldType = attribute.type === "component" ? components[attribute.component].attributes[mainFieldName].type : (
    // @ts-expect-error – `targetModel` does exist on the attribute for a relation.
    schemas.find((schema) => schema.uid === attribute.targetModel)?.attributes[mainFieldName].type
  );
  return {
    name: mainFieldName,
    type: mainFieldType ?? "string"
  };
};
const DEFAULT_SETTINGS = {
  bulkable: false,
  filterable: false,
  searchable: false,
  pagination: false,
  defaultSortBy: "",
  defaultSortOrder: "asc",
  mainField: "id",
  pageSize: 10
};
const useDocumentLayout = (model) => {
  const { schema, components } = useDocument({ model, collectionType: "" }, { skip: true });
  const [{ query }] = admin.useQueryParams();
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler();
  const { isLoading: isLoadingSchemas, schemas } = useContentTypeSchema();
  const {
    data,
    isLoading: isLoadingConfigs,
    error,
    isFetching: isFetchingConfigs
  } = useGetContentTypeConfigurationQuery(model);
  const isLoading = isLoadingSchemas || isFetchingConfigs || isLoadingConfigs;
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const editLayout = React__namespace.useMemo(
    () => data && !isLoading ? formatEditLayout(data, { schemas, schema, components }) : {
      layout: [],
      components: {},
      metadatas: {},
      options: {},
      settings: DEFAULT_SETTINGS
    },
    [data, isLoading, schemas, schema, components]
  );
  const listLayout = React__namespace.useMemo(() => {
    return data && !isLoading ? formatListLayout(data, { schemas, schema, components }) : {
      layout: [],
      metadatas: {},
      options: {},
      settings: DEFAULT_SETTINGS
    };
  }, [data, isLoading, schemas, schema, components]);
  return {
    error,
    isLoading,
    edit: editLayout,
    list: listLayout
  };
};
const formatEditLayout = (data, {
  schemas,
  schema,
  components
}) => {
  let currentPanelIndex = 0;
  const panelledEditAttributes = convertEditLayoutToFieldLayouts(
    data.contentType.layouts.edit,
    schema?.attributes,
    data.contentType.metadatas,
    { configurations: data.components, schemas: components },
    schemas
  ).reduce((panels, row) => {
    if (row.some((field) => field.type === "dynamiczone")) {
      panels.push([row]);
      currentPanelIndex += 2;
    } else {
      if (!panels[currentPanelIndex]) {
        panels.push([row]);
      } else {
        panels[currentPanelIndex].push(row);
      }
    }
    return panels;
  }, []);
  const componentEditAttributes = Object.entries(data.components).reduce(
    (acc, [uid, configuration]) => {
      acc[uid] = {
        layout: convertEditLayoutToFieldLayouts(
          configuration.layouts.edit,
          components[uid].attributes,
          configuration.metadatas,
          { configurations: data.components, schemas: components }
        ),
        settings: {
          ...configuration.settings,
          icon: components[uid].info.icon,
          displayName: components[uid].info.displayName
        }
      };
      return acc;
    },
    {}
  );
  const editMetadatas = Object.entries(data.contentType.metadatas).reduce(
    (acc, [attribute, metadata]) => {
      return {
        ...acc,
        [attribute]: metadata.edit
      };
    },
    {}
  );
  return {
    layout: panelledEditAttributes,
    components: componentEditAttributes,
    metadatas: editMetadatas,
    settings: {
      ...data.contentType.settings,
      displayName: schema?.info.displayName
    },
    options: {
      ...schema?.options,
      ...schema?.pluginOptions,
      ...data.contentType.options
    }
  };
};
const convertEditLayoutToFieldLayouts = (rows, attributes = {}, metadatas, components, schemas = []) => {
  return rows.map(
    (row) => row.map((field) => {
      const attribute = attributes[field.name];
      if (!attribute) {
        return null;
      }
      const { edit: metadata } = metadatas[field.name];
      const settings = attribute.type === "component" && components ? components.configurations[attribute.component].settings : {};
      return {
        attribute,
        disabled: !metadata.editable,
        hint: metadata.description,
        label: metadata.label ?? "",
        name: field.name,
        // @ts-expect-error – mainField does exist on the metadata for a relation.
        mainField: getMainField(attribute, metadata.mainField || settings.mainField, {
          schemas,
          components: components?.schemas ?? {}
        }),
        placeholder: metadata.placeholder ?? "",
        required: attribute.required ?? false,
        size: field.size,
        unique: "unique" in attribute ? attribute.unique : false,
        visible: metadata.visible ?? true,
        type: attribute.type
      };
    }).filter((field) => field !== null)
  );
};
const formatListLayout = (data, {
  schemas,
  schema,
  components
}) => {
  const listMetadatas = Object.entries(data.contentType.metadatas).reduce(
    (acc, [attribute, metadata]) => {
      return {
        ...acc,
        [attribute]: metadata.list
      };
    },
    {}
  );
  const listAttributes = convertListLayoutToFieldLayouts(
    data.contentType.layouts.list,
    schema?.attributes,
    listMetadatas,
    { configurations: data.components, schemas: components },
    schemas
  );
  return {
    layout: listAttributes,
    settings: { ...data.contentType.settings, displayName: schema?.info.displayName },
    metadatas: listMetadatas,
    options: {
      ...schema?.options,
      ...schema?.pluginOptions,
      ...data.contentType.options
    }
  };
};
const convertListLayoutToFieldLayouts = (columns, attributes = {}, metadatas, components, schemas = []) => {
  return columns.map((name2) => {
    const attribute = attributes[name2];
    if (!attribute) {
      return null;
    }
    const metadata = metadatas[name2];
    const settings = attribute.type === "component" && components ? components.configurations[attribute.component].settings : {};
    return {
      attribute,
      label: metadata.label ?? "",
      mainField: getMainField(attribute, metadata.mainField || settings.mainField, {
        schemas,
        components: components?.schemas ?? {}
      }),
      name: name2,
      searchable: metadata.searchable ?? true,
      sortable: metadata.sortable ?? true
    };
  }).filter((field) => field !== null);
};
const useDocument = (args, opts) => {
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler();
  const { formatMessage } = reactIntl.useIntl();
  const {
    currentData: data,
    isLoading: isLoadingDocument,
    isFetching: isFetchingDocument,
    error,
    refetch
  } = useGetDocumentQuery(args, {
    ...opts,
    skip: !args.documentId && args.collectionType !== index.SINGLE_TYPES || opts?.skip
  });
  const document2 = data?.data;
  const meta = data?.meta;
  const {
    components,
    schema,
    schemas,
    isLoading: isLoadingSchema
  } = useContentTypeSchema(args.model);
  const isSingleType = schema?.kind === "singleType";
  const getTitle = (mainField) => {
    if (mainField !== "id" && document2?.[mainField]) {
      return document2[mainField];
    }
    if (isSingleType && schema?.info.displayName) {
      return schema.info.displayName;
    }
    return formatMessage({
      id: "content-manager.containers.untitled",
      defaultMessage: "Untitled"
    });
  };
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [toggleNotification, error, formatAPIError, args.collectionType]);
  const validationSchema = React__namespace.useMemo(() => {
    if (!schema) {
      return null;
    }
    return createYupSchema(schema.attributes, components);
  }, [schema, components]);
  const validate = React__namespace.useCallback(
    (document22) => {
      if (!validationSchema) {
        throw new Error(
          "There is no validation schema generated, this is likely due to the schema not being loaded yet."
        );
      }
      try {
        validationSchema.validateSync(document22, { abortEarly: false, strict: true });
        return null;
      } catch (error2) {
        if (error2 instanceof yup.ValidationError) {
          return admin.getYupValidationErrors(error2);
        }
        throw error2;
      }
    },
    [validationSchema]
  );
  const getInitialFormValues = React__namespace.useCallback(
    (isCreatingDocument = false) => {
      if (!document2 && !isCreatingDocument && !isSingleType || !schema) {
        return void 0;
      }
      const form = document2?.id ? document2 : createDefaultForm(schema, components);
      return transformDocument(schema, components)(form);
    },
    [document2, isSingleType, schema, components]
  );
  const isLoading = isLoadingDocument || isFetchingDocument || isLoadingSchema;
  const hasError = !!error;
  return {
    components,
    document: document2,
    meta,
    isLoading,
    hasError,
    schema,
    schemas,
    validate,
    getTitle,
    getInitialFormValues,
    refetch
  };
};
const useDoc = () => {
  const { id, slug, collectionType, origin } = reactRouterDom.useParams();
  const [{ query }] = admin.useQueryParams();
  const params = React__namespace.useMemo(() => buildValidParams(query), [query]);
  if (!collectionType) {
    throw new Error("Could not find collectionType in url params");
  }
  if (!slug) {
    throw new Error("Could not find model in url params");
  }
  const document2 = useDocument(
    { documentId: origin || id, model: slug, collectionType, params },
    {
      skip: id === "create" || !origin && !id && collectionType !== index.SINGLE_TYPES
    }
  );
  const returnId = origin || id === "create" ? void 0 : id;
  return {
    collectionType,
    model: slug,
    id: returnId,
    ...document2
  };
};
const componentStore = /* @__PURE__ */ new Map();
const useLazyComponents = (componentUids = []) => {
  const [lazyComponentStore, setLazyComponentStore] = React.useState(Object.fromEntries(componentStore));
  const newUids = componentUids.filter((uid) => !componentStore.get(uid));
  const [loading, setLoading] = React.useState(() => !!newUids.length);
  const getCustomField = admin.useStrapiApp("useLazyComponents", (state) => state.customFields.get);
  React.useEffect(() => {
    const setStore = (store) => {
      setLazyComponentStore(store);
      setLoading(false);
    };
    const lazyLoadComponents = async (uids, components) => {
      const modules = await Promise.all(components);
      uids.forEach((uid, index2) => {
        componentStore.set(uid, modules[index2].default);
      });
      setStore(Object.fromEntries(componentStore));
    };
    if (newUids.length > 0) {
      setLoading(true);
      const componentPromises = newUids.reduce((arrayOfPromises, uid) => {
        const customField = getCustomField(uid);
        if (customField) {
          arrayOfPromises.push(customField.components.Input());
        }
        return arrayOfPromises;
      }, []);
      if (componentPromises.length > 0) {
        lazyLoadComponents(newUids, componentPromises);
      }
    }
  }, [newUids, getCustomField]);
  const cleanup = React.useCallback(() => {
    componentStore.clear();
    setLazyComponentStore({});
  }, []);
  return { isLazyLoading: loading, lazyComponentStore, cleanup };
};
const useOnce = (effect) => React__namespace.useEffect(effect, emptyDeps);
const emptyDeps = [];
const Blocker = () => {
  const resetForm = admin.useForm("Blocker", (state) => state.resetForm);
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Blocker, { onProceed: resetForm });
};
const intervals = ["years", "months", "days", "hours", "minutes", "seconds"];
React__namespace.forwardRef(
  ({ timestamp, customIntervals = [], ...restProps }, forwardedRef) => {
    const { formatRelativeTime, formatDate: formatDate2, formatTime } = reactIntl.useIntl();
    const interval = dateFns.intervalToDuration({
      start: timestamp,
      end: Date.now()
      // see https://github.com/date-fns/date-fns/issues/2891 – No idea why it's all partial it returns it every time.
    });
    const unit = intervals.find((intervalUnit) => {
      return interval[intervalUnit] > 0 && Object.keys(interval).includes(intervalUnit);
    }) ?? "seconds";
    const relativeTime = dateFns.isPast(timestamp) ? -interval[unit] : interval[unit];
    const customInterval = customIntervals.find(
      (custom) => interval[custom.unit] < custom.threshold
    );
    const displayText = customInterval ? customInterval.text : formatRelativeTime(relativeTime, unit, { numeric: "auto" });
    return /* @__PURE__ */ jsxRuntime.jsx(
      "time",
      {
        ref: forwardedRef,
        dateTime: timestamp.toISOString(),
        role: "time",
        title: `${formatDate2(timestamp)} ${formatTime(timestamp)}`,
        ...restProps,
        children: displayText
      }
    );
  }
);
const capitalise = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const DocumentStatus = ({ status = "draft", size = "S", ...restProps }) => {
  const statusVariant = status === "draft" ? "secondary" : status === "published" ? "success" : "alternative";
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Status, { ...restProps, size, variant: statusVariant, role: "status", "aria-label": status, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "span", variant: "omega", fontWeight: "bold", children: formatMessage({
    id: `content-manager.containers.List.${status}`,
    defaultMessage: capitalise(status)
  }) }) });
};
const [DocumentRBACProvider, useDocumentRBAC] = admin.createContext(
  "DocumentRBAC",
  {
    canCreate: false,
    canCreateFields: [],
    canDelete: false,
    canPublish: false,
    canRead: false,
    canReadFields: [],
    canUpdate: false,
    canUpdateFields: [],
    canUserAction: () => false,
    isLoading: false
  }
);
const DocumentRBAC = ({ children, permissions, model }) => {
  const { slug } = reactRouterDom.useParams();
  if (!slug && !model) {
    throw new Error("Cannot find the slug param in the URL or the model prop is not provided.");
  }
  const contentTypeUid = model ?? slug;
  const [{ rawQuery }] = admin.useQueryParams();
  const userPermissions = admin.useAuth("DocumentRBAC", (state) => state.permissions);
  const contentTypePermissions = React__namespace.useMemo(() => {
    const contentTypePermissions2 = userPermissions.filter(
      (permission) => permission.subject === contentTypeUid
    );
    return contentTypePermissions2.reduce((acc, permission) => {
      const [action] = permission.action.split(".").slice(-1);
      return { ...acc, [action]: [permission] };
    }, {});
  }, [contentTypeUid, userPermissions]);
  const contentTypePermissionsList = Object.values(contentTypePermissions).flat();
  const { isLoading, allowedActions } = admin.useRBAC(
    contentTypePermissionsList,
    permissions ?? void 0,
    // TODO: (Strapi Developers) useRBAC context should be typed and built differently
    // We are passing raw query as context to the hook so that it can
    // rely on the locale provided from DocumentRBAC for its permission calculations.
    rawQuery
  );
  const canCreateFields = !isLoading && allowedActions.canCreate ? extractAndDedupeFields(contentTypePermissions.create) : [];
  const canReadFields = !isLoading && allowedActions.canRead ? extractAndDedupeFields(contentTypePermissions.read) : [];
  const canUpdateFields = !isLoading && allowedActions.canUpdate ? extractAndDedupeFields(contentTypePermissions.update) : [];
  const canUserAction = React__namespace.useCallback(
    (fieldName, fieldsUserCanAction, fieldType) => {
      const name2 = removeNumericalStrings(fieldName.split("."));
      const componentFieldNames = fieldsUserCanAction.filter((field) => field.split(".").length > 1);
      if (fieldType === "component") {
        return componentFieldNames.some((field) => {
          return field.includes(name2.join("."));
        });
      }
      if (name2.length > 1) {
        return componentFieldNames.includes(name2.join("."));
      }
      return fieldsUserCanAction.includes(fieldName);
    },
    []
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    DocumentRBACProvider,
    {
      isLoading,
      canCreateFields,
      canReadFields,
      canUpdateFields,
      canUserAction,
      ...allowedActions,
      children
    }
  );
};
const extractAndDedupeFields = (permissions = []) => permissions.flatMap((permission) => permission.properties?.fields).filter(
  (field, index2, arr) => arr.indexOf(field) === index2 && typeof field === "string"
);
const removeNumericalStrings = (arr) => arr.filter((item) => isNaN(Number(item)));
const previewScript = (config) => {
  const { shouldRun = true, colors } = config;
  const HIGHLIGHT_PADDING = 2;
  const HIGHLIGHT_HOVER_COLOR = window.STRAPI_HIGHLIGHT_HOVER_COLOR ?? colors.highlightHoverColor;
  const HIGHLIGHT_ACTIVE_COLOR = window.STRAPI_HIGHLIGHT_ACTIVE_COLOR ?? colors.highlightActiveColor;
  const HIGHLIGHT_STYLES_ID = "strapi-preview-highlight-styles";
  const DOUBLE_CLICK_TIMEOUT = 300;
  const DISABLE_STEGA_DECODING = window.STRAPI_DISABLE_STEGA_DECODING ?? false;
  const SOURCE_ATTRIBUTE = "data-strapi-source";
  const OVERLAY_ID = "strapi-preview-overlay";
  const INTERNAL_EVENTS2 = {
    STRAPI_FIELD_FOCUS: "strapiFieldFocus",
    STRAPI_FIELD_BLUR: "strapiFieldBlur",
    STRAPI_FIELD_CHANGE: "strapiFieldChange",
    STRAPI_FIELD_FOCUS_INTENT: "strapiFieldFocusIntent",
    STRAPI_FIELD_SINGLE_CLICK_HINT: "strapiFieldSingleClickHint"
  };
  if (!shouldRun) {
    return { INTERNAL_EVENTS: INTERNAL_EVENTS2 };
  }
  const sendMessage = (type, payload) => {
    window.parent.postMessage({ type, payload }, "*");
  };
  const getElementsByPath = (path) => {
    return document.querySelectorAll(`[${SOURCE_ATTRIBUTE}*="path=${path}"]`);
  };
  const setupStegaDOMObserver = async () => {
    if (DISABLE_STEGA_DECODING) {
      return;
    }
    const { vercelStegaDecode: stegaDecode, vercelStegaClean: stegaClean } = await import(
      // @ts-expect-error it's not a local dependency
      // eslint-disable-next-line import/no-unresolved
      "https://cdn.jsdelivr.net/npm/@vercel/stega@0.1.2/+esm"
    );
    const applyStegaToElement = (element) => {
      const directTextNodes = Array.from(element.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );
      const directTextContent = directTextNodes.map((node) => node.textContent || "").join("");
      if (directTextContent) {
        try {
          const result = stegaDecode(directTextContent);
          if (result && "strapiSource" in result) {
            element.setAttribute(SOURCE_ATTRIBUTE, result.strapiSource);
            directTextNodes.forEach((node) => {
              if (node.textContent) {
                const cleanedText = stegaClean(node.textContent);
                if (cleanedText !== node.textContent) {
                  node.textContent = cleanedText;
                }
              }
            });
          }
        } catch (error) {
        }
      }
    };
    const allElements = document.querySelectorAll("*");
    Array.from(allElements).forEach(applyStegaToElement);
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node;
              applyStegaToElement(element);
              const childElements = element.querySelectorAll("*");
              Array.from(childElements).forEach(applyStegaToElement);
            }
          });
        }
        if (mutation.type === "characterData" && mutation.target.parentElement) {
          applyStegaToElement(mutation.target.parentElement);
        }
      });
    });
    observer.observe(document, {
      childList: true,
      subtree: true,
      characterData: true
    });
    return observer;
  };
  const createHighlightStyles = () => {
    const existingStyles = document.getElementById(HIGHLIGHT_STYLES_ID);
    if (existingStyles) {
      existingStyles.remove();
    }
    const styleElement = document.createElement("style");
    styleElement.id = HIGHLIGHT_STYLES_ID;
    styleElement.textContent = `
      .strapi-highlight {
        position: absolute;
        outline: 2px solid transparent;
        pointer-events: auto;
        border-radius: 2px;
        background-color: transparent;
        will-change: transform;
        transition: outline-color 0.1s ease-in-out;
      }

      .strapi-highlight:hover {
        outline-color: ${HIGHLIGHT_HOVER_COLOR} !important;
      }

      .strapi-highlight.strapi-highlight-focused {
        outline-color: ${HIGHLIGHT_ACTIVE_COLOR} !important;
        outline-width: 3px !important;
      }
    `;
    document.head.appendChild(styleElement);
    return styleElement;
  };
  const createOverlaySystem = () => {
    window.__strapi_previewCleanup?.();
    document.getElementById(OVERLAY_ID)?.remove();
    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    window.document.body.appendChild(overlay);
    return overlay;
  };
  const createHighlightManager = (overlay) => {
    const elementsToHighlight = /* @__PURE__ */ new Map();
    const eventListeners = [];
    const focusedHighlights = [];
    const pendingClicks = /* @__PURE__ */ new Map();
    let focusedField = null;
    const drawHighlight = (target, highlight) => {
      if (!highlight) return;
      const rect = target.getBoundingClientRect();
      highlight.style.width = `${rect.width + HIGHLIGHT_PADDING * 2}px`;
      highlight.style.height = `${rect.height + HIGHLIGHT_PADDING * 2}px`;
      highlight.style.transform = `translate(${rect.left - HIGHLIGHT_PADDING}px, ${rect.top - HIGHLIGHT_PADDING}px)`;
    };
    const updateAllHighlights = () => {
      elementsToHighlight.forEach((highlight, element) => {
        drawHighlight(element, highlight);
      });
    };
    const createHighlightForElement = (element) => {
      if (elementsToHighlight.has(element)) {
        return;
      }
      const highlight = document.createElement("div");
      highlight.className = "strapi-highlight";
      const clickHandler = (event) => {
        if (event.__strapi_redispatched) {
          return;
        }
        event.preventDefault();
        event.stopPropagation();
        const existingTimeout = pendingClicks.get(element);
        if (existingTimeout) {
          window.clearTimeout(existingTimeout);
          pendingClicks.delete(element);
        }
        const timeout = window.setTimeout(() => {
          pendingClicks.delete(element);
          sendMessage(INTERNAL_EVENTS2.STRAPI_FIELD_SINGLE_CLICK_HINT, null);
          const newEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
            view: window,
            detail: 1,
            button: event.button,
            buttons: event.buttons,
            clientX: event.clientX,
            clientY: event.clientY,
            ctrlKey: event.ctrlKey,
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            metaKey: event.metaKey
          });
          newEvent.__strapi_redispatched = true;
          element.dispatchEvent(newEvent);
        }, DOUBLE_CLICK_TIMEOUT);
        pendingClicks.set(element, timeout);
      };
      const doubleClickHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const existingTimeout = pendingClicks.get(element);
        if (existingTimeout) {
          clearTimeout(existingTimeout);
          pendingClicks.delete(element);
        }
        const sourceAttribute = element.getAttribute(SOURCE_ATTRIBUTE);
        if (sourceAttribute) {
          const rect = element.getBoundingClientRect();
          sendMessage(INTERNAL_EVENTS2.STRAPI_FIELD_FOCUS_INTENT, {
            path: sourceAttribute,
            position: {
              top: rect.top,
              left: rect.left,
              right: rect.right,
              bottom: rect.bottom,
              width: rect.width,
              height: rect.height
            }
          });
        }
      };
      const mouseDownHandler = (event) => {
        if (event.detail >= 2) {
          event.preventDefault();
        }
      };
      highlight.addEventListener("click", clickHandler);
      highlight.addEventListener("dblclick", doubleClickHandler);
      highlight.addEventListener("mousedown", mouseDownHandler);
      eventListeners.push(
        { element: highlight, type: "click", handler: clickHandler },
        { element: highlight, type: "dblclick", handler: doubleClickHandler },
        { element: highlight, type: "mousedown", handler: mouseDownHandler }
      );
      elementsToHighlight.set(element, highlight);
      overlay.appendChild(highlight);
      drawHighlight(element, highlight);
    };
    const removeHighlightForElement = (element) => {
      const highlight = elementsToHighlight.get(element);
      if (!highlight) return;
      const pendingTimeout = pendingClicks.get(element);
      if (pendingTimeout) {
        window.clearTimeout(pendingTimeout);
        pendingClicks.delete(element);
      }
      highlight.remove();
      elementsToHighlight.delete(element);
      const listenersToRemove = eventListeners.filter((listener) => listener.element === highlight);
      listenersToRemove.forEach(({ element: element2, type, handler }) => {
        element2.removeEventListener(type, handler);
      });
      eventListeners.splice(
        0,
        eventListeners.length,
        ...eventListeners.filter((listener) => listener.element !== highlight)
      );
    };
    const initialElements = window.document.querySelectorAll(`[${SOURCE_ATTRIBUTE}]`);
    Array.from(initialElements).forEach((element) => {
      if (element instanceof HTMLElement) {
        createHighlightForElement(element);
      }
    });
    return {
      get elements() {
        return Array.from(elementsToHighlight.keys());
      },
      get highlights() {
        return Array.from(elementsToHighlight.values());
      },
      updateAllHighlights,
      eventListeners,
      focusedHighlights,
      createHighlightForElement,
      removeHighlightForElement,
      setFocusedField: (field) => {
        focusedField = field;
      },
      getFocusedField: () => focusedField,
      clearAllPendingClicks: () => {
        pendingClicks.forEach((timeout) => clearTimeout(timeout));
        pendingClicks.clear();
      }
    };
  };
  const setupScrollManagement = (highlightManager) => {
    const updateOnScroll = () => {
      highlightManager.updateAllHighlights();
    };
    const scrollableElements = /* @__PURE__ */ new Set();
    scrollableElements.add(window);
    highlightManager.elements.forEach((element) => {
      let parent = element.parentElement;
      while (parent) {
        const computedStyle = window.getComputedStyle(parent);
        const overflow = computedStyle.overflow + computedStyle.overflowX + computedStyle.overflowY;
        if (overflow.includes("scroll") || overflow.includes("auto")) {
          scrollableElements.add(parent);
        }
        parent = parent.parentElement;
      }
    });
    scrollableElements.forEach((element) => {
      if (element === window) {
        window.addEventListener("scroll", updateOnScroll);
        window.addEventListener("resize", updateOnScroll);
      } else {
        element.addEventListener("scroll", updateOnScroll);
      }
    });
    const cleanup = () => {
      scrollableElements.forEach((element) => {
        if (element === window) {
          window.removeEventListener("scroll", updateOnScroll);
          window.removeEventListener("resize", updateOnScroll);
        } else {
          element.removeEventListener("scroll", updateOnScroll);
        }
      });
    };
    return { cleanup };
  };
  const setupObservers = (highlightManager, stegaObserver) => {
    const resizeObserver = new ResizeObserver(() => {
      highlightManager.updateAllHighlights();
    });
    const observeElementForResize = (element) => {
      resizeObserver.observe(element);
    };
    highlightManager.elements.forEach(observeElementForResize);
    resizeObserver.observe(document.documentElement);
    const highlightObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === SOURCE_ATTRIBUTE) {
          const target = mutation.target;
          if (target.hasAttribute(SOURCE_ATTRIBUTE)) {
            highlightManager.createHighlightForElement(target);
            observeElementForResize(target);
          } else {
            highlightManager.removeHighlightForElement(target);
          }
        }
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node;
              if (element.hasAttribute(SOURCE_ATTRIBUTE) && element instanceof HTMLElement) {
                highlightManager.createHighlightForElement(element);
                observeElementForResize(element);
              }
              const elementsWithSource = element.querySelectorAll(`[${SOURCE_ATTRIBUTE}]`);
              Array.from(elementsWithSource).forEach((childElement) => {
                if (childElement instanceof HTMLElement) {
                  highlightManager.createHighlightForElement(childElement);
                  observeElementForResize(childElement);
                }
              });
            }
          });
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node;
              highlightManager.removeHighlightForElement(element);
            }
          });
        }
      });
    });
    highlightObserver.observe(document, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [SOURCE_ATTRIBUTE]
    });
    return {
      resizeObserver,
      highlightObserver,
      stegaObserver
    };
  };
  const setupEventHandlers = (highlightManager) => {
    const handleMessage = (event) => {
      if (!event.data?.type) return;
      if (event.data.type === INTERNAL_EVENTS2.STRAPI_FIELD_CHANGE) {
        const { field, value } = event.data.payload;
        if (!field) return;
        getElementsByPath(field).forEach((element) => {
          if (element instanceof HTMLElement) {
            element.textContent = value || "";
          }
        });
        highlightManager.updateAllHighlights();
        return;
      }
      if (event.data.type === INTERNAL_EVENTS2.STRAPI_FIELD_FOCUS) {
        const { field } = event.data.payload;
        if (!field) return;
        highlightManager.focusedHighlights.forEach((highlight) => {
          highlight.classList.remove("strapi-highlight-focused");
        });
        highlightManager.focusedHighlights.length = 0;
        highlightManager.setFocusedField(field);
        getElementsByPath(field).forEach((element, index2) => {
          if (index2 === 0) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
          const highlight = highlightManager.highlights[Array.from(highlightManager.elements).indexOf(element)];
          if (highlight) {
            highlight.classList.add("strapi-highlight-focused");
            highlightManager.focusedHighlights.push(highlight);
          }
        });
        return;
      }
      if (event.data.type === INTERNAL_EVENTS2.STRAPI_FIELD_BLUR) {
        const { field } = event.data.payload;
        if (field !== highlightManager.getFocusedField()) return;
        highlightManager.focusedHighlights.forEach((highlight) => {
          highlight.classList.remove("strapi-highlight-focused");
        });
        highlightManager.focusedHighlights.length = 0;
        highlightManager.setFocusedField(null);
      }
    };
    window.addEventListener("message", handleMessage);
    const messageEventListener = {
      element: window,
      type: "message",
      handler: handleMessage
    };
    return [...highlightManager.eventListeners, messageEventListener];
  };
  const createCleanupSystem = (overlay, observers, scrollManager, eventHandlers, highlightManager) => {
    window.__strapi_previewCleanup = () => {
      observers.resizeObserver.disconnect();
      observers.highlightObserver.disconnect();
      observers.stegaObserver?.disconnect();
      scrollManager.cleanup();
      highlightManager.clearAllPendingClicks();
      eventHandlers.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler);
      });
      const existingStyles = document.getElementById(HIGHLIGHT_STYLES_ID);
      if (existingStyles) {
        existingStyles.remove();
      }
      overlay.remove();
    };
  };
  setupStegaDOMObserver().then((stegaObserver) => {
    createHighlightStyles();
    const overlay = createOverlaySystem();
    const highlightManager = createHighlightManager(overlay);
    const observers = setupObservers(highlightManager, stegaObserver);
    const scrollManager = setupScrollManagement(highlightManager);
    const eventHandlers = setupEventHandlers(highlightManager);
    createCleanupSystem(overlay, observers, scrollManager, eventHandlers, highlightManager);
  });
};
const PREVIEW_HIGHLIGHT_COLORS = {
  highlightHoverColor: "transparent",
  highlightActiveColor: "transparent"
};
const scriptResponse = previewScript({ shouldRun: false, colors: PREVIEW_HIGHLIGHT_COLORS });
const INTERNAL_EVENTS = scriptResponse.INTERNAL_EVENTS;
const [InputPopoverProvider, useInputPopoverContext] = admin.createContext("InputPopover");
function useHasInputPopoverParent() {
  const context = useInputPopoverContext("useHasInputPopoverParent", () => true, false);
  return context !== void 0;
}
const DocumentActionButton = ({ buttonType = "button", ...action }) => {
  const [dialogId, setDialogId] = React__namespace.useState(null);
  const { toggleNotification } = admin.useNotification();
  const handleClick = (action2) => async (e) => {
    const { onClick = () => false, dialog, id } = action2;
    const muteDialog = await onClick(e);
    if (dialog && !muteDialog) {
      switch (dialog.type) {
        case "notification":
          toggleNotification({
            title: dialog.title,
            message: dialog.content,
            type: dialog.status,
            timeout: dialog.timeout,
            onClose: dialog.onClose
          });
          break;
        case "dialog":
        case "modal":
          e.preventDefault();
          setDialogId(id);
      }
    }
  };
  const handleClose = () => {
    setDialogId(null);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        flex: "auto",
        startIcon: action.icon,
        disabled: action.disabled,
        onClick: handleClick(action),
        justifyContent: "center",
        variant: action.variant || "default",
        paddingTop: "7px",
        paddingBottom: "7px",
        loading: action.loading,
        type: buttonType,
        children: action.label
      }
    ),
    action.dialog?.type === "dialog" ? /* @__PURE__ */ jsxRuntime.jsx(
      DocumentActionConfirmDialog$1,
      {
        ...action.dialog,
        variant: action.dialog?.variant ?? action.variant,
        isOpen: dialogId === action.id,
        onClose: handleClose
      }
    ) : null,
    action.dialog?.type === "modal" ? /* @__PURE__ */ jsxRuntime.jsx(
      DocumentActionModal,
      {
        ...action.dialog,
        onModalClose: handleClose,
        isOpen: dialogId === action.id
      }
    ) : null
  ] });
};
const DocumentActionConfirmDialog$1 = ({
  onClose,
  onCancel,
  onConfirm,
  title,
  content,
  isOpen,
  variant = "secondary",
  loading
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleClose = async () => {
    if (onCancel) {
      await onCancel();
    }
    onClose();
  };
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: isOpen, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Header, { children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Body, { children: content }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Cancel, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", fullWidth: true, children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleConfirm, variant, fullWidth: true, loading, children: "Confirm" })
    ] })
  ] }) });
};
const DocumentActionModal = ({
  isOpen,
  title,
  onClose,
  footer: Footer,
  content: Content,
  onModalClose
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    onModalClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isOpen, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: title }) }),
    typeof Content === "function" ? /* @__PURE__ */ jsxRuntime.jsx(Content, { onClose: handleClose }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: Content }),
    typeof Footer === "function" ? /* @__PURE__ */ jsxRuntime.jsx(Footer, { onClose: handleClose }) : Footer
  ] }) });
};
styledComponents.styled(designSystem.Typography)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
styledComponents.styled(designSystem.Tabs.Trigger)`
  text-transform: uppercase;
`;
styledComponents.styled(designSystem.Flex)`
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const previewApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreviewUrl: builder.query({
      query({ query, params }) {
        return {
          url: `/content-manager/preview/url/${params.contentType}`,
          method: "GET",
          config: {
            params: query
          }
        };
      }
    })
  })
});
const { useGetPreviewUrlQuery } = previewApi;
function getSendMessage(iframe) {
  return (type, payload) => {
    if (!iframe?.current) return;
    const { origin } = new URL(iframe.current.src);
    iframe.current.contentWindow?.postMessage(
      {
        type,
        ...payload !== void 0 && { payload }
      },
      origin
    );
  };
}
const [PreviewProvider, usePreviewContext] = admin.createContext("PreviewPage");
styledComponents.styled(Icons.ArrowLineLeft)`
  will-change: transform;
  rotate: ${(props) => props.$isSideEditorOpen ? "0deg" : "180deg"};
  transition: rotate 0.2s ease-in-out;
`;
const DEFAULT_UNEXPECTED_ERROR_MSG = {
  id: "notification.error",
  defaultMessage: "An error occurred, please try again"
};
const useDocumentActions = () => {
  const { toggleNotification } = admin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler();
  const navigate = reactRouterDom.useNavigate();
  const previewContext = usePreviewContext("useDocumentActions", () => true, false);
  const relationContext = useRelationModal("useDocumentActions", () => true, false);
  const fromPreview = previewContext != void 0;
  const fromRelationModal = relationContext != void 0;
  const [deleteDocument, { isLoading: isDeleting }] = useDeleteDocumentMutation();
  const _delete = React__namespace.useCallback(
    async ({ collectionType, model, documentId, params }) => {
      try {
        const res = await deleteDocument({
          collectionType,
          model,
          documentId,
          params
        });
        if ("error" in res) {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.delete"),
            defaultMessage: "Deleted document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        return { error: err };
      }
    },
    [deleteDocument, formatAPIError, formatMessage, toggleNotification]
  );
  const [deleteManyDocuments, { isLoading: isDeletingMany }] = useDeleteManyDocumentsMutation();
  const deleteMany = React__namespace.useCallback(
    async ({ model, documentIds, params }) => {
      try {
        const res = await deleteManyDocuments({
          model,
          documentIds,
          params
        });
        if ("error" in res) {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          title: formatMessage({
            id: index.getTranslation("success.records.delete"),
            defaultMessage: "Successfully deleted."
          }),
          message: ""
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [deleteManyDocuments, formatAPIError, formatMessage, toggleNotification]
  );
  const [discardDocument, { isLoading: isDiscardingDocument }] = useDiscardDocumentMutation();
  const discard = React__namespace.useCallback(
    async ({ collectionType, model, documentId, params }) => {
      try {
        const res = await discardDocument({
          collectionType,
          model,
          documentId,
          params
        });
        if ("error" in res) {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "content-manager.success.record.discard",
            defaultMessage: "Changes discarded"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [discardDocument, formatAPIError, formatMessage, toggleNotification]
  );
  const [publishDocument, { isLoading: isPublishing }] = usePublishDocumentMutation();
  const publish = React__namespace.useCallback(
    async ({ collectionType, model, documentId, params }, data) => {
      try {
        const res = await publishDocument({
          collectionType,
          model,
          documentId,
          data,
          params
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.publish"),
            defaultMessage: "Published document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [
      publishDocument,
      formatMessage,
      fromPreview,
      fromRelationModal,
      toggleNotification,
      formatAPIError
    ]
  );
  const [publishManyDocuments, { isLoading: isPublishingMany }] = usePublishManyDocumentsMutation();
  const publishMany = React__namespace.useCallback(
    async ({ model, documentIds, params }) => {
      try {
        const res = await publishManyDocuments({
          model,
          documentIds,
          params
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.publish"),
            defaultMessage: "Published document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [publishManyDocuments, formatMessage, formatAPIError, toggleNotification]
  );
  const [updateDocument, { isLoading: isUpdating }] = useUpdateDocumentMutation();
  const update = React__namespace.useCallback(
    async ({ collectionType, model, documentId, params }, data) => {
      try {
        const res = await updateDocument({
          collectionType,
          model,
          documentId,
          data,
          params
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.save"),
            defaultMessage: "Saved document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [updateDocument, formatMessage, formatAPIError, toggleNotification]
  );
  const [unpublishDocument] = useUnpublishDocumentMutation();
  const unpublish = React__namespace.useCallback(
    async ({ collectionType, model, documentId, params }, discardDraft = false) => {
      try {
        const res = await unpublishDocument({
          collectionType,
          model,
          documentId,
          params,
          data: {
            discardDraft
          }
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.unpublish"),
            defaultMessage: "Unpublished document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [unpublishDocument, formatMessage, formatAPIError, toggleNotification]
  );
  const [unpublishManyDocuments, { isLoading: isUnpublishingMany }] = useUnpublishManyDocumentsMutation();
  const unpublishMany = React__namespace.useCallback(
    async ({ model, documentIds, params }) => {
      try {
        const res = await unpublishManyDocuments({
          model,
          documentIds,
          params
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          title: formatMessage({
            id: index.getTranslation("success.records.unpublish"),
            defaultMessage: "Successfully unpublished."
          }),
          message: ""
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [unpublishManyDocuments, formatMessage, formatAPIError, toggleNotification]
  );
  const [createDocument] = useCreateDocumentMutation();
  const create = React__namespace.useCallback(
    async ({ model, params }, data) => {
      try {
        const res = await createDocument({
          model,
          data,
          params
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.save"),
            defaultMessage: "Saved document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [createDocument, formatMessage, formatAPIError, toggleNotification]
  );
  const [autoCloneDocument] = useAutoCloneDocumentMutation();
  const autoClone = React__namespace.useCallback(
    async ({ model, sourceId, locale }) => {
      try {
        const res = await autoCloneDocument({
          model,
          sourceId,
          params: locale ? { locale } : void 0
        });
        if ("error" in res) {
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.clone"),
            defaultMessage: "Cloned document"
          })
        });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [autoCloneDocument, formatMessage, toggleNotification]
  );
  const [cloneDocument] = useCloneDocumentMutation();
  const clone = React__namespace.useCallback(
    async ({ model, documentId, params }, body) => {
      try {
        const { id: _id, documentId: _documentId, ...restBody } = body;
        const res = await cloneDocument({
          model,
          sourceId: documentId,
          data: restBody,
          params
        });
        if ("error" in res) {
          toggleNotification({ type: "danger", message: formatAPIError(res.error) });
          return { error: res.error };
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: index.getTranslation("success.record.clone"),
            defaultMessage: "Cloned document"
          })
        });
        navigate(`../../${res.data.data.documentId}`, { relative: "path" });
        return res.data;
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage(DEFAULT_UNEXPECTED_ERROR_MSG)
        });
        throw err;
      }
    },
    [cloneDocument, toggleNotification, formatMessage, formatAPIError, navigate]
  );
  const [getDoc] = useLazyGetDocumentQuery();
  const getDocument = React__namespace.useCallback(
    async (args) => {
      const { data } = await getDoc(args);
      return data;
    },
    [getDoc]
  );
  return {
    isLoading: isPublishing || isUpdating || isDiscardingDocument || isDeleting || isDeletingMany || isUnpublishingMany || isPublishingMany,
    autoClone,
    clone,
    create,
    delete: _delete,
    deleteMany,
    discard,
    getDocument,
    publish,
    publishMany,
    unpublish,
    unpublishMany,
    update
  };
};
const [ComponentProvider, useComponent] = admin.createContext("ComponentContext", {
  id: void 0,
  level: -1,
  uid: void 0,
  type: void 0
});
function getCollectionType(url) {
  const regex = new RegExp(`(${index.COLLECTION_TYPES}|${index.SINGLE_TYPES})`);
  const match = url.match(regex);
  return match ? match[1] : void 0;
}
const StyledModalContent = styledComponents.styled(designSystem.Modal.Content)`
  width: 90%;
  max-width: 100%;
  height: 90%;
  max-height: 100%;
`;
const getFullPageUrl = (currentDocumentMeta) => {
  const isSingleType = currentDocumentMeta.collectionType === index.SINGLE_TYPES;
  const queryParams = currentDocumentMeta.params?.locale ? `?plugins[i18n][locale]=${currentDocumentMeta.params.locale}` : "";
  return `/content-manager/${currentDocumentMeta.collectionType}/${currentDocumentMeta.model}${isSingleType ? "" : "/" + currentDocumentMeta.documentId}${queryParams}`;
};
function reducer(state, action) {
  switch (action.type) {
    case "GO_TO_RELATION":
      if (state.hasUnsavedChanges && !action.payload.shouldBypassConfirmation) {
        return {
          ...state,
          confirmDialogIntent: action.payload.document,
          fieldToConnect: action.payload.fieldToConnect,
          fieldToConnectUID: action.payload.fieldToConnectUID
        };
      }
      const lastItemDocumentHistory = state.documentHistory.at(-1);
      const hasToResetDocumentHistory = lastItemDocumentHistory && !lastItemDocumentHistory.documentId;
      return {
        ...state,
        // Reset document history if the last item has documentId undefined
        documentHistory: hasToResetDocumentHistory ? [action.payload.document] : [...state.documentHistory, action.payload.document],
        confirmDialogIntent: null,
        isModalOpen: true,
        fieldToConnect: hasToResetDocumentHistory ? void 0 : action.payload.fieldToConnect,
        fieldToConnectUID: hasToResetDocumentHistory ? void 0 : action.payload.fieldToConnectUID
      };
    case "GO_BACK":
      if (state.hasUnsavedChanges && !action.payload.shouldBypassConfirmation) {
        return { ...state, confirmDialogIntent: "back" };
      }
      return {
        ...state,
        documentHistory: state.documentHistory.slice(0, -1),
        confirmDialogIntent: null
      };
    case "GO_FULL_PAGE":
      if (state.hasUnsavedChanges) {
        return { ...state, confirmDialogIntent: "navigate" };
      }
      return {
        ...state,
        documentHistory: [],
        hasUnsavedChanges: false,
        isModalOpen: false,
        confirmDialogIntent: null
      };
    case "GO_TO_CREATED_RELATION":
      return {
        ...state,
        // Reset document history if the last item has documentId undefined
        documentHistory: state.documentHistory ? [...state.documentHistory.slice(0, -1), action.payload.document] : [action.payload.document],
        confirmDialogIntent: null,
        isModalOpen: true,
        fieldToConnect: void 0,
        fieldToConnectUID: void 0
      };
    case "CANCEL_CONFIRM_DIALOG":
      return {
        ...state,
        confirmDialogIntent: null
      };
    case "CLOSE_MODAL":
      if (state.hasUnsavedChanges && !action.payload.shouldBypassConfirmation) {
        return { ...state, confirmDialogIntent: "close" };
      }
      return {
        ...state,
        documentHistory: [],
        confirmDialogIntent: null,
        hasUnsavedChanges: false,
        isModalOpen: false
      };
    case "SET_HAS_UNSAVED_CHANGES":
      return {
        ...state,
        hasUnsavedChanges: action.payload.hasUnsavedChanges
      };
    default:
      return state;
  }
}
const [RelationModalProvider, useRelationModal] = admin.createContext("RelationModal");
function isRenderProp(children) {
  return typeof children === "function";
}
const RootRelationRenderer = (props) => {
  const { children } = props;
  const [state, dispatch] = React__namespace.useReducer(reducer, {
    documentHistory: [],
    confirmDialogIntent: null,
    isModalOpen: false,
    hasUnsavedChanges: false,
    fieldToConnect: void 0
  });
  const rootDocument = useDoc();
  const [{ query }] = admin.useQueryParams();
  const params = React__namespace.useMemo(() => buildValidParams(query ?? {}), [query]);
  const rootDocumentMeta = {
    documentId: rootDocument.document?.documentId || "",
    model: rootDocument.model,
    collectionType: rootDocument.collectionType,
    params
  };
  const currentDocumentMeta = state.documentHistory.at(-1) ?? rootDocumentMeta;
  const currentDocument = useDocument(currentDocumentMeta);
  const isSingleType = currentDocumentMeta.collectionType === index.SINGLE_TYPES;
  const isCreating = !currentDocumentMeta.documentId && !isSingleType;
  return /* @__PURE__ */ jsxRuntime.jsx(
    RelationModalProvider,
    {
      state,
      dispatch,
      rootDocumentMeta,
      currentDocumentMeta,
      currentDocument,
      isCreating,
      children: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(RelationModal, { children: isRenderProp(children) ? children({ dispatch }) : props.relation && /* @__PURE__ */ jsxRuntime.jsx(RelationModalTrigger, { relation: props.relation, children }) }),
        /* @__PURE__ */ jsxRuntime.jsx(RelationModalConfirmDialog, {})
      ] })
    }
  );
};
const NestedRelationRenderer = (props) => {
  const { children } = props;
  const dispatch = useRelationModal("NestedRelation", (state) => state.dispatch);
  return isRenderProp(children) ? children({ dispatch }) : props.relation && /* @__PURE__ */ jsxRuntime.jsx(RelationModalTrigger, { relation: props.relation, children });
};
const RelationModalRenderer = (props) => {
  const isNested = useRelationModal("RelationContextWrapper", (state) => state != void 0, false);
  return isNested ? /* @__PURE__ */ jsxRuntime.jsx(NestedRelationRenderer, { ...props }) : /* @__PURE__ */ jsxRuntime.jsx(RootRelationRenderer, { ...props });
};
const generateCreateUrl = (currentDocumentMeta) => {
  return `/content-manager/${currentDocumentMeta.collectionType}/${currentDocumentMeta.model}/create${currentDocumentMeta.params?.locale ? `?plugins[i18n][locale]=${currentDocumentMeta.params.locale}` : ""}`;
};
const RelationModal = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  const navigate = reactRouterDom.useNavigate();
  const state = useRelationModal("RelationModalForm", (state2) => state2.state);
  const dispatch = useRelationModal("RelationModalForm", (state2) => state2.dispatch);
  const currentDocumentMeta = useRelationModal(
    "RelationModalForm",
    (state2) => state2.currentDocumentMeta
  );
  const currentDocument = useRelationModal("RelationModalForm", (state2) => state2.currentDocument);
  const isCreating = useRelationModal("RelationModalForm", (state2) => state2.isCreating);
  return /* @__PURE__ */ jsxRuntime.jsx(ComponentProvider, { id: void 0, level: -1, uid: void 0, type: void 0, children: /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Modal.Root,
    {
      open: state.isModalOpen,
      onOpenChange: (open) => {
        if (!open) {
          dispatch({
            type: "CLOSE_MODAL",
            payload: { shouldBypassConfirmation: false }
          });
        }
      },
      children: [
        children,
        /* @__PURE__ */ jsxRuntime.jsxs(StyledModalContent, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { gap: 2, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", width: "100%", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  withTooltip: false,
                  label: formatMessage({ id: "global.back", defaultMessage: "Back" }),
                  variant: "ghost",
                  disabled: state.documentHistory.length < 2,
                  onClick: () => {
                    dispatch({
                      type: "GO_BACK",
                      payload: { shouldBypassConfirmation: false }
                    });
                  },
                  marginRight: 1,
                  children: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowLeft, {})
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "span", fontWeight: 600, children: isCreating ? formatMessage({
                id: "content-manager.relation.create",
                defaultMessage: "Create a relation"
              }) : formatMessage({
                id: "content-manager.components.RelationInputModal.modal-title",
                defaultMessage: "Edit a relation"
              }) })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => {
                  dispatch({
                    type: "GO_FULL_PAGE"
                  });
                  if (!state.hasUnsavedChanges) {
                    if (isCreating) {
                      navigate(generateCreateUrl(currentDocumentMeta));
                    } else {
                      navigate(getFullPageUrl(currentDocumentMeta));
                    }
                  }
                },
                variant: "tertiary",
                label: formatMessage({
                  id: "content-manager.components.RelationInputModal.button-fullpage",
                  defaultMessage: "Go to entry"
                }),
                children: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowsOut, {})
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsx(
            admin.Form,
            {
              method: isCreating ? "POST" : "PUT",
              initialValues: currentDocument.getInitialFormValues(isCreating),
              validate: (values, options) => {
                const yupSchema = createYupSchema(
                  currentDocument.schema?.attributes,
                  currentDocument.components,
                  {
                    status: currentDocument.document?.status,
                    ...options
                  }
                );
                return yupSchema.validate(values, { abortEarly: false });
              },
              children: /* @__PURE__ */ jsxRuntime.jsx(RelationModalBody, {})
            }
          ) })
        ] })
      ]
    }
  ) });
};
const RelationModalBody = () => {
  const dispatch = useRelationModal("RelationModalForm", (state) => state.dispatch);
  const modified = admin.useForm("FormWatcher", (state) => state.modified);
  const isSubmitting = admin.useForm("FormWatcher", (state) => state.isSubmitting);
  const hasUnsavedChanges = modified && !isSubmitting;
  React__namespace.useEffect(() => {
    dispatch({ type: "SET_HAS_UNSAVED_CHANGES", payload: { hasUnsavedChanges } });
  }, [hasUnsavedChanges, dispatch]);
  return /* @__PURE__ */ jsxRuntime.jsx(RelationModalForm, {});
};
const RelationModalConfirmDialog = () => {
  const navigate = reactRouterDom.useNavigate();
  const { pathname, search } = reactRouterDom.useLocation();
  const { formatMessage } = reactIntl.useIntl();
  const [triggerRefetchDocument] = useLazyGetDocumentQuery();
  const state = useRelationModal("RelationModalConfirmDialog", (state2) => state2.state);
  const dispatch = useRelationModal("RelationModalConfirmDialog", (state2) => state2.dispatch);
  const rootDocumentMeta = useRelationModal(
    "RelationModalConfirmDialog",
    (state2) => state2.rootDocumentMeta
  );
  const currentDocumentMeta = useRelationModal(
    "RelationModalConfirmDialog",
    (state2) => state2.currentDocumentMeta
  );
  const isCreating = useRelationModal("RelationModalConfirmDialog", (state2) => state2.isCreating);
  const handleCloseModal = (shouldBypassConfirmation) => {
    dispatch({ type: "CLOSE_MODAL", payload: { shouldBypassConfirmation } });
    {
      triggerRefetchDocument(rootDocumentMeta, true);
    }
  };
  const handleRedirection = () => {
    const editViewUrl = `${pathname}${search}`;
    const fullPageUrl = getFullPageUrl(currentDocumentMeta);
    const isRootDocumentUrl = editViewUrl.includes(fullPageUrl);
    if (isRootDocumentUrl) {
      handleCloseModal(true);
    } else {
      if (isCreating) {
        navigate(generateCreateUrl(currentDocumentMeta));
      } else {
        navigate(fullPageUrl);
      }
    }
  };
  const handleConfirm = () => {
    if (state.confirmDialogIntent === null) {
      return;
    }
    if (state.confirmDialogIntent === "navigate") {
      handleRedirection();
    } else if (state.confirmDialogIntent === "back") {
      dispatch({ type: "GO_BACK", payload: { shouldBypassConfirmation: true } });
    } else if (state.confirmDialogIntent === "close") {
      handleCloseModal(true);
    } else if ("documentId" in state.confirmDialogIntent) {
      dispatch({
        type: "GO_TO_RELATION",
        payload: { document: state.confirmDialogIntent, shouldBypassConfirmation: true }
      });
    }
  };
  if (state.confirmDialogIntent === null) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: true, children: /* @__PURE__ */ jsxRuntime.jsx(
    admin.ConfirmDialog,
    {
      onConfirm: () => handleConfirm(),
      onCancel: () => dispatch({ type: "CANCEL_CONFIRM_DIALOG" }),
      variant: "danger",
      children: formatMessage({
        id: "content-manager.components.RelationInputModal.confirmation-message",
        defaultMessage: "Some changes were not saved. Are you sure you want to close this relation? All changes that were not saved will be lost."
      })
    }
  ) });
};
const RelationModalTrigger = ({
  children,
  relation
}) => {
  useRelationModal("ModalTrigger", (state) => state.dispatch);
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledTextButton,
    {
      children
    }
  );
};
const StyledTextButton = styledComponents.styled(designSystem.TextButton)`
  max-width: 100%;
  & > span {
    font-size: ${({ theme }) => theme.fontSizes[2]};
    width: inherit;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;
const RelationModalForm = () => {
  const { formatMessage } = reactIntl.useIntl();
  const currentDocumentMeta = useRelationModal(
    "RelationModalForm",
    (state) => state.currentDocumentMeta
  );
  const isCreating = useRelationModal("RelationModalForm", (state) => state.isCreating);
  const currentDocument = useRelationModal("RelationModalForm", (state) => state.currentDocument);
  const documentLayoutResponse = useDocumentLayout(currentDocumentMeta.model);
  const plugins = admin.useStrapiApp("RelationModalForm", (state) => state.plugins);
  const initialValues = isCreating ? currentDocument.getInitialFormValues(isCreating) : currentDocument.getInitialFormValues();
  const permissions = null;
  const isLoading = documentLayoutResponse.isLoading || currentDocument.isLoading;
  if (isLoading && !currentDocument.document?.documentId) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { small: true, children: formatMessage({
      id: "content-manager.ListViewTable.relation-loading",
      defaultMessage: "Relations are loading"
    }) });
  }
  if (!currentDocumentMeta.model || documentLayoutResponse.error || !isCreating && !currentDocument.document || !isCreating && !currentDocument.meta || !currentDocument.schema || !initialValues) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { alignItems: "center", height: "100%", justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.WarningCircle, { width: "16rem" }),
        content: formatMessage({
          id: "anErrorOccurred",
          defaultMessage: "Whoops! Something went wrong. Please, try again."
        })
      }
    ) });
  }
  const documentTitle = currentDocument.getTitle(documentLayoutResponse.edit.settings.mainField);
  const hasDraftAndPublished = currentDocument.schema?.options?.draftAndPublish ?? false;
  const props = {
    activeTab: "draft",
    collectionType: currentDocumentMeta.collectionType,
    model: currentDocumentMeta.model,
    documentId: currentDocumentMeta.documentId,
    document: currentDocument.document,
    meta: currentDocument.meta
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(DocumentRBAC, { permissions, model: currentDocumentMeta.model, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-start", direction: "column", gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { width: "100%", justifyContent: "space-between", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "alpha", children: documentTitle }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
          admin.DescriptionComponentRenderer,
          {
            props,
            descriptions: plugins["content-manager"].apis.getDocumentActions("relation-modal"),
            children: (actions) => {
              const filteredActions = actions.filter((action) => {
                return [action.position].flat().includes("relation-modal");
              });
              const [primaryAction, secondaryAction] = filteredActions;
              if (!primaryAction && !secondaryAction) return null;
              if (primaryAction && secondaryAction) {
                return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(
                    DocumentActionButton,
                    {
                      ...secondaryAction,
                      variant: secondaryAction.variant || "secondary"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    DocumentActionButton,
                    {
                      ...primaryAction,
                      variant: primaryAction.variant || "default"
                    }
                  )
                ] });
              }
              return /* @__PURE__ */ jsxRuntime.jsx(
                DocumentActionButton,
                {
                  ...primaryAction,
                  variant: primaryAction.variant || "secondary"
                }
              );
            }
          }
        ) })
      ] }),
      hasDraftAndPublished ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: /* @__PURE__ */ jsxRuntime.jsx(DocumentStatus, { status: currentDocument.document?.status }) }) : null
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { flex: 1, overflow: "auto", alignItems: "stretch", paddingTop: 7, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { overflow: "auto", flex: 1, children: /* @__PURE__ */ jsxRuntime.jsx(
      FormLayout,
      {
        layout: documentLayoutResponse.edit.layout,
        document: currentDocument,
        hasBackground: false
      }
    ) }) })
  ] });
};
function useDocumentContext(consumerName) {
  const currentRelationDocumentMeta = useRelationModal(
    consumerName,
    (state) => state.currentDocumentMeta,
    false
  );
  const currentRelationDocument = useRelationModal(
    consumerName,
    (state) => state.currentDocument,
    false
  );
  const { collectionType, model, id: documentId } = useDoc();
  const [{ query }] = admin.useQueryParams();
  const params = React__namespace.useMemo(() => buildValidParams(query ?? {}), [query]);
  const urlDocumentMeta = { collectionType, model, documentId, params };
  const urlDocument = useDocument(urlDocumentMeta);
  return {
    currentDocumentMeta: currentRelationDocumentMeta ?? urlDocumentMeta,
    currentDocument: currentRelationDocument ?? urlDocument
  };
}
function usePreviewInputManager(name2, attribute) {
  const iframe = usePreviewContext("usePreviewInputManager", (state) => state.iframeRef, false);
  const setPopoverField = usePreviewContext(
    "usePreviewInputManager",
    (state) => state.setPopoverField,
    false
  );
  const hasInputPopoverParent = useHasInputPopoverParent();
  const { value } = admin.useField(name2);
  const { type } = attribute;
  React__namespace.useEffect(() => {
    if (!iframe || !type) {
      return;
    }
    if (!["component", "dynamiczone"].includes(type)) {
      const sendMessage2 = getSendMessage(iframe);
      sendMessage2(INTERNAL_EVENTS.STRAPI_FIELD_CHANGE, { field: name2, value });
    }
  }, [name2, value, iframe, type]);
  const sendMessage = getSendMessage(iframe);
  return {
    onFocus: () => {
      if (hasInputPopoverParent) return;
      sendMessage(INTERNAL_EVENTS.STRAPI_FIELD_FOCUS, { field: name2 });
    },
    onBlur: () => {
      if (hasInputPopoverParent) return;
      setPopoverField?.(null);
      sendMessage(INTERNAL_EVENTS.STRAPI_FIELD_BLUR, { field: name2 });
    }
  };
}
const codeLanguages = [
  {
    value: "asm",
    label: "Assembly",
    decorate: "asmatmel"
  },
  {
    value: "bash",
    label: "Bash"
  },
  {
    value: "c",
    label: "C"
  },
  {
    value: "clojure",
    label: "Clojure"
  },
  {
    value: "cobol",
    label: "COBOL"
  },
  {
    value: "cpp",
    label: "C++"
  },
  {
    value: "csharp",
    label: "C#"
  },
  {
    value: "css",
    label: "CSS"
  },
  {
    value: "dart",
    label: "Dart"
  },
  {
    value: "dockerfile",
    label: "Dockerfile",
    decorate: "docker"
  },
  {
    value: "elixir",
    label: "Elixir"
  },
  {
    value: "erlang",
    label: "Erlang"
  },
  {
    value: "fortran",
    label: "Fortran"
  },
  {
    value: "fsharp",
    label: "F#"
  },
  {
    value: "go",
    label: "Go"
  },
  {
    value: "graphql",
    label: "GraphQL"
  },
  {
    value: "groovy",
    label: "Groovy"
  },
  {
    value: "haskell",
    label: "Haskell"
  },
  {
    value: "haxe",
    label: "Haxe"
  },
  {
    value: "html",
    label: "HTML"
  },
  {
    value: "ini",
    label: "INI"
  },
  {
    value: "java",
    label: "Java"
  },
  {
    value: "javascript",
    label: "JavaScript"
  },
  {
    value: "jsx",
    label: "JavaScript (React)"
  },
  {
    value: "json",
    label: "JSON"
  },
  {
    value: "julia",
    label: "Julia"
  },
  {
    value: "kotlin",
    label: "Kotlin"
  },
  {
    value: "latex",
    label: "LaTeX"
  },
  {
    value: "lua",
    label: "Lua"
  },
  {
    value: "markdown",
    label: "Markdown"
  },
  {
    value: "matlab",
    label: "MATLAB"
  },
  {
    value: "makefile",
    label: "Makefile"
  },
  {
    value: "objectivec",
    label: "Objective-C"
  },
  {
    value: "perl",
    label: "Perl"
  },
  {
    value: "php",
    label: "PHP"
  },
  {
    value: "plaintext",
    label: "Plain text"
  },
  {
    value: "powershell",
    label: "PowerShell"
  },
  {
    value: "python",
    label: "Python"
  },
  {
    value: "r",
    label: "R"
  },
  {
    value: "ruby",
    label: "Ruby"
  },
  {
    value: "rust",
    label: "Rust"
  },
  {
    value: "sas",
    label: "SAS"
  },
  {
    value: "scala",
    label: "Scala"
  },
  {
    value: "scheme",
    label: "Scheme"
  },
  {
    value: "shell",
    label: "Shell"
  },
  {
    value: "sql",
    label: "SQL"
  },
  {
    value: "stata",
    label: "Stata"
  },
  {
    value: "swift",
    label: "Swift"
  },
  {
    value: "typescript",
    label: "TypeScript",
    decorate: "ts"
  },
  {
    value: "tsx",
    label: "TypeScript (React)"
  },
  {
    value: "vbnet",
    label: "VB.NET"
  },
  {
    value: "xml",
    label: "XML"
  },
  {
    value: "yaml",
    label: "YAML",
    decorate: "yml"
  }
];
const baseHandleConvert = (editor, attributesToSet) => {
  const [_, lastNodePath] = slate.Editor.last(editor, []);
  slate.Transforms.unwrapNodes(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
    split: true,
    at: editor.selection ?? lastNodePath
  });
  const [, updatedLastNodePath] = slate.Editor.last(editor, []);
  const entry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type !== "text" && node.type !== "link",
    at: editor.selection ?? updatedLastNodePath
  });
  if (!entry || slate.Editor.isEditor(entry[0])) {
    return;
  }
  const [element, elementPath] = entry;
  slate.Transforms.setNodes(
    editor,
    {
      ...getAttributesToClear(element),
      ...attributesToSet
    },
    { at: elementPath }
  );
  return elementPath;
};
const getAttributesToClear = (element) => {
  const { children: _children, type: _type, ...extra } = element;
  const attributesToClear = Object.keys(extra).reduce(
    (currentAttributes, key) => ({ ...currentAttributes, [key]: null }),
    {}
  );
  return attributesToClear;
};
const isText$2 = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "text";
};
const pressEnterTwiceToExit = (editor) => {
  const nodeEntry = slate.Editor.above(editor, {
    match: (node2) => !slate.Editor.isEditor(node2) && !["link", "text"].includes(node2.type)
  });
  if (!nodeEntry || !editor.selection) {
    return;
  }
  const [node, nodePath] = nodeEntry;
  const isNodeEnd = slate.Editor.isEnd(editor, editor.selection.anchor, nodePath);
  const lastTextNode = node.children.at(-1);
  const isEmptyLine = isText$2(lastTextNode) && lastTextNode.text.endsWith("\n");
  if (isNodeEnd && isEmptyLine) {
    slate.Transforms.delete(editor, { distance: 1, unit: "character", reverse: true });
    slate.Transforms.insertNodes(editor, {
      type: "paragraph",
      children: [{ type: "text", text: "" }]
    });
    return;
  }
  slate.Transforms.insertText(editor, "\n");
  if (isNodeEnd) {
    ["bold", "italic", "underline", "strikethrough", "code"].forEach((modifier) => {
      slate.Editor.removeMark(editor, modifier);
    });
  }
};
const decorateCode = ([node, path]) => {
  const ranges = [];
  if (!slate.Element.isElement(node) || node.type !== "code") return ranges;
  const text = slate.Node.string(node);
  const language = codeLanguages.find((lang) => lang.value === node.language);
  const decorateKey = language?.decorate ?? language?.value;
  const selectedLanguage = Prism__namespace.languages[decorateKey || "plaintext"];
  const tokens = Prism__namespace.tokenize(text, selectedLanguage);
  let start = 0;
  for (const token of tokens) {
    const length = token.length;
    const end = start + length;
    if (typeof token !== "string") {
      ranges.push({
        anchor: { path, offset: start },
        focus: { path, offset: end },
        className: `token ${token.type}`
      });
    }
    start = end;
  }
  return ranges;
};
const CodeBlock = styledComponents.styled.pre`
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.neutral100};
  max-width: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  flex-shrink: 1;

  & > code {
    font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
      monospace;
    color: ${({ theme }) => theme.colors.neutral800};
    overflow: auto;
    max-width: 100%;
  }
`;
const CodeEditor = (props) => {
  const { editor } = useBlocksEditorContext("ImageDialog");
  const editorIsFocused = slateReact.useFocused();
  const imageIsSelected = slateReact.useSelected();
  const { formatMessage } = reactIntl.useIntl();
  const [isSelectOpen, setIsSelectOpen] = React__namespace.useState(false);
  const shouldDisplayLanguageSelect = editorIsFocused && imageIsSelected || isSelectOpen;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(CodeBlock, { ...props.attributes, children: /* @__PURE__ */ jsxRuntime.jsx("code", { children: props.children }) }),
    shouldDisplayLanguageSelect && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Box,
      {
        position: "absolute",
        background: "neutral0",
        borderColor: "neutral150",
        borderStyle: "solid",
        borderWidth: "0.5px",
        shadow: "tableShadow",
        top: "100%",
        marginTop: 1,
        right: 0,
        padding: 1,
        hasRadius: true,
        children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.SingleSelect,
          {
            onChange: (open) => {
              slate.Transforms.setNodes(
                editor,
                { language: open.toString() },
                { match: (node) => !slate.Editor.isEditor(node) && node.type === "code" }
              );
            },
            value: props.element.type === "code" && props.element.language || "plaintext",
            onOpenChange: (open) => {
              setIsSelectOpen(open);
              if (!open) {
                slateReact.ReactEditor.focus(editor);
              }
            },
            onCloseAutoFocus: (e) => e.preventDefault(),
            "aria-label": formatMessage({
              id: "components.Blocks.blocks.code.languageLabel",
              defaultMessage: "Select a language"
            }),
            children: codeLanguages.map(({ value, label }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value, children: label }, value))
          }
        )
      }
    )
  ] });
};
const codeBlocks = {
  code: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(CodeEditor, { ...props }),
    icon: Icons.CodeBlock,
    label: {
      id: "components.Blocks.blocks.code",
      defaultMessage: "Code block"
    },
    matchNode: (node) => node.type === "code",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "code", language: "plaintext" });
    },
    handleEnterKey(editor) {
      pressEnterTwiceToExit(editor);
    },
    snippets: ["```"]
  }
};
const H1 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h1" })`
  font-size: 4.2rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H2 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h2" })`
  font-size: 3.5rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H3 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h3" })`
  font-size: 2.9rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H4 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h4" })`
  font-size: 2.4rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H5 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h5" })`
  font-size: 2rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const H6 = styledComponents.styled(designSystem.Typography).attrs({ tag: "h6" })`
  font-size: 1.6rem;
  line-height: ${({ theme }) => theme.lineHeights[1]};
`;
const handleConvertToHeading = (editor, level) => {
  baseHandleConvert(editor, { type: "heading", level });
};
const headingBlocks = {
  "heading-one": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H1, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingOne,
    label: {
      id: "components.Blocks.blocks.heading1",
      defaultMessage: "Heading 1"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 1),
    matchNode: (node) => node.type === "heading" && node.level === 1,
    isInBlocksSelector: true,
    snippets: ["#"],
    dragHandleTopMargin: "14px"
  },
  "heading-two": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H2, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingTwo,
    label: {
      id: "components.Blocks.blocks.heading2",
      defaultMessage: "Heading 2"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 2),
    matchNode: (node) => node.type === "heading" && node.level === 2,
    isInBlocksSelector: true,
    snippets: ["##"],
    dragHandleTopMargin: "10px"
  },
  "heading-three": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H3, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingThree,
    label: {
      id: "components.Blocks.blocks.heading3",
      defaultMessage: "Heading 3"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 3),
    matchNode: (node) => node.type === "heading" && node.level === 3,
    isInBlocksSelector: true,
    snippets: ["###"],
    dragHandleTopMargin: "7px"
  },
  "heading-four": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H4, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingFour,
    label: {
      id: "components.Blocks.blocks.heading4",
      defaultMessage: "Heading 4"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 4),
    matchNode: (node) => node.type === "heading" && node.level === 4,
    isInBlocksSelector: true,
    snippets: ["####"],
    dragHandleTopMargin: "4px"
  },
  "heading-five": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H5, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingFive,
    label: {
      id: "components.Blocks.blocks.heading5",
      defaultMessage: "Heading 5"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 5),
    matchNode: (node) => node.type === "heading" && node.level === 5,
    isInBlocksSelector: true,
    snippets: ["#####"]
  },
  "heading-six": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(H6, { ...props.attributes, children: props.children }),
    icon: Icons.HeadingSix,
    label: {
      id: "components.Blocks.blocks.heading6",
      defaultMessage: "Heading 6"
    },
    handleConvert: (editor) => handleConvertToHeading(editor, 6),
    matchNode: (node) => node.type === "heading" && node.level === 6,
    isInBlocksSelector: true,
    snippets: ["######"],
    dragHandleTopMargin: "-2px"
  }
};
const prefixFileUrlWithBackendUrl = (fileURL) => {
  return !!fileURL && fileURL.startsWith("/") ? `${window.strapi.backendURL}${fileURL}` : fileURL;
};
const ImageWrapper = styledComponents.styled(designSystem.Flex)`
  transition-property: box-shadow;
  transition-duration: 0.2s;
  ${(props) => props.$isFocused && styledComponents.css`
      box-shadow: ${props.theme.colors.primary600} 0px 0px 0px 3px;
    `}

  & > img {
    height: auto;
    // The max-height is decided with the design team, the 56px is the height of the toolbar
    max-height: calc(512px - 56px);
    max-width: 100%;
    object-fit: contain;
  }
`;
const IMAGE_SCHEMA_FIELDS = [
  "name",
  "alternativeText",
  "url",
  "caption",
  "width",
  "height",
  "formats",
  "hash",
  "ext",
  "mime",
  "size",
  "previewUrl",
  "provider",
  "provider_metadata",
  "createdAt",
  "updatedAt"
];
const pick = (object, keys) => {
  const entries = keys.map((key) => [key, object[key]]);
  return Object.fromEntries(entries);
};
const isImage = (element) => {
  return element.type === "image";
};
const Image = ({ attributes, children, element }) => {
  const editorIsFocused = slateReact.useFocused();
  const imageIsSelected = slateReact.useSelected();
  if (!isImage(element)) {
    return null;
  }
  const { url, alternativeText, width, height } = element.image;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { ...attributes, children: [
    children,
    /* @__PURE__ */ jsxRuntime.jsx(
      ImageWrapper,
      {
        background: "neutral100",
        contentEditable: false,
        justifyContent: "center",
        $isFocused: editorIsFocused && imageIsSelected,
        hasRadius: true,
        children: /* @__PURE__ */ jsxRuntime.jsx("img", { src: url, alt: alternativeText, width, height })
      }
    )
  ] });
};
const ImageDialog = () => {
  const [isOpen, setIsOpen] = React__namespace.useState(true);
  const { editor } = useBlocksEditorContext("ImageDialog");
  const components = admin.useStrapiApp("ImageDialog", (state) => state.components);
  if (!components || !isOpen) return null;
  const MediaLibraryDialog = components["media-library"];
  const insertImages = (images) => {
    slate.Transforms.unwrapNodes(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
      split: true
    });
    const nodeEntryBeingReplaced = slate.Editor.above(editor, {
      match(node) {
        if (slate.Editor.isEditor(node)) return false;
        const isInlineNode = ["text", "link"].includes(node.type);
        return !isInlineNode;
      }
    });
    if (!nodeEntryBeingReplaced) return;
    const [, pathToInsert] = nodeEntryBeingReplaced;
    slate.Transforms.removeNodes(editor);
    const nodesToInsert = images.map((image) => {
      const imageNode = {
        type: "image",
        image,
        children: [{ type: "text", text: "" }]
      };
      return imageNode;
    });
    slate.Transforms.insertNodes(editor, nodesToInsert, { at: pathToInsert });
    slate.Transforms.select(editor, pathToInsert);
  };
  const handleSelectAssets = (images) => {
    const formattedImages = images.map((image) => {
      const expectedImage = pick(image, IMAGE_SCHEMA_FIELDS);
      const nodeImage = {
        ...expectedImage,
        alternativeText: expectedImage.alternativeText || expectedImage.name,
        url: prefixFileUrlWithBackendUrl(image.url)
      };
      return nodeImage;
    });
    insertImages(formattedImages);
    setIsOpen(false);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    MediaLibraryDialog,
    {
      allowedTypes: ["images"],
      onClose: () => setIsOpen(false),
      onSelectAssets: handleSelectAssets
    }
  );
};
const imageBlocks = {
  image: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(Image, { ...props }),
    icon: Icons.Image,
    label: {
      id: "components.Blocks.blocks.image",
      defaultMessage: "Image"
    },
    matchNode: (node) => node.type === "image",
    isInBlocksSelector: true,
    handleBackspaceKey(editor) {
      if (editor.children.length === 1) {
        slate.Transforms.setNodes(editor, {
          type: "paragraph",
          // @ts-expect-error we're only setting image as null so that Slate deletes it
          image: null,
          children: [{ type: "text", text: "" }]
        });
      } else {
        slate.Transforms.removeNodes(editor);
      }
    },
    handleEnterKey(editor) {
      slate.Transforms.insertNodes(editor, {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      });
    },
    handleConvert: () => {
      return () => /* @__PURE__ */ jsxRuntime.jsx(ImageDialog, {});
    },
    snippets: ["!["]
  }
};
const removeLink = (editor) => {
  slate.Transforms.unwrapNodes(editor, {
    match: (node) => !slate.Editor.isEditor(node) && slate.Element.isElement(node) && node.type === "link"
  });
};
const insertLink = (editor, { url }) => {
  if (editor.selection) {
    const linkNodes = Array.from(
      slate.Editor.nodes(editor, {
        at: editor.selection,
        match: (node) => !slate.Editor.isEditor(node) && node.type === "link"
      })
    );
    linkNodes.forEach(([, path]) => {
      slate.Transforms.unwrapNodes(editor, { at: path });
    });
    if (slate.Range.isCollapsed(editor.selection)) {
      const link = {
        type: "link",
        url: url ?? "",
        children: [{ type: "text", text: url }],
        rel: "",
        target: ""
      };
      slate.Transforms.insertNodes(editor, link);
    } else {
      slate.Transforms.wrapNodes(editor, { type: "link", url: url ?? "" }, {
        split: true
      });
    }
  }
};
const editLink = (editor, link) => {
  const { url, text, rel, target } = link;
  if (!editor.selection) {
    return;
  }
  const linkEntry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "link"
  });
  if (linkEntry) {
    const [, linkPath] = linkEntry;
    slate.Transforms.setNodes(editor, { url, rel, target }, { at: linkPath });
    if (text !== "" && text !== slate.Editor.string(editor, linkPath)) {
      const linkNodeChildrens = Array.from(slate.Node.children(editor, linkPath, { reverse: true }));
      linkNodeChildrens.forEach(([, childPath]) => {
        slate.Transforms.removeNodes(editor, { at: childPath });
      });
      slate.Transforms.insertNodes(editor, [{ type: "text", text }], { at: linkPath.concat(0) });
    }
  }
};
const getEntries = (object) => Object.entries(object);
const getKeys = (object) => Object.keys(object);
const isLinkNode = (element) => {
  return element.type === "link";
};
const isListNode$1 = (element) => {
  return element.type === "list";
};
const StyledLink = styledComponents.styled(designSystem.Box)`
  text-decoration: none;
`;
const RemoveButton = styledComponents.styled(designSystem.Button)`
  visibility: ${(props) => props.$visible ? "visible" : "hidden"};
`;
const LinkContent = React__namespace.forwardRef(
  ({ link, children, attributes }, forwardedRef) => {
    const { formatMessage } = reactIntl.useIntl();
    const { editor } = useBlocksEditorContext("Link");
    const path = slateReact.ReactEditor.findPath(editor, link);
    const [popoverOpen, setPopoverOpen] = React__namespace.useState(
      editor.lastInsertedLinkPath ? slate.Path.equals(path, editor.lastInsertedLinkPath) : false
    );
    const elementText = link.children.map((child) => child.text).join("");
    const [linkText, setLinkText] = React__namespace.useState(elementText);
    const [linkUrl, setLinkUrl] = React__namespace.useState(link.url);
    const [linkRel, setLinRel] = React__namespace.useState(link.rel);
    const [linkTarget, setLinkTarget] = React__namespace.useState(link.target);
    const linkInputRef = React__namespace.useRef(null);
    const isLastInsertedLink = editor.lastInsertedLinkPath ? !slate.Path.equals(path, editor.lastInsertedLinkPath) : true;
    const [isSaveDisabled, setIsSaveDisabled] = React__namespace.useState(false);
    const onLinkChange = (e) => {
      setIsSaveDisabled(false);
      setLinkUrl(e.target.value);
      try {
        new URL(
          e.target.value?.startsWith("/") ? `https://strapi.io${e.target.value}` : e.target.value
        );
      } catch (error) {
        setIsSaveDisabled(true);
      }
    };
    const onLinkRelChange = (e) => {
      setIsSaveDisabled(false);
      setLinRel(e.target.value);
    };
    const onLinkTargetChange = (e) => {
      setIsSaveDisabled(false);
      setLinkTarget(e.target.value);
    };
    const handleSave = (e) => {
      e.stopPropagation();
      if (editor.selection && slate.Range.isCollapsed(editor.selection)) {
        const [, parentPath] = slate.Editor.parent(editor, editor.selection.focus?.path);
        slate.Transforms.select(editor, parentPath);
      }
      editLink(editor, { url: linkUrl, text: linkText, rel: linkRel, target: linkTarget });
      setPopoverOpen(false);
      editor.lastInsertedLinkPath = null;
      slateReact.ReactEditor.focus(editor);
    };
    const handleClose = () => {
      if (link.url === "") {
        removeLink(editor);
      }
      setPopoverOpen(false);
      slateReact.ReactEditor.focus(editor);
    };
    React__namespace.useEffect(() => {
      if (popoverOpen) linkInputRef.current?.focus();
    }, [popoverOpen]);
    const inputNotDirty = !linkText || !linkUrl || link.url && link.url === linkUrl && elementText && elementText === linkText && link.rel === linkRel && link.target === linkTarget;
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Root, { open: popoverOpen, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
        StyledLink,
        {
          ...attributes,
          ref: forwardedRef,
          tag: "a",
          href: link.url,
          rel: link.rel,
          target: link.target,
          onClick: () => setPopoverOpen(true),
          color: "primary600",
          children
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Content, { onPointerDownOutside: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { padding: 4, direction: "column", gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { width: "368px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "components.Blocks.popover.text",
            defaultMessage: "Text"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Field.Input,
            {
              name: "text",
              placeholder: formatMessage({
                id: "components.Blocks.popover.text.placeholder",
                defaultMessage: "Enter link text"
              }),
              value: linkText,
              onChange: (e) => {
                setLinkText(e.target.value);
              }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { width: "368px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "components.Blocks.popover.link",
            defaultMessage: "Link"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Field.Input,
            {
              ref: linkInputRef,
              name: "url",
              placeholder: formatMessage({
                id: "components.Blocks.popover.link.placeholder",
                defaultMessage: "Paste link"
              }),
              value: linkUrl,
              onChange: onLinkChange
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { width: "368px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "components.Blocks.popover.link.rel",
            defaultMessage: "Rel (optional)"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Field.Input,
            {
              name: "rel",
              placeholder: formatMessage({
                id: "components.Blocks.popover.link.rel.placeholder",
                defaultMessage: "noopener, nofollow, noreferrer"
              }),
              value: linkRel,
              onChange: onLinkRelChange
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { width: "368px", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "stretch", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
            id: "components.Blocks.popover.link.target",
            defaultMessage: "Target (optional)"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Field.Input,
            {
              name: "target",
              placeholder: formatMessage({
                id: "components.Blocks.popover.link.target.placeholder",
                defaultMessage: "_blank, _self, _parent, _top"
              }),
              value: linkTarget,
              onChange: onLinkTargetChange
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", width: "100%", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            RemoveButton,
            {
              variant: "danger-light",
              onClick: () => removeLink(editor),
              $visible: isLastInsertedLink,
              children: formatMessage({
                id: "components.Blocks.popover.remove",
                defaultMessage: "Remove"
              })
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: handleClose, children: formatMessage({
              id: "global.cancel",
              defaultMessage: "Cancel"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: Boolean(inputNotDirty) || isSaveDisabled, onClick: handleSave, children: formatMessage({
              id: "global.save",
              defaultMessage: "Save"
            }) })
          ] })
        ] })
      ] }) })
    ] });
  }
);
const Link = React__namespace.forwardRef((props, forwardedRef) => {
  if (!isLinkNode(props.element)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(LinkContent, { ...props, link: props.element, ref: forwardedRef });
});
const linkBlocks = {
  link: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(Link, { element: props.element, attributes: props.attributes, children: props.children }),
    // No handleConvert here, links are created via the link button in the toolbar
    matchNode: (node) => node.type === "link",
    isInBlocksSelector: false
  }
};
const listStyle = styledComponents.css`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces[2]};
  margin-inline-start: ${({ theme }) => theme.spaces[0]};
  margin-inline-end: ${({ theme }) => theme.spaces[0]};
  padding-inline-start: ${({ theme }) => theme.spaces[2]};

  ol,
  ul {
    margin-block-start: ${({ theme }) => theme.spaces[0]};
    margin-block-end: ${({ theme }) => theme.spaces[0]};
  }

  li {
    margin-inline-start: ${({ theme }) => theme.spaces[3]};
  }
`;
const Orderedlist = styledComponents.styled.ol`
  list-style-type: ${(props) => props.$listStyleType};
  ${listStyle}
`;
const Unorderedlist = styledComponents.styled.ul`
  list-style-type: ${(props) => props.$listStyleType};
  ${listStyle}
`;
const orderedStyles = ["decimal", "lower-alpha", "upper-roman"];
const unorderedStyles = ["disc", "circle", "square"];
const List = ({ attributes, children, element }) => {
  if (!isListNode$1(element)) {
    return null;
  }
  const listStyles = element.format === "ordered" ? orderedStyles : unorderedStyles;
  const nextIndex = (element.indentLevel || 0) % listStyles.length;
  const listStyleType = listStyles[nextIndex];
  if (element.format === "ordered") {
    return /* @__PURE__ */ jsxRuntime.jsx(Orderedlist, { $listStyleType: listStyleType, ...attributes, children });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Unorderedlist, { $listStyleType: listStyleType, ...attributes, children });
};
const replaceListWithEmptyBlock = (editor, currentListPath) => {
  slate.Transforms.removeNodes(editor, { at: currentListPath });
  if (currentListPath[0] === 0) {
    slate.Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      },
      { at: currentListPath }
    );
    slate.Transforms.select(editor, currentListPath);
  }
};
const isText$1 = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "text";
};
const handleBackspaceKeyOnList = (editor, event) => {
  if (!editor.selection) return;
  const [currentListItem, currentListItemPath] = slate.Editor.parent(editor, editor.selection.anchor);
  const [currentList, currentListPath] = slate.Editor.parent(editor, currentListItemPath);
  const isListEmpty = currentList.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isListItemEmpty = currentListItem.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isFocusAtTheBeginningOfAChild = editor.selection.focus.offset === 0 && editor.selection.focus.path.at(-2) === 0;
  if (isListEmpty) {
    const parentListEntry = slate.Editor.above(editor, {
      at: currentListPath,
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list"
    });
    if (!parentListEntry) {
      event.preventDefault();
      replaceListWithEmptyBlock(editor, currentListPath);
    }
  } else if (isFocusAtTheBeginningOfAChild) {
    slate.Transforms.liftNodes(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list-item"
    });
    slate.Transforms.setNodes(editor, { type: "paragraph" });
  } else if (isListItemEmpty) {
    const previousEntry = slate.Editor.previous(editor, {
      at: currentListItemPath
    });
    const nextEntry = slate.Editor.next(editor, {
      at: currentListItemPath
    });
    if (previousEntry && nextEntry) {
      event.preventDefault();
      slate.Transforms.removeNodes(editor, {
        at: currentListItemPath
      });
      const [previousList] = previousEntry;
      const [nextList] = nextEntry;
      if (!slate.Editor.isEditor(previousList) && !isText$1(previousList) && isListNode$1(previousList) && !slate.Editor.isEditor(nextList) && !isText$1(nextList) && isListNode$1(nextList)) {
        if (previousList.type === "list" && nextList.type === "list" && previousList.format === nextList.format && previousList.indentLevel === nextList.indentLevel) {
          slate.Transforms.mergeNodes(editor, {
            at: currentListItemPath
          });
        }
      }
    }
  }
};
const handleEnterKeyOnList = (editor) => {
  const currentListItemEntry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "list-item"
  });
  if (!currentListItemEntry || !editor.selection) {
    return;
  }
  const [currentListItem, currentListItemPath] = currentListItemEntry;
  const [currentList, currentListPath] = slate.Editor.parent(editor, currentListItemPath);
  const isListEmpty = currentList.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isListItemEmpty = currentListItem.children.length === 1 && isText$1(currentListItem.children[0]) && currentListItem.children[0].text === "";
  const isFocusAtTheBeginningOfAChild = editor.selection.focus.offset === 0 && editor.selection.focus.path.at(-1) === 0;
  if (isListEmpty) {
    replaceListWithEmptyBlock(editor, currentListPath);
  } else if (isFocusAtTheBeginningOfAChild && !isListItemEmpty) {
    const currentNode = slate.Editor.above(editor, { at: editor.selection.anchor });
    slate.Transforms.insertNodes(editor, { type: "list-item", children: [{ type: "text", text: "" }] });
    if (currentNode) {
      const path = currentNode[1];
      const updatedPath = [...path.slice(0, -1), path[path.length - 1] + 1];
      slate.Transforms.select(editor, {
        anchor: { path: updatedPath.concat(0), offset: 0 },
        focus: { path: updatedPath.concat(0), offset: 0 }
      });
    }
  } else if (isListItemEmpty) {
    if (!slate.Editor.isEditor(currentList) && isListNode$1(currentList) && currentList?.indentLevel && currentList.indentLevel > 0) {
      const previousIndentLevel = currentList.indentLevel - 1;
      const parentListNodeEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list" && (node.indentLevel || 0) === previousIndentLevel
      });
      if (parentListNodeEntry) {
        const modifiedPath = currentListItemPath.slice(0, -1);
        if (modifiedPath.length > 0) {
          modifiedPath[modifiedPath.length - 1] += 1;
        }
        slate.Transforms.moveNodes(editor, {
          at: currentListItemPath,
          to: modifiedPath
        });
        return;
      }
    }
    slate.Transforms.removeNodes(editor, { at: currentListItemPath });
    const createdParagraphPath = slate.Path.next(currentListPath);
    slate.Transforms.insertNodes(
      editor,
      {
        type: "paragraph",
        children: [{ type: "text", text: "" }]
      },
      { at: createdParagraphPath }
    );
    slate.Transforms.select(editor, createdParagraphPath);
  } else {
    const isNodeEnd = slate.Editor.isEnd(editor, editor.selection.anchor, currentListItemPath);
    if (isNodeEnd) {
      slate.Transforms.insertNodes(editor, { type: "list-item", children: [{ type: "text", text: "" }] });
    } else {
      slate.Transforms.splitNodes(editor);
    }
  }
};
const handleConvertToList = (editor, format) => {
  const convertedPath = baseHandleConvert(editor, { type: "list-item" });
  if (!convertedPath) return;
  slate.Transforms.wrapNodes(editor, { type: "list", format, children: [] }, { at: convertedPath });
};
const handleTabOnList = (editor) => {
  const currentListItemEntry = slate.Editor.above(editor, {
    match: (node) => !slate.Editor.isEditor(node) && node.type === "list-item"
  });
  if (!currentListItemEntry || !editor.selection) {
    return;
  }
  const [currentListItem, currentListItemPath] = currentListItemEntry;
  const [currentList] = slate.Editor.parent(editor, currentListItemPath);
  if (currentListItem === currentList.children[0]) return;
  const currentListItemIndex = currentList.children.findIndex((item) => item === currentListItem);
  const previousNode = currentList.children[currentListItemIndex - 1];
  if (previousNode.type === "list") {
    const nodePath = slateReact.ReactEditor.findPath(editor, previousNode);
    const insertAtPath = previousNode.children.length;
    slate.Transforms.moveNodes(editor, {
      at: currentListItemPath,
      to: nodePath.concat(insertAtPath)
    });
    return;
  }
  if (!slate.Editor.isEditor(currentList) && isListNode$1(currentList)) {
    slate.Transforms.wrapNodes(editor, {
      type: "list",
      format: currentList.format,
      indentLevel: (currentList.indentLevel || 0) + 1,
      children: []
    });
  }
};
const listBlocks = {
  "list-ordered": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(List, { ...props }),
    label: {
      id: "components.Blocks.blocks.orderedList",
      defaultMessage: "Numbered list"
    },
    icon: Icons.NumberList,
    matchNode: (node) => node.type === "list" && node.format === "ordered",
    isInBlocksSelector: true,
    handleConvert: (editor) => handleConvertToList(editor, "ordered"),
    handleEnterKey: handleEnterKeyOnList,
    handleBackspaceKey: handleBackspaceKeyOnList,
    handleTab: handleTabOnList,
    snippets: ["1."]
  },
  "list-unordered": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(List, { ...props }),
    label: {
      id: "components.Blocks.blocks.unorderedList",
      defaultMessage: "Bulleted list"
    },
    icon: Icons.BulletList,
    matchNode: (node) => node.type === "list" && node.format === "unordered",
    isInBlocksSelector: true,
    handleConvert: (editor) => handleConvertToList(editor, "unordered"),
    handleEnterKey: handleEnterKeyOnList,
    handleBackspaceKey: handleBackspaceKeyOnList,
    handleTab: handleTabOnList,
    snippets: ["-", "*", "+"]
  },
  "list-item": {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "li", ...props.attributes, children: props.children }),
    // No handleConvert, list items are created when converting to the parent list
    matchNode: (node) => node.type === "list-item",
    isInBlocksSelector: false,
    dragHandleTopMargin: "-2px"
  }
};
const paragraphBlocks = {
  paragraph: {
    renderElement: (props) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "p", variant: "omega", ...props.attributes, children: props.children }),
    icon: Icons.Paragraph,
    label: {
      id: "components.Blocks.blocks.text",
      defaultMessage: "Text"
    },
    matchNode: (node) => node.type === "paragraph",
    isInBlocksSelector: true,
    dragHandleTopMargin: "-2px",
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "paragraph" });
    },
    handleEnterKey(editor) {
      if (!editor.selection) {
        return;
      }
      const anchorPathInitialPosition = editor.selection.anchor.path;
      slate.Transforms.splitNodes(editor, {
        // Makes sure we always create a new node,
        // even if there's nothing to the right of the cursor in the node.
        always: true
      });
      const parentBlockEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
      });
      if (!parentBlockEntry) {
        return;
      }
      const [, parentBlockPath] = parentBlockEntry;
      const isNodeEnd = slate.Editor.isEnd(editor, editor.selection.anchor, parentBlockPath);
      const [fragmentedNode] = slate.Editor.parent(editor, editor.selection.anchor.path);
      slate.Transforms.removeNodes(editor);
      const hasNextNode = editor.children.length - anchorPathInitialPosition[0] > 1;
      slate.Transforms.insertNodes(
        editor,
        {
          type: "paragraph",
          // Don't carry over the modifiers from the previous node if there was no text after the cursor
          children: isNodeEnd ? [{ type: "text", text: "" }] : fragmentedNode.children
        },
        {
          at: hasNextNode ? [anchorPathInitialPosition[0] + 1] : [editor.children.length]
        }
      );
      slate.Transforms.select(editor, editor.start([anchorPathInitialPosition[0] + 1]));
    }
  }
};
const Blockquote = styledComponents.styled.blockquote.attrs({ role: "blockquote" })`
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  border-left: ${({ theme }) => `${theme.spaces[1]} solid ${theme.colors.neutral200}`};
  padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[4]};
  color: ${({ theme }) => theme.colors.neutral600};
`;
const quoteBlocks = {
  quote: {
    renderElement: (props) => (
      // The div is needed to make sure the padding bottom from BlocksContent is applied properly
      // when the quote is the last block in the editor
      /* @__PURE__ */ jsxRuntime.jsx("div", { children: /* @__PURE__ */ jsxRuntime.jsx(Blockquote, { ...props.attributes, children: props.children }) })
    ),
    icon: Icons.Quotes,
    label: {
      id: "components.Blocks.blocks.quote",
      defaultMessage: "Quote"
    },
    matchNode: (node) => node.type === "quote",
    isInBlocksSelector: true,
    handleConvert(editor) {
      baseHandleConvert(editor, { type: "quote" });
    },
    handleEnterKey(editor) {
      pressEnterTwiceToExit(editor);
    },
    snippets: [">"]
  }
};
const ItemTypes = {
  COMPONENT: "component",
  DYNAMIC_ZONE: "dynamicZone",
  RELATION: "relation",
  BLOCKS: "blocks"
};
const useKeyboardDragAndDrop = (active, index2, { onCancel, onDropItem, onGrabItem, onMoveItem }) => {
  const [isSelected, setIsSelected] = React__namespace.useState(false);
  const handleMove = (movement) => {
    if (!isSelected) {
      return;
    }
    if (typeof index2 === "number" && onMoveItem) {
      if (movement === "UP") {
        onMoveItem(index2 - 1, index2);
      } else if (movement === "DOWN") {
        onMoveItem(index2 + 1, index2);
      }
    }
  };
  const handleDragClick = () => {
    if (isSelected) {
      if (onDropItem) {
        onDropItem(index2);
      }
      setIsSelected(false);
    } else {
      if (onGrabItem) {
        onGrabItem(index2);
      }
      setIsSelected(true);
    }
  };
  const handleCancel = () => {
    if (isSelected) {
      setIsSelected(false);
      if (onCancel) {
        onCancel(index2);
      }
    }
  };
  const handleKeyDown = (e) => {
    if (!active) {
      return;
    }
    if (e.key === "Tab" && !isSelected) {
      return;
    }
    e.preventDefault();
    switch (e.key) {
      case " ":
      case "Enter":
        handleDragClick();
        break;
      case "Escape":
        handleCancel();
        break;
      case "ArrowDown":
      case "ArrowRight":
        handleMove("DOWN");
        break;
      case "ArrowUp":
      case "ArrowLeft":
        handleMove("UP");
        break;
    }
  };
  return handleKeyDown;
};
const DIRECTIONS = {
  UPWARD: "upward",
  DOWNWARD: "downward"
};
const DROP_SENSITIVITY = {
  REGULAR: "regular"
};
const useDragAndDrop = (active, {
  type = "STRAPI_DND",
  index: index2,
  item,
  onStart,
  onEnd,
  onGrabItem,
  onDropItem,
  onCancel,
  onMoveItem,
  dropSensitivity = DROP_SENSITIVITY.REGULAR
}) => {
  const objectRef = React__namespace.useRef(null);
  const [{ handlerId, isOver }, dropRef] = reactDnd.useDrop({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isOver: monitor.isOver({ shallow: true })
      };
    },
    drop(item2) {
      const draggedIndex = item2.index;
      const newIndex = index2;
      if (isOver && onDropItem) {
        onDropItem(draggedIndex, newIndex);
      }
    },
    hover(item2, monitor) {
      if (!objectRef.current || !onMoveItem) {
        return;
      }
      const dragIndex = item2.index;
      const newIndex = index2;
      const hoverBoundingRect = objectRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) return;
      const hoverClientY = clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (typeof dragIndex === "number" && typeof newIndex === "number") {
        if (dragIndex === newIndex) {
          return;
        }
        if (dropSensitivity === DROP_SENSITIVITY.REGULAR) {
          if (dragIndex < newIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragIndex > newIndex && hoverClientY > hoverMiddleY) {
            return;
          }
        }
        onMoveItem(newIndex, dragIndex);
        item2.index = newIndex;
      } else {
        if (Array.isArray(dragIndex) && Array.isArray(newIndex)) {
          const minLength = Math.min(dragIndex.length, newIndex.length);
          let areEqual = true;
          let isLessThan = false;
          let isGreaterThan = false;
          for (let i = 0; i < minLength; i++) {
            if (dragIndex[i] < newIndex[i]) {
              isLessThan = true;
              areEqual = false;
              break;
            } else if (dragIndex[i] > newIndex[i]) {
              isGreaterThan = true;
              areEqual = false;
              break;
            }
          }
          if (areEqual && dragIndex.length === newIndex.length) {
            return;
          }
          if (dropSensitivity === DROP_SENSITIVITY.REGULAR) {
            if (isLessThan && !isGreaterThan && hoverClientY < hoverMiddleY) {
              return;
            }
            if (isGreaterThan && !isLessThan && hoverClientY > hoverMiddleY) {
              return;
            }
          }
        }
        onMoveItem(newIndex, dragIndex);
        item2.index = newIndex;
      }
    }
  });
  const getDragDirection = (monitor) => {
    if (monitor && monitor.isDragging() && !monitor.didDrop() && monitor.getInitialClientOffset() && monitor.getClientOffset()) {
      const deltaY = monitor.getInitialClientOffset().y - monitor.getClientOffset().y;
      if (deltaY > 0) return DIRECTIONS.UPWARD;
      if (deltaY < 0) return DIRECTIONS.DOWNWARD;
      return null;
    }
    return null;
  };
  const [{ isDragging, direction }, dragRef, dragPreviewRef] = reactDnd.useDrag({
    type,
    item() {
      if (onStart) {
        onStart();
      }
      const { width } = objectRef.current?.getBoundingClientRect() ?? {};
      return { index: index2, width, ...item };
    },
    end() {
      if (onEnd) {
        onEnd();
      }
    },
    canDrag: active,
    /**
     * This is useful when the item is in a virtualized list.
     * However, if we don't have an ID then we want the libraries
     * defaults to take care of this.
     */
    isDragging: item?.id ? (monitor) => {
      return item.id === monitor.getItem().id;
    } : void 0,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      initialOffset: monitor.getInitialClientOffset(),
      currentOffset: monitor.getClientOffset(),
      direction: getDragDirection(monitor)
    })
  });
  const handleKeyDown = useKeyboardDragAndDrop(active, index2, {
    onGrabItem,
    onDropItem,
    onCancel,
    onMoveItem
  });
  return [
    { handlerId, isDragging, handleKeyDown, isOverDropTarget: isOver, direction },
    objectRef,
    dropRef,
    dragRef,
    dragPreviewRef
  ];
};
const ObservedToolbarComponent = ({
  index: index2,
  lastVisibleIndex,
  setLastVisibleIndex,
  rootRef,
  children
}) => {
  const isVisible = index2 <= lastVisibleIndex;
  const containerRef = admin.useElementOnScreen(
    (isVisible2) => {
      if (isVisible2) {
        setLastVisibleIndex((prev) => Math.max(prev, index2));
      }
    },
    { threshold: 1, root: rootRef.current }
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      ref: containerRef,
      style: {
        /**
         * Use visibility so that the element occupies the space if requires even when there's not
         * enough room for it to be visible. The empty reserved space will be clipped by the
         * overflow:hidden rule on the parent, so it doesn't affect the UI.
         * This way we can keep observing its visiblity and react to browser resize events.
         */
        visibility: isVisible ? "visible" : "hidden"
      },
      children
    }
  );
};
const EditorToolbarObserver = ({
  observedComponents,
  menuTriggerVariant = "ghost"
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const toolbarRef = React__namespace.useRef(null);
  const [lastVisibleIndex, setLastVisibleIndex] = React__namespace.useState(
    observedComponents.length - 1
  );
  const hasHiddenItems = lastVisibleIndex < observedComponents.length - 1;
  const menuIndex = lastVisibleIndex + 1;
  const [open, setOpen] = React__namespace.useState(false);
  const isMenuOpenWithContent = open && hasHiddenItems;
  const menuTriggerRef = admin.useElementOnScreen(
    (isVisible) => {
      if (!isVisible) {
        setLastVisibleIndex((prev) => prev - 1);
        setOpen(isMenuOpenWithContent);
      }
    },
    { threshold: 1, root: toolbarRef.current }
  );
  return observedComponents.map((component, index2) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      ObservedToolbarComponent,
      {
        index: index2,
        lastVisibleIndex,
        setLastVisibleIndex,
        rootRef: toolbarRef,
        children: component.toolbar
      },
      component.key
    );
  }).toSpliced(
    menuIndex,
    0,
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Menu.Root,
      {
        defaultOpen: false,
        open: isMenuOpenWithContent,
        onOpenChange: setOpen,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Menu.Trigger,
            {
              paddingLeft: 0,
              paddingRight: 0,
              ref: menuTriggerRef,
              variant: menuTriggerVariant,
              style: { visibility: hasHiddenItems ? "visible" : "hidden" },
              label: formatMessage({ id: "global.more", defaultMessage: "More" }),
              tag: designSystem.IconButton,
              icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.More, {})
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Menu.Content,
            {
              onCloseAutoFocus: (e) => e.preventDefault(),
              maxHeight: "100%",
              minWidth: "256px",
              popoverPlacement: "bottom-end",
              zIndex: 2,
              children: observedComponents.slice(menuIndex).map((component) => /* @__PURE__ */ jsxRuntime.jsx(React__namespace.Fragment, { children: component.menu }, component.key))
            }
          )
        ]
      },
      "more-menu"
    )
  );
};
const ToolbarWrapper = styledComponents.styled(designSystem.Flex)`
  &[aria-disabled='true'] {
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.neutral150};
  }
`;
const ToolbarSeparator = styledComponents.styled(Toolbar__namespace.Separator)`
  background: ${({ theme }) => theme.colors.neutral150};
  width: 1px;
  height: 2.4rem;
  margin-left: 0.8rem;
  margin-right: 0.8rem;
`;
const FlexButton = styledComponents.styled(designSystem.Flex)`
  // Inherit the not-allowed cursor from ToolbarWrapper when disabled
  &[aria-disabled] {
    cursor: not-allowed;
  }

  &[aria-disabled='false'] {
    cursor: pointer;

    // Only apply hover styles if the button is enabled
    &:hover {
      background: ${({ theme }) => theme.colors.primary100};
    }
  }
`;
const SelectWrapper = styledComponents.styled(designSystem.Box)`
  // Styling changes to SingleSelect component don't work, so adding wrapper to target SingleSelect
  div[role='combobox'] {
    border: none;
    cursor: pointer;
    min-height: unset;
    padding-top: 6px;
    padding-bottom: 6px;

    &[aria-disabled='false']:hover {
      cursor: pointer;
      background: ${({ theme }) => theme.colors.primary100};
    }

    &[aria-disabled] {
      background: transparent;
      cursor: inherit;

      // Select text and icons should also have disabled color
      span {
        color: ${({ theme }) => theme.colors.neutral600};
      }
    }
  }
`;
function useConversionModal() {
  const [modalElement, setModalComponent] = React__namespace.useState(null);
  const handleConversionResult = (renderModal) => {
    if (renderModal) {
      setModalComponent(React__namespace.cloneElement(renderModal(), { key: Date.now() }));
    }
  };
  return { modalElement, handleConversionResult };
}
const ToolbarButton = ({
  icon: Icon,
  name: name2,
  label,
  isActive,
  disabled,
  handleClick
}) => {
  const { editor } = useBlocksEditorContext("ToolbarButton");
  const { formatMessage } = reactIntl.useIntl();
  const labelMessage = formatMessage(label);
  const enabledColor = isActive ? "primary600" : "neutral600";
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { label: labelMessage, children: /* @__PURE__ */ jsxRuntime.jsx(
    Toolbar__namespace.ToggleItem,
    {
      value: name2,
      "data-state": isActive ? "on" : "off",
      onMouseDown: (e) => {
        e.preventDefault();
        handleClick();
        slateReact.ReactEditor.focus(editor);
      },
      "aria-disabled": disabled,
      disabled,
      "aria-label": labelMessage,
      asChild: true,
      children: /* @__PURE__ */ jsxRuntime.jsx(
        FlexButton,
        {
          tag: "button",
          background: isActive ? "primary100" : "",
          alignItems: "center",
          justifyContent: "center",
          width: 7,
          height: 7,
          hasRadius: true,
          type: "button",
          children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { fill: disabled ? "neutral300" : enabledColor })
        }
      )
    }
  ) });
};
const BlocksDropdown = () => {
  const { editor, blocks, disabled } = useBlocksEditorContext("BlocksDropdown");
  const { formatMessage } = reactIntl.useIntl();
  const { modalElement, handleConversionResult } = useConversionModal();
  const blockKeysToInclude = getEntries(blocks).reduce((currentKeys, entry) => {
    const [key, block] = entry;
    return block.isInBlocksSelector ? [...currentKeys, key] : currentKeys;
  }, []);
  const [blockSelected, setBlockSelected] = React__namespace.useState("paragraph");
  const handleSelect = (optionKey) => {
    if (!isSelectorBlockKey(optionKey)) {
      return;
    }
    const editorIsEmpty = editor.children.length === 1 && slate.Editor.isEmpty(editor, editor.children[0]);
    if (!editor.selection && !editorIsEmpty) {
      slate.Transforms.insertNodes(
        editor,
        {
          type: "quote",
          children: [{ type: "text", text: "" }]
        },
        {
          select: true
          // Since there's no selection, Slate will automatically insert the node at the end
        }
      );
    } else if (!editor.selection && editorIsEmpty) {
      slate.Transforms.select(editor, slate.Editor.start(editor, [0, 0]));
    }
    const currentListEntry = slate.Editor.above(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list"
    });
    if (currentListEntry && ["list-ordered", "list-unordered"].includes(optionKey)) {
      const [currentList, currentListPath] = currentListEntry;
      const format = optionKey === "list-ordered" ? "ordered" : "unordered";
      if (!slate.Editor.isEditor(currentList) && isListNode(currentList)) {
        if (currentList.format !== format) {
          slate.Transforms.setNodes(editor, { format }, { at: currentListPath });
        }
      }
      return;
    }
    const maybeRenderModal = blocks[optionKey].handleConvert?.(editor);
    handleConversionResult(maybeRenderModal);
    setBlockSelected(optionKey);
    slateReact.ReactEditor.focus(editor);
  };
  const preventSelectFocus = (e) => e.preventDefault();
  React__namespace.useEffect(() => {
    if (editor.selection) {
      let selectedNode;
      const currentListEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
        at: editor.selection.anchor
      });
      if (currentListEntry) {
        const [currentList] = currentListEntry;
        selectedNode = currentList;
      } else {
        const [anchorNode] = slate.Editor.parent(editor, editor.selection.anchor, {
          edge: "start",
          depth: 2
        });
        if (anchorNode.type === "list-item") {
          slate.Transforms.setNodes(editor, { type: "paragraph" });
          selectedNode = { ...anchorNode, type: "paragraph" };
        } else {
          selectedNode = anchorNode;
        }
      }
      const anchorBlockKey = getKeys(blocks).find(
        (blockKey) => !slate.Editor.isEditor(selectedNode) && blocks[blockKey].matchNode(selectedNode)
      );
      if (anchorBlockKey && anchorBlockKey !== blockSelected) {
        setBlockSelected(anchorBlockKey);
      }
    }
  }, [editor.selection, editor, blocks, blockSelected]);
  const Icon = blocks[blockSelected].icon;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(SelectWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.SingleSelect,
      {
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icon, {}),
        onChange: handleSelect,
        placeholder: formatMessage(blocks[blockSelected].label),
        value: blockSelected,
        onCloseAutoFocus: preventSelectFocus,
        "aria-label": formatMessage({
          id: "components.Blocks.blocks.selectBlock",
          defaultMessage: "Select a block"
        }),
        disabled,
        children: blockKeysToInclude.map((key) => /* @__PURE__ */ jsxRuntime.jsx(
          BlockOption,
          {
            value: key,
            label: blocks[key].label,
            icon: blocks[key].icon,
            blockSelected
          },
          key
        ))
      }
    ) }),
    modalElement
  ] });
};
const BlockOption = ({ value, icon: Icon, label, blockSelected }) => {
  const { formatMessage } = reactIntl.useIntl();
  const isSelected = value === blockSelected;
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.SingleSelectOption,
    {
      startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icon, { fill: isSelected ? "primary600" : "neutral500" }),
      value,
      children: formatMessage(label)
    }
  );
};
const isListNode = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "list";
};
const ListButton = ({ block, format, location = "toolbar" }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { editor, disabled, blocks } = useBlocksEditorContext("ListButton");
  const isListActive = () => {
    if (!editor.selection) return false;
    const currentListEntry = slate.Editor.above(editor, {
      match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
      at: editor.selection.anchor
    });
    if (currentListEntry) {
      const [currentList] = currentListEntry;
      if (!slate.Editor.isEditor(currentList) && isListNode(currentList) && currentList.format === format)
        return true;
    }
    return false;
  };
  const isListDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const anchorNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.anchor,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    const focusNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.focus,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    if (!anchorNodeEntry || !focusNodeEntry) {
      return false;
    }
    return anchorNodeEntry[0] !== focusNodeEntry[0];
  };
  const toggleList = (format2) => {
    let currentListEntry;
    if (editor.selection) {
      currentListEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list"
      });
    } else {
      const [_, lastNodePath] = slate.Editor.last(editor, []);
      currentListEntry = slate.Editor.above(editor, {
        match: (node) => !slate.Editor.isEditor(node) && node.type === "list",
        at: lastNodePath
      });
    }
    if (!currentListEntry) {
      blocks[`list-${format2}`].handleConvert(editor);
      return;
    }
    const [currentList, currentListPath] = currentListEntry;
    if (!slate.Editor.isEditor(currentList) && isListNode(currentList)) {
      if (currentList.format !== format2) {
        slate.Transforms.setNodes(editor, { format: format2 }, { at: currentListPath });
      } else {
        blocks["paragraph"].handleConvert(editor);
      }
    }
  };
  if (location === "menu") {
    const Icon = block.icon;
    return /* @__PURE__ */ jsxRuntime.jsx(
      StyledMenuItem,
      {
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icon, {}),
        onSelect: () => toggleList(format),
        isActive: isListActive(),
        disabled: isListDisabled(),
        children: formatMessage(block.label)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToolbarButton,
    {
      icon: block.icon,
      name: format,
      label: block.label,
      isActive: isListActive(),
      disabled: isListDisabled(),
      handleClick: () => toggleList(format)
    }
  );
};
const LinkButton = ({
  disabled,
  location = "toolbar"
}) => {
  const { editor } = useBlocksEditorContext("LinkButton");
  const { formatMessage } = reactIntl.useIntl();
  const isLinkActive = () => {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Array.from(
      slate.Editor.nodes(editor, {
        at: slate.Editor.unhangRange(editor, selection),
        match: (node) => slate.Element.isElement(node) && node.type === "link"
      })
    );
    return Boolean(match);
  };
  const isLinkDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const anchorNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.anchor,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    const focusNodeEntry = slate.Editor.above(editor, {
      at: editor.selection.focus,
      match: (node) => !slate.Editor.isEditor(node) && node.type !== "text"
    });
    if (!anchorNodeEntry || !focusNodeEntry) {
      return false;
    }
    return anchorNodeEntry[0] !== focusNodeEntry[0];
  };
  const addLink = () => {
    editor.shouldSaveLinkPath = true;
    insertLink(editor, { url: "" });
  };
  const label = {
    id: "components.Blocks.link",
    defaultMessage: "Link"
  };
  if (location === "menu") {
    return /* @__PURE__ */ jsxRuntime.jsx(
      StyledMenuItem,
      {
        startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Link, {}),
        onSelect: addLink,
        isActive: isLinkActive(),
        disabled: isLinkDisabled(),
        children: formatMessage(label)
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    ToolbarButton,
    {
      icon: Icons.Link,
      name: "link",
      label,
      isActive: isLinkActive(),
      handleClick: addLink,
      disabled: isLinkDisabled()
    }
  );
};
const StyledMenuItem = styledComponents.styled(designSystem.Menu.Item)`
  ${(props) => props.isActive && styledComponents.css`
      color: ${({ theme }) => theme.colors.primary600};
      font-weight: 600;
    `}

  svg {
    fill: ${({ theme, isActive }) => isActive ? theme.colors.primary600 : theme.colors.neutral500};
  }
`;
const BlocksToolbar = () => {
  const { editor, blocks, modifiers: modifiers2, disabled } = useBlocksEditorContext("BlocksToolbar");
  const { formatMessage } = reactIntl.useIntl();
  const checkButtonDisabled = () => {
    if (disabled) {
      return true;
    }
    if (!editor.selection) {
      return false;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    if (!selectedNode) return true;
    if (["image", "code"].includes(selectedNode.type)) {
      return true;
    }
    return false;
  };
  const isButtonDisabled = checkButtonDisabled();
  const observedComponents = [
    ...Object.entries(modifiers2).map(([name2, modifier]) => {
      const Icon = modifier.icon;
      const isActive = modifier.checkIsActive(editor);
      const handleSelect = () => modifier.handleToggle(editor);
      return {
        toolbar: /* @__PURE__ */ jsxRuntime.jsx(
          ToolbarButton,
          {
            name: name2,
            icon: modifier.icon,
            label: modifier.label,
            isActive: modifier.checkIsActive(editor),
            handleClick: handleSelect,
            disabled: isButtonDisabled
          },
          name2
        ),
        menu: /* @__PURE__ */ jsxRuntime.jsx(StyledMenuItem, { startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icon, {}), onSelect: handleSelect, isActive, children: formatMessage(modifier.label) }),
        key: `modifier.${name2}`
      };
    }),
    {
      toolbar: /* @__PURE__ */ jsxRuntime.jsx(LinkButton, { disabled: isButtonDisabled, location: "toolbar" }),
      menu: /* @__PURE__ */ jsxRuntime.jsx(LinkButton, { disabled: isButtonDisabled, location: "menu" }),
      key: "block.link"
    },
    {
      // List buttons can only be rendered together when in the toolbar
      toolbar: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "row", children: [
        /* @__PURE__ */ jsxRuntime.jsx(ToolbarSeparator, { style: { marginLeft: "0.4rem" } }),
        /* @__PURE__ */ jsxRuntime.jsx(Toolbar__namespace.ToggleGroup, { type: "single", asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 1, children: [
          /* @__PURE__ */ jsxRuntime.jsx(ListButton, { block: blocks["list-unordered"], format: "unordered", location: "toolbar" }),
          /* @__PURE__ */ jsxRuntime.jsx(ListButton, { block: blocks["list-ordered"], format: "ordered", location: "toolbar" })
        ] }) })
      ] }),
      menu: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsx(ListButton, { block: blocks["list-unordered"], format: "unordered", location: "menu" }),
        /* @__PURE__ */ jsxRuntime.jsx(ListButton, { block: blocks["list-ordered"], format: "ordered", location: "menu" })
      ] }),
      key: "block.list"
    }
  ];
  return /* @__PURE__ */ jsxRuntime.jsx(Toolbar__namespace.Root, { "aria-disabled": disabled, asChild: true, children: /* @__PURE__ */ jsxRuntime.jsxs(ToolbarWrapper, { padding: 2, width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(BlocksDropdown, {}),
    /* @__PURE__ */ jsxRuntime.jsx(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Toolbar__namespace.ToggleGroup, { type: "multiple", asChild: true, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "row", gap: 1, grow: 1, overflow: "hidden", children: /* @__PURE__ */ jsxRuntime.jsx(EditorToolbarObserver, { observedComponents }) }) })
  ] }) });
};
const StyledEditable = styledComponents.styled(slateReact.Editable)`
  // The outline style is set on the wrapper with :focus-within
  outline: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces[3]};
  height: 100%;
  // For fullscreen align input in the center with fixed width
  width: ${(props) => props.$isExpandedMode ? "512px" : "100%"};
  margin: auto;

  > *:last-child {
    padding-bottom: ${({ theme }) => theme.spaces[3]};
  }
`;
const Wrapper$1 = styledComponents.styled(designSystem.Box)`
  position: ${({ $isOverDropTarget }) => $isOverDropTarget && "relative"};
`;
const DropPlaceholder = styledComponents.styled(designSystem.Box)`
  position: absolute;
  right: 0;

  // Show drop placeholder 8px above or below the drop target
  ${({ dragDirection, theme, placeholderMargin }) => styledComponents.css`
    top: ${dragDirection === DIRECTIONS.UPWARD && `-${theme.spaces[placeholderMargin]}`};
    bottom: ${dragDirection === DIRECTIONS.DOWNWARD && `-${theme.spaces[placeholderMargin]}`};
  `}
`;
const DragItem = styledComponents.styled(designSystem.Flex)`
  // Style each block rendered using renderElement()
  & > [data-slate-node='element'] {
    width: 100%;
    opacity: inherit;
  }

  // Set the visibility of drag button
  [role='button'] {
    visibility: ${(props) => props.$dragVisibility};
    opacity: inherit;
  }
  &[aria-disabled='true'] {
    user-drag: none;
  }
`;
const DragIconButton = styledComponents.styled(designSystem.IconButton)`
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding-left: ${({ theme }) => theme.spaces[0]};
  padding-right: ${({ theme }) => theme.spaces[0]};
  padding-top: ${({ theme }) => theme.spaces[1]};
  padding-bottom: ${({ theme }) => theme.spaces[1]};
  visibility: hidden;
  cursor: grab;
  opacity: inherit;
  margin-top: ${(props) => props.$dragHandleTopMargin ?? 0};

  &:hover {
    background: ${({ theme }) => theme.colors.neutral100};
  }
  &:active {
    cursor: grabbing;
    background: ${({ theme }) => theme.colors.neutral150};
  }
  &[aria-disabled='true'] {
    visibility: hidden;
  }
  svg {
    min-width: ${({ theme }) => theme.spaces[3]};

    path {
      fill: ${({ theme }) => theme.colors.neutral500};
    }
  }
`;
const DragAndDropElement = ({
  children,
  index: index$1,
  setDragDirection,
  dragDirection,
  dragHandleTopMargin
}) => {
  const { editor, disabled, name: name2, setLiveText } = useBlocksEditorContext("drag-and-drop");
  const { formatMessage } = reactIntl.useIntl();
  const [dragVisibility, setDragVisibility] = React__namespace.useState("hidden");
  const handleMoveBlock = React__namespace.useCallback(
    (newIndex, currentIndex) => {
      slate.Transforms.moveNodes(editor, {
        at: currentIndex,
        to: newIndex
      });
      const currentIndexPosition = [currentIndex[0] + 1, ...currentIndex.slice(1)];
      const newIndexPosition = [newIndex[0] + 1, ...newIndex.slice(1)];
      setLiveText(
        formatMessage(
          {
            id: index.getTranslation("components.Blocks.dnd.reorder"),
            defaultMessage: "{item}, moved. New position in the editor: {position}."
          },
          {
            item: `${name2}.${currentIndexPosition.join(",")}`,
            position: `${newIndexPosition.join(",")} of ${editor.children.length}`
          }
        )
      );
    },
    [editor, formatMessage, name2, setLiveText]
  );
  const [{ handlerId, isDragging, isOverDropTarget, direction }, blockRef, dropRef, dragRef] = useDragAndDrop(!disabled, {
    type: `${ItemTypes.BLOCKS}_${name2}`,
    index: index$1,
    item: {
      index: index$1,
      displayedValue: children
    },
    onDropItem(currentIndex, newIndex) {
      if (newIndex) handleMoveBlock(newIndex, currentIndex);
    }
  });
  const composedBoxRefs = designSystem.useComposedRefs(blockRef, dropRef);
  React__namespace.useEffect(() => {
    if (direction) {
      setDragDirection(direction);
    }
  }, [direction, setDragDirection]);
  React__namespace.useEffect(() => {
    setDragVisibility("hidden");
  }, [editor.selection]);
  return /* @__PURE__ */ jsxRuntime.jsxs(Wrapper$1, { ref: composedBoxRefs, $isOverDropTarget: isOverDropTarget, children: [
    isOverDropTarget && /* @__PURE__ */ jsxRuntime.jsx(
      DropPlaceholder,
      {
        borderStyle: "solid",
        borderColor: "secondary200",
        borderWidth: "2px",
        width: "calc(100% - 24px)",
        marginLeft: "auto",
        dragDirection,
        placeholderMargin: children.props.as && children.props.as === "li" ? 1 : 2
      }
    ),
    isDragging ? /* @__PURE__ */ jsxRuntime.jsx(CloneDragItem, { dragHandleTopMargin, children }) : /* @__PURE__ */ jsxRuntime.jsxs(
      DragItem,
      {
        ref: dragRef,
        "data-handler-id": handlerId,
        gap: 2,
        paddingLeft: 2,
        alignItems: "start",
        onDragStart: (event) => {
          const target = event.target;
          const currentTarget = event.currentTarget;
          if (target.getAttribute("role") !== "button") {
            event.preventDefault();
          } else {
            currentTarget.style.opacity = "0.5";
          }
        },
        onDragEnd: (event) => {
          const currentTarget = event.currentTarget;
          currentTarget.style.opacity = "1";
        },
        onMouseMove: () => setDragVisibility("visible"),
        onSelect: () => setDragVisibility("visible"),
        onMouseLeave: () => setDragVisibility("hidden"),
        "aria-disabled": disabled,
        $dragVisibility: dragVisibility,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            DragIconButton,
            {
              tag: "div",
              contentEditable: false,
              role: "button",
              tabIndex: 0,
              withTooltip: false,
              label: formatMessage({
                id: index.getTranslation("components.DragHandle-label"),
                defaultMessage: "Drag"
              }),
              onClick: (e) => e.stopPropagation(),
              "aria-disabled": disabled,
              disabled,
              draggable: true,
              $dragHandleTopMargin: dragHandleTopMargin,
              children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, { color: "primary500" })
            }
          ),
          children
        ]
      }
    )
  ] });
};
const CloneDragItem = ({ children, dragHandleTopMargin }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(DragItem, { gap: 2, paddingLeft: 2, alignItems: "start", $dragVisibility: "visible", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      DragIconButton,
      {
        tag: "div",
        role: "button",
        withTooltip: false,
        label: formatMessage({
          id: index.getTranslation("components.DragHandle-label"),
          defaultMessage: "Drag"
        }),
        $dragHandleTopMargin: dragHandleTopMargin,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, { color: "neutral600" })
      }
    ),
    children
  ] });
};
const baseRenderLeaf = (props, modifiers2) => {
  const wrappedChildren = getEntries(modifiers2).reduce((currentChildren, modifierEntry) => {
    const [name2, modifier] = modifierEntry;
    if (props.leaf[name2]) {
      return modifier.renderLeaf(currentChildren);
    }
    return currentChildren;
  }, props.children);
  return /* @__PURE__ */ jsxRuntime.jsx("span", { ...props.attributes, className: props.leaf.className, children: wrappedChildren });
};
const baseRenderElement = ({
  props,
  blocks,
  editor,
  setDragDirection,
  dragDirection
}) => {
  const { element } = props;
  const blockMatch = Object.values(blocks).find((block2) => block2.matchNode(element));
  const block = blockMatch || blocks.paragraph;
  const nodePath = slateReact.ReactEditor.findPath(editor, element);
  if (isLinkNode(element) || isListNode$1(element) && element.indentLevel && element.indentLevel > 0 || element.type === "list-item") {
    return block.renderElement(props);
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    DragAndDropElement,
    {
      index: nodePath,
      setDragDirection,
      dragDirection,
      dragHandleTopMargin: block.dragHandleTopMargin,
      children: block.renderElement(props)
    }
  );
};
const dragNoop = () => true;
const BlocksContent = ({ placeholder, ariaLabelId }) => {
  const { editor, disabled, blocks, modifiers: modifiers2, setLiveText, isExpandedMode } = useBlocksEditorContext("BlocksContent");
  const blocksRef = React__namespace.useRef(null);
  const { formatMessage } = reactIntl.useIntl();
  const [dragDirection, setDragDirection] = React__namespace.useState(null);
  const { modalElement, handleConversionResult } = useConversionModal();
  const renderLeaf = React__namespace.useCallback(
    (props) => baseRenderLeaf(props, modifiers2),
    [modifiers2]
  );
  const handleMoveBlocks = (editor2, event) => {
    if (!editor2.selection) return;
    const start = slate.Range.start(editor2.selection);
    const currentIndex = [start.path[0]];
    let newIndexPosition = 0;
    if (event.key === "ArrowUp") {
      newIndexPosition = currentIndex[0] > 0 ? currentIndex[0] - 1 : currentIndex[0];
    } else {
      newIndexPosition = currentIndex[0] < editor2.children.length - 1 ? currentIndex[0] + 1 : currentIndex[0];
    }
    const newIndex = [newIndexPosition];
    if (newIndexPosition !== currentIndex[0]) {
      slate.Transforms.moveNodes(editor2, {
        at: currentIndex,
        to: newIndex
      });
      setLiveText(
        formatMessage(
          {
            id: index.getTranslation("components.Blocks.dnd.reorder"),
            defaultMessage: "{item}, moved. New position in the editor: {position}."
          },
          {
            item: `${name}.${currentIndex[0] + 1}`,
            position: `${newIndex[0] + 1} of ${editor2.children.length}`
          }
        )
      );
      event.preventDefault();
    }
  };
  const renderElement = React__namespace.useCallback(
    (props) => baseRenderElement({ props, blocks, editor, dragDirection, setDragDirection }),
    [blocks, editor, dragDirection, setDragDirection]
  );
  const checkSnippet = (event) => {
    if (!editor.selection) {
      return;
    }
    const [textNode, textNodePath] = slate.Editor.node(editor, editor.selection.anchor.path);
    if (slate.Editor.isEditor(textNode) || textNode.type !== "text") {
      return;
    }
    if (textNodePath.at(-1) !== 0) {
      return;
    }
    const blockMatchingSnippet = Object.values(blocks).find((block) => {
      return block.snippets?.includes(textNode.text);
    });
    if (blockMatchingSnippet?.handleConvert) {
      event.preventDefault();
      slate.Transforms.delete(editor, {
        distance: textNode.text.length,
        unit: "character",
        reverse: true
      });
      const maybeRenderModal = blockMatchingSnippet.handleConvert(editor);
      handleConversionResult(maybeRenderModal);
    }
  };
  const handleEnter = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (event.shiftKey && selectedNode.type !== "image") {
      slate.Transforms.insertText(editor, "\n");
      return;
    }
    if (selectedBlock.handleEnterKey) {
      selectedBlock.handleEnterKey(editor);
    } else {
      blocks.paragraph.handleEnterKey(editor);
    }
  };
  const handleBackspaceEvent = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (selectedBlock.handleBackspaceKey) {
      selectedBlock.handleBackspaceKey(editor, event);
    }
  };
  const handleTab = (event) => {
    if (!editor.selection) {
      return;
    }
    const selectedNode = editor.children[editor.selection.anchor.path[0]];
    const selectedBlock = Object.values(blocks).find((block) => block.matchNode(selectedNode));
    if (!selectedBlock) {
      return;
    }
    if (selectedBlock.handleTab) {
      event.preventDefault();
      selectedBlock.handleTab(editor);
    }
  };
  const handleKeyboardShortcuts = (event) => {
    const isCtrlOrCmd = event.metaKey || event.ctrlKey;
    if (isCtrlOrCmd) {
      Object.values(modifiers2).forEach((value) => {
        if (value.isValidEventKey(event)) {
          value.handleToggle(editor);
          return;
        }
      });
      if (event.shiftKey && ["ArrowUp", "ArrowDown"].includes(event.key)) {
        handleMoveBlocks(editor, event);
      }
    }
  };
  const handleKeyDown = (event) => {
    switch (event.key) {
      case "Enter":
        event.preventDefault();
        return handleEnter(event);
      case "Backspace":
        return handleBackspaceEvent(event);
      case "Tab":
        return handleTab(event);
      case "Escape":
        return slateReact.ReactEditor.blur(editor);
    }
    handleKeyboardShortcuts(event);
    if (event.key === " ") {
      checkSnippet(event);
    }
  };
  const handleScrollSelectionIntoView = React__namespace.useCallback(() => {
    if (!editor.selection || !blocksRef.current) {
      return;
    }
    const domRange = slateReact.ReactEditor.toDOMRange(editor, editor.selection);
    const domRect = domRange.getBoundingClientRect();
    const editorRect = blocksRef.current.getBoundingClientRect();
    if (domRect.top < editorRect.top || domRect.bottom > editorRect.bottom) {
      blocksRef.current.scrollBy({
        top: 28,
        // 20px is the line-height + 8px line gap
        behavior: "smooth"
      });
    }
  }, [editor]);
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Box,
    {
      ref: blocksRef,
      grow: 1,
      width: "100%",
      overflow: "auto",
      fontSize: 2,
      background: "neutral0",
      color: "neutral800",
      lineHeight: 6,
      paddingRight: 7,
      paddingTop: 6,
      paddingBottom: 3,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          StyledEditable,
          {
            "aria-labelledby": ariaLabelId,
            readOnly: disabled,
            placeholder,
            $isExpandedMode: isExpandedMode,
            decorate: decorateCode,
            renderElement,
            renderLeaf,
            onKeyDown: handleKeyDown,
            scrollSelectionIntoView: handleScrollSelectionIntoView,
            onDrop: dragNoop,
            onDragStart: dragNoop
          }
        ),
        modalElement
      ]
    }
  );
};
const EditorLayout$1 = ({
  children,
  error,
  disabled,
  onToggleExpand,
  ariaDescriptionId
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { isExpandedMode } = useBlocksEditorContext("editorLayout");
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    isExpandedMode && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isExpandedMode, onOpenChange: onToggleExpand, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { style: { maxWidth: "unset", width: "unset" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: "90dvh", width: "90dvw", alignItems: "flex-start", direction: "column", children: [
      children,
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          position: "absolute",
          bottom: "1.2rem",
          right: "1.2rem",
          shadow: "filterShadow",
          label: formatMessage({
            id: index.getTranslation("components.Blocks.collapse"),
            defaultMessage: "Collapse"
          }),
          onClick: onToggleExpand,
          children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Collapse, {})
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      InputWrapper,
      {
        direction: "column",
        alignItems: "flex-start",
        height: "512px",
        $disabled: disabled,
        $hasError: Boolean(error),
        style: { overflow: "hidden" },
        "aria-describedby": ariaDescriptionId,
        position: "relative",
        children: !isExpandedMode && children
      }
    )
  ] });
};
const InputWrapper = styledComponents.styled(designSystem.Flex)`
  border: 1px solid
    ${({ theme, $hasError }) => $hasError ? theme.colors.danger600 : theme.colors.neutral200};
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};

  ${({ theme, $hasError = false }) => styledComponents.css`
    outline: none;
    box-shadow: 0;
    transition-property: border-color, box-shadow, fill;
    transition-duration: 0.2s;

    &:focus-within {
      border: 1px solid ${$hasError ? theme.colors.danger600 : theme.colors.primary600};
      box-shadow: ${$hasError ? theme.colors.danger600 : theme.colors.primary600} 0px 0px 0px 2px;
    }
  `}

  ${({ theme, $disabled }) => $disabled ? styledComponents.css`
          color: ${theme.colors.neutral600};
          background: ${theme.colors.neutral150};
        ` : void 0}
`;
const stylesToInherit = styledComponents.css`
  font-size: inherit;
  color: inherit;
  line-height: inherit;
`;
const BoldText = styledComponents.styled(designSystem.Typography).attrs({ fontWeight: "bold" })`
  ${stylesToInherit}
`;
const ItalicText = styledComponents.styled(designSystem.Typography)`
  font-style: italic;
  ${stylesToInherit}
`;
const UnderlineText = styledComponents.styled(designSystem.Typography).attrs({
  textDecoration: "underline"
})`
  ${stylesToInherit}
`;
const StrikeThroughText = styledComponents.styled(designSystem.Typography).attrs({
  textDecoration: "line-through"
})`
  ${stylesToInherit}
`;
const InlineCode = styledComponents.styled.code`
  background-color: ${({ theme }) => theme.colors.neutral150};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: ${({ theme }) => `0 ${theme.spaces[2]}`};
  font-family: 'SF Mono', SFMono-Regular, ui-monospace, 'DejaVu Sans Mono', Menlo, Consolas,
    monospace;
  color: inherit;
`;
const baseCheckIsActive = (editor, name2) => {
  const marks = slate.Editor.marks(editor);
  if (!marks) return false;
  return Boolean(marks[name2]);
};
const baseHandleToggle = (editor, name2) => {
  const marks = slate.Editor.marks(editor);
  if (!editor.selection) {
    const endOfEditor = slate.Editor.end(editor, []);
    slate.Transforms.select(editor, endOfEditor);
  }
  if (marks?.[name2]) {
    slate.Editor.removeMark(editor, name2);
  } else {
    slate.Editor.addMark(editor, name2, true);
  }
};
const modifiers = {
  bold: {
    icon: Icons.Bold,
    isValidEventKey: (event) => event.key === "b",
    label: { id: "components.Blocks.modifiers.bold", defaultMessage: "Bold" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "bold"),
    handleToggle: (editor) => baseHandleToggle(editor, "bold"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(BoldText, { children })
  },
  italic: {
    icon: Icons.Italic,
    isValidEventKey: (event) => event.key === "i",
    label: { id: "components.Blocks.modifiers.italic", defaultMessage: "Italic" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "italic"),
    handleToggle: (editor) => baseHandleToggle(editor, "italic"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(ItalicText, { children })
  },
  underline: {
    icon: Icons.Underline,
    isValidEventKey: (event) => event.key === "u",
    label: { id: "components.Blocks.modifiers.underline", defaultMessage: "Underline" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "underline"),
    handleToggle: (editor) => baseHandleToggle(editor, "underline"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(UnderlineText, { children })
  },
  strikethrough: {
    icon: Icons.StrikeThrough,
    isValidEventKey: (event) => event.key === "S" && event.shiftKey,
    label: { id: "components.Blocks.modifiers.strikethrough", defaultMessage: "Strikethrough" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "strikethrough"),
    handleToggle: (editor) => baseHandleToggle(editor, "strikethrough"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(StrikeThroughText, { children })
  },
  code: {
    icon: Icons.Code,
    isValidEventKey: (event) => event.key === "e",
    label: { id: "components.Blocks.modifiers.code", defaultMessage: "Inline code" },
    checkIsActive: (editor) => baseCheckIsActive(editor, "code"),
    handleToggle: (editor) => baseHandleToggle(editor, "code"),
    renderLeaf: (children) => /* @__PURE__ */ jsxRuntime.jsx(InlineCode, { children })
  }
};
const withImages = (editor) => {
  const { isVoid } = editor;
  editor.isVoid = (element) => {
    return element.type === "image" ? true : isVoid(element);
  };
  return editor;
};
const withLinks = (editor) => {
  const { isInline, apply, insertText: insertText2, insertData } = editor;
  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };
  editor.lastInsertedLinkPath = null;
  editor.apply = (operation) => {
    if (operation.type === "insert_node") {
      if (!slate.Editor.isEditor(operation.node) && operation.node.type === "link" && editor.shouldSaveLinkPath) {
        editor.lastInsertedLinkPath = operation.path;
      }
    } else if (operation.type === "move_node") {
      if (slate.Path.hasPrevious(operation.path) && editor.lastInsertedLinkPath && editor.shouldSaveLinkPath) {
        editor.lastInsertedLinkPath = slate.Path.transform(editor.lastInsertedLinkPath, operation);
      }
    }
    apply(operation);
  };
  editor.insertText = (text) => {
    if (editor.selection && slate.Range.isCollapsed(editor.selection) && text === " ") {
      const linksInSelection = Array.from(
        slate.Editor.nodes(editor, {
          at: editor.selection,
          match: (node) => !slate.Editor.isEditor(node) && node.type === "link"
        })
      );
      const selectionIsInLink = editor.selection && linksInSelection.length > 0;
      const selectionIsAtEndOfLink = selectionIsInLink && slate.Point.equals(editor.selection.anchor, slate.Editor.end(editor, linksInSelection[0][1]));
      if (selectionIsAtEndOfLink) {
        slate.Transforms.insertNodes(
          editor,
          { text: " ", type: "text" },
          { at: slate.Path.next(linksInSelection[0][1]), select: true }
        );
        return;
      }
    }
    insertText2(text);
  };
  editor.insertData = (data) => {
    const pastedText = data.getData("text/plain");
    if (pastedText) {
      try {
        new URL(pastedText);
        editor.shouldSaveLinkPath = false;
        insertLink(editor, { url: pastedText });
        return;
      } catch (error) {
      }
    }
    insertData(data);
  };
  return editor;
};
const isText = (node) => {
  return slate.Node.isNode(node) && !slate.Editor.isEditor(node) && node.type === "text";
};
const withStrapiSchema = (editor) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry) => {
    const [node, path] = entry;
    if (!slate.Element.isElement(node) && !isText(node)) {
      slate.Transforms.setNodes(editor, { type: "text" }, { at: path });
      return;
    }
    normalizeNode(entry);
  };
  return editor;
};
const selectorBlockKeys = [
  "paragraph",
  "heading-one",
  "heading-two",
  "heading-three",
  "heading-four",
  "heading-five",
  "heading-six",
  "list-ordered",
  "list-unordered",
  "image",
  "quote",
  "code"
];
const isSelectorBlockKey = (key) => {
  return typeof key === "string" && selectorBlockKeys.includes(key);
};
const [BlocksEditorProvider, usePartialBlocksEditorContext] = admin.createContext("BlocksEditor");
function useBlocksEditorContext(consumerName) {
  const context = usePartialBlocksEditorContext(consumerName, (state) => state);
  const editor = slateReact.useSlate();
  return {
    ...context,
    editor
  };
}
const EditorDivider = styledComponents.styled(designSystem.Divider)`
  background: ${({ theme }) => theme.colors.neutral200};
`;
function useResetKey(value) {
  const slateUpdatesCount = React__namespace.useRef(0);
  const valueUpdatesCount = React__namespace.useRef(0);
  const [key, setKey] = React__namespace.useState(0);
  React__namespace.useEffect(() => {
    valueUpdatesCount.current += 1;
    if (valueUpdatesCount.current !== slateUpdatesCount.current) {
      setKey((previousKey) => previousKey + 1);
      slateUpdatesCount.current = valueUpdatesCount.current;
    }
  }, [value]);
  const incrementSlateUpdatesCount = React__namespace.useCallback(() => {
    slateUpdatesCount.current += 1;
  }, []);
  return { key, incrementSlateUpdatesCount };
}
const pipe = (...fns) => (value) => fns.reduce((prev, fn) => fn(prev), value);
const normalizeBlocksState = (editor, value) => {
  const isEmpty = value.length === 1 && slate.Editor.isEmpty(editor, value[0]);
  return isEmpty ? null : value;
};
const BlocksEditor = React__namespace.forwardRef(
  ({ disabled = false, name: name2, onChange, value, error, ...contentProps }, forwardedRef) => {
    const { formatMessage } = reactIntl.useIntl();
    const [editor] = React__namespace.useState(
      () => pipe(slateHistory.withHistory, withImages, withStrapiSchema, slateReact.withReact, withLinks)(slate.createEditor())
    );
    const [liveText, setLiveText] = React__namespace.useState("");
    const ariaDescriptionId = React__namespace.useId();
    const [isExpandedMode, handleToggleExpand] = React__namespace.useReducer((prev) => !prev, false);
    React__namespace.useImperativeHandle(
      forwardedRef,
      () => ({
        focus() {
          slateReact.ReactEditor.focus(editor);
        }
      }),
      [editor]
    );
    const { key, incrementSlateUpdatesCount } = useResetKey(value);
    const debounceTimeout = React__namespace.useRef(null);
    const handleSlateChange = React__namespace.useCallback(
      (state) => {
        const isAstChange = editor.operations.some((op) => op.type !== "set_selection");
        if (isAstChange) {
          if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
          }
          debounceTimeout.current = setTimeout(() => {
            incrementSlateUpdatesCount();
            onChange(name2, normalizeBlocksState(editor, state));
            debounceTimeout.current = null;
          }, 300);
        }
      },
      [editor, incrementSlateUpdatesCount, name2, onChange]
    );
    React__namespace.useEffect(() => {
      return () => {
        if (debounceTimeout.current) {
          clearTimeout(debounceTimeout.current);
        }
      };
    }, []);
    React__namespace.useEffect(() => {
      const normalizedValue = value?.length ? value : null;
      const normalizedEditorState = normalizeBlocksState(editor, editor.children);
      if (normalizedValue && normalizedEditorState && JSON.stringify(normalizedEditorState) !== JSON.stringify(normalizedValue)) {
        slate.Transforms.deselect(editor);
      }
    }, [editor, value]);
    const blocks = React__namespace.useMemo(
      () => ({
        ...paragraphBlocks,
        ...headingBlocks,
        ...listBlocks,
        ...linkBlocks,
        ...imageBlocks,
        ...quoteBlocks,
        ...codeBlocks
      }),
      []
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
        id: index.getTranslation("components.Blocks.dnd.instruction"),
        defaultMessage: `To reorder blocks, press Command or Control along with Shift and the Up or Down arrow keys`
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
      /* @__PURE__ */ jsxRuntime.jsx(
        slateReact.Slate,
        {
          editor,
          initialValue: value?.length ? value : [{ type: "paragraph", children: [{ type: "text", text: "" }] }],
          onChange: handleSlateChange,
          children: /* @__PURE__ */ jsxRuntime.jsx(
            BlocksEditorProvider,
            {
              blocks,
              modifiers,
              disabled,
              name: name2,
              setLiveText,
              isExpandedMode,
              children: /* @__PURE__ */ jsxRuntime.jsxs(
                EditorLayout$1,
                {
                  error,
                  disabled,
                  onToggleExpand: handleToggleExpand,
                  ariaDescriptionId,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(BlocksToolbar, {}),
                    /* @__PURE__ */ jsxRuntime.jsx(EditorDivider, { width: "100%" }),
                    /* @__PURE__ */ jsxRuntime.jsx(BlocksContent, { ...contentProps }),
                    !isExpandedMode && /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.IconButton,
                      {
                        position: "absolute",
                        bottom: "1.2rem",
                        right: "1.2rem",
                        shadow: "filterShadow",
                        label: formatMessage({
                          id: index.getTranslation("components.Blocks.expand"),
                          defaultMessage: "Expand"
                        }),
                        onClick: handleToggleExpand,
                        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Expand, {})
                      }
                    )
                  ]
                }
              )
            }
          )
        },
        key
      )
    ] });
  }
);
const BlocksInput = React__namespace.forwardRef(
  ({ label, name: name2, required = false, hint, labelAction, ...editorProps }, forwardedRef) => {
    const id = React__namespace.useId();
    const field = admin.useField(name2);
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { id, name: name2, hint, error: field.error, required, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        BlocksEditor,
        {
          name: name2,
          error: field.error,
          ref: forwardedRef,
          value: field.value,
          onChange: field.onChange,
          ariaLabelId: id,
          ...editorProps
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
    ] }) });
  }
);
const MemoizedBlocksInput = React__namespace.memo(BlocksInput);
const Initializer = ({ disabled, name: name2, onClick }) => {
  const { formatMessage } = reactIntl.useIntl();
  const field = admin.useField(name2);
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      tag: "button",
      background: disabled ? "neutral150" : "neutral100",
      borderColor: field.error ? "danger600" : "neutral200",
      hasRadius: true,
      disabled,
      onClick,
      paddingTop: 9,
      paddingBottom: 9,
      type: "button",
      style: { cursor: disabled ? "not-allowed" : "pointer" },
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", color: disabled ? "neutral500" : "primary600", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.PlusCircle, { width: "3.2rem", height: "3.2rem" }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Typography,
          {
            textColor: disabled ? "neutral600" : "primary600",
            variant: "pi",
            fontWeight: "bold",
            children: formatMessage({
              id: index.getTranslation("components.empty-repeatable"),
              defaultMessage: "No entry yet. Click to add one."
            })
          }
        ) })
      ] })
    }
  ) });
};
const NonRepeatableComponent = ({
  attribute,
  name: name2,
  children,
  layout
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { value } = admin.useField(name2);
  const level = useComponent("NonRepeatableComponent", (state) => state.level);
  const isNested = level > 0;
  const { currentDocument } = useDocumentContext("NonRepeatableComponent");
  const rulesEngine2 = admin.createRulesEngine();
  return /* @__PURE__ */ jsxRuntime.jsx(ComponentProvider, { id: value?.id, uid: attribute.component, level: level + 1, type: "component", children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "neutral100",
      paddingLeft: 6,
      paddingRight: 6,
      paddingTop: 6,
      paddingBottom: 6,
      hasRadius: isNested,
      borderColor: isNested ? "neutral200" : void 0,
      children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: layout.map((row, index2) => {
        const visibleFields = row.filter(({ ...field }) => {
          const condition = field.attribute.conditions?.visible;
          if (condition) {
            return rulesEngine2.evaluate(condition, value);
          }
          return true;
        });
        if (visibleFields.length === 0) {
          return null;
        }
        return /* @__PURE__ */ jsxRuntime.jsx(ResponsiveGridRoot, { gap: 4, children: visibleFields.map(({ size, ...field }) => {
          const completeFieldName = `${name2}.${field.name}`;
          const translatedLabel = formatMessage({
            id: `content-manager.components.${attribute.component}.${field.name}`,
            defaultMessage: field.label
          });
          return /* @__PURE__ */ jsxRuntime.jsx(
            ResponsiveGridItem,
            {
              col: size,
              s: 12,
              xs: 12,
              direction: "column",
              alignItems: "stretch",
              children: children({
                ...field,
                label: translatedLabel,
                name: completeFieldName,
                document: currentDocument
              })
            },
            completeFieldName
          );
        }) }, index2);
      }) })
    }
  ) });
};
const usePrev = (value) => {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};
function getIn(obj, key, def, pathStartIndex = 0) {
  const path = toPath__default.default(key);
  while (obj && pathStartIndex < path.length) {
    obj = obj[path[pathStartIndex++]];
  }
  if (pathStartIndex !== path.length && !obj) {
    return def;
  }
  return obj === void 0 ? def : obj;
}
const RepeatableComponent = ({
  attribute,
  disabled,
  name: name2,
  mainField,
  children,
  layout
}) => {
  const { toggleNotification } = admin.useNotification();
  const { formatMessage } = reactIntl.useIntl();
  const { search: searchString } = reactRouterDom.useLocation();
  const search = React__namespace.useMemo(() => new URLSearchParams(searchString), [searchString]);
  const { currentDocument } = useDocumentContext("RepeatableComponent");
  const components = currentDocument.components;
  const {
    value = [],
    error,
    rawError
  } = admin.useField(name2);
  const addFieldRow = admin.useForm("RepeatableComponent", (state) => state.addFieldRow);
  const moveFieldRow = admin.useForm("RepeatableComponent", (state) => state.moveFieldRow);
  const removeFieldRow = admin.useForm("RepeatableComponent", (state) => state.removeFieldRow);
  const { max = Infinity } = attribute;
  const [collapseToOpen, setCollapseToOpen] = React__namespace.useState("");
  const [liveText, setLiveText] = React__namespace.useState("");
  const rulesEngine2 = admin.createRulesEngine();
  React__namespace.useEffect(() => {
    const hasNestedErrors = rawError && Array.isArray(rawError) && rawError.length > 0;
    const hasNestedValue = value && Array.isArray(value) && value.length > 0;
    if (hasNestedErrors && hasNestedValue) {
      const errorOpenItems = rawError.map((_, idx) => {
        return value[idx] ? value[idx].__temp_key__ : null;
      }).filter((value2) => !!value2);
      if (errorOpenItems && errorOpenItems.length > 0) {
        setCollapseToOpen((collapseToOpen2) => {
          if (!errorOpenItems.includes(collapseToOpen2)) {
            return errorOpenItems[0];
          }
          return collapseToOpen2;
        });
      }
    }
  }, [rawError, value]);
  const componentTmpKeyWithFocussedField = React__namespace.useMemo(() => {
    if (search.has("field")) {
      const fieldParam = search.get("field");
      if (!fieldParam) {
        return void 0;
      }
      const [, path] = fieldParam.split(`${name2}.`);
      if (getIn(value, path, void 0) !== void 0) {
        const [subpath] = path.split(".");
        return getIn(value, subpath, void 0)?.__temp_key__;
      }
    }
    return void 0;
  }, [search, name2, value]);
  const prevValue = usePrev(value);
  React__namespace.useEffect(() => {
    if (prevValue && prevValue.length < value.length) {
      setCollapseToOpen(value[value.length - 1].__temp_key__);
    }
  }, [value, prevValue]);
  React__namespace.useEffect(() => {
    if (typeof componentTmpKeyWithFocussedField === "string") {
      setCollapseToOpen(componentTmpKeyWithFocussedField);
    }
  }, [componentTmpKeyWithFocussedField]);
  const toggleCollapses = () => {
    setCollapseToOpen("");
  };
  const handleClick = () => {
    if (value.length < max) {
      const schema = components[attribute.component];
      const form = createDefaultForm(schema, components);
      const data = transformDocument(schema, components)(form);
      addFieldRow(name2, data);
    } else if (value.length >= max) {
      toggleNotification({
        type: "info",
        message: formatMessage({
          id: index.getTranslation("components.notification.info.maximum-requirement")
        })
      });
    }
  };
  const handleMoveComponentField = (newIndex, currentIndex) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: `${name2}.${currentIndex}`,
          position: getItemPos(newIndex)
        }
      )
    );
    moveFieldRow(name2, currentIndex, newIndex);
  };
  const handleValueChange = (key) => {
    setCollapseToOpen(key);
  };
  const getItemPos = (index2) => `${index2 + 1} of ${value.length}`;
  const handleCancel = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: `${name2}.${index$1}`
        }
      )
    );
  };
  const handleGrabItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleDropItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const ariaDescriptionId = React__namespace.useId();
  const level = useComponent("RepeatableComponent", (state) => state.level);
  if (value.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(Initializer, { disabled, name: name2, onClick: handleClick });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { hasRadius: true, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
      id: index.getTranslation("dnd.instructions"),
      defaultMessage: `Press spacebar to grab and re-order`
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      AccordionRoot,
      {
        $error: error,
        value: collapseToOpen,
        onValueChange: handleValueChange,
        "aria-describedby": ariaDescriptionId,
        children: [
          value.map(({ __temp_key__: key, id, ...currentComponentValues }, index2) => {
            const nameWithIndex = `${name2}.${index2}`;
            return /* @__PURE__ */ jsxRuntime.jsx(
              ComponentProvider,
              {
                id,
                uid: attribute.component,
                level: level + 1,
                type: "repeatable",
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  Component,
                  {
                    disabled,
                    name: nameWithIndex,
                    attribute,
                    index: index2,
                    mainField,
                    onMoveItem: handleMoveComponentField,
                    onDeleteComponent: () => {
                      removeFieldRow(name2, index2);
                      toggleCollapses();
                    },
                    toggleCollapses,
                    onCancel: handleCancel,
                    onDropItem: handleDropItem,
                    onGrabItem: handleGrabItem,
                    __temp_key__: key,
                    children: layout.map((row, index22) => {
                      const visibleFields = row.filter(({ ...field }) => {
                        const condition = field.attribute.conditions?.visible;
                        if (condition) {
                          return rulesEngine2.evaluate(condition, currentComponentValues);
                        }
                        return true;
                      });
                      if (visibleFields.length === 0) {
                        return null;
                      }
                      return /* @__PURE__ */ jsxRuntime.jsx(ResponsiveGridRoot, { gap: 4, children: visibleFields.map(({ size, ...field }) => {
                        const completeFieldName = `${nameWithIndex}.${field.name}`;
                        const translatedLabel = formatMessage({
                          id: `content-manager.components.${attribute.component}.${field.name}`,
                          defaultMessage: field.label
                        });
                        return /* @__PURE__ */ jsxRuntime.jsx(
                          ResponsiveGridItem,
                          {
                            col: size,
                            s: 12,
                            xs: 12,
                            direction: "column",
                            alignItems: "stretch",
                            children: children({
                              ...field,
                              label: translatedLabel,
                              name: completeFieldName,
                              document: currentDocument
                            })
                          },
                          completeFieldName
                        );
                      }) }, index22);
                    })
                  }
                )
              },
              key
            );
          }),
          /* @__PURE__ */ jsxRuntime.jsx(TextButtonCustom, { disabled, onClick: handleClick, startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Plus, {}), children: formatMessage({
            id: index.getTranslation("containers.EditView.add.new-entry"),
            defaultMessage: "Add an entry"
          }) })
        ]
      }
    )
  ] });
};
const AccordionRoot = styledComponents.styled(designSystem.Accordion.Root)`
  border: 1px solid
    ${({ theme, $error }) => $error ? theme.colors.danger600 : theme.colors.neutral200};
`;
const TextButtonCustom = styledComponents.styled(designSystem.TextButton)`
  width: 100%;
  display: flex;
  justify-content: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding-inline: ${(props) => props.theme.spaces[6]};
  padding-block: ${(props) => props.theme.spaces[3]};

  &:not([disabled]) {
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary100};
    }
  }

  span {
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2.4rem;
  }

  @media (prefers-reduced-motion: no-preference) {
    transition: background-color 120ms ${(props) => props.theme.motion.easings.easeOutQuad};
  }
`;
const Component = ({
  disabled,
  index: index$1,
  name: name2,
  mainField = {
    name: "id",
    type: "integer"
  },
  children,
  onDeleteComponent,
  toggleCollapses,
  __temp_key__,
  ...dragProps
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const isDesktop = admin.useIsDesktop();
  const displayValue = admin.useForm("RepeatableComponent", (state) => {
    return getIn(state.values, [...name2.split("."), mainField.name]);
  });
  const accordionRef = React__namespace.useRef(null);
  const componentKey = name2.split(".").slice(0, -1).join(".");
  const [{ handlerId, isDragging, handleKeyDown }, boxRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(!disabled, {
    type: `${ItemTypes.COMPONENT}_${componentKey}`,
    index: index$1,
    item: {
      index: index$1,
      displayedValue: displayValue
    },
    onStart() {
      toggleCollapses();
    },
    ...dragProps
  });
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index$1]);
  const composedAccordionRefs = designSystem.useComposedRefs(accordionRef, dragRef);
  const composedBoxRefs = designSystem.useComposedRefs(
    boxRef,
    dropRef
  );
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: isDragging ? /* @__PURE__ */ jsxRuntime.jsx(Preview$1, {}) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { ref: composedBoxRefs, value: __temp_key__, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Header, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Trigger, { children: displayValue }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Actions, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled,
            variant: "ghost",
            onClick: onDeleteComponent,
            label: formatMessage({
              id: index.getTranslation("containers.Edit.delete"),
              defaultMessage: "Delete"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
          }
        ),
        isDesktop && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled,
            ref: composedAccordionRefs,
            variant: "ghost",
            onClick: (e) => e.stopPropagation(),
            "data-handler-id": handlerId,
            label: formatMessage({
              id: index.getTranslation("components.DragHandle-label"),
              defaultMessage: "Drag"
            }),
            onKeyDown: handleKeyDown,
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Flex,
      {
        direction: "column",
        alignItems: "stretch",
        background: "neutral100",
        padding: 6,
        gap: 6,
        children
      }
    ) })
  ] }) });
};
const Preview$1 = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(StyledSpan, { tag: "span", padding: 6, background: "primary100" });
};
const StyledSpan = styledComponents.styled(designSystem.Box)`
  display: block;
  outline: 1px dashed ${({ theme }) => theme.colors.primary500};
  outline-offset: -1px;
`;
const ComponentInput = ({
  label,
  required,
  name: name2,
  attribute,
  disabled,
  labelAction,
  ...props
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const field = admin.useField(name2);
  const showResetComponent = !attribute.repeatable && field.value && !disabled;
  const {
    currentDocument: { components }
  } = useDocumentContext("ComponentInput");
  const handleInitialisationClick = () => {
    const schema = components[attribute.component];
    const form = createDefaultForm(schema, components);
    const data = transformDocument(schema, components)(form);
    field.onChange(name2, data);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error: field.error, required, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Label, { action: labelAction, children: [
        label,
        attribute.repeatable && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          " (",
          Array.isArray(field.value) ? field.value.length : 0,
          ")"
        ] })
      ] }),
      showResetComponent && /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          label: formatMessage({
            id: index.getTranslation("components.reset-entry"),
            defaultMessage: "Reset Entry"
          }),
          variant: "ghost",
          onClick: () => {
            field.onChange(name2, null);
          },
          children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
        }
      )
    ] }),
    !attribute.repeatable && !field.value && /* @__PURE__ */ jsxRuntime.jsx(Initializer, { disabled, name: name2, onClick: handleInitialisationClick }),
    !attribute.repeatable && field.value ? /* @__PURE__ */ jsxRuntime.jsx(NonRepeatableComponent, { attribute, name: name2, disabled, ...props, children: props.children }) : null,
    attribute.repeatable && /* @__PURE__ */ jsxRuntime.jsx(RepeatableComponent, { attribute, name: name2, disabled, ...props, children: props.children }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
  ] });
};
const MemoizedComponentInput = React__namespace.memo(ComponentInput);
const AddComponentButton = ({
  hasError,
  isDisabled,
  isOpen,
  children,
  onClick
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    StyledButton,
    {
      type: "button",
      onClick,
      disabled: isDisabled,
      background: "neutral0",
      style: { cursor: isDisabled ? "not-allowed" : "pointer" },
      variant: "tertiary",
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { tag: "span", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(StyledAddIcon, { "aria-hidden": true, $isOpen: isOpen, $hasError: hasError && !isOpen }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Typography,
          {
            variant: "pi",
            fontWeight: "bold",
            textColor: hasError && !isOpen ? "danger600" : "neutral600",
            children
          }
        )
      ] })
    }
  );
};
const StyledAddIcon = styledComponents.styled(Icons.PlusCircle)`
  height: ${({ theme }) => theme.spaces[6]};
  width: ${({ theme }) => theme.spaces[6]};
  transform: ${({ $isOpen }) => $isOpen ? "rotate(45deg)" : "rotate(0deg)"};

  > circle {
    fill: ${({ theme, $hasError }) => $hasError ? theme.colors.danger200 : theme.colors.neutral150};
  }
  > path {
    fill: ${({ theme, $hasError }) => $hasError ? theme.colors.danger600 : theme.colors.neutral500};
  }
`;
const StyledButton = styledComponents.styled(designSystem.Button)`
  padding-left: ${({ theme }) => theme.spaces[3]};
  border-radius: 26px;
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  height: 5rem;
`;
const ComponentIcon = ({
  showBackground = true,
  icon = "dashboard",
  ...props
}) => {
  const Icon = COMPONENT_ICONS[icon] || COMPONENT_ICONS.dashboard;
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      alignItems: "center",
      background: showBackground ? "neutral200" : void 0,
      justifyContent: "center",
      height: 8,
      width: 8,
      color: "neutral600",
      borderRadius: showBackground ? "50%" : 0,
      ...props,
      children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { height: "2rem", width: "2rem" })
    }
  );
};
const COMPONENT_ICONS = {
  alien: Icons__namespace.Alien,
  apps: Icons__namespace.GridNine,
  archive: Icons__namespace.Archive,
  arrowDown: Icons__namespace.ArrowDown,
  arrowLeft: Icons__namespace.ArrowLeft,
  arrowRight: Icons__namespace.ArrowRight,
  arrowUp: Icons__namespace.ArrowUp,
  attachment: Icons__namespace.Paperclip,
  bell: Icons__namespace.Bell,
  bold: Icons__namespace.Bold,
  book: Icons__namespace.Book,
  briefcase: Icons__namespace.Briefcase,
  brush: Icons__namespace.PaintBrush,
  bulletList: Icons__namespace.BulletList,
  calendar: Icons__namespace.Calendar,
  car: Icons__namespace.Car,
  cast: Icons__namespace.Cast,
  chartBubble: Icons__namespace.ChartBubble,
  chartCircle: Icons__namespace.ChartCircle,
  chartPie: Icons__namespace.ChartPie,
  check: Icons__namespace.Check,
  clock: Icons__namespace.Clock,
  cloud: Icons__namespace.Cloud,
  code: Icons__namespace.Code,
  cog: Icons__namespace.Cog,
  collapse: Icons__namespace.Collapse,
  command: Icons__namespace.Command,
  connector: Icons__namespace.Faders,
  crop: Icons__namespace.Crop,
  crown: Icons__namespace.Crown,
  cup: Icons__namespace.Coffee,
  cursor: Icons__namespace.Cursor,
  dashboard: Icons__namespace.SquaresFour,
  database: Icons__namespace.Database,
  discuss: Icons__namespace.Discuss,
  doctor: Icons__namespace.Stethoscope,
  earth: Icons__namespace.Earth,
  emotionHappy: Icons__namespace.EmotionHappy,
  emotionUnhappy: Icons__namespace.EmotionUnhappy,
  envelop: Icons__namespace.Mail,
  exit: Icons__namespace.SignOut,
  expand: Icons__namespace.Expand,
  eye: Icons__namespace.Eye,
  feather: Icons__namespace.Feather,
  file: Icons__namespace.File,
  fileError: Icons__namespace.FileError,
  filePdf: Icons__namespace.FilePdf,
  fileXls: Icons__namespace.FileXls,
  fileZip: Icons__namespace.FileZip,
  fileCsv: Icons__namespace.FileCsv,
  filter: Icons__namespace.Filter,
  folder: Icons__namespace.Folder,
  gate: Icons__namespace.CastleTurret,
  gift: Icons__namespace.Gift,
  globe: Icons__namespace.Globe,
  grid: Icons__namespace.GridFour,
  handHeart: Icons__namespace.HandHeart,
  hashtag: Icons__namespace.Hashtag,
  headphone: Icons__namespace.Headphones,
  heart: Icons__namespace.Heart,
  house: Icons__namespace.House,
  information: Icons__namespace.Information,
  italic: Icons__namespace.Italic,
  key: Icons__namespace.Key,
  landscape: Icons__namespace.Images,
  layer: Icons__namespace.ListPlus,
  layout: Icons__namespace.Layout,
  lightbulb: Icons__namespace.Lightbulb,
  link: Icons__namespace.Link,
  lock: Icons__namespace.Lock,
  magic: Icons__namespace.Magic,
  manyToMany: Icons__namespace.ManyToMany,
  manyToOne: Icons__namespace.ManyToOne,
  manyWays: Icons__namespace.ManyWays,
  medium: Symbols__namespace.Medium,
  message: Icons__namespace.Message,
  microphone: Icons__namespace.Microphone,
  monitor: Icons__namespace.Monitor,
  moon: Icons__namespace.Moon,
  music: Icons__namespace.MusicNotes,
  oneToMany: Icons__namespace.OneToMany,
  oneToOne: Icons__namespace.OneToOne,
  oneWay: Icons__namespace.OneWay,
  paint: Icons__namespace.PaintBrush,
  paintBrush: Icons__namespace.PaintBrush,
  paperPlane: Icons__namespace.PaperPlane,
  pencil: Icons__namespace.Pencil,
  phone: Icons__namespace.Phone,
  picture: Icons__namespace.Image,
  pin: Icons__namespace.Pin,
  pinMap: Icons__namespace.PinMap,
  plane: Icons__namespace.Plane,
  play: Icons__namespace.Play,
  plus: Icons__namespace.Plus,
  priceTag: Icons__namespace.PriceTag,
  puzzle: Icons__namespace.PuzzlePiece,
  question: Icons__namespace.Question,
  quote: Icons__namespace.Quotes,
  refresh: Icons__namespace.ArrowClockwise,
  restaurant: Icons__namespace.Restaurant,
  rocket: Icons__namespace.Rocket,
  rotate: Icons__namespace.ArrowsCounterClockwise,
  scissors: Icons__namespace.Scissors,
  search: Icons__namespace.Search,
  seed: Icons__namespace.Plant,
  server: Icons__namespace.Server,
  shield: Icons__namespace.Shield,
  shirt: Icons__namespace.Shirt,
  shoppingCart: Icons__namespace.ShoppingCart,
  slideshow: Icons__namespace.PresentationChart,
  stack: Icons__namespace.Stack,
  star: Icons__namespace.Star,
  store: Icons__namespace.Store,
  strikeThrough: Icons__namespace.StrikeThrough,
  sun: Icons__namespace.Sun,
  television: Icons__namespace.Television,
  thumbDown: Icons__namespace.ThumbDown,
  thumbUp: Icons__namespace.ThumbUp,
  train: Icons__namespace.Train,
  twitter: Symbols__namespace.X,
  typhoon: Icons__namespace.Typhoon,
  underline: Icons__namespace.Underline,
  user: Icons__namespace.User,
  volumeMute: Icons__namespace.VolumeMute,
  volumeUp: Icons__namespace.VolumeUp,
  walk: Icons__namespace.Walk,
  wheelchair: Icons__namespace.Wheelchair,
  write: Icons__namespace.Feather
};
const ComponentCategory = ({
  category,
  components = [],
  variant = "primary",
  onAddComponent
}) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: category, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Header, { variant, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Trigger, { children: formatMessage({ id: category, defaultMessage: category }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(ResponsiveAccordionContent, { children: /* @__PURE__ */ jsxRuntime.jsx(Grid, { paddingTop: 4, paddingBottom: 4, paddingLeft: 3, paddingRight: 3, children: components.map(({ uid, displayName, icon }) => /* @__PURE__ */ jsxRuntime.jsx(
      ComponentBox,
      {
        tag: "button",
        type: "button",
        background: "neutral100",
        justifyContent: "center",
        onClick: onAddComponent(uid),
        hasRadius: true,
        height: "8.4rem",
        shrink: 0,
        borderColor: "neutral200",
        children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 1, alignItems: "center", justifyContent: "center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(ComponentIcon, { color: "currentColor", background: "primary200", icon }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", children: displayName })
        ] })
      },
      uid
    )) }) })
  ] });
};
const ResponsiveAccordionContent = styledComponents.styled(designSystem.Accordion.Content)`
  container-type: inline-size;
`;
const Grid = process.env.NODE_ENV !== "test" ? styledComponents.styled(designSystem.Box)`
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 4px;

        ${({ theme }) => theme.breakpoints.medium} {
          grid-template-columns: repeat(auto-fill, 14rem);
        }
      ` : styledComponents.styled(designSystem.Box)`
        display: grid;
        grid-template-columns: repeat(auto-fill, 100%);
        grid-gap: 4px;
      `;
const ComponentBox = styledComponents.styled(designSystem.Flex)`
  color: ${({ theme }) => theme.colors.neutral600};
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    transition: color 120ms ${(props) => props.theme.motion.easings.easeOutQuad};
  }

  &:focus,
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary200};
    background: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
  }
`;
const ComponentPicker = ({
  dynamicComponentsByCategory = {},
  isOpen,
  onClickAddComponent
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleAddComponentToDz = (componentUid) => () => {
    onClickAddComponent(componentUid);
  };
  if (!isOpen) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Box,
    {
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 5,
      paddingRight: 5,
      background: "neutral0",
      shadow: "tableShadow",
      borderColor: "neutral150",
      hasRadius: true,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: "neutral600", children: formatMessage({
          id: index.getTranslation("components.DynamicZone.ComponentPicker-label"),
          defaultMessage: "Pick one component"
        }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Root, { defaultValue: Object.keys(dynamicComponentsByCategory)[0], children: Object.entries(dynamicComponentsByCategory).map(([category, components], index2) => /* @__PURE__ */ jsxRuntime.jsx(
          ComponentCategory,
          {
            category,
            components,
            onAddComponent: handleAddComponentToDz,
            variant: index2 % 2 === 1 ? "primary" : "secondary"
          },
          category
        )) }) })
      ]
    }
  );
};
const DynamicComponent = ({
  componentUid,
  disabled,
  index: index$1,
  name: name2,
  onRemoveComponentClick,
  onMoveComponent,
  onGrabItem,
  onDropItem,
  onCancel,
  dynamicComponentsByCategory = {},
  onAddComponent,
  children
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const formValues = admin.useForm("DynamicComponent", (state) => state.values);
  const { currentDocument, currentDocumentMeta } = useDocumentContext("DynamicComponent");
  const rulesEngine2 = admin.createRulesEngine();
  const isDesktop = admin.useIsDesktop();
  const {
    edit: { components }
  } = useDocumentLayout(currentDocumentMeta.model);
  const title = React__namespace.useMemo(() => {
    const { mainField } = components[componentUid]?.settings ?? { mainField: "id" };
    const mainFieldValue = getIn(formValues, `${name2}.${index$1}.${mainField}`);
    const displayedValue = mainField === "id" || !mainFieldValue ? "" : String(mainFieldValue).trim();
    const mainValue = displayedValue.length > 0 ? `- ${displayedValue}` : displayedValue;
    return mainValue;
  }, [componentUid, components, formValues, name2, index$1]);
  const { icon, displayName } = React__namespace.useMemo(() => {
    const [category] = componentUid.split(".");
    const { icon: icon2, displayName: displayName2 } = (dynamicComponentsByCategory[category] ?? []).find(
      (component) => component.uid === componentUid
    ) ?? { icon: null, displayName: null };
    return { icon: icon2, displayName: displayName2 };
  }, [componentUid, dynamicComponentsByCategory]);
  const [{ handlerId, isDragging, handleKeyDown }, boxRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(!disabled, {
    type: `${ItemTypes.DYNAMIC_ZONE}_${name2}`,
    index: index$1,
    item: {
      index: index$1,
      displayedValue: `${displayName} ${title}`,
      icon
    },
    onMoveItem: onMoveComponent,
    onDropItem,
    onGrabItem,
    onCancel
  });
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage(), { captureDraggingState: false });
  }, [dragPreviewRef, index$1]);
  const accordionValue = React__namespace.useId();
  const { value = [], rawError } = admin.useField(`${name2}.${index$1}`);
  const [collapseToOpen, setCollapseToOpen] = React__namespace.useState("");
  React__namespace.useEffect(() => {
    if (rawError && value) {
      setCollapseToOpen(accordionValue);
    }
  }, [rawError, value, accordionValue]);
  const composedBoxRefs = designSystem.useComposedRefs(boxRef, dropRef);
  const accordionActions = disabled ? null : /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        variant: "ghost",
        label: formatMessage(
          {
            id: index.getTranslation("components.DynamicZone.delete-label"),
            defaultMessage: "Delete {name}"
          },
          { name: title }
        ),
        onClick: onRemoveComponentClick,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {})
      }
    ),
    isDesktop && /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        variant: "ghost",
        onClick: (e) => e.stopPropagation(),
        "data-handler-id": handlerId,
        ref: dragRef,
        label: formatMessage({
          id: index.getTranslation("components.DragHandle-label"),
          defaultMessage: "Drag"
        }),
        onKeyDown: handleKeyDown,
        children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Trigger, { size: "S", endIcon: null, paddingLeft: 0, paddingRight: 0, children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.IconButton,
        {
          variant: "ghost",
          label: formatMessage({
            id: index.getTranslation("components.DynamicZone.more-actions"),
            defaultMessage: "More actions"
          }),
          tag: "span",
          children: /* @__PURE__ */ jsxRuntime.jsx(Icons.More, { "aria-hidden": true, focusable: false })
        }
      ) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Content, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.SubRoot, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubTrigger, { children: formatMessage({
            id: index.getTranslation("components.DynamicZone.add-item-above"),
            defaultMessage: "Add component above"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubContent, { children: Object.entries(dynamicComponentsByCategory).map(([category, components2]) => /* @__PURE__ */ jsxRuntime.jsxs(React__namespace.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Label, { children: category }),
            components2.map(({ displayName: displayName2, uid }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: () => onAddComponent(uid, index$1), children: displayName2 }, uid))
          ] }, category)) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.SubRoot, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubTrigger, { children: formatMessage({
            id: index.getTranslation("components.DynamicZone.add-item-below"),
            defaultMessage: "Add component below"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.SubContent, { children: Object.entries(dynamicComponentsByCategory).map(([category, components2]) => /* @__PURE__ */ jsxRuntime.jsxs(React__namespace.Fragment, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Label, { children: category }),
            components2.map(({ displayName: displayName2, uid }) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Item, { onSelect: () => onAddComponent(uid, index$1 + 1), children: displayName2 }, uid))
          ] }, category)) })
        ] })
      ] })
    ] })
  ] });
  const accordionTitle = title ? `${displayName} ${title}` : displayName;
  return /* @__PURE__ */ jsxRuntime.jsxs(ComponentContainer, { tag: "li", width: "100%", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(Rectangle, { background: "neutral200" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(StyledBox, { ref: composedBoxRefs, hasRadius: true, children: isDragging ? /* @__PURE__ */ jsxRuntime.jsx(Preview, {}) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Root, { value: collapseToOpen, onValueChange: setCollapseToOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: accordionValue, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Header, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Accordion.Trigger,
          {
            icon: icon && COMPONENT_ICONS[icon] ? COMPONENT_ICONS[icon] : COMPONENT_ICONS.dashboard,
            children: accordionTitle
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Actions, { children: accordionActions })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: /* @__PURE__ */ jsxRuntime.jsx(AccordionContentRadius, { background: "neutral0", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 6, paddingRight: 6, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: components[componentUid]?.layout?.map((row, rowInd) => {
        const visibleFields = row.filter(({ ...field }) => {
          const condition = field.attribute.conditions?.visible;
          if (condition) {
            return rulesEngine2.evaluate(condition, value);
          }
          return true;
        });
        if (visibleFields.length === 0) {
          return null;
        }
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Grid.Item,
          {
            col: 12,
            xs: 12,
            direction: "column",
            alignItems: "stretch",
            children: /* @__PURE__ */ jsxRuntime.jsx(ResponsiveGridRoot, { gap: 4, children: visibleFields.map(({ size, ...field }) => {
              const fieldName = `${name2}.${index$1}.${field.name}`;
              const fieldWithTranslatedLabel = {
                ...field,
                label: formatMessage({
                  id: `content-manager.components.${componentUid}.${field.name}`,
                  defaultMessage: field.label
                })
              };
              return /* @__PURE__ */ jsxRuntime.jsx(
                ResponsiveGridItem,
                {
                  col: size,
                  s: 12,
                  xs: 12,
                  direction: "column",
                  alignItems: "stretch",
                  children: children ? children({
                    ...fieldWithTranslatedLabel,
                    document: currentDocument,
                    name: fieldName
                  }) : /* @__PURE__ */ jsxRuntime.jsx(
                    MemoizedInputRenderer,
                    {
                      ...fieldWithTranslatedLabel,
                      document: currentDocument,
                      name: fieldName
                    }
                  )
                },
                fieldName
              );
            }) })
          },
          rowInd
        );
      }) }) }) }) })
    ] }) }) })
  ] });
};
const StyledBox = styledComponents.styled(designSystem.Box)`
  > div:first-child {
    box-shadow: ${({ theme }) => theme.shadows.tableShadow};
  }
`;
const AccordionContentRadius = styledComponents.styled(designSystem.Box)`
  border-radius: 0 0 ${({ theme }) => theme.spaces[1]} ${({ theme }) => theme.spaces[1]};
`;
const Rectangle = styledComponents.styled(designSystem.Box)`
  width: ${({ theme }) => theme.spaces[2]};
  height: ${({ theme }) => theme.spaces[4]};
`;
const Preview = styledComponents.styled.span`
  display: block;
  background-color: ${({ theme }) => theme.colors.primary100};
  outline: 1px dashed ${({ theme }) => theme.colors.primary500};
  outline-offset: -1px;
  padding: ${({ theme }) => theme.spaces[6]};
`;
const ComponentContainer = styledComponents.styled(designSystem.Box)`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const DynamicZoneLabel = ({
  hint,
  label,
  labelAction,
  name: name2,
  numberOfComponents = 0,
  required
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      paddingTop: 3,
      paddingBottom: 3,
      paddingRight: 4,
      paddingLeft: 4,
      borderRadius: "26px",
      background: "neutral0",
      shadow: "filterShadow",
      color: "neutral500",
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", justifyContent: "center", children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { maxWidth: "35.6rem", children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", ellipsis: true, children: [
            label || name2,
            " "
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", textColor: "neutral600", fontWeight: "bold", children: [
            "(",
            numberOfComponents,
            ")"
          ] }),
          required && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "danger600", children: "*" }),
          labelAction && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 1, children: labelAction })
        ] }),
        hint && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 1, maxWidth: "35.6rem", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", ellipsis: true, children: hint }) })
      ] })
    }
  ) });
};
const [DynamicZoneProvider, useDynamicZone] = admin.createContext(
  "DynamicZone",
  {
    isInDynamicZone: false
  }
);
const DynamicZone = ({
  attribute,
  disabled: disabledProp,
  hint,
  label,
  labelAction,
  name: name2,
  required = false,
  children
}) => {
  const { max = Infinity, min = -Infinity } = attribute ?? {};
  const [addComponentIsOpen, setAddComponentIsOpen] = React__namespace.useState(false);
  const [liveText, setLiveText] = React__namespace.useState("");
  const {
    currentDocument: { components, isLoading }
  } = useDocumentContext("DynamicZone");
  const disabled = disabledProp || isLoading;
  const { addFieldRow, removeFieldRow, moveFieldRow } = admin.useForm(
    "DynamicZone",
    ({ addFieldRow: addFieldRow2, removeFieldRow: removeFieldRow2, moveFieldRow: moveFieldRow2 }) => ({
      addFieldRow: addFieldRow2,
      removeFieldRow: removeFieldRow2,
      moveFieldRow: moveFieldRow2
    })
  );
  const { value = [], error } = admin.useField(name2);
  const dynamicComponentsByCategory = React__namespace.useMemo(() => {
    return attribute.components.reduce((acc, componentUid) => {
      const { category, info } = components[componentUid] ?? { info: {} };
      const component = { uid: componentUid, displayName: info.displayName, icon: info.icon };
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category] = [...acc[category], component];
      return acc;
    }, {});
  }, [attribute.components, components]);
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = admin.useNotification();
  const dynamicDisplayedComponentsLength = value.length;
  const handleAddComponent = (uid, position) => {
    setAddComponentIsOpen(false);
    const schema = components[uid];
    const form = createDefaultForm(schema, components);
    const transformations = pipe__default.default(transformDocument(schema, components), (data2) => ({
      ...data2,
      __component: uid
    }));
    const data = transformations(form);
    addFieldRow(name2, data, position);
  };
  const handleClickOpenPicker = () => {
    if (dynamicDisplayedComponentsLength < max) {
      setAddComponentIsOpen((prev) => !prev);
    } else {
      toggleNotification({
        type: "info",
        message: formatMessage({
          id: index.getTranslation("components.notification.info.maximum-requirement")
        })
      });
    }
  };
  const handleMoveComponent = (newIndex, currentIndex) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: `${name2}.${currentIndex}`,
          position: getItemPos(newIndex)
        }
      )
    );
    moveFieldRow(name2, currentIndex, newIndex);
  };
  const getItemPos = (index2) => `${index2 + 1} of ${value.length}`;
  const handleCancel = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: `${name2}.${index$1}`
        }
      )
    );
  };
  const handleGrabItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleDropItem = (index$1) => {
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: `${name2}.${index$1}`,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleRemoveComponent = (name22, currentIndex) => () => {
    removeFieldRow(name22, currentIndex);
  };
  const hasError = error !== void 0;
  const renderButtonLabel = () => {
    if (addComponentIsOpen) {
      return formatMessage({ id: "app.utils.close-label", defaultMessage: "Close" });
    }
    if (hasError && dynamicDisplayedComponentsLength > max) {
      return formatMessage(
        {
          id: index.getTranslation(`components.DynamicZone.extra-components`),
          defaultMessage: "There {number, plural, =0 {are # extra components} one {is # extra component} other {are # extra components}}"
        },
        {
          number: dynamicDisplayedComponentsLength - max
        }
      );
    }
    if (hasError && dynamicDisplayedComponentsLength < min) {
      return formatMessage(
        {
          id: index.getTranslation(`components.DynamicZone.missing-components`),
          defaultMessage: "There {number, plural, =0 {are # missing components} one {is # missing component} other {are # missing components}}"
        },
        { number: min - dynamicDisplayedComponentsLength }
      );
    }
    return formatMessage(
      {
        id: index.getTranslation("components.DynamicZone.add-component"),
        defaultMessage: "Add a component to {componentName}"
      },
      { componentName: label || name2 }
    );
  };
  const level = useComponent("DynamicZone", (state) => state.level);
  const ariaDescriptionId = React__namespace.useId();
  return /* @__PURE__ */ jsxRuntime.jsx(DynamicZoneProvider, { isInDynamicZone: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
    dynamicDisplayedComponentsLength > 0 && /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        DynamicZoneLabel,
        {
          hint,
          label,
          labelAction,
          name: name2,
          numberOfComponents: dynamicDisplayedComponentsLength,
          required
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
        id: index.getTranslation("dnd.instructions"),
        defaultMessage: `Press spacebar to grab and re-order`
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
      /* @__PURE__ */ jsxRuntime.jsx("ol", { "aria-describedby": ariaDescriptionId, children: value.map((field, index2) => /* @__PURE__ */ jsxRuntime.jsx(
        ComponentProvider,
        {
          level: level + 1,
          uid: field.__component,
          id: field.id,
          type: "dynamiczone",
          children: /* @__PURE__ */ jsxRuntime.jsx(
            DynamicComponent,
            {
              disabled,
              name: name2,
              index: index2,
              componentUid: field.__component,
              onMoveComponent: handleMoveComponent,
              onRemoveComponentClick: handleRemoveComponent(name2, index2),
              onCancel: handleCancel,
              onDropItem: handleDropItem,
              onGrabItem: handleGrabItem,
              onAddComponent: handleAddComponent,
              dynamicComponentsByCategory,
              children
            }
          )
        },
        field.__temp_key__
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
      AddComponentButton,
      {
        hasError,
        isDisabled: disabled,
        isOpen: addComponentIsOpen,
        onClick: handleClickOpenPicker,
        children: renderButtonLabel()
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      ComponentPicker,
      {
        dynamicComponentsByCategory,
        isOpen: addComponentIsOpen,
        onClickAddComponent: handleAddComponent
      }
    )
  ] }) });
};
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
const relationsApi = contentManagerApi.injectEndpoints({
  endpoints: (build) => ({
    getRelations: build.query({
      query: ({ model, id, targetField, params }) => {
        return {
          url: `/content-manager/relations/${model}/${id}/${targetField}`,
          method: "GET",
          config: {
            params
          }
        };
      },
      serializeQueryArgs: (args) => {
        const { endpointName, queryArgs } = args;
        return {
          endpointName,
          model: queryArgs.model,
          id: queryArgs.id,
          targetField: queryArgs.targetField,
          locale: queryArgs.params?.locale,
          status: queryArgs.params?.status
        };
      },
      merge: (currentCache, newItems) => {
        if (currentCache.pagination && newItems.pagination) {
          if (currentCache.pagination.page < newItems.pagination.page) {
            currentCache.results = [
              ...prepareTempKeys(newItems.results, currentCache.results),
              ...currentCache.results
            ];
            currentCache.pagination = newItems.pagination;
          } else if (newItems.pagination.page === 1) {
            currentCache.results = prepareTempKeys(newItems.results);
            currentCache.pagination = newItems.pagination;
          }
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!currentArg?.params && !previousArg?.params) {
          return false;
        }
        return currentArg?.params?.page !== previousArg?.params?.page || currentArg?.params?.pageSize !== previousArg?.params?.pageSize;
      },
      transformResponse: (response) => {
        if ("results" in response && response.results) {
          return {
            ...response,
            results: prepareTempKeys(response.results.toReversed())
          };
        } else {
          return response;
        }
      },
      providesTags: ["Relations"]
    }),
    searchRelations: build.query({
      query: ({ model, targetField, params }) => {
        return {
          url: `/content-manager/relations/${model}/${targetField}`,
          method: "GET",
          config: {
            params
          }
        };
      },
      serializeQueryArgs: (args) => {
        const { endpointName, queryArgs } = args;
        return {
          endpointName,
          model: queryArgs.model,
          targetField: queryArgs.targetField,
          _q: queryArgs.params?._q,
          idsToOmit: queryArgs.params?.idsToOmit,
          idsToInclude: queryArgs.params?.idsToInclude
        };
      },
      merge: (currentCache, newItems) => {
        if (currentCache.pagination && newItems.pagination) {
          if (currentCache.pagination.page < newItems.pagination.page) {
            const existingIds = currentCache.results.map((item) => item.documentId);
            const uniqueNewItems = newItems.results.filter(
              (item) => !existingIds.includes(item.documentId)
            );
            currentCache.results.push(...uniqueNewItems);
            currentCache.pagination = newItems.pagination;
          } else if (newItems.pagination.page === 1) {
            currentCache.results = newItems.results;
            currentCache.pagination = newItems.pagination;
          }
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!currentArg?.params && !previousArg?.params) {
          return false;
        }
        return currentArg?.params?.page !== previousArg?.params?.page || currentArg?.params?.pageSize !== previousArg?.params?.pageSize;
      },
      transformResponse: (response) => {
        if (response.results) {
          return {
            ...response,
            results: response.results
          };
        } else {
          return response;
        }
      }
    })
  })
});
const prepareTempKeys = (relations, existingRelations = []) => {
  const [firstItem] = existingRelations.slice(0);
  const keys = fractionalIndexing.generateNKeysBetween(null, firstItem?.__temp_key__ ?? null, relations.length);
  return relations.map((datum, index2) => ({
    ...datum,
    __temp_key__: keys[index2]
  }));
};
const { useGetRelationsQuery, useLazySearchRelationsQuery, useSearchRelationsQuery } = relationsApi;
const getRelationLabel = (relation, mainField) => {
  const label = mainField && relation[mainField.name] ? relation[mainField.name] : null;
  if (typeof label === "string") {
    return label;
  }
  return relation.documentId;
};
function useHandleDisconnect(fieldName, consumerName) {
  const field = admin.useField(fieldName);
  const removeFieldRow = admin.useForm(consumerName, (state) => state.removeFieldRow);
  const addFieldRow = admin.useForm(consumerName, (state) => state.addFieldRow);
  const handleDisconnect = (relation) => {
    if (field.value && field.value.connect) {
      const indexOfRelationInConnectArray = field.value.connect.findIndex(
        (rel) => rel.id === relation.id
      );
      if (indexOfRelationInConnectArray >= 0) {
        removeFieldRow(`${fieldName}.connect`, indexOfRelationInConnectArray);
        return;
      }
    }
    addFieldRow(`${fieldName}.disconnect`, {
      id: relation.id,
      apiData: {
        id: relation.id,
        documentId: relation.documentId,
        locale: relation.locale
      }
    });
  };
  return handleDisconnect;
}
const RELATIONS_TO_DISPLAY = 50;
const ONE_WAY_RELATIONS = ["oneWay", "oneToOne", "manyToOne", "oneToManyMorph", "oneToOneMorph"];
const RelationsField = React__namespace.forwardRef(
  ({ disabled, label, ...props }, ref) => {
    const { currentDocument, currentDocumentMeta } = useDocumentContext("RelationsField");
    const [currentPage, setCurrentPage] = React__namespace.useState(1);
    const documentId = currentDocument.document?.documentId;
    const { formatMessage } = reactIntl.useIntl();
    const isMorph = props.attribute.relation.toLowerCase().includes("morph");
    const isDisabled = isMorph || disabled;
    const { componentId, componentUID } = useComponent("RelationsField", ({ uid, id: id2 }) => ({
      componentId: id2,
      componentUID: uid
    }));
    const isSubmitting = admin.useForm("RelationsList", (state) => state.isSubmitting);
    React__namespace.useEffect(() => {
      setCurrentPage(1);
    }, [isSubmitting]);
    const component = componentUID && currentDocument.components[componentUID];
    const model = component ? component.uid : currentDocumentMeta.model;
    const id = component ? componentId?.toString() : documentId;
    const [targetField] = props.name.split(".").slice(-1);
    const schemaAttributes = component ? component.attributes ?? {} : currentDocument.schema?.attributes ?? {};
    const isRelatedToCurrentDocument = Object.values(schemaAttributes).filter(
      (attribute) => attribute.type === "relation" && "target" in attribute && "target" in props.attribute && attribute.target === props.attribute.target
    ).length > 0;
    const { data, isLoading, isFetching } = useGetRelationsQuery(
      {
        model,
        targetField,
        // below we don't run the query if there is no id.
        id,
        params: {
          ...currentDocumentMeta.params,
          pageSize: RELATIONS_TO_DISPLAY,
          page: currentPage
        }
      },
      {
        refetchOnMountOrArgChange: true,
        skip: !id || !isRelatedToCurrentDocument,
        selectFromResult: (result) => {
          return {
            ...result,
            data: {
              ...result.data,
              results: result.data?.results ? result.data.results : []
            }
          };
        }
      }
    );
    const handleLoadMore = () => {
      setCurrentPage((prev) => prev + 1);
    };
    const field = admin.useField(props.name);
    const isFetchingMoreRelations = isLoading || isFetching;
    const realServerRelationsCount = "pagination" in data && data.pagination ? data.pagination.total : 0;
    const relationsConnected = (field.value?.connect ?? []).filter(
      (rel) => data.results.findIndex((relation) => relation.id === rel.id) === -1
    ).length ?? 0;
    const relationsDisconnected = field.value?.disconnect?.length ?? 0;
    const relationsCount = realServerRelationsCount + relationsConnected - relationsDisconnected;
    const relations = React__namespace.useMemo(() => {
      const ctx = {
        field: field.value,
        // @ts-expect-error – targetModel does exist on the attribute. But it's not typed.
        href: `../${index.COLLECTION_TYPES}/${props.attribute.targetModel}`,
        mainField: props.mainField
      };
      const transformations = pipe__default.default(
        removeConnected(ctx),
        removeDisconnected(ctx),
        addLabelAndHref(ctx)
      );
      const transformedRels = transformations([...data.results]);
      return [...transformedRels, ...field.value?.connect ?? []].sort((a, b) => {
        if (a.__temp_key__ < b.__temp_key__) return -1;
        if (a.__temp_key__ > b.__temp_key__) return 1;
        return 0;
      });
    }, [
      data.results,
      field.value,
      // @ts-expect-error – targetModel does exist on the attribute. But it's not typed.
      props.attribute.targetModel,
      props.mainField
    ]);
    const handleDisconnect = useHandleDisconnect(props.name, "RelationsField");
    const handleConnect = (relation) => {
      const [lastItemInList] = relations.slice(-1);
      const item = {
        id: relation.id,
        apiData: {
          id: relation.id,
          documentId: relation.documentId,
          locale: relation.locale,
          isTemporary: true
        },
        status: relation.status,
        /**
         * If there's a last item, that's the first key we use to generate out next one.
         */
        __temp_key__: fractionalIndexing.generateNKeysBetween(lastItemInList?.__temp_key__ ?? null, null, 1)[0],
        // Fallback to `id` if there is no `mainField` value, which will overwrite the above `id` property with the exact same data.
        [props.mainField?.name ?? "documentId"]: relation[props.mainField?.name ?? "documentId"],
        label: getRelationLabel(relation, props.mainField),
        // @ts-expect-error – targetModel does exist on the attribute, but it's not typed.
        href: `../${index.COLLECTION_TYPES}/${props.attribute.targetModel}/${relation.documentId}?${relation.locale ? `plugins[i18n][locale]=${relation.locale}` : ""}`
      };
      if (ONE_WAY_RELATIONS.includes(props.attribute.relation)) {
        field.value?.connect?.forEach(handleDisconnect);
        relations.forEach(handleDisconnect);
        field.onChange(`${props.name}.connect`, [item]);
      } else {
        field.onChange(`${props.name}.connect`, [...field.value?.connect ?? [], item]);
      }
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Flex,
      {
        ref,
        direction: "column",
        gap: 3,
        justifyContent: "space-between",
        alignItems: "stretch",
        wrap: "wrap",
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(StyledFlex, { direction: "column", alignItems: "start", gap: 2, width: "100%", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              RelationsInput,
              {
                disabled: isDisabled,
                id: componentUID && component ? componentId ? `${componentId}` : "" : documentId,
                label: `${label} ${relationsCount > 0 ? `(${relationsCount})` : ""}`,
                model,
                onChange: handleConnect,
                isRelatedToCurrentDocument,
                ...props
              }
            ),
            "pagination" in data && data.pagination && data.pagination.pageCount > data.pagination.page ? /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextButton,
              {
                disabled: isFetchingMoreRelations,
                onClick: handleLoadMore,
                loading: isFetchingMoreRelations,
                startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowClockwise, {}),
                shrink: 0,
                children: formatMessage({
                  id: index.getTranslation("relation.loadMore"),
                  defaultMessage: "Load More"
                })
              }
            ) : null
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            RelationsList,
            {
              data: relations,
              serverData: data.results,
              disabled: isDisabled,
              name: props.name,
              isLoading: isFetchingMoreRelations,
              relationType: props.attribute.relation,
              targetModel: props.attribute.targetModel,
              mainField: props.mainField
            }
          )
        ]
      }
    );
  }
);
const StyledFlex = styledComponents.styled(designSystem.Flex)`
  & > div {
    width: 100%;
  }
`;
const removeConnected = ({ field }) => (relations) => {
  return relations.filter((relation) => {
    const connectedRelations = field?.connect ?? [];
    return connectedRelations.findIndex((rel) => rel.id === relation.id) === -1;
  });
};
const removeDisconnected = ({ field }) => (relations) => relations.filter((relation) => {
  const disconnectedRelations = field?.disconnect ?? [];
  return disconnectedRelations.findIndex((rel) => rel.id === relation.id) === -1;
});
const addLabelAndHref = ({ mainField, href }) => (relations) => relations.map((relation) => {
  return {
    ...relation,
    // Fallback to `id` if there is no `mainField` value, which will overwrite the above `documentId` property with the exact same data.
    [mainField?.name ?? "documentId"]: relation[mainField?.name ?? "documentId"],
    label: getRelationLabel(relation, mainField),
    href: `${href}/${relation.documentId}?${relation.locale ? `plugins[i18n][locale]=${relation.locale}` : ""}`
  };
});
const RelationsInput = ({
  hint,
  id,
  model,
  label,
  labelAction,
  name: name2,
  mainField,
  placeholder,
  required,
  unique: _unique,
  "aria-label": _ariaLabel,
  onChange,
  isRelatedToCurrentDocument,
  ...props
}) => {
  const [searchParams, setSearchParams] = React__namespace.useState({
    _q: "",
    page: 1
  });
  const { toggleNotification } = admin.useNotification();
  const { currentDocumentMeta } = useDocumentContext("RelationsInput");
  const { formatMessage } = reactIntl.useIntl();
  const field = admin.useField(name2);
  const searchParamsDebounced = useDebounce(searchParams, 300);
  const [targetField] = name2.split(".").slice(-1);
  const { data, isLoading } = useSearchRelationsQuery(
    {
      model,
      targetField,
      params: {
        ...currentDocumentMeta.params,
        id: id ?? "",
        pageSize: 100,
        idsToInclude: field.value?.disconnect?.map((rel) => rel.id.toString()) ?? [],
        idsToOmit: field.value?.connect?.map((rel) => rel.id.toString()) ?? [],
        ...searchParamsDebounced
      }
    },
    {
      // Skip
      skip: !isRelatedToCurrentDocument
      // Only skip if not related, allow empty id
    }
  );
  const hasNextPage = data?.pagination ? data.pagination.page < data.pagination.pageCount : false;
  const options = data?.results ?? [];
  const handleChange = (relationId) => {
    if (!relationId) {
      return;
    }
    const relation2 = options.find((opt) => opt.id.toString() === relationId);
    if (!relation2) {
      console.error(
        "You've tried to add a relation with an id that does not exist in the options you can see, this is likely a bug with Strapi. Please open an issue."
      );
      toggleNotification({
        message: formatMessage({
          id: index.getTranslation("relation.error-adding-relation"),
          defaultMessage: "An error occurred while trying to add the relation."
        }),
        type: "danger"
      });
      return;
    }
    onChange(relation2);
  };
  const relation = {
    collectionType: index.COLLECTION_TYPES,
    // @ts-expect-error – targetModel does exist on the attribute. But it's not typed.
    model: props.attribute.targetModel,
    documentId: "",
    params: currentDocumentMeta.params
  };
  const permissions = null;
  const isLoadingPermissions = false;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error: field.error, hint, name: name2, required, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(DocumentRBAC, { permissions, model: relation.model, children: /* @__PURE__ */ jsxRuntime.jsx(
      RelationModalWithContext,
      {
        relation,
        name: name2,
        placeholder,
        hasNextPage,
        isLoadingPermissions,
        isLoadingSearchRelations: isLoading,
        handleChange,
        setSearchParams,
        data,
        mainField,
        fieldValue: field.value,
        ...props
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {}),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
  ] });
};
const ComboboxDropdownOverride = styledComponents.createGlobalStyle`
  /* Increase max-height from 15 to 40rem*/
  div[role="listbox"] {
    max-height: 40rem !important;
  }
`;
const RelationModalWithContext = ({
  relation,
  name: name2,
  placeholder,
  hasNextPage,
  isLoadingSearchRelations,
  isLoadingPermissions,
  handleChange,
  mainField,
  setSearchParams,
  fieldValue,
  data,
  ...props
}) => {
  const [textValue, setTextValue] = React__namespace.useState("");
  const { formatMessage } = reactIntl.useIntl();
  useDocumentRBAC("RelationModalWrapper", (state) => state.canCreate);
  const fieldRef = admin.useFocusInputField(name2);
  const { componentUID } = useComponent("RelationsField", ({ uid }) => ({
    componentUID: uid
  }));
  const handleLoadMore = () => {
    if (!data || !data.pagination) {
      return;
    } else if (data.pagination.page < data.pagination.pageCount) {
      setSearchParams((s) => ({ ...s, page: s.page + 1 }));
    }
  };
  const options = data?.results ?? [];
  React__namespace.useLayoutEffect(() => {
    setTextValue("");
  }, [fieldValue]);
  const handleSearch = async (search) => {
    setSearchParams((s) => ({ ...s, _q: search, page: 1 }));
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(ComboboxDropdownOverride, {}),
    /* @__PURE__ */ jsxRuntime.jsx(RelationModalRenderer, { children: ({ dispatch }) => /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Combobox,
      {
        ref: fieldRef,
        name: name2,
        autocomplete: { type: "list", filter: "contains" },
        placeholder: placeholder || formatMessage({
          id: index.getTranslation("relation.add"),
          defaultMessage: "Add relation"
        }),
        hasMoreItems: hasNextPage,
        loading: isLoadingSearchRelations || isLoadingPermissions,
        onOpenChange: () => {
          handleSearch(textValue ?? "");
        },
        noOptionsMessage: () => formatMessage({
          id: index.getTranslation("relation.notAvailable"),
          defaultMessage: "No relations available"
        }),
        loadingMessage: formatMessage({
          id: index.getTranslation("relation.isLoading"),
          defaultMessage: "Relations are loading"
        }),
        onLoadMore: handleLoadMore,
        textValue,
        onChange: handleChange,
        onTextValueChange: (text) => {
          setTextValue(text);
        },
        onInputChange: (event) => {
          handleSearch(event.currentTarget.value);
        },
        ...props,
        children: options?.map((opt) => {
          const textValue2 = getRelationLabel(opt, mainField);
          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: opt.id.toString(), textValue: textValue2, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, justifyContent: "space-between", children: [
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsx(Icons.Link, { fill: "neutral500" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, children: textValue2 })
            ] }),
            opt.status ? /* @__PURE__ */ jsxRuntime.jsx(DocumentStatus, { status: opt.status }) : null
          ] }) }, opt.id);
        })
      }
    ) })
  ] });
};
const RELATION_ITEM_HEIGHT = 50;
const RELATION_GUTTER = 4;
const RelationsList = ({
  data,
  serverData,
  disabled,
  name: name2,
  isLoading,
  relationType,
  targetModel,
  mainField
}) => {
  const ariaDescriptionId = React__namespace.useId();
  const { formatMessage } = reactIntl.useIntl();
  const listRef = React__namespace.useRef(null);
  const outerListRef = React__namespace.useRef(null);
  const [overflow, setOverflow] = React__namespace.useState();
  const [liveText, setLiveText] = React__namespace.useState("");
  const field = admin.useField(name2);
  React__namespace.useEffect(() => {
    if (data.length <= RELATIONS_TO_DISPLAY) {
      return setOverflow(void 0);
    }
    const handleNativeScroll = (e) => {
      const el = e.target;
      const parentScrollContainerHeight = el.parentNode.scrollHeight;
      const maxScrollBottom = el.scrollHeight - el.scrollTop;
      if (el.scrollTop === 0) {
        return setOverflow("bottom");
      }
      if (maxScrollBottom === parentScrollContainerHeight) {
        return setOverflow("top");
      }
      return setOverflow("top-bottom");
    };
    const outerListRefCurrent = outerListRef?.current;
    if (!isLoading && data.length > 0 && outerListRefCurrent) {
      outerListRef.current.addEventListener("scroll", handleNativeScroll);
    }
    return () => {
      if (outerListRefCurrent) {
        outerListRefCurrent.removeEventListener("scroll", handleNativeScroll);
      }
    };
  }, [isLoading, data.length]);
  const getItemPos = (index2) => `${index2 + 1} of ${data.length}`;
  const handleMoveItem = (newIndex, oldIndex) => {
    const item = data[oldIndex];
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.reorder"),
          defaultMessage: "{item}, moved. New position in list: {position}."
        },
        {
          item: item.label ?? item.documentId,
          position: getItemPos(newIndex)
        }
      )
    );
    const newData = [...data];
    const currentRow = data[oldIndex];
    const startKey = oldIndex > newIndex ? newData[newIndex - 1]?.__temp_key__ : newData[newIndex]?.__temp_key__;
    const endKey = oldIndex > newIndex ? newData[newIndex]?.__temp_key__ : newData[newIndex + 1]?.__temp_key__;
    const [newKey] = fractionalIndexing.generateNKeysBetween(startKey, endKey, 1);
    newData.splice(oldIndex, 1);
    newData.splice(newIndex, 0, { ...currentRow, __temp_key__: newKey });
    const connectedRelations = newData.reduce((acc, relation, currentIndex, array) => {
      const relationOnServer = serverData.find((oldRelation) => oldRelation.id === relation.id);
      const relationInFront = array[currentIndex + 1];
      if (!relationOnServer || relationOnServer.__temp_key__ !== relation.__temp_key__) {
        const position = relationInFront ? {
          before: relationInFront.documentId,
          locale: relationInFront.locale,
          status: "publishedAt" in relationInFront && relationInFront.publishedAt ? "published" : "draft"
        } : { end: true };
        const relationWithPosition = {
          ...relation,
          ...{
            apiData: {
              id: relation.id,
              documentId: relation.documentId ?? relation.apiData?.documentId ?? "",
              locale: relation.locale || relation.apiData?.locale,
              isTemporary: relation.apiData?.isTemporary,
              position
            }
          }
        };
        return [...acc, relationWithPosition];
      }
      return acc;
    }, []).toReversed();
    field.onChange(`${name2}.connect`, connectedRelations);
  };
  const handleGrabItem = (index$1) => {
    const item = data[index$1];
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.grab-item"),
          defaultMessage: `{item}, grabbed. Current position in list: {position}. Press up and down arrow to change position, Spacebar to drop, Escape to cancel.`
        },
        {
          item: item.label ?? item.documentId,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleDropItem = (index$1) => {
    const { href: _href, label, ...item } = data[index$1];
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.drop-item"),
          defaultMessage: `{item}, dropped. Final position in list: {position}.`
        },
        {
          item: label ?? item.documentId,
          position: getItemPos(index$1)
        }
      )
    );
  };
  const handleCancel = (index$1) => {
    const item = data[index$1];
    setLiveText(
      formatMessage(
        {
          id: index.getTranslation("dnd.cancel-item"),
          defaultMessage: "{item}, dropped. Re-order cancelled."
        },
        {
          item: item.label ?? item.documentId
        }
      )
    );
  };
  const handleDisconnect = useHandleDisconnect(name2, "RelationsList");
  const canReorder = !ONE_WAY_RELATIONS.includes(relationType);
  const dynamicListHeight = data.length > RELATIONS_TO_DISPLAY ? Math.min(data.length, RELATIONS_TO_DISPLAY) * (RELATION_ITEM_HEIGHT + RELATION_GUTTER) + RELATION_ITEM_HEIGHT / 2 : Math.min(data.length, RELATIONS_TO_DISPLAY) * (RELATION_ITEM_HEIGHT + RELATION_GUTTER);
  return /* @__PURE__ */ jsxRuntime.jsxs(ShadowBox, { $overflowDirection: overflow, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { id: ariaDescriptionId, children: formatMessage({
      id: index.getTranslation("dnd.instructions"),
      defaultMessage: `Press spacebar to grab and re-order`
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { "aria-live": "assertive", children: liveText }),
    /* @__PURE__ */ jsxRuntime.jsx(
      reactWindow.FixedSizeList,
      {
        height: dynamicListHeight,
        ref: listRef,
        outerRef: outerListRef,
        itemCount: data.length,
        itemSize: RELATION_ITEM_HEIGHT + RELATION_GUTTER,
        itemData: {
          ariaDescribedBy: ariaDescriptionId,
          canDrag: canReorder,
          disabled,
          handleCancel,
          handleDropItem,
          handleGrabItem,
          handleMoveItem,
          name: name2,
          handleDisconnect,
          relations: data,
          targetModel,
          mainField
        },
        itemKey: (index2) => data[index2].id,
        innerElementType: "ol",
        children: ListItem
      }
    )
  ] });
};
const ShadowBox = styledComponents.styled(designSystem.Box)`
  position: relative;
  overflow: hidden;
  flex: 1;

  &:before,
  &:after {
    position: absolute;
    width: 100%;
    height: 4px;
    z-index: 1;
  }

  &:before {
    /* TODO: as for DS Table component we would need this to be handled by the DS theme */
    content: '';
    background: linear-gradient(rgba(3, 3, 5, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    top: 0;
    opacity: ${({ $overflowDirection }) => $overflowDirection === "top-bottom" || $overflowDirection === "top" ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }

  &:after {
    /* TODO: as for DS Table component we would need this to be handled by the DS theme */
    content: '';
    background: linear-gradient(0deg, rgba(3, 3, 5, 0.2) 0%, rgba(0, 0, 0, 0) 100%);
    bottom: 0;
    opacity: ${({ $overflowDirection }) => $overflowDirection === "top-bottom" || $overflowDirection === "bottom" ? 1 : 0};
    transition: opacity 0.2s ease-in-out;
  }
`;
const ListItem = ({ data, index: index$1, style }) => {
  const {
    ariaDescribedBy,
    canDrag = false,
    disabled = false,
    handleCancel,
    handleDisconnect,
    handleDropItem,
    handleGrabItem,
    handleMoveItem,
    name: name2,
    relations,
    targetModel,
    mainField
  } = data;
  const isDesktop = admin.useIsDesktop();
  const { currentDocumentMeta } = useDocumentContext("RelationsField");
  const { formatMessage } = reactIntl.useIntl();
  const {
    href,
    id,
    label: originalLabel,
    status: originalStatus,
    documentId,
    apiData,
    locale
  } = relations[index$1];
  const collectionType = getCollectionType(href);
  const isTemporary = apiData?.isTemporary ?? false;
  const { document: document2 } = useDocument(
    {
      collectionType,
      model: targetModel,
      documentId: documentId ?? apiData?.documentId,
      params: currentDocumentMeta.params
    },
    { skip: !isTemporary }
  );
  const label = isTemporary && document2 ? getRelationLabel(document2, mainField) : originalLabel;
  const status = isTemporary && document2 ? document2?.status : originalStatus;
  const [{ handlerId, isDragging, handleKeyDown }, relationRef, dropRef, dragRef, dragPreviewRef] = useDragAndDrop(
    canDrag && !disabled,
    {
      type: `${ItemTypes.RELATION}_${name2}`,
      index: index$1,
      item: {
        displayedValue: label,
        status,
        id,
        index: index$1
      },
      onMoveItem: handleMoveItem,
      onDropItem: handleDropItem,
      onGrabItem: handleGrabItem,
      onCancel: handleCancel,
      dropSensitivity: DROP_SENSITIVITY.REGULAR
    }
  );
  const composedRefs = designSystem.useComposedRefs(relationRef, dragRef);
  React__namespace.useEffect(() => {
    dragPreviewRef(reactDndHtml5Backend.getEmptyImage());
  }, [dragPreviewRef]);
  const safeDocumentId = documentId ?? apiData?.documentId;
  const safeLocale = locale ?? apiData?.locale ?? null;
  const documentMeta = React__namespace.useMemo(
    () => ({
      documentId: safeDocumentId,
      model: targetModel,
      collectionType: getCollectionType(href),
      params: {
        locale: safeLocale
      }
    }),
    [safeDocumentId, href, safeLocale, targetModel]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      style,
      tag: "li",
      ref: dropRef,
      "aria-describedby": ariaDescribedBy,
      cursor: canDrag ? "all-scroll" : "default",
      children: isDragging ? /* @__PURE__ */ jsxRuntime.jsx(RelationItemPlaceholder, {}) : /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          paddingTop: 2,
          paddingBottom: 2,
          paddingLeft: canDrag ? 2 : 4,
          paddingRight: 4,
          hasRadius: true,
          borderColor: "neutral200",
          background: disabled ? "neutral150" : "neutral0",
          justifyContent: "space-between",
          ref: composedRefs,
          "data-handler-id": handlerId,
          children: [
            /* @__PURE__ */ jsxRuntime.jsxs(FlexWrapper, { gap: 1, children: [
              canDrag && isDesktop ? /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.IconButton,
                {
                  tag: "div",
                  role: "button",
                  tabIndex: 0,
                  withTooltip: false,
                  label: formatMessage({
                    id: index.getTranslation("components.RelationInput.icon-button-aria-label"),
                    defaultMessage: "Drag"
                  }),
                  variant: "ghost",
                  onKeyDown: handleKeyDown,
                  disabled,
                  children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Drag, {})
                }
              ) : null,
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { width: "100%", minWidth: 0, gap: 4, justifyContent: "space-between", children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { flex: 1, minWidth: 0, paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(RelationModalRenderer, { relation: documentMeta, children: label }) }),
                status ? /* @__PURE__ */ jsxRuntime.jsx(DocumentStatus, { status }) : null
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                onClick: () => handleDisconnect(relations[index$1]),
                disabled,
                label: formatMessage({
                  id: index.getTranslation("relation.disconnect"),
                  defaultMessage: "Remove"
                }),
                variant: "ghost",
                size: "S",
                children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, {})
              }
            ) })
          ]
        }
      )
    }
  );
};
const FlexWrapper = styledComponents.styled(designSystem.Flex)`
  width: 100%;
  /* Used to prevent endAction to be pushed out of container */
  min-width: 0;

  & > div[role='button'] {
    cursor: all-scroll;
  }
`;
styledComponents.styled.button`
  svg path {
    fill: ${({ theme, disabled }) => disabled ? theme.colors.neutral600 : theme.colors.neutral500};
  }

  &:hover svg path,
  &:focus svg path {
    fill: ${({ theme, disabled }) => !disabled && theme.colors.neutral600};
  }
`;
styledComponents.styled(designSystem.Link)`
  display: block;

  & > span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
`;
const RelationItemPlaceholder = () => /* @__PURE__ */ jsxRuntime.jsx(
  designSystem.Box,
  {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    hasRadius: true,
    borderStyle: "dashed",
    borderColor: "primary600",
    borderWidth: "1px",
    background: "primary100",
    height: `calc(100% - ${RELATION_GUTTER}px)`
  }
);
const MemoizedRelationsField = React__namespace.memo(RelationsField);
const uidApi = contentManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getDefaultUID: builder.query({
      query: ({ params, ...data }) => {
        return {
          url: "/content-manager/uid/generate",
          method: "POST",
          data,
          config: {
            params
          }
        };
      },
      transformResponse: (response) => response.data
    }),
    generateUID: builder.mutation({
      query: ({ params, ...data }) => ({
        url: "/content-manager/uid/generate",
        method: "POST",
        data,
        config: {
          params
        }
      }),
      transformResponse: (response) => response.data
    }),
    getAvailability: builder.query({
      query: ({ params, ...data }) => ({
        url: "/content-manager/uid/check-availability",
        method: "POST",
        data,
        config: {
          params
        }
      }),
      providesTags: (_res, _error, params) => [
        { type: "UidAvailability", id: params.contentTypeUID }
      ]
    })
  })
});
const { useGenerateUIDMutation, useGetDefaultUIDQuery, useGetAvailabilityQuery } = uidApi;
const UID_REGEX = /^[A-Za-z0-9-_.~]*$/;
const UIDInput = React__namespace.forwardRef(
  ({ hint, label, labelAction, name: name2, required, attribute = {}, ...props }, ref) => {
    const { currentDocumentMeta } = useDocumentContext("UIDInput");
    const allFormValues = admin.useForm("InputUID", (form) => form.values);
    const [availability, setAvailability] = React__namespace.useState();
    const [showRegenerate, setShowRegenerate] = React__namespace.useState(false);
    const isCloning = reactRouterDom.useMatch(index.CLONE_PATH) !== null;
    const field = admin.useField(name2);
    const debouncedValue = useDebounce(field.value, 300);
    const hasChanged = debouncedValue !== field.initialValue;
    const { toggleNotification } = admin.useNotification();
    const { _unstableFormatAPIError: formatAPIError } = admin.useAPIErrorHandler();
    const { formatMessage } = reactIntl.useIntl();
    const [{ query }] = admin.useQueryParams();
    const params = React__namespace.useMemo(() => buildValidParams(query), [query]);
    const { regex } = attribute;
    const validationRegExp = regex ? new RegExp(regex) : UID_REGEX;
    const {
      data: defaultGeneratedUID,
      isLoading: isGeneratingDefaultUID,
      error: apiError
    } = useGetDefaultUIDQuery(
      {
        contentTypeUID: currentDocumentMeta.model,
        field: name2,
        data: {
          id: currentDocumentMeta.documentId ?? "",
          ...allFormValues
        },
        params
      },
      {
        skip: field.value || !required
      }
    );
    React__namespace.useEffect(() => {
      if (apiError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(apiError)
        });
      }
    }, [apiError, formatAPIError, toggleNotification]);
    React__namespace.useEffect(() => {
      if (defaultGeneratedUID && field.value === void 0) {
        field.onChange(name2, defaultGeneratedUID);
      }
    }, [defaultGeneratedUID, field, name2]);
    const [generateUID, { isLoading: isGeneratingUID }] = useGenerateUIDMutation();
    const handleRegenerateClick = async () => {
      try {
        const res = await generateUID({
          contentTypeUID: currentDocumentMeta.model,
          field: name2,
          data: { id: currentDocumentMeta.documentId ?? "", ...allFormValues },
          params
        });
        if ("data" in res) {
          field.onChange(name2, res.data);
        } else {
          toggleNotification({
            type: "danger",
            message: formatAPIError(res.error)
          });
        }
      } catch (err) {
        toggleNotification({
          type: "danger",
          message: formatMessage({
            id: "notification.error",
            defaultMessage: "An error occurred."
          })
        });
      }
    };
    const {
      data: availabilityData,
      isLoading: isCheckingAvailability,
      error: availabilityError
    } = useGetAvailabilityQuery(
      {
        contentTypeUID: currentDocumentMeta.model,
        field: name2,
        value: debouncedValue ? debouncedValue.trim() : "",
        params
      },
      {
        // Don't check availability if the value is empty or wasn't changed
        skip: !Boolean(
          (hasChanged || isCloning) && debouncedValue && validationRegExp.test(debouncedValue.trim())
        )
      }
    );
    React__namespace.useEffect(() => {
      if (availabilityError) {
        toggleNotification({
          type: "warning",
          message: formatAPIError(availabilityError)
        });
      }
    }, [availabilityError, formatAPIError, toggleNotification]);
    React__namespace.useEffect(() => {
      setAvailability(availabilityData);
      let timer;
      if (availabilityData?.isAvailable) {
        timer = window.setTimeout(() => {
          setAvailability(void 0);
        }, 4e3);
      }
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }, [availabilityData]);
    const isLoading = isGeneratingDefaultUID || isGeneratingUID || isCheckingAvailability;
    const fieldRef = admin.useFocusInputField(name2);
    const composedRefs = designSystem.useComposedRefs(ref, fieldRef);
    const shouldShowAvailability = (hasChanged || isCloning) && debouncedValue != null && availability && !showRegenerate;
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { hint, name: name2, error: field.error, required, children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.TextInput,
        {
          ref: composedRefs,
          disabled: props.disabled,
          endAction: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { position: "relative", gap: 1, children: [
            shouldShowAvailability && /* @__PURE__ */ jsxRuntime.jsxs(
              TextValidation,
              {
                alignItems: "center",
                gap: 1,
                justifyContent: "flex-end",
                $available: !!availability?.isAvailable,
                "data-not-here-outer": true,
                position: "absolute",
                pointerEvents: "none",
                right: 6,
                width: "100px",
                children: [
                  availability?.isAvailable ? /* @__PURE__ */ jsxRuntime.jsx(Icons.CheckCircle, {}) : /* @__PURE__ */ jsxRuntime.jsx(Icons.WarningCircle, {}),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.Typography,
                    {
                      textColor: availability.isAvailable ? "success600" : "danger600",
                      variant: "pi",
                      children: formatMessage(
                        availability.isAvailable ? {
                          id: "content-manager.components.uid.available",
                          defaultMessage: "Available"
                        } : {
                          id: "content-manager.components.uid.unavailable",
                          defaultMessage: "Unavailable"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            !props.disabled && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
              showRegenerate && /* @__PURE__ */ jsxRuntime.jsx(TextValidation, { alignItems: "center", justifyContent: "flex-end", gap: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "primary600", variant: "pi", children: formatMessage({
                id: "content-manager.components.uid.regenerate",
                defaultMessage: "Regenerate"
              }) }) }),
              /* @__PURE__ */ jsxRuntime.jsx(
                FieldActionWrapper,
                {
                  onClick: handleRegenerateClick,
                  label: formatMessage({
                    id: "content-manager.components.uid.regenerate",
                    defaultMessage: "Regenerate"
                  }),
                  onMouseEnter: () => setShowRegenerate(true),
                  onMouseLeave: () => setShowRegenerate(false),
                  children: isLoading ? /* @__PURE__ */ jsxRuntime.jsx(LoadingWrapper, { "data-testid": "loading-wrapper", children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Loader, {}) }) : /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowClockwise, {})
                }
              )
            ] })
          ] }),
          onChange: field.onChange,
          value: field.value ?? "",
          ...props,
          type: "text"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {})
    ] });
  }
);
const FieldActionWrapper = styledComponents.styled(designSystem.Field.Action)`
  width: 1.6rem;

  svg {
    height: 1.6rem;
    width: 1.6rem;
    path {
      fill: ${({ theme }) => theme.colors.neutral400};
    }
  }

  svg:hover {
    path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const TextValidation = styledComponents.styled(designSystem.Flex)`
  svg {
    height: 1.2rem;
    width: 1.2rem;

    path {
      fill: ${({ theme, $available }) => $available ? theme.colors.success600 : theme.colors.danger600};
    }
  }
`;
const rotation = styledComponents.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;
const LoadingWrapper = styledComponents.styled(designSystem.Flex)`
  animation: ${rotation} 2s infinite linear;
`;
const MemoizedUIDInput = React__namespace.memo(UIDInput);
const md = new Markdown__default.default({
  html: true,
  // Enable HTML tags in source
  xhtmlOut: false,
  breaks: true,
  langPrefix: "language-",
  linkify: true,
  typographer: true,
  // Code from: https://github.com/markdown-it/markdown-it/blob/master/support/demo_template/index.js#L83
  highlight(str, lang) {
    if (lang && lang !== "auto" && highlight_js.getLanguage(lang)) {
      return '<pre class="hljs language-' + md.utils.escapeHtml(lang.toLowerCase()) + '"><code>' + highlight_js.highlight(lang, str, true).value + "</code></pre>";
    }
    if (lang === "auto") {
      const result = highlight_js.highlightAuto(str);
      return '<pre class="hljs language-' + md.utils.escapeHtml(result.language) + '"><code>' + result.value + "</code></pre>";
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>";
  }
}).use(abbr__default.default).use(container__default.default, "warning").use(container__default.default, "tip").use(deflist__default.default).use(emoji__default.default).use(footnote__default.default).use(ins__default.default).use(mark__default.default).use(sub__default.default).use(sup__default.default);
md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
  const caption = slf.rules.footnote_caption?.(tokens, idx, options, env, slf);
  return '<sup class="footnote-ref"><span>' + caption + "</span></sup>";
};
md.renderer.rules.footnote_anchor = () => {
  return ' <span class="footnote-backref">↩︎</span>';
};
const PreviewWysiwyg = ({ data = "" }) => {
  const html = React__namespace.useMemo(
    () => sanitizeHtml__default.default(md.render(data.replaceAll("\\n", "\n") || ""), {
      ...sanitizeHtml__default.default.defaults,
      allowedTags: false,
      allowedAttributes: {
        "*": ["href", "align", "alt", "center", "width", "height", "type", "controls", "target"],
        img: ["src", "alt"],
        source: ["src", "type"]
      }
    }),
    [data]
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Wrapper, { children: /* @__PURE__ */ jsxRuntime.jsx("div", { dangerouslySetInnerHTML: { __html: html } }) });
};
const Wrapper = styledComponents.styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral800};
  line-height: ${({ theme }) => theme.lineHeights[6]};

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-block-start: ${({ theme }) => theme.spaces[2]};
    margin-block-end: ${({ theme }) => theme.spaces[2]};
  }

  p {
    margin-bottom: ${({ theme }) => theme.spaces[2]};
  }

  h1 {
    font-size: 3.6rem;
    font-weight: 600;
  }

  h2 {
    font-size: 3rem;
    font-weight: 500;
  }

  h3 {
    font-size: 2.4rem;
    font-weight: 500;
  }

  h4 {
    font-size: 2rem;
    font-weight: 500;
  }

  strong {
    font-weight: 800;
  }

  em {
    font-style: italic;
  }

  blockquote {
    margin-top: ${({ theme }) => theme.spaces[8]};
    margin-bottom: ${({ theme }) => theme.spaces[7]};
    font-size: 1.4rem;
    font-weight: 400;
    border-left: 4px solid ${({ theme }) => theme.colors.neutral150};
    font-style: italic;
    padding: ${({ theme }) => theme.spaces[2]} ${({ theme }) => theme.spaces[5]};
  }

  img {
    max-width: 100%;
  }

  table {
    thead {
      background: ${({ theme }) => theme.colors.neutral150};

      th {
        padding: ${({ theme }) => theme.spaces[4]};
      }
    }
    tr {
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
    }
    th,
    td {
      padding: ${({ theme }) => theme.spaces[4]};
      border: 1px solid ${({ theme }) => theme.colors.neutral200};
      border-bottom: 0;
      border-top: 0;
    }
  }

  pre,
  code {
    font-size: 1.4rem;
    border-radius: 4px;
    /* 
      Hard coded since the color is the same between themes,
      theme.colors.neutral800 changes between themes.

      Matches the color of the JSON Input component.
    */
    background-color: #32324d;
    max-width: 100%;
    overflow: auto;
    padding: ${({ theme }) => theme.spaces[2]};
  }

  /* Inline code */
  p,
  pre,
  td {
    > code {
      color: #839496;
    }
  }

  ol {
    list-style-type: decimal;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ol,
    ul {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }

  ul {
    list-style-type: disc;
    margin-block-start: ${({ theme }) => theme.spaces[4]};
    margin-block-end: ${({ theme }) => theme.spaces[4]};
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: ${({ theme }) => theme.spaces[4]};

    ul,
    ol {
      margin-block-start: 0px;
      margin-block-end: 0px;
    }
  }
`;
var listRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/, emptyListRE = /^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/, unorderedListRE = /[*+-]\s/;
function newlineAndIndentContinueMarkdownList(cm) {
  if (cm.getOption("disableInput")) return CodeMirror__default.default.Pass;
  var ranges = cm.listSelections(), replacements = [];
  for (var i = 0; i < ranges.length; i++) {
    var pos = ranges[i].head;
    var eolState = cm.getStateAfter(pos.line);
    var inList = eolState.list !== false;
    var inQuote = eolState.quote !== 0;
    var line = cm.getLine(pos.line), match = listRE.exec(line);
    var cursorBeforeBullet = /^\s*$/.test(line.slice(0, pos.ch));
    if (!ranges[i].empty() || !inList && !inQuote || !match || cursorBeforeBullet) {
      cm.execCommand("newlineAndIndent");
      return;
    }
    if (emptyListRE.test(line)) {
      var endOfQuote = inQuote && />\s*$/.test(line);
      var endOfList = !/>\s*$/.test(line);
      if (endOfQuote || endOfList)
        cm.replaceRange(
          "",
          {
            line: pos.line,
            ch: 0
          },
          {
            line: pos.line,
            ch: pos.ch + 1
          }
        );
      replacements[i] = "\n";
    } else {
      var indent = match[1], after = match[5];
      var numbered = !(unorderedListRE.test(match[2]) || match[2].indexOf(">") >= 0);
      var bullet = numbered ? parseInt(match[3], 10) + 1 + match[4] : match[2].replace("x", " ");
      replacements[i] = "\n" + indent + bullet + after;
      if (numbered) incrementRemainingMarkdownListNumbers(cm, pos);
    }
  }
  cm.replaceSelections(replacements);
}
function incrementRemainingMarkdownListNumbers(cm, pos) {
  var startLine = pos.line, lookAhead = 0, skipCount = 0;
  var startItem = listRE.exec(cm.getLine(startLine)), startIndent = startItem[1];
  do {
    lookAhead += 1;
    var nextLineNumber = startLine + lookAhead;
    var nextLine = cm.getLine(nextLineNumber);
    var nextItem = listRE.exec(nextLine);
    if (nextItem) {
      var nextIndent = nextItem[1];
      var newNumber = parseInt(startItem[3], 10) + lookAhead - skipCount;
      var nextNumber = parseInt(nextItem[3], 10), itemNumber = nextNumber;
      if (startIndent === nextIndent && !isNaN(nextNumber)) {
        if (newNumber === nextNumber) itemNumber = nextNumber + 1;
        if (newNumber > nextNumber) itemNumber = newNumber + 1;
        cm.replaceRange(
          nextLine.replace(listRE, nextIndent + itemNumber + nextItem[4] + nextItem[5]),
          {
            line: nextLineNumber,
            ch: 0
          },
          {
            line: nextLineNumber,
            ch: nextLine.length
          }
        );
      } else {
        if (startIndent.length > nextIndent.length) return;
        if (startIndent.length < nextIndent.length && lookAhead === 1) return;
        skipCount += 1;
      }
    }
  } while (nextItem);
}
const Editor = React__namespace.forwardRef(
  ({
    disabled,
    editorRef,
    error,
    isPreviewMode,
    isExpandMode,
    name: name2,
    onChange,
    placeholder,
    textareaRef,
    value
  }, forwardedRef) => {
    const onChangeRef = React__namespace.useRef(onChange);
    React__namespace.useEffect(() => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
      }
      editorRef.current = CodeMirror__default.default.fromTextArea(textareaRef.current, {
        lineWrapping: true,
        extraKeys: {
          Enter: "newlineAndIndentContinueMarkdownList",
          Tab: false,
          "Shift-Tab": false
        },
        readOnly: false,
        smartIndent: false,
        placeholder,
        spellcheck: true,
        inputStyle: "contenteditable"
      });
      CodeMirror__default.default.commands.newlineAndIndentContinueMarkdownList = newlineAndIndentContinueMarkdownList;
      editorRef.current.on("change", (doc) => {
        onChangeRef.current(name2, doc.getValue());
      });
    }, [editorRef, textareaRef, name2, placeholder]);
    React__namespace.useEffect(() => {
      if (value && !editorRef.current.hasFocus()) {
        editorRef.current.setValue(value);
      }
    }, [editorRef, value]);
    React__namespace.useEffect(() => {
      if (isPreviewMode || disabled) {
        editorRef.current.setOption("readOnly", "nocursor");
      } else {
        editorRef.current.setOption("readOnly", false);
      }
    }, [disabled, isPreviewMode, editorRef]);
    React__namespace.useEffect(() => {
      if (error) {
        editorRef.current.setOption("screenReaderLabel", error);
      } else {
        editorRef.current.setOption("screenReaderLabel", "Editor");
      }
    }, [editorRef, error]);
    React__namespace.useImperativeHandle(
      forwardedRef,
      () => ({
        focus() {
          editorRef.current.getInputField().focus();
        },
        scrollIntoView(args) {
          editorRef.current.getInputField().scrollIntoView(args);
        }
      }),
      [editorRef]
    );
    return /* @__PURE__ */ jsxRuntime.jsxs(EditorAndPreviewWrapper, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(EditorStylesContainer, { $isExpandMode: isExpandMode, $disabled: disabled || isPreviewMode, children: /* @__PURE__ */ jsxRuntime.jsx("textarea", { ref: textareaRef }) }),
      isPreviewMode && /* @__PURE__ */ jsxRuntime.jsx(PreviewWysiwyg, { data: value })
    ] });
  }
);
const EditorAndPreviewWrapper = styledComponents.styled.div`
  position: relative;
  height: calc(100% - 48px);
`;
const EditorStylesContainer = styledComponents.styled.div`
  cursor: ${({ $disabled }) => $disabled ? "not-allowed !important" : "auto"};
  height: 100%;
  /* BASICS */
  .CodeMirror-placeholder {
    color: ${({ theme }) => theme.colors.neutral600} !important;
  }

  .CodeMirror {
    /* Set height, width, borders, and global font properties here */
    font-size: 1.4rem;
    height: ${({ $isExpandMode }) => $isExpandMode ? "100%" : "410px"}; //  512px(total height) - 48px (header) - 52px(footer) - 2px border
    color: ${({ theme }) => theme.colors.neutral800};
    direction: ltr;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  /* PADDING */

  .CodeMirror-lines {
    padding: ${({ theme }) => `${theme.spaces[3]} ${theme.spaces[4]}`};
    /* Vertical padding around content */
  }

  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    /* The little square between H and V scrollbars */
    background-color: ${({ theme }) => `${theme.colors.neutral0}`};
  }

  /* GUTTER */

  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap;
  }
  .CodeMirror-linenumbers {
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }

  .CodeMirror-guttermarker {
    color: black;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999;
  }

  /* CURSOR */

  .CodeMirror-cursor {
    border-left: 1px solid black;
    border-right: none;
    width: 0;
  }
  /* Shown when moving in bi-directional text */
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    /* z-index: 1; */
  }

  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }

  /* Can style cursor different in overwrite (non-insert) mode */
  .CodeMirror-overwrite .CodeMirror-cursor {
  }

  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }

  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: 0;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }

  /* DEFAULT THEME */

  .cm-header,
  .cm-strong {
    font-weight: bold;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }

  .CodeMirror-composing {
    border-bottom: 2px solid;
  }

  /* Default styles for common addons */

  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }

  /* STOP */

  /* The rest of this file contains styles related to the mechanics of
    the editor. You probably shouldn't touch them. */

  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: ${({ theme }) => `${theme.colors.neutral0}`};
  }

  .CodeMirror-scroll {
    overflow: scroll !important; /* Things will break if this is overridden */
    /* 50px is the magic margin used to hide the element's real scrollbars */
    /* See overflow: hidden in .CodeMirror */
    margin-bottom: -50px;
    margin-right: -50px;
    padding-bottom: 50px;
    height: 100%;
    outline: none; /* Prevent dragging from highlighting the element */
    position: relative;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 50px solid transparent;
  }

  /* The fake, visible scrollbars. Used to force redraw during scrolling
    before actual scrolling happens, thus preventing shaking and
    flickering artifacts. */
  .CodeMirror-vscrollbar,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    position: absolute;
    z-index: 1;
    display: none;
    outline: none;
  }

  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }

  .CodeMirror-lines {
    cursor: text;
    min-height: 1px; /* prevents collapsing before first draw */
  }
  /* Reset some styles that the rest of the page might have set */
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: 1.5;
    color: inherit;
    /* z-index: 2; */
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }

  .CodeMirror pre.CodeMirror-line-like {
    z-index: 2;
  }

  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }

  .CodeMirror-linewidget {
    position: relative;
    /* z-index: 2; */
    padding: 0.1px; /* Force widget margins to stay inside of the container */
  }

  .CodeMirror-widget {
  }

  .CodeMirror-rtl pre {
    direction: rtl;
  }

  .CodeMirror-code {
    outline: none;
  }

  /* Force content-box sizing for the elements where we expect it */
  .CodeMirror-scroll,
  .CodeMirror-sizer,
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }

  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
    border-color: ${({ theme }) => `${theme.colors.neutral800}`};
  }
  .CodeMirror-measure pre {
    position: static;
  }

  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    + div {
      z-index: 0 !important;
    }
  }

  div.CodeMirror-dragcursors {
    visibility: visible;
  }

  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }

  .CodeMirror-selected {
    background: ${({ theme }) => theme.colors.neutral200};
    /* z-index: -10; */
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }

  /* Used to force a border model for a node */
  .cm-force-border {
    padding-right: 0.1px;
  }

  /* See issue #2901 */
  .cm-tab-wrap-hack:after {
    content: '';
  }

  /* Help users use markselection to safely style text background */
  span.CodeMirror-selectedtext {
    background: none;
  }

  span {
    color: ${({ theme }) => theme.colors.neutral800} !important;
  }
`;
const EditorLayout = ({
  children,
  isExpandMode,
  error,
  previewContent = "",
  onCollapse
}) => {
  const { formatMessage } = reactIntl.useIntl();
  if (isExpandMode) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Root, { open: isExpandMode, onOpenChange: onCollapse, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Content, { style: { maxWidth: "unset", width: "unset" }, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: "90dvh", width: "90dvw", alignItems: "flex-start", children: [
      /* @__PURE__ */ jsxRuntime.jsx(BoxWithBorder, { flex: "1", height: "100%", children }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "start", direction: "column", flex: 1, height: "100%", width: "100%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Flex,
          {
            height: "4.8rem",
            background: "neutral100",
            justifyContent: "flex-end",
            shrink: 0,
            width: "100%",
            children: /* @__PURE__ */ jsxRuntime.jsxs(ExpandButton$1, { onClick: onCollapse, variant: "tertiary", size: "M", children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
                id: "components.Wysiwyg.collapse",
                defaultMessage: "Collapse"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(Icons.Collapse, {})
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "relative", height: "100%", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(PreviewWysiwyg, { data: previewContent }) })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      borderColor: error ? "danger600" : "neutral200",
      borderStyle: "solid",
      borderWidth: "1px",
      hasRadius: true,
      direction: "column",
      alignItems: "stretch",
      children
    }
  );
};
const BoxWithBorder = styledComponents.styled(designSystem.Box)`
  border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
`;
const ExpandButton$1 = styledComponents.styled(designSystem.Button)`
  background-color: transparent;
  border: none;
  align-items: center;

  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};

    path {
      fill: ${({ theme }) => theme.colors.neutral700};
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
const replaceText = (markdownName, textToChange) => {
  let editedText;
  switch (markdownName) {
    case "Strikethrough":
      editedText = `~~${textToChange}~~`;
      break;
    case "Bold":
      editedText = `**${textToChange}**`;
      break;
    case "Italic":
      editedText = `_${textToChange}_`;
      break;
    case "Underline":
      editedText = `<u>${textToChange}</u>`;
      break;
    case "Code":
      editedText = `\`\`\`
${textToChange}
\`\`\``;
      break;
    case "Link":
      editedText = `[${textToChange}](link)`;
      break;
    case "Quote":
      editedText = `>${textToChange}`;
      break;
    default:
      editedText = textToChange;
  }
  return editedText;
};
const insertText = (markdownName) => {
  let editedText;
  const selection = { start: markdownName.length, end: 0 };
  switch (markdownName) {
    case "Strikethrough":
      editedText = `~~${markdownName}~~`;
      selection.end = 2;
      break;
    case "Bold":
      editedText = `**${markdownName}**`;
      selection.end = 2;
      break;
    case "Italic":
      editedText = `_${markdownName}_`;
      selection.end = 1;
      break;
    case "alt":
      editedText = `[${markdownName}]()`;
      selection.end = 3;
      break;
    case "Underline":
      editedText = `<u>${markdownName}</u>`;
      selection.end = 4;
      break;
    case "Code":
      editedText = `\`\`\`
${markdownName}
\`\`\``;
      selection.end = 3;
      break;
    case "Link":
      editedText = `[${markdownName}](link)`;
      selection.end = 7;
      break;
    case "Quote":
      editedText = `>${markdownName}`;
      selection.end = 0;
      break;
    default:
      editedText = "";
  }
  return { editedText, selection };
};
const insertListOrTitle = (markdown) => {
  let textToInsert;
  switch (markdown) {
    case "BulletList":
      textToInsert = "- ";
      break;
    case "NumberList":
      textToInsert = "1. ";
      break;
    case "h1":
      textToInsert = "# ";
      break;
    case "h2":
      textToInsert = "## ";
      break;
    case "h3":
      textToInsert = "### ";
      break;
    case "h4":
      textToInsert = "#### ";
      break;
    case "h5":
      textToInsert = "##### ";
      break;
    case "h6":
      textToInsert = "###### ";
      break;
    default:
      return "";
  }
  return textToInsert;
};
const markdownHandler = (editor, markdownType) => {
  const textToEdit = editor.current.getSelection();
  let textToInsert;
  if (textToEdit) {
    const editedText = replaceText(markdownType, textToEdit);
    editor.current.replaceSelection(editedText);
    editor.current.focus();
  } else {
    textToInsert = insertText(markdownType);
    editor.current.replaceSelection(textToInsert.editedText);
    editor.current.focus();
    const { line, ch } = editor.current.getCursor();
    const endSelection = ch - textToInsert.selection.end;
    const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;
    editor.current.setSelection({ line, ch: startSelection }, { line, ch: endSelection });
  }
};
const listHandler = (editor, listType) => {
  const doc = editor.current.getDoc();
  const insertion = listType === "BulletList" ? "- " : "1. ";
  if (doc.somethingSelected()) {
    const selections = doc.listSelections();
    let remove = null;
    editor.current.operation(function() {
      selections.forEach(function(selection) {
        const pos = [selection.head.line, selection.anchor.line].sort();
        if (remove == null) {
          remove = doc.getLine(pos[0]).startsWith(insertion);
        }
        for (let i = pos[0]; i <= pos[1]; i++) {
          if (remove) {
            if (doc.getLine(i).startsWith(insertion)) {
              doc.replaceRange("", { line: i, ch: 0 }, { line: i, ch: insertion.length });
            }
          } else {
            const lineInsertion = listType === "BulletList" ? "- " : `${i + 1}. `;
            doc.replaceRange(lineInsertion, { line: i, ch: 0 });
          }
        }
      });
    });
  } else {
    const { line: currentLine } = doc.getCursor();
    const listToInsert = insertListOrTitle(listType);
    const lineContent = editor.current.getLine(currentLine);
    const textToInsert = listToInsert + lineContent;
    editor.current.setSelection(
      { line: currentLine, ch: 0 },
      { line: currentLine, ch: lineContent.length }
    );
    editor.current.replaceSelection(textToInsert);
  }
  editor.current.focus();
};
const titleHandler = (editor, titleType) => {
  const { line: currentLine } = editor.current.getCursor();
  const titleToInsert = insertListOrTitle(titleType);
  const lineContent = editor.current.getLine(currentLine);
  const lineWithNoTitle = lineContent.replace(/#{1,6}\s/g, "").trim();
  const textToInsert = titleToInsert + lineWithNoTitle;
  editor.current.setSelection(
    { line: currentLine, ch: 0 },
    { line: currentLine, ch: lineContent.length }
  );
  editor.current.replaceSelection(textToInsert);
  setTimeout(() => {
    const newLastLineLength = editor.current.getLine(currentLine).length;
    editor.current.focus();
    editor.current.setCursor({ line: currentLine, ch: newLastLineLength });
  }, 0);
};
const insertFile = (editor, files) => {
  let { line } = editor.current.getCursor();
  const { ch } = editor.current.getCursor();
  files.forEach((file, i) => {
    let contentLength = editor.current.getLine(line).length;
    editor.current.setCursor({ line, ch: contentLength });
    if (i > 0 || i === 0 && ch !== 0) {
      contentLength = editor.current.getLine(line).length;
      editor.current.setCursor({ line, ch: contentLength });
      line++;
      editor.current.replaceSelection("\n");
    }
    if (file.mime.includes("image")) {
      editor.current.replaceSelection(`![${file.alt}](${file.url})`);
    } else {
      editor.current.replaceSelection(`[${file.alt}](${file.url})`);
    }
  });
  setTimeout(() => editor.current.focus(), 0);
};
const insertWithTextToEdit = (editor, markdownType, line, contentLength, textToEdit) => {
  const textToInsert = replaceText(markdownType, textToEdit);
  const contentToMove = editor.current.getRange(
    { line: line + 1, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.replaceRange("", { line: line + 1, ch: 0 }, { line: Infinity, ch: Infinity });
  editor.current.replaceSelection("");
  editor.current.setCursor({ line, ch: contentLength });
  editor.current.replaceSelection("\n");
  editor.current.replaceSelection(textToInsert);
  if (markdownType === "Code") {
    const { line: newLine } = editor.current.getCursor();
    editor.current.setCursor({ line: newLine - 1, ch: textToEdit.length });
  }
  editor.current.replaceRange(
    contentToMove,
    { line: line + 4, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.focus();
};
const insertWithoutTextToEdit = (editor, markdownType, line, contentLength) => {
  const textToInsert = insertText(markdownType);
  const contentToMove = editor.current.getRange(
    { line: line + 1, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.replaceRange("", { line: line + 1, ch: 0 }, { line: Infinity, ch: Infinity });
  editor.current.setCursor({ line, ch: contentLength });
  editor.current.replaceSelection("\n");
  editor.current.replaceSelection(textToInsert.editedText);
  if (markdownType === "Code") {
    line += 2;
    editor.current.setSelection({ line, ch: 0 }, { line, ch: 4 });
  } else {
    line += 1;
    const { ch } = editor.current.getCursor();
    const endSelection = ch - textToInsert.selection.end;
    const startSelection = ch - textToInsert.selection.end - textToInsert.selection.start;
    editor.current.setSelection({ line, ch: startSelection }, { line, ch: endSelection });
  }
  editor.current.replaceRange(
    contentToMove,
    { line: line + 2, ch: 0 },
    { line: Infinity, ch: Infinity }
  );
  editor.current.focus();
};
const quoteAndCodeHandler = (editor, markdownType) => {
  const textToEdit = editor.current.getSelection();
  const { line } = editor.current.getCursor();
  const contentLength = editor.current.getLine(line).length;
  if (textToEdit) {
    insertWithTextToEdit(editor, markdownType, line, contentLength, textToEdit);
  } else {
    insertWithoutTextToEdit(editor, markdownType, line, contentLength);
  }
};
styledComponents.styled(designSystem.IconButtonGroup)`
  margin-left: ${({ theme }) => theme.spaces[4]};
`;
styledComponents.styled(designSystem.IconButton)`
  margin: ${({ theme }) => `0 ${theme.spaces[2]}`};
`;
styledComponents.styled(designSystem.IconButtonGroup)`
  margin-right: ${({ theme }) => `${theme.spaces[2]}`};
`;
const ExpandButton = styledComponents.styled(designSystem.Button)`
  background-color: transparent;
  border: none;
  align-items: center;

  & > span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
  }

  svg {
    margin-left: ${({ theme }) => `${theme.spaces[2]}`};
    path {
      fill: ${({ theme }) => theme.colors.neutral700};
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
const WysiwygFooter = ({ onToggleExpand }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 2, background: "neutral100", borderRadius: `0 0 0.4rem 0.4rem`, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", alignItems: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsxs(ExpandButton, { id: "expand", onClick: onToggleExpand, variant: "tertiary", size: "M", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral800", children: formatMessage({
      id: "components.WysiwygBottomControls.fullscreen",
      defaultMessage: "Expand"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Icons.Expand, {})
  ] }) }) });
};
const WysiwygNav = ({
  disabled,
  editorRef,
  isPreviewMode,
  onToggleMediaLib,
  onTogglePreviewMode
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const isDisabled = disabled || isPreviewMode;
  const handleActionClick = (value, currentEditorRef) => {
    switch (value) {
      case "Link": {
        markdownHandler(currentEditorRef, value);
        break;
      }
      case "Code":
      case "Quote": {
        quoteAndCodeHandler(currentEditorRef, value);
        break;
      }
      case "Bold":
      case "Italic":
      case "Underline":
      case "Strikethrough": {
        markdownHandler(currentEditorRef, value);
        break;
      }
      case "BulletList":
      case "NumberList": {
        listHandler(currentEditorRef, value);
        break;
      }
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6": {
        titleHandler(currentEditorRef, value);
        break;
      }
    }
  };
  const observedComponents = [
    {
      toolbar: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.IconButtonGroup, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Bold", editorRef),
            label: formatMessage({
              id: "components.Blocks.modifiers.bold",
              defaultMessage: "Bold"
            }),
            name: formatMessage({
              id: "components.Blocks.modifiers.bold",
              defaultMessage: "Bold"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Bold, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Italic", editorRef),
            label: formatMessage({
              id: "components.Blocks.modifiers.italic",
              defaultMessage: "Italic"
            }),
            name: formatMessage({
              id: "components.Blocks.modifiers.italic",
              defaultMessage: "Italic"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Italic, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Underline", editorRef),
            label: formatMessage({
              id: "components.Blocks.modifiers.underline",
              defaultMessage: "Underline"
            }),
            name: formatMessage({
              id: "components.Blocks.modifiers.underline",
              defaultMessage: "Underline"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Underline, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Strikethrough", editorRef),
            label: formatMessage({
              id: "components.Blocks.modifiers.strikethrough",
              defaultMessage: "Strikethrough"
            }),
            name: formatMessage({
              id: "components.Blocks.modifiers.strikethrough",
              defaultMessage: "Strikethrough"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.StrikeThrough, {})
          }
        )
      ] }),
      menu: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Bold, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Bold", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.modifiers.bold",
              defaultMessage: "Bold"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Italic, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Italic", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.modifiers.italic",
              defaultMessage: "Italic"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Underline, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Underline", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.modifiers.underline",
              defaultMessage: "Underline"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.StrikeThrough, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Strikethrough", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.modifiers.strikethrough",
              defaultMessage: "Strikethrough"
            }) })
          }
        )
      ] }),
      key: "formatting-group-1"
    },
    {
      toolbar: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.IconButtonGroup, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("BulletList", editorRef),
            label: formatMessage({
              id: "components.Blocks.blocks.bulletList",
              defaultMessage: "Bulleted list"
            }),
            name: formatMessage({
              id: "components.Blocks.blocks.bulletList",
              defaultMessage: "Bulleted list"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.BulletList, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("NumberList", editorRef),
            label: formatMessage({
              id: "components.Blocks.blocks.numberList",
              defaultMessage: "Numbered list"
            }),
            name: formatMessage({
              id: "components.Blocks.blocks.numberList",
              defaultMessage: "Numbered list"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.NumberList, {})
          }
        )
      ] }),
      menu: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.BulletList, { fill: "neutral500" }),
            onSelect: () => handleActionClick("BulletList", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.blocks.unorderedList",
              defaultMessage: "Bulleted list"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.NumberList, { fill: "neutral500" }),
            onSelect: () => handleActionClick("NumberList", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.blocks.orderedList",
              defaultMessage: "Numbered list"
            }) })
          }
        )
      ] }),
      key: "formatting-group-2"
    },
    {
      toolbar: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.IconButtonGroup, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Code", editorRef),
            label: formatMessage({
              id: "components.Wysiwyg.blocks.code",
              defaultMessage: "Code"
            }),
            name: formatMessage({
              id: "components.Wysiwyg.blocks.code",
              defaultMessage: "Code"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Code, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => {
              onToggleMediaLib();
            },
            label: formatMessage({
              id: "components.Blocks.blocks.image",
              defaultMessage: "Image"
            }),
            name: formatMessage({
              id: "components.Blocks.blocks.image",
              defaultMessage: "Image"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Image, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Link", editorRef),
            label: formatMessage({
              id: "components.Blocks.popover.link",
              defaultMessage: "Link"
            }),
            name: formatMessage({
              id: "components.Blocks.popover.link",
              defaultMessage: "Link"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Link, {})
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            disabled: isDisabled,
            onClick: () => handleActionClick("Quote", editorRef),
            label: formatMessage({
              id: "components.Blocks.blocks.quote",
              defaultMessage: "Quote"
            }),
            name: formatMessage({
              id: "components.Blocks.blocks.quote",
              defaultMessage: "Quote"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(Icons.Quotes, {})
          }
        )
      ] }),
      menu: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Menu.Separator, {}),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Code, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Code", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Wysiwyg.blocks.code",
              defaultMessage: "Code"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Image, { fill: "neutral500" }),
            onSelect: () => {
              onToggleMediaLib();
            },
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.blocks.image",
              defaultMessage: "Image"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Link, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Link", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.popover.link",
              defaultMessage: "Link"
            }) })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Menu.Item,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Quotes, { fill: "neutral500" }),
            onSelect: () => handleActionClick("Quote", editorRef),
            disabled: isDisabled,
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "span", gap: 2, children: formatMessage({
              id: "components.Blocks.blocks.quote",
              defaultMessage: "Quote"
            }) })
          }
        )
      ] }),
      key: "formatting-group-3"
    }
  ];
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      padding: 2,
      background: "neutral100",
      justifyContent: "space-between",
      borderRadius: "0.4rem 0.4rem 0 0",
      width: "100%",
      gap: 4,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.SingleSelect,
          {
            disabled: isDisabled,
            placeholder: formatMessage({
              id: "components.Wysiwyg.selectOptions.title",
              defaultMessage: "Headings"
            }),
            "aria-label": formatMessage({
              id: "components.Wysiwyg.selectOptions.title",
              defaultMessage: "Headings"
            }),
            onChange: (value) => handleActionClick(value, editorRef),
            size: "S",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h1", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.HeadingOne, { fill: "neutral500" }), children: formatMessage({
                id: "components.Wysiwyg.selectOptions.H1",
                defaultMessage: "Heading 1"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h2", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.HeadingTwo, { fill: "neutral500" }), children: formatMessage({
                id: "components.Wysiwyg.selectOptions.H2",
                defaultMessage: "Heading 2"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h3", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.HeadingThree, { fill: "neutral500" }), children: formatMessage({
                id: "components.Wysiwyg.selectOptions.H3",
                defaultMessage: "Heading 3"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h4", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.HeadingFour, { fill: "neutral500" }), children: formatMessage({
                id: "components.Wysiwyg.selectOptions.H4",
                defaultMessage: "Heading 4"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h5", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.HeadingFive, { fill: "neutral500" }), children: formatMessage({
                id: "components.Wysiwyg.selectOptions.H5",
                defaultMessage: "Heading 5"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.SingleSelectOption, { value: "h6", startIcon: /* @__PURE__ */ jsxRuntime.jsx(Icons.HeadingSix, { fill: "neutral500" }), children: formatMessage({
                id: "components.Wysiwyg.selectOptions.H6",
                defaultMessage: "Heading 6"
              }) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { width: "100%", justifyContent: "space-between", overflow: "hidden", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 2, overflow: "hidden", width: "100%", children: /* @__PURE__ */ jsxRuntime.jsx(
            EditorToolbarObserver,
            {
              menuTriggerVariant: "tertiary",
              observedComponents
            }
          ) }),
          onTogglePreviewMode && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onTogglePreviewMode, variant: "tertiary", minWidth: "132px", children: isPreviewMode ? formatMessage({
            id: "components.Wysiwyg.ToggleMode.markdown-mode",
            defaultMessage: "Markdown mode"
          }) : formatMessage({
            id: "components.Wysiwyg.ToggleMode.preview-mode",
            defaultMessage: "Preview mode"
          }) })
        ] })
      ]
    }
  );
};
const Wysiwyg = React__namespace.forwardRef(
  ({ hint, disabled, label, name: name2, placeholder, required, labelAction }, forwardedRef) => {
    const field = admin.useField(name2);
    const textareaRef = React__namespace.useRef(null);
    const editorRef = React__namespace.useRef(
      null
    );
    const [isPreviewMode, setIsPreviewMode] = React__namespace.useState(false);
    const [mediaLibVisible, setMediaLibVisible] = React__namespace.useState(false);
    const [isExpandMode, setIsExpandMode] = React__namespace.useState(false);
    const components = admin.useStrapiApp("ImageDialog", (state) => state.components);
    const MediaLibraryDialog = components["media-library"];
    const handleToggleMediaLib = () => setMediaLibVisible((prev) => !prev);
    const handleTogglePreviewMode = () => setIsPreviewMode((prev) => !prev);
    const handleToggleExpand = () => {
      setIsPreviewMode(false);
      setIsExpandMode((prev) => !prev);
    };
    const handleSelectAssets = (files) => {
      const formattedFiles = files.map((f) => ({
        alt: f.alternativeText || f.name,
        url: prefixFileUrlWithBackendUrl(f.url),
        mime: f.mime
      }));
      insertFile(editorRef, formattedFiles);
      setMediaLibVisible(false);
    };
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name: name2, hint, error: field.error, required, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { action: labelAction, children: label }),
        /* @__PURE__ */ jsxRuntime.jsxs(
          EditorLayout,
          {
            isExpandMode,
            error: field.error,
            previewContent: field.value,
            onCollapse: handleToggleExpand,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                WysiwygNav,
                {
                  isExpandMode,
                  editorRef,
                  isPreviewMode,
                  onToggleMediaLib: handleToggleMediaLib,
                  onTogglePreviewMode: isExpandMode ? void 0 : handleTogglePreviewMode,
                  disabled
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                Editor,
                {
                  disabled,
                  isExpandMode,
                  editorRef,
                  error: field.error,
                  isPreviewMode,
                  name: name2,
                  onChange: field.onChange,
                  placeholder,
                  textareaRef,
                  value: field.value,
                  ref: forwardedRef
                }
              ),
              !isExpandMode && /* @__PURE__ */ jsxRuntime.jsx(WysiwygFooter, { onToggleExpand: handleToggleExpand })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Hint, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
      ] }),
      mediaLibVisible && // @ts-expect-error – TODO: fix this way of injecting because it's not really typeable without a registry.
      /* @__PURE__ */ jsxRuntime.jsx(MediaLibraryDialog, { onClose: handleToggleMediaLib, onSelectAssets: handleSelectAssets })
    ] });
  }
);
const MemoizedWysiwyg = React__namespace.memo(Wysiwyg);
const BaseInputRenderer = ({
  visible,
  hint: providedHint,
  document: document2,
  ...inputProps
}) => {
  const localeKey = document2?.document?.locale || "default";
  const { currentDocumentMeta } = useDocumentContext("DynamicComponent");
  const {
    edit: { components }
  } = useDocumentLayout(currentDocumentMeta.model);
  const collectionType = document2.schema?.kind === "collectionType" ? "collection-types" : "single-types";
  useDynamicZone("isInDynamicZone", (state) => state.isInDynamicZone);
  useHasInputPopoverParent();
  const isFormDisabled = admin.useForm("InputRenderer", (state) => state.disabled);
  document2.document?.documentId;
  if (collectionType === index.SINGLE_TYPES) {
    document2?.document?.documentId;
  }
  const previewProps = usePreviewInputManager(inputProps.name, inputProps.attribute);
  const props = { ...inputProps, ...previewProps };
  const fields = admin.useStrapiApp("InputRenderer", (app) => app.fields);
  const { lazyComponentStore } = useLazyComponents(
    attributeHasCustomFieldProperty(props.attribute) ? [props.attribute.customField] : void 0
  );
  const hint = useFieldHint(providedHint, props.attribute);
  const field = admin.useField(props.name);
  if (!visible) {
    return null;
  }
  const fieldIsDisabled = props.disabled || isFormDisabled;
  if (attributeHasCustomFieldProperty(props.attribute)) {
    const CustomInput = lazyComponentStore[props.attribute.customField];
    if (CustomInput) {
      return /* @__PURE__ */ jsxRuntime.jsx(
        CustomInput,
        {
          ...props,
          ...field,
          hint,
          disabled: fieldIsDisabled
        }
      );
    }
    return /* @__PURE__ */ jsxRuntime.jsx(
      admin.InputRenderer,
      {
        ...props,
        ...previewProps,
        hint,
        type: props.attribute.customField,
        disabled: fieldIsDisabled
      },
      `input-${props.name}-${localeKey}`
    );
  }
  const addedInputTypes = Object.keys(fields);
  if (!attributeHasCustomFieldProperty(props.attribute) && addedInputTypes.includes(props.type)) {
    const CustomInput = fields[props.type];
    return /* @__PURE__ */ jsxRuntime.jsx(
      CustomInput,
      {
        ...props,
        hint,
        disabled: fieldIsDisabled
      },
      `input-${props.name}-${localeKey}`
    );
  }
  switch (props.type) {
    case "blocks":
      return /* @__PURE__ */ jsxRuntime.jsx(
        MemoizedBlocksInput,
        {
          ...props,
          hint,
          type: props.type,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
    case "component":
      return /* @__PURE__ */ jsxRuntime.jsx(
        MemoizedComponentInput,
        {
          ...props,
          hint,
          layout: components[props.attribute.component].layout,
          disabled: fieldIsDisabled,
          children: (componentInputProps) => /* @__PURE__ */ jsxRuntime.jsx(
            BaseInputRenderer,
            {
              ...componentInputProps
            },
            `input-${componentInputProps.name}-${localeKey}`
          )
        },
        `input-${props.name}-${localeKey}`
      );
    case "dynamiczone":
      return /* @__PURE__ */ jsxRuntime.jsx(
        DynamicZone,
        {
          ...props,
          hint,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
    case "relation":
      return /* @__PURE__ */ jsxRuntime.jsx(
        MemoizedRelationsField,
        {
          ...props,
          hint,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
    case "richtext":
      return /* @__PURE__ */ jsxRuntime.jsx(
        MemoizedWysiwyg,
        {
          ...props,
          hint,
          type: props.type,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
    case "uid":
      const { unique: _uniqueUID, ...restUIDProps } = props;
      return /* @__PURE__ */ jsxRuntime.jsx(
        MemoizedUIDInput,
        {
          ...restUIDProps,
          hint,
          type: props.type,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
    case "enumeration":
      return /* @__PURE__ */ jsxRuntime.jsx(
        admin.InputRenderer,
        {
          ...props,
          ...previewProps,
          hint,
          options: props.attribute.enum.map((value) => ({ value })),
          type: props.customField ? "custom-field" : props.type,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
    default:
      const { unique: _unique, mainField: _mainField, ...restProps } = props;
      return /* @__PURE__ */ jsxRuntime.jsx(
        admin.InputRenderer,
        {
          ...restProps,
          ...previewProps,
          hint,
          type: props.customField ? "custom-field" : props.type,
          disabled: fieldIsDisabled
        },
        `input-${props.name}-${localeKey}`
      );
  }
};
const rulesEngine = admin.createRulesEngine();
const ConditionAwareInputRenderer = ({
  condition,
  ...props
}) => {
  const fieldValues = admin.useForm("ConditionalInputRenderer", (state) => state.values);
  const isVisible = rulesEngine.evaluate(condition, fieldValues);
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(BaseInputRenderer, { ...props });
};
const attributeHasCustomFieldProperty = (attribute) => "customField" in attribute && typeof attribute.customField === "string";
const useFieldHint = (hint = void 0, attribute) => {
  const { formatMessage } = reactIntl.useIntl();
  const { maximum, minimum } = getMinMax(attribute);
  if (!maximum && !minimum) {
    return hint;
  }
  const units = ["string", "uid", "richtext", "email", "password", "text"].includes(attribute.type) ? formatMessage(
    {
      id: "content-manager.form.Input.hint.character.unit",
      defaultMessage: "{maxValue, plural, one { character} other { characters}}"
    },
    {
      maxValue: Math.max(minimum || 0, maximum || 0)
    }
  ) : null;
  const hasMinAndMax = typeof minimum === "number" && typeof maximum === "number";
  return formatMessage(
    {
      id: "content-manager.form.Input.hint.text",
      defaultMessage: "{min, select, undefined {} other {min. {min}}}{divider}{max, select, undefined {} other {max. {max}}}{unit}{br}{description}"
    },
    {
      min: minimum,
      max: maximum,
      description: hint,
      unit: units,
      divider: hasMinAndMax ? formatMessage({
        id: "content-manager.form.Input.hint.minMaxDivider",
        defaultMessage: " / "
      }) : null,
      br: /* @__PURE__ */ jsxRuntime.jsx("br", {})
    }
  );
};
const getMinMax = (attribute) => {
  if ("min" in attribute || "max" in attribute) {
    return {
      maximum: !Number.isNaN(Number(attribute.max)) ? Number(attribute.max) : void 0,
      minimum: !Number.isNaN(Number(attribute.min)) ? Number(attribute.min) : void 0
    };
  } else if ("maxLength" in attribute || "minLength" in attribute) {
    return { maximum: attribute.maxLength, minimum: attribute.minLength };
  } else {
    return { maximum: void 0, minimum: void 0 };
  }
};
const MemoizedInputRenderer = React__namespace.memo((props) => {
  const condition = props.attribute.conditions?.visible;
  if (condition) {
    return /* @__PURE__ */ jsxRuntime.jsx(ConditionAwareInputRenderer, { ...props, condition });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(BaseInputRenderer, { ...props });
});
const ResponsiveGridRoot = styledComponents.styled(designSystem.Grid.Root)`
  container-type: inline-size;
`;
const ResponsiveGridItem = (
  /**
   * TODO:
   * JSDOM cannot handle container queries.
   * This is a temporary workaround so that tests do not fail in the CI when jestdom throws an error
   * for failing to parse the stylesheet.
   */
  process.env.NODE_ENV !== "test" ? styledComponents.styled(designSystem.Grid.Item)`
        grid-column: span 12;
        ${({ theme }) => theme.breakpoints.medium} {
          ${({ col }) => col && `grid-column: span ${col};`}
        }
      ` : styledComponents.styled(designSystem.Grid.Item)`
        grid-column: span 12;
      `
);
const panelStyles = {
  padding: {
    initial: 4,
    medium: 6
  },
  borderColor: "neutral150",
  background: "neutral0",
  hasRadius: true,
  shadow: "tableShadow"
};
const FormLayout = ({ layout, document: document2, hasBackground = true }) => {
  const { formatMessage } = reactIntl.useIntl();
  const modelUid = document2.schema?.uid;
  const getLabel = (name2, label) => {
    return formatMessage({
      id: `content-manager.content-types.${modelUid}.${name2}`,
      defaultMessage: label
    });
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Flex,
    {
      direction: "column",
      alignItems: "stretch",
      gap: {
        initial: 4,
        large: 6
      },
      children: layout.map((panel, index2) => {
        if (panel.some((row) => row.some((field) => field.type === "dynamiczone"))) {
          const [row] = panel;
          const [field] = row;
          return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 12, s: 12, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            MemoizedInputRenderer,
            {
              ...field,
              label: getLabel(field.name, field.label),
              document: document2
            }
          ) }) }, field.name);
        }
        return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { ...hasBackground && panelStyles, children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Flex,
          {
            direction: "column",
            alignItems: "stretch",
            gap: {
              initial: 4,
              large: 6
            },
            children: panel.map((row, gridRowIndex) => {
              return /* @__PURE__ */ jsxRuntime.jsx(ResponsiveGridRoot, { gap: 4, children: row.map(({ size, ...field }) => {
                return /* @__PURE__ */ jsxRuntime.jsx(
                  ResponsiveGridItem,
                  {
                    col: size,
                    s: 12,
                    xs: 12,
                    direction: "column",
                    alignItems: "stretch",
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      MemoizedInputRenderer,
                      {
                        ...field,
                        label: getLabel(field.name, field.label),
                        document: document2
                      }
                    )
                  },
                  field.name
                );
              }) }, gridRowIndex);
            })
          }
        ) }, index2);
      })
    }
  );
};
const Header = ({ isCreating, status, title: documentTitle = "Untitled" }) => {
  const { formatMessage } = reactIntl.useIntl();
  const isCloning = reactRouterDom.useMatch(index.CLONE_PATH) !== null;
  const params = reactRouterDom.useParams();
  const title = isCreating ? "Create an entry" : documentTitle;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      direction: "column",
      alignItems: "flex-start",
      paddingTop: {
        initial: 4,
        large: 6
      },
      paddingBottom: {
        initial: 0,
        large: 4
      },
      gap: 2,
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          admin.BackButton,
          {
            fallback: params.collectionType === index.SINGLE_TYPES ? void 0 : `../${index.COLLECTION_TYPES}/${params.slug}`
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Flex,
          {
            width: "100%",
            justifyContent: "space-between",
            gap: {
              initial: 2,
              medium: "8rem"
            },
            alignItems: "flex-start",
            direction: {
              initial: "column",
              medium: "row"
            },
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", tag: "h1", children: title })
          }
        ),
        status ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginTop: 1, children: /* @__PURE__ */ jsxRuntime.jsx(DocumentStatus, { status: isCloning ? "draft" : status }) }) : null
      ]
    }
  );
};
const transformData = (data) => {
  if (Array.isArray(data)) {
    return data.map(transformData);
  }
  if (typeof data === "object" && data !== null) {
    if ("apiData" in data) {
      return data.apiData;
    }
    return mapValues__default.default(transformData)(data);
  }
  return data;
};
const usePublishAction = ({
  activeTab,
  documentId,
  model,
  collectionType,
  meta,
  document: document2
}) => {
  const {
    currentDocument: { schema, components },
    currentDocumentMeta
  } = useDocumentContext("usePublishAction");
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatValidationErrors: formatValidationErrors } = admin.useAPIErrorHandler();
  const { id } = reactRouterDom.useParams();
  const { publish, isLoading } = useDocumentActions();
  const onPreview = usePreviewContext("usePublishAction", (state) => state.onPreview, false);
  const [{ rawQuery }] = admin.useQueryParams();
  const modified = admin.useForm("usePublishAction", ({ modified: modified2 }) => modified2);
  const setSubmitting = admin.useForm("usePublishAction", ({ setSubmitting: setSubmitting2 }) => setSubmitting2);
  const isSubmitting = admin.useForm("usePublishAction", ({ isSubmitting: isSubmitting2 }) => isSubmitting2);
  const validate = admin.useForm("usePublishAction", (state) => state.validate);
  const setErrors = admin.useForm("usePublishAction", (state) => state.setErrors);
  const formValues = admin.useForm("usePublishAction", ({ values }) => values);
  const resetForm = admin.useForm("usePublishAction", ({ resetForm: resetForm2 }) => resetForm2);
  const idToPublish = currentDocumentMeta.documentId || id;
  const isDocumentPublished = (document2?.[PUBLISHED_AT_ATTRIBUTE_NAME] || meta?.availableStatus.some((doc) => doc[PUBLISHED_AT_ATTRIBUTE_NAME] !== null)) && document2?.status !== "modified";
  const performPublish = async () => {
    setSubmitting(true);
    try {
      const { data: filteredData } = handleInvisibleAttributes(transformData(formValues), {
        schema,
        components
      });
      const { errors } = await validate(true, {
        ...filteredData,
        status: "published"
      });
      if (errors) {
        console.error("Form validation error:", errors);
        toggleNotification({
          type: "danger",
          message: "Please fix the form validation errors found before saving."
        });
        return;
      }
      const data = filteredData;
      const res = await publish(
        {
          collectionType,
          model,
          documentId,
          params: currentDocumentMeta.params
        },
        data
      );
      if ("data" in res) {
        resetForm(formValues);
      }
      if ("data" in res && collectionType !== index.SINGLE_TYPES) {
        if (idToPublish === "create") {
          navigate({
            pathname: `../${collectionType}/${model}/${res.data.documentId}`,
            search: rawQuery
          });
        }
      } else if ("error" in res && isBaseQueryError(res.error) && res.error.name === "ValidationError") {
        setErrors(formatValidationErrors(res.error));
      }
    } finally {
      setSubmitting(false);
      if (onPreview) {
        onPreview();
      }
    }
  };
  if (!schema?.options?.draftAndPublish) {
    return null;
  }
  return {
    label: "Publish to website",
    onClick: async () => {
      await performPublish();
    },
    loading: isLoading,
    disabled: isSubmitting || activeTab === "published" || !modified && isDocumentPublished || !modified && !document2?.documentId,
    variant: "default"
  };
};
const PublishButton = ({ documentId, model, collectionType, meta, document: document2, activeTab }) => {
  const publishAction = usePublishAction({
    activeTab: activeTab ?? "draft",
    documentId,
    model,
    collectionType,
    meta,
    document: document2
  });
  if (!publishAction) {
    console.error("usePublishAction returned null");
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Button,
    {
      flex: "auto",
      startIcon: publishAction.icon,
      onClick: publishAction.onClick,
      justifyContent: "center",
      paddingTop: "7px",
      paddingBottom: "7px",
      loading: publishAction.loading,
      type: "button",
      disabled: publishAction.disabled,
      variant: publishAction.variant,
      children: publishAction.label
    }
  );
};
const useUpdateAction = (activeTab, documentId, model, collectionType) => {
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = admin.useNotification();
  const { _unstableFormatValidationErrors: formatValidationErrors } = admin.useAPIErrorHandler();
  const { create, update, isLoading } = useDocumentActions();
  const {
    currentDocument: { components, schema },
    currentDocumentMeta
  } = useDocumentContext("UpdateAction");
  const [{ rawQuery }] = admin.useQueryParams();
  const onPreview = usePreviewContext("UpdateAction", (state) => state.onPreview, false);
  const isSubmitting = admin.useForm("UpdateAction", ({ isSubmitting: isSubmitting2 }) => isSubmitting2);
  const modified = admin.useForm("UpdateAction", ({ modified: modified2 }) => modified2);
  const setSubmitting = admin.useForm("UpdateAction", ({ setSubmitting: setSubmitting2 }) => setSubmitting2);
  const initialValues = admin.useForm("UpdateAction", ({ initialValues: initialValues2 }) => initialValues2);
  const document2 = admin.useForm("UpdateAction", ({ values }) => values);
  const validate = admin.useForm("UpdateAction", (state) => state.validate);
  const setErrors = admin.useForm("UpdateAction", (state) => state.setErrors);
  const resetForm = admin.useForm("UpdateAction", ({ resetForm: resetForm2 }) => resetForm2);
  const handleUpdate = async () => {
    setSubmitting(true);
    try {
      if (!modified) {
        return;
      }
      const { errors } = await validate(true, {
        status: "draft"
      });
      if (errors) {
        toggleNotification({
          type: "danger",
          message: "There are validation errors in your document. Please fix them before saving."
        });
        return;
      }
      if (documentId || collectionType === index.SINGLE_TYPES) {
        const { data } = handleInvisibleAttributes(transformData(document2), {
          schema,
          initialValues,
          components
        });
        const res = await update(
          {
            collectionType,
            model,
            documentId,
            params: currentDocumentMeta.params
          },
          data
        );
        if ("error" in res && isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          setErrors(formatValidationErrors(res.error));
        } else {
          resetForm(document2);
        }
      } else {
        const { data } = handleInvisibleAttributes(transformData(document2), {
          schema,
          initialValues,
          components
        });
        const res = await create(
          {
            model,
            params: currentDocumentMeta.params
          },
          data
        );
        if ("data" in res && collectionType !== index.SINGLE_TYPES) {
          navigate(
            {
              pathname: `../${res.data.documentId}`,
              search: rawQuery
            },
            { replace: true, relative: "path" }
          );
        } else if ("error" in res && isBaseQueryError(res.error) && res.error.name === "ValidationError") {
          setErrors(formatValidationErrors(res.error));
        }
      }
    } finally {
      setSubmitting(false);
      if (onPreview) {
        onPreview();
      }
    }
  };
  return {
    label: "Save draft",
    onClick: handleUpdate,
    loading: isLoading,
    disabled: isSubmitting || !modified || activeTab === "published",
    variant: "tertiary"
  };
};
const UpdateButton = ({ activeTab, documentId, model, collectionType }) => {
  const nonNullActiveTab = activeTab ?? "draft";
  const updateAction = useUpdateAction(nonNullActiveTab, documentId, model, collectionType);
  if (!updateAction) {
    console.error("useUpdateAction returned null");
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Button,
    {
      flex: "auto",
      startIcon: updateAction.icon,
      onClick: updateAction.onClick,
      justifyContent: "center",
      variant: updateAction.variant,
      paddingTop: "7px",
      paddingBottom: "7px",
      loading: updateAction.loading,
      type: "button",
      disabled: updateAction.disabled,
      children: updateAction.label
    }
  );
};
const useDeleteAction = (documentId, model, collectionType) => {
  const navigate = reactRouterDom.useNavigate();
  const listViewPathMatch = reactRouterDom.useMatch(index.LIST_PATH);
  const { delete: deleteAction, isLoading } = useDocumentActions();
  const { toggleNotification } = admin.useNotification();
  const setSubmitting = admin.useForm("DeleteAction", (state) => state.setSubmitting);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React__namespace.useState(false);
  console.log("listViewPathMatch", listViewPathMatch);
  const handleDelete = async () => {
    if (!listViewPathMatch) {
      setSubmitting(true);
    }
    try {
      if (!documentId && collectionType !== index.SINGLE_TYPES) {
        console.error(
          "You're trying to delete a document without an id, this is likely a bug with Strapi. Please open an issue."
        );
        toggleNotification({
          message: "An error occurred while trying to delete the document.",
          type: "danger"
        });
        return;
      }
      const res = await deleteAction({
        documentId,
        model,
        collectionType,
        params: {
          locale: "*"
        }
      });
      if (!("error" in res)) {
        navigate({ pathname: `../${collectionType}/${model}` }, { replace: true });
      }
    } finally {
      if (!listViewPathMatch) {
        setSubmitting(false);
      }
      setIsDeleteDialogOpen(false);
    }
  };
  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  const deleteDialogContent = /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(Icons.WarningCircle, { width: "24px", height: "24px", fill: "danger600" }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "p", variant: "omega", textAlign: "center", children: "Are you sure you want to delete this item? This action is irreversible." })
  ] });
  return {
    label: "Delete item",
    onClick: handleDelete,
    loading: isLoading,
    disabled: false,
    icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Trash, {}),
    variant: "danger",
    dialog: {
      isOpen: isDeleteDialogOpen,
      open: openDeleteDialog,
      close: closeDeleteDialog,
      content: deleteDialogContent,
      title: "Confirmation"
    }
  };
};
const DocumentActionConfirmDialog = ({
  onClose,
  onCancel,
  onConfirm,
  title = "Confirmation",
  content,
  isOpen,
  variant = "secondary",
  loading
}) => {
  const handleClose = async () => {
    if (onCancel) {
      await onCancel();
    }
    onClose();
  };
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
    }
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Root, { open: isOpen, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Content, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Header, { children: title }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Body, { children: content }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Dialog.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Dialog.Cancel, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", fullWidth: true, children: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleConfirm, variant, fullWidth: true, loading, children: "Confirm" })
    ] })
  ] }) });
};
const UNPUBLISH_DRAFT_OPTIONS = {
  KEEP: "keep",
  DISCARD: "discard"
};
const useUnpublishAction = (activeTab, collectionType, model, document2, documentId) => {
  const { schema } = useDoc();
  const { unpublish } = useDocumentActions();
  const [{ query }] = admin.useQueryParams();
  const params = React__namespace.useMemo(() => buildValidParams(query), [query]);
  const { toggleNotification } = admin.useNotification();
  const [shouldKeepDraft, setShouldKeepDraft] = React__namespace.useState(true);
  const [isDialogOpen, setIsDialogOpen] = React__namespace.useState(false);
  const isDocumentModified = document2?.status === "modified";
  const handleChange = (value) => {
    setShouldKeepDraft(value === UNPUBLISH_DRAFT_OPTIONS.KEEP);
  };
  const handleUnpublish = async () => {
    if (!documentId && collectionType !== index.SINGLE_TYPES) {
      console.error(
        "You're trying to unpublish a document without an id, this is likely a bug with Strapi. Please open an issue."
      );
      console.log("documentId", documentId, "collectionType", collectionType);
      toggleNotification({
        message: "An error occurred while trying to unpublish the document.",
        type: "danger"
      });
      return;
    }
    await unpublish(
      {
        collectionType,
        model,
        documentId,
        params
      },
      !shouldKeepDraft
    );
    setIsDialogOpen(false);
  };
  const handleClick = () => {
    if (isDocumentModified) {
      setIsDialogOpen(true);
    } else {
      handleUnpublish();
    }
  };
  if (!schema?.options?.draftAndPublish) {
    return null;
  }
  const dialogContent = /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-start", direction: "column", gap: 6, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { width: "100%", direction: "column", gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsx(Icons.WarningCircle, { width: "24px", height: "24px", fill: "danger600" }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { tag: "p", variant: "omega", textAlign: "center", children: [
        "Are you sure you want to unpublish this document?",
        /* @__PURE__ */ jsxRuntime.jsx("br", {}),
        "This draft is modified. Would you like to keep the modified draft or the version that was published?"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Radio.Group,
      {
        defaultValue: UNPUBLISH_DRAFT_OPTIONS.KEEP,
        name: "discard-options",
        "aria-label": "Choose an option to unpublish the document.",
        onValueChange: handleChange,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Radio.Item, { checked: shouldKeepDraft, value: UNPUBLISH_DRAFT_OPTIONS.KEEP, children: "Keep modified draft" }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Radio.Item, { checked: !shouldKeepDraft, value: UNPUBLISH_DRAFT_OPTIONS.DISCARD, children: "Replace draft with published version" })
        ]
      }
    )
  ] });
  return {
    label: "Unpublish",
    onClick: handleUnpublish,
    loading: false,
    disabled: activeTab === "published" || document2?.status !== "published" && document2?.status !== "modified",
    icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.Cross, {}),
    variant: "danger",
    dialog: {
      isOpen: isDialogOpen,
      open: handleClick,
      close: () => setIsDialogOpen(false),
      content: dialogContent
    }
  };
};
const useDiscardAction = (activeTab, collectionType, model, document2, documentId) => {
  const { schema } = useDoc();
  const { discard, isLoading } = useDocumentActions();
  const [isDiscardDialogOpen, setIsDiscardDialogOpen] = React__namespace.default.useState(false);
  const [{ query }] = admin.useQueryParams();
  const params = React__namespace.default.useMemo(() => buildValidParams(query), [query]);
  if (!schema?.options?.draftAndPublish) {
    return null;
  }
  return {
    disabled: activeTab === "published" || document2?.status !== "modified",
    label: "Discard modifications",
    icon: /* @__PURE__ */ jsxRuntime.jsx(Icons.ArrowLeft, {}),
    variant: "warning",
    loading: isLoading,
    dialog: {
      title: "Confirmation",
      content: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(Icons.WarningCircle, { width: "24px", height: "24px", fill: "danger600" }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "p", variant: "omega", textAlign: "center", children: "Are you sure you want to discard the changes made to this document?" })
      ] }),
      open: () => setIsDiscardDialogOpen(true),
      close: () => setIsDiscardDialogOpen(false),
      isOpen: isDiscardDialogOpen
    },
    onClick: async () => {
      await discard({
        collectionType,
        model,
        documentId,
        params
      });
    }
  };
};
const useHandleApplicationAction = (documentId, model) => {
  if (model !== index.MEMBER_APPLICATION_MODEL) {
    console.error("This hook only applies to ", index.MEMBER_APPLICATION_MODEL);
    return null;
  }
  if (!documentId) {
    console.error("DocumentId must be string ");
    return null;
  }
  const { toggleNotification } = admin.useNotification();
  const { update, isLoading } = useDocumentActions();
  const {
    currentDocument: { components, schema, document: rawDocument },
    currentDocumentMeta
  } = useDocumentContext("useHandleApplicationAction");
  const isSubmitting = admin.useForm("useHandleApplicationAction", ({ isSubmitting: isSubmitting2 }) => isSubmitting2);
  const setSubmitting = admin.useForm("useHandleApplicationAction", ({ setSubmitting: setSubmitting2 }) => setSubmitting2);
  const initialValues = admin.useForm("useHandleApplicationAction", ({ initialValues: initialValues2 }) => initialValues2);
  const document2 = admin.useForm("useHandleApplicationAction", ({ values }) => values);
  const handleApprove = async (membershipTypeId, membershipTypeDocumentId, decision) => {
    setSubmitting(true);
    try {
      if (documentId) {
        const { data } = handleInvisibleAttributes(transformData(document2), {
          schema,
          initialValues,
          components
        });
        if ("applicationStatus" in data) {
          if (data["applicationStatus"] !== "pending") {
            toggleNotification({
              type: "danger",
              message: `Only applications in 'pending' state can be approved or rejected. To manually add or remove members, use the membership list.`
            });
            return;
          }
          data["applicationStatus"] = decision;
          if (decision === "approved") {
            data.member_type = {
              ...data.member_type,
              connect: [
                {
                  id: membershipTypeId,
                  documentId: membershipTypeDocumentId
                }
              ]
            };
          }
          const res = await update(
            {
              collectionType: index.COLLECTION_TYPES,
              model,
              documentId,
              params: currentDocumentMeta.params
            },
            data
          );
          if (!("error" in res)) {
            if (decision === "rejected") {
              toggleNotification({
                type: "success",
                message: "Rejected member application"
              });
            } else {
              toggleNotification({
                type: "success",
                message: "Approved member application"
              });
            }
          }
        } else {
          console.error(`The field ${index.APPLICATION_STATUS} does not exist on the document data.`);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };
  return {
    onClick: handleApprove,
    loading: isLoading,
    disabled: isSubmitting,
    variant: "success"
  };
};
const ApproveButton = ({ documentId, model, membershipTypeId, membershipTypeDocumentId }) => {
  const approveAction = useHandleApplicationAction(documentId, model);
  if (!approveAction) {
    console.error("useHandleApplicationAction returned null");
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Button,
    {
      flex: "auto",
      onClick: () => approveAction.onClick(membershipTypeId, membershipTypeDocumentId, "approved"),
      justifyContent: "center",
      variant: "success",
      paddingTop: "7px",
      paddingBottom: "7px",
      loading: approveAction.loading,
      type: "button",
      disabled: approveAction.disabled,
      children: "Approve application"
    }
  );
};
const RejectButton = ({ documentId, model, membershipTypeId, membershipTypeDocumentId }) => {
  const applicationAction = useHandleApplicationAction(documentId, model);
  if (!applicationAction) {
    console.error("useHandleApplicationAction returned null");
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Button,
    {
      flex: "auto",
      onClick: () => applicationAction.onClick(membershipTypeId, membershipTypeDocumentId, "rejected"),
      justifyContent: "center",
      variant: "danger",
      paddingTop: "7px",
      paddingBottom: "7px",
      loading: applicationAction.loading,
      type: "button",
      disabled: applicationAction.disabled,
      children: "Reject Application"
    }
  );
};
React__namespace.forwardRef(({ children, title }, ref) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      ref,
      tag: "aside",
      "aria-labelledby": "additional-information",
      background: "neutral0",
      borderColor: "neutral150",
      hasRadius: true,
      paddingBottom: 4,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      shadow: "tableShadow",
      gap: 3,
      direction: "column",
      justifyContent: "stretch",
      alignItems: "flex-start",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "sigma", textTransform: "uppercase", textColor: "neutral600", children: title }),
        children
      ]
    }
  );
});
function renderLodashStyleTemplate(template2, values) {
  return template2.replace(
    /<%=\s*([\w.]+)\s*%>/g,
    (_, keyPath) => {
      return keyPath.split(".").reduce((acc, key) => acc?.[key], values) ?? "";
    }
  );
}
const getOrdinal = (d) => {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
const formatDate = (date) => {
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthName = date.toLocaleDateString("en-US", { month: "long" });
  const dayNumber = date.getDate();
  const suffix = getOrdinal(dayNumber);
  return `${dayName} ${dayNumber}${suffix} ${monthName}`;
};
const formatSubjectDate = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const hours24 = date.getHours();
  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? "pm" : "am";
  const suffix = getOrdinal(day);
  return `${dayName} ${day}${suffix} ${month}, ${hours12}${ampm}`;
};
const EventActionPanel = ({
  model,
  documentId,
  document: document2,
  status,
  meta,
  collectionType
}) => {
  useDeleteAction(documentId, model, collectionType);
  useUnpublishAction(status, collectionType, model, document2, documentId);
  useDiscardAction(status, collectionType, model, document2, documentId);
  const onChange = admin.useForm("EventActionPanel", ({ onChange: onChange2 }) => onChange2);
  const formValues = admin.useForm("EventActionPanel", ({ values }) => values);
  const { get } = admin.useFetchClient();
  const emailTemplateName = ["q4enok6b2tgm3td9l7voh4hk", "y4fjycg0agtpz4leq2qr74y6", "qoq891lngymb8o99jbtwat1e"];
  const daysBefore = [7, 3, 0];
  const [loadingTemplates, setLoadingTemplates] = React__namespace.useState(false);
  const handleEmailTemplates = async () => {
    setLoadingTemplates(true);
    onChange("showDisableToggles", true);
    const parsedEventDate = new Date(formValues.eventDate);
    let title = "[Please insert title here]";
    if (typeof formValues.title === "string" && formValues.title.trim() !== "") {
      title = formValues.title.trim();
    }
    let abstract = "[Please insert abstract here]";
    if (typeof formValues.abstract === "string" && formValues.abstract.trim() !== "") {
      abstract = formValues.abstract.trim();
    }
    let eventDateRaw = null;
    let eventDate = "[Please insert date here]";
    if (typeof formValues.eventDate === "string" && formValues.eventDate.trim() !== "") {
      const parsedDate = new Date(formValues.eventDate.trim());
      if (!isNaN(parsedDate.getTime())) {
        eventDate = formatDate(parsedDate);
        eventDateRaw = parsedDate;
      }
    }
    let eventStartTime = "[Please insert start time here]";
    if (typeof formValues.eventStartTime === "string" && formValues.eventStartTime.trim() !== "") {
      eventStartTime = formValues.eventStartTime.trim().substring(0, 5);
    }
    let eventEndTime = "[Please insert end time here]";
    if (typeof formValues.eventEndTime === "string" && formValues.eventEndTime.trim() !== "") {
      eventEndTime = formValues.eventEndTime.trim().substring(0, 5);
    }
    let speaker = "[Please insert speaker here]";
    if (typeof formValues.speaker === "string" && formValues.speaker.trim() !== "") {
      speaker = formValues.speaker.trim();
    }
    let eventTypeFormatted = "event";
    if (typeof formValues.eventType === "string" && formValues.eventType.trim() !== "") {
      const trimmedType = formValues.eventType.trim();
      if (!trimmedType.toLowerCase().includes("other")) {
        eventTypeFormatted = trimmedType;
      }
    }
    let physicalLocation = "";
    if (typeof formValues.location === "string" && formValues.location.trim() !== "") {
      physicalLocation = formValues.location.trim();
    }
    let teamsLink = "";
    if (typeof formValues.teamsLink === "string" && formValues.teamsLink.trim() !== "") {
      teamsLink = formValues.teamsLink.trim();
    }
    let locationFormatted = "[Please enter location and microsoft teams link here]";
    if (physicalLocation && teamsLink) {
      locationFormatted = `hybrid - both in person in ${physicalLocation}, and online on MS Teams at ${teamsLink}`;
    } else if (physicalLocation) {
      locationFormatted = `in person in ${physicalLocation}`;
    } else if (teamsLink) {
      locationFormatted = `online on MS Teams at ${teamsLink}`;
    }
    for (let i = 0; i < emailTemplateName.length; i++) {
      onChange(`disableEmail${i + 1}`, false);
      if (!isNaN(parsedEventDate.getTime())) {
        const parsedEventDateCopy = new Date(parsedEventDate);
        parsedEventDateCopy.setDate(parsedEventDate.getDate() - daysBefore[i]);
        parsedEventDateCopy.setHours(9, 0, 0, 0);
        onChange(`emailDate${i + 1}`, parsedEventDateCopy.toISOString());
      }
    }
    let templateName = "";
    try {
      for (let i = 0; i < emailTemplateName.length; i++) {
        onChange(`emailSubject${i + 1}`, `${eventTypeFormatted} - ${eventDateRaw ? formatSubjectDate(eventDateRaw) : "[Please insert event date here]"} - ${title}`);
        templateName = emailTemplateName[i];
        const res = await get(`/content-manager/collection-types/api::text-email-template.text-email-template/${templateName}`);
        if (res.data.data && res.data.data.template) {
          const textTemplate = res.data.data.template;
          const result = renderLodashStyleTemplate(textTemplate, {
            abstract,
            eventDate,
            eventStartTime,
            eventEndTime,
            locationFormatted,
            eventTypeFormatted,
            title,
            speaker
          });
          onChange(`emailBody${i + 1}`, result);
        } else {
          throw new Error("Template not found");
        }
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown error";
      console.error("Error loading template", templateName, "with message", message);
    } finally {
      setLoadingTemplates(false);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleEmailTemplates, loading: loadingTemplates, children: "Generate Email Templates" }),
    /* @__PURE__ */ jsxRuntime.jsx(
      StandardActionPanel,
      {
        model,
        documentId,
        document: document2,
        status,
        meta,
        collectionType
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: "Special actions" })
  ] });
};
const StandardActionPanel = ({
  model,
  documentId,
  document: document2,
  status,
  meta,
  collectionType
}) => {
  const deleteAction = useDeleteAction(documentId, model, collectionType);
  const unpublishAction = useUnpublishAction(status, collectionType, model, document2, documentId);
  const discardAction = useDiscardAction(status, collectionType, model, document2, documentId);
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "center", width: "100%", gap: 8, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, justifyContent: "center", alignItems: "center", width: "50%", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          PublishButton,
          {
            documentId,
            activeTab: status,
            model,
            collectionType,
            meta,
            document: document2
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(
          UpdateButton,
          {
            activeTab: status,
            documentId,
            model,
            collectionType
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.SimpleMenu, { label: "More actions", variant: "tertiary", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.MenuItem,
          {
            onSelect: deleteAction.dialog?.open,
            variant: deleteAction.variant,
            startIcon: deleteAction.icon,
            children: deleteAction.label
          }
        ),
        unpublishAction && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.MenuItem,
          {
            onSelect: unpublishAction.dialog?.open,
            startIcon: unpublishAction.icon,
            children: unpublishAction.label
          }
        ),
        discardAction && /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.MenuItem,
          {
            onSelect: discardAction.dialog?.open,
            variant: discardAction.variant,
            startIcon: discardAction.icon,
            children: discardAction.label
          }
        )
      ] })
    ] }),
    deleteAction && /* @__PURE__ */ jsxRuntime.jsx(
      DocumentActionConfirmDialog,
      {
        title: "Confirmation",
        onClose: deleteAction.dialog.close,
        onConfirm: deleteAction.onClick,
        isOpen: deleteAction.dialog.isOpen,
        content: deleteAction.dialog.content
      },
      "delete"
    ),
    unpublishAction && /* @__PURE__ */ jsxRuntime.jsx(
      DocumentActionConfirmDialog,
      {
        title: "Confirmation",
        onClose: unpublishAction.dialog.close,
        onConfirm: unpublishAction.onClick,
        isOpen: unpublishAction.dialog.isOpen,
        content: unpublishAction.dialog.content
      },
      "unpublish"
    ),
    discardAction && /* @__PURE__ */ jsxRuntime.jsx(
      DocumentActionConfirmDialog,
      {
        title: discardAction.dialog?.title,
        onClose: discardAction.dialog?.close,
        onConfirm: discardAction.onClick,
        isOpen: discardAction.dialog?.isOpen,
        content: discardAction.dialog?.content
      },
      "discard"
    )
  ] });
};
const Radios = ({ memberTypes, documentId, model }) => {
  const [selectedMemberType, setSelectedMemberType] = React__namespace.useState(memberTypes[0]);
  const handleGroupChange = (id) => {
    const found = memberTypes.find((mt) => mt.id === id);
    if (found) {
      setSelectedMemberType(found);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Radio.Group,
      {
        "aria-label": "member type",
        value: selectedMemberType.id,
        onValueChange: handleGroupChange,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "label", variant: "pi", fontWeight: "bold", children: "Select type of new member" }),
          memberTypes.map((item) => /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Radio.Item,
            {
              value: item.id,
              children: item.membershipName || "Unknown membership type"
            },
            item.id
          ))
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, justifyContent: "center", alignItems: "center", width: "50%", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        ApproveButton,
        {
          documentId,
          model,
          membershipTypeId: selectedMemberType.id,
          membershipTypeDocumentId: selectedMemberType.documentId
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        RejectButton,
        {
          documentId,
          model,
          membershipTypeId: selectedMemberType.id,
          membershipTypeDocumentId: selectedMemberType.documentId
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { alignItems: "center", width: "100%", gap: 8 })
  ] });
};
const MemberApplicationActionPanel = ({
  documentId,
  model,
  document: document2
}) => {
  const { data, error, isLoading } = useSearchRelationsQuery({
    model: index.MEMBER_APPLICATION_MODEL,
    targetField: "member_type",
    params: {
      pageSize: 100,
      page: 1
    }
  });
  if (isLoading || !data || !data.results) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "Loading..." });
  } else if (error) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { children: "Error loading member types." });
  }
  if (document2.applicationStatus && document2.applicationStatus !== "pending") {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { children: [
      "No actions available. Application is already ",
      document2.applicationStatus,
      "."
    ] });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(jsxRuntime.Fragment, { children: /* @__PURE__ */ jsxRuntime.jsx(Radios, { memberTypes: data.results, model, documentId }) });
};
const CustomPanel = () => {
  const [
    {
      query: { status = "draft" }
    }
  ] = admin.useQueryParams();
  const { model, id: documentId, document: document2, meta, collectionType } = useDoc();
  let panel;
  if (model === index.MEMBER_APPLICATION_MODEL) {
    panel = /* @__PURE__ */ jsxRuntime.jsx(MemberApplicationActionPanel, { documentId, model, document: document2 });
  } else if (model === index.EVENT_MODEL) {
    panel = /* @__PURE__ */ jsxRuntime.jsx(
      EventActionPanel,
      {
        model,
        documentId,
        document: document2,
        status,
        meta,
        collectionType
      }
    );
  } else {
    panel = /* @__PURE__ */ jsxRuntime.jsx(
      StandardActionPanel,
      {
        model,
        documentId,
        document: document2,
        status,
        meta,
        collectionType
      }
    );
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      tag: "aside",
      "aria-labelledby": "additional-information",
      background: "neutral0",
      borderColor: "neutral150",
      hasRadius: true,
      paddingBottom: 4,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 4,
      shadow: "tableShadow",
      gap: 3,
      direction: "column",
      justifyContent: "stretch",
      alignItems: "flex-start",
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h2", variant: "sigma", textTransform: "uppercase", textColor: "neutral600", children: "Actions" }),
        panel
      ]
    }
  );
};
const EditViewPage = () => {
  const location = reactRouterDom.useLocation();
  const [
    {
      query: { status }
    },
    setQuery
  ] = admin.useQueryParams({
    status: "draft"
  });
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = admin.useNotification();
  const doc = useDoc();
  const {
    document: document2,
    meta,
    isLoading: isLoadingDocument,
    schema,
    components,
    collectionType,
    id,
    model,
    hasError,
    getTitle,
    getInitialFormValues
  } = doc;
  const hasDraftAndPublished = schema?.options?.draftAndPublish ?? false;
  useOnce(() => {
    if (location?.state && "error" in location.state) {
      toggleNotification({
        type: "danger",
        message: location.state.error,
        timeout: 5e3
      });
    }
  });
  const isSingleType = collectionType === index.SINGLE_TYPES;
  const isCreatingDocument = !id && !isSingleType;
  const {
    isLoading: isLoadingLayout,
    edit: {
      layout,
      settings: { mainField }
    }
  } = useDocumentLayout(model);
  const pageTitle = getTitle(mainField);
  const { isLazyLoading } = useLazyComponents([]);
  const isLoading = isLoadingDocument || isLoadingLayout || isLazyLoading;
  const initialValues = getInitialFormValues(isCreatingDocument);
  if (isLoading && !document2?.documentId) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  if (!initialValues || hasError) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  const handleTabChange = (status2) => {
    if (status2 === "published" || status2 === "draft") {
      setQuery({ status: status2 }, "push", true);
    }
  };
  const validateSync = (values, options) => {
    const yupSchema = createYupSchema(schema?.attributes, components, {
      status,
      ...options
    });
    return yupSchema.validateSync(values, { abortEarly: false });
  };
  const isFormDisabled = hasDraftAndPublished && status === "published";
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { paddingLeft: admin.RESPONSIVE_DEFAULT_SPACING, paddingRight: admin.RESPONSIVE_DEFAULT_SPACING, children: [
    /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Title, { children: pageTitle }),
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Form,
      {
        disabled: isFormDisabled,
        initialValues,
        method: isCreatingDocument ? "POST" : "PUT",
        validate: (values, options) => {
          const { data: cleanedValues, removedAttributes } = handleInvisibleAttributes(values, {
            schema,
            initialValues,
            components
          });
          const yupSchema = createYupSchema(schema?.attributes, components, {
            status,
            removedAttributes,
            ...options
          });
          return yupSchema.validate(cleanedValues, { abortEarly: false });
        },
        initialErrors: location?.state?.forceValidation ? validateSync(initialValues, {}) : {},
        children: /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            Header,
            {
              isCreating: isCreatingDocument,
              status: hasDraftAndPublished ? getDocumentStatus(document2, meta) : void 0,
              title: pageTitle
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { variant: "simple", value: status, onValueChange: handleTabChange, children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Tabs.List,
              {
                "aria-label": "Document status",
                children: hasDraftAndPublished ? /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(StatusTab, { value: "draft", children: "draft" }),
                  /* @__PURE__ */ jsxRuntime.jsx(
                    StatusTab,
                    {
                      disabled: !meta || meta.availableStatus.length === 0,
                      value: "published",
                      children: "published"
                    }
                  )
                ] }) : null
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(
              designSystem.Grid.Root,
              {
                paddingTop: {
                  initial: 2,
                  medium: 4,
                  large: 8
                },
                gap: 4,
                children: [
                  /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Item, { col: 9, xs: 12, direction: "column", alignItems: "stretch", children: [
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "draft", children: /* @__PURE__ */ jsxRuntime.jsx(FormLayout, { layout, document: doc }) }),
                    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "published", children: /* @__PURE__ */ jsxRuntime.jsx(FormLayout, { layout, document: doc }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 9, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(CustomPanel, {}) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(Blocker, {})
        ] })
      }
    )
  ] });
};
const StatusTab = styledComponents.styled(designSystem.Tabs.Trigger)`
  text-transform: uppercase;
`;
const getDocumentStatus = (document2, meta) => {
  const docStatus = document2?.status;
  const statuses = meta?.availableStatus ?? [];
  if (!docStatus) {
    return "draft";
  }
  if (docStatus === "draft" && statuses.find((doc) => doc.publishedAt !== null)) {
    return "published";
  }
  return docStatus;
};
const ProtectedEditViewPage = () => {
  const { slug = "" } = reactRouterDom.useParams();
  if (!slug) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(EditViewPage, {});
};
const EditViewPage$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EditViewPage,
  ProtectedEditViewPage,
  getDocumentStatus
}, Symbol.toStringTag, { value: "Module" }));
exports.CREATOR_FIELDS = CREATOR_FIELDS;
exports.DocumentActionConfirmDialog = DocumentActionConfirmDialog;
exports.DocumentStatus = DocumentStatus;
exports.EditViewPage = EditViewPage$1;
exports.buildValidParams = buildValidParams;
exports.checkIfAttributeIsDisplayable = checkIfAttributeIsDisplayable;
exports.convertListLayoutToFieldLayouts = convertListLayoutToFieldLayouts;
exports.getMainField = getMainField;
exports.getRelationLabel = getRelationLabel;
exports.prefixFileUrlWithBackendUrl = prefixFileUrlWithBackendUrl;
exports.useContentTypeSchema = useContentTypeSchema;
exports.useDebounce = useDebounce;
exports.useDeleteAction = useDeleteAction;
exports.useDoc = useDoc;
exports.useDocumentLayout = useDocumentLayout;
exports.useGetAllDocumentsQuery = useGetAllDocumentsQuery;
exports.useGetContentTypeConfigurationQuery = useGetContentTypeConfigurationQuery;
exports.useGetRelationsQuery = useGetRelationsQuery;
exports.usePrev = usePrev;
//# sourceMappingURL=EditViewPage-c5b5Q63y.js.map
