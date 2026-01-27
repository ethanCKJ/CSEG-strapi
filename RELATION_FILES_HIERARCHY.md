# Relation Files Hierarchy & Architecture

This document explains the role of each relation-related file in the `custom-content-manager3` plugin and their hierarchical relationships.

## Overview

The relation system is organized into 5 layers:
1. **Data Layer** - Contracts and API services
2. **Utility Layer** - Helper functions
3. **Edit View Layer** - Interactive relation editor
4. **List View Layer** - Read-only display
5. **Drag & Drop Layer** - Visual feedback

---

## 1. Data Layer (Contracts & Services)

### `shared/contracts/relations.ts`

**Role:** TypeScript type definitions and API contracts

**Key Exports:**
- `RelationResult` - Interface for relation data
  ```typescript
  {
    documentId: string,
    id: number,
    status?: 'draft' | 'published',
    locale?: string,
    [key: string]: any  // Additional fields
  }
  ```
- `Pagination` - Pagination metadata
- `FindAvailable` - Namespace for searching available relations
- `FindExisting` - Namespace for fetching existing relations

**Used By:** All other relation files for type safety

---

### `admin/src/services/relations.ts`

**Role:** RTK Query API endpoints for fetching relation data

**Key Exports:**
- `useGetRelationsQuery` - Hook to fetch existing relations
  - Endpoint: `GET /content-manager/relations/:model/:id/:targetField`
  - Used in: Edit view to load connected relations

- `useLazySearchRelationsQuery` - Hook to search available relations
  - Endpoint: `GET /content-manager/relations/:model/:targetField`
  - Used in: Combobox search in edit view

- `useSearchRelationsQuery` - Non-lazy version of search

**Special Features:**
- `prepareTempKeys()` - Adds `__temp_key__` to each relation for stable drag & drop identifiers
- Custom merge logic for pagination
- Caching and deduplication

**Used By:** `Relations.tsx`, `TableCells/Relations.tsx`

---

## 2. Utility Layer

### `admin/src/utils/relations.ts`

**Role:** Helper functions for relation display

**Key Export:**
- `getRelationLabel(relation, mainField)` → `string`
  - Extracts display label from relation's mainField
  - Falls back to `documentId` if mainField not found
  - Handles type checking for safety

**Used By:** All UI components that display relation labels

---

## 3. UI Layer - Edit View (Main Relation Editor)

### `admin/src/pages/EditView/components/FormInputs/Relations/Relations.tsx`

**Role:** Primary component for editing relations (1285 lines)

**Architecture:**

```
RelationsInput (Main Entry)
    ├─ Combobox (Search & Select)
    │  ├─ useLazySearchRelationsQuery - Search available relations
    │  ├─ useHandleDisconnect - Handle remove/undo
    │  └─ Opens RelationModal on click
    │
    └─ RelationsList (Display Connected)
        ├─ FixedSizeList (react-window virtual list)
        ├─ useDragAndDrop - Drag & drop reordering
        └─ ListItem × N
            ├─ Drag handle (Drag icon)
            ├─ Label link → Opens RelationModal
            ├─ DocumentStatus badge
            └─ Disconnect button (X)
```

**Key Components:**

#### 1. **RelationsInput** (line ~477)
- Main entry point component
- Combobox for searching and selecting relations
- Handles connection/disconnection logic
- Supports drag & drop reordering
- Opens RelationModal for editing

**Key Props:**
```typescript
{
  name: string,              // Form field name
  mainField: MainField,      // Field to display in labels
  disabled: boolean,
  error?: string,
  size?: 'S' | 'M',
  type: 'oneWay' | 'manyWay'
}
```

#### 2. **RelationsList** (line ~780)
- Virtual list container using `react-window`
- Height calculation: `RELATION_ITEM_HEIGHT (50px) × items + gaps`
- Drag & drop zone with shadow indicators
- Scroll behavior optimization

**Features:**
- Virtual rendering for performance with many relations
- Drag & drop reordering with fractional indexing
- Shadow boxes to indicate drop position

#### 3. **ListItem** (line ~1076)
- Individual relation item in the list
- **Structure:**
  - Drag handle icon (left)
  - Relation label (clickable link)
  - DocumentStatus badge (draft/published)
  - Disconnect button (X icon, right)

**Behavior:**
- Click label → Opens RelationModal
- Click X → Disconnects relation
- Drag → Reorder relations

#### 4. **useHandleDisconnect** Hook (line ~70)
- Manages connect/disconnect arrays
- If relation in `connect` array → Remove from connect
- If relation already saved → Add to `disconnect` array

**Form Data Structure:**
```typescript
interface RelationsFormValue {
  connect?: Array<{
    id: number,
    documentId: string,
    locale?: string,
    position?: {
      before?: string,
      after?: string
    }
  }>,
  disconnect?: Array<{
    id: number,
    documentId: string,
    locale?: string
  }>
}
```

**Key Constants:**
- `RELATIONS_TO_DISPLAY = 5` - Number shown before "Show X more"
- `ONE_WAY_RELATIONS` - Relation types that don't support multiple
- `RELATION_ITEM_HEIGHT = 50` - Height of each item in pixels
- `RELATION_GUTTER = 4` - Gap between items

**Styled Components:**
- `ShadowBox` (line ~1019) - Drag position indicator
- `FlexWrapper` (line ~1234) - Item container
- `DisconnectButton` (line ~1244) - Styled X button
- `LinkEllipsis` (line ~1256) - Ellipsis for long labels

**Used By:** Form system in EditViewPage

---

### `admin/src/pages/EditView/components/FormInputs/Relations/RelationModal.tsx`

**Role:** Modal for editing related documents inline

**Key Component:** `RelationModalRenderer`

**Features:**
- Opens related document in 90% width/height modal
- Full edit form with all fields
- Document history stack for navigation (breadcrumb)
- Unsaved changes confirmation
- "Open in full page" button → EditViewPage

**State Management:**
```typescript
{
  documentHistory: DocumentMeta[],        // Navigation stack
  confirmDialogIntent:
    | null                                // No dialog
    | 'close'                            // Close modal
    | 'back'                             // Go back in history
    | 'navigate'                         // Open in full page
    | DocumentMeta,                      // Open specific doc
  isModalOpen: boolean,
  hasUnsavedChanges: boolean
}
```

**Navigation Flow:**
1. User clicks relation label in RelationsInput
2. Modal opens with related document form
3. User can edit and save without leaving modal
4. User can navigate through relations (builds history stack)
5. User can open in full page if needed

**Used By:** Relations.tsx

---

## 4. UI Layer - List View (Read-Only Display)

### `admin/src/pages/ListView/components/TableCells/Relations.tsx`

**Role:** Display relations in table cells (read-only)

**Components:**

#### 1. **RelationSingle** (line ~20)
- For single relation fields (oneToOne, manyToOne)
- Displays: Relation label as Typography
- No interaction - just display

**Example:** `"John Doe"`

#### 2. **RelationMultiple** (line ~35)
- For multiple relation fields (oneToMany, manyToMany)
- Displays: Count with click dropdown
- Lazy loads data on menu open
- Shows first 10 relations + "..." if more

**Example:** `"3 items"` → Click → Menu with relations

**Features:**
- Click count → Opens Menu dropdown
- `useGetRelationsQuery` triggered on open
- Shows loading state while fetching
- Ellipsis indicator if >10 relations

**Used By:** ListView table cells

---

## 5. Drag & Drop Layer

### `admin/src/components/DragPreviews/RelationDragPreview.tsx`

**Role:** Visual preview while dragging relation items

**Features:**
- Shows relation label during drag
- Semi-transparent preview
- Follows cursor during drag operation

**Used By:** Relations.tsx drag & drop system

---

## Data Flow Diagrams

### User Edits Relation in EditView

```
1. User types in RelationsInput (Combobox)
   │
   ├─→ useLazySearchRelationsQuery()
   │   └─→ GET /relations/:model/:targetField?_q=search
   │       └─→ Returns available relations to connect
   │
2. User selects relation from dropdown
   │
   ├─→ addFieldRow(`${fieldName}.connect`, relation)
   │   └─→ Form state updated with connection
   │       └─→ Relation appears in RelationsList
   │
3. User clicks relation label in list
   │
   ├─→ RelationModal opens
   │   └─→ Full edit form for related document
   │       └─→ Can save changes inline
   │
4. User drags to reorder relations
   │
   ├─→ useDragAndDrop updates positions
   │   └─→ Fractional indexing calculates new position
   │       └─→ Form state updated with new order
   │
5. User clicks disconnect button (X)
   │
   ├─→ useHandleDisconnect()
   │   ├─→ If in connect array → removeFieldRow()
   │   └─→ If already saved → addFieldRow to disconnect array
   │
6. User saves document
   │
   └─→ Server processes connect/disconnect arrays
       ├─→ Creates new relations from connect
       ├─→ Removes relations from disconnect
       └─→ Updates relation positions
```

### User Views Relation in ListView

```
1. Table cell renders
   │
   ├─→ Single relation?
   │   └─→ RelationSingle component
   │       └─→ Shows label directly (no API call)
   │
   └─→ Multiple relations?
       └─→ RelationMultiple component
           ├─→ Shows count from pre-loaded data
           │
           └─→ User clicks count
               └─→ Menu opens
                   └─→ useGetRelationsQuery() fires
                       └─→ GET /relations/:model/:id/:targetField
                           └─→ Returns first 10 relations
                               └─→ Displays in dropdown menu
```

---

## Key Editing Points for UI Customization

### Edit View (Main Editor)

**File:** `Relations.tsx` (1285 lines)

| Component | Line | What to Edit |
|-----------|------|--------------|
| RelationsInput | ~477 | Combobox styling, search behavior, connection logic |
| RelationsList | ~780 | Virtual list container, drag & drop zone styling |
| ListItem | ~1076 | Individual item appearance and layout |
| ShadowBox | ~1019 | Drag position indicator styling |
| FlexWrapper | ~1234 | Item container styling |
| DisconnectButton | ~1244 | X button appearance |
| LinkEllipsis | ~1256 | Clickable label styling |

**Common UI Edits:**

1. **Change item height:**
   - Modify `RELATION_ITEM_HEIGHT` constant (line 765)

2. **Change drag handle icon:**
   - Edit `ListItem` component, replace `<Drag />` icon

3. **Change disconnect button styling:**
   - Edit `DisconnectButton` styled component

4. **Add more info to list items:**
   - Edit `ListItem` component, add fields between drag handle and label

5. **Change search behavior:**
   - Edit `RelationsInput`, modify Combobox props

### List View (Read-Only Display)

**File:** `TableCells/Relations.tsx`

| Component | Line | What to Edit |
|-----------|------|--------------|
| RelationSingle | ~20 | Typography styling for single relation |
| RelationMultiple | ~35 | Menu dropdown styling, count display format |

**Common UI Edits:**

1. **Change count format:**
   - Edit `RelationMultiple`, modify `formatMessage` call

2. **Change dropdown max items:**
   - Modify query params in `useGetRelationsQuery` (pageSize)

3. **Add icons to dropdown items:**
   - Edit `Menu.Item` rendering in `RelationMultiple`

### Modal Editing

**File:** `RelationModal.tsx`

| What to Edit | Where |
|--------------|-------|
| Modal size | `StyledModalContent` styled component (90% width/height) |
| Navigation controls | `RelationModalRenderer` component |
| Unsaved changes dialog | `confirmDialogIntent` state handling |

---

## API Endpoints

### Get Existing Relations
```
GET /content-manager/relations/:model/:id/:targetField
Query: { page, pageSize, locale, status, _q, idsToOmit, idsToInclude }
Response: { results: RelationResult[], pagination: Pagination }
```

### Search Available Relations
```
GET /content-manager/relations/:model/:targetField
Query: { page, pageSize, locale, _q, idsToOmit, idsToInclude }
Response: { results: RelationResult[], pagination: Pagination }
```

---

## Testing Files

- `Relations.test.tsx` - Tests for main Relations component
- `RelationModal.test.tsx` - Tests for modal functionality
- `Relation.test.tsx` - Tests for ListView relation cells

---

## Summary

**To edit the relation UI, focus on:**

1. **`Relations.tsx`** - Main editing interface (search, list, drag & drop)
2. **`RelationModal.tsx`** - Inline editing modal
3. **`TableCells/Relations.tsx`** - Read-only table display

**Key hooks to understand:**
- `useGetRelationsQuery` - Fetch existing relations
- `useLazySearchRelationsQuery` - Search available relations
- `useHandleDisconnect` - Connect/disconnect logic
- `useDragAndDrop` - Reordering functionality

**Data flows from:**
- API → RTK Query cache → React components → User interaction → Form state → Save → API
