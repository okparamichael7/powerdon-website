"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StickyHeader } from "@/components/sticky-header";
import { PageStickyHeader } from "@/components/page-sticky-header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick } from "@/lib/analytics";

export default function ReserveStation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("reserve");

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <PageStickyHeader currentPage="reserve" />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-left mb-4">
          <h1 className="text-4xl lg:text-6xl font-light text-black mb-6">
            {copy.hero.title}
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg mx-0">
            {copy.hero.description}
          </p>
          <div className="mt-8">
            <Button
              onClick={() => {
                trackButtonClick("reserve_hero_cta");
                window.location.href = href("/reserve/form");
              }}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium"
            >
              {copy.hero.cta}
            </Button>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="w-full mb-32 mt-[89px] px-0">
          <div className="grid grid-cols-1 max-[450px]:grid-cols-1 min-[450px]:grid-cols-2 gap-8 w-full my-16 mb-0">
            <div className="w-full">
              <img
                src="/images/powerbanks.png"
                alt={copy.gallery.firstAlt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="w-full">
              <img
                src="/images/charger-on-event.png"
                alt={copy.gallery.secondAlt}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Key Benefits for Festival Organizers */}
        <div className="grid md:grid-cols-3 gap-8 mt-36 mb-36">
          {copy.benefits.map((benefit, index) => (
            <Card
              key={benefit.title}
              className="bg-white border border-gray-200 overflow-hidden shadow-lg"
            >
              <CardContent className="p-0">
                <div className="w-full h-48 mb-6">
                  <img
                    src={
                      [
                        "/images/happy-attendees.png",
                        "/images/free-digital-signage.png",
                        "/images/revenue-share.png",
                      ][index]
                    }
                    alt={benefit.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-[1.20rem]">
                    {benefit.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional USPs */}
        <div className="space-y-8 max-w-2xl mb-32">
          {copy.usps.map((usp) => (
            <div key={usp.title} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <img
                  src="/images/checkmark.png"
                  alt="Checkmark"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {usp.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {usp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pilot Testing Request Quote Section */}
        <div className="mb-32 mt-16">
          <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-light text-black mb-4">
                {copy.pilot.title}
              </h3>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {copy.pilot.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                {copy.pilot.bullets.map((bullet) => (
                  <div key={bullet} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      <img
                        src="/images/checkmark.png"
                        alt="Checkmark"
                        className="w-5 h-5"
                      />
                    </div>
                    <p className="text-gray-700">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="text-center md:text-left">
                <Button
                  onClick={() => {
                    trackButtonClick("reserve_pilot_section_cta");
                    window.location.href = href("/reserve/form");
                  }}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium text-lg mb-4"
                >
                  {copy.pilot.cta}
                </Button>
                <p className="text-sm text-gray-500">{copy.pilot.response}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
