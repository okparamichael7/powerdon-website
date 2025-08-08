"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`min-h-screen bg-white`}>
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-36">
          <h1 className="text-4xl lg:text-6xl font-light text-black mb-6 text-left">
            Get In Touch
          </h1>
          <p
            className={`text-xl text-gray-600 max-w-3xl mx-auto text-left ml-0 mr-[600px]`}
          >
            Have questions about our charging stations or want to join our testing phase and pre-launch program? We'd love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="mb-20">
              <h2 className="text-2xl font-light text-black mb-8">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className={`w-6 h-6 ${"text-blue-600"} mt-1`} />
                  <div>
                    <h3 className="text-black font-semibold mb-1">Email</h3>
                    <p className={"text-gray-600"}>support@powerdon.nl</p>
                    <p className={"text-gray-600"}>branding@powerdon.nl</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">Phone</h3>
                    <p className={"text-gray-600"}>+31 (06)130713536</p>
                    <p className={`${"text-gray-600"} text-sm`}>
                      Mon-Fri 9AM-6PM CEST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">Address</h3>
                    <p className={"text-gray-600"}>Luzacstraat 7A01
                      </p>
                    <p className={"text-gray-600"}>3038 VT, Rotterdam</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">
                      Business Hours
                    </h3>
                    <p className={"text-gray-600"}>
                      Monday - Friday: 9:00 AM - 6:00 PM
                    </p>
                    <p className={"text-gray-600"}>
                      Saturday: 10:00 AM - 4:00 PM
                    </p>
                    <p className={"text-gray-600"}>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4 mt-0">
              <h3 className="text-xl font-light text-black mb-4">
                Quick Contact
              </h3>

              <Card className={"bg-white border-gray-200"}>
                <CardContent className="p-4">
                  <h4 className="text-black font-semibold mb-2">
                    Sales Inquiries
                  </h4>
                  <p className={`${"text-gray-600"} text-sm mb-3`}>
                    Interested in advertising or reserving stations for your
                    event?
                  </p>
                  <Button size="sm" className={"bg-black hover:bg-gray-800"}>
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>

              <Card className={"bg-white border-gray-200"}>
                <CardContent className="p-4">
                  <h4 className="text-black font-semibold mb-2">
                    Technical Support
                  </h4>
                  <p className={`${"text-gray-600"} text-sm mb-3`}>
                    Need help with an existing charging station or service?
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className={`border-blue-500 text-white hover:${
                      "bg-black hover:bg-gray-800".split(" ")[0]
                    } bg-black`}
                  >
                    Get Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className={"bg-white border-gray-200"}>
            <CardHeader>
              <CardTitle className="text-black text-2xl">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-black">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    className={`bg-white border-gray-300 text-black`}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-black">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    className={`bg-white border-gray-300 text-black`}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-black">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className={`bg-white border-gray-300 text-black`}
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-black">
                    Phone (Optional)
                  </Label>
                  <Input
                    id="phone"
                    className={`bg-white border-gray-300 text-black`}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company" className="text-black">
                  Company (Optional)
                </Label>
                <Input
                  id="company"
                  className={`bg-white border-gray-300 text-black`}
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-black mb-1">
                  Subject
                </Label>
                <Select>
                  <SelectTrigger
                    className={`bg-white border-gray-300 text-black placeholder:text-gray-600`}
                  >
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="sales">Sales Question</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="partnership">
                      Partnership Opportunity
                    </SelectItem>
                    <SelectItem value="media">Media Inquiry</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="message" className="text-black">
                  Message
                </Label>
                <Textarea
                  id="message"
                  className={`bg-white border-gray-300 text-black placeholder:text-gray-600 min-h-[120px]`}
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <Button
                className={`w-full ${"bg-black hover:bg-gray-800"} text-lg py-3`}
              >
                Send Message
              </Button>

              <p className={`${"text-gray-600"} text-sm text-center`}>
                We typically respond within 24 hours during business days.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="mt-36 mb-32">
          <h2 className="text-3xl font-light text-black text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className={"bg-white border-gray-200"}>
              <CardContent className="p-6">
                <h3 className="text-black font-semibold mb-3">
                  How quickly can you set up stations for my event?
                </h3>
                <p className={"text-gray-600"}>
                  We typically need 2-3 weeks notice for standard setups. For
                  urgent requests, we offer expedited service with 48-72 hour
                  deployment.
                </p>
              </CardContent>
            </Card>

            <Card className={"bg-white border-gray-200"}>
              <CardContent className="p-6">
                <h3 className="text-black font-semibold mb-3">
                  What devices do your stations support?
                </h3>
                <p className={"text-gray-600"}>
                  Our stations support all major smartphone brands, tablets, and
                  USB-powered devices with multiple cable types including
                  Lightning, USB-C, and Micro-USB.
                </p>
              </CardContent>
            </Card>

            <Card className={"bg-white border-gray-200"}>
              <CardContent className="p-6">
                <h3 className="text-black font-semibold mb-3">
                  Do you provide analytics for advertising campaigns?
                </h3>
                <p className={"text-gray-600"}>
                  Yes! We provide detailed analytics including impressions,
                  engagement time, demographics, and location-based performance
                  metrics.
                </p>
              </CardContent>
            </Card>

            <Card className={"bg-white border-gray-200"}>
              <CardContent className="p-6">
                <h3 className="text-black font-semibold mb-3">
                  What's included in your support package?
                </h3>
                <p className={"text-gray-600"}>
                  All packages include setup, monitoring, maintenance, and 24/7
                  technical support. Higher tiers include dedicated account
                  management and custom integrations.
                </p>
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
