"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import ContactForm from "./form/ContactForm";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackButtonClick } from "@/lib/analytics";

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, namespace } = useTranslation();
  const copy = namespace("contact");

  return (
    <div className={`min-h-screen bg-white`}>
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <div className="text-center mb-36">
          <h1 className="text-4xl lg:text-6xl font-light text-black mb-6 text-left">
            {copy.hero.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto text-left ml-0 mr-[600px]">
            {copy.hero.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="mb-20">
              <h2 className="text-2xl font-light text-black mb-8">
                {copy.infoTitle}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">
                      {copy.info.email.title}
                    </h3>
                    {copy.info.email.lines.map((line) => (
                      <p key={line} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">
                      {copy.info.phone.title}
                    </h3>
                    <p className="text-gray-600">{copy.info.phone.lines[0]}</p>
                    <p className="text-gray-600 text-sm">
                      {copy.info.phone.lines[1]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">
                      {copy.info.address.title}
                    </h3>
                    {copy.info.address.lines.map((line) => (
                      <p key={line} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Clock className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="text-black font-semibold mb-1">
                      {copy.info.hours.title}
                    </h3>
                    {copy.info.hours.lines.map((line) => (
                      <p key={line} className="text-gray-600">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-4 mt-0">
              <h3 className="text-xl font-light text-black mb-4">
                {copy.quickContact.title}
              </h3>

              <Card className="bg-white border-gray-200">
                <CardContent className="p-4">
                  <h4 className="text-black font-semibold mb-2">
                    {copy.quickContact.cardTitle}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {copy.quickContact.description}
                  </p>
                  <Link href={href("/advertising/quote")}>
                    <Button
                      onClick={() => trackButtonClick("contact_sales_cta")}
                      size="sm"
                      className="bg-black hover:bg-gray-800"
                    >
                      {copy.quickContact.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <ContactForm />
        </div>

        {/* FAQ Section */}
        <div className="mt-36 mb-32">
          <h2 className="text-3xl font-light text-black text-center mb-12">
            {copy.faqTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {copy.faqs.map((faq) => (
              <Card key={faq.question} className="bg-white border-gray-200">
                <CardContent className="p-6">
                  <h3 className="text-black font-semibold mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
