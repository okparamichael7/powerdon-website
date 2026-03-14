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
import { defaultLocale, localizePath, type Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages/en";

type FormType = "contact" | "advertising" | "partnership" | "pilot-testing";

interface SubmissionData {
  [key: string]: string | undefined;
}

interface Props {
  firstName: string;
  formType: FormType;
  submissionData: SubmissionData;
  customMessage?: string;
  requestId?: string;
  locale?: Locale;
  messages: Messages["emails"];
}

const visualConfig = {
  contact: {
    icon: "💬",
    accentColor: "#3b82f6",
  },
  advertising: {
    icon: "📈",
    accentColor: "#00d4ff",
  },
  partnership: {
    icon: "🤝",
    accentColor: "#00ff88",
  },
  "pilot-testing": {
    icon: "🚀",
    accentColor: "#2563eb",
  },
};

function interpolate(
  template: string,
  values: Record<string, string | number>,
) {
  return Object.entries(values).reduce((result, [key, value]) => {
    return result.replaceAll(`{${key}}`, String(value));
  }, template);
}

export const ConfirmationTemplate = ({
  firstName,
  formType,
  submissionData,
  customMessage,
  requestId,
  locale = defaultLocale,
  messages,
}: Props) => {
  const content = {
    contact: messages.confirmation.forms.contact,
    advertising: messages.confirmation.forms.advertising,
    partnership: messages.confirmation.forms.partnership,
    "pilot-testing": messages.confirmation.forms.pilotTesting,
  }[formType];
  const visual = visualConfig[formType];
  const localeTag = locale === "nl" ? "nl-NL" : "en-US";
  const submittedAt = new Intl.DateTimeFormat(localeTag, {
    dateStyle: "full",
    timeStyle: "short",
  }).format(new Date());

  return (
    <Html lang={locale}>
      <Head />
      <Preview>
        {interpolate(messages.confirmation.preview, { title: content.title })}
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

          {/* Confirmation Section */}
          <Section style={confirmationSection}>
            <div style={iconCircle(visual.accentColor)}>
              <Text style={checkIcon}>✓</Text>
            </div>
            <Heading style={h1}>
              {interpolate(messages.confirmation.thankYou, { name: firstName })}
            </Heading>
            <Text style={subtitle}>
              {interpolate(messages.confirmation.received, {
                title: content.title.toLowerCase(),
              })}
            </Text>
          </Section>

          {/* Message Card */}
          <Section style={messageCard(visual.accentColor)}>
            <div style={iconContainer}>
              <Text style={formIcon}>{visual.icon}</Text>
            </div>
            <Text style={messageTitle}>{content.title}</Text>
            <Text style={messageDescription}>
              {customMessage || content.description}
            </Text>
          </Section>

          {/* Submission Summary */}
          <Section style={summaryCard}>
            <Text style={cardTitle}>{messages.confirmation.summary}</Text>
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
                {interpolate(messages.confirmation.submittedOn, {
                  date: submittedAt,
                })}
              </Text>
              {requestId && (
                <Text style={requestIdText}>
                  {interpolate(messages.confirmation.reference, {
                    id: requestId,
                  })}
                </Text>
              )}
            </div>
          </Section>

          {/* Next Steps */}
          <Section style={nextStepsCard(visual.accentColor)}>
            <Text style={cardTitle}>{messages.confirmation.nextSteps}</Text>
            <div style={stepsContainer}>
              {content.nextSteps.map((step, index) => (
                <div key={index} style={stepItem}>
                  <div style={stepNumber(visual.accentColor)}>{index + 1}</div>
                  <Text style={stepText}>{step}</Text>
                </div>
              ))}
            </div>
            <div style={responseTimeContainer}>
              <Text style={responseTime}>
                ⚡{" "}
                {interpolate(messages.confirmation.responseTime, {
                  time: content.responseTime,
                })}
              </Text>
            </div>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaTitle}>{messages.confirmation.explore}</Text>
            <Link
              href={localizePath(content.ctaUrl, locale)}
              style={ctaButton(visual.accentColor)}
            >
              {content.ctaText}
            </Link>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footer}>
            {/* <div style={socialLinks}>
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
            </div> */}
            <Text style={footerTitle}>{messages.confirmation.assistance}</Text>
            <Text style={footerText}>
              {messages.confirmation.assistanceText}
            </Text>
            <Text style={footerCopyright}>
              {interpolate(messages.confirmation.copyright, {
                year: new Date().getFullYear(),
              })}
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

const requestIdText: CSSProperties = {
  fontSize: "12px",
  color: "#94a3b8",
  margin: "8px 0 0 0",
  fontFamily: "monospace",
  letterSpacing: "0.5px",
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
