"use client";

import { useMemo, useState } from "react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailThreads } from "@/components/affiliate/email-threads";
import { useTranslation } from "@/lib/i18n/useTranslation";
import {
  affiliates,
  estimateEventEarnings,
  getAffiliateBrands,
  getAffiliateEvents,
  getAffiliateThreads,
  getBrandById,
  type AffiliateEvent,
} from "@/lib/affiliate-data";
import { cn } from "@/lib/utils";

function formatCurrency(value: number, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(iso),
  );
}

function formatDateISO(iso: string) {
  return iso.slice(0, 10);
}

function statusColor(status: AffiliateEvent["status"]) {
  switch (status) {
    case "active":
      return "text-gray-900";
    case "upcoming":
      return "text-gray-500";
    case "completed":
    default:
      return "text-gray-400";
  }
}

export default function AffiliateDashboardPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [affiliateId, setAffiliateId] = useState(affiliates[0].id);
  const { namespace, locale } = useTranslation();
  const copy = namespace("affiliate");

  const affiliate = useMemo(
    () => affiliates.find((item) => item.id === affiliateId) ?? affiliates[0],
    [affiliateId],
  );

  const affiliateEvents = useMemo(
    () => getAffiliateEvents(affiliate.id),
    [affiliate.id],
  );
  const affiliateBrands = useMemo(
    () => getAffiliateBrands(affiliate.id),
    [affiliate.id],
  );
  const affiliateThreads = useMemo(
    () => getAffiliateThreads(affiliate.id),
    [affiliate.id],
  );

  const stats = useMemo(() => {
    const totalRentals = affiliateEvents.reduce(
      (sum, event) => sum + event.rentals,
      0,
    );
    const totalEarnings = affiliateEvents.reduce(
      (sum, event) => sum + estimateEventEarnings(event),
      0,
    );
    const activeEvents = affiliateEvents.filter(
      (event) => event.status !== "completed",
    ).length;

    return {
      totalRentals,
      totalEarnings,
      activeEvents,
      brandCount: affiliateBrands.length,
    };
  }, [affiliateEvents, affiliateBrands]);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="mx-auto max-w-6xl px-6 pt-32 pb-24">
        <section className="mb-24">
          <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
            {copy.hero.badge}
          </p>
          <h1 className="mt-6 text-4xl md:text-5xl font-light tracking-tight text-gray-900">
            {copy.hero.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-gray-500 leading-relaxed">
            {copy.hero.description}
          </p>
        </section>

        <section className="mb-20 flex flex-col gap-6 border-t border-gray-100 pt-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400">
              {copy.selector.label}
            </p>
            <p className="mt-2 text-2xl font-medium text-gray-900">
              {affiliate.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">{affiliate.email}</p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-400">
              <span>
                {copy.selector.referralCode}{" "}
                <span className="font-mono text-gray-700">
                  {affiliate.referralCode}
                </span>
              </span>
              <span>
                {copy.selector.joined.replace(
                  "{date}",
                  formatDate(affiliate.joinedAt, locale),
                )}
              </span>
            </div>
          </div>
          <Select
            value={affiliate.id}
            onValueChange={(value) => setAffiliateId(value)}
          >
            <SelectTrigger
              aria-label={copy.selector.label}
              className="w-full border-0 border-b border-gray-200 rounded-none px-0 shadow-none focus:ring-0 focus:ring-offset-0 md:w-64"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {affiliates.map((item) => (
                <SelectItem key={item.id} value={item.id}>
                  {item.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section
          aria-label="Summary"
          className="mb-24 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-gray-100 pt-10 md:grid-cols-4"
        >
          <Stat
            label={copy.stats.activeEvents}
            value={String(stats.activeEvents)}
          />
          <Stat
            label={copy.stats.brands}
            value={String(stats.brandCount)}
          />
          <Stat
            label={copy.stats.rentals}
            value={stats.totalRentals.toLocaleString(locale)}
          />
          <Stat
            label={copy.stats.earnings}
            value={formatCurrency(stats.totalEarnings, locale)}
          />
        </section>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-16 h-auto justify-start gap-8 border-b border-gray-100 bg-transparent p-0 rounded-none w-full">
            <TabsTrigger
              value="overview"
              className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-0 text-sm font-medium text-gray-400 shadow-none transition-colors data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              {copy.tabs.overview}
            </TabsTrigger>
            <TabsTrigger
              value="threads"
              className="rounded-none border-b-2 border-transparent bg-transparent px-0 pb-3 pt-0 text-sm font-medium text-gray-400 shadow-none transition-colors data-[state=active]:border-gray-900 data-[state=active]:bg-transparent data-[state=active]:text-gray-900 data-[state=active]:shadow-none"
            >
              {copy.tabs.threads}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-24 mt-0">
            <section>
              <header className="mb-10">
                <h2 className="text-2xl font-light tracking-tight text-gray-900">
                  {copy.events.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-gray-500">
                  {copy.events.description}
                </p>
              </header>

              {affiliateEvents.length === 0 ? (
                <p className="text-sm text-gray-400">{copy.events.empty}</p>
              ) : (
                <div className="-mx-2 overflow-x-auto">
                  <table className="w-full min-w-[760px] border-collapse text-sm">
                    <thead>
                      <tr className="text-left text-[11px] uppercase tracking-[0.16em] text-gray-400">
                        <th className="px-2 pb-4 font-medium">
                          {copy.events.columns.event}
                        </th>
                        <th className="px-2 pb-4 font-medium">
                          {copy.events.columns.date}
                        </th>
                        <th className="px-2 pb-4 font-medium">
                          {copy.events.columns.brand}
                        </th>
                        <th className="px-2 pb-4 text-right font-medium">
                          {copy.events.columns.rentals}
                        </th>
                        <th className="px-2 pb-4 text-right font-medium">
                          {copy.events.columns.price}
                        </th>
                        <th className="px-2 pb-4 text-right font-medium">
                          {copy.events.columns.commission}
                        </th>
                        <th className="px-2 pb-4 text-right font-medium">
                          {copy.events.columns.earnings}
                        </th>
                        <th className="px-2 pb-4 text-right font-medium">
                          {copy.events.columns.status}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {affiliateEvents.map((event) => {
                        const brand = getBrandById(event.brandId);
                        const earnings = estimateEventEarnings(event);
                        return (
                          <tr
                            key={event.id}
                            className="border-t border-gray-100"
                          >
                            <td className="px-2 py-5">
                              <div className="font-medium text-gray-900">
                                {event.name}
                              </div>
                              <div className="mt-0.5 text-xs text-gray-400">
                                {event.location}
                              </div>
                            </td>
                            <td className="px-2 py-5 text-gray-500">
                              <time dateTime={formatDateISO(event.date)}>
                                {formatDate(event.date, locale)}
                              </time>
                            </td>
                            <td className="px-2 py-5 text-gray-500">
                              {brand?.name ?? "—"}
                            </td>
                            <td className="px-2 py-5 text-right tabular-nums text-gray-700">
                              {event.rentals.toLocaleString(locale)}
                            </td>
                            <td className="px-2 py-5 text-right tabular-nums text-gray-500">
                              {formatCurrency(event.rentalPrice, locale)}
                            </td>
                            <td className="px-2 py-5 text-right tabular-nums font-medium text-gray-900">
                              {event.commissionPercent}%
                            </td>
                            <td className="px-2 py-5 text-right tabular-nums font-medium text-gray-900">
                              {formatCurrency(earnings, locale)}
                            </td>
                            <td
                              className={cn(
                                "px-2 py-5 text-right text-[11px] uppercase tracking-[0.14em]",
                                statusColor(event.status),
                              )}
                            >
                              {copy.events.statusLabels[event.status]}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            <section>
              <header className="mb-10">
                <h2 className="text-2xl font-light tracking-tight text-gray-900">
                  {copy.brands.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-gray-500">
                  {copy.brands.description}
                </p>
              </header>

              {affiliateBrands.length === 0 ? (
                <p className="text-sm text-gray-400">{copy.brands.empty}</p>
              ) : (
                <ul className="divide-y divide-gray-100 border-t border-gray-100">
                  {affiliateBrands.map((brand) => (
                    <li
                      key={brand.id}
                      className="flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:justify-between md:gap-12"
                    >
                      <div className="md:w-1/3">
                        <p className="text-base font-medium text-gray-900">
                          {brand.name}
                        </p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-gray-400">
                          {brand.industry}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 md:flex-1">
                        {brand.description}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </TabsContent>

          <TabsContent value="threads" className="mt-0">
            <header className="mb-12">
              <h2 className="text-2xl font-light tracking-tight text-gray-900">
                {copy.threads.title}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-gray-500">
                {copy.threads.description}
              </p>
            </header>
            <EmailThreads threads={affiliateThreads} locale={locale} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.16em] text-gray-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-light tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  );
}
