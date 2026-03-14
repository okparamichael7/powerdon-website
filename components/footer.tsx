"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { LanguageSwitcher } from "@/components/language-switcher";
import { trackButtonClick } from "@/lib/analytics";
import { useTranslation } from "@/lib/i18n/useTranslation";

export function Footer() {
  const { href, t, namespace } = useTranslation();
  const copy = namespace("common");

  const handleSocialClick = (platform: string) => {
    toast.info(t("common.footer.toast.title", { platform }), {
      description: copy.footer.toast.description,
      duration: 4000,
      position: "bottom-right",
      action: {
        label: copy.footer.toast.action,
        onClick: () => toast.dismiss(),
      },
      style: {
        background: "white",
        border: "1px solid #e5e7eb",
        color: "#374151",
      },
    });
  };

  return (
    <footer className="bg-black text-white w-full py-6 pb-4">
      <div className="w-full px-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 mx-auto mr-6 ml-6">
          {/* Logo Section - Left Side */}
          <div className="flex-shrink-0">
            <Link href={href("/")}>
              <Image
                src="/images/powerdon-logo-white.png"
                alt={copy.footer.logoAlt}
                width={200}
                height={60}
                className="h-8 w-auto"
              />
            </Link>
            {/* Chamber of Commerce Details */}
            <div className="mt-4 text-gray-400 text-left text-xs">
              <p>{copy.footer.business.kvk}</p>
              <p>{copy.footer.business.vat}</p>
            </div>
          </div>

          {/* Navigation and Social Links - Right Side */}
          <div className="grid grid-cols-4 gap-x-16 pt-2">
            {/* Navigation Links */}
            <div className="space-y-5 mr-[50px] text-left col-span-2">
              <Link
                href={href("/")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                {copy.footer.navigation.home}
              </Link>
              <Link
                href={href("/reserve")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                {copy.footer.navigation.reserve}
              </Link>
              <Link
                href={href("/advertising")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                {copy.footer.navigation.advertising}
              </Link>
              <Link
                href={href("/about")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                {copy.footer.navigation.about}
              </Link>
              <Link
                href={href("/contact")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                {copy.footer.navigation.contact}
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4 mr-8 text-left">
              <button
                onClick={() => handleSocialClick("Instagram")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                {copy.footer.social.instagram}
              </button>
              <button
                onClick={() => handleSocialClick("Facebook")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                {copy.footer.social.facebook}
              </button>
              <a
                href="https://www.linkedin.com/company/powerdon/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick("footer_linkedin")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left cursor-pointer"
              >
                {copy.footer.social.linkedin}
              </a>
              <button
                onClick={() => handleSocialClick("Twitter")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                {copy.footer.social.twitter}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-transparent mx-auto px-6 pt-6 md:pt-8">
          <div className="border-b border-gray-400 py-6">
            <div className="flex w-full flex-col gap-6 px-6 text-xs md:flex-row md:items-center md:justify-between">
              <div className="flex justify-start">
                <LanguageSwitcher variant="footer" />
              </div>
              <div className="flex flex-wrap items-center gap-6 text-xs md:justify-end">
                <div className="text-gray-400 text-xs">
                  {copy.footer.copyright}
                </div>
                <Link
                  href={href("/terms")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copy.footer.legal.terms}
                </Link>
                <Link
                  href={href("/privacy")}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copy.footer.legal.privacy}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
