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
  organizer: string;
  contact: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate?: string;
  location?: string;
  attendees?: string;
  eventType?: string;
  additionalInfo: string;
}

export const PartnershipNotificationTemplate = ({
  organizer,
  contact,
  email,
  phone,
  eventName,
  eventDate,
  location,
  attendees,
  eventType,
  additionalInfo,
}: Props) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>New Partnership Application - {eventName}</Preview>
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
            <Heading style={h1}>New Partnership Opportunity</Heading>
            <Text style={subtitle}>Application received for {eventName}</Text>

            {/* Event Highlight Card */}
            <Section style={eventHighlightCard}>
              <Text style={eventTitle}>{eventName}</Text>
              <div style={eventDetails}>
                {eventDate && (
                  <Text style={eventDetailItem}>
                    <span style={eventDetailIcon}>📅</span> {eventDate}
                  </Text>
                )}
                {location && (
                  <Text style={eventDetailItem}>
                    <span style={eventDetailIcon}>📍</span> {location}
                  </Text>
                )}
                {attendees && (
                  <Text style={eventDetailItem}>
                    <span style={eventDetailIcon}>👥</span> {attendees}{" "}
                    attendees
                  </Text>
                )}
              </div>
            </Section>

            {/* Organizer Info */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Organizer Details</Text>
              <div style={infoGrid}>
                <div style={infoItem}>
                  <Text style={label}>Organization:</Text>
                  <Text style={value}>{organizer}</Text>
                </div>
                <div style={infoItem}>
                  <Text style={label}>Contact Person:</Text>
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
                {eventType && (
                  <div style={infoItem}>
                    <Text style={label}>Event Type:</Text>
                    <Text style={value}>{eventType}</Text>
                  </div>
                )}
              </div>
            </Section>

            {/* Additional Information */}
            <Section style={messageCard}>
              <Text style={cardTitle}>Additional Information</Text>
              <Text style={messageText}>{additionalInfo}</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              PowerDon Partnership Team • Response within 48 hours
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

export default PartnershipNotificationTemplate;

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
  background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
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

const eventHighlightCard: CSSProperties = {
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  textAlign: "center",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
};

const eventTitle: CSSProperties = {
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 12px 0",
  color: "#ffffff",
};

const eventDetails: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  alignItems: "center",
};

const eventDetailItem: CSSProperties = {
  fontSize: "16px",
  margin: "0",
  color: "#e0f2fe",
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const eventDetailIcon: CSSProperties = {
  fontSize: "18px",
};

const infoCard: CSSProperties = {
  backgroundColor: "#f8fafc",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  borderLeft: "4px solid #3b82f6",
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
  gridTemplateColumns: "120px 1fr",
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
  color: "#3b82f6",
  textDecoration: "none",
  fontWeight: "600",
};

const phoneLink: CSSProperties = {
  color: "#3b82f6",
  textDecoration: "none",
  fontWeight: "600",
};

const messageCard: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
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
