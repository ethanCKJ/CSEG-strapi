# Plugin Theme Inheritance Analysis

## Question
Why does the tester-plugin inherit the theme and DesignSystemProvider from core Strapi while the custom-content-manager3 does not?

## Answer

The difference lies in **how each plugin registers its routes and components** with the Strapi admin application.

---

## tester-plugin: Automatic Theme Inheritance

### Registration Method
```typescript
// src/plugins/tester-plugin/admin/src/index.ts
app.addMenuLink({
  to: PLUGIN_ID,
  icon: PluginIcon,
  intlLabel: {
    id: `${PLUGIN_ID}.plugin.name`,
    defaultMessage: PLUGIN_ID,
  },
  Component: async () => {
    const { App } = await import('./pages/App');
    return App;
  },
});
```

### Why It Gets Theme Automatically
When using `app.addMenuLink()` with a `Component` property:

1. **Strapi's Plugin System** automatically wraps the component in necessary providers
2. The component is rendered **within Strapi's admin shell**
3. **Inheritance chain**: Strapi Root → Admin Providers → DesignSystemProvider → Theme → Your Component
4. The plugin component becomes a **child of the admin app's provider tree**

### Visual Hierarchy
```
Strapi Admin Root
└── DesignSystemProvider (from core)
    └── Theme Context (from core)
        └── Admin Layout
            └── Menu Link Component
                └── tester-plugin App Component ✓ (inherits theme)
```

---

## custom-content-manager3: Manual Routing Without Theme Inheritance

### Registration Method
```typescript
// src/plugins/custom-content-manager3/admin/src/index.ts
app.addMenuLink({
  to: PLUGIN_ID,
  icon: Bell,
  intlLabel: {
    id: `${PLUGIN_ID}.plugin.name`,
    defaultMessage: PLUGIN_ID,
  },
  // NO Component property - just a link
});

app.router.addRoute({
  path: 'custom-content-manager3/*',
  lazy: async () => {
    const { Layout } = await import('./layout');
    return {
      Component: Layout,
    };
  },
  children: routes,
});
```

### Why It Does NOT Get Theme Automatically
When using `app.router.addRoute()`:

1. The route is added **directly to the router** at the same level as admin routes
2. **Bypasses the plugin component wrapper** that provides theme context
3. Renders **outside** the normal plugin component hierarchy
4. The Layout component is a **sibling** to admin routes, not a child of plugin providers

### Visual Hierarchy
```
Strapi Admin Root
├── DesignSystemProvider (from core)
│   └── Theme Context (from core)
│       └── Admin Layout
│           └── Menu Link (just a navigation link)
│
└── React Router
    └── Custom Route (custom-content-manager3/*)
        └── Layout Component ✗ (NO theme inheritance)
            └── Outlet
                └── ProtectedListViewPage
                    └── ListViewPage
```

---

## Key Differences Summary

| Aspect | tester-plugin | custom-content-manager3 |
|--------|--------------|------------------------|
| Registration | `app.addMenuLink({ Component })` | `app.router.addRoute()` |
| Route Type | Plugin-wrapped component | Direct router route |
| Theme Inheritance | ✓ Automatic | ✗ None |
| Provider Wrapping | ✓ By Strapi | ✗ Manual required |
| Rendering Context | Inside plugin system | Outside plugin system |
| Use Case | Simple plugin pages | Custom routing/navigation |

---

## Solutions for custom-content-manager3

### Option 1: Wrap Layout with DesignSystemProvider
```typescript
// src/plugins/custom-content-manager3/admin/src/layout.tsx
import { DesignSystemProvider } from '@strapi/design-system';

const Layout = () => {
  return (
    <DesignSystemProvider locale="en">
      {/* existing layout code */}
    </DesignSystemProvider>
  );
};
```

### Option 2: Switch to Component-Based Registration
Use `app.addMenuLink({ Component })` instead of `app.router.addRoute()` if custom routing isn't required.

### Option 3: Import Theme from Admin
```typescript
import { useTheme } from '@strapi/design-system';
// Or access Strapi's theme context if available
```

---

## Root Cause

The **architectural difference** is:

- **`addMenuLink({ Component })`**: Creates a plugin page **within** the admin app's provider tree
- **`addRoute()`**: Creates a **standalone route** at the router level, bypassing providers

This is by design to give developers flexibility, but requires manual provider management for custom routes.

---

## Recommendation

For `custom-content-manager3`, you should:

1. **Wrap the Layout component** with `DesignSystemProvider` and `ThemeProvider`
2. Or **access the theme context** from a parent provider if available
3. Or **reconsider the routing approach** if custom routing isn't essential

The current approach gives maximum control but requires manual theme management.

