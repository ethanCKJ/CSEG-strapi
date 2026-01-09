# Component Export Architecture Plan (Version 2)

**Created:** 2026-01-08
**Status:** Proposal - Awaiting Approval

---

## Executive Summary

**Solution**: **Component Library with Provider Wrapper**

shared2 exports reusable UI components that plugins can compose into their own pages. This gives you:

- ✅ **Full UI control** - Plugins compose their own layouts from shared components
- ✅ **No provider errors** - shared2 exports a provider wrapper with all contexts
- ✅ **Modifiable UI** - Plugins can customize, wrap, or replace components
- ✅ **Flexible architecture** - Mix high-level and low-level components as needed
- ✅ **Separate routes** - Each plugin owns its routes and navigation

**Trade-off accepted**: Slightly more complex plugin code (~100-200 lines vs ~40 lines in centralized routing approach)

---

## User Requirements

1. **UI modifiability is important** - Need control over UI components
2. **Export UI components** - Table, create button, create form, etc.
3. **Components use URL to determine data type** - Extract model from route params
4. **Prefer simplicity and independence** - No mysterious unknowns

---

## Architecture Overview

```
Strapi Admin (has AuthProvider, DesignSystemProvider)
  │
  ├─ shared2 Plugin (UI component library)
  │   └─ Exports:
  │       ├─ <ContentManagerProvider> - Wrapper with all providers
  │       ├─ <ListViewTable> - Data table with sorting/filtering
  │       ├─ <CreateButton> - Create new entry button
  │       ├─ <EditForm> - Form for editing documents
  │       ├─ <DocumentActions> - Action buttons/menu
  │       └─ Hooks: useDocument, useDocumentActions, useDocumentLayout
  │
  ├─ membership-list Plugin
  │   └─ Routes: /plugins/membership-list/*
  │       └─ <ContentManagerProvider model="api::member-application.member-application">
  │           └─ Custom page layout
  │               ├─ Custom header
  │               ├─ <ListViewTable />
  │               ├─ Custom sidebar
  │               └─ <CreateButton label="New Application" />
  │
  └─ events Plugin
      └─ Routes: /plugins/events/*
          └─ <ContentManagerProvider model="api::event.event">
              └─ <ListViewTable />
              └─ <CreateButton label="New Event" />
```

**How it works:**
1. Each plugin creates its own routes
2. Plugin wraps page in `<ContentManagerProvider>` with model prop
3. Provider makes AuthProvider, RBAC, and data available via context
4. Plugin composes UI from exported components
5. Full control over layout, styling, and behavior

---

## Three Flexibility Options

### Option A: High-Level Components (Recommended)

**Philosophy**: Export page-level components that are largely complete but accept props for customization.

**Example Usage:**
```typescript
import { ContentManagerProvider, ListViewTable, CreateButton } from '@internal/shared2';

export const HomePage = () => {
  return (
    <ContentManagerProvider model="api::member-application.member-application">
      <Box padding={8}>
        <Flex justifyContent="space-between">
          <Typography variant="alpha">Membership Applications</Typography>
          <CreateButton label="Create New Application" />
        </Flex>

        <Typography variant="omega">Manage CSEG membership applications</Typography>

        <ListViewTable />
      </Box>
    </ContentManagerProvider>
  );
};
```

### Option B: Mid-Level Components (More Flexibility)

**Philosophy**: Export smaller pieces that plugins compose into custom layouts.

**Components:**
- `<DataTable />` - Just the table
- `<FilterBar />` - Just filters
- `<PaginationControls />` - Just pagination
- `<BulkActionBar />` - Just bulk actions

**Example Usage:**
```typescript
<ContentManagerProvider model="api::event.event">
  <CustomLayout>
    <CustomHeader />
    <FilterBar />
    <BulkActionBar />
    <DataTable />
    <PaginationControls />
  </CustomLayout>
</ContentManagerProvider>
```

### Option C: Hooks-Only (Maximum Control)

**Philosophy**: Only export hooks, plugin builds entire UI from scratch.

**Example Usage:**
```typescript
const { model } = useContentType();
const { document, schema } = useDocument({ model });
const { list, edit } = useDocumentLayout(model);
const { create, update, delete: del } = useDocumentActions();
const { canCreate, canUpdate, canDelete } = useDocumentRBAC();

// Build completely custom UI
return (
  <MyCustomTable
    data={documents}
    schema={schema}
    onUpdate={update}
    canUpdate={canUpdate}
  />
);
```

---

## Key Components Design

### 1. ContentManagerProvider

**Purpose**: Wraps children with all necessary providers and context

**File**: `src/plugins/shared2/admin/src/components/ContentManagerProvider.tsx`

```typescript
export interface ContentManagerProviderProps {
  /** Content type UID - can override URL param */
  model?: string;

  /** Collection type or single type */
  collectionType?: 'collection-types' | 'single-types';

  /** Children to render */
  children: ReactNode;

  /** Optional: Custom permissions */
  permissions?: string[];
}

export const ContentManagerProvider = ({
  model: modelProp,
  collectionType = 'collection-types',
  children,
  permissions: customPermissions,
}: ContentManagerProviderProps) => {
  // Get model from URL or prop
  const { slug: urlSlug } = useParams<{ slug?: string }>();
  const model = modelProp || urlSlug;

  // Get permissions via useRBAC
  const { permissions, isLoading, error } = useRBAC(/* ... */);

  // Return wrapped children
  return (
    <Page.Protect permissions={permissions}>
      {({ permissions }) => (
        <DocumentRBAC permissions={permissions}>
          <ContentTypeContext.Provider value={{ model, collectionType }}>
            {children}
          </ContentTypeContext.Provider>
        </DocumentRBAC>
      )}
    </Page.Protect>
  );
};
```

**What it provides:**
- ✅ RBAC context (via `useRBAC` and `DocumentRBAC`)
- ✅ Content type context (via `ContentTypeContext`)
- ✅ Loading/error states
- ✅ Permission protection
- ✅ Works in ANY route (plugin routes, custom routes)

### 2. ListViewTable

**Purpose**: Reusable table component with sorting, filtering, pagination, bulk actions

**File**: `src/plugins/shared2/admin/src/components/ListViewTable.tsx`

```typescript
export interface ListViewTableProps {
  /** Optional: Override which columns to show */
  columns?: string[];

  /** Optional: Custom actions per row */
  customActions?: DocumentActionComponent[];

  /** Optional: Custom bulk actions */
  customBulkActions?: BulkActionComponent[];
}

export const ListViewTable = ({
  columns,
  customActions,
  customBulkActions,
}: ListViewTableProps) => {
  const { model, collectionType } = useContentType();

  // Use existing ListView logic
  // ... implementation ...

  return (
    <div>
      {/* Filters */}
      {/* Bulk actions */}
      {/* Table */}
      {/* Pagination */}
    </div>
  );
};
```

**Features:**
- Automatic data fetching based on model
- Built-in sorting, filtering, pagination
- Customizable columns
- Extensible actions

### 3. CreateButton

**Purpose**: Button to navigate to create page

**File**: `src/plugins/shared2/admin/src/components/CreateButton.tsx`

```typescript
export interface CreateButtonProps {
  /** Custom button label */
  label?: string;

  /** Button variant */
  variant?: 'primary' | 'secondary';

  /** Additional query params */
  queryParams?: object;
}

export const CreateButton = ({ label, variant = 'primary', queryParams }: CreateButtonProps) => {
  const { model } = useContentType();

  return (
    <Button
      variant={variant}
      tag={ReactRouterLink}
      to={{
        pathname: 'create',
        search: stringify(queryParams),
      }}
    >
      {label || 'Create new entry'}
    </Button>
  );
};
```

---

## Implementation Plan

### Phase 1: Create ContentManagerProvider

1. **Create provider component** (`ContentManagerProvider.tsx`)
   - Wraps children with RBAC, DocumentRBAC, and context
   - Provides model to children via context
   - Handles loading/error states

2. **Create useContentType hook**
   - Returns `{ model, collectionType }` from context
   - Throws error if used outside provider

3. **Test provider standalone**
   - Create test page in shared2
   - Verify RBAC works
   - Verify no TooltipProvider errors
   - Test with different models

### Phase 2: Extract Reusable Components

1. **Extract ListViewTable**
   - Move table logic from `ListViewPage.tsx` to `ListViewTable.tsx`
   - Make it a pure component accepting props
   - Use `useContentType()` for model
   - Keep all existing features (sorting, filtering, pagination, bulk actions)

2. **Extract CreateButton**
   - Simple button component
   - Use React Router Link for navigation
   - Accept custom label prop

3. **Extract EditForm** (optional for MVP)
   - Form rendering logic as component
   - Accept custom field renderers

4. **Update exports.ts**
   - Export all new components
   - Export provider and hooks
   - Export TypeScript types

### Phase 3: Update membership-list Plugin

1. **Update package.json**
   - Ensure `@internal/shared2` dependency exists

2. **Create custom page using components**
   - Import provider and components from shared2
   - Build custom layout
   - Add plugin-specific UI elements

3. **Update routing**
   - Keep existing route registration
   - Update page to use new components

4. **Test full flow**
   - Menu navigation works
   - CRUD operations work
   - Permissions enforced correctly
   - No RBAC errors
   - No TooltipProvider errors

### Phase 4: Create events & research Plugins

1. **Create plugin structure**
   - Similar to membership-list
   - Different custom layouts

2. **Use shared components**
   - Test different customization patterns

3. **Validate architecture**
   - Ensure components are truly reusable
   - Test various UI compositions

---

## Benefits

### 1. Full UI Control ✅
- Plugins compose their own layouts
- Can add custom headers, sidebars, descriptions
- Can wrap or extend components
- Can build completely custom UI if needed

### 2. No Provider Errors ✅
- `ContentManagerProvider` includes all necessary providers
- Explicit, no mysterious wiring
- Works in any route context

### 3. Gradual Adoption ✅
- Start with high-level components (easy)
- Drop down to mid-level for more control
- Use hooks-only for complete freedom
- Mix approaches as needed

### 4. Maintainability ✅
- Components are reusable but optional
- Bug fixes in shared2 propagate automatically
- Plugins can override any component

### 5. Clear Dependencies ✅
- Explicit imports from `@internal/shared2`
- TypeScript types for all components
- No magic, everything is traceable

---

## Trade-offs

### Compared to Centralized Routing Approach (Version 1):

| Aspect | v1 (Centralized) | v2 (Components) |
|--------|------------------|-----------------|
| **Plugin code** | ~40 lines (just registration) | ~100-200 lines (page composition) |
| **Route ownership** | shared2 owns all routes | Each plugin owns routes |
| **Provider setup** | Automatic (via shared2 Layout) | Manual (wrap in ContentManagerProvider) |
| **UI control** | Limited (only via props/config) | Full (compose your own layout) |
| **Customization** | Button text, icon, position | Complete layout, styling, behavior |

**Worth it?** Yes, if UI modifiability is important (which it is for you!)

---

## Questions to Resolve

Before implementation:

1. **Component granularity**: Start with high-level (ListViewTable) or mid-level (DataTable, FilterBar)?
   - **Recommendation**: Start high-level for MVP, add mid-level as needed

2. **Provider approach**: Should ContentManagerProvider be mandatory?
   - **Recommendation**: Mandatory - explicit is better than implicit

3. **Customization API**: What props should components accept?
   - Render props for slots?
   - Custom renderers via props?
   - CSS classes/styles?
   - **Recommendation**: All of the above, add incrementally

4. **Backward compatibility**: Should shared2 keep its current routes?
   - **Recommendation**: Keep for now, can deprecate later

---

## Validation Plan

After implementation, verify:

### 1. Provider Works
- [ ] No "checkUserHasPermissions is not a function" errors
- [ ] No TooltipProvider errors
- [ ] RBAC permissions enforced correctly
- [ ] Works with different models

### 2. Components Work
- [ ] ListViewTable displays data correctly
- [ ] Sorting, filtering, pagination work
- [ ] CreateButton navigates correctly
- [ ] Custom labels appear

### 3. Plugin Integration
- [ ] membership-list menu item appears
- [ ] Navigation to plugin works
- [ ] Custom layout renders
- [ ] Shared components integrate seamlessly

### 4. Full CRUD
- [ ] List view displays
- [ ] Create new entry
- [ ] Edit existing entry
- [ ] Delete entry
- [ ] Bulk actions work

---

## File Changes Required

### New Files
1. `src/plugins/shared2/admin/src/components/ContentManagerProvider.tsx`
2. `src/plugins/shared2/admin/src/components/ListViewTable.tsx`
3. `src/plugins/shared2/admin/src/components/CreateButton.tsx`

### Modified Files
1. `src/plugins/shared2/admin/src/exports.ts` - Add component exports
2. `src/plugins/membership-list/admin/src/pages/HomePage.tsx` - Use new components
3. `src/plugins/membership-list/admin/src/index.ts` - Keep route registration

### Optional (Future)
1. `src/plugins/shared2/admin/src/components/EditForm.tsx`
2. `src/plugins/shared2/admin/src/components/DataTable.tsx`
3. `src/plugins/shared2/admin/src/components/FilterBar.tsx`

---

## Next Steps

1. **Discuss and approve this plan**
2. **Implement Phase 1** - ContentManagerProvider
3. **Test provider** - Verify no errors
4. **Implement Phase 2** - Extract ListViewTable, CreateButton
5. **Implement Phase 3** - Update membership-list
6. **Test end-to-end** - Full CRUD cycle
7. **Iterate** - Add more components as needed
8. **Document** - Component API documentation

---

## References

- **Previous plan**: See `linked-mixing-hedgehog_1.md` for centralized routing approach
- **Strapi patterns**: Plugin-to-plugin registration is standard (see history plugin example)
- **Current exports**: `src/plugins/shared2/admin/src/exports.ts`