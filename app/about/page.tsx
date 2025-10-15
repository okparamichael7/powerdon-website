"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Hero Section with Diagonal Split */}

      {/* Hero Image Section */}
      <section className="py-0 bg-white relative">
        <div className="w-full h-[60vh] relative flex items-center justify-center">
          <h1 className="text-4xl font-light text-white leading-tight absolute z-10 text-left left-6 top-1/2 transform -translate-y-1/2 lg:text-6xl mb-20 pb-24">
            Our mission
            <br />
            <span className="text-gray-400">at PowerDon</span>
          </h1>
          <img
            src="/images/hero-new.png"
            alt="POWERDON logo embossed on surface"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 mt-20">
          <div className="max-w-4xl">
            <p className="text-2xl text-black leading-relaxed lg:text-4xl tracking-[-0.015em] font-light">
              We eliminate the anxiety of dead batteries by providing reliable,
              accessible, and fast charging solutions in the places where people
              gather, work, and play. We believe staying connected should not be
              a luxury. It should be effortless and available at any point.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl">
            <div className="text-left">
              <div className="text-6xl font-bold text-black mb-2 lg:text-8xl">
                90<span className="text-4xl px-2">+</span>
              </div>
              <p className="text-lg text-gray-600">charging stations</p>
            </div>
            <div className="text-left">
              <div className="text-6xl font-bold text-black mb-2 lg:text-8xl">
                20<span className="text-4xl px-2">+</span>
              </div>
              <p className="text-lg text-gray-600">campaigns completed</p>
            </div>
            <div className="text-left">
              <div className="text-6xl font-bold text-black mb-2 lg:text-8xl">
                90<span className="text-4xl px-[0px4]">%</span>
              </div>
              <p className="text-lg text-gray-600">uptime improvement</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-light text-black mb-10">Our values</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Innovation */}
            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-48 mb-6">
                  <img
                    src="/images/innovation-icon.png"
                    alt="Innovation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    Innovation
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                    We continuously push the boundaries of charging technology
                    to deliver faster, more efficient power solution - and applying the same spirit to reinvent advertising that reaches attendees when they are relaxed and receptive.  
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Sustainability */}
            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-48 mb-6">
                  <img
                    src="/images/sustainability-icon.png"
                    alt="Sustainability"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    Sustainability
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                    Our stations use renewable energy sources and promote device
                    longevity through proper charging practices. Paired with targeted, low-power displays, they outperform static banners — reducing material waste and measuring ads per impression.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-48 mb-6">
                  <img
                    src="/images/community-icon.png"
                    alt="Community"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    Community
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                    We build connections between people, brands, and communities
                    through our shared charging network - and we make advertising a force for the community, not clutter. Our targeted, context-aware placements help local businesses through reach nearby customers, deliver useful, and timely offers while people charge.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Excellence */}
            <Card className="bg-white border border-gray-200 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="w-full h-48 mb-6">
                  <img
                    src="/images/excellence-icon.png"
                    alt="Excellence"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-6 pb-6">
                  <h3 className="text-xl font-semibold mb-3 text-black">
                    Excellence
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed leading-[1.20rem]">
                    We maintain the highest standards in product quality,
                    customer service, and user experience. Our advertising follows suit — curated creative, strict brand-safety controls, and measurable outcomes that deliver reliable, responsible results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-light text-black mb-6">
              Ready to power your next event?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Join thousands of event organizers and brands who trust PowerDon
              to keep their audiences connected and engaged.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/reserve">
                <Button className="bg-black text-white hover:bg-gray-800 px-8 py-3 font-medium">
                  Reserve a station
                </Button>
              </Link>
              <Link href="/advertising">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white px-8 py-3 font-medium bg-transparent"
                >
                  Advertise with us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Add Footer before closing div */}
      <Footer />
    </div>
  );
}
