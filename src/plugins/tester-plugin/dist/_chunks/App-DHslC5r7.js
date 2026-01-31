"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const react = require("react");
const styled = require("styled-components");
const index = require("./index-DcNBHa1G.js");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const pluginPermissions = {
  increment: [{ action: "plugin::tester-plugin.increment", subject: null }]
};
const getTranslation = (id) => `${index.PLUGIN_ID}.${id}`;
const rotate = styled.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const slideIn = styled.keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const StyledAnimatedBox = styled__default.default(designSystem.Box)`
  padding: 20px;
  margin-bottom: 20px;
  background: linear-gradient(45deg, #ff6b6b, #ee5a6f);
  border-radius: 8px;
  animation: ${slideIn} 0.5s ease-out;

  &:hover {
    animation: ${rotate} 2s linear infinite;
  }
`;
const sharedBoxStyles = styled.css`
  padding: 16px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: ${(props) => props.$isActive ? "#4caf50" : "#2196f3"};
  color: white;

  ${(props) => props.$isActive && styled.css`
    box-shadow: 0 4px 20px rgba(76, 175, 80, 0.4);
    transform: scale(1.05);
  `}
`;
const StyledCssHelperBox = styled__default.default(designSystem.Box)`
  ${sharedBoxStyles};
  margin-bottom: 20px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
const StyledThemeAwareBox = styled__default.default(designSystem.Box)`
  padding: 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors?.primary600 || "#7b79ff"};
  border: 2px solid ${(props) => props.theme.colors?.primary200 || "#d9d8ff"};
  border-radius: ${(props) => props.theme.borderRadius || "4px"};
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    margin: 0 0 8px 0;
    font-size: ${(props) => props.theme.fontSizes?.[3] || "18px"};
  }

  p {
    margin: 0;
    font-size: ${(props) => props.theme.fontSizes?.[1] || "14px"};
    opacity: 0.9;
  }
`;
const StyledDefaultThemeBox = styled__default.default(designSystem.Box)`
  padding: ${(props) => props.theme.spacing.medium};
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.colors.primary};
  border: 3px solid ${(props) => props.theme.colors.secondary};
  border-radius: 12px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(
      90deg,
      ${(props) => props.theme.colors.success},
      ${(props) => props.theme.colors.danger},
      ${(props) => props.theme.colors.secondary}
    );
  }

  h3 {
    margin: ${(props) => props.theme.spacing.small} 0;
  }
`;
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [count, setCount] = react.useState(0);
  const [isActive, setIsActive] = react.useState(false);
  const { isLoading, allowedActions } = admin.useRBAC(pluginPermissions);
  const strapiTheme = styled.useTheme();
  const customTheme = {
    colors: {
      primary: "#8b5cf6",
      secondary: "#ec4899",
      danger: "#ef4444",
      success: "#10b981"
    },
    spacing: {
      small: "8px",
      medium: "20px",
      large: "32px"
    }
  };
  const state = admin.useStrapiApp("HomePage", (state2) => state2);
  console.log("Strapi App State:", state);
  console.log("Theme from useTheme:", strapiTheme);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Loading, {});
  }
  console.log("Allowed Actions:", allowedActions);
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs("h1", { children: [
      "Welcome to 1 ",
      formatMessage({ id: getTranslation("plugin.name") })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(StyledAnimatedBox, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "white", fontWeight: "bold", children: "🎬 keyframes Example" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "white", style: { marginTop: "8px" }, children: "This box slides in on mount. Hover to see rotation animation using keyframes!" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(
      StyledCssHelperBox,
      {
        $isActive: isActive,
        onClick: () => setIsActive(!isActive),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "omega", textColor: "white", fontWeight: "bold", children: "🎨 css helper Example" }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "pi", textColor: "white", style: { marginTop: "8px" }, children: [
            "Click to toggle state! Uses css helper for conditional styling. Currently: ",
            isActive ? "Active ✓" : "Inactive"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(StyledThemeAwareBox, { children: [
      /* @__PURE__ */ jsxRuntime.jsx("h3", { children: "🎭 useTheme Example" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { children: "This box uses theme values from Strapi's theme provider." }),
      /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { marginTop: "8px" }, children: [
        "Primary color: ",
        strapiTheme.colors?.primary600 || "default",
        " | Border radius: ",
        strapiTheme.borderRadius || "default"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(StyledDefaultThemeBox, { theme: customTheme, children: [
      /* @__PURE__ */ jsxRuntime.jsx("h3", { children: "🎨 DefaultTheme Example" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "white", children: "This component extends DefaultTheme for type-safe theme access. It has a custom theme with typed colors and spacing values." }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "white", style: { marginTop: "8px" }, children: "Notice the gradient border on top using theme.colors with full TypeScript support!" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      "Counter: ",
      count
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Button,
      {
        onClick: () => setCount(count + 1),
        disabled: !allowedActions.canIncrement,
        children: "Increment"
      }
    )
  ] });
};
const WrappedHomePage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.DesignSystemProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(WrappedHomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
