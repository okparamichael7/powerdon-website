"use client"

import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-black text-white w-full py-10 pb-4">
      <div className="w-full px-0">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12 max-w-7xl mx-auto mr-6 ml-6">
          {/* Logo Section - Left Side */}
          <div className="flex-shrink-0">
            <Image
              src="/images/powerdon-logo-white.png"
              alt="POWERDON"
              width={200}
              height={60}
              className="h-8 w-auto"
            />
          </div>

          {/* Navigation and Social Links - Right Side */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 pt-2">
            {/* Navigation Links */}
            <div className="space-y-4 mr-[50px] text-left">
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
              <a
                href="#"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                INSTAGRAM
              </a>
              <a
                href="#"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                FACEBOOK
              </a>
              <a
                href="#"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                LINKEDIN
              </a>
              <a
                href="#"
                className="block text-white hover:text-gray-300 transition-colors font-medium tracking-wide text-xs"
              >
                TWITTER
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t max-w-7xl border-transparent mx-0 ml-6 pt-20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs">© 2025 PowerDon</div>
            <div className="flex flex-wrap gap-6 justify-between text-xs">
              <a href="#" className="text-gray-400 hover:text-white transition-colors mr-6">
                Terms of Use
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Copyright Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
