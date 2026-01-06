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

This project uses **three custom local plugins** that are critical to the application architecture:

1. **`shared2`** (`src/plugins/shared2`)
   - Package name: `@internal/shared2`
   - A shared library plugin containing reusable admin UI components and utilities
   - Exports a custom Content Manager implementation with enhanced list/edit views
   - Main exports include: `ListViewPage`, hooks (`unstable_useDocument`, `unstable_useDocumentLayout`), and utilities
   - Used as a dependency by other local plugins via `file:../shared2` in package.json
   - Contains admin-side code only (no server-side code)

2. **`membership-list`** (`src/plugins/membership-list`)
   - Manages the list of CSEG members
   - Depends on `@internal/shared2` for shared UI components
   - Has both admin and server components
   - Build commands: `strapi-plugin build`, `strapi-plugin watch`

3. **`cseg-applications`** (`src/plugins/cseg-applications`)
   - Manages CSEG membership applications
   - Standalone plugin for application management UI

These plugins are registered in `config/plugins.ts` and must be enabled there to function.

### Plugin Development

Each plugin has a standard Strapi plugin structure:
- `admin/src/` - Admin panel UI (React/TypeScript)
- `server/src/` - Server-side logic (controllers, services, routes, content-types)
  - `register.ts` - Plugin registration phase
  - `bootstrap.ts` - Plugin bootstrap phase
  - `destroy.ts` - Plugin cleanup phase
- `package.json` - Plugin metadata with `strapi.kind: "plugin"`

To build a plugin:
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

## Important Notes

- **Plugin Dependencies**: The `membership-list` plugin depends on `@internal/shared2`. When modifying shared2, rebuild dependent plugins.
- **Database Seeding**: The seed script (`scripts/seed.js`) uses Strapi's document API and checks for existing data before importing.
- **Admin Panel Customization**: The shared2 plugin provides a custom Content Manager that replaces Strapi's default content manager with enhanced features.