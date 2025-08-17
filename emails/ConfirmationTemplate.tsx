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

type FormType = "contact" | "advertising" | "partnership" | "pilot-testing";

interface SubmissionData {
  [key: string]: string | undefined;
}

interface Props {
  firstName: string;
  formType: FormType;
  submissionData: SubmissionData;
  customMessage?: string;
}

const formConfig = {
  contact: {
    title: "Contact Inquiry",
    icon: "💬",
    description: "We've received your message and will get back to you soon.",
    responseTime: "within 24 hours",
    nextSteps: [
      "Our team will review your inquiry",
      "We'll respond to your message within 24 hours",
      "A specialist will reach out to discuss your needs",
    ],
    ctaText: "Explore Our Solutions",
    ctaUrl: "/",
    accentColor: "#3b82f6", // blue-500
  },
  advertising: {
    title: "Campaign Quote Request",
    icon: "📈",
    description:
      "Thank you for your interest in PowerDon's advertising solutions.",
    responseTime: "within 24 hours",
    nextSteps: [
      "Our advertising team will review your requirements",
      "We'll create a custom campaign proposal",
      "A dedicated account manager will present the strategy",
      "Campaign launch within 1 week of approval",
    ],
    ctaText: "View Advertising Packages",
    ctaUrl: "/advertising",
    accentColor: "#00d4ff", // electric accent
  },
  partnership: {
    title: "Partnership Application",
    icon: "🤝",
    description:
      "We're excited about the possibility of partnering with your event.",
    responseTime: "within 48 hours",
    nextSteps: [
      "Our partnership team will review your application",
      "We'll create a custom partnership proposal",
      "Schedule a discovery call to discuss details",
      "Finalize partnership agreement and logistics",
    ],
    ctaText: "Learn About Partnerships",
    ctaUrl: "/reserve",
    accentColor: "#00ff88", // neon accent
  },
  "pilot-testing": {
    title: "Pilot Testing Request",
    icon: "🚀",
    description:
      "Thank you for your interest in our startup-friendly pilot program.",
    responseTime: "within 24 hours",
    nextSteps: [
      "Our pilot program team will review your request",
      "We'll prepare a custom quote based on your needs",
      "Schedule a free consultation call",
      "Quick setup and launch of your pilot campaign",
    ],
    ctaText: "View Pilot Program",
    ctaUrl: "/advertising",
    accentColor: "#2563eb", // blue-600
  },
};

export const ConfirmationTemplate = ({
  firstName,
  formType,
  submissionData,
  customMessage,
}: Props) => {
  const config = formConfig[formType] || {
    title: "Contact Inquiry",
    icon: "💬",
    description: "We've received your message and will get back to you soon.",
    responseTime: "within 24 hours",
    nextSteps: [
      "Our team will review your inquiry",
      "We'll respond to your message within 24 hours",
      "A specialist will reach out to discuss your needs",
    ],
    ctaText: "Explore Our Solutions",
    ctaUrl: "/",
    accentColor: "#3b82f6", // blue-500
  };

  return (
    <Html lang="en">
      <Head />
      <Preview>Confirmation: {config.title} - PowerDon</Preview>
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

          {/* Confirmation Section */}
          <Section style={confirmationSection}>
            <div style={iconCircle(config.accentColor)}>
              <Text style={checkIcon}>✓</Text>
            </div>
            <Heading style={h1}>Thank you, {firstName}!</Heading>
            <Text style={subtitle}>
              Your {config.title.toLowerCase()} has been received
            </Text>
          </Section>

          {/* Message Card */}
          <Section style={messageCard(config.accentColor)}>
            <div style={iconContainer}>
              <Text style={formIcon}>{config.icon}</Text>
            </div>
            <Text style={messageTitle}>{config.title}</Text>
            <Text style={messageDescription}>
              {customMessage || config.description}
            </Text>
          </Section>

          {/* Submission Summary */}
          <Section style={summaryCard}>
            <Text style={cardTitle}>Submission Summary</Text>
            <div style={summaryGrid}>
              {Object.entries(submissionData || {}).map(([key, value]) => {
                if (!value) return null;
                return (
                  <div key={key} style={summaryItem}>
                    <Text style={summaryLabel}>{formatLabel(key)}:</Text>
                    <Text style={summaryValue}>{value}</Text>
                  </div>
                );
              })}
            </div>
            <div style={timestampContainer}>
              <Text style={timestamp}>
                Submitted on{" "}
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </div>
          </Section>

          {/* Next Steps */}
          <Section style={nextStepsCard(config.accentColor)}>
            <Text style={cardTitle}>What happens next?</Text>
            <div style={stepsContainer}>
              {config.nextSteps.map((step, index) => (
                <div key={index} style={stepItem}>
                  <div style={stepNumber(config.accentColor)}>{index + 1}</div>
                  <Text style={stepText}>{step}</Text>
                </div>
              ))}
            </div>
            <div style={responseTimeContainer}>
              <Text style={responseTime}>
                ⚡ Expected response time:{" "}
                <strong>{config.responseTime}</strong>
              </Text>
            </div>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaTitle}>While you wait, explore more</Text>
            <Link href={config.ctaUrl} style={ctaButton(config.accentColor)}>
              {config.ctaText}
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            <div style={socialLinks}>
              <Link href="#" style={socialLink}>
                <Img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/linkedin.svg"
                  width="20"
                  height="20"
                  alt="LinkedIn"
                  style={socialIcon}
                />
              </Link>
              <Link href="#" style={socialLink}>
                <Img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/instagram.svg"
                  width="20"
                  height="20"
                  alt="Instagram"
                  style={socialIcon}
                />
              </Link>
              <Link href="#" style={socialLink}>
                <Img
                  src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/twitter.svg"
                  width="20"
                  height="20"
                  alt="Twitter"
                  style={socialIcon}
                />
              </Link>
            </div>
            <Text style={footerTitle}>Need immediate assistance?</Text>
            <Text style={footerText}>
              Email us at{" "}
              <Link href="mailto:support@powerdon.com" style={footerLink}>
                support@powerdon.nl
              </Link>{" "}
              or call{" "}
              <Link href="tel:+316130713536" style={footerLink}>
                +31 (06)130713536
              </Link>
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

// Helper function to format field labels
const formatLabel = (key: string): string => {
  return key
    .split(/(?=[A-Z])|_|-/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

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
  marginBottom: "32px",
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

const confirmationSection: CSSProperties = {
  textAlign: "center",
  margin: "0 24px 32px",
  padding: "0 0 24px",
  borderBottom: "1px solid #f1f5f9",
};

const iconCircle = (color: string): CSSProperties => ({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  background: color,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
  boxShadow: `0 4px 12px ${color}40`,
});

const checkIcon: CSSProperties = {
  fontSize: "32px",
  color: "#ffffff",
  fontWeight: "bold",
  lineHeight: "1",
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
  margin: "0",
  fontWeight: "normal",
};

const messageCard = (color: string): CSSProperties => ({
  backgroundColor: `${color}10`,
  padding: "32px 24px",
  borderRadius: "12px",
  margin: "0 24px 24px",
  borderLeft: `4px solid ${color}`,
  textAlign: "center",
});

const iconContainer: CSSProperties = {
  marginBottom: "16px",
};

const formIcon: CSSProperties = {
  fontSize: "40px",
  margin: "0",
};

const messageTitle: CSSProperties = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0 0 12px 0",
};

const messageDescription: CSSProperties = {
  fontSize: "16px",
  color: "#475569",
  margin: "0",
  lineHeight: "1.6",
};

const summaryCard: CSSProperties = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "12px",
  margin: "0 24px 24px",
  border: "1px solid #e2e8f0",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.02)",
};

const cardTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#1e293b",
  margin: "0 0 20px 0",
};

const summaryGrid: CSSProperties = {
  marginBottom: "20px",
};

const summaryItem: CSSProperties = {
  marginBottom: "12px",
  paddingBottom: "12px",
  borderBottom: "1px solid #f1f5f9",
  display: "grid",
  gridTemplateColumns: "120px 1fr",
  gap: "12px",
};

const summaryLabel: CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#64748b",
  margin: "0",
};

const summaryValue: CSSProperties = {
  fontSize: "16px",
  color: "#1e293b",
  margin: "0",
  wordBreak: "break-word",
};

const timestampContainer: CSSProperties = {
  textAlign: "center",
  paddingTop: "16px",
  borderTop: "1px solid #f1f5f9",
};

const timestamp: CSSProperties = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "0",
  fontStyle: "italic",
};

const nextStepsCard = (color: string): CSSProperties => ({
  backgroundColor: `${color}08`,
  padding: "24px",
  borderRadius: "12px",
  margin: "0 24px 32px",
  border: `1px solid ${color}20`,
});

const stepsContainer: CSSProperties = {
  marginBottom: "20px",
};

const stepItem: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  marginBottom: "16px",
};

const stepNumber = (color: string): CSSProperties => ({
  backgroundColor: color,
  color: "#ffffff",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",
  fontWeight: "700",
  marginRight: "12px",
  flexShrink: 0,
  marginTop: "2px",
});

const stepText: CSSProperties = {
  fontSize: "15px",
  color: "#475569",
  margin: "0",
  lineHeight: "1.5",
};

const responseTimeContainer: CSSProperties = {
  textAlign: "center",
  paddingTop: "16px",
  borderTop: "1px solid rgba(0, 0, 0, 0.05)",
};

const responseTime: CSSProperties = {
  fontSize: "14px",
  color: "#3b82f6",
  margin: "0",
  fontWeight: "600",
};

const ctaSection: CSSProperties = {
  textAlign: "center",
  margin: "0 24px 32px",
};

const ctaTitle: CSSProperties = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 20px 0",
};

const ctaButton = (color: string): CSSProperties => ({
  backgroundColor: color,
  color: "#ffffff",
  padding: "16px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600",
  display: "inline-block",
  marginBottom: "24px",
  transition: "all 0.2s ease",
  boxShadow: `0 4px 12px ${color}40`,
});

const divider: CSSProperties = {
  borderColor: "#e2e8f0",
  margin: "0 24px 32px",
  opacity: "0.5",
};

const footer: CSSProperties = {
  textAlign: "center",
  padding: "0 24px 40px",
};

const socialLinks: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "16px",
  marginBottom: "24px",
};

const socialLink: CSSProperties = {
  color: "#64748b",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "36px",
  height: "36px",
  borderRadius: "50%",
  backgroundColor: "#f1f5f9",
};

const socialIcon: CSSProperties = {
  width: "20px",
  height: "20px",
};

const footerTitle: CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#1e293b",
  margin: "0 0 12px 0",
};

const footerText: CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  margin: "0 0 20px 0",
  lineHeight: "1.5",
};

const footerLink: CSSProperties = {
  color: "#3b82f6",
  textDecoration: "none",
  fontWeight: "600",
};

const footerCopyright: CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "24px 0 0 0",
};

export default ConfirmationTemplate;
