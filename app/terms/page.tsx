"use client";

import { useState } from "react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";

export default function TermsOfUsePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-black mb-8">Terms of Use</h1>
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> January 1, 2025
            <br />
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to PowerDon {'("we," "our," or "us")'}. These Terms of
                Use {'("Terms")'} govern your access to and use of our website,
                mobile applications, charging stations, power bank rental
                services, and all related services{" "}
                {'(collectively, the "Services")'}. By accessing or using our
                Services, you agree to be bound by these Terms and our Privacy
                Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you do not agree to these Terms, please do not use our
                Services. We reserve the right to modify these Terms at any
                time, and such modifications will be effective immediately upon
                posting. Your continued use of the Services after any changes
                constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                2. Description of Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PowerDon provides portable charging solutions through our
                network of charging stations located at various venues including
                airports, malls, events, festivals, and other public locations.
                Our Services include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Power bank rental services through automated charging stations
                </li>
                <li>
                  Digital advertising display services for businesses and brands
                </li>
                <li>
                  Event partnership and charging station placement services
                </li>
                <li>
                  Mobile application for locating stations and managing rentals
                </li>
                <li>Customer support and maintenance services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We continuously work to improve and expand our Services, and we
                may add, modify, or discontinue features at our discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                3. User Eligibility and Registration
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To use our Services, you must be at least 18 years old or have
                parental consent. By using our Services, you represent and
                warrant that you meet this age requirement and have the legal
                capacity to enter into these Terms.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Some Services may require you to create an account. When
                registering, you agree to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information as necessary</li>
                <li>Keep your account credentials secure and confidential</li>
                <li>
                  Accept responsibility for all activities under your account
                </li>
                <li>
                  Notify us immediately of any unauthorized use of your account
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                4. Power Bank Rental Process
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                4.1 Rental Initiation
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To rent a power bank, you must follow the instructions displayed
                on our charging stations or mobile application. The rental
                process typically involves:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Scanning a QR code or using the mobile app</li>
                <li>Providing payment information</li>
                <li>Agreeing to these Terms</li>
                <li>Receiving a power bank from the station</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                4.2 Rental Fees and Charges
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Rental fees are clearly displayed at each station and in our
                mobile application. Charges may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Initial rental fee for the first period{" "}
                  {"(typically 30 minutes to 1 hour)"}
                </li>
                <li>Additional hourly or daily charges for extended use</li>
                <li>
                  Late return fees if the power bank is not returned within the
                  specified timeframe
                </li>
                <li>
                  Replacement fees for lost, stolen, or damaged power banks
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                All fees are charged to the payment method provided during
                rental initiation. You authorize us to charge your payment
                method for all applicable fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                5. Use and Care of Power Banks
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                5.1 Proper Use
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to use the power bank only for its intended purpose of
                charging electronic devices. You must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Handle the power bank with reasonable care</li>
                <li>Use only the provided cables and connectors</li>
                <li>
                  Avoid exposing the power bank to extreme temperatures,
                  moisture, or physical damage
                </li>
                <li>
                  Not attempt to disassemble, modify, or repair the power bank
                </li>
                <li>
                  Not use the power bank for any illegal or unauthorized
                  purposes
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                5.2 Prohibited Uses
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">You may not:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Tamper with, damage, or attempt to hack the power bank or
                  charging stations
                </li>
                <li>
                  Use the power bank to charge devices that exceed the specified
                  power requirements
                </li>
                <li>
                  Remove or obscure any labels, markings, or identification on
                  the power bank
                </li>
                <li>Rent power banks for commercial resale or subletting</li>
                <li>
                  Use the Services in any way that violates applicable laws or
                  regulations
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                6. Rental Period and Return
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                6.1 Rental Duration
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Power banks must be returned to any PowerDon charging station
                within the network. The maximum rental period is typically 72
                hours, after which additional fees may apply. Specific rental
                periods and fees are displayed at each station and in our mobile
                application.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                6.2 Return Process
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To return a power bank:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Locate any PowerDon charging station within our network</li>
                <li>Insert the power bank into an available slot</li>
                <li>
                  Confirm the return through the station interface or mobile app
                </li>
                <li>
                  Receive confirmation of successful return and final charges
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                6.3 Late Returns and Lost Items
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Late return fees will be charged for power banks not returned
                within the specified timeframe. If a power bank is lost, stolen,
                or not returned within 7 days, you will be charged the full
                replacement cost
                {"(typically €50-€100)"} plus any accumulated rental fees.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                7. User Responsibilities
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a user of our Services, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Complying with all applicable laws and regulations</li>
                <li>
                  Respecting the property rights of PowerDon and third parties
                </li>
                <li>Using the Services only for lawful purposes</li>
                <li>Providing accurate information when required</li>
                <li>
                  Maintaining the confidentiality of your account information
                </li>
                <li>
                  Reporting any issues or problems with the Services promptly
                </li>
                <li>
                  Paying all fees and charges associated with your use of the
                  Services
                </li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                You agree not to interfere with or disrupt the Services or
                servers connected to the Services, or violate any requirements,
                procedures, policies, or regulations of networks connected to
                the Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                8. Liability and Indemnification
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                8.1 Limitation of Liability
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, POWERDON SHALL NOT BE
                LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR
                PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS,
                DATA, USE, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE
                OF THE SERVICES.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our total liability to you for any claims arising from or
                related to these Terms or the Services shall not exceed the
                amount you paid to us in the twelve {"(12)"} months preceding
                the claim.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                8.2 Device Compatibility and Safety
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                While our power banks are designed to be compatible with most
                electronic devices, we do not guarantee compatibility with all
                devices. You use our power banks at your own risk, and we are
                not responsible for any damage to your devices resulting from
                normal use of our Services.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                8.3 Indemnification
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You agree to indemnify, defend, and hold harmless PowerDon, its
                officers, directors, employees, agents, and affiliates from and
                against any claims, liabilities, damages, losses, costs,
                expenses, or fees
                {"(including reasonable attorneys' fees)"} arising from your use
                of the Services, violation of these Terms, or infringement of
                any rights of another party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                9. Intellectual Property Rights
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                9.1 PowerDon's Intellectual Property
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Services, including all content, features, functionality,
                software, text, displays, images, video, audio, design,
                selection, and arrangement, are owned by PowerDon and are
                protected by copyright, trademark, patent, trade secret, and
                other intellectual property laws.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                9.2 Limited License
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We grant you a limited, non-exclusive, non-transferable,
                revocable license to access and use the Services for your
                personal, non-commercial use, subject to these Terms.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                9.3 Restrictions
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You may not reproduce, distribute, modify, create derivative
                works of, publicly display, publicly perform, republish,
                download, store, or transmit any of our content, except as
                expressly permitted by these Terms or with our prior written
                consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                10. Content Submission and User-Generated Content
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                10.1 User Content
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services may allow you to submit, post, or transmit content
                such as reviews, comments, feedback, or other materials{" "}
                {'("User Content")'}. You retain ownership of your User Content,
                but you grant us a worldwide, non-exclusive, royalty-free
                license to use, reproduce, modify, adapt, publish, translate,
                distribute, and display such content in connection with the
                Services.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                10.2 Content Standards
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All User Content must comply with applicable laws and must not:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Be defamatory, obscene, offensive, or harmful</li>
                <li>Infringe on the rights of others</li>
                <li>Contain viruses or malicious code</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Be used for spam or unauthorized advertising</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                10.3 Content Monitoring
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, but have no obligation, to monitor,
                review, and remove User Content that violates these Terms or is
                otherwise objectionable, at our sole discretion and without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                11. Privacy and Data Protection
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your privacy is important to us. Our collection, use, and
                disclosure of personal information is governed by our Privacy
                Policy, which is incorporated into these Terms by reference. By
                using our Services, you consent to the collection and use of
                your information as described in our Privacy Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized access,
                alteration, disclosure, or destruction, in compliance with
                applicable data protection laws including the General Data
                Protection Regulation {"(GDPR)"}.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                12. Dispute Resolution
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                12.1 Informal Resolution
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Before initiating any formal dispute resolution process, we
                encourage you to contact our customer support team at
                support@powerdon.com to resolve any issues informally. We are
                committed to working with you to resolve disputes in a fair and
                timely manner.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                12.2 Binding Arbitration
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Any dispute, claim, or controversy arising out of or relating to
                these Terms or the Services that cannot be resolved informally
                shall be settled by binding arbitration in accordance with the
                rules of the applicable arbitration institution in the
                jurisdiction specified in Section 13.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                12.3 Class Action Waiver
              </h3>
              <p className="text-gray-700 leading-relaxed">
                You agree that any arbitration or legal proceeding shall be
                limited to the dispute between you and PowerDon individually.
                You waive any right to participate in a class action lawsuit or
                class-wide arbitration.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                13. Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be governed by and construed in accordance
                with the laws of the Netherlands, without regard to its conflict
                of law principles. Any legal action or proceeding arising under
                these Terms will be brought exclusively in the courts of
                Amsterdam, Netherlands, and you hereby consent to personal
                jurisdiction and venue therein.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are a consumer residing in the European Union, you may
                also bring proceedings in the courts of your country of
                residence, and nothing in these Terms affects your rights as a
                consumer under applicable consumer protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                14. Termination
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your access to the Services
                immediately, without prior notice or liability, for any reason,
                including if you breach these Terms. Upon termination, your
                right to use the Services will cease immediately, and you must
                return any rented power banks.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You may terminate your account at any time by contacting our
                customer support. Termination does not relieve you of any
                obligations to pay outstanding fees or return rented equipment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                15. Force Majeure
              </h2>
              <p className="text-gray-700 leading-relaxed">
                PowerDon shall not be liable for any failure or delay in
                performance under these Terms due to circumstances beyond our
                reasonable control, including but not limited to acts of God,
                natural disasters, war, terrorism, labor disputes, or government
                actions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                16. Severability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If any provision of these Terms is held to be invalid, illegal,
                or unenforceable, the remaining provisions shall remain in full
                force and effect. The invalid provision shall be replaced with a
                valid provision that most closely reflects the intent of the
                original provision.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                17. Entire Agreement
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms, together with our Privacy Policy and any other
                legal notices published by us on the Services, constitute the
                entire agreement between you and PowerDon concerning the
                Services and supersede all prior or contemporaneous
                communications and proposals.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                18. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms or our Services,
                please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>PowerDon B.V.</strong>
                </p>
                <p className="text-gray-700 mb-2">Email: legal@powerdon.com</p>
                <p className="text-gray-700 mb-2">
                  Customer Support: support@powerdon.com
                </p>
                <p className="text-gray-700 mb-2">
                  Phone: +31 {"(0)"} 20 123 4567
                </p>
                <p className="text-gray-700">
                  Address: Luzacstraat 7A01
                  <br />
                  3038 VT Rotterdam
                  <br />
                  The Netherlands
                </p>
              </div>
            </section>

            <section className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-500 italic">
                By using PowerDon's Services, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of Use.
                These Terms are effective as of the date first written above and
                will remain in effect until modified or terminated in accordance
                with the provisions herein.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
