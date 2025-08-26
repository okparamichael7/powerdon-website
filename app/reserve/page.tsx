"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StickyHeader } from "@/components/sticky-header";
import { PageStickyHeader } from "@/components/page-sticky-header";
import { Footer } from "@/components/footer";

export default function ReserveStation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <PageStickyHeader currentPage="reserve" />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-left mb-4">
          <h1 className="text-4xl lg:text-6xl font-light text-black mb-6">
            Partner With Powerdon
          </h1>
          <p className="text-gray-600 max-w-3xl text-lg mx-0">
            Let us place our premium charging stations at your festival or
            event. Enhance attendee experience while generating additional
            revenue - at no cost to you.
          </p>
          <div className="mt-8">
            <Button
              onClick={() => (window.location.href = "/reserve/form")}
              className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium"
            >
              Reserve Station
            </Button>
          </div>
        </div>

        {/* Product Images Section */}
        <div className="w-full mb-32 mt-[89px] px-0">
          <div className="grid grid-cols-1 max-[450px]:grid-cols-1 min-[450px]:grid-cols-2 gap-8 w-full my-16 mb-0">
            <div className="w-full">
              <img
                src="/images/powerbanks.png"
                alt="POWERDON portable power banks and charging accessories"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
            <div className="w-full">
              <img
                src="/images/charger-on-event.png"
                alt="POWERDON charging station at event showing schedule display"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>

        {/* Key Benefits for Festival Organizers */}
        <div className="grid md:grid-cols-3 gap-8 mt-36 mb-36">
          <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-48 mb-6">
                <img
                  src="/images/happy-attendees.png"
                  alt="Happy Attendees"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-black">
                  Happy Attendees
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                  Keep your festival-goers connected and engaged. No more dead
                  phones means better social media coverage and happier
                  attendees who stay longer.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-48 mb-6">
                <img
                  src="/images/free-digital-signage.png"
                  alt="Free Digital Signage"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-black">
                  Free Digital Signage
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                  Promote your event schedule, sponsors, and announcements on
                  our high-visibility digital displays - completely free as part
                  of our partnership.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
            <CardContent className="p-0">
              <div className="w-full h-48 mb-6">
                <img
                  src="/images/revenue-share.png"
                  alt="Revenue Share"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold mb-3 text-black">
                  Revenue Share
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                  Earn from every rented power bank. Turn charging into a profit
                  centre for your festival.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional USPs */}
        <div className="space-y-8 max-w-2xl mb-32">
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
                Zero Investment
              </h3>
              <p className="text-gray-500 leading-relaxed">
                No upfront costs, setup fees, or equipment rental. We handle
                everything from installation to maintenance.
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
                Always On
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Round-the-clock monitoring and support ensures your attendees
                never face charging issues.
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
                Data Insights
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Get valuable attendee behavior analytics and foot traffic
                patterns to improve future events.
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
                Attendees freedom to move around
              </h3>
              <p className="text-gray-500 leading-relaxed">
                Attendees can charge on the go and keep exploring the event without interruptions.
              </p>
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
                advertising solutions. Get custom pricing tailored to your
                budget and event size.
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
                    Happy Attendees, Higher ratings
                  </p>
                </div>
              </div>

              <div className="text-center md:text-left">
                <Button
                  onClick={() => (window.location.href = "/reserve/form")}
                  className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium text-lg mb-4"
                >
                  Power Up Your Event Today
                </Button>
                <p className="text-sm text-gray-500">
                  Get a custom proposal within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Footer before closing div */}
      <Footer />
    </div>
  );
}
