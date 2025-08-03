"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import Link from "next/link";

export default function AdvertisingQuotePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/advertising"
            className="inline-flex items-center hover:text-black transition-colors text-slate-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Advertising
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-light text-black lg:text-6xl mb-6 mt-24 text-left">
            Request campaign quote
          </h1>
          <p className="max-w-2xl font-normal text-lg leading-6 text-gray-500 px-[0] mx-0 text-left pr-10">
            Tell us about your advertising goals and we'll create a custom
            campaign proposal tailored to your brand's needs.
          </p>
        </div>

        {/* Hero Image Section */}

        {/* Campaign Quote Form */}
        <Card className="max-w-2xl mx-auto bg-white mb-24 shadow-lg shadow-blue-100/50 border-slate-50 mt-28">
          <CardContent className="space-y-6 pt-8 bg-transparent border-transparent">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company" className="text-black">
                  Company name *
                </Label>
                <Input
                  id="company"
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

            <div>
              <Label htmlFor="industry" className="text-black">
                Industry
              </Label>
              <Select>
                <SelectTrigger className="bg-white border-gray-300 text-black mt-1">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="automotive">Automotive</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budget" className="text-black">
                  Event budget range
                </Label>
                <Select>
                  <SelectTrigger className="bg-white border-gray-300 text-black mt-1">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-2500">Under €2,500</SelectItem>
                    <SelectItem value="2500-7500">€2,500 - €7,500</SelectItem>
                    <SelectItem value="7500-15000">€7,500 - €15,000</SelectItem>
                    <SelectItem value="over-15000">Over €15,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeline" className="text-black">
                  Campaign timeline
                </Label>
                <Input
                  id="timeline"
                  className="bg-white border-gray-300 text-black mt-1"
                  placeholder="e.g. 3 months, ongoing"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="target-locations" className="text-black">
                Target locations
              </Label>
              <Input
                id="target-locations"
                className="bg-white border-gray-300 text-black mt-1"
                placeholder="e.g. Airports, Malls, Events, Specific cities"
              />
            </div>

            <div>
              <Label htmlFor="goals" className="text-black mb-1.5 text-sm">
                Campaign goals &amp; requirements
              </Label>
              <Textarea
                id="goals"
                className="bg-white border-gray-300 min-h-[120px] mb-10 ml-0 mt-1 text-slate-400"
                placeholder="Tell us about your marketing objectives, target audience, creative requirements, and what success looks like for your campaign..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mb-10 pb-[18px]">
              <h4 className="text-black font-semibold mb-2">
                What happens next?
              </h4>
              <ul className="text-gray-600 text-sm space-y-1">
                <li>• We'll review your requirements within 24 hours</li>
                <li>• Our team will create a custom campaign proposal</li>
                <li>• We'll schedule a call to present the strategy</li>
                <li>
                  • Upon approval, we'll launch your campaign within 1 week
                </li>
              </ul>
            </div>

            <Button className="w-full bg-black hover:bg-gray-800 py-3 text-sm my-5">
              Request campaign proposal
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
