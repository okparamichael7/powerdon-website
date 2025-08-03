"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function ReserveFormPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/reserve"
            className="inline-flex items-center hover:text-black transition-colors text-slate-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reserve Station
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-light text-black lg:text-6xl mb-6 mt-24 text-left">
            Apply for Partnership
          </h1>
          <p className="max-w-2xl font-normal text-lg leading-6 text-gray-500 px-[0] mx-0 text-left pr-10">
            Tell us about your event and we'll create a custom partnership
            proposal tailored to your needs.
          </p>
        </div>

        {/* Partnership Application Form */}
        <Card className="max-w-2xl mx-auto bg-white mb-24 shadow-lg shadow-blue-100/50 border-slate-50 mt-28">
          <CardContent className="space-y-6 pt-8 bg-transparent border-transparent">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="organizer" className="text-black">
                  Event organizer/company *
                </Label>
                <Input
                  id="organizer"
                  className="bg-white border-gray-300 text-black mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contact" className="text-black">
                  Contact person *
                </Label>
                <Input
                  id="contact"
                  className="bg-white border-gray-300 text-black mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-black">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  className="bg-white border-gray-300 text-black mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-black">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  className="bg-white border-gray-300 text-black mt-1"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="event-name" className="text-black">
                  Event name *
                </Label>
                <Input
                  id="event-name"
                  className="bg-white border-gray-300 text-black mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="event-date" className="text-black">
                  Event date
                </Label>
                <Input
                  id="event-date"
                  type="date"
                  className="bg-white border-gray-300 text-black mt-1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-black">
                  Event location
                </Label>
                <Input
                  id="location"
                  className="bg-white border-gray-300 text-black mt-1"
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="attendees" className="text-black">
                  Expected attendees
                </Label>
                <Input
                  id="attendees"
                  type="number"
                  className="bg-white border-gray-300 text-black mt-1"
                  placeholder="e.g. 5000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="event-type" className="text-black">
                Event type
              </Label>
              <Input
                id="event-type"
                className="bg-white border-gray-300 text-black mt-1"
                placeholder="e.g. Music Festival, Conference, Trade Show"
              />
            </div>

            <div>
              <Label
                htmlFor="additional-info"
                className="text-black mb-1.5 text-sm"
              >
                Additional information
              </Label>
              <Textarea
                id="additional-info"
                className="bg-white border-gray-300 min-h-[120px] mb-10 ml-0 mt-1 text-slate-400"
                placeholder="Tell us about your event, target audience, current sponsors, and any specific requirements for charging stations..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-10 pb-[18px]">
              <h4 className="text-black font-semibold mb-2">
                What happens next?
              </h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• We'll review your application within 48 hours</li>
                <li>• Our team will create a custom partnership proposal</li>
                <li>• We'll schedule a call to discuss the details</li>
                <li>• Upon agreement, we'll handle all setup and logistics</li>
              </ul>
            </div>

            <Button className="w-full bg-black hover:bg-gray-800 py-3 text-sm my-5">
              Submit application
            </Button>

            <p className="text-center text-slate-400 my-[0] text-xs">
              By submitting this form, you agree to our terms of service and
              privacy policy.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
