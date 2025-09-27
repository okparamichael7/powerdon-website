"use client";

import { useState } from "react";
import { StickyHeader } from "@/components/sticky-header";

import { Footer } from "@/components/footer";

export default function PrivacyPolicyPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-light text-black mb-8">
            Privacy Policy
          </h1>
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> January 1, 2025
            <br />
            <strong>Last Updated:</strong> January 1, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                1. Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                PowerDon B.V. {'("PowerDon," "we," "our," or "us")'} is
                committed to protecting your privacy and ensuring the security
                of your personal information. This Privacy Policy explains how
                we collect, use, store, and protect your personal data when you
                use our charging station services, website, mobile applications,
                and related services {'(collectively, the "Services")'}.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Privacy Policy applies to all users of our Services and
                complies with the General Data Protection Regulation {"(GDPR)"},
                the Dutch Data Protection Act, and other applicable data
                protection laws. By using our Services, you consent to the
                collection and use of your information as described in this
                Privacy Policy.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices or applicable laws. We will notify you
                of any material changes by posting the updated policy on our
                website and, where required by law, by sending you a direct
                notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                2. Data Controller Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>PowerDon B.V.</strong>
                </p>
                <p className="text-gray-700 mb-2">Herengracht 123</p>
                <p className="text-gray-700 mb-2">1015 BG Amsterdam</p>
                <p className="text-gray-700 mb-2">The Netherlands</p>
                <p className="text-gray-700 mb-2">
                  Email: privacy@powerdon.com
                </p>
                <p className="text-gray-700 mb-2">
                  Phone: +31 {"(0)"} 20 123 4567
                </p>
                <p className="text-gray-700">Chamber of Commerce: 12345678</p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                PowerDon B.V. is the data controller responsible for your
                personal data. If you have any questions about this Privacy
                Policy or our data practices, please contact us using the
                information provided above.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                3. Information We Collect
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                3.1 Information You Provide Directly
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We collect information that you voluntarily provide to us when
                you:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Create an account or register for our Services</li>
                <li>Rent a power bank from our charging stations</li>
                <li>Contact our customer support</li>
                <li>Subscribe to our newsletter or marketing communications</li>
                <li>
                  Participate in surveys, promotions, or feedback requests
                </li>
                <li>Apply for partnership or advertising opportunities</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Name and contact information {"(email address, phone number)"}
                </li>
                <li>
                  Payment information {"(credit card details, billing address)"}
                </li>
                <li>Account credentials {"(username, password)"}</li>
                <li>Company information {"(for business partnerships)"}</li>
                <li>Communication preferences</li>
                <li>Feedback, reviews, and survey responses</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                3.2 Information Collected Automatically
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you use our Services, we automatically collect certain
                information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Device information{" "}
                  {"(device type, operating system, unique device identifiers)"}
                </li>
                <li>
                  Usage data{" "}
                  {"(rental history, session duration, charging patterns)"}
                </li>
                <li>
                  Location data{" "}
                  {"(when you use our mobile app or rent from our stations)"}
                </li>
                <li>
                  Technical data {"(IP address, browser type, access times)"}
                </li>
                <li>
                  App analytics{" "}
                  {"(app crashes, performance metrics, feature usage)"}
                </li>
                <li>
                  Station interaction data{" "}
                  {"(which stations you use, rental frequency)"}
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                3.3 Information from Third Parties
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may receive information about you from third parties,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Payment processors{" "}
                  {"(transaction data, payment verification)"}
                </li>
                <li>
                  Social media platforms{" "}
                  {"(if you connect your social accounts)"}
                </li>
                <li>Analytics providers {"(aggregated usage statistics)"}</li>
                <li>
                  Event partners{" "}
                  {"(when you use our services at partner venues)"}
                </li>
                <li>
                  Marketing partners{" "}
                  {"(with your consent, for promotional purposes)"}
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                4. How We Use Your Information
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                4.1 Primary Purposes
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use your personal information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Provide and maintain our charging station services</li>
                <li>Process rental transactions and payments</li>
                <li>Manage your account and user profile</li>
                <li>Locate nearby charging stations and manage rentals</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send service-related notifications and updates</li>
                <li>
                  Ensure the security and proper functioning of our Services
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                4.2 Secondary Purposes
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                With your consent or where permitted by law, we may also use
                your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Send marketing communications and promotional offers</li>
                <li>Conduct market research and analyze usage patterns</li>
                <li>Improve our Services and develop new features</li>
                <li>Personalize your experience and provide recommendations</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>
                  Comply with legal obligations and enforce our Terms of Use
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                4.3 Legal Basis for Processing
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under GDPR, we process your personal data based on the following
                legal grounds:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  <strong>Contract performance:</strong> To provide our Services
                  and fulfill our contractual obligations
                </li>
                <li>
                  <strong>Legitimate interests:</strong> To improve our
                  Services, prevent fraud, and ensure security
                </li>
                <li>
                  <strong>Consent:</strong> For marketing communications and
                  optional features
                </li>
                <li>
                  <strong>Legal compliance:</strong> To comply with applicable
                  laws and regulations
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                5. Data Sharing and Disclosure
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                5.1 Service Providers
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share your information with trusted third-party service
                providers who assist us in operating our Services, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Payment processors {"(Stripe, PayPal, etc.)"}</li>
                <li>Cloud hosting providers {"(AWS, Google Cloud, etc.)"}</li>
                <li>Analytics services {"(Google Analytics, etc.)"}</li>
                <li>Customer support platforms</li>
                <li>Email and communication services</li>
                <li>Security and fraud prevention services</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                These service providers are contractually obligated to protect
                your information and use it only for the specific services they
                provide to us.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                5.2 Business Partners
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may share limited information with our business partners,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Event organizers and venue partners{" "}
                  {"(aggregated usage statistics)"}
                </li>
                <li>Advertising partners {"(anonymized demographic data)"}</li>
                <li>Integration partners {"(for connected services)"}</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                5.3 Legal Requirements
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may disclose your information when required by law or when we
                believe disclosure is necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Comply with legal obligations, court orders, or government
                  requests
                </li>
                <li>
                  Protect our rights, property, or safety, or that of our users
                </li>
                <li>
                  Investigate and prevent fraud, security breaches, or illegal
                  activities
                </li>
                <li>Enforce our Terms of Use or other agreements</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                5.4 Business Transfers
              </h3>
              <p className="text-gray-700 leading-relaxed">
                In the event of a merger, acquisition, or sale of assets, your
                personal information may be transferred to the acquiring entity.
                We will notify you of any such transfer and any changes to this
                Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                6. Data Retention
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We retain your personal information only for as long as
                necessary to fulfill the purposes outlined in this Privacy
                Policy, unless a longer retention period is required or
                permitted by law.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                6.1 Retention Periods
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Account information:</strong> Retained while your
                  account is active and for 3 years after account closure
                </li>
                <li>
                  <strong>Transaction data:</strong> Retained for 7 years for
                  accounting and tax purposes
                </li>
                <li>
                  <strong>Usage data:</strong> Retained for 2 years for service
                  improvement and analytics
                </li>
                <li>
                  <strong>Marketing data:</strong> Retained until you withdraw
                  consent or for 3 years of inactivity
                </li>
                <li>
                  <strong>Support communications:</strong> Retained for 3 years
                  after resolution
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                6.2 Data Deletion
              </h3>
              <p className="text-gray-700 leading-relaxed">
                When the retention period expires, we will securely delete or
                anonymize your personal information. However, we may retain
                certain information if required by law or for legitimate
                business purposes, such as fraud prevention or legal compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                7. Your Rights and Choices
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Under GDPR and other applicable data protection laws, you have
                the following rights regarding your personal information:
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                7.1 Access and Portability
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Right of access:</strong> Request a copy of the
                  personal information we hold about you
                </li>
                <li>
                  <strong>Data portability:</strong> Request your data in a
                  structured, machine-readable format
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                7.2 Correction and Deletion
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Right to rectification:</strong> Correct inaccurate or
                  incomplete personal information
                </li>
                <li>
                  <strong>Right to erasure:</strong> Request deletion of your
                  personal information {'("right to be forgotten")'}
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                7.3 Processing Limitations
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Right to restrict processing:</strong> Limit how we
                  use your personal information
                </li>
                <li>
                  <strong>Right to object:</strong> Object to processing based
                  on legitimate interests or for marketing
                </li>
                <li>
                  <strong>Withdraw consent:</strong> Withdraw consent for
                  processing where consent is the legal basis
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                7.4 Exercising Your Rights
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To exercise any of these rights, please contact us at
                privacy@powerdon.com or through your account settings. We will
                respond to your request within 30 days{" "}
                {"(or as required by applicable law)"}.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You also have the right to lodge a complaint with a supervisory
                authority if you believe we have not handled your personal
                information in accordance with applicable data protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                8. Cookies and Tracking Technologies
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                8.1 What Are Cookies
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Cookies are small text files stored on your device when you
                visit our website or use our mobile app. They help us provide
                and improve our Services by remembering your preferences and
                analyzing usage patterns.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                8.2 Types of Cookies We Use
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  <strong>Essential cookies:</strong> Necessary for the website
                  to function properly {"(login, security, shopping cart)"}
                </li>
                <li>
                  <strong>Performance cookies:</strong> Help us understand how
                  visitors interact with our website
                </li>
                <li>
                  <strong>Functional cookies:</strong> Remember your preferences
                  and personalize your experience
                </li>
                <li>
                  <strong>Marketing cookies:</strong> Used to deliver relevant
                  advertisements and track campaign effectiveness
                </li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                8.3 Third-Party Cookies
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may allow third-party services to place cookies on your
                device, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Google Analytics {"(website analytics)"}</li>
                <li>Social media platforms {"(social sharing buttons)"}</li>
                <li>Advertising networks {"(targeted advertising)"}</li>
                <li>Payment processors {"(secure payment processing)"}</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                8.4 Managing Cookies
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You can control cookies through your browser settings or our
                cookie preference center. Options include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Accepting or rejecting all cookies</li>
                <li>Choosing which types of cookies to allow</li>
                <li>Deleting existing cookies from your device</li>
                <li>
                  Setting your browser to notify you when cookies are being used
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                9. Data Security
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                9.1 Security Measures
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement comprehensive security measures to protect your
                personal information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>
                  Encryption of data in transit and at rest using
                  industry-standard protocols
                </li>
                <li>
                  Secure data centers with physical access controls and
                  monitoring
                </li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>
                  Employee training on data protection and security best
                  practices
                </li>
                <li>Multi-factor authentication for administrative access</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                9.2 Payment Security
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payment information is processed using PCI DSS compliant payment
                processors. We do not store complete credit card information on
                our servers. All payment transactions are encrypted and
                processed through secure channels.
              </p>

              <h3 className="text-xl font-medium text-black mb-3">
                9.3 Data Breach Response
              </h3>
              <p className="text-gray-700 leading-relaxed">
                In the unlikely event of a data breach, we will notify affected
                users and relevant authorities within 72 hours as required by
                GDPR. We maintain an incident response plan to quickly address
                and mitigate any security incidents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                10. International Data Transfers
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your personal information may be transferred to and processed in
                countries outside the European Economic Area {"(EEA)"} where our
                service providers are located. When we transfer your data
                internationally, we ensure appropriate safeguards are in place,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>European Commission adequacy decisions</li>
                <li>Standard Contractual Clauses {"(SCCs)"}</li>
                <li>Binding Corporate Rules {"(BCRs)"}</li>
                <li>Certification schemes and codes of conduct</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We regularly review and update our international transfer
                mechanisms to ensure compliance with applicable data protection
                laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                11. Children's Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our Services are not intended for children under the age of 16.
                We do not knowingly collect personal information from children
                under 16 without parental consent. If we become aware that we
                have collected personal information from a child under 16
                without parental consent, we will take steps to delete such
                information.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you are a parent or guardian and believe your child has
                provided us with personal information, please contact us at
                privacy@powerdon.com so we can take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                12. Marketing Communications
              </h2>

              <h3 className="text-xl font-medium text-black mb-3">
                12.1 Consent and Preferences
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We will only send you marketing communications if you have given
                us your consent or where permitted by law. You can manage your
                communication preferences through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Your account settings</li>
                <li>Unsubscribe links in our emails</li>
                <li>Contacting our customer support</li>
                <li>Our preference center</li>
              </ul>

              <h3 className="text-xl font-medium text-black mb-3">
                12.2 Types of Communications
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Marketing communications may include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Product updates and new feature announcements</li>
                <li>Promotional offers and discounts</li>
                <li>Event invitations and partnership opportunities</li>
                <li>Surveys and feedback requests</li>
                <li>Industry news and insights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                13. Updates to This Privacy Policy
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this Privacy Policy from time to time to reflect
                changes in our practices, technology, or legal requirements.
                When we make material changes, we will:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Post the updated Privacy Policy on our website</li>
                <li>
                  Update the {'"Last Updated"'} date at the top of this policy
                </li>
                <li>
                  Notify you via email or through our Services{" "}
                  {"(for material changes)"}
                </li>
                <li>Obtain your consent where required by law</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-black mb-4">
                14. Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this
                Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>Data Protection Officer</strong>
                </p>
                <p className="text-gray-700 mb-2">PowerDon B.V.</p>
                <p className="text-gray-700 mb-2">
                  Email: privacy@powerdon.com
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
              <p className="text-gray-700 leading-relaxed">
                For general inquiries about our Services, please contact
                support@powerdon.com.
              </p>
            </section>

            <section className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-500 italic">
                This Privacy Policy is effective as of the date first written
                above and will remain in effect except with respect to any
                changes in its provisions in the future, which will be in effect
                immediately after being posted on this page. Your continued use
                of our Services after any changes to this Privacy Policy
                constitutes acceptance of those changes.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
