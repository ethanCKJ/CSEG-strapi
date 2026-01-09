# RBAC Solution for shared2 Shared UI Library

**Date:** January 7, 2026  
**Context:** shared2 is a shared UI library based on content-manager for use across multiple plugins  
**Constraint:** Option 2 (Mock RBAC Provider) is not viable due to existing bug  

---

## Problem Statement

The `shared2` plugin is designed as a **shared UI library** that provides content-manager functionality to other plugins. However:

1. When used within `shared2`'s own routes (`/custom-content-manager/*`), components have access to AuthProvider via the Layout
2. When used in other plugins' custom routes (e.g., `membership-list`), components are outside the AuthProvider context
3. `ProtectedListViewPage` uses `useRBAC` which requires AuthProvider → causes "checkUserHasPermissions is not a function" error

---

## Architecture Analysis

### Current shared2 Plugin Structure

```
shared2 Plugin Registration (index.ts)
  ├─ Route: /custom-content-manager/*
  │   └─ Layout (provides AuthProvider) ✅
  │       └─ routes (children)
  │           └─ ProtectedListViewPage works here ✅
  │
  └─ Exports:
      └─ ListViewPageWrapped → uses ProtectedListViewPage ❌
```

### Other Plugins Using shared2

```
membership-list Plugin
  ├─ Route: /plugins/membership-list/*
  │   └─ App (NO AuthProvider) ❌
  │       └─ HomePage
  │           └─ ListViewPageWrapped
  │               └─ ProtectedListViewPage ❌ ERROR!
```

---

## Solution: Export Multiple Component Variants

Since `shared2` is a **shared UI library**, export different variants for different contexts:

### 1. Protected Version (for use within shared2 routes)
- Uses `useRBAC` and `DocumentRBAC`
- Requires AuthProvider context
- **Use case:** Within `/custom-content-manager/*` routes

### 2. Standalone Version (for use in other plugins)
- No RBAC checks
- Provides minimal context for child components
- **Use case:** Custom plugin routes that need the UI but handle permissions differently

---

## Implementation Plan

### File Structure

```
shared2/admin/src/
├─ pages/
│   ├─ ListView/
│   │   └─ ListViewPage.tsx (core UI component)
│   ├─ ListViewPageProtected.tsx (wrapper with RBAC)
│   └─ ListViewPageStandalone.tsx (wrapper without RBAC)
├─ features/
│   ├─ DocumentRBAC.tsx (requires AuthProvider)
│   └─ DocumentRBACStandalone.tsx (NEW - no AuthProvider needed)
└─ index.ts (exports both variants)
```

### Code Implementation

#### 1. Create Standalone RBAC Context Provider

**File:** `src/plugins/shared2/admin/src/features/DocumentRBACStandalone.tsx` (NEW)

```typescript
import React from 'react';
import { createContext } from '@strapi/admin/strapi-admin';
import type { Schema } from '@strapi/types';

interface DocumentRBACContextValue {
  canCreate?: boolean;
  canCreateFields: string[];
  canDelete?: boolean;
  canPublish?: boolean;
  canRead?: boolean;
  canReadFields: string[];
  canUpdate?: boolean;
  canUpdateFields: string[];
  canUserAction: (
    fieldName: string,
    fieldsUserCanAction: string[],
    fieldType: Schema.Attribute.Kind
  ) => boolean;
  isLoading: boolean;
}

/**
 * Standalone RBAC provider that doesn't require AuthProvider context.
 * Provides full permissions by default.
 * 
 * USE CASE: When using shared2 UI components in custom plugins that
 * handle permissions differently or don't need RBAC enforcement.
 * 
 * WARNING: This bypasses all permission checks!
 */
const [DocumentRBACStandaloneProvider, useDocumentRBACStandalone] = 
  createContext<DocumentRBACContextValue>(
    'DocumentRBACStandalone',
    {
      canCreate: true,
      canCreateFields: [],
      canDelete: true,
      canPublish: true,
      canRead: true,
      canReadFields: [],
      canUpdate: true,
      canUpdateFields: [],
      canUserAction: () => true,
      isLoading: false,
    }
  );

interface DocumentRBACStandaloneProps {
  children: React.ReactNode;
  /**
   * Optional: Override default permissions
   */
  permissions?: Partial<DocumentRBACContextValue>;
}

const DocumentRBACStandalone = ({ 
  children, 
  permissions = {} 
}: DocumentRBACStandaloneProps) => {
  const defaultPermissions: DocumentRBACContextValue = React.useMemo(
    () => ({
      canCreate: true,
      canCreateFields: [],
      canDelete: true,
      canPublish: true,
      canRead: true,
      canReadFields: [],
      canUpdate: true,
      canUpdateFields: [],
      canUserAction: () => true,
      isLoading: false,
      ...permissions,
    }),
    [permissions]
  );

  return (
    <DocumentRBACStandaloneProvider {...defaultPermissions}>
      {children}
    </DocumentRBACStandaloneProvider>
  );
};

export { 
  DocumentRBACStandalone, 
  useDocumentRBACStandalone,
  DocumentRBACStandaloneProvider 
};
export type { DocumentRBACContextValue };
```

#### 2. Create Standalone ListViewPage Wrapper

**File:** `src/plugins/shared2/admin/src/pages/ListViewPageStandalone.tsx` (NEW)

```typescript
import React from 'react';
import { ListViewPage } from './ListView/ListViewPage';
import { DocumentRBACStandalone } from '../features/DocumentRBACStandalone';

/**
 * Standalone version of ListViewPage for use in custom plugins
 * without AuthProvider context.
 * 
 * This version:
 * - Does NOT use useRBAC
 * - Does NOT require AuthProvider
 * - Provides full permissions by default
 * - Suitable for custom plugin routes
 * 
 * USE CASE: Import this in plugins like membership-list that register
 * their own routes and need the ListView UI.
 * 
 * WARNING: No RBAC enforcement. Handle permissions in your plugin if needed.
 * 
 * @example
 * ```tsx
 * // In membership-list plugin
 * import { ListViewPageStandalone } from '@internal/shared2';
 * 
 * const HomePage = () => {
 *   return <ListViewPageStandalone />;
 * };
 * ```
 */
const ListViewPageStandalone = () => {
  return (
    <DocumentRBACStandalone>
      <ListViewPage />
    </DocumentRBACStandalone>
  );
};

export { ListViewPageStandalone };
```

#### 3. Keep Protected Version Separate

**File:** `src/plugins/shared2/admin/src/pages/ListViewPageProtected.tsx` (NEW)

```typescript
import React from 'react';
import { useParams } from 'react-router-dom';
import { useRBAC, Page } from '@strapi/admin/strapi-admin';
import { ListViewPage } from './ListView/ListViewPage';
import { DocumentRBAC } from '../features/DocumentRBAC';
import { PERMISSIONS } from '../constants/plugin';

/**
 * Protected version of ListViewPage with full RBAC enforcement.
 * 
 * This version:
 * - DOES use useRBAC
 * - REQUIRES AuthProvider context
 * - Enforces permissions
 * - Shows loading/error states
 * 
 * USE CASE: Use this within shared2's own routes (/custom-content-manager/*)
 * or in any route tree that has AuthProvider.
 * 
 * @example
 * ```tsx
 * // In shared2 router
 * const routes = [
 *   {
 *     path: ':collectionType/:slug',
 *     Component: ListViewPageProtected,
 *   },
 * ];
 * ```
 */
const ListViewPageProtected = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  
  const {
    permissions = [],
    isLoading,
    error,
  } = useRBAC(
    PERMISSIONS.map((action) => ({
      action,
      subject: slug,
    }))
  );

  if (isLoading) {
    return <Page.Loading />;
  }

  if (error || !slug) {
    return <Page.Error />;
  }

  return (
    <Page.Protect permissions={permissions}>
      {({ permissions }) => (
        <DocumentRBAC permissions={permissions}>
          <ListViewPage />
        </DocumentRBAC>
      )}
    </Page.Protect>
  );
};

export { ListViewPageProtected };
```

#### 4. Update ListViewPage.tsx

Remove `ProtectedListViewPage` from `ListViewPage.tsx` since we're moving it to its own file:

**File:** `src/plugins/shared2/admin/src/pages/ListView/ListViewPage.tsx`

```typescript
// Remove the ProtectedListViewPage component at the end
// Keep only:
export { ListViewPage };
```

#### 5. Update Router to Use Protected Version

**File:** `src/plugins/shared2/admin/src/router.tsx`

```typescript
import { lazy } from 'react';
import { Navigate, PathRouteProps, useParams } from 'react-router-dom';

// Import the PROTECTED version for use in shared2's routes
const ListViewPageProtected = lazy(() =>
  import('./pages/ListViewPageProtected').then((mod) => ({ 
    default: mod.ListViewPageProtected 
  }))
);

const ProtectedEditViewPage = lazy(() =>
  import('./pages/EditView/EditViewPage').then((mod) => ({ 
    default: mod.ProtectedEditViewPage 
  }))
);

// ... rest of imports

const CollectionTypePages = () => {
  const { collectionType } = useParams<{ collectionType: string }>();

  if (collectionType !== COLLECTION_TYPES && collectionType !== SINGLE_TYPES) {
    return <Navigate to="/404" />;
  }

  return collectionType === COLLECTION_TYPES ? (
    <ListViewPageProtected />
  ) : (
    <ProtectedEditViewPage />
  );
};

const routes: PathRouteProps[] = [
  {
    path: LIST_RELATIVE_PATH,
    element: <CollectionTypePages />,
  },
  // ... rest of routes
];

export { routes, CLONE_PATH, LIST_PATH };
```

#### 6. Update shared2 Main Exports

**File:** `src/plugins/shared2/index.ts`

```typescript
// Export both versions for different use cases
export { ListViewPage } from "./admin/src/pages/ListView/ListViewPage";
export { ListViewPageProtected } from "./admin/src/pages/ListViewPageProtected";
export { ListViewPageStandalone } from "./admin/src/pages/ListViewPageStandalone";

// For backward compatibility, keep this as the standalone version
export { ListViewPageStandalone as ListViewPageWrapped } from "./admin/src/pages/ListViewPageStandalone";
```

#### 7. Update membership-list Plugin

**File:** `src/plugins/membership-list/admin/src/pages/HomePage.tsx`

```typescript
import React from 'react';
import { ListViewPageStandalone } from "@internal/shared2";

/**
 * HomePage for membership-list plugin.
 * Uses the standalone version of ListView which doesn't require
 * AuthProvider context.
 */
const HomePage = () => {
  return (
    <>
      <div>Membership Management</div>
      <ListViewPageStandalone />
    </>
  );
};

export { HomePage };
```

#### 8. Update Child Components to Support Both Contexts

Components like `TableActions.tsx` that use `useDocumentRBAC` need to support both contexts:

**File:** `src/plugins/shared2/admin/src/pages/ListView/components/TableActions.tsx`

```typescript
import { useDocumentRBAC } from '../../../features/DocumentRBAC';
import { useDocumentRBACStandalone } from '../../../features/DocumentRBACStandalone';

const EditAction = () => {
  // Try to use regular RBAC first, fall back to standalone
  let canRead = false;
  
  try {
    // Try regular RBAC (requires AuthProvider)
    const rbac = useDocumentRBAC('EditAction', ({ canRead }) => ({ canRead }), false);
    canRead = rbac?.canRead ?? false;
  } catch {
    // Fall back to standalone (no AuthProvider needed)
    const rbac = useDocumentRBACStandalone('EditAction', ({ canRead }) => ({ canRead }), false);
    canRead = rbac?.canRead ?? true; // Default to true in standalone mode
  }
  
  // ... rest of component
};
```

**Better approach:** Create a unified hook that tries both:

**File:** `src/plugins/shared2/admin/src/hooks/useDocumentRBACUnified.ts` (NEW)

```typescript
import { useDocumentRBAC } from '../features/DocumentRBAC';
import { useDocumentRBACStandalone } from '../features/DocumentRBACStandalone';
import type { DocumentRBACContextValue } from '../features/DocumentRBAC';

/**
 * Unified hook that works in both protected and standalone contexts.
 * Tries regular RBAC first, falls back to standalone if unavailable.
 */
export function useDocumentRBACUnified<Selected>(
  consumerName: string,
  selector: (value: DocumentRBACContextValue) => Selected
): Selected {
  try {
    // Try regular RBAC (with AuthProvider)
    return useDocumentRBAC(consumerName, selector, false);
  } catch {
    // Fall back to standalone (no AuthProvider)
    return useDocumentRBACStandalone(consumerName, selector, false);
  }
}
```

Then update all components to use the unified hook:

```typescript
import { useDocumentRBACUnified } from '../../../hooks/useDocumentRBACUnified';

const EditAction = () => {
  const { canRead } = useDocumentRBACUnified('EditAction', ({ canRead }) => ({ canRead }));
  
  // ... rest of component
};
```

---

## Usage Guide

### For Internal Routes (within shared2)

Use the **Protected** version in your router:

```typescript
// shared2/admin/src/router.tsx
import { ListViewPageProtected } from './pages/ListViewPageProtected';

const routes = [
  {
    path: 'collection-types/:slug',
    Component: ListViewPageProtected, // ✅ Full RBAC
  },
];
```

### For Other Plugins

Use the **Standalone** version:

```typescript
// membership-list/admin/src/pages/HomePage.tsx
import { ListViewPageStandalone } from '@internal/shared2';

const HomePage = () => {
  return <ListViewPageStandalone />; // ✅ No AuthProvider needed
};
```

### Advanced: Custom Permissions in Standalone

```typescript
import { ListViewPageStandalone } from '@internal/shared2';
import { DocumentRBACStandalone } from '@internal/shared2';

const HomePage = () => {
  // Override specific permissions
  const customPermissions = {
    canDelete: false, // Disable delete in this context
    canPublish: false, // Disable publish
  };
  
  return (
    <DocumentRBACStandalone permissions={customPermissions}>
      <ListViewPage />
    </DocumentRBACStandalone>
  );
};
```

---

## Migration Path

### Step 1: Create New Files
1. Create `DocumentRBACStandalone.tsx`
2. Create `ListViewPageProtected.tsx`
3. Create `ListViewPageStandalone.tsx`
4. Create `useDocumentRBACUnified.ts`

### Step 2: Update Existing Files
1. Update `router.tsx` to use `ListViewPageProtected`
2. Update `ListViewPage.tsx` to remove `ProtectedListViewPage`
3. Update `index.ts` exports
4. Update child components to use `useDocumentRBACUnified`

### Step 3: Update Consuming Plugins
1. Update `membership-list` to use `ListViewPageStandalone`
2. Test all functionality

### Step 4: Document
1. Add JSDoc comments explaining when to use each version
2. Update README with usage examples

---

## Benefits of This Approach

✅ **Clear Separation:** Protected vs Standalone versions are explicit  
✅ **Flexible:** Works in both AuthProvider and non-AuthProvider contexts  
✅ **Maintainable:** Each version has a single responsibility  
✅ **Backward Compatible:** Existing routes continue to work  
✅ **Type-Safe:** Full TypeScript support  
✅ **Documented:** Clear use cases for each variant  

---

## Alternative: Use shared2 Routes Directly

If you don't need custom UI in membership-list, you can skip all this and just:

**File:** `src/plugins/membership-list/admin/src/index.ts`

```typescript
export default {
  register(app: any) {
    // Just add a menu link to shared2's route
    app.addMenuLink({
      to: `/custom-content-manager/collection-types/api::membership.membership`,
      icon: MembershipIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Memberships',
      },
    });
    
    // No need for custom routes - use shared2's existing routes
  },
};
```

This is the **simplest** solution if membership-list doesn't need custom UI logic.

---

## Recommended Decision Tree

```
Do you need custom logic in membership-list HomePage?
  ├─ NO → Use Alternative: Link to shared2 routes directly ⭐⭐⭐ BEST
  │        No code needed, full RBAC works
  │
  └─ YES → Implement Standalone version ⭐⭐
           Provides shared UI without RBAC dependency
```

---

## Conclusion

For a **shared UI library** like shared2, providing both Protected and Standalone variants is the right approach. It gives consuming plugins flexibility while maintaining security where needed.

If membership-list only needs to show the list view without custom logic, using shared2's routes directly is simpler and maintains full RBAC.

