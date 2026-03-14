"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick } from "@/lib/analytics";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("about");

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <section className="py-0 bg-white relative">
        <div className="w-full h-[60vh] relative flex items-center justify-center">
          <h1 className="text-4xl font-light text-white leading-tight absolute z-10 text-left left-6 top-1/2 transform -translate-y-1/2 lg:text-6xl mb-20 pb-24">
            {copy.hero.title}
            <br />
            <span className="text-gray-400">{copy.hero.subtitle}</span>
          </h1>
          <img
            src="/images/hero-new.png"
            alt={copy.hero.imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 mt-20">
          <div className="max-w-4xl">
            <p className="text-2xl text-black leading-relaxed lg:text-4xl tracking-[-0.015em] font-light">
              {copy.mission}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="text-left">
                <div className="text-6xl font-bold text-black mb-2 lg:text-8xl">
                  {stat.value}
                </div>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-black mb-10">
            {copy.valuesTitle}
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {copy.values.map((value, index) => (
              <Card
                key={value.title}
                className="bg-white border border-gray-200 overflow-hidden shadow-lg"
              >
                <CardContent className="p-0">
                  <div className="w-full h-48 mb-6">
                    <img
                      src={
                        [
                          "/images/innovation-icon.png",
                          "/images/sustainability-icon.png",
                          "/images/community-icon.png",
                          "/images/excellence-icon.png",
                        ][index]
                      }
                      alt={value.imageAlt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="px-6 pb-6">
                    <h3 className="text-xl font-semibold mb-3 text-black">
                      {value.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-light text-black mb-6">
              {copy.cta.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              {copy.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={href("/reserve")}>
                <Button
                  onClick={() => trackButtonClick("about_reserve_cta")}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium"
                >
                  {copy.cta.reserve}
                </Button>
              </Link>
              <Link href={href("/advertising")}>
                <Button
                  onClick={() => trackButtonClick("about_advertising_cta")}
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-3 font-medium bg-transparent"
                >
                  {copy.cta.advertise}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
