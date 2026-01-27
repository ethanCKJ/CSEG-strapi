# Relations Dropdown - Final Solution

## The Problem
The relations dropdown only showed 10 relations with no scroll option, even when there were 20+ in the database.

## Root Cause
The code was using `useLazySearchRelationsQuery` which doesn't automatically return accumulated cache results from RTK Query's `merge` function.

### Why Lazy Queries Don't Work Well Here
```typescript
// ❌ Old approach with lazy query
const [searchForTrigger, { data, isLoading }] = useLazySearchRelationsQuery();

// The `data` returned is ONLY the last query result, not the accumulated cache
const options = data?.results ?? [];  // Only shows current page!
```

With lazy queries:
- The RTK Query `merge` function still updates the cache correctly
- BUT the hook's `data` property only returns the **most recent query result**
- This means page 2 replaces page 1 instead of accumulating

## The Solution
**Use `useSearchRelationsQuery` (non-lazy) instead of `useLazySearchRelationsQuery`**

```typescript
// ✅ New approach with non-lazy query
const { data, isLoading } = useSearchRelationsQuery(
  {
    model,
    targetField,
    params: {
      ...currentDocumentMeta.params,
      id: id ?? '',
      pageSize: 20,  // Increased from 10
      idsToInclude: field.value?.disconnect?.map((rel) => rel.id.toString()) ?? [],
      idsToOmit: field.value?.connect?.map((rel) => rel.id.toString()) ?? [],
      ...searchParamsDebounced,
    },
  },
  {
    skip: !isRelatedToCurrentDocument || !id,  // Only run when needed
  }
);

// Now data.results contains accumulated results from merge function!
const options = data?.results ?? [];
```

## Why This Works

### RTK Query Merge Function (in services/relations.ts)
```typescript
merge: (currentCache, newItems) => {
  if (currentCache.pagination && newItems.pagination) {
    if (currentCache.pagination.page < newItems.pagination.page) {
      // Accumulate results when loading more pages
      const existingIds = currentCache.results.map((item) => item.documentId);
      const uniqueNewItems = newItems.results.filter(
        (item) => !existingIds.includes(item.documentId)
      );
      currentCache.results.push(...uniqueNewItems);
      currentCache.pagination = newItems.pagination;
    } else if (newItems.pagination.page === 1) {
      // Reset results for new searches
      currentCache.results = newItems.results;
      currentCache.pagination = newItems.pagination;
    }
  }
}
```

### Cache Key (serializeQueryArgs)
```typescript
serializeQueryArgs: (args) => {
  const { endpointName, queryArgs } = args;
  return {
    endpointName,
    model: queryArgs.model,
    targetField: queryArgs.targetField,
    _q: queryArgs.params?._q,
    idsToOmit: queryArgs.params?.idsToOmit,
    idsToInclude: queryArgs.params?.idsToInclude,
  };
  // Note: `page` is NOT in the cache key!
  // This allows merge to accumulate across pages
}
```

### How It Works
1. **Page 1**: Query runs → Cache empty → Merge adds 20 results → Hook returns 20 results
2. **User scrolls**: `onLoadMore` triggers → `page` increments to 2
3. **Page 2**: Query runs → Cache has page 1 → Merge appends 20 more → Hook returns **40 results**
4. **User searches**: `_q` changes → Cache key changes → New cache → Merge resets → Hook returns fresh results

## Key Differences

| Approach | Lazy Query | Non-Lazy Query |
|----------|------------|----------------|
| **Trigger** | Manual with `searchForTrigger()` | Automatic when params change |
| **Data returned** | Last query result only | Accumulated cache |
| **Complexity** | Need manual state management | Automatic via RTK Query |
| **Code lines** | ~70 lines | ~20 lines |

## Changes Made

### 1. Import Change
```diff
  import {
    RelationResult,
    useGetRelationsQuery,
-   useLazySearchRelationsQuery,
+   useSearchRelationsQuery,
  } from '../../../../../services/relations';
```

### 2. Hook Usage
```diff
- const [searchForTrigger, { data, isLoading }] = useLazySearchRelationsQuery();
- // ... 50+ lines of manual accumulation logic ...
+ const { data, isLoading } = useSearchRelationsQuery(
+   { model, targetField, params: {...} },
+   { skip: !isRelatedToCurrentDocument || !id }
+ );
```

### 3. PageSize Increase
```diff
  params: {
    ...currentDocumentMeta.params,
    id: id ?? '',
-   pageSize: 10,
+   pageSize: 20,
    idsToInclude: field.value?.disconnect?.map((rel) => rel.id.toString()) ?? [],
    idsToOmit: field.value?.connect?.map((rel) => rel.id.toString()) ?? [],
    ...searchParamsDebounced,
  },
```

## Benefits

✅ **Simpler Code**: 50+ lines removed, no manual state management
✅ **Better Performance**: RTK Query handles caching and deduplication
✅ **Automatic Updates**: Query reruns when dependencies change
✅ **Proper Accumulation**: Merge function works as designed
✅ **Consistent Behavior**: Same pattern as `useGetRelationsQuery`

## Result
- All 20+ relations are now visible in the dropdown
- Scroll/load-more works properly with accumulation
- Code is cleaner and more maintainable
- Follows RTK Query best practices

## Why Original Strapi Code Has The Same Issue
The `shared/content-manager` uses `useLazySearchRelationsQuery` with the same pattern, so it likely has the same bug. They probably just haven't tested with large relation sets or haven't noticed the issue yet.
