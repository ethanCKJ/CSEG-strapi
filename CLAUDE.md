# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Strapi 5 CMS application for the CSEG (Computer Science Education Group) website. It uses PostgreSQL in production and SQLite for local development.

## Development Commands

### Starting the Application
```bash
npm run develop  # Start with auto-reload (development)
npm run start    # Start without auto-reload (production)
```

### Build Commands
```bash
npm run build    # Build the admin panel
```

### Database Seeding
```bash
npm run seed:example  # Seed database with example data (runs scripts/seed.js)
```

### Upgrading Strapi
```bash
npm run upgrade:dry  # Dry run of upgrade to latest version
npm run upgrade      # Upgrade to latest Strapi version
```

## Architecture

### Custom Plugin System

This project uses **four custom local plugins** that are critical to the application architecture:

1. **`shared2`** (`src/plugins/shared2`)
   - Package name: `@internal/shared2`
   - Registered as: `custom-content-manager` in `config/plugins.ts`
   - A shared library plugin containing reusable admin UI components and a custom Content Manager implementation
   - **Structure:**
     - `admin/src/` - Admin panel UI with custom content manager components
     - `server/src/` - Server-side logic (controllers, services, routes, content-types)
     - `index.ts` - Root export file exposing `ListViewPage` and `ListViewPageWrapped`
   - Main exports: `ListViewPage`, `ListViewPageWrapped` (exported from root index.ts)
   - Used as a dependency by other local plugins via `file:../shared2` in package.json
   - Has both admin and server components
   - Uses custom routing via `app.router.addRoute()` with path `custom-content-manager/*`
   - Includes Redux integration with custom reducer
   - Registers permission actions in bootstrap phase (server/src/bootstrap.ts)

2. **`membership-list`** (`src/plugins/membership-list`)
   - Manages the list of CSEG members
   - Depends on `@internal/shared2` for shared UI components
   - Has both admin and server components
   - Build commands: `strapi-plugin build`, `strapi-plugin watch`

3. **`cseg-applications`** (`src/plugins/cseg-applications`)
   - Manages CSEG membership applications
   - Standalone plugin for application management UI

4. **`tester-plugin`** (`src/plugins/tester-plugin`)
   - Testing and development plugin
   - Simple plugin structure for testing features

These plugins are registered in `config/plugins.ts` and must be enabled there to function.

### Plugin Development

Each plugin has a standard Strapi plugin structure:

**Directory Structure:**
- `admin/src/` - Admin panel UI (React/TypeScript)
  - `index.ts` - Plugin entry point with `register()` function
- `server/src/` - Server-side logic (controllers, services, routes, content-types)
  - `register.ts` - Plugin registration phase (runs first)
  - `bootstrap.ts` - Plugin bootstrap phase (runs after all plugins registered)
  - `destroy.ts` - Plugin cleanup phase (runs on shutdown)
- `package.json` - Plugin metadata with `strapi.kind: "plugin"`

**Admin Plugin Registration** (`admin/src/index.ts`):
```typescript
export default {
  register(app: any) {
    // Add Redux reducers
    app.addReducers({ ... });

    // Add menu links
    app.addMenuLink({ ... });

    // Add routes (creates separate route tree - see RBAC notes)
    app.router.addRoute({ ... });

    // Register widgets
    app.widgets.register([...]);

    // Register plugin config
    app.registerPlugin({ ... });
  },

  bootstrap(app: any) {
    // Optional: runs after all plugins registered
  }
};
```

**Server Plugin Lifecycle:**
1. `register.ts` - Register services, middlewares, policies (runs first for all plugins)
2. `bootstrap.ts` - Register permission actions, initialize data (runs after registration)
3. `destroy.ts` - Cleanup on shutdown

**Build Commands:**
```bash
cd src/plugins/<plugin-name>
npm run build     # Build the plugin
npm run watch     # Watch mode for development
```

### Content Types

The application defines several custom content types in `src/api/`:
- `event` - Events
- `event-tag` - Tags for events
- `event-type` - Event categories
- `global` - Global site settings
- `home-page` - Home page content
- `member-application` - Membership applications
- `member-type` - Member categories
- `publication` - Publications
- `research-project` - Research projects

Each content type follows standard Strapi structure:
- `content-types/<name>/schema.json` - Content type schema
- `controllers/` - API controllers
- `services/` - Business logic
- `routes/` - API routes

### User Permissions Extension

The `plugin::users-permissions` user model is extended in `src/extensions/users-permissions/content-types/user/schema.json` with additional fields like `MD` (richtext) and `TestEnumeration`.

### Shared Components

Reusable content components are defined in `src/components/shared/`:
- `media.json` - Media components
- `quote.json` - Quote blocks
- `rich-text.json` - Rich text fields
- `seo.json` - SEO metadata
- `slider.json` - Image sliders

## Configuration

### Environment Variables

Required variables (see `.env.example`):
- `HOST` / `PORT` - Server binding
- `APP_KEYS` - Application encryption keys (comma-separated)
- `API_TOKEN_SALT` - API token salt
- `ADMIN_JWT_SECRET` - Admin JWT secret
- `TRANSFER_TOKEN_SALT` - Transfer token salt
- `JWT_SECRET` - General JWT secret
- `ENCRYPTION_KEY` - Encryption key

Database configuration (via `config/database.ts`):
- `DATABASE_CLIENT` - Database type (sqlite/postgres/mysql)
- `DATABASE_URL` - Connection string (Postgres)
- `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
- SSL options via `DATABASE_SSL_*` variables

### TypeScript Configuration

The project uses TypeScript with the following notable settings:
- Server code: CommonJS modules, ES2019 target
- `src/plugins/**` is excluded from server compilation
- `src/admin/` is excluded from server compilation
- Admin panel code is compiled separately by each plugin

## Documentation Files

The repository contains several markdown files documenting development issues and solutions:

- **`RBAC_ERROR_ANALYSIS_AND_SOLUTIONS.md`** - Detailed analysis of the "checkUserHasPermissions is not a function" error when using custom plugin routes with RBAC hooks. Explains why AuthProvider context is unavailable in custom routes and provides solutions.

- **`RBAC_ERROR_TIMELINE.md`** - Timeline explanation of React hook execution and why logs print before errors occur when using useRBAC in custom plugin routes.

- **`RBAC_SHARED_UI_SOLUTION.md`** - Likely contains proposed solutions for sharing UI components that require RBAC between plugins.

- **`PLUGIN_INDEX_COMPARISON.md`** - Comparison between `shared2` and `tester-plugin` index.ts files, highlighting differences in complexity, routing, and Redux integration.

## Important Notes

- **Reference Code Directory**: `src/plugins/shared/content-manager` contains **copied reference code from GitHub** showing how Strapi's content manager works internally. This is NOT executable code and should NOT be modified. It serves as documentation for understanding Strapi's content manager architecture.

- **RBAC and AuthProvider Context**: Custom plugins using `app.router.addRoute()` create separate route trees outside Strapi's main admin shell. This means:
  - The `AuthProvider` context is NOT automatically available in these routes
  - Using `useRBAC()` or `useAuth()` hooks will fail with "checkUserHasPermissions is not a function"
  - Components that require RBAC must be wrapped properly or the plugin must be integrated into Strapi's main route tree
  - See `RBAC_ERROR_ANALYSIS_AND_SOLUTIONS.md` for detailed analysis of this issue

- **Plugin Dependencies**: The `membership-list` plugin depends on `@internal/shared2`. When modifying shared2, rebuild dependent plugins.

- **Database Seeding**: The seed script (`scripts/seed.js`) uses Strapi's document API and checks for existing data before importing.

- **Admin Panel Customization**: The shared2 plugin provides a custom Content Manager that replaces Strapi's default content manager with enhanced features.

- **Git Status**: The repository shows significant work-in-progress on the `shared2` plugin server implementation. Many files have been deleted, renamed, or are untracked, indicating an active refactoring of the plugin architecture.