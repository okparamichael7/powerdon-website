"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { StickyHeader } from "@/components/sticky-header";
import { StickySublines } from "@/components/sticky-sublines";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick, trackVideoPlay } from "@/lib/analytics";

export default function PowerdonLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("home");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoLoaded(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Instant navigation handlers
  const handleAdvertisingClick = () => {
    trackButtonClick("home_advertising_cta");
    window.location.href = href("/advertising");
  };

  const handleReserveClick = () => {
    trackButtonClick("home_reserve_cta");
    window.location.href = href("/reserve");
  };

  return (
    <div className="p-4 py-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 relative overflow-hidden">
      <StickySublines />
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 900" fill="none">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <path
            d="M0 0 L1440 900"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.3"
          />
          <path
            d="M0 300 L1440 600"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <path
            d="M0 600 L1440 300"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.2"
          />
        </svg>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pl-0 pr-2 pt-[120px]">
        {/* Hero Text */}
        <div className="max-w-4xl mx-auto ml-2 mb-4">
          <h1
            className={`text-4xl lg:text-6xl text-gray-900 leading-tight transition-all duration-1000 ease-out delay-1000 text-left tracking-[-0.005em] mb-0 font-light ${
              logoLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {copy.hero.title}
          </h1>
          <h2
            className={`text-4xl lg:text-6xl font-light text-gray-900 mb-6 leading-tight transition-all duration-1000 ease-out delay-1200 text-left tracking-[-0.005em] ${
              logoLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {copy.hero.subtitle}
          </h2>
        </div>

        {/* CTA Buttons with Instant Navigation */}
        <div
          className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ease-out delay-1600 text-left mr-auto ml-2 mb-[34px] ${
            logoLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Button
            onClick={handleAdvertisingClick}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 transform hover:scale-105 transition-all duration-200 font-normal"
            style={{ animationDuration: "0ms" }}
          >
            {copy.hero.advertisingCta}
          </Button>
          <Button
            onClick={handleReserveClick}
            className="bg-black text-white hover:bg-gray-800 px-8 py-3 transform hover:scale-105 transition-all duration-200 font-normal"
            style={{ animationDuration: "0ms" }}
          >
            {copy.hero.reserveCta}
          </Button>
        </div>

        {/* Logo Hero */}
        <div className="mb-8 relative">
          {/* Dynamic glow effect */}
          <div
            className={`absolute inset-x-0 left-0 right-0 w-screen transition-all duration-2000 ease-out delay-700 ${
              logoLoaded ? "opacity-20" : "opacity-0"
            }`}
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-40 lg:h-40 bg-blue-400 rounded-full blur-3xl mx-auto -mt-16 sm:-mt-20 md:-mt-24 lg:-mt-20"></div>
          </div>

          {/* Add responsive video underneath the glow effect */}
          <div className="relative z-10 mt-4 mr-2">
            {/* Desktop/Tablet Video - Hidden on mobile < 450px */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-lg shadow-2xl hidden min-[450px]:block"
              style={{ marginLeft: "8px", marginRight: "8px" }}
              width={1200}
              height={600}
              onPlay={() => trackVideoPlay("home_product_trailer_desktop")}
            >
              <source
                src="/videos/trailer-full-res-landscape.mp4"
                type="video/mp4"
              />
              {copy.hero.desktopVideoFallback}
            </video>

            {/* Mobile Video - Shown only on mobile < 450px */}
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto rounded-lg shadow-2xl block min-[450px]:hidden"
              style={{ marginLeft: "8px", marginRight: "8px" }}
              width={600}
              height={1200}
              onPlay={() => trackVideoPlay("home_product_trailer_mobile")}
            >
              <source
                src="/videos/trailer-full-res-landscape.mp4"
                type="video/mp4"
              />
              {copy.hero.mobileVideoFallback}
            </video>
          </div>
        </div>

        <div className="mb-12 relative"></div>

        <h2 className="font-light mr-0 text-4xl pr-6 tracking-[-0.005em] text-gray-900 mt-[120px] text-left w-full px-6 mb-14">
          {copy.introTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 w-full px-6">
          {copy.featureCards.map((feature, index) => (
            <Card
              key={feature.title}
              className="bg-white border border-gray-200 overflow-hidden shadow-lg"
            >
              <CardContent className="p-0">
                <div className="w-full h-48 mb-7">
                  <img
                    src={
                      [
                        "/images/happy-attendees.png",
                        "/images/free-digital-signage.png",
                        "/images/revenue-share.png",
                      ][index]
                    }
                    alt={feature.imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold text-black text-left mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm text-left">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full px-2 mt-[125px] mb-0">
          <div className="grid grid-cols-1 max-[450px]:grid-cols-1 min-[450px]:grid-cols-2 gap-8 w-full my-16">
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

        <div className="mt-32 w-full px-6 mb-[164px]">
          <h2 className="font-light text-left text-black text-4xl mb-14">
            {copy.whyChoose.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-80 border-gray-200 p-8 rounded-lg backdrop-blur-sm shadow-lg shadow-blue-100/50 py-8 px-8">
              <div className="w-full h-32 flex items-center justify-center mb-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Reliable%20network-qSD7tF4J8AWBKU3vWpnmde4hwJckJl.png"
                  alt={copy.whyChoose.items[0].imageAlt}
                  className="object-contain w-24 h-24"
                />
              </div>
              <h3 className="text-xl font-semibold text-black text-left mb-2">
                {copy.whyChoose.items[0].title}
              </h3>
              <p className="text-gray-600 text-left pr-14">
                {copy.whyChoose.items[0].description}
              </p>
            </div>
            <div className="bg-white bg-opacity-80 border-gray-200 p-8 rounded-lg backdrop-blur-sm shadow-lg shadow-blue-100/50 px-8 py-[24pxpx]">
              <div className="w-full h-32 flex items-center justify-center mb-6">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Fast%20charging-VnDLRKFqJDjVinSCIlJvpSrrGOnjsy.png"
                  alt={copy.whyChoose.items[1].imageAlt}
                  className="object-contain w-[90px] h-[90px]"
                />
              </div>
              <h3 className="text-xl font-semibold text-black text-left mb-2">
                {copy.whyChoose.items[1].title}
              </h3>
              <p className="text-gray-600 text-left pr-14">
                {copy.whyChoose.items[1].description}
              </p>
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </div>
  );
}
