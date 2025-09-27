"use client";

import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

export function Footer() {
  const handleSocialClick = (platform: string) => {
    toast.info(`${platform} link coming soon!`, {
      description:
        "We're working on connecting our social media accounts. Stay tuned!",
      duration: 4000,
      position: "bottom-right",
      action: {
        label: "Got it",
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
    <footer className="bg-black text-white w-full py-10 pb-4">
      <div className="w-full px-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 mx-auto mr-6 ml-6">
          {/* Logo Section - Left Side */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/powerdon-logo-white.png"
                alt="POWERDON"
                width={200}
                height={60}
                className="h-8 w-auto"
              />
            </Link>
            {/* Chamber of Commerce Details */}
            <div className="mt-4 text-gray-400 text-left text-xs">
              <p>KvK: 86755080</p>
              <p>BTW: NL003946515B25</p>
            </div>
          </div>

          {/* Navigation and Social Links - Right Side */}
          <div className="grid grid-cols-4 gap-x-16 pt-2">
            {/* Navigation Links */}
            <div className="space-y-5 mr-[50px] text-left col-span-2">
              <Link
                href="/"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                HOME
              </Link>
              <Link
                href="/reserve"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                RESERVE STATION
              </Link>
              <Link
                href="/advertising"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                ADVERTISING
              </Link>
              <Link
                href="/about"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                ABOUT
              </Link>
              <Link
                href="/contact"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                CONTACT
              </Link>
            </div>

            {/* Social Media Links */}
            <div className="space-y-4 mr-8 text-left">
              <button
                onClick={() => handleSocialClick("Instagram")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                INSTAGRAM
              </button>
              <button
                onClick={() => handleSocialClick("Facebook")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                FACEBOOK
              </button>
              <button
                onClick={() => handleSocialClick("LinkedIn")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                LINKEDIN
              </button>
              <button
                onClick={() => handleSocialClick("Twitter")}
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs text-left"
              >
                TWITTER
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-transparent mx-auto px-6 pt-20 md:pt-40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 border-b border-gray-400 py-6">
            <div className="w-full flex flex-wrap gap-6 justify-between text-xs px-6">
              <div className="text-gray-400 text-xs">© 2025 PowerDon</div>
              <a
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors mr-6"
              >
                Terms of Use
              </a>
              <a
                href="privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
