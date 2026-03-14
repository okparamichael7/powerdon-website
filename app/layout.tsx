import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import { StructuredDataServer } from "@/components/seo/structured-data-server";
import { getRequestLocale } from "@/lib/i18n/detectLocale";
import { getTranslations } from "@/lib/i18n/getTranslations";
import { getHtmlLang } from "@/lib/i18n/config";
import { I18nProvider } from "@/lib/i18n/provider";
import { generateMetadata as generateSEOMetadata, siteConfig } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const messages = await getTranslations(locale);

  return generateSEOMetadata({
    locale,
    title: siteConfig.name,
    description: messages.seo.pages.home.description,
    keywords: [...messages.seo.site.keywords],
  });
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getRequestLocale();
  const messages = await getTranslations(locale);
  const helveticaFont = "font-helvetica";

  return (
    <html className="text-left" lang={getHtmlLang(locale)}>
      <head>
        <StructuredDataServer
          locale={locale}
          serviceDescription={messages.seo.schema.serviceDescription}
        />
      </head>
      <body className={helveticaFont}>
        <I18nProvider locale={locale} messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </I18nProvider>
        <Toaster />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y85E456VL6"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y85E456VL6');
          `}
        </Script>
        <Analytics />
      </body>
    </html>
  );
}
