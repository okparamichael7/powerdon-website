"use client";

import { useState } from "react";
import { Footer } from "@/components/footer";
import { StickyHeader } from "@/components/sticky-header";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { LegalPageKey } from "@/lib/i18n/messages/legal-en";

type LegalPageProps = {
  page: LegalPageKey;
};

export function LegalPage({ page }: LegalPageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { namespace } = useTranslation();
  const content = namespace("legal")[page];

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto max-w-4xl px-6 py-12 pt-32">
        <div className="prose prose-lg max-w-none">
          <h1 className="mb-8 text-4xl font-light text-black">
            {content.title}
          </h1>
          <p className="mb-8 text-gray-600">
            <strong>{content.effectiveDateLabel}:</strong>{" "}
            {content.effectiveDateValue}
            <br />
            <strong>{content.lastUpdatedLabel}:</strong>{" "}
            {content.lastUpdatedValue}
          </p>

          <div className="space-y-8">
            {content.sections.map((section) => (
              <section key={section.title}>
                <h2 className="mb-4 text-2xl font-semibold text-black">
                  {section.title}
                </h2>

                {section.cardLines ? (
                  <div className="mb-4 rounded-lg bg-gray-50 p-6">
                    {section.cardLines.map((line) => (
                      <p key={line} className="mb-2 text-gray-700 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : null}

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mb-4 leading-relaxed text-gray-700"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.list ? (
                  <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {section.subsections?.map((subsection) => (
                  <div key={subsection.title} className="mb-6 last:mb-0">
                    <h3 className="mb-3 text-xl font-medium text-black">
                      {subsection.title}
                    </h3>

                    {subsection.paragraphs?.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="mb-4 leading-relaxed text-gray-700"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {subsection.list ? (
                      <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700 last:mb-0">
                        {subsection.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </section>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
