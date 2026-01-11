# Analytics & SEO Monitoring Setup Guide

## Overview

This guide provides step-by-step instructions for setting up analytics and SEO monitoring tools for the PowerDon website.

---

## 1. Vercel Analytics Setup

### Overview

Vercel Analytics is a privacy-friendly, lightweight analytics solution that automatically tracks:
- Page views
- Web Vitals (LCP, FID, CLS)
- Performance metrics
- Custom events

**Benefits:**
- No cookies required (GDPR compliant)
- Automatic Core Web Vitals tracking
- Built-in performance monitoring
- Simple setup
- Free tier available

### Step 1: Install Package

The package is already installed. If you need to reinstall:

```bash
npm install @vercel/analytics
```

### Step 2: Add to Layout

**Already configured in `app/layout.tsx`:**

```typescript
import { Analytics } from "@vercel/analytics/react";

// In your layout component:
<Analytics />
```

The Analytics component is already added to the root layout and will automatically track page views.

### Step 3: Enable in Vercel Dashboard

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** > **Analytics**
4. Enable **Web Analytics**
5. Analytics will start collecting data automatically

### Step 4: View Analytics

1. Go to your Vercel Dashboard
2. Select your project
3. Click on **Analytics** tab
4. View:
   - Page views
   - Top pages
   - Web Vitals
   - Performance metrics
   - Custom events

### Step 5: Track Custom Events

**Use the analytics utilities in `lib/analytics.ts`:**

```typescript
import { trackEvent, trackButtonClick, trackFormSubmit } from '@/lib/analytics';

// Track button clicks
const handleClick = () => {
  trackButtonClick('Reserve Station Button');
};

// Track form submissions
const handleSubmit = () => {
  trackFormSubmit('Contact Form');
};

// Track custom events
trackEvent('video_play', { video: 'Product Demo' });
trackEvent('conversion', { type: 'Quote Request', value: 1 });
```

**Available utility functions:**
- `trackEvent(name, properties)` - Track any custom event
- `trackFormSubmit(formName)` - Track form submissions
- `trackButtonClick(buttonName)` - Track button clicks
- `trackVideoPlay(videoName)` - Track video plays
- `trackConversion(type, value?)` - Track conversions/leads
- `trackPageView(path)` - Track page views (usually automatic)

---

## 2. Google Search Console Setup

### Step 1: Add Property

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property"
3. Select "URL prefix"
4. Enter: `https://powerdon.nl`
5. Click "Continue"

### Step 2: Verify Ownership

**Option 1: HTML Tag (Recommended)**
1. Copy the meta tag provided
2. Add to `lib/seo.ts` in `generateMetadata` function:
```typescript
verification: {
  google: "your-verification-code-here",
},
```

**Option 2: HTML File**
1. Download the HTML file
2. Upload to `public/` directory
3. Deploy and verify

**Option 3: DNS Record**
1. Add TXT record to your DNS
2. Verify in Search Console

### Step 3: Submit Sitemap

1. In Search Console, go to "Sitemaps"
2. Enter: `sitemap.xml`
3. Click "Submit"
4. Wait for indexing (can take days/weeks)

### Step 4: Request Indexing

1. Go to "URL Inspection"
2. Enter your homepage URL
3. Click "Request Indexing"
4. Repeat for important pages

---

## 3. Bing Webmaster Tools Setup

### Step 1: Add Site

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. Click "Add a site"
4. Enter: `https://powerdon.nl`
5. Click "Add"

### Step 2: Verify Ownership

**Option 1: Meta Tag**
1. Copy the meta tag
2. Add to `lib/seo.ts`:
```typescript
verification: {
  // ... existing
  other: {
    "msvalidate.01": "your-bing-verification-code",
  },
},
```

**Option 2: XML File**
1. Download XML file
2. Upload to `public/` directory
3. Verify

### Step 3: Submit Sitemap

1. Go to "Sitemaps"
2. Enter: `https://powerdon.nl/sitemap.xml`
3. Click "Submit"

---

## 4. Core Web Vitals Monitoring

### Google Search Console

1. Go to "Experience" > "Core Web Vitals"
2. Review metrics:
   - LCP (Largest Contentful Paint)
   - FID (First Input Delay)
   - CLS (Cumulative Layout Shift)
3. Check mobile and desktop separately

### PageSpeed Insights

1. Go to [PageSpeed Insights](https://pagespeed.web.dev/)
2. Enter your URL
3. Run test
4. Review:
   - Performance score
   - Core Web Vitals
   - Opportunities
   - Diagnostics

### Lighthouse CI (Optional)

For automated testing:
1. Set up Lighthouse CI
2. Run on every deployment
3. Track scores over time

---

## 5. Rank Tracking Setup

### Option 1: Google Search Console (Free)

1. Go to "Performance" report
2. Review:
   - Top queries
   - Average position
   - Click-through rate
   - Impressions

### Option 2: Third-Party Tools (Paid)

**SEMrush:**
1. Sign up at semrush.com
2. Add project
3. Add keywords to track
4. Set up weekly reports

**Ahrefs:**
1. Sign up at ahrefs.com
2. Add project
3. Track keyword rankings
4. Monitor backlinks

---

## 6. Monitoring Dashboard Setup

### Create Weekly Report Template

**Metrics to Track:**
- Page views (Vercel Analytics)
- Top pages (Vercel Analytics)
- Web Vitals (Vercel Analytics)
- Search impressions (GSC)
- Search clicks (GSC)
- Average position (GSC)
- Core Web Vitals (GSC)
- Index coverage (GSC)
- Crawl errors (GSC)

### Automated Reports

**Vercel Analytics:**
1. Go to Vercel Dashboard > Analytics
2. View real-time and historical data
3. Export data via API (if needed)
4. Set up alerts in Vercel Dashboard

**Google Search Console:**
1. Go to "Performance" report
2. Click "Export" > "Download"
3. Set up manual weekly export

---

## 7. Event Tracking Setup

### Track Key User Actions

**Form Submissions:**
```typescript
import { trackFormSubmit } from '@/lib/analytics';

trackFormSubmit('Contact Form');
```

**Button Clicks:**
```typescript
import { trackButtonClick } from '@/lib/analytics';

trackButtonClick('Reserve Station');
```

**Video Plays:**
```typescript
import { trackVideoPlay } from '@/lib/analytics';

trackVideoPlay('Product Video');
```

---

## 8. Conversion Tracking

### Track Conversions

Vercel Analytics tracks all custom events. Use the conversion tracking function:

```typescript
import { trackConversion } from '@/lib/analytics';

// Track conversions
trackConversion('Quote Request', 1);
trackConversion('Form Submission');
trackConversion('Reserve Station Click');
```

**Conversion events to track:**
- Form submissions
- Quote requests
- Reserve station clicks
- Contact form submissions

View conversion events in the Vercel Dashboard under Analytics > Events.

---

## 9. Regular Monitoring Schedule

### Daily
- Check for crawl errors (GSC)
- Monitor site uptime
- Review traffic spikes/drops

### Weekly
- Review search performance (GSC)
- Check Core Web Vitals
- Review top pages
- Monitor keyword rankings

### Monthly
- Full analytics review
- Content performance analysis
- Backlink audit
- Technical SEO check
- Competitor analysis

### Quarterly
- Comprehensive SEO audit
- Strategy review
- Goal assessment
- Plan next quarter

---

## 10. Troubleshooting

### Vercel Analytics Not Tracking
- Verify Analytics component is in layout
- Check that Web Analytics is enabled in Vercel Dashboard
- Ensure you're viewing the production deployment (not localhost)
- Check browser console for errors
- Verify the site is deployed on Vercel

### Search Console Not Indexing
- Check robots.txt allows crawling
- Verify sitemap is accessible
- Check for crawl errors
- Request indexing manually

### Core Web Vitals Issues
- Optimize images
- Minimize JavaScript
- Reduce server response time
- Use CDN
- Enable compression

---

## Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Vercel Analytics Package](https://www.npmjs.com/package/@vercel/analytics)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Bing Webmaster Tools Help](https://www.bing.com/webmasters/help)
- [Core Web Vitals Guide](https://web.dev/vitals/)

---

**Last Updated:** January 2025
