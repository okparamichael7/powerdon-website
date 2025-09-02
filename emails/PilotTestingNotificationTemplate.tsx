import type { CSSProperties } from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
  Img,
} from "@react-email/components";

interface Props {
  requestId?: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  targetLocations?: string;
  goals: string;
}

export const PilotTestingNotificationTemplate = ({
  requestId,
  company,
  contact,
  email,
  phone,
  industry,
  budget,
  timeline,
  targetLocations,
  goals,
}: Props) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>
        {requestId
          ? `[${requestId}] New Pilot Testing Request from ${company}`
          : `New Pilot Testing Request from ${company}`}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Gradient Header */}
          <Section style={headerSection}>
            <div style={gradientOverlay} />
            <div style={logoContainer}>
              <img
                src="https://ik.imagekit.io/738ry3t8s/powerdon-logo-white.png?updatedAt=1755454666544"
                alt="Powerdon Logo"
                style={{
                  maxWidth: "180px",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
          </Section>

          {/* Main Content */}
          <Section style={contentSection}>
            <Heading style={h1}>New Pilot Testing Request</Heading>
            <Text style={subtitle}>
              Startup-friendly charging solution inquiry from {company}
            </Text>

            {/* Startup Badge */}
            <Section style={startupSection}>
              <div style={startupBadge}>
                <Text style={startupText}>🚀 Startup-Friendly Opportunity</Text>
              </div>
            </Section>

            {/* Company Info */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Company Details</Text>
              <div style={infoGrid}>
                <div style={infoItem}>
                  <Text style={label}>Company:</Text>
                  <Text style={value}>{company}</Text>
                </div>
                <div style={infoItem}>
                  <Text style={label}>Contact:</Text>
                  <Text style={value}>{contact}</Text>
                </div>
                <div style={infoItem}>
                  <Text style={label}>Email:</Text>
                  <Text style={value}>
                    <Link href={`mailto:${email}`} style={emailLink}>
                      {email}
                    </Link>
                  </Text>
                </div>
                <div style={infoItem}>
                  <Text style={label}>Phone:</Text>
                  <Text style={value}>
                    <Link href={`tel:${phone}`} style={phoneLink}>
                      {phone}
                    </Link>
                  </Text>
                </div>
                {industry && (
                  <div style={infoItem}>
                    <Text style={label}>Industry:</Text>
                    <Text style={value}>{industry}</Text>
                  </div>
                )}
              </div>
              {requestId && (
                <div style={infoItem}>
                  <Text style={label}>Request ID:</Text>
                  <Text style={requestIdValue}>{requestId}</Text>
                </div>
              )}
            </Section>

            {/* Pilot Requirements */}
            <Section style={requirementsCard}>
              <Text style={cardTitle}>Pilot Requirements</Text>
              <div style={requirementsGrid}>
                {budget && (
                  <div style={requirementItem}>
                    <Text style={requirementIcon}>💰</Text>
                    <Text style={requirementLabel}>Budget:</Text>
                    <Text style={requirementValue}>{budget}</Text>
                  </div>
                )}
                {timeline && (
                  <div style={requirementItem}>
                    <Text style={requirementIcon}>⏱️</Text>
                    <Text style={requirementLabel}>Timeline:</Text>
                    <Text style={requirementValue}>{timeline}</Text>
                  </div>
                )}
                {targetLocations && (
                  <div style={requirementItem}>
                    <Text style={requirementIcon}>📍</Text>
                    <Text style={requirementLabel}>Locations:</Text>
                    <Text style={requirementValue}>{targetLocations}</Text>
                  </div>
                )}
              </div>
            </Section>

            {/* Goals Section */}
            <Section style={messageCard}>
              <Text style={cardTitle}>Testing Goals & Objectives</Text>
              <Text style={messageText}>{goals}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              PowerDon Pilot Team • Empowering Startups & Small Events
            </Text>
            <Text style={footerCopyright}>
              © {new Date().getFullYear()} PowerDon. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default PilotTestingNotificationTemplate;

// ========== Styles ========== //
const main: CSSProperties = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  lineHeight: "1.5",
  color: "#1e293b",
};

const container: CSSProperties = {
  margin: "auto",
  maxWidth: "600px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
};

const headerSection: CSSProperties = {
  position: "relative",
  textAlign: "center",
  padding: "40px 20px",
  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
  color: "#ffffff",
};

const gradientOverlay: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background:
    "linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(59, 130, 246, 0.8) 100%)",
};

const logoContainer: CSSProperties = {
  position: "relative",
  zIndex: 1,
};

const contentSection: CSSProperties = {
  padding: "32px 24px",
};

const h1: CSSProperties = {
  color: "#1e293b",
  fontSize: "28px",
  fontWeight: "700",
  lineHeight: "1.3",
  margin: "0 0 8px",
  textAlign: "center",
};

const subtitle: CSSProperties = {
  color: "#64748b",
  fontSize: "16px",
  margin: "0 0 24px",
  fontWeight: "normal",
  textAlign: "center",
};

const startupSection: CSSProperties = {
  textAlign: "center",
  marginBottom: "24px",
};

const startupBadge: CSSProperties = {
  backgroundColor: "#fef3c7",
  border: "1px solid #f59e0b",
  borderRadius: "20px",
  padding: "8px 16px",
  display: "inline-block",
};

const startupText: CSSProperties = {
  color: "#92400e",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0",
};

const infoCard: CSSProperties = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  borderLeft: "4px solid #3b82f6",
};

const requirementsCard: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
};

const requirementsGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
};

const requirementItem: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "32px 80px 1fr",
  gap: "12px",
  alignItems: "center",
};

const requirementIcon: CSSProperties = {
  fontSize: "20px",
  textAlign: "center",
};

const requirementLabel: CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
  margin: "0",
};

const requirementValue: CSSProperties = {
  fontSize: "16px",
  color: "#1e293b",
  margin: "0",
  wordBreak: "break-word",
};

const requestIdValue: CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0",
  fontFamily: "monospace",
  letterSpacing: "0.5px",
  backgroundColor: "#f1f5f9",
  padding: "4px 8px",
  borderRadius: "4px",
  border: "1px solid #e2e8f0",
};

const messageCard: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
};

const cardTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0 0 20px 0",
};

const infoGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "16px",
};

const infoItem: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "100px 1fr",
  gap: "12px",
  alignItems: "center",
};

const label: CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
  margin: "0",
};

const value: CSSProperties = {
  fontSize: "16px",
  color: "#1e293b",
  margin: "0",
  wordBreak: "break-word",
};

const emailLink: CSSProperties = {
  color: "#7c3aed",
  textDecoration: "none",
  fontWeight: "600",
};

const phoneLink: CSSProperties = {
  color: "#7c3aed",
  textDecoration: "none",
  fontWeight: "600",
};

const messageText: CSSProperties = {
  color: "#475569",
  fontSize: "16px",
  lineHeight: "1.6",
  margin: "0",
  whiteSpace: "pre-wrap",
};

const footer: CSSProperties = {
  textAlign: "center",
  padding: "0 24px 40px",
};

const footerText: CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0 0 8px 0",
  lineHeight: "1.5",
};

const footerCopyright: CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "24px 0 0 0",
};
