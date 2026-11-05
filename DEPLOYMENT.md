# Deployment guide (Vercel)

## Environment variables

Vite bakes `VITE_*` variables into the site **at build time**, so add them **before** deploying and **redeploy**
after any change. All seven are public identifiers — **never** add an Appwrite API key (secret) anywhere.

| Variable | Example value | Where to find it |
|---|---|---|
| `VITE_APPWRITE_ENDPOINT` | `https://fra.cloud.appwrite.io/v1` | Appwrite → Settings |
| `VITE_APPWRITE_PROJECT_ID` | `65f…` | Appwrite → Settings |
| `VITE_APPWRITE_DATABASE_ID` | `little_roots` | the ID you gave the database |
| `VITE_APPWRITE_ENQUIRIES_TABLE_ID` | `enquiries` | table ID |
| `VITE_APPWRITE_GALLERY_TABLE_ID` | `gallery_images` | table ID |
| `VITE_APPWRITE_ANNOUNCEMENTS_TABLE_ID` | `announcements` | table ID |
| `VITE_APPWRITE_GALLERY_BUCKET_ID` | `gallery-photos` | bucket ID |

## Steps

1. Push the project to GitHub/GitLab/Bitbucket (`.env` is git-ignored — check `git status` shows no `.env`).
2. Vercel → **Add New → Project** → import the repo. Framework preset: **Vite** (build `npm run build`, output `dist`).
3. Before the first deploy: **Settings → Environment Variables** → add the seven variables above for
   **Production** (and **Preview** if you want preview builds to use the same Appwrite project).
4. Deploy. `vercel.json` already rewrites every path to `index.html`, so `/admin`, `/privacy` and the other routes work on refresh.
5. In Appwrite, add your Vercel hostname as a **Web platform** (`APPWRITE_SETUP.md`, step 2). Without it the browser blocks the requests.
6. Custom domain: Vercel → Settings → Domains → add it and follow the DNS instructions; then add that hostname as another Appwrite Web platform.
7. Update the placeholders that still say `example.com`:
   - `seo.siteUrl` in `src/config/schoolConfig.js`
   - `public/sitemap.xml` and `public/robots.txt`
8. Run the acceptance tests in `APPWRITE_SETUP.md`, section 7, on the live site.

## Local development

```bash
cp .env.example .env     # then fill in the values
npm install
npm run dev              # restart it after editing .env
```

## What happens if a variable is missing

The site never breaks: the contact form uses the WhatsApp/email hand-off, the gallery and announcement bar use the
content in `src/data/galleryData.js` and `schoolConfig.js`, and `/admin` lists exactly which variables are missing.
