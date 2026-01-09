# RBAC Error Analysis: `checkUserHasPermissions is not a function`

**Date:** January 7, 2026  
**Issue:** Error when using `ProtectedListViewPage` in `membership-list` plugin  
**Location:** `src/plugins/shared2/admin/src/pages/ListViewPageWrapped.tsx`

---

## Executive Summary

The `checkUserHasPermissions is not a function` error occurs when `ProtectedListViewPage` is rendered in the `membership-list` plugin because it's executed **outside** the Strapi admin's `AuthProvider` context. The `useRBAC` hook (line 95 in useRBAC.js) attempts to access `checkUserHasPermissions` from the AuthContext, but this context is unavailable in custom plugin routes.

---

## Root Cause Analysis

### The Problem Chain

1. **Custom Plugin Route Registration**
   - `membership-list` plugin registers a custom route via `app.router.addRoute()`
   - This creates a **separate route tree** outside Strapi's main admin shell
   - The AuthProvider is **not propagated** to this separate tree

2. **Component Hierarchy**
   ```
   membership-list Plugin Route (NO AuthProvider) ❌
     └─ App.tsx
         └─ HomePage.tsx
             └─ ListViewPageWrapped.tsx
                 └─ ProtectedListViewPage ⚠️
                     └─ useRBAC() → calls useAuth() → ERROR!
   ```

3. **useRBAC Implementation** (from attached useRBAC.js, line 95)
   ```javascript
   const checkUserHasPermissions = Auth.useAuth('useRBAC', (state)=>state.checkUserHasPermissions);
   ```
   This line throws the error because `useAuth` cannot find the AuthContext.

4. **Cascading Dependencies**
   - `ProtectedListViewPage` → calls `useRBAC()`
   - `useRBAC()` → calls `useAuth()`
   - `useAuth()` → requires `AuthProvider` context ❌
   - `DocumentRBAC` → also calls `useAuth()` internally ❌

### Why content-manager Plugin Works

The `content-manager` plugin works because it's integrated into Strapi's main admin route tree:

```
Strapi Admin Root
  └─ AuthProvider ✅
      └─ Main Router
          └─ content-manager routes
              └─ ProtectedListViewPage
                  └─ useRBAC() ✅ (has AuthProvider access)
```

---

## Technical Details

### Components Using RBAC Hooks

The following components in `ListViewPage` require RBAC context:

1. **TableActions.tsx** (line 89)
   ```typescript
   const { canRead } = useDocumentRBAC('EditAction', ({ canRead }) => ({ canRead }));
   ```

2. **BulkActions/PublishAction.tsx** (line 580)
   ```typescript
   const hasPublishPermission = useDocumentRBAC('unpublishAction', (state) => state.canPublish);
   ```

3. **BulkActions/Actions.tsx** (lines 90, 157)
   ```typescript
   const hasDeletePermission = useDocumentRBAC('deleteAction', (state) => state.canDelete);
   const hasPublishPermission = useDocumentRBAC('unpublishAction', (state) => state.canPublish);
   ```

### Shape of Permissions from useRBAC

Based on the source code analysis:

```typescript
// Return type
{
  allowedActions: Record<string, boolean>;  // e.g., { canCreate: true, canRead: true }
  isLoading: boolean;
  error?: unknown;
  permissions: Permission[];  // Array of Permission objects
}

// Permission object shape
interface Permission {
  id: number;
  action: string;              // e.g., "plugin::content-manager.explorer.create"
  subject?: string | null;     // e.g., "api::membership.membership"
  actionParameters: object;
  properties: {
    fields?: string[];         // Field-level permissions
    locales?: string[];        // Locale-level permissions
    [key: string]: any;
  };
  conditions: string[];
  createdAt: string;
  updatedAt: string;
}
```

---

## Recommended Solutions

### ⭐⭐⭐ Option 1: Use content-manager Routes (BEST - Production Ready)

**Benefits:**
- ✅ Full RBAC enforcement
- ✅ No code changes needed
- ✅ Consistent with Strapi architecture
- ✅ Secure and maintainable

**Implementation:**

Instead of creating a separate plugin route, link directly to the content-manager:

**File:** `src/plugins/membership-list/admin/src/index.ts`
```typescript
export default {
  register(app: any) {
    // Add menu link to existing content-manager route
    app.addMenuLink({
      to: `/custom-content-manager/collection-types/api::membership.membership`,
      icon: MembershipIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Memberships',
      },
    });
    
    // DON'T register a separate route - use content-manager's existing routes
    // The custom-content-manager plugin already provides the ListView functionality
    
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },
};
```

---

### ⭐⭐ Option 2: Create Mock RBAC Provider (SIMPLE - Development/Testing)

**Benefits:**
- ✅ Quick implementation
- ✅ Preserves component structure
- ⚠️ Bypasses all permission checks (security concern)

**Implementation:**

**File:** `src/plugins/shared2/admin/src/features/MockDocumentRBAC.tsx` (NEW FILE)
```typescript
import React from 'react';
import { createContext } from '@strapi/admin/strapi-admin';
import type { DocumentRBACContextValue } from './DocumentRBAC';

// Create a standalone mock RBAC provider
const [MockDocumentRBACProvider, useMockDocumentRBAC] = createContext<DocumentRBACContextValue>(
  'MockDocumentRBAC',
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

interface MockDocumentRBACProps {
  children: React.ReactNode;
}

/**
 * Mock RBAC provider for use outside AuthProvider context.
 * WARNING: This bypasses ALL permission checks!
 * Use only for development/testing or non-sensitive content.
 */
const MockDocumentRBAC = ({ children }: MockDocumentRBACProps) => {
  return (
    <MockDocumentRBACProvider
      canCreate={true}
      canCreateFields={[]}
      canDelete={true}
      canPublish={true}
      canRead={true}
      canReadFields={[]}
      canUpdate={true}
      canUpdateFields={[]}
      canUserAction={() => true}
      isLoading={false}
    >
      {children}
    </MockDocumentRBACProvider>
  );
};

export { MockDocumentRBAC, useMockDocumentRBAC };
```

**File:** `src/plugins/shared2/admin/src/pages/ListViewPageWrapped.tsx`
```typescript
import { ListViewPage } from "./ListView/ListViewPage";
import { MockDocumentRBAC } from "../features/MockDocumentRBAC";

/**
 * Wrapper for ListViewPage that provides mock RBAC context.
 * Use this when rendering outside Strapi admin's AuthProvider.
 * 
 * WARNING: This bypasses all RBAC permission checks!
 * For production, use Option 1 (content-manager routes) instead.
 */
const ListViewPageWrapped = () => {
  return (
    <MockDocumentRBAC>
      <ListViewPage />
    </MockDocumentRBAC>
  );
}

export { ListViewPageWrapped };
```

**Update child components to use mock context:**

You'll need to update components to conditionally use the mock context:

**File:** `src/plugins/shared2/admin/src/pages/ListView/components/TableActions.tsx`
```typescript
import { useDocumentRBAC } from '../../../features/DocumentRBAC';
import { useMockDocumentRBAC } from '../../../features/MockDocumentRBAC';

// In the component:
const EditAction = () => {
  // Try real RBAC first, fall back to mock if not available
  let canRead = false;
  
  try {
    const rbac = useDocumentRBAC('EditAction', ({ canRead }) => ({ canRead }));
    canRead = rbac.canRead;
  } catch {
    const mock = useMockDocumentRBAC('EditAction', ({ canRead }) => ({ canRead }));
    canRead = mock.canRead;
  }
  
  // ... rest of component
};
```

---

### ⭐ Option 3: Create Simplified Non-Protected Version

**Benefits:**
- ✅ Clear separation of concerns
- ✅ No context confusion
- ⚠️ Limited RBAC features

**Implementation:**

**File:** `src/plugins/shared2/admin/src/pages/ListViewPageSimple.tsx` (NEW FILE)
```typescript
import React from "react";
import { ListViewPage } from "./ListView/ListViewPage";
import { createContext } from "@strapi/admin/strapi-admin";
import type { DocumentRBACContextValue } from "../features/DocumentRBAC";

// Create a local context provider
const [SimpleRBACProvider] = createContext<DocumentRBACContextValue>(
  'SimpleRBAC',
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

/**
 * Simplified version of ListViewPage without AuthProvider dependency.
 * All permissions are granted by default.
 * 
 * USE CASE: Custom plugins rendered outside Strapi admin context
 * WARNING: No permission enforcement!
 */
const ListViewPageSimple = () => {
  return (
    <SimpleRBACProvider
      canCreate={true}
      canCreateFields={[]}
      canDelete={true}
      canPublish={true}
      canRead={true}
      canReadFields={[]}
      canUpdate={true}
      canUpdateFields={[]}
      canUserAction={() => true}
      isLoading={false}
    >
      <ListViewPage />
    </SimpleRBACProvider>
  );
};

export { ListViewPageSimple };
```

**File:** `src/plugins/shared2/index.ts`
```typescript
export { ListViewPage } from "./admin/src/pages/ListView/ListViewPage";
export { ListViewPageSimple } from "./admin/src/pages/ListViewPageSimple";
export { ProtectedListViewPage } from "./admin/src/pages/ListView/ListViewPage";
```

**File:** `src/plugins/shared2/admin/src/pages/ListViewPageWrapped.tsx`
```typescript
import { ListViewPageSimple } from "./ListViewPageSimple";

/**
 * Wrapper that uses the simplified non-protected version.
 * Suitable for use in custom plugins outside admin context.
 */
const ListViewPageWrapped = () => {
  return <ListViewPageSimple />;
}

export { ListViewPageWrapped };
```

**File:** `src/plugins/membership-list/admin/src/pages/HomePage.tsx`
```typescript
import { ListViewPageWrapped } from "@internal/shared2";
// OR directly: import { ListViewPageSimple } from "@internal/shared2";

const HomePage = () => {
  return (
    <>
      <div>Hello</div>
      <ListViewPageWrapped />
    </>
  );
};

export { HomePage };
```

---

## Solution Comparison Matrix

| Criteria | Option 1: Use CM Routes | Option 2: Mock Provider | Option 3: Simple Version |
|----------|------------------------|------------------------|-------------------------|
| **Security** | ✅ Full RBAC | ⚠️ No RBAC | ⚠️ No RBAC |
| **Implementation Effort** | Low | Medium | Medium-Low |
| **Maintainability** | High | Medium | High |
| **Production Ready** | ✅ Yes | ⚠️ With caveats | ⚠️ With caveats |
| **Code Changes** | Minimal | Moderate | Moderate |
| **Testing Required** | Low | High | Medium |
| **Complexity** | Low | Medium | Low |
| **Recommended For** | Production | Development/Testing | Internal tools |

---

## Decision Tree

```
Do you need RBAC permission enforcement?
  ├─ YES → Use Option 1 (content-manager routes)
  │         This is the BEST solution for production
  │
  └─ NO (or development only)
      ├─ Need quick fix? → Use Option 3 (Simple version)
      │                     Clean and straightforward
      │
      └─ Need more flexibility? → Use Option 2 (Mock provider)
                                   More control over mock behavior
```

---

## Current File Status

**Current implementation** (`ListViewPageWrapped.tsx`):
```typescript
// ❌ BROKEN: Calls ProtectedListViewPage which needs AuthProvider
import {ProtectedListViewPage} from "./ListView/ListViewPage";

const ListViewPageWrapped = () => {
  return <ProtectedListViewPage/>;
}
```

**Problem:** When used in `membership-list/HomePage.tsx`, there's no AuthProvider in the tree.

---

## Recommended Implementation Steps

### For Production (Option 1):

1. **Update `membership-list/admin/src/index.ts`:**
   - Remove custom route registration
   - Change menu link to point to content-manager route
   - Use path: `/custom-content-manager/collection-types/api::membership.membership`

2. **Remove unnecessary files:**
   - Can remove `HomePage.tsx` if only showing the list
   - Can remove `App.tsx` if no custom functionality needed

3. **Test:**
   - Verify menu link navigates correctly
   - Verify RBAC permissions are enforced
   - Verify all features work as expected

### For Development (Option 3):

1. **Create `ListViewPageSimple.tsx`** with code from Option 3

2. **Update `ListViewPageWrapped.tsx`:**
   ```typescript
   import { ListViewPageSimple } from "./ListViewPageSimple";
   
   const ListViewPageWrapped = () => {
     return <ListViewPageSimple />;
   }
   ```

3. **Test:**
   - Verify no AuthProvider errors
   - Verify all UI components render
   - Add warning comments about lack of RBAC

---

## Additional Notes

### AuthProvider Context Structure

The AuthProvider in Strapi provides:
```typescript
interface AuthContextValue {
  login: (body) => Promise<...>;
  logout: () => Promise<void>;
  checkUserHasPermissions: (permissions, passedPermissions?, context?) => Promise<Permission[]>;
  isLoading: boolean;
  permissions: Permission[];
  refetchPermissions: () => Promise<void>;
  token: string | null;
  user?: User;
}
```

### Why Custom Plugin Routes Don't Have AuthProvider

When you register a route with `app.router.addRoute()`, Strapi creates a lazy-loaded route that's loaded on-demand. This route is mounted in the router tree but doesn't automatically inherit all the context providers from the main admin shell. The AuthProvider is wrapped around the core admin routes, but not around custom plugin routes.

### Alternative: Access AuthProvider from Parent (Advanced)

Theoretically, you could try to access the AuthProvider from a parent component, but this is not officially supported and may break in future versions:

```typescript
// NOT RECOMMENDED - May break
import { useAuth } from '@strapi/admin/strapi-admin';

const App = () => {
  try {
    const auth = useAuth('App', (state) => state);
    // If this works, auth context is available
  } catch {
    // Auth context not available
  }
};
```

This approach is fragile and not recommended for production use.

---

## Conclusion

**For Production:** Use **Option 1** (content-manager routes) - it's the cleanest, most secure, and most maintainable solution.

**For Development/Testing:** Use **Option 3** (Simple version) - it's straightforward and clearly indicates the lack of RBAC.

**Avoid:** Creating custom plugin routes that try to replicate content-manager functionality with full RBAC - it's complex, error-prone, and not officially supported.

---

## References

- **useRBAC.js** (line 95): Where `checkUserHasPermissions` is called
- **ProtectedListViewPage** (ListViewPage.tsx, line 498): Where useRBAC is invoked
- **DocumentRBAC.tsx** (line 80): Where useAuth is called for permissions
- **Auth.d.ts**: Type definitions for AuthContext and Permission objects

---

**Report Generated:** January 7, 2026  
**Author:** GitHub Copilot  
**Status:** Analysis Complete - Implementation Required

