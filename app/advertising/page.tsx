"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Smartphone } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { PageStickyHeader } from "@/components/page-sticky-header";
import { Footer } from "@/components/footer";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick, trackVideoPlay } from "@/lib/analytics";

export default function AdvertisingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("advertising");

  const getBackgroundClass = () => {
    return "bg-white";
  };

  const getCardClass = () => {
    return "bg-gray-100 border-gray-200";
  };

  const getInputClass = () => {
    return "bg-white border-gray-300";
  };

  const getButtonClass = () => {
    return "bg-black hover:bg-gray-800";
  };

  const getTextColor = () => {
    return "text-gray-600";
  };

  const getAccentColor = () => {
    return "text-blue-600";
  };

  return (
    <div className={`min-h-screen ${getBackgroundClass()}`}>
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <PageStickyHeader currentPage="advertising" />

      <div className="container mx-auto px-6 py-12 pt-32 mb-1.5">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-light text-black mb-6 text-left">
            {copy.hero.title}
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-left ml-0 text-lg">
            {copy.hero.description}
          </p>
          <div className="mt-8 text-left">
            <Button
              onClick={() => {
                trackButtonClick("advertising_quote_cta");
                window.location.href = href("/advertising/quote");
              }}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium"
            >
              {copy.hero.cta}
            </Button>
          </div>
        </div>

        {/* Hero Image Section */}
        <div className="w-full mb-16 mt-[90px]">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[60vh] rounded-lg shadow-lg object-cover"
            onPlay={() => trackVideoPlay("advertising_hero_video")}
          >
            <source src="/videos/music-festival-ad.mp4" type="video/mp4" />
            {/* Fallback image in case video doesn't load */}
            <img
              src="/images/music-festival-ad.jpeg"
              alt={copy.hero.fallbackAlt}
            />
          </video>
        </div>

        <div className="space-y-8 mb-32 max-w-2xl mt-36">
          {copy.reasons.map((reason) => (
            <div key={reason.title} className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <img
                  src="/images/checkmark.png"
                  alt="Checkmark"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-black mb-2">
                  {reason.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-32 mt-44">
          <h2 className="font-light text-black mb-12 text-left text-4xl">
            {copy.formatsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-32 mt-16">
            <Card className={getCardClass()}>
              <CardHeader>
                <Smartphone className={`w-8 h-8 ${getAccentColor()} mb-2`} />
                <CardTitle className="text-black">
                  {copy.formats[0].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={getTextColor()}>{copy.formats[0].description}</p>
                <ul className={`${getTextColor()} space-y-2`}>
                  {copy.formats[0].bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className={getCardClass()}>
              <CardHeader>
                <Users className="w-8 h-8 text-green-400 mb-2" />
                <CardTitle className="text-black">
                  {copy.formats[1].title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={getTextColor()}>{copy.formats[1].description}</p>
                <ul className={`${getTextColor()} space-y-2`}>
                  {copy.formats[1].bullets.map((bullet) => (
                    <li key={bullet}>• {bullet}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-32 mt-36">
          <h2 className="font-light text-black mb-12 text-left text-4xl">
            {copy.packagesTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <div
                className="w-full relative flex items-center justify-between px-6 py-4 h-60"
                style={{
                  backgroundImage: "url(/images/gradient-1.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <CardTitle className="text-white text-2xl font-medium tracking-[0.005em]">
                  {copy.packages[0].name}
                </CardTitle>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">
                    {copy.packages[0].price}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 py-10 pb-6 pt-[52px]">
                <div className="text-gray-800 space-y-2 mb-7">
                  {copy.packages[0].bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <div
                className="w-full relative flex items-center justify-between px-6 py-4 h-60"
                style={{
                  backgroundImage: "url(/images/gradient-2.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex flex-col pt-[30px]">
                  <CardTitle className="text-white text-2xl font-medium tracking-[0.005em]">
                    {copy.packages[1].name}
                  </CardTitle>
                  <span className="text-white px-3 py-1 rounded-full mt-2 w-fit text-xs font-normal tracking-wider bg-[rgba(255,255,255,0.2)]">
                    {copy.packages[1].badge}
                  </span>
                </div>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">
                    {copy.packages[1].price}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 py-10 pb-6 pt-[52px]">
                <div className="text-gray-800 space-y-2 mb-7">
                  {copy.packages[1].bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <div
                className="w-full relative flex items-center justify-between px-6 py-4 h-60"
                style={{
                  backgroundImage: "url(/images/gradient-1.png)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex flex-col pt-[30px]">
                  <CardTitle className="text-white text-2xl font-medium tracking-[0.005em]">
                    {copy.packages[2].name}
                  </CardTitle>
                  <span className="text-white px-3 py-1 rounded-full mt-2 w-fit text-xs font-normal tracking-wider bg-[rgba(255,255,255,0.2)]">
                    {copy.packages[2].badge}
                  </span>
                </div>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">
                    {copy.packages[2].price}
                  </span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 py-10 pb-6 pt-[52px]">
                <div className="text-gray-800 space-y-2 mb-7">
                  {copy.packages[2].bullets.map((bullet) => (
                    <p key={bullet}>• {bullet}</p>
                  ))}
                </div>
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 mt-6"
                  onClick={() => {
                    trackButtonClick("advertising_pilot_card_cta");
                    window.location.href = href("/advertising/quote");
                  }}
                >
                  {copy.packages[2].cta}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
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
                  trackButtonClick("advertising_pilot_section_cta");
                  window.location.href = href("/advertising/quote");
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

      {/* Add Footer before closing div */}
      <Footer />
    </div>
  );
}
