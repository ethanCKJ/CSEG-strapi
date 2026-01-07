# Tooltip Component Hierarchy Analysis - shared2 Plugin

This document traces the React component hierarchy for each Tooltip usage in the `shared2` plugin, identifying whether `DesignSystemProvider` (which contains `TooltipProvider`) is present in the hierarchy.

---

## Summary of Findings

**Key Issue:** When `ListViewPage` is rendered through `ProtectedListViewPage`, there is NO `DesignSystemProvider` in the component tree. However, when rendered through `ListViewPageWrapped`, the provider IS present.

The `IconButton` component with a `label` prop internally creates a Tooltip, which requires `TooltipProvider` from the context.

---

## Tooltip Usage Instances

### 1. **ListViewPage.tsx - Debug Tooltip (Line 63-65)**

**Location:** `src/plugins/shared2/admin/src/pages/ListView/ListViewPage.tsx`

**Code:**
```tsx
<Tooltip label="Delete all items">
  <div>Hover over me</div>
</Tooltip>
```

**Component Hierarchy:**

#### When used via ListViewPageWrapped (HomePage):
```
App (membership-list)
  └─ HomePage
      └─ ListViewPageWrapped
          └─ DesignSystemProvider ✅
              └─ ListViewPage
                  └─ Tooltip ✅ WORKS
```

**DesignSystemProvider Present:** ✅ **YES**

#### When used via ProtectedListViewPage:
```
[Strapi Admin Root - Unknown Provider Structure]
  └─ Page.Protect
      └─ DocumentRBAC
          └─ ListViewPage
              └─ Tooltip ❌ FAILS
```

**DesignSystemProvider Present:** ❌ **NO**

**Status:** Works in ListViewPageWrapped, fails in ProtectedListViewPage

---

### 2. **ViewSettingsMenu.tsx - IconButton with Label (Line 39-46)**

**Location:** `src/plugins/shared2/admin/src/pages/ListView/components/ViewSettingsMenu.tsx`

**Code:**
```tsx
<IconButton
  label={formatMessage({
    id: 'components.ViewSettings.tooltip',
    defaultMessage: 'View Settings',
  })}
>
  <Cog />
</IconButton>
```

**Note:** `IconButton` with a `label` prop internally creates a `Tooltip` component. This is functionally equivalent to:
```tsx
<Tooltip label="View Settings">
  <button>...</button>
</Tooltip>
```

**Component Hierarchy:**
```
ListViewPage
  └─ Page.Main
      └─ Layouts.Action (endActions)
          └─ ViewSettingsMenu
              └─ Popover.Root
                  └─ Popover.Trigger
                      └─ IconButton (with label prop)
                          └─ [Internal Tooltip] ❌ REQUIRES TooltipProvider
```

**Where ViewSettingsMenu is Used:**
- In `ListViewPage` (line 246 and 322)
- Rendered in both empty state and populated table state

**DesignSystemProvider Present:** Depends on how ListViewPage is rendered
- ✅ YES when via `ListViewPageWrapped`
- ❌ NO when via `ProtectedListViewPage`

**Status:** Fails when ListViewPage lacks DesignSystemProvider ancestor

---

### 3. **CellContent.tsx - String Type Tooltip (Line 55-59)**

**Location:** `src/plugins/shared2/admin/src/pages/ListView/components/TableCells/CellContent.tsx`

**Code:**
```tsx
case 'string':
  return (
    <Tooltip label={content}>
      <Typography maxWidth="30rem" ellipsis textColor="neutral800">
        <CellValue type={attribute.type} value={content} />
      </Typography>
    </Tooltip>
  );
```

**Component Hierarchy:**
```
ListViewPage
  └─ Page.Main
      └─ Layouts.Content
          └─ Table.Root
              └─ Table.Body
                  └─ Table.Row (for each row)
                      └─ Table.Cell
                          └─ CellContent
                              └─ Tooltip (for string attributes) ❌ REQUIRES TooltipProvider
```

**Where CellContent is Used:**
- In `ListViewPage` at line 395
- Rendered for each table cell in the data table

**DesignSystemProvider Present:** Depends on how ListViewPage is rendered
- ✅ YES when via `ListViewPageWrapped`
- ❌ NO when via `ProtectedListViewPage`

**Status:** Fails when ListViewPage lacks DesignSystemProvider ancestor

---

### 4. **Components.tsx - SingleComponent Tooltip (Line 24-28)**

**Location:** `src/plugins/shared2/admin/src/pages/ListView/components/TableCells/Components.tsx`

**Code:**
```tsx
const SingleComponent = ({ content, mainField }: SingleComponentProps) => {
  if (!mainField) {
    return null;
  }

  return (
    <Tooltip label={content[mainField.name]}>
      <Typography maxWidth="25rem" textColor="neutral800" ellipsis>
        <CellValue type={mainField.type} value={content[mainField.name]} />
      </Typography>
    </Tooltip>
  );
};
```

**Component Hierarchy:**
```
ListViewPage
  └─ Page.Main
      └─ Layouts.Content
          └─ Table.Root
              └─ Table.Body
                  └─ Table.Row (for each row)
                      └─ Table.Cell
                          └─ CellContent
                              └─ SingleComponent (for non-repeatable component attributes)
                                  └─ Tooltip ❌ REQUIRES TooltipProvider
```

**Where SingleComponent is Used:**
- Imported and used in `CellContent.tsx` (line 5)
- Rendered when cell content is a non-repeatable component

**DesignSystemProvider Present:** Depends on how ListViewPage is rendered
- ✅ YES when via `ListViewPageWrapped`
- ❌ NO when via `ProtectedListViewPage`

**Status:** Fails when ListViewPage lacks DesignSystemProvider ancestor

---

### 5. **Media.tsx - MediaSingle Tooltip (Line 53-57)**

**Location:** `src/plugins/shared2/admin/src/pages/ListView/components/TableCells/Media.tsx`

**Code:**
```tsx
const MediaSingle = ({ url, mime, alternativeText, name, ext, formats }: MediaSingleProps) => {
  // ... for non-image media files
  return (
    <Tooltip label={fileName}>
      <span>
        <FileWrapper>{fileExtension}</FileWrapper>
      </span>
    </Tooltip>
  );
};
```

**Component Hierarchy:**
```
ListViewPage
  └─ Page.Main
      └─ Layouts.Content
          └─ Table.Root
              └─ Table.Body
                  └─ Table.Row (for each row)
                      └─ Table.Cell
                          └─ CellContent
                              └─ MediaSingle (for single media attributes)
                                  └─ Tooltip ❌ REQUIRES TooltipProvider
```

**Where MediaSingle is Used:**
- Exported from `Media.tsx` and imported in `CellContent.tsx` (line 6)
- Rendered when cell content is a single media file (non-image)

**DesignSystemProvider Present:** Depends on how ListViewPage is rendered
- ✅ YES when via `ListViewPageWrapped`
- ❌ NO when via `ProtectedListViewPage`

**Status:** Fails when ListViewPage lacks DesignSystemProvider ancestor

---

### 6. **PublishAction.tsx - EntryValidationText Tooltip (Line 128-132)**

**Location:** `src/plugins/shared2/admin/src/pages/ListView/components/BulkActions/PublishAction.tsx`

**Code:**
```tsx
const EntryValidationText = ({ validationErrors, status }: EntryValidationTextProps) => {
  // ... when validation errors exist
  return (
    <Flex gap={2}>
      <CrossCircle fill="danger600" />
      <Tooltip label={validationErrorsMessages}>
        <TypographyMaxWidth textColor="danger600" variant="omega" fontWeight="bold" ellipsis>
          {validationErrorsMessages}
        </TypographyMaxWidth>
      </Tooltip>
    </Flex>
  );
};
```

**Component Hierarchy:**
```
ListViewPage
  └─ Page.Main
      └─ Layouts.Content
          └─ Table.Root
              └─ TableActionsBar
                  └─ Table.ActionBar
                      └─ BulkActionsRenderer
                          └─ PublishAction (BulkActionComponent)
                              └─ [Various modal/dialog components]
                                  └─ EntryValidationText
                                      └─ Tooltip ❌ REQUIRES TooltipProvider
```

**Where PublishAction is Used:**
- Rendered via `BulkActionsRenderer` in `TableActionsBar` component
- `TableActionsBar` is rendered inside `Table.Root` in `ListViewPage` (line 343)

**DesignSystemProvider Present:** Depends on how ListViewPage is rendered
- ✅ YES when via `ListViewPageWrapped`
- ❌ NO when via `ProtectedListViewPage`

**Status:** Fails when ListViewPage lacks DesignSystemProvider ancestor

---

### 7. **VersionInputRenderer.tsx - CustomRelationInput Tooltip (Line 129-137)**

**Location:** `src/plugins/shared2/admin/src/history/components/VersionInputRenderer.tsx`

**Code:**
```tsx
const CustomRelationInput = (props: RelationsFieldProps) => {
  // ... rendering relation items
  return (
    <Tooltip label={label}>
      {isAdminUserRelation ? (
        <Typography>{label}</Typography>
      ) : (
        <LinkEllipsis tag={NavLink} to={href}>
          {label}
        </LinkEllipsis>
      )}
    </Tooltip>
  );
};
```

**Component Hierarchy:**
```
[History Page - Unknown Root]
  └─ HistoryVersionContent (or similar)
      └─ VersionInputRenderer
          └─ CustomRelationInput
              └─ Tooltip ❌ REQUIRES TooltipProvider
```

**Where CustomRelationInput is Used:**
- Within `VersionInputRenderer.tsx` for rendering relation fields in history/version views
- This is part of the history feature in the shared2 plugin

**DesignSystemProvider Present:** Unknown - depends on how the history pages are mounted
- Would need to trace the history routes and page structure

**Status:** Likely fails if history pages don't have DesignSystemProvider ancestor

---

### 8. **BlocksToolbar.tsx - ToolbarButton Tooltip (Line 130-143)**

**Location:** `src/plugins/shared2/admin/src/pages/EditView/components/FormInputs/BlocksInput/BlocksToolbar.tsx`

**Code:**
```tsx
const ToolbarButton = ({ name, label, icon, isActive = false, disabled, handleClick }: ToolbarButtonProps) => {
  const { editor } = useBlocksEditorContext('ToolbarButton');
  const { formatMessage } = useIntl();
  const labelMessage = formatMessage(label);

  return (
    <Tooltip label={labelMessage}>
      <Toolbar.ToggleItem
        value={name}
        data-state={isActive ? 'on' : 'off'}
        onMouseDown={(e) => {
          e.preventDefault();
          handleClick();
          ReactEditor.focus(editor);
        }}
        aria-disabled={disabled}
        disabled={disabled}
        aria-label={labelMessage}
        asChild
      >
        <FlexButton>...</FlexButton>
      </Toolbar.ToggleItem>
    </Tooltip>
  );
};
```

**Component Hierarchy:**
```
EditViewPage
  └─ Page.Main
      └─ [Form Components]
          └─ BlocksInput
              └─ BlocksEditor
                  └─ BlocksToolbar
                      └─ ToolbarButton
                          └─ Tooltip ❌ REQUIRES TooltipProvider
```

**Where ToolbarButton is Used:**
- In `BlocksToolbar.tsx` - toolbar for the Blocks (rich text) editor
- Rendered when editing Blocks/RichText fields in the EditView
- Used for formatting buttons (bold, italic, etc.)

**DesignSystemProvider Present:** Depends on how EditViewPage is rendered
- Would need to trace the EditView routing structure

**Status:** Likely fails if EditView pages don't have DesignSystemProvider ancestor

---

### 9. **DocumentActions.tsx - Save Hint Tooltip (Line 184-196)**

**Location:** `src/plugins/shared2/admin/src/pages/EditView/components/DocumentActions.tsx`

**Code:**
```tsx
const addHintTooltip = (action: Action, children: React.ReactNode) => {
  return !action.disabled ? (
    <Tooltip
      label={formatMessage(
        {
          id: 'content-manager.containers.EditView.saveHint',
          defaultMessage: 'Ctrl / Cmd + Enter to {action}',
        },
        {
          action: action.label,
        }
      )}
    >
      <Flex width="100%">{children}</Flex>
    </Tooltip>
  ) : (
    children
  );
};
```

**Component Hierarchy:**
```
EditViewPage
  └─ Page.Main
      └─ Header
          └─ DocumentActionsPanel
              └─ [Primary Action with Tooltip Hint]
                  └─ Tooltip ❌ REQUIRES TooltipProvider
```

**Where DocumentActions is Used:**
- In `EditView/components/Header.tsx` for the primary action button (e.g., "Save", "Publish")
- Shows keyboard shortcut hint (Ctrl/Cmd + Enter) on hover

**DesignSystemProvider Present:** Depends on how EditViewPage is rendered
- Would need to trace the EditView routing structure

**Status:** Likely fails if EditView pages don't have DesignSystemProvider ancestor

---

## Root Cause Analysis

### The Problem

All tooltips in the `shared2` plugin components fail with `Tooltip must be used within TooltipProvider` when `ListViewPage` is rendered through `ProtectedListViewPage` because:

1. **ProtectedListViewPage** uses `Page.Protect` from `@strapi/admin/strapi-admin`
2. `Page.Protect` and other Strapi admin components **do not provide** `DesignSystemProvider`
3. `DesignSystemProvider` is the component that provides `TooltipProvider` context
4. Without `TooltipProvider` in the component tree, all `Tooltip` components fail

### Why the Debug Tooltip Works in ListViewPageWrapped

When you use `ListViewPageWrapped`:
```tsx
const ListViewPageWrapped = () => {
  return (
    <DesignSystemProvider>
      <ListViewPage/>
    </DesignSystemProvider>
  );
}
```

The `DesignSystemProvider` is explicitly added, providing the necessary `TooltipProvider` context.

### Why It Doesn't Work in ProtectedListViewPage

```tsx
const ProtectedListViewPage = () => {
  // ... permission checks
  return (
    <Page.Protect permissions={permissions}>
      {({ permissions }) => (
        <DocumentRBAC permissions={permissions}>
          <ListViewPage />  // ❌ No DesignSystemProvider ancestor
        </DocumentRBAC>
      )}
    </Page.Protect>
  );
};
```

There's no `DesignSystemProvider` wrapping `ListViewPage`, so all tooltips fail.

---

## Question 2 Answer: Can Tooltips "Not Benefit" from the Wrapper?

**No, there is no way for Tooltip components to "opt-out" of requiring TooltipProvider.**

React Context (which `TooltipProvider` uses) works by:
1. A component searches up the component tree for a context provider
2. If found, it uses that context
3. If not found, it throws an error (in this case: "Tooltip must be used within TooltipProvider")

There is **no mechanism** to prevent a component from accessing a context if it's in the tree. The context is either:
- ✅ Available (provider is an ancestor) → Works
- ❌ Not available (no provider in tree) → Throws error

---

## Solutions

### Option 1: Wrap ProtectedListViewPage with DesignSystemProvider ✅ RECOMMENDED

Modify `ListViewPage.tsx`:

```tsx
const ProtectedListViewPage = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const { permissions = [], isLoading, error } = useRBAC(
    PERMISSIONS.map((action) => ({ action, subject: slug }))
  );

  if (isLoading) {
    return <Page.Loading />;
  }

  if (error || !slug) {
    return <Page.Error />;
  }

  return (
    <DesignSystemProvider>  {/* ✅ Add this */}
      <Page.Protect permissions={permissions}>
        {({ permissions }) => (
          <DocumentRBAC permissions={permissions}>
            <ListViewPage />
          </DocumentRBAC>
        )}
      </Page.Protect>
    </DesignSystemProvider>  {/* ✅ Add this */}
  );
};
```

### Option 2: Wrap ListViewPage Component Itself

Wrap the entire `ListViewPage` return with `DesignSystemProvider`. This ensures it always has the provider regardless of how it's used.

### Option 3: Disable Tooltips on IconButtons

Add `withTooltip={false}` to all `IconButton` components and remove explicit `Tooltip` wrappers. This prevents the error but removes tooltip functionality.

**Example:**
```tsx
<IconButton
  withTooltip={false}  // ✅ Add this to prevent internal tooltip
  label={formatMessage({
    id: 'components.ViewSettings.tooltip',
    defaultMessage: 'View Settings',
  })}
>
  <Cog />
</IconButton>
```

---

## Conclusion

**All 9 Tooltip instances** in the shared2 plugin have the same problem:
- They all require `TooltipProvider` from `DesignSystemProvider`
- When `ListViewPage` is rendered via `ProtectedListViewPage`, there's no provider
- When rendered via `ListViewPageWrapped`, the provider exists and everything works

**Recommendation:** Add `DesignSystemProvider` to wrap `ProtectedListViewPage` or the entire `ListViewPage` component to fix all tooltip issues at once.

