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
            Maximize Your Brand Reach
          </h1>
          <p
            className={`text-gray-600 max-w-3xl mx-auto text-left ml-0 text-lg`}
          >
            Whether you’re showcasing a new product, launching a campaign, or promoting brand awareness. Our charging
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
                positioned at eye level for maximum impact during the 45-60
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
                Reach targeted consumers in high-traffic locations including
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
                Flexible Ad Campaign
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Unlike static banners, ads can be swapped or updated instantly during the event. Brands can run time-based messages [e.g., 'see you at our booth at 6pm'].              </p>
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
                  <li>• Logo and QR code integration for campaigns </li>
                  <li>• Unique brand touchpoint in moments of need</li>
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
                  Starter
                </CardTitle>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">€1,000</span>
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
                  <p>• Analytics on impression, engagement time </p>
                  <p>• Estimated 50,000+ impressions per event</p>
                  <p>
                    • Perfect for small to mid-size festivals and brand pilots
                  </p>
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
                    Professional
                  </CardTitle>
                  <span className="text-white px-3 py-1 rounded-full mt-2 w-fit text-xs font-normal tracking-wider bg-[rgba(255,255,255,0.2)]">
                    PREFERRED
                  </span>
                </div>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">€3,500</span>
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
                    Pilot Testing
                  </CardTitle>
                  <span className="text-white px-3 py-1 rounded-full mt-2 w-fit text-xs font-normal tracking-wider bg-[rgba(255,255,255,0.2)]">
                    STARTUP FRIENDLY
                  </span>
                </div>
                <div className="text-white text-right">
                  <span className="text-2xl font-medium">Custom</span>
                  <span className="opacity-80 text-base"> pricing</span>
                </div>
              </div>
              <CardContent className="p-6 space-y-4 py-10 pb-6 pt-[52px]">
                <div className="text-gray-800 space-y-2 mb-7">
                  <p>• 3-5 stations for small events and startups</p>
                  <p>• Flexible pricing based on event size and budget</p>
                  <p>• Basic digital display advertising</p>
                  <p>• Up to 25,000 impressions per event</p>
                  <p>• Perfect for testing our services at startup events</p>
                </div>
                <Button
                  className="w-full bg-black hover:bg-gray-800 text-white py-3 mt-6"
                  onClick={() => (window.location.href = "/advertising/quote")}
                >
                  Collaborate
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Pilot Testing Request Quote Section */}
      <div className="mb-32 mt-16">
        <div className="bg-gray-50 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-light text-black mb-4">
              Interested in Pilot Testing?
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Perfect for startups and small events looking to test our
              advertising solutions. Get custom pricing tailored to your budget
              and event size.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <img
                    src="/images/checkmark.png"
                    alt="Checkmark"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-gray-700">
                  No long-term commitments required
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <img
                    src="/images/checkmark.png"
                    alt="Checkmark"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-gray-700">
                  Free consultation and setup guidance
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <img
                    src="/images/checkmark.png"
                    alt="Checkmark"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-gray-700">
                  Detailed performance analytics included
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <Button
                onClick={() => (window.location.href = "/advertising/quote")}
                className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium text-lg mb-4"
              >
                Start Your Campaign Now
              </Button>
              <p className="text-sm text-gray-500">
                Get a custom proposal within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Footer before closing div */}
      <Footer />
    </div>
  );
}
