"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import CampaignForm from "../form/CampaignForm";
import { useTranslation } from "@/lib/i18n/useTranslation";

export default function AdvertisingQuotePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, namespace } = useTranslation();
  const common = namespace("common");
  const copy = namespace("advertising");

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href={href("/advertising")}
            className="inline-flex items-center hover:text-black transition-colors text-slate-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {common.backLinks.advertising}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-light text-black lg:text-6xl mb-6 mt-24 text-left">
            {copy.quotePage.title}
          </h1>
          <p className="max-w-2xl font-normal text-lg leading-6 text-gray-500 px-[0] mx-0 text-left pr-10">
            {copy.quotePage.description}
          </p>
        </div>

        {/* Hero Image Section */}

        {/* Campaign Quote Form */}
        <CampaignForm />
      </div>

      <Footer />
    </div>
  );
}
