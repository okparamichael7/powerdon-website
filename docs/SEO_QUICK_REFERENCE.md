# SEO Quick Reference Guide

## Quick Setup Checklist

### Initial Setup
- [ ] Update `NEXT_PUBLIC_SITE_URL` in `.env.local` to production URL
- [ ] Add Google Search Console verification code to `lib/seo.ts`
- [ ] Add Bing Webmaster Tools verification code to `lib/seo.ts`
- [x] Set up Vercel Analytics (✅ Already configured - enable in Vercel Dashboard)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

### Before Launch
- [ ] Test all metadata with [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verify sitemap at `/sitemap.xml`
- [ ] Verify robots.txt at `/robots.txt`
- [ ] Run Lighthouse audit
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Verify all images have alt text

---

## File Structure

```
lib/
  seo.ts                    # SEO utilities and configuration
components/
  seo/
    structured-data-server.tsx    # Global structured data
    page-structured-data.tsx      # Page-specific structured data
    faq-structured-data.tsx       # FAQ schema component
app/
  layout.tsx               # Root layout with metadata
  sitemap.ts               # Dynamic sitemap
  robots.ts                # Robots.txt configuration
  [page]/
    layout.tsx             # Page-specific metadata
```

---

## Common Tasks

### Adding Metadata to a New Page

1. Create `layout.tsx` in the page directory:
```typescript
import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Page Title",
  description: "Page description",
  keywords: ["keyword1", "keyword2"],
  path: "/page-path",
});
```

2. Add page to sitemap in `app/sitemap.ts`

### Adding FAQ Structured Data

```tsx
import { FAQStructuredData } from "@/components/seo/faq-structured-data";

const faqs = [
  { question: "Question?", answer: "Answer." },
  // ...
];

// In your page component:
<FAQStructuredData faqs={faqs} />
```

### Adding Breadcrumb Structured Data

```tsx
import { PageStructuredData } from "@/components/seo/page-structured-data";
import { getBreadcrumbSchema } from "@/lib/seo";

const breadcrumbs = getBreadcrumbSchema([
  { name: "Home", url: "/" },
  { name: "Page", url: "/page" },
]);

<PageStructuredData schema={breadcrumbs} />
```

---

## Environment Variables

Add to `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://powerdon.nl
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## Testing Tools

- **Rich Results Test**: https://search.google.com/test/rich-results
- **PageSpeed Insights**: https://pagespeed.web.dev/
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Schema Markup Validator**: https://validator.schema.org/

---

## Common Issues & Solutions

### Issue: Metadata not showing
**Solution**: Ensure layout.tsx is in the correct directory and exports metadata

### Issue: Structured data errors
**Solution**: Validate with Rich Results Test and fix JSON-LD syntax

### Issue: Sitemap not accessible
**Solution**: Check `app/sitemap.ts` exists and Next.js is running

### Issue: Images not optimized
**Solution**: Use Next.js Image component and ensure formats are configured

---

## Key Metrics to Monitor

### Weekly
- Organic traffic (GA4)
- Top pages (GA4)
- Search impressions (GSC)
- Average position (GSC)

### Monthly
- Core Web Vitals
- Index coverage
- Crawl errors
- Backlinks

---

## Support

For detailed information, see:
- `docs/SEO_STRATEGY.md` - Full SEO strategy
- `docs/ANALYTICS_SETUP.md` - Analytics setup guide
