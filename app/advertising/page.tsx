"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Smartphone } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { PageStickyHeader } from "@/components/page-sticky-header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function AdvertisingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            Amplify Your Brand
          </h1>
          <p
            className={`text-gray-600 max-w-3xl mx-auto text-left ml-0 text-lg`}
          >
            Reach your target audience when they need power most. Our charging
            stations provide premium advertising opportunities with guaranteed
            engagement.
          </p>
          <div className="mt-8 text-left">
            <Button
              onClick={() => (window.location.href = "/advertising/quote")}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium"
            >
              Request quote
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
          >
            <source src="/videos/music-festival-ad.mp4" type="video/mp4" />
            {/* Fallback image in case video doesn't load */}
            <img
              src="/images/music-festival-ad.jpeg"
              alt="POWERDON charging station displaying digital advertisement for Music is Universal event"
            />
          </video>
        </div>

        {/* Why Advertise with Powerdon */}
        <div className="space-y-8 mb-32 max-w-2xl mt-36">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <img
                src="/images/checkmark.png"
                alt="Checkmark"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">
                High Visibility
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Your brand gets prime real estate on our charging stations,
                positioned at eye level for maximum impact during the 15-30
                minute charging sessions.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <img
                src="/images/checkmark.png"
                alt="Checkmark"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Targeted Reach
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Reach tech-savvy consumers in high-traffic locations including
                airports, malls, conferences, and events where your ideal
                customers gather.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <img
                src="/images/checkmark.png"
                alt="Checkmark"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Measurable Results
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Get detailed analytics on impressions, engagement time, and user
                demographics to measure your campaign's effectiveness.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 mt-1">
              <img
                src="/images/checkmark.png"
                alt="Checkmark"
                className="w-6 h-6"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-black mb-2">
                Premium Locations
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Strategic placement in high-footfall venues ensures your message
                reaches engaged audiences in premium environments where they
                spend quality time.
              </p>
            </div>
          </div>
        </div>

        {/* Advertising Formats */}
        <div className="mb-32 mt-44">
          <h2 className="font-light text-black mb-12 text-left text-4xl">
            Advertising Formats
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-32 mt-16">
            <Card className={getCardClass()}>
              <CardHeader>
                <Smartphone className={`w-8 h-8 ${getAccentColor()} mb-2`} />
                <CardTitle className="text-black">Digital Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={getTextColor()}>
                  High-resolution digital screens on each charging station
                  displaying your brand content, videos, and interactive
                  advertisements.
                </p>
                <ul className={`${getTextColor()} space-y-2`}>
                  <li>• Full-color HD displays</li>
                  <li>• Video and animation support</li>
                  <li>• Real-time content updates</li>
                  <li>• Interactive touch capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className={getCardClass()}>
              <CardHeader>
                <Users className="w-8 h-8 text-green-400 mb-2" />
                <CardTitle className="text-black">Branded Stations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className={getTextColor()}>
                  Complete station branding with your company colors, logo, and
                  messaging for maximum brand immersion.
                </p>
                <ul className={`${getTextColor()} space-y-2`}>
                  <li>• Custom color schemes</li>
                  <li>• Logo integration</li>
                  <li>• Branded charging cables</li>
                  <li>• Custom welcome messages</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Packages */}
        <div className="mb-32 mt-36">
          <h2 className="font-light text-black mb-12 text-left text-4xl">
            Advertising Packages
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
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
                  Starter
                </CardTitle>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">€2,500</span>
                  <span className="opacity-80 text-base"> / event</span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 py-10 pb-6 pt-[52px]">
                <div className="text-gray-800 space-y-2 mb-7">
                  <p>
                    • Up to 10 station placements across the event grounds
                    locations
                  </p>
                  <p>• Digital display ads during charging sessions</p>
                  <p>• Basic analytics</p>
                  <p>• Estimated 50,000+ impressions per event</p>
                  <p>
                    • Perfect for small to mid-size festivals and brand pilots
                  </p>
                </div>
                <Link href="/advertising/quote">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 mt-20">
                    Get started
                  </Button>
                </Link>
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
                    Professional
                  </CardTitle>
                  <span className="text-white px-3 py-1 rounded-full mt-2 w-fit text-xs font-normal tracking-wider bg-[rgba(255,255,255,0.2)]">
                    PREFERRED
                  </span>
                </div>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">€7,500</span>
                  <span className="opacity-80 text-base"> / event</span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 py-10 pb-6 pt-[52px]">
                <div className="text-gray-800 space-y-2 mb-7">
                  <p>• Up to 25 stations with your digital ads</p>
                  <p>• Option for branded station wraps</p>
                  <p>• Up to 150,000 targeted impressions</p>
                  <p>• Option for A/B testing support for various creatives</p>
                  <p>• Our most popular pick for mid-to-large festivals</p>
                </div>
                <Link href="/advertising/quote">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 mt-6">
                    Get started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Add Footer before closing div */}
      <Footer />
    </div>
  );
}
