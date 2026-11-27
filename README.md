# WHSS – Windsor Home Security Solutions

Website for WHSS, a Windsor-based home security company offering cameras, smart alarms, smart locks,
24/7 professional monitoring, and installation and maintenance.

Visitors can browse services and packages, request a free quote, and staff can sign in to an operations
dashboard to manage incoming requests.

## How the site works

The whole experience is built around one flow:

1. **Lead capture** – a customer chooses a package, then submits a quote request with name, email,
   phone, property type and requirements.
2. **Records** – each request is saved to the backend database (`quote_requests`), not to the browser.
3. **Reporting** – the dashboard aggregates stored requests into totals, status counts and package
   popularity.
4. **Customer history** – staff open a request, see contact details and move it through the pipeline.
5. **Workflow** – every request follows a status path: New → In Progress → Completed.
6. **Decision support** – the dashboard surfaces the most requested package, the value of open and won
   work, and recommendations based on current demand.

## Pages

| Route | Purpose |
|---|---|
| `/` | Company introduction, mission, featured solutions, how it works |
| `/services` | Cameras, smart alarms, smart locks, 24/7 monitoring, installation and maintenance |
| `/packages` | Basic $29.99, Standard $49.99, Premium $79.99 per month |
| `/quote` | Validated quote request form; accepts `?package=Basic\|Standard\|Premium` |
| `/admin/login` | Staff sign-in |
| `/admin` | Operations dashboard (protected – requires a signed-in staff account) |

## Running locally

```bash
npm install
npm run dev
```

## Hosting on GitHub Pages

This repository includes `.github/workflows/deploy-pages.yml`, which builds the site and publishes it
automatically on every push to `main`.

One-time setup in **GitHub → Settings → Pages**:

1. Under **Build and deployment → Source**, choose **GitHub Actions**.
2. Under **Settings → Secrets and variables → Actions**, add two repository secrets so the live site can
   talk to the backend:
   - `VITE_PUBLIC_SUPABASE_URL`
   - `VITE_PUBLIC_SUPABASE_ANON_KEY`
3. Push to `main` (or run the workflow manually from the **Actions** tab).

Notes:

- GitHub Pages on a free account requires a **public** repository. The publishable backend key is
  therefore visible in the built files. That key is designed to be public, and database row level
  security still restricts what it can read or write.
- The workflow detects the repository name and sets the correct base path, so the site also works from
  a project URL such as `https://yourname.github.io/whss/`.
- A `404.html` copy of the app is generated during deployment so deep links such as `/quote` and
  `/admin` still load when a visitor opens or refreshes them directly.
- If you publish to a `username.github.io` repository instead, the base path resolves to `/`
  automatically.

## Staff access

There is deliberately no public sign-up page. Create a staff account in the backend authentication
panel, then sign in at `/admin/login`.