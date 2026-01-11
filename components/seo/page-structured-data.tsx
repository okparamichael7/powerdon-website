"use client";

import { ReactNode } from "react";

interface PageStructuredDataProps {
  schema: object | object[];
}

/**
 * Page-specific Structured Data Component
 * Use this component to add page-specific JSON-LD structured data
 */
export function PageStructuredData({ schema }: PageStructuredDataProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(s),
          }}
        />
      ))}
    </>
  );
}
