"use client";

import { useMemo, useState } from "react";
import {
  CalendarDays,
  Handshake,
  MapPin,
  TrendingUp,
  Zap,
} from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

function statusTone(status: AffiliateEvent["status"]) {
  switch (status) {
    case "active":
      return "bg-emerald-100 text-emerald-900 border-emerald-200";
    case "upcoming":
      return "bg-blue-100 text-blue-900 border-blue-200";
    case "completed":
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <main className="container mx-auto px-6 py-12 pt-32">
        <section className="mb-10">
          <Badge
            variant="outline"
            className="text-[10px] tracking-widest font-semibold text-blue-700 border-blue-200 bg-blue-50"
          >
            {copy.hero.badge}
          </Badge>
          <h1 className="text-3xl lg:text-5xl font-light text-black mt-4">
            {copy.hero.title}
          </h1>
          <p className="text-gray-600 max-w-3xl mt-4 text-base lg:text-lg">
            {copy.hero.description}
          </p>
        </section>

        <Card className="mb-10 border-gray-200 bg-white shadow-sm">
          <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white text-lg font-semibold">
                {affiliate.avatarInitials}
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  {copy.selector.label}
                </p>
                <p className="text-xl font-semibold text-gray-900">
                  {affiliate.name}
                </p>
                <p className="text-sm text-gray-500">{affiliate.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Select
                value={affiliate.id}
                onValueChange={(value) => setAffiliateId(value)}
              >
                <SelectTrigger className="w-full md:w-64">
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
              <div className="flex flex-wrap gap-3 text-xs text-gray-500 md:justify-end">
                <span>
                  {copy.selector.referralCode}:{" "}
                  <span className="font-mono font-semibold text-gray-800">
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
          </CardContent>
        </Card>

        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <StatCard
            icon={<CalendarDays className="h-5 w-5" />}
            label={copy.stats.activeEvents}
            value={String(stats.activeEvents)}
          />
          <StatCard
            icon={<Handshake className="h-5 w-5" />}
            label={copy.stats.brands}
            value={String(stats.brandCount)}
          />
          <StatCard
            icon={<Zap className="h-5 w-5" />}
            label={copy.stats.rentals}
            value={stats.totalRentals.toLocaleString(locale)}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5" />}
            label={copy.stats.earnings}
            value={formatCurrency(stats.totalEarnings, locale)}
          />
        </section>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6 bg-gray-100">
            <TabsTrigger value="overview">{copy.tabs.overview}</TabsTrigger>
            <TabsTrigger value="threads">{copy.tabs.threads}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-10">
            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {copy.events.title}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {copy.events.description}
                </p>
              </CardHeader>
              <CardContent className="p-0 overflow-x-auto">
                {affiliateEvents.length === 0 ? (
                  <p className="p-6 text-center text-gray-500">
                    {copy.events.empty}
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{copy.events.columns.event}</TableHead>
                        <TableHead>{copy.events.columns.date}</TableHead>
                        <TableHead>{copy.events.columns.brand}</TableHead>
                        <TableHead className="text-right">
                          {copy.events.columns.rentals}
                        </TableHead>
                        <TableHead className="text-right">
                          {copy.events.columns.price}
                        </TableHead>
                        <TableHead className="text-right">
                          {copy.events.columns.commission}
                        </TableHead>
                        <TableHead className="text-right">
                          {copy.events.columns.earnings}
                        </TableHead>
                        <TableHead>{copy.events.columns.status}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {affiliateEvents.map((event) => {
                        const brand = getBrandById(event.brandId);
                        const earnings = estimateEventEarnings(event);
                        return (
                          <TableRow key={event.id}>
                            <TableCell>
                              <div className="font-medium text-gray-900">
                                {event.name}
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <MapPin className="h-3 w-3" />
                                {event.location}
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-gray-700">
                              {formatDate(event.date, locale)}
                            </TableCell>
                            <TableCell className="text-sm text-gray-700">
                              {brand?.name ?? "—"}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              {event.rentals.toLocaleString(locale)}
                            </TableCell>
                            <TableCell className="text-right font-mono text-sm">
                              {formatCurrency(event.rentalPrice, locale)}
                            </TableCell>
                            <TableCell className="text-right">
                              <Badge className="bg-blue-600 text-white font-semibold">
                                {event.commissionPercent}%
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right font-mono font-semibold text-gray-900">
                              {formatCurrency(earnings, locale)}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "text-[10px] tracking-wide uppercase font-semibold",
                                  statusTone(event.status),
                                )}
                              >
                                {copy.events.statusLabels[event.status]}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {copy.brands.title}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {copy.brands.description}
                </p>
              </CardHeader>
              <CardContent>
                {affiliateBrands.length === 0 ? (
                  <p className="p-6 text-center text-gray-500">
                    {copy.brands.empty}
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {affiliateBrands.map((brand) => (
                      <div
                        key={brand.id}
                        className="border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {brand.name}
                            </p>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              {brand.industry}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {brand.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="threads">
            <Card className="border-gray-200 bg-white mb-6">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {copy.threads.title}
                </CardTitle>
                <p className="text-sm text-gray-500">
                  {copy.threads.description}
                </p>
              </CardHeader>
            </Card>
            <EmailThreads threads={affiliateThreads} locale={locale} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <Card className="border-gray-200 bg-white">
      <CardContent className="p-5 flex items-start gap-4">
        <div className="rounded-md bg-blue-50 text-blue-700 p-2">{icon}</div>
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {label}
          </p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
