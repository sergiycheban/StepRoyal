# StepRoyal SEO/GEO build

Updated: 2026-09-19

## Current indexable architecture

The site now contains 93 indexable pages:

- 3 language home pages: RU / UA / EN
- 26 route groups x 3 languages = 78 route pages
- 4 route collection pages x 3 languages = 12 hub pages

Collection pages:

- `/[lang]/transfers-from-chisinau/`
- `/[lang]/transfers-from-odessa/`
- `/[lang]/moldova-ukraine-transfers/`
- `/[lang]/airport-transfers/`

## Route-page quality rules

- Every route has matching RU / UA / EN pages with reciprocal hreflang.
- Core content is static HTML and remains readable without JavaScript.
- Every route has a unique title and meta description.
- Every route includes an approximate road distance, a conservative planning-time range, route-specific guidance, FAQs, related routes and internal links to collection pages.
- Reverse-direction duplicate pages are intentionally not generated. One route page describes service in both directions to avoid cannibalization and thin duplication.
- The six previously published Comfort prices are preserved.
- New routes intentionally use “price on request” rather than inventing unconfirmed public prices.
- `assets/data/routes.json` is the machine-readable route inventory for future maintenance.

## Technical SEO/GEO

- Canonical URLs, hreflang annotations, sitemap URLs and internal links use the same real page paths.
- Sitemap contains only indexable canonical pages.
- Main RU/UA/EN content is rendered directly in HTML instead of depending on JavaScript.
- Organization, WebSite, WebPage/CollectionPage, Service, Offer where a published price exists, BreadcrumbList, ItemList and FAQPage Schema.org are used where relevant.
- Open Graph and Twitter metadata are present on indexable pages.
- OAI-SearchBot and ChatGPT-User are explicitly allowed in robots.txt.
- `llms.txt` provides an optional AI-readable route summary; it is not treated as a Google ranking factor.
- Legacy mistaken URLs are handled by permanent Vercel redirects.
- Home pages link to route collections, and every indexable page is reachable through normal HTML links.

## Deployment on Vercel

Keep `vercel.json` in the project root. It provides the permanent redirects for legacy URL variants and the root language redirect.

After deployment:

1. Verify `https://step-royal.com/sitemap.xml` returns HTTP 200.
2. Submit the sitemap in Google Search Console.
3. Request indexing first for the three home pages and four main collection pages in each language.
4. Let Google discover the route pages through the sitemap and internal links.
5. Check Coverage / Page indexing and canonical selection after recrawl.

## Important pricing note

The existing six public prices and the generic calculator formula are not mathematically identical. For accuracy, this build does not derive new public route prices from that formula. New route pages use a quote-on-request message until actual commercial prices are supplied.

## Contact data

The site currently uses `stepan198686@gmail.com` because it already existed in the original project. Replacing it later with a dedicated `@step-royal.com` mailbox would be preferable for brand consistency.

## Validation

Run:

```bash
python scripts/validate_site.py
```

The validator checks the expected 93 indexable pages, canonical uniqueness and existence, reciprocal language targets, JSON-LD validity, sitemap/canonical consistency and broken local resources.
