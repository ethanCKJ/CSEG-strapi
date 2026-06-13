# CSEG Website

---

# [ Project info ]

This is the backend / admin panel for the Computer Science Education Group (CSEG)'s new website created by
Ethan Cheam Kai Jun for his undergraduate dissertation in 2026.

Key features include
- Uploading events, research projects and publications.
- Managing contact requests and member applications. Organisers sent notifications when new contact requests or member applications are received.
- Sending of scheduled email reminders for events

Screenshots of the admin panel:

<img alt="img_1.png" height="500" src="img_1.png"/>

Dashboard

<img alt="img_2.png" height="500" src="img_2.png"/>

List of events

<img alt="img_3.png" height="500" src="img_3.png"/>

Event creation form

---

# [ Installation ]

Covers local development and DICE deployment for the **backend** (`CSEG-strapi`, Strapi)
and **frontend** (`CSEG-frontend`, Next.js).

>  Replace `YOUR_UNN` with your university username (e.g. `s2312606`) and
> `YOUR_UNNvm` with your DICE VM tag (e.g. `s2312606vm`). Node must be **20–24** (I use
> `22.22.0`).

## 1. How to set up the backend locally for development

```powershell
# from the CSEG-strapi repo root
node -v
# v22.22.0
npm install
npm run build:plugins          # build the CCM and thin plugin ONCE (first install only)
```

Create the database + user (login to Postgres once, run the SQL, quit):
```powershell
psql -U postgres
```
```sql
CREATE DATABASE "strapi-db";
CREATE USER strapiUser WITH PASSWORD 'YOUR_POSTGRES_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE "strapi-db" TO strapiUser;
\q
```

Put the password in `./.env`:
```env
DATABASE_PASSWORD=YOUR_POSTGRES_PASSWORD
```

Run it (two terminals):
```powershell
# terminal A — in src/plugins/custom-content-manager3 (CCM hot reload)
strapi-plugin watch
# terminal B — in repo root
npm run develop
```
Admin: `http://localhost:1337/admin`.
The CMS starts empty (no data inserted).
To load a dataset later, see [§ SQL data transfer](#sql-data-transfer-export--move--restore).

---

## 2. How to set up the frontend locally for development

```bash
# from the CSEG-frontend repo root
npm install
```
Create `./.env` (local values — no basePath so the app serves at root):
```env
NEXT_PUBLIC_API_URL=http://localhost:1337/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
# NEXT_PUBLIC_BASE_PATH is intentionally UNSET locally
```
Run the dev server (needs the backend running for data):
```bash
npm run dev
```
Site: `http://localhost:3000`.

---

## 3. How to install the backend on DICE (first time, **with data**)

SSH in:
```bash
ssh -J YOUR_UNN@student.ssh.inf.ed.ac.uk YOUR_UNN@YOUR_UNNvm.inf.ed.ac.uk
```

### One-time VM setup: Node + PM2
PM2 runs Strapi in the background and auto-restarts it on crash. Install it once per VM:
```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
source ~/.bashrc
nvm install 22.22.0 && nvm use 22.22.0
npm install -g pm2
```
> In **every new SSH session**, run `source ~/.bashrc && nvm use 22.22.0` before using `node`/`pm2`.

PM2 management (run from the repo root):
```bash
PM2_HOME=/tmp/pm2_$USER pm2 status              # list processes
PM2_HOME=/tmp/pm2_$USER pm2 logs strapi         # tail logs
PM2_HOME=/tmp/pm2_$USER pm2 restart strapi      # restart after a rebuild
PM2_HOME=/tmp/pm2_$USER pm2 stop|delete strapi  # stop / remove
```

Clone + configure + build:
```bash
git clone https://github.com/ethanCKJ/CSEG-strapi.git
cd CSEG-strapi              # the clone above creates this folder
cp .env.dice .env          # then edit .env and fill the placeholders:
#   DATABASE_NAME=YOUR_UNN   DATABASE_USERNAME=YOUR_UNN   DATABASE_PASSWORD=...   email reviewers, etc.

npm ci --include=dev       # exact install from the committed `package-lock.json` lockfile (incl. build deps)
NODE_OPTIONS="--max-old-space-size=4096" npm run build   # strapi build (ingests the committed CCM dist)
```
> **Do NOT run `build:plugins` on DICE.** The CCM `dist/` is built locally and committed to
> git, so `npm run build` just ingests it. See [§4](#4-how-to-move-backend-changes-to-dice-updates).

**Insert the data** — first export + copy the dump from your laptop, then restore on DICE.
Follow [§ SQL data transfer](#sql-data-transfer-export--move--restore).

Run it:
```bash
npm run start
```
Recommended for a long-lived server (auto-restart, survives logout) — use PM2 which wraps around
`npm run start`:
```bash
PM2_HOME=/tmp/pm2_$USER pm2 start npm --name "strapi" -- run start
```

---

## 4. How to move backend changes to DICE (updates)

### Code changes

**On your local machine** — rebuild the CCM plugin and commit its `dist/` (the remote
NEVER builds the plugin):
```bash
cd src/plugins/custom-content-manager3
npm run build                      # produces the up-to-date dist/
cd ../../..
git add src/plugins/custom-content-manager3/dist   # dist IS tracked
git commit -am "Update CCM + move to DICE"
git push
```

**On DICE** — pull and rebuild the host (it ingests the committed CCM `dist/`):
```bash
# In repo root
git pull
NODE_OPTIONS="--max-old-space-size=4096" npm run build
PM2_HOME=/tmp/pm2_$USER pm2 restart strapi   # or: npm run start
```

### Data changes

Re-export, copy, and restore the database using the exact same process as the install
step: **[§ SQL data transfer](#sql-data-transfer-export--move--restore).**

---

## 5. How to install / update the frontend on DICE

### First time
```bash
git clone https://github.com/ethanCKJ/CSEG-frontend.git
cd CSEG-frontend
cp .env.dice .env          # DICE values — see below
npm ci
npm run build              # basePath is baked in here, so .env must be set FIRST
npm run start              # or PM2: pm2 start npm --name "next" -- run start
```
DICE `.env` values:
```env
NEXT_PUBLIC_API_URL=https://groups.inf.ed.ac.uk/YOUR_UNNvm/api
NEXT_PUBLIC_APP_URL=https://groups.inf.ed.ac.uk/YOUR_UNNvm
NEXT_PUBLIC_BASE_PATH=/YOUR_UNNvm
REVALIDATION_SECRET=...
```
> `NEXT_PUBLIC_BASE_PATH` makes Next serve under the `/YOUR_UNNvm` sub-path. It only works
> end-to-end with the matching Apache reverse-proxy rules on the VM.

### Updating
```bash
git pull
rm -rf .next               # clear Next's build cache (avoids stale data baked into SSG)
npm run build
PM2_HOME=/tmp/pm2_$USER pm2 restart next   # or: npm run start
```

---

## SQL data transfer (export → move → restore)

Each student has **one database** on `pgteach` (named after your UNN) with **one schema**
(`public`). Tables live under that schema.

> **⚠️ DANGER:** the exported dump begins with a reset block that **drops every table in
> your `public` schema** before restoring — this can delete tables you use for **other
> coursework** on `pgteach`. If you need coursework tables preserved, you can ask me to compile a
> Strapi-only table list first.

### 1. Export the dump (on your local Windows machine, PowerShell)
```powershell
# Reset preamble that drops all tables in your schema
$reset = @'
DO $$ DECLARE r RECORD; BEGIN FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE'; END LOOP; END $$;
'@
Set-Content -Path strapi_backup.sql -Value $reset -Encoding utf8 -NoNewline

# Actual dump command.
# append the dump; --no-owner --no-privileges makes it portable across machines
pg_dump -U strapiUser -d strapi-db --clean --if-exists --no-owner --no-privileges |
  Add-Content -Path strapi_backup.sql -Encoding utf8
```

### 2. Copy the dump to DICE (from the repo root)
```powershell
scp -J YOUR_UNN@student.ssh.inf.ed.ac.uk strapi_backup.sql YOUR_UNN@YOUR_UNNvm.inf.ed.ac.uk:~/
```

### 3. Restore on DICE
```bash
# one-time only: set your pgteach role password
psql -h pgteach.inf.ed.ac.uk -d YOUR_UNN
YOUR_UNN=> ALTER ROLE YOUR_UNN WITH PASSWORD 'YOUR_POSTGRES_PASSWORD';
\q
# load the dump (-v ON_ERROR_STOP=1 makes failures loud instead of cascading)
psql -h pgteach.inf.ed.ac.uk -d YOUR_UNN -v ON_ERROR_STOP=1 -f ~/strapi_backup.sql
```

---

# [ Technical details ]

## Running on Strapi Cloud
1. Build plugins
2. Git add the plugins to track their dist files
3. Git push onto Strapi Cloud
4. Use Strapi transfer tool to stream database data to Strapi Cloud

## Key implementation details
### Navigating the Custom Content Manager (CCM)
#### 1) CCM responsibility boundaries
- Use `src/plugins/custom-content-manager3/` for admin UI behavior (routes, pages, actions, and hooks).
- Keep data validation and persistence rules in backend hooks/middlewares (`src/utils/*` and startup wiring in `src/index.ts`).

#### 2) File map (if you want X, edit Y)
- Change routes serviced by the CCM: `src/plugins/custom-content-manager3/admin/src/router.tsx`
- Add reusable UI logic/hooks (but not the UI component itself): `src/plugins/custom-content-manager3/admin/src/hooks/`
- Change list view behavior: `src/plugins/custom-content-manager3/admin/src/pages/ListView/`
- Add create/edit action panel UI. The action panel has the 'Publish onto public website' button: `src/plugins/custom-content-manager3/admin/src/pages/EditView/components/Panels.tsx`
- Add menu links into CCM from thin plugins: `src/plugins/*/admin/src/index.ts`

#### 3) CCM change workflow (hot reload)
1. Start plugin watch mode in `src/plugins/custom-content-manager3`: `strapi-plugin watch`.
2. Run Strapi from repo root: `npm run develop`.
3. Edit CCM files under `src/plugins/custom-content-manager3/admin/src/`.
4. Refresh page

#### 4) Data flow cheat sheet (Publish button in EditView)
What happens when you click the Publish button?
- `src/plugins/custom-content-manager3/admin/src/pages/EditView/components/Panels.tsx` mounts `<PublishButton />` inside `StandardActionPanel`.
- `src/plugins/custom-content-manager3/admin/src/action-buttons/PublishButton.tsx` wires button `onClick` to `usePublishAction(...).onClick`.
- `src/plugins/custom-content-manager3/admin/src/hooks/usePublishAction.tsx` runs `performPublish()`, validates form data, then calls `publish(...)` from `useDocumentActions`.
- `src/plugins/custom-content-manager3/admin/src/hooks/useDocumentActions.ts` uses `usePublishDocumentMutation` and calls `publishDocument(...)`.
- `src/plugins/custom-content-manager3/admin/src/services/documents.ts` executes POST `/content-manager/${collectionType}/${model}/${documentId}/actions/publish` (or single-type equivalent).


#### 5) Common modification patterns
- Add a new action button: create hook/action file, then mount it in list/edit page components.
- Add a custom list page: register route in `router.tsx`, then implement under `pages/ListView/`.
- Add form-side helper UI: wire component into `Panels.tsx` and connect via a hook in `hooks/`.

#### 6) Troubleshooting CCM edits
- Change not visible: confirm `strapi-plugin watch` is still running in `src/plugins/custom-content-manager3`, then hard-refresh admin.
- Route missing: confirm it is registered in `router.tsx` and linked from plugin entry points.
- Save fails but UI looks correct: debug backend middlewares/hooks in `src/utils/` and `src/index.ts`.

#### 7) Using in-place Documentation such as the Markdown template
1. On a Super Admin account, go to the dashboard and click the Content Manager link
2. Add a Documentation entry
   ![img_5.png](img_5.png)
3. On the Content Type Builder, add the Documentation custom field.
   ![img_6.png](img_6.png)
   You can use the 'configure the view' button on the top of the CTB to move the field's position. 'configure the view'
   is known to be fiddly so a solution is removing all fields from the view then adding the fields one at a time from
   the top field.

### Other implementation details

#### Email system
- Provider config is in `config/plugins.ts` (Gmail SMTP via `@strapi/provider-email-nodemailer`).
- Immediate notifications are handled by `src/utils/contact-middleware.ts` and `src/utils/member-application-middleware.ts`.
- Event reminder emails are scheduled (not sent immediately) by `src/utils/document-service-middlewares.ts` using `syncScheduledEmailSlot` in `src/utils/helper-functions.ts`.
- Scheduled emails are dispatched by cron in `config/cron-tasks.ts` using `sent`, `isSending`, and `failedAttempts` fields.

#### ICS generation
- Event ICS content is generated in `src/utils/eventICSMiddleware.ts` on `create`/`update` for `api::event.event`.
- The middleware writes `context.params.data.ics` before persistence, so ICS data is saved with the event write.
- ICS content is built by `handleEventICS` in `src/utils/helper-functions.ts` and uses `escapeICSText` + `foldICSLine` for RFC-safe output.

#### How middlewares work here
- Document-service middlewares are registered at startup in `src/index.ts` via `strapi.documents.use(...)`.
- Each middleware should guard early on `context.uid` + `context.action`, then return `next()` when irrelevant.
- Use `await next()` first for post-save side effects (emails/scheduling), and mutate `context.params.data` before `next()` only when data must be persisted in the same write.
- Keep business rules in backend middleware/lifecycle hooks, not only in CCM frontend code.

#### Required relation workaround
- Required relation checks are enforced by `validateRelations` in `src/utils/required-relations-custom.ts` based on https://github.com/teguru-labs/strapi-plugin-required-relation-field
- Used in event's schema.json. This is the 'one required field failed to validate' in dissertation text.
- The Content Type Builder sometimes accidentally deletes required:true when you edit the content type, so just manually add the required:true back.
```json
    "open_to": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::member-type.member-type",
      "conditions": {
        "visible": {
          "!=": [
            {
              "var": "publicEvent"
            },
            true
          ]
        }
      },
      "inversedBy": "events",
      "required": true
    },
```

### Using the Admin panel
There are two roles, Super Admin and Organiser.
The Super Admin has links to the Content Manager and Media Library on the dashboard (`src/admin/extensions/CustomDashboard.tsx`). You can use the
Content Manager to edit static webpage content e.g. homepage and the in-place documentation.

In-place documentation was implemented using a Strapi field (https://docs.strapi.io/cms/features/custom-fields)

### Warnings

- Member approval side effects run after successful update in `src/utils/member-application-middleware.ts`. Keep this order (`await next()` first) so member creation/email does not happen when the application update fails.
- Event deletes should also remove linked scheduled emails; this is handled in `src/utils/document-service-middlewares.ts` via `deleteScheduledEmailsForEvent` in `src/utils/helper-functions.ts`.
- ICS generation in `src/utils/eventICSMiddleware.ts` uses incoming update payload fields. If date/time/title are omitted on update, `ics` can be regenerated as empty.
- Scheduled emails are operationally non-blocking: send/sync failures are logged and usually do not fail content writes (`src/utils/contact-middleware.ts`, `src/utils/member-application-middleware.ts`, `src/utils/document-service-middlewares.ts`).
- Cron timing in `config/cron-tasks.ts` should be reviewed carefully when changing `rule`; small format mistakes can change send frequency significantly.

- Beware of enterprise-licensed code in `history` and `preview`.

#### Known bugs
1. When you delete an event, the scheduled email is not deleted. This is because the delete lifecycle hook does not have access to the event ID, so it cannot find and delete the scheduled email. You should fix it using the Document Service API to listen for deleted events.
2. Think carefully whether unpublishing an event from the website should affect scheduled emails if at all.

### Other technical notes
1. As stated in the dissertation, I strongly advise removing the whole 'allowed attendees' concept and just putting warning on event pages

---

# [ Other DICE ]

### Testing server (check a port is reachable through Apache)
Before pointing Apache at the real app, confirm a port is exposed end-to-end. Save this as
`server.js` on the VM and run `node server.js`:
```js
// server.js
const http = require('http');
const PORT = 1337; // change to the port you're testing
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end(`Hello from DICE! Port ${PORT} is open.\n`);
}).listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
```
Then open `https://groups.inf.ed.ac.uk/YOUR_UNNvm/` — seeing "Hello from DICE!" means the
route reaches that port.

### Useful DICE commands
```bash
# inspect the Apache vhost config (LCFG-managed — request changes from Computing Support)
cat /etc/apache2/apache2.conf
cat /etc/apache2/lcfg.sites.d/YOUR_UNNvm.conf
```

### Key URLs
- Admin panel: `https://groups.inf.ed.ac.uk/YOUR_UNNvm/admin/`
- API: `https://groups.inf.ed.ac.uk/YOUR_UNNvm/api/`
- Website: `https://groups.inf.ed.ac.uk/YOUR_UNNvm/`
