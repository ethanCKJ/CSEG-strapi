# Relations Dropdown Bug Analysis

## Question
Why did the original code identical to `shared/content-manager/.../Relations.tsx` not have the problem?

## Answer
**The original Strapi code DOES have the same problem!**

## The Issue

### RTK Query Merge vs Hook Data

The RTK Query `searchRelations` endpoint has a `merge` function defined in `services/relations.ts`:

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

**This merge function DOES update the cache correctly!**

### The Problem with Lazy Queries

However, when using `useLazySearchRelationsQuery()`:

```typescript
const [searchForTrigger, { data, isLoading }] = useLazySearchRelationsQuery();
```

The `data` property returned from the hook is **NOT the accumulated cache** - it's **only the result of the most recent query execution**.

### Why This Matters

```typescript
// In Relations.tsx (both shared and custom-content-manager3):
const options = data?.results ?? [];  // ❌ Only shows latest page, not accumulated
```

When the user:
1. Opens dropdown → Page 1 loaded (10 results) → `options` has 10 items
2. Scrolls down → `onLoadMore` triggered → Page incremented
3. New query executed → Page 2 loaded (10 more results)
4. **Problem**: `data.results` now contains ONLY page 2's results, not pages 1+2!

The cache has both pages, but the hook's `data` property only reflects the last query.

## Why Lazy Queries Behave This Way

From RTK Query documentation:
- The `merge` function updates the **shared cache**
- The hook `data` returns the **individual query result**
- For lazy queries, you need to either:
  1. Manually accumulate results in component state (our solution)
  2. Use `selectFromResult` to read from the cache
  3. Use the non-lazy hook version

## Our Solution

We accumulate results in component state:

```typescript
const [allResults, setAllResults] = React.useState<RelationResult[]>([]);

React.useEffect(() => {
  if (data?.results) {
    setAllResults((prev) => {
      // Reset results if it's page 1 (new search)
      if (searchParams.page === 1) {
        return data.results;
      }
      // Append new results to existing ones for subsequent pages
      const existingIds = new Set(prev.map(r => r.id));
      const newResults = data.results.filter(r => !existingIds.has(r.id));
      return [...prev, ...newResults];
    });
  }
}, [data?.results, searchParams.page]);

const options = allResults;  // ✅ Now uses accumulated results
```

## Why the Original Code Appears to Work

The original Strapi code likely:
1. Has the same bug but it hasn't been reported/noticed
2. Is only tested with small datasets (< 10 relations)
3. Has the bug masked by the increased dropdown height we also added

## Alternative Solutions

### Option 1: Use Non-Lazy Query
Instead of `useLazySearchRelationsQuery`, use `useSearchRelationsQuery` with skip conditions.

### Option 2: Use selectFromResult
Access the accumulated cache through `selectFromResult`, though this is complex with lazy queries.

### Option 3: Our Current Solution (Recommended)
Accumulate in component state - simple, explicit, and works reliably.

## Conclusion

Both the original `shared/content-manager` and our `custom-content-manager3` had the same bug. The RTK Query merge function works correctly for the cache, but lazy query hooks don't automatically expose the accumulated cache. Our fix properly addresses this by maintaining accumulated results in component state.
