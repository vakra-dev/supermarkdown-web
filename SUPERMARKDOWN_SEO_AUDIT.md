# supermarkdown.dev SEO & Indexability Audit

Audited: 2026-07-16

---

## 1. Framework and Routing

| Property       | Value                                                               |
| -------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Framework      | Next.js 15 (App Router)                                             |
| Output mode    | `output: 'export'` (fully static HTML export)                       |
| Rendering      | Static Site Generation (SSG) - all pages pre-rendered at build time |
| MDX            | `@next/mdx` with `remark-gfm` and `rehype-slug`                     |
| WASM           | `@vakra-dev/supermarkdown-wasm` loaded client-side                  |
| metadataBase   | `https://supermarkdown.dev` (set in root layout)                    |
| Template title | `%s                                                                 | supermarkdown`with default`supermarkdown - HTML to Markdown Converter` |

**Implications for SEO:**

- Static export means every page ships as a pre-rendered `.html` file. Crawlers receive full HTML without needing JS execution. This is excellent for indexability.
- Tool pages use `dynamic(() => import(...))` for interactive components, but the `ToolLayout` wrapper (h1, description, how-to steps, FAQ, related tools) is server-rendered and present in the static HTML. The interactive editor portion loads client-side but is not critical for crawlers.
- All homepage sections (`Hero`, `LiveDemo`, `Features`, `UseCases`, `Platforms`, `CodeExample`) are `'use client'` components. Because this is a static export, they still get pre-rendered to HTML at build time, but their content depends on whether the component renders meaningful text in its initial state or requires JS hydration.
- The `Hero` component renders heading text ("HTML -> Markdown") and calls-to-action as static text within JSX, so it will be present in the exported HTML. `framer-motion` wrappers add animation but the text is in the DOM.

---

## 2. URL Inventory

### 2a. Pages with routes

| URL                                                  | Source file                         | Title                                                                   | Description                                                        | Canonical | OG tags                       | Structured data                                  |
| ---------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------ | --------- | ----------------------------- | ------------------------------------------------ |
| `https://supermarkdown.dev`                          | `app/page.tsx`                      | Default: "supermarkdown - HTML to Markdown Converter"                   | "Convert HTML to Markdown with full GFM support..."                | Yes       | Yes (from root layout)        | Organization + SoftwareApplication (root layout) |
| `https://supermarkdown.dev/playground`               | `app/playground/page.tsx`           | "Playground \| supermarkdown"                                           | "Interactive HTML to Markdown converter..."                        | Yes       | Yes (explicit)                | None                                             |
| `https://supermarkdown.dev/tools`                    | `app/tools/page.tsx`                | "Free Markdown Converter & Tools Online \| supermarkdown"               | "Convert, edit, and format Markdown..."                            | Yes       | None (inherits root OG only)  | None                                             |
| `https://supermarkdown.dev/tools/html-to-markdown`   | `app/tools/[slug]/page.tsx`         | "HTML to Markdown Converter - Free Online \| supermarkdown"             | "Free online HTML to Markdown converter powered by Rust WASM..."   | Yes       | Yes (explicit)                | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/markdown-to-html`   | `app/tools/[slug]/page.tsx`         | "Markdown to HTML Converter - Free Online \| supermarkdown"             | "Free online Markdown to HTML converter with GFM support..."       | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/markdown-to-docx`   | `app/tools/[slug]/page.tsx`         | "Markdown to Word Converter - Free Online DOCX Export \| supermarkdown" | "Convert Markdown to Word documents (.docx) instantly..."          | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/csv-to-markdown`    | `app/tools/[slug]/page.tsx`         | "CSV to Markdown Table Converter - Free Online \| supermarkdown"        | "Free CSV to Markdown table converter..."                          | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/json-to-markdown`   | `app/tools/[slug]/page.tsx`         | "JSON to Markdown Converter - Free Online \| supermarkdown"             | "Free JSON to Markdown converter..."                               | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/markdown-editor`    | `app/tools/[slug]/page.tsx`         | "Markdown Editor - Free Online \| supermarkdown"                        | "Free online Markdown editor with live preview..."                 | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/markdown-table`     | `app/tools/[slug]/page.tsx`         | "Markdown Table Generator - Free Online \| supermarkdown"               | "Build Markdown tables visually..."                                | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/markdown-diff`      | `app/tools/[slug]/page.tsx`         | "Markdown Diff Tool - Free Online \| supermarkdown"                     | "Free Markdown diff tool to compare two documents..."              | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/markdown-formatter` | `app/tools/[slug]/page.tsx`         | "Markdown Formatter - Free Online \| supermarkdown"                     | "Free Markdown formatter and beautifier..."                        | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/tools/readme-generator`   | `app/tools/[slug]/page.tsx`         | "README Generator - Free Online \| supermarkdown"                       | "Free README generator with guided form..."                        | Yes       | Yes                           | FAQPage + WebApplication + HowTo                 |
| `https://supermarkdown.dev/docs`                     | `app/docs/page.tsx`                 | None (redirects)                                                        | None                                                               | None      | None                          | None                                             |
| `https://supermarkdown.dev/docs/getting-started`     | `app/docs/getting-started/page.mdx` | "Getting Started \| supermarkdown"                                      | "Install and start using supermarkdown..."                         | Yes       | Yes (explicit, type: article) | None                                             |
| `https://supermarkdown.dev/docs/api`                 | `app/docs/api/page.mdx`             | "API Reference \| supermarkdown"                                        | "Complete API reference for supermarkdown..."                      | Yes       | Yes                           | None                                             |
| `https://supermarkdown.dev/docs/options`             | `app/docs/options/page.mdx`         | "Options \| supermarkdown"                                              | "Configure supermarkdown conversion..."                            | Yes       | Yes                           | None                                             |
| `https://supermarkdown.dev/docs/elements`            | `app/docs/elements/page.mdx`        | "Supported Elements \| supermarkdown"                                   | "Full list of HTML elements supported..."                          | Yes       | Yes                           | None                                             |
| `https://supermarkdown.dev/docs/edge-cases`          | `app/docs/edge-cases/page.mdx`      | "Edge Cases \| supermarkdown"                                           | "How supermarkdown handles tricky HTML-to-Markdown conversions..." | Yes       | Yes                           | None                                             |
| `https://supermarkdown.dev/docs/rust`                | `app/docs/rust/page.mdx`            | "Rust Usage \| supermarkdown"                                           | "Use supermarkdown as a Rust crate..."                             | Yes       | Yes                           | None                                             |

### 2b. Summary

- **Total indexable pages:** 19 (20 routes minus the /docs redirect)
- **Pages with canonical URL:** 18/19
- **Pages with OG tags:** 17/19 (missing: /tools hub, /docs redirect)
- **Pages with structured data:** 10 tool pages + homepage = 11/19
- **Pages with description:** 18/19

---

## 3. Sitemap and Robots Audit

### sitemap.xml

**Location:** `/public/sitemap.xml` (static file)

**Issues found:**

| Issue                                 | Severity | Detail                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Static file, not auto-generated       | Medium   | The sitemap is a hand-maintained static XML file in `/public/`. It will not automatically update when new tool pages or docs pages are added. A `app/sitemap.ts` exporting a dynamic sitemap function would auto-generate from the tools registry and docs directory. However, since the site uses `output: 'export'`, a build-time sitemap is acceptable as long as it is kept in sync manually. |
| No `<lastmod>` dates                  | Low      | No `<lastmod>` elements are present. Adding last-modified dates helps crawlers prioritize re-crawling.                                                                                                                                                                                                                                                                                            |
| `/docs` is not in sitemap             | OK       | Correctly excluded since it 301-redirects to `/docs/getting-started`.                                                                                                                                                                                                                                                                                                                             |
| All tool pages present                | OK       | All 10 tool slugs are listed.                                                                                                                                                                                                                                                                                                                                                                     |
| All docs pages present                | OK       | All 6 docs slugs are listed.                                                                                                                                                                                                                                                                                                                                                                      |
| Homepage, /tools, /playground present | OK       | All included.                                                                                                                                                                                                                                                                                                                                                                                     |

**URL count in sitemap:** 19 (matches the indexable page count exactly)

### robots.txt

**Location:** `/public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://supermarkdown.dev/sitemap.xml
```

**Assessment:** Clean and correct. Allows all crawlers, points to sitemap. No issues.

---

## 4. Rendered HTML Audit

### Static export behavior

Since `output: 'export'` is configured, Next.js pre-renders all pages to static HTML at build time. Even components with `'use client'` directives get their initial render included in the HTML output.

### Per-page rendering assessment

| Page                     | Server-rendered content                                                                                                                                                             | Client-only content                                                                                                             | SEO risk                                                                                                                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (homepage)           | All sections render text in initial JSX (h1, descriptions, feature cards, platform badges, install command). `framer-motion` wraps add animation but text is in DOM.                | `LiveDemo` interactive converter requires JS for user interaction, but its heading and description text are in the static HTML. | **Low** - Core content is in static HTML. The interactive demo is a progressive enhancement.                                                                                                    |
| `/playground`            | Minimal - the `<Playground />` component is `'use client'` with Monaco Editor loaded via `dynamic()`.                                                                               | The entire playground UI (editors, options panel, output) requires JS.                                                          | **Medium** - This is an app-like page where client rendering is expected. The page metadata is sufficient for SEO. There is no significant crawlable text content beyond the title/description. |
| `/tools` (hub)           | Tool cards with names and descriptions are rendered server-side. The entire page is a Server Component.                                                                             | None.                                                                                                                           | **None** - Fully server-rendered.                                                                                                                                                               |
| `/tools/[slug]` (all 10) | `ToolLayout` renders h1, description, how-to steps, FAQ (with `<details>` elements), and related tool links as server-rendered HTML. JSON-LD structured data is in `<script>` tags. | The interactive tool component (editor, converter UI) loads client-side via `dynamic()`.                                        | **Low** - The SEO-critical content (h1, description, FAQ, how-to, internal links) is all in the static HTML. The interactive tool is a progressive enhancement.                                 |
| `/docs/*` (all 6)        | MDX content is pre-rendered to HTML at build time. Full article text, headings, code blocks are in the static HTML.                                                                 | Sidebar navigation uses client-side hash tracking.                                                                              | **None** - Content pages are fully static.                                                                                                                                                      |

### Key finding

The tool pages have an excellent pattern: `ToolLayout` (server component) wraps the dynamic tool component, ensuring h1, description, FAQ, how-to, and related links are always in the crawlable HTML regardless of JS execution. This is the ideal SEO architecture for interactive tool pages.

---

## 5. Tool Page Quality Audit

Checklist for each of the 10 tool pages at `/tools/[slug]`:

| Criterion             | html-to-markdown | markdown-to-html | markdown-to-docx | csv-to-markdown | json-to-markdown | markdown-editor | markdown-table | markdown-diff | markdown-formatter | readme-generator |
| --------------------- | :--------------: | :--------------: | :--------------: | :-------------: | :--------------: | :-------------: | :------------: | :-----------: | :----------------: | :--------------: |
| Unique title          |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| Unique description    |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| Canonical URL         |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| OG title + desc + url |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| OG image              |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| Twitter card          |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| H1 tag                |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| FAQPage schema        |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| WebApplication schema |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| HowTo schema          |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| FAQ count             |        4         |        4         |        4         |        3        |        2         |        2        |       2        |       1       |         1          |        2         |
| How-to steps          |        3         |        3         |        3         |        3        |        3         |        3        |       3        |       3       |         3          |        3         |
| Related tools links   |        3         |        3         |        3         |        3        |        3         |        3        |       3        |       3       |         3          |        3         |
| In sitemap            |       Yes        |       Yes        |       Yes        |       Yes       |       Yes        |       Yes       |      Yes       |      Yes      |        Yes         |       Yes        |
| Keywords in registry  |        3         |        3         |        4         |        3        |        3         |        3        |       3        |       3       |         3          |        3         |

### Issues found

| Issue                                                  | Severity | Detail                                                                                                                                                                                               |
| ------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Thin FAQ on P2 tools                                   | Low      | `markdown-diff` and `markdown-formatter` each have only 1 FAQ. Google may not generate FAQ rich results for pages with a single Q&A. Recommend at least 3 per page.                                  |
| `markdown-editor` has only 2 FAQ                       | Low      | Could benefit from 1-2 more questions (e.g., "Does it support GFM tables?", "Can I export to PDF?").                                                                                                 |
| `json-to-markdown` has only 2 FAQ                      | Low      | Could add "Can I convert nested JSON?" and "Does it support JSON arrays with mixed types?"                                                                                                           |
| No per-tool OG images                                  | Low      | All tool pages share the same `/og-image.png`. Unique OG images per tool would improve social sharing CTR.                                                                                           |
| Missing `description` in WebApplication schema         | Medium   | The `generateWebAppSchema()` function in `lib/tools/seo.ts` does not include the tool's `description` field. Google recommends including `description` in SoftwareApplication/WebApplication schema. |
| `keywords` from registry are not used in page metadata | Low      | The `keywords` array in each `ToolConfig` is defined but never passed to the page's `<meta name="keywords">` tag. While `meta keywords` has negligible SEO value in 2026, it is a wasted data point. |

---

## 6. Reader Funnel Audit

### Current Reader.dev links

There is exactly **one** reader.dev link on the entire site:

| Location                             | Link                 | Text                                                                                | Visibility                                                                                             |
| ------------------------------------ | -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `components/layout/promo-banner.tsx` | `https://reader.dev` | "Scrape any webpage to LLM-ready Markdown with Reader - Open source & built for AI" | Dismissible banner at top of every page. Once dismissed, stored in localStorage and never shown again. |

### Missing opportunities

The promo banner is the only Reader funnel and it is dismissible. Once a user closes it, there are zero Reader.dev links anywhere on the site. Every tool page and docs page is a missed cross-sell opportunity.

### Recommended Reader.dev placements

| Page / Component               | Recommended link                 | Anchor text / CTA                                                                     | Placement                                                           |
| ------------------------------ | -------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `/tools/html-to-markdown`      | `https://reader.dev/scrape`      | "Convert live webpages to Markdown with Reader's scrape API"                          | Below the tool (after FAQ, before related tools), as a callout/card |
| `/tools/markdown-to-html`      | `https://reader.dev/scrape`      | "Scrape public webpages and convert to clean Markdown with Reader"                    | Same position, callout card                                         |
| `/tools/csv-to-markdown`       | `https://reader.dev/extract`     | "Extract structured data from public webpages as CSV with Reader's extract API"       | Callout card after FAQ                                              |
| `/tools/json-to-markdown`      | `https://reader.dev/extract`     | "Extract structured JSON from live webpages with Reader's extract API"                | Callout card after FAQ                                              |
| `/tools/markdown-editor`       | `https://reader.dev/scrape`      | "Convert pages your workflow is allowed to access into editable Markdown with Reader" | Callout card after FAQ                                              |
| `/tools/markdown-table`        | `https://reader.dev/extract`     | "Extract tables from live webpages as structured data with Reader's extract API"      | Callout card after FAQ                                              |
| `/tools/markdown-to-docx`      | `https://reader.dev/scrape`      | "Scrape public webpages to Markdown, then export to Word"                             | Callout card after FAQ                                              |
| `/tools/markdown-diff`         | `https://reader.dev/scrape`      | "Track changes on live webpages by scraping them to Markdown over time with Reader"   | Callout card after FAQ                                              |
| `/tools/markdown-formatter`    | `https://reader.dev/scrape`      | "Get clean, well-formatted Markdown from public webpages with Reader's scrape API"    | Callout card after FAQ                                              |
| `/tools/readme-generator`      | `https://reader.dev/scrape`      | "Scrape your project's live site to auto-populate your README with Reader"            | Callout card after FAQ                                              |
| `/docs/getting-started`        | `https://reader.dev/scrape`      | "supermarkdown powers Reader's scrape API for converting live webpages to Markdown"   | Mention in introduction paragraph                                   |
| `/docs/api`                    | `https://reader.dev/scrape`      | "See supermarkdown in production: Reader's scrape API"                                | Link in "Usage in production" section                               |
| `/docs/rust`                   | `https://reader.dev/open-source` | "supermarkdown is open source, powering Reader's scraping engine"                     | End of page callout                                                 |
| `/` (homepage)                 | `https://reader.dev`             | "Powering Reader - the open-source web scraping API"                                  | In the "Use Cases" or "Platforms" section                           |
| `components/layout/footer.tsx` | `https://reader.dev`             | "Reader"                                                                              | Permanent footer link alongside GitHub, npm, crates.io              |

### Implementation approach

Create a reusable `<ReaderCallout>` server component that accepts a `href`, `title`, and `description`. Render it in `ToolLayout` between the FAQ and Related Tools sections, with the link determined by the tool's slug. This keeps it server-rendered and crawlable, and avoids duplicating markup across 10 tool pages.

For the footer, add a simple `<a>` tag in the existing links row.

---

## 7. P0 Fixes (Prioritized)

### P0 - Critical (fix immediately)

| #   | Issue                                                                                                                                                                                       | Impact                                               | File(s)                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| 1   | **Footer has no Reader.dev link.** Once the promo banner is dismissed, Reader.dev is unreachable from supermarkdown.dev. The footer is the only persistent, non-dismissible global element. | Lost cross-sell on every page view after first visit | `components/layout/footer.tsx`       |
| 2   | **Promo banner text says "Scrape any webpage"** - should use softer language like "Scrape public webpages" or "Convert live webpages to LLM-ready Markdown"                                 | Overpromises capability                              | `components/layout/promo-banner.tsx` |
| 3   | **`/tools` hub page has no explicit OG tags.** It inherits the root layout's OG (which points to `/` not `/tools`). The OG URL will be wrong when this page is shared.                      | Incorrect social preview when shared                 | `app/tools/page.tsx`                 |
| 4   | **WebApplication schema is missing `description` field.** All 10 tool pages emit a WebApplication JSON-LD without a description.                                                            | Reduced rich result eligibility                      | `lib/tools/seo.ts`                   |

### P1 - Important (fix soon)

| #   | Issue                                                                                                                                          | Impact                                                   | File(s)                                                            |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| 5   | **No Reader.dev links on any tool page.** Zero cross-sell below the dismissed banner.                                                          | Missed funnel from high-traffic tool pages               | `components/tools/ToolLayout.tsx` + new `ReaderCallout` component  |
| 6   | **No Reader.dev link on homepage.** The homepage does not mention Reader anywhere except the dismissible banner.                               | Missed brand association                                 | `components/home/use-cases.tsx` or `components/home/platforms.tsx` |
| 7   | **No Reader.dev links in docs.** Docs pages do not mention Reader at all.                                                                      | Missed funnel from developer audience                    | `app/docs/getting-started/page.mdx`, `app/docs/rust/page.mdx`      |
| 8   | **Thin FAQ content on 4 tools.** `markdown-diff` (1 FAQ), `markdown-formatter` (1 FAQ), `markdown-editor` (2 FAQ), `json-to-markdown` (2 FAQ). | Reduced FAQ rich result eligibility, thin content signal | `lib/tools/registry.ts`                                            |
| 9   | **Sitemap has no `<lastmod>` dates.**                                                                                                          | Crawlers cannot prioritize recently updated pages        | `public/sitemap.xml`                                               |

### P2 - Nice to have

| #   | Issue                                                                                      | Impact                                                                                              | File(s)                                     |
| --- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| 10  | **No dynamic sitemap generation.** Static XML will drift out of sync when pages are added. | Future maintenance burden                                                                           | Could add `app/sitemap.ts`                  |
| 11  | **No unique OG images per tool.** All pages share one `/og-image.png`.                     | Lower social sharing CTR                                                                            | `public/` + `generateMetadata` in tool page |
| 12  | **`keywords` array in tool registry is unused in metadata.**                               | Wasted config data (meta keywords have negligible SEO value, but could be used for internal search) | `app/tools/[slug]/page.tsx`                 |
| 13  | **Playground page has no structured data.**                                                | Minor - app-like pages rarely benefit from structured data                                          | `app/playground/page.tsx`                   |
| 14  | **Docs pages have no structured data.** Could add `TechArticle` or `Article` JSON-LD.      | Minor improvement for docs discoverability                                                          | `app/docs/*/page.mdx`                       |

---

## 8. Implementation Plan

Grouped by file, with the fix number from section 7.

### `components/layout/footer.tsx`

**Fix #1** - Add a Reader.dev link to the footer links row.

- Add `<a href="https://reader.dev" target="_blank" rel="noopener noreferrer">Reader</a>` in the links list alongside GitHub, npm, crates.io.

### `components/layout/promo-banner.tsx`

**Fix #2** - Change banner text from "Scrape any webpage" to "Convert live webpages to LLM-ready Markdown".

- Line 27: Update the `<span>` text.

### `app/tools/page.tsx`

**Fix #3** - Add explicit OG tags to the tools hub metadata export.

- Add `openGraph: { title, description, url: 'https://supermarkdown.dev/tools', siteName: 'supermarkdown', type: 'website', images: ['/og-image.png'] }` to the existing `metadata` export.

### `lib/tools/seo.ts`

**Fix #4** - Add `description` to `generateWebAppSchema()`.

- Add `description: tool.description` to the returned object.

### New file: `components/tools/ReaderCallout.tsx`

**Fix #5** - Create a server component for Reader cross-sell on tool pages.

- Accepts `toolSlug` prop, maps to the appropriate Reader.dev URL and CTA text.
- Renders a subtle callout card with the link.

### `components/tools/ToolLayout.tsx`

**Fix #5** - Render `<ReaderCallout>` between FAQ and Related Tools.

- Import and render the new component, passing `config.slug`.

### `components/home/use-cases.tsx` or `components/home/platforms.tsx`

**Fix #6** - Add a Reader.dev mention.

- Add a use-case card or platform badge linking to `https://reader.dev` with text like "Powering Reader - the open-source web scraping API".

### `app/docs/getting-started/page.mdx`

**Fix #7** - Add a Reader.dev mention in the introduction.

- Add a sentence: "supermarkdown powers [Reader's scrape API](https://reader.dev/scrape) for converting live webpages to Markdown."

### `app/docs/rust/page.mdx`

**Fix #7** - Add a Reader.dev callout at the end.

- Add: "supermarkdown is [open source](https://reader.dev/open-source), powering Reader's scraping engine."

### `lib/tools/registry.ts`

**Fix #8** - Expand FAQ arrays for thin tools.

- `markdown-diff`: Add 2 more FAQ items.
- `markdown-formatter`: Add 2 more FAQ items.
- `markdown-editor`: Add 1-2 more FAQ items.
- `json-to-markdown`: Add 1-2 more FAQ items.

### `public/sitemap.xml`

**Fix #9** - Add `<lastmod>` elements to all URLs.

- Use the current date for now; ideally tie to git commit dates in the future.

---

## Summary

**What is working well:**

- Metadata coverage is thorough: 18/19 pages have title, description, canonical, and OG tags.
- Tool pages have excellent SEO architecture: server-rendered h1, description, FAQ, how-to, and related links with JSON-LD structured data (FAQPage, WebApplication, HowTo).
- Static export ensures all content is crawlable without JS execution.
- Sitemap and robots.txt are correct and complete.
- Internal linking via related tools creates a healthy link graph between tool pages.

**What needs attention:**

- Reader.dev cross-sell is almost nonexistent (1 dismissible banner, zero persistent links).
- Tools hub page is missing explicit OG tags.
- WebApplication schema is missing the `description` field.
- Several tool pages have thin FAQ content.
- No `<lastmod>` in sitemap.
