# Why "After useRBAC" Logs BUT Still Errors

## Your Observation

You added logs showing:
```typescript
console.log("Before useRBAC, slug:", slug);
const { permissions, isLoading, error } = useRBAC(...);
console.log("After useRBAC is FINE, slug:", slug); // ✅ THIS PRINTS!
```

The "After useRBAC is FINE" log **does print**, yet you still get the error:
```
TypeError: checkUserHasPermissions is not a function
```

## Why This Happens

### Timeline of Execution

```
T=0ms   ProtectedListViewPage renders
        ↓
T=1ms   console.log("Before useRBAC")  ✅ PRINTS
        ↓
T=2ms   useRBAC() hook executes
        ├─ Line 95: const checkUserHasPermissions = Auth.useAuth(...)
        │  └─ NO AuthProvider context → returns undefined (doesn't throw yet!)
        ├─ Line 58: const [isLoading, setIsLoading] = useState(true)
        ├─ Line 86: Sets up useEffect (registers callback, doesn't run yet)
        └─ Returns { isLoading: true, error: undefined, permissions: [] }
        ↓
T=3ms   console.log("After useRBAC is FINE")  ✅ PRINTS
        ↓
T=4ms   Component continues rendering
        ├─ if (isLoading) return <Page.Loading />  ← Renders loading state
        ↓
T=10ms  React's reconciliation completes
        ↓
T=15ms  ⚠️ React runs queued useEffects
        ↓
T=16ms  useRBAC's useEffect callback runs (lines 100-119)
        ↓
T=17ms  Line 106: checkUserHasPermissions(actualPermissionsToCheck, ...)
        ↓
T=18ms  ❌ ERROR: checkUserHasPermissions is undefined!
                  Trying to call undefined() throws:
                  "TypeError: checkUserHasPermissions is not a function"
```

### The Key Insight

**The hook returns successfully, but the error occurs in the useEffect callback which runs AFTER the hook returns.**

## Code Analysis

### useRBAC.js Line 95
```javascript
const checkUserHasPermissions = Auth.useAuth('useRBAC', (state)=>state.checkUserHasPermissions);
```

When there's **no AuthProvider**:
- `Auth.useAuth()` tries to access context that doesn't exist
- Returns `undefined` (or throws depending on implementation)
- Stored in `checkUserHasPermissions` variable

### useRBAC.js Lines 100-119 (the useEffect)
```javascript
React__namespace.useEffect(()=>{
    if (!isEqual(permssionsChecked, actualPermissionsToCheck) || 
        contextChecked !== rawQueryContext) {
        setIsLoading(true);
        setData(undefined);
        setError(undefined);
        
        // ❌ THIS LINE THROWS THE ERROR
        checkUserHasPermissions(actualPermissionsToCheck, passedPermissions, rawQueryContext)
            .then((res)=>{ /* ... */ })
            .catch((err)=>{ setError(err); })
            .finally(()=>{ setIsLoading(false); });
    }
}, [/* dependencies */]);
```

The error occurs at line 106 when trying to **call** `checkUserHasPermissions(...)`.

## Why Your Logs Are Misleading

Your logs capture the **synchronous** execution:
1. "Before useRBAC" - ✅ prints before hook call
2. Hook executes synchronously and returns
3. "After useRBAC is FINE" - ✅ prints after hook returns

But they **miss** the **asynchronous** execution:
4. [Later] useEffect runs
5. [Even later] Error occurs inside useEffect

## Proof: Add More Logs

To see this clearly, add a log inside the error boundary:

```typescript
const ProtectedListViewPage = () => {
  const {slug = ''} = useParams();
  
  console.log("1. Before useRBAC");
  
  const { permissions, isLoading, error } = useRBAC(
    PERMISSIONS.map((action) => ({ action, subject: slug }))
  );
  
  console.log("2. After useRBAC returns", { isLoading, error });
  
  // Add this to catch errors
  React.useEffect(() => {
    console.log("3. ProtectedListViewPage mounted, isLoading:", isLoading);
    if (error) {
      console.log("4. ERROR DETECTED:", error);
    }
  }, [isLoading, error]);
  
  if (isLoading) {
    console.log("5. Rendering loading state");
    return <Page.Loading/>;
  }

  if (error || !slug) {
    console.log("6. Rendering error state");
    return <Page.Error/>;
  }
  
  console.log("7. Rendering protected content");
  return (
    <Page.Protect permissions={permissions}>
      {({permissions}) => (
        <DocumentRBAC permissions={permissions}>
          <ListViewPage/>
        </DocumentRBAC>
      )}
    </Page.Protect>
  );
};
```

**Expected output:**
```
1. Before useRBAC
2. After useRBAC returns { isLoading: true, error: undefined }
5. Rendering loading state
3. ProtectedListViewPage mounted, isLoading: true
[Error in console]: TypeError: checkUserHasPermissions is not a function
4. ERROR DETECTED: TypeError: checkUserHasPermissions is not a function
2. After useRBAC returns { isLoading: false, error: TypeError }
6. Rendering error state
```

## The Real Problem

The component is rendered in `membership-list` plugin's HomePage, which is **outside** the AuthProvider context:

```
Strapi Admin
  └─ AuthProvider ✅
      └─ Main Routes (content-manager works here)
      
  └─ Custom Plugin Route (membership-list) ❌ NO AuthProvider!
      └─ App
          └─ HomePage
              └─ ListViewPageWrapped
                  └─ ProtectedListViewPage
                      └─ useRBAC() → needs AuthProvider ❌
```

## Solutions

### Option 1: Use Standalone Version (From Report)

Create a version that doesn't use useRBAC:

```typescript
// ListViewPageStandalone.tsx
const ListViewPageStandalone = () => {
  return (
    <DocumentRBACStandalone>
      <ListViewPage />
    </DocumentRBACStandalone>
  );
};

// membership-list/HomePage.tsx
import { ListViewPageStandalone } from '@internal/shared2';
const HomePage = () => <ListViewPageStandalone />;
```

### Option 2: Link to shared2's Routes (Simplest)

Don't create custom routes at all:

```typescript
// membership-list/index.ts
app.addMenuLink({
  to: `/custom-content-manager/collection-types/api::membership.membership`,
  icon: MembershipIcon,
  // ...
});
// No custom route needed!
```

## Conclusion

Your logs prove that:
1. ✅ useRBAC **does return successfully**
2. ✅ The hook call itself **doesn't throw**
3. ❌ The error occurs **later** in the useEffect
4. ❌ The error is **asynchronous**, not synchronous

The misleading part is that React hooks return immediately, but their effects run later. Your logs captured the synchronous part (hook return) but missed the asynchronous part (useEffect execution) where the actual error occurs.

