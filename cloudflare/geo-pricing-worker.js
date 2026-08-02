const EU_COUNTRIES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE',
  'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE',
]);

function bucketFor(country) {
  if (country === 'IN') return 'IN';
  if (country === 'GB') return 'GB';
  if (EU_COUNTRIES.has(country)) return 'EU';
  return 'default'; // includes US, CA, and everywhere else
}

class PriceRewriter {
  constructor(bucket) {
    this.bucket = bucket;
  }
  element(el) {
    const raw = el.getAttribute('data-prices');
    if (!raw) return;
    try {
      const prices = JSON.parse(raw);
      el.setInnerContent(prices[this.bucket] ?? prices.default ?? prices.IN);
    } catch {
      // malformed attribute — leave the static fallback text untouched
    }
  }
}

export default {
  async fetch(request) {
    const country = request.headers.get('cf-ipcountry') || 'XX';
    const bucket = bucketFor(country);
    const response = await fetch(request);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) return response;
    return new HTMLRewriter()
      .on('[data-prices]', new PriceRewriter(bucket))
      .transform(response);
  },
};
