import { track } from "@vercel/analytics";

/**
 * Analytics Utilities
 * Using Vercel Analytics for web analytics
 *
 * Vercel Analytics automatically tracks:
 * - Page views
 * - Web Vitals (LCP, FID, CLS)
 * - Performance metrics
 *
 * Use this file for custom event tracking
 */

/**
 * Track a custom event
 *
 * @param name - Event name
 * @param properties - Optional event properties
 *
 * @example
 * trackEvent('button_click', { button: 'Reserve Station' });
 * trackEvent('form_submit', { form: 'Contact Form' });
 */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
) {
  // Only track in browser environment
  if (typeof window === "undefined") {
    return;
  }

  try {
    track(name, properties);
  } catch (error) {
    // Silently fail in production, but log in development
    if (process.env.NODE_ENV === "development") {
      console.warn("Analytics tracking error:", error);
    }
  }
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string) {
  trackEvent("form_submit", { form: formName });
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string) {
  trackEvent("button_click", { button: buttonName });
}

/**
 * Track video play
 */
export function trackVideoPlay(videoName: string) {
  trackEvent("video_play", { video: videoName });
}

/**
 * Track conversion/lead
 */
export function trackConversion(conversionType: string, value?: number) {
  trackEvent("conversion", {
    type: conversionType,
    ...(value !== undefined && { value }),
  });
}

/**
 * Track page view (usually automatic, but can be used for SPA navigation)
 */
export function trackPageView(path: string) {
  trackEvent("page_view", { path });
}
