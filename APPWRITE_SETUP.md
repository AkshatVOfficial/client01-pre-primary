# Appwrite setup guide (do this manually in the Appwrite Console)

This guide lists **every resource the website expects**. The code never creates anything in Appwrite — you create
the resources below, then put their IDs in your environment variables (see `.env.example` and `DEPLOYMENT.md`).

> Console screens change over time. Names below follow the current Appwrite Cloud Console (Databases use
> **Tables / Rows / Columns**). If a label differs slightly, look for the closest equivalent.
> **Use the exact IDs given here** so that your `.env` values are easy to fill in.

## 0. What works before / after setup

| Feature | Without Appwrite | After you finish this guide |
|---|---|---|
| Public website (all pages) | Works | Works |
| Contact form | Hands off to WhatsApp / email only. Nothing is saved, and the page says so. | **Saves** each enquiry, then offers WhatsApp / email as extras |
| Gallery | Placeholder illustrations from `src/data/galleryData.js` | Photos you upload in the admin area |
| Announcement bar | Text from `schoolConfig.announcement` | Text you edit in the admin area (falls back to `schoolConfig` if Appwrite is unreachable) |
| `/admin` dashboard | Shows "Appwrite is not configured yet" | Sign-in, enquiries, gallery, announcements, security |

Each feature switches on separately when *its* variables are present.

---

## 1. Create the project

1. Sign in at <https://cloud.appwrite.io> with the **school owner's** account (so the school owns the data).
2. **Create project** → name it e.g. `Little Roots Preschool` → choose the region closest to your visitors.
3. Open **Settings** and copy:
   - **Project ID** → `VITE_APPWRITE_PROJECT_ID`
   - **API endpoint** (e.g. `https://fra.cloud.appwrite.io/v1`) → `VITE_APPWRITE_ENDPOINT`
     (use the endpoint **with the region and `/v1`** exactly as shown).

## 2. Add Web platforms (required, otherwise the browser blocks requests)

**Overview → Integrations → Platforms → Add platform → Web.** Add one platform per hostname (hostname only, no `https://`):

| Hostname | Why |
|---|---|
| `localhost` | local development (`npm run dev`) |
| `your-project.vercel.app` | your Vercel URL |
| `www.yourschool.com` and `yourschool.com` | custom domain, once connected |

Vercel *preview* deployments get a different hostname each time; either add the one you test on, or test on
production. (A wildcard such as `*.vercel.app` works but allows any Vercel site to call your project, so prefer exact hostnames.)

## 3. Create the database

**Databases → Create database**
- Name: `little_roots`
- Database ID: **`little_roots`** (click the ID field to set a custom ID) → `VITE_APPWRITE_DATABASE_ID`

### 3a. Table `enquiries`

**Create table** → Name `enquiries`, Table ID **`enquiries`** → `VITE_APPWRITE_ENQUIRIES_TABLE_ID`.

**Columns** (names are case-sensitive):

| Column | Type | Size / values | Required | Default | Notes |
|---|---|---|---|---|---|
| `parentName` | String (Varchar) | 100 | yes | – | |
| `phone` | String (Varchar) | 20 | yes | – | |
| `childAge` | String (Varchar) | 30 | yes | – | free text, e.g. "3 years 2 months" |
| `program` | String (Varchar) | 50 | yes | – | text, **not** enum: labels come from `schoolConfig.js` |
| `message` | String (Varchar or Text) | 1000 | yes | – | |
| `consent` | Boolean | – | yes | – | form only submits `true` |
| `status` | Enum | `pending`, `contacted`, `enrolled`, `rejected` | **no** | `pending` | Appwrite does not allow a default on a *required* column, so keep it optional with default `pending` |
| `adminNotes` | String (Varchar or Text) | 2000 | no | – | private notes, written only by the admin |

If your console offers only a plain "String" type, use it with the sizes above.
The submission date is Appwrite's built-in `$createdAt` — no column needed.

**Indexes** (wait until all columns show *Available* first):

| Key | Type | Column | Order |
|---|---|---|---|
| `idx_status` | Key | `status` | ASC |

**Settings → Permissions** (table level):

| Role | Create | Read | Update | Delete |
|---|---|---|---|---|
| **Any** | ✅ | ❌ | ❌ | ❌ |
| **Label → `admin`** | ✅ | ✅ | ✅ | ✅ |

**Row security: OFF.** (Keep it off; the table permissions above are the whole policy.)

### 3b. Table `gallery_images`

Table ID **`gallery_images`** → `VITE_APPWRITE_GALLERY_TABLE_ID`.

| Column | Type | Size / range | Required | Default |
|---|---|---|---|---|
| `fileId` | String (Varchar) | 36 | yes | – |
| `caption` | String (Varchar) | 200 | yes | – |
| `altText` | String (Varchar) | 300 | yes | – |
| `category` | String (Varchar) | 50 | yes | – |
| `displayOrder` | Integer | default range is fine | yes | – |
| `isPublished` | Boolean | – | yes | – |

Upload date = `$createdAt`.

**Indexes** (all type *Key*, order ASC): `idx_published` on `isPublished`; `idx_order` on `displayOrder`.

**Permissions:** Any → **Read** only. Label `admin` → Create, Read, Update, Delete. Row security OFF.

> `category` is plain text on purpose. The allowed values are the ones in `galleryCategories` in
> `src/data/galleryData.js` (Classroom, Activities, Events, Outdoor Play). The public filter buttons use that same list.

### 3c. Table `announcements`

Table ID **`announcements`** → `VITE_APPWRITE_ANNOUNCEMENTS_TABLE_ID`.

| Column | Type | Size | Required |
|---|---|---|---|
| `text` | String (Varchar) | 300 | yes |
| `linkLabel` | String (Varchar) | 50 | no |
| `linkTo` | String (Varchar) | 200 | no |
| `isActive` | Boolean | – | yes |

**Index:** `idx_active` (Key, ASC) on `isActive`.

**Permissions:** Any → **Read** only. Label `admin` → Create, Read, Update, Delete. Row security OFF.

## 4. Create the storage bucket

**Storage → Create bucket** → Name `gallery-photos`, Bucket ID **`gallery-photos`** → `VITE_APPWRITE_GALLERY_BUCKET_ID`.

| Setting | Value |
|---|---|
| Permissions | **Any → Read**; **Label `admin` → Create, Read, Update, Delete** |
| File security | **Off** |
| Maximum file size | **5 MB** (the admin page resizes photos to fit; it refuses files still over 5 MB) |
| Allowed file extensions | `jpg`, `jpeg`, `png`, `webp` |
| Compression | None (images are already compressed) |
| Encryption | Off (encrypted files cannot be shown through a public view link) |

## 5. Create the admin account

1. **Auth → Users → Create user**: the school owner's email + a long, unique password.
2. Open that user → **Labels** → add the label **`admin`** (lowercase). This label is what the table and bucket
   permissions above check. Only someone with console/API-key access can add labels; visitors cannot give themselves one.
3. **Auth → Settings** (or **Security**): turn on the options that fit — password dictionary check, password history,
   shorter session length. If the console offers a **maximum number of users** limit, set it to the number of admins
   (e.g. 1) to stop strangers from creating accounts; accounts without the `admin` label can't read anything private anyway.
4. Sign in at `https://your-site/admin/login`, open **Security → Start setup**, scan/enter the key in an authenticator
   app, enter the code, and **save the recovery codes** that are shown once. From then on every sign-in asks for a code.
   (If your console has a project-level multi-factor toggle under Auth → Security, make sure it is enabled.)

## 6. Put the IDs in your environment

Copy `.env.example` → `.env` and fill in the seven values (see `DEPLOYMENT.md` for Vercel). Restart `npm run dev`.

## 7. Acceptance tests (do all of these)

Replace the placeholders with your real endpoint / project ID (these are public identifiers).

1. **Guest cannot read enquiries** — expect HTTP **401**:
   ```bash
   curl -i -H "X-Appwrite-Project: PROJECT_ID" \
     "ENDPOINT/tablesdb/little_roots/tables/enquiries/rows"
   ```
2. **Guest can read the gallery and announcements** — expect **200**:
   `.../tables/gallery_images/rows` and `.../tables/announcements/rows` (same header).
3. **Contact form** — submit it on the live site; the admin Enquiries page must show it.
4. **Logged out** — open `/admin/enquiries`: you must land on the sign-in page.
5. **A normal (non-admin) account** — create a second test user *without* the label, sign in at `/admin/login`: you must
   see "This account is not an administrator", and nothing private may load. Delete the test user afterwards.
6. **Gallery** — upload a photo, tick *Show on website*; it should appear on `/gallery` and the home page.
7. **Announcement** — create an active one; the banner on the public site should change.
8. **Safari / mobile** — sign in once on Safari. The Appwrite SDK falls back to a stored session token when third-party
   cookies are blocked, but test it. If it fails, use a custom Appwrite domain (Settings → Domains) on a subdomain of your site.

## 8. Known limits (so nothing surprises you)

- **No server-side code.** Anyone can post a new enquiry (that is the point of the form), so a determined spammer
  could post junk or send `status: "enrolled"`. A hidden honeypot field, length limits and Appwrite's rate limits reduce
  this; you can delete junk in the admin area. A server Function would be needed for stronger checks.
- **No email/SMS notification** when an enquiry arrives; check the dashboard (or add a Function later).
- **Search/filter run in the browser** over the newest 500 enquiries (plenty for a preschool).
- The **frontend admin check is only about what is displayed**; the real protection is the `admin`-label permissions above.
- Appwrite stores personal data of parents: review `/privacy` text with the school (it is a template), decide a
  retention period, and delete old enquiries.
