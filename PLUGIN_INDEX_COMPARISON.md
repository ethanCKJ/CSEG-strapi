# Plugin Index File Comparison: shared2 vs tester-plugin

## Overview

This document compares the `index.ts` files of two Strapi plugins:
- **shared2**: A complex, feature-rich content manager plugin (141 lines)
- **tester-plugin**: A simple, minimal plugin (44 lines)

---

## Key Differences Summary

| Feature | shared2 | tester-plugin |
|---------|---------|---------------|
| **Complexity** | High (141 lines) | Low (44 lines) |
| **Redux Integration** | ✅ Yes | ❌ No |
| **Custom Routing** | ✅ Yes (`app.router.addRoute`) | ❌ No (uses standard `Component` in menuLink) |
| **Widgets** | ✅ Yes (3 widgets) | ❌ No |
| **Bootstrap Hook** | ✅ Yes | ❌ No |
| **Plugin Class** | ✅ Yes (`ContentManagerPlugin`) | ❌ No (inline config) |
| **Menu Link Path** | `to: PLUGIN_ID` (direct) | `to: \`plugins/${PLUGIN_ID}\`` (prefixed) |
| **Translation Handling** | Custom with `prefixPluginTranslations` | Simple direct import |

---

## Detailed Comparison

### 1. Imports

#### shared2
```typescript
import { CheckCircle, Feather, Pencil, PuzzlePiece } from '@strapi/icons';
import { PLUGIN_ID } from './constants/plugin';
import { ContentManagerPlugin } from './content-manager';
import { historyAdmin } from './history';
import { reducer } from './modules/reducers';
import { routes } from './router';
import { prefixPluginTranslations } from './utils/translations';
import type { WidgetArgs } from '@strapi/admin/strapi-admin';
import 'prismjs';  // Side-effect import for syntax highlighting
```

**Imports 9 items** including:
- Multiple icons (4 different icons)
- Plugin class and configuration
- Redux reducer
- Routes configuration
- Translation utilities
- Third-party library (prismjs)

#### tester-plugin
```typescript
import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
```

**Imports 4 items** - only essentials:
- Translation utility
- Plugin ID
- Initializer component
- Icon component

---

### 2. Register Function

#### shared2 - Complex Registration

```typescript
register(app: any) {
  const cm = new ContentManagerPlugin();  // ← Instantiates plugin class

  // 1. Redux Integration
  app.addReducers({
    [PLUGIN_ID]: reducer,
  });

  // 2. Menu Link (direct path)
  app.addMenuLink({
    to: PLUGIN_ID,  // ← Goes directly to plugin root
    icon: Feather,
    intlLabel: {
      id: `content-manager.plugin.name`,
      defaultMessage: 'Content Manager',
    },
    permissions: [],
    position: 1,
  });

  // 3. Custom Router with Lazy Loading
  app.router.addRoute({
    path: 'custom-content-manager/*',
    lazy: async () => {
      const { Layout } = await import('./layout');
      return { Component: Layout };
    },
    children: routes,  // ← Nested routes
  });

  // 4. Register Plugin Configuration
  app.registerPlugin(cm.config);

  // 5. Widgets Registration (3 widgets)
  app.widgets.register((widgets: WidgetArgs[]) => {
    // ... 90+ lines of widget configuration
    // Registers: lastEditedWidget, lastPublishedWidget, entriesWidget
    // Includes widget reordering logic
  });
}
```

**Features:**
- ✅ Redux state management
- ✅ Custom routing system
- ✅ Widget registration (dashboard widgets)
- ✅ Plugin class architecture
- ✅ Complex layout system
- ✅ Nested routes

#### tester-plugin - Simple Registration

```typescript
register(app: any) {
  // 1. Menu Link with Component
  app.addMenuLink({
    to: `plugins/${PLUGIN_ID}`,  // ← Standard plugin path
    icon: PluginIcon,
    intlLabel: {
      id: `${PLUGIN_ID}.plugin.name`,
      defaultMessage: PLUGIN_ID,
    },
    Component: async () => {  // ← Component directly in menuLink
      const { App } = await import('./pages/App');
      return App;
    },
  });

  // 2. Register Plugin (minimal config)
  app.registerPlugin({
    id: PLUGIN_ID,
    initializer: Initializer,
    isReady: false,
    name: PLUGIN_ID,
  });
}
```

**Features:**
- ✅ Simple menu link
- ✅ Basic plugin registration
- ❌ No Redux
- ❌ No custom routing
- ❌ No widgets

---

### 3. Menu Link Path Strategy

#### shared2: Direct Path
```typescript
app.addMenuLink({
  to: PLUGIN_ID,  // e.g., "custom-content-manager"
  // ...
});
```

The route is registered separately:
```typescript
app.router.addRoute({
  path: 'custom-content-manager/*',
  // ...
});
```

**Result:** Navigates to `/admin/custom-content-manager`

#### tester-plugin: Prefixed Path
```typescript
app.addMenuLink({
  to: `plugins/${PLUGIN_ID}`,  // e.g., "plugins/tester-plugin"
  Component: async () => { /* ... */ },
  // ...
});
```

**Result:** Navigates to `/admin/plugins/tester-plugin`

**Why the difference?**
- **shared2** replaces the default content manager, so it uses a custom path
- **tester-plugin** is a standard plugin, so it uses the conventional `plugins/` prefix

---

### 4. Routing Architecture

#### shared2: Separate Router Configuration
```typescript
// In register():
app.router.addRoute({
  path: 'custom-content-manager/*',
  lazy: async () => {
    const { Layout } = await import('./layout');
    return { Component: Layout };
  },
  children: routes,  // ← External route configuration
});
```

**Characteristics:**
- Separate route file (`./router`)
- Lazy-loaded layout
- Nested child routes
- Wildcard path matching (`/*`)
- Custom layout component

**Architecture:**
```
custom-content-manager/*
  └─ Layout (lazy loaded)
      └─ routes (from ./router)
          ├─ ListView
          ├─ EditView
          └─ ... other routes
```

#### tester-plugin: Component in Menu Link
```typescript
app.addMenuLink({
  // ...
  Component: async () => {
    const { App } = await import('./pages/App');
    return App;
  },
});
```

**Characteristics:**
- Component directly embedded in menu link
- Single-level routing
- No separate router file
- Simpler architecture

**Architecture:**
```
plugins/tester-plugin
  └─ App component (lazy loaded)
      └─ (internal routing if needed)
```

---

### 5. Redux Integration

#### shared2: Full Redux Setup
```typescript
import { reducer } from './modules/reducers';

register(app: any) {
  app.addReducers({
    [PLUGIN_ID]: reducer,
  });
  // ...
}
```

**Implications:**
- Plugin has its own Redux slice
- Can manage complex state across components
- State persists during navigation
- Useful for:
  - Document management
  - Filter states
  - UI preferences
  - Data caching

#### tester-plugin: No Redux
- No state management setup
- Relies on:
  - Component state (useState)
  - React Context
  - Props drilling
  - Or external state libraries

---

### 6. Widget System

#### shared2: Registers 3 Dashboard Widgets

```typescript
app.widgets.register((widgets: WidgetArgs[]) => {
  const lastEditedWidget: WidgetArgs = {
    icon: Pencil,
    title: { id: '...', defaultMessage: 'Last edited entries' },
    component: async () => {
      const { LastEditedWidget } = await import('./components/Widgets');
      return LastEditedWidget;
    },
    pluginId: PLUGIN_ID,
    id: 'last-edited-entries',
    permissions: [{ action: 'plugin::content-manager.explorer.read' }],
  };

  const lastPublishedWidget: WidgetArgs = { /* ... */ };
  const entriesWidget: WidgetArgs = { /* ... */ };

  // Complex widget insertion logic
  const profileInfoIndex = widgets.findIndex(/* ... */);
  if (profileInfoIndex !== -1) {
    const newWidgets: WidgetArgs[] = [...widgets];
    newWidgets.splice(profileInfoIndex + 1, 0, entriesWidget);
    return [lastEditedWidget, lastPublishedWidget, ...newWidgets];
  }

  return [lastEditedWidget, lastPublishedWidget, ...widgets, entriesWidget];
});
```

**Widget Features:**
- Adds 3 widgets to admin dashboard
- Widgets are lazily loaded
- Permission-based visibility
- Custom positioning (inserts after profile-info widget)
- Modifies existing widget array

**Widget IDs:**
1. `last-edited-entries`
2. `last-published-entries`
3. `chart-entries`

#### tester-plugin: No Widgets
- Does not interact with dashboard widgets
- Simpler plugin scope

---

### 7. Bootstrap Hook

#### shared2: Has Bootstrap
```typescript
bootstrap(app: any) {
  if (typeof historyAdmin.bootstrap === 'function') {
    historyAdmin.bootstrap(app);
  }
  // Commented out: previewAdmin.bootstrap(app)
}
```

**Purpose:**
- Runs after all plugins are registered
- Used for:
  - Additional feature initialization (history feature)
  - Cross-plugin integration
  - Late-stage configuration

#### tester-plugin: No Bootstrap
- No bootstrap hook
- All setup happens in `register()`

---

### 8. Translation Handling

#### shared2: Custom Prefixing
```typescript
async registerTrads({ locales }: { locales: string[] }) {
  const importedTrads = await Promise.all(
    locales.map((locale) => {
      return import(`./translations/${locale}.json`)
        .then(({ default: data }) => {
          return {
            data: prefixPluginTranslations(data, PLUGIN_ID),  // ← Custom utility
            locale,
          };
        })
        .catch(() => {
          return {
            data: {},
            locale,
          };
        });
    })
  );

  return Promise.resolve(importedTrads);
}
```

**Features:**
- Uses `prefixPluginTranslations` utility
- Automatically prefixes all translation keys with plugin ID
- Error handling returns empty object
- Wraps result in Promise.resolve()

**Example transformation:**
```javascript
// Before prefixing:
{ "button.save": "Save" }

// After prefixing with "custom-content-manager":
{ "custom-content-manager.button.save": "Save" }
```

#### tester-plugin: Simple Import
```typescript
async registerTrads({ locales }: { locales: string[] }) {
  return Promise.all(
    locales.map(async (locale) => {
      try {
        const { default: data } = await import(`./translations/${locale}.json`);
        return { data, locale };
      } catch {
        return { data: {}, locale };
      }
    })
  );
}
```

**Features:**
- Direct import without transformation
- Simple try/catch error handling
- Returns directly without extra wrapping

---

### 9. Plugin Configuration

#### shared2: Plugin Class Pattern
```typescript
import { ContentManagerPlugin } from './content-manager';

register(app: any) {
  const cm = new ContentManagerPlugin();
  // ...
  app.registerPlugin(cm.config);
}
```

**Architecture:**
- Plugin configuration extracted to separate class
- Allows for:
  - Complex configuration logic
  - Reusable plugin methods
  - Better code organization
  - Testability

**Likely structure:**
```typescript
// ./content-manager.ts
export class ContentManagerPlugin {
  config = {
    id: PLUGIN_ID,
    // ... complex configuration
  };
  
  // Other methods...
}
```

#### tester-plugin: Inline Configuration
```typescript
app.registerPlugin({
  id: PLUGIN_ID,
  initializer: Initializer,
  isReady: false,
  name: PLUGIN_ID,
});
```

**Architecture:**
- Configuration inline
- Simpler for small plugins
- All properties immediately visible

---

### 10. Additional Exports

#### shared2: Re-exports
```typescript
export * from './exports';
```

**Purpose:**
- Exports components/utilities for use by other plugins
- Makes shared2 a "shared library" plugin
- Other plugins can import from shared2:
  ```typescript
  import { SomeComponent } from '@internal/shared2';
  ```

#### tester-plugin: No Exports
- Self-contained plugin
- No exports for external use

---

## Architectural Patterns

### shared2: Enterprise-Level Plugin

**Pattern**: Complex, feature-rich application plugin

**Characteristics:**
- ✅ Redux for state management
- ✅ Custom routing system
- ✅ Widget integration
- ✅ Plugin class architecture
- ✅ Module federation (exports)
- ✅ Bootstrap lifecycle
- ✅ Complex initialization
- ✅ Multiple sub-features (history, preview)

**Use Cases:**
- Content management systems
- Complex data manipulation
- Multi-view applications
- Dashboard integration
- Replacing core functionality

### tester-plugin: Simple Plugin

**Pattern**: Minimal, single-purpose plugin

**Characteristics:**
- ✅ Simple registration
- ✅ Single-page component
- ✅ No external dependencies
- ✅ Self-contained
- ✅ Standard plugin path

**Use Cases:**
- Utility plugins
- Simple admin pages
- Testing/prototyping
- Single-feature additions
- Learning/examples

---

## Why These Differences Matter

### 1. **Menu Link Path Difference**

```typescript
// shared2
to: PLUGIN_ID  // Direct access, replaces core content manager

// tester-plugin  
to: `plugins/${PLUGIN_ID}`  // Standard plugin location
```

**Impact:**
- shared2 can replace Strapi's built-in content manager
- tester-plugin is an add-on alongside existing features

### 2. **Routing Strategy**

```typescript
// shared2: External router + layout
app.router.addRoute({ /* separate routing config */ })

// tester-plugin: Component in menu
app.addMenuLink({ Component: async () => { /* ... */ } })
```

**Impact:**
- shared2 can have nested routes (ListView, EditView, etc.)
- tester-plugin has single-level navigation

### 3. **State Management**

```typescript
// shared2: Redux
app.addReducers({ [PLUGIN_ID]: reducer })

// tester-plugin: No Redux
// (relies on component state or Context)
```

**Impact:**
- shared2 can maintain complex state across navigation
- tester-plugin state resets on navigation or refresh

### 4. **Widget Integration**

```typescript
// shared2: Dashboard widgets
app.widgets.register((widgets) => { /* ... */ })

// tester-plugin: None
```

**Impact:**
- shared2 extends admin dashboard with data widgets
- tester-plugin is isolated to its own page

---

## When to Use Each Pattern

### Use shared2 Pattern When:
- Building a complex feature-rich plugin
- Need state management across multiple views
- Replacing core Strapi functionality
- Adding dashboard widgets
- Managing complex data relationships
- Need nested routing
- Plugin exports utilities for others

### Use tester-plugin Pattern When:
- Building a simple utility plugin
- Single-page functionality
- Quick prototyping
- Learning plugin development
- Self-contained features
- No complex state requirements
- Standard plugin addition

---

## Conclusion

The **shared2** plugin is a **complex, enterprise-level application** that:
- Replaces Strapi's content manager
- Uses advanced patterns (Redux, custom routing, widgets)
- Serves as a shared library for other plugins

The **tester-plugin** is a **simple, minimal plugin** that:
- Follows standard plugin conventions
- Uses simpler patterns
- Is self-contained and easy to understand

Both are valid approaches depending on plugin requirements and complexity.

