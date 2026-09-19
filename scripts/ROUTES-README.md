# Route page architecture

The expanded site contains 26 route groups in RU/UA/EN plus four multilingual collection pages.

- `assets/data/routes.json` is the machine-readable route inventory.
- Published prices are preserved only for the six routes that already had a confirmed public price before expansion.
- New routes intentionally use “price on request” rather than invented values.
- Distances are rounded road-distance references and planning times are deliberately conservative ranges.
- Route pages are static HTML so search engines and AI crawlers can read the core content without JavaScript.

When adding a route, create all three language variants, update hreflang and sitemap together, and avoid creating near-duplicate reverse-direction pages.
