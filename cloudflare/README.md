# Geo-pricing Worker

`geo-pricing-worker.js` rewrites any HTML element carrying a `data-prices` attribute (set by `components/Price.tsx`) to show the price matching the visitor's country, using Cloudflare's `cf-ipcountry` request header. It's generic — it never needs updating when prices change, since it only reads the JSON already embedded by the app.

**Not deployed yet.** This needs the site's DNS proxied through Cloudflare first (nameservers pointed at Cloudflare instead of the current registrar). That's a domain-wide change — audit every existing DNS record (A, MX, TXT/SPF/DKIM/DMARC, CNAMEs for `api.`/`app.`/`www.`) and recreate them in Cloudflare's zone *before* switching nameservers, or things like email delivery can break. Do that as its own careful, confirmed step — not bundled into a code deploy.

Once the zone is live on Cloudflare:

```bash
wrangler deploy
```

Then attach it as a Worker route on `pandapath.in/*` in the Cloudflare dashboard (or via `wrangler.toml` routes config).
