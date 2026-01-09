# Architecture Approach Comparison

**Date:** 2026-01-08
**Status:** Analysis Document

---

## Overview

This document compares two architectural approaches for sharing UI across custom Strapi plugins:

1. **Approach A: Plugin Redirection** - Plugins redirect to custom-content-manager routes
2. **Approach B: Component Export** - custom-content-manager exports UI components

---

## Approach A: Plugin Redirection (Centralized Routing)

### How It Works

```
Plugin Registration Flow:
1. Plugin calls: customContentManager.registerContentType({ model, icon, label })
2. custom-content-manager creates menu link pointing to its own routes
3. User clicks menu → navigates to /custom-content-manager/collection-types/{model}
4. custom-content-manager's pages extract model from URL
5. All providers (Auth, RBAC, DesignSystem) are available
```

### Pros ✅

#### 1. **Zero Provider Issues**
- All routes under `/custom-content-manager/*` have full provider context
- AuthProvider, DesignSystemProvider, TooltipProvider all available
- **No mysterious errors** - everything works because it's within Strapi's main route tree
- No TooltipProvider errors that plagued previous export attempts

#### 2. **Minimal Plugin Code**
- Plugins are ~40 lines (just registration)
- No complex component imports
- No provider wrapping logic
- Easy to create new plugins (30 minutes)

#### 3. **Consistent UX**
- All content types use same UI patterns
- Consistent navigation, layout, behavior
- Users get familiar interface across all content types

#### 4. **Single Source of Truth**
- Bug fixes in custom-content-manager apply everywhere instantly
- One place to maintain UI code
- Strapi updates only require changes in one plugin

#### 5. **Proven Pattern**
- This is how Strapi's built-in content-manager works
- Well-understood by Strapi developers
- Follows platform conventions

### Cons ❌

#### 1. **Limited UI Customization** ⚠️ CRITICAL
- Plugins can only customize via props/config (button text, icon, position)
- **Cannot change layout structure** - all plugins must use same page layout
- Cannot add custom headers, sidebars, or sections
- Cannot rearrange components on the page
- **This is a dealbreaker for complex plugins**

#### 2. **Plugins Don't Own Their Routes**
- Routes belong to custom-content-manager
- Cannot have plugin-specific URL structure
- URL is always `/custom-content-manager/collection-types/{model}`
- Plugin identity less clear to users

#### 3. **Difficult for Complex Use Cases** ⚠️ CRITICAL
- Adding unique features requires extending custom-content-manager
- Cannot have plugin-specific workflows
- Cannot integrate third-party libraries easily
- **Cannot build "1-2 much more complex plugins" that you mentioned**

#### 4. **Tight Coupling**
- Plugins deeply coupled to custom-content-manager's architecture
- Changes in custom-content-manager can break plugins
- Hard to develop plugins independently

### Best For
- Simple CRUD content types (members, events, publications)
- When UI consistency is more important than customization
- Teams wanting minimal maintenance burden

---

## Approach B: Component Export (UI Library)

### How It Works

```
Component Export Flow:
1. custom-content-manager exports: <ContentManagerProvider>, <ListViewTable>, etc.
2. Plugin creates its own routes at /plugins/{plugin-id}/*
3. Plugin imports components from custom-content-manager
4. Plugin wraps page in <ContentManagerProvider model={model}>
5. Plugin composes custom layout using exported components
```

### Pros ✅

#### 1. **Full UI Control** ✅ CRITICAL
- Plugins can build completely custom layouts
- Can add custom headers, sidebars, sections
- Can rearrange components as needed
- Can integrate third-party libraries
- **Can build complex plugins with unique workflows**
- Each plugin can have distinct user experience

#### 2. **Plugin Independence**
- Plugins own their routes
- Clear plugin identity (URL is `/plugins/membership-list`)
- Can develop and test plugins independently
- Can version plugins separately

#### 3. **Gradual Customization**
- Start simple: use high-level components as-is
- Add complexity: customize props, add custom sections
- Go deep: use hooks only, build fully custom UI
- **Flexibility scales with requirements**

#### 4. **Extensibility**
- Can add plugin-specific features easily
- Can wrap or extend exported components
- Can mix custom-content-manager components with third-party UI libraries
- Not limited by custom-content-manager's design decisions

#### 5. **Future-Proof**
- When you need those "1-2 much more complex plugins", architecture supports it
- Can migrate plugins gradually (some use components, some don't)
- Can deprecate custom-content-manager routes without breaking plugins

### Cons ❌

#### 1. **TooltipProvider Errors** ⚠️ CRITICAL RISK
- **Previous attempts produced mysterious TooltipProvider errors**
- Root cause: Creating routes with `app.router.addRoute()` creates separate route trees
- Separate trees are OUTSIDE Strapi's provider context
- DesignSystemProvider (which includes TooltipProvider) not available
- **Unknown why this happens - Strapi's internal wiring**

**Potential Solutions:**
- Export a comprehensive provider wrapper that includes ALL providers
- Research Strapi's internal provider setup
- May require trial-and-error to get provider stack right
- Risk: May encounter OTHER missing providers we don't know about

#### 2. **More Code Per Plugin**
- ~100-200 lines vs ~40 lines
- More boilerplate (imports, provider wrapping, layout composition)
- Steeper learning curve for new plugins

#### 3. **Potential for Inconsistency**
- Each plugin could have different UX
- Harder to maintain UI consistency across content types
- Requires discipline to reuse components correctly

#### 4. **Maintenance Burden**
- Need to version and document component APIs
- Breaking changes in components affect all plugins
- Need to coordinate updates across plugins
- More TypeScript types to maintain

#### 5. **Provider Mystery** ⚠️ HIGH RISK
- **Don't fully understand why previous attempts failed**
- Strapi's provider wiring is undocumented
- May encounter errors that are hard to debug
- Could waste significant development time troubleshooting

### Best For
- Complex plugins with unique workflows
- When UI customization is critical
- Teams comfortable with React component composition
- **When you need those 1-2 complex plugins**

---

## Critical Decision Factors

### 1. The TooltipProvider Problem

**Why This Happens:**
```
Strapi Admin Root
  ├─ Providers (Auth, DesignSystem, Tooltip, etc.)
  │   └─ Main Route Tree
  │       ├─ /content-manager/* ✅ Has all providers
  │       └─ /custom-content-manager/* ✅ Has all providers
  │
  └─ Plugin Routes (added via app.router.addRoute)
      └─ /plugins/membership-list/* ❌ SEPARATE TREE - No providers!
```

When plugins use `app.router.addRoute()`, they create routes OUTSIDE the provider tree. This is why:
- Approach A works: Uses custom-content-manager's routes (within provider tree)
- Approach B fails: Uses plugin routes (outside provider tree)

**Workarounds for Approach B:**
1. **Provider Re-export**: Export wrapper with all providers
   - Risk: May miss providers, Strapi's stack is undocumented
   - Effort: Medium-High
   - Success rate: Unknown

2. **Research Strapi Internals**: Understand provider wiring
   - Risk: Time-consuming, may not be solvable
   - Effort: High
   - Success rate: Unknown

3. **Hybrid Approach**: See below

### 2. Complex Plugin Requirements

You mentioned: **"1-2 much more complex plugins that can't rely on redirection alone"**

**Questions this raises:**
- What makes these plugins complex?
- Do they need custom layouts? → Approach B required
- Do they need custom workflows? → Approach B required
- Do they integrate third-party libraries? → Approach B required
- Do they have unique data requirements? → Could work with either

**If complex plugins need custom UI:**
- Approach A is insufficient
- Must solve TooltipProvider problem for Approach B
- Or use Hybrid Approach

---

## Hybrid Approach (Recommendation)

### Concept

```
Simple Plugins (members, events, publications):
  └─ Use Approach A (redirection)
      ✅ No provider issues
      ✅ Minimal code
      ✅ Works reliably

Complex Plugins (custom-image-uploader, custom workflow):
  └─ Use Approach B (components)
      ✅ Full UI control
      ⚠️ Must solve provider issues
      ✅ Worth the effort for these specific plugins
```

### Strategy

1. **Start with Approach A**
   - Implement for simple plugins (membership-list, events, research)
   - Get working system quickly
   - No TooltipProvider risks

2. **Research Provider Solution**
   - Dedicated spike to solve TooltipProvider issue
   - Create proof-of-concept with ContentManagerProvider
   - Document exact provider stack needed

3. **Add Approach B for Complex Plugins**
   - Once provider solution is proven
   - Use for plugins that genuinely need custom UI
   - Don't migrate simple plugins unnecessarily

### Benefits
- ✅ **Risk Management**: Start with proven approach
- ✅ **Incremental**: Add complexity only when needed
- ✅ **Pragmatic**: Use right tool for each job
- ✅ **Time-Efficient**: Don't solve problems you don't have yet

---

## Recommendation Matrix

| Scenario | Recommended Approach | Why |
|----------|---------------------|-----|
| **Simple CRUD content types** | Approach A (Redirection) | No provider issues, minimal code, proven pattern |
| **Complex plugins with custom UI** | Approach B (Component Export) | Necessary for requirements, worth solving provider issues |
| **Mixed simple + complex** | **Hybrid** | Best of both worlds, incremental risk |
| **Tight timeline, low risk tolerance** | Approach A only | Avoid TooltipProvider mystery |
| **Long-term flexibility prioritized** | Invest in Approach B | Solve provider issues once, use everywhere |

---

## My Recommendation

**Start with Hybrid Approach:**

### Phase 1: Quick Win (Approach A)
1. Implement plugin redirection for simple plugins
2. Get membership-list, events, research working
3. Validate the pattern works
4. Build confidence in the architecture

### Phase 2: Solve Provider Mystery (Approach B Spike)
1. **Dedicated investigation** into TooltipProvider errors
2. Create minimal reproduction case
3. Research Strapi's provider setup
4. Document exact provider stack required
5. Create `ContentManagerProvider` wrapper
6. **Test extensively** before using in production

### Phase 3: Complex Plugins (Approach B)
1. Only after Phase 2 is successful
2. Build 1-2 complex plugins using component exports
3. Validate that provider solution is robust
4. Document component API

### Phase 4: Evaluate (Optional)
1. Consider migrating simple plugins to Approach B
2. Only if provider solution is proven stable
3. Only if UI customization is actually needed
4. Not required - Hybrid is perfectly valid long-term

---

## Risk Assessment

### Approach A Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Cannot build complex plugins | **HIGH** | **HIGH** | Use Hybrid approach |
| UI too rigid for future needs | Medium | Medium | Add customization hooks gradually |
| Tight coupling | Low | Medium | Abstract via plugin APIs |

### Approach B Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| TooltipProvider errors recur | **HIGH** | **HIGH** | Research thoroughly before committing |
| Unknown provider issues | Medium | High | Extensive testing, incremental rollout |
| Time sink debugging | Medium | High | Time-box investigation, fallback to Hybrid |
| Maintenance burden | Low | Medium | Good documentation, versioning |

### Hybrid Approach Risks
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Two architectures to maintain | Medium | Low | Acceptable for different use cases |
| Provider solution fails | Medium | Medium | Simple plugins still work (Approach A) |
| Increased complexity | Low | Low | Clear guidelines on when to use each |

---

## Questions to Answer Before Deciding

1. **What makes the complex plugins complex?**
   - Custom layouts?
   - Custom workflows?
   - Third-party integrations?
   - Unique data requirements?

2. **Timeline constraints?**
   - Need working solution quickly? → Approach A / Hybrid
   - Can invest time in research? → Approach B

3. **Risk tolerance?**
   - Low tolerance → Approach A / Hybrid
   - High tolerance → Approach B

4. **Provider Investigation**
   - Willing to spend time debugging TooltipProvider? → Approach B
   - Want to avoid mysterious errors? → Approach A

5. **Long-term vision?**
   - Mostly simple CRUD? → Approach A
   - Many complex plugins planned? → Invest in Approach B
   - Mix of both? → Hybrid

---

## Conclusion

Given your context:
- ✅ You'll need complex plugins (can't rely on redirection)
- ⚠️ Previous export attempts had TooltipProvider errors
- ✅ UI modifiability is important

**I recommend the Hybrid Approach:**

1. **Start simple** - Use Approach A for basic plugins (low risk, quick win)
2. **Investigate thoroughly** - Dedicated effort to solve TooltipProvider issue
3. **Build complex** - Use Approach B only after provider solution proven
4. **Stay pragmatic** - Keep simple plugins on Approach A if they don't need customization

This gives you:
- ✅ Working system quickly (Approach A for simple plugins)
- ✅ Path to complex plugins (Approach B when ready)
- ✅ Risk management (don't bet everything on solving provider mystery)
- ✅ Flexibility (can adjust strategy based on Phase 2 results)

**Next Step:** Decide if you want to start with Approach A (safe) or invest upfront in solving Approach B provider issues (riskier but more flexible).