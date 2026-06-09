# Advocate Of SHALOM — Sanity Studio

Content management for **Advocate Of SHALOM**.

- **Project ID**: `vi40cipr`
- **Datasets**: `production`, `staging`
- **Deployed Studio**: <https://advocate-of-shalom.sanity.studio/>

Originally generated from `pws-studio-template` and customized.

## Stack

- Sanity v3 + TypeScript
- React 19 (Studio internals)
- `sanity-plugin-icon-picker` (for legacy icon fields — most cards now use Lucide name strings instead)
- Custom **deploy-button** plugin: adds a "Deploy Site" tool to the sidebar that POSTs to a Netlify Function to trigger a build

## Local development

```bash
npm install
npm run dev
```

Required env vars in `studio/.env`:

```
SANITY_STUDIO_PROJECT_ID=vi40cipr
SANITY_STUDIO_DATASET=production

# Deploy button (after Netlify is set up)
SANITY_STUDIO_DEPLOY_FUNCTION_URL=https://<netlify-site>/.netlify/functions/trigger-deploy
SANITY_STUDIO_DEPLOY_HOOK_SECRET=<must match DEPLOY_HOOK_SECRET in Netlify>
```

## Schemas

### Document types

| Schema           | Purpose |
|------------------|---------|
| `siteSettings`   | Singleton: site name, logos (light + dark), CTA, description, copyright, business contact |
| `navigation`     | Header / footer / legal nav items |
| `footerColumns`  | Per-column footer link groups (Explore, Legal, etc.) |
| `socialLinks`    | Social profile entries |
| `page`           | Generic page driven by `sections[]` array (used by Home) |
| `aboutPage`      | Dedicated singleton for About — has Full / Professional story version toggle + shared shared sections |
| `contactPage`    | Dedicated singleton for Contact — form fields + map block |
| `partnersPage`   | Dedicated singleton for Partners — service grid + split block + testimonials + CTA |
| `servicesPage`   | Dedicated singleton for Services — service grid + process steps + FAQ + CTA |
| `resourcesPage`  | Dedicated singleton for Resources — resource categories grid + split callout + CTA |
| `legalPage`      | Privacy, Terms, Accessibility — title + lastUpdated + portable text body |

### Object types (inline section schemas in `page.ts`)

`heroSection`, `featureGrid`, `statsSection`, `processSteps`, `testimonialsSection`, `pricingSection`, `pricingCtaSection`, `faqSection`, `splitSection`, `contactSection`, `textContent`, `videoSection`, `portfolioSection`, `teamProjectsSection`

### Desk structure

Custom structure in `sanity.config.ts` groups documents:

- **Pages** folder: Home, About, Services, Partners, Resources, Contact
- **Legal Pages** folder: Terms, Privacy, Accessibility
- Then: Site Settings, Navigation, Footer Columns, Social Links

## Icons in card grids (Services / Partners / Resources / Home Feature Grid / Process Steps)

Icon fields store **Lucide icon name strings** (e.g. `"Scale"`, `"Network"`, `"Share2"`). The frontend resolves them via `getLucideIcon(name)` from `frontend/src/composables/useLucideIcons.ts`. Unknown names render `HelpCircle` as a fallback. When adding a new card icon, add its import to that registry on the frontend side.

## Seed

`seed.ts` populates initial content for fresh installs. Run with:

```bash
npx sanity exec seed.ts --with-user-token
```

Most docs use `createIfNotExists` (safe to re-run, no-op on existing). A small `REPLACE_IDS` set forces `createOrReplace` on docs whose content is fully managed by seed — currently the three legal pages and the "Explore" footer column. **Adding docs to `REPLACE_IDS` is destructive** — it wipes any Studio-side edits to that doc. Use sparingly; prefer the patch scripts below for surgical updates.

## Patch scripts

Surgical scripts in `scripts/` for targeted updates without overwriting docs:

| Script | Purpose |
|--------|---------|
| `patch-brand-name.ts` | Normalize brand name to `Advocate Of SHALOM` everywhere in live data |
| `patch-card-icons.ts` | Update card-grid icon strings by key path |
| `patch-restore-home.ts` | Restore home page content (hero/text/cta) — for disaster recovery |
| `patch-restore-process-steps.ts` | Restore the home page process steps section |
| `inspect-history.ts` | Inspect Sanity document revision history (requires elevated API token) |

Run any with:

```bash
npx sanity exec scripts/<script>.ts --with-user-token -- --dry   # preview
npx sanity exec scripts/<script>.ts --with-user-token             # apply
```

## Deploy

```bash
npx sanity deploy
```

Pinned `appId` in `sanity.cli.ts` so deploys go straight through. After deploy, the Studio is live at <https://advocate-of-shalom.sanity.studio/>.

## Notes

- Content editors get the deploy button as a sidebar tool — they can batch edits, then publish to the live site with one click instead of relying on per-save webhooks.
- The legal pages render `lastUpdated` with `timeZone: 'UTC'` to avoid timezone day-shifting (calendar dates stay stable across viewer timezones).
