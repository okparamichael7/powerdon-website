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
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export const ContactNotificationTemplate = ({
  firstName,
  lastName,
  email,
  phone,
  company,
  subject,
  message,
}: Props) => {
  return (
    <Html lang="en">
      <Head />
      <Preview>New Contact Form Submission - {subject}</Preview>
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
            <Heading style={h1}>New Contact Inquiry</Heading>
            <Text style={subtitle}>
              You've received a new message from {firstName} {lastName}
            </Text>

            {/* Contact Info Card */}
            <Section style={infoCard}>
              <Text style={cardTitle}>Contact Details</Text>

              <div style={infoGrid}>
                <div style={infoItem}>
                  <Text style={label}>Name:</Text>
                  <Text style={value}>
                    {firstName} {lastName}
                  </Text>
                </div>

                <div style={infoItem}>
                  <Text style={label}>Email:</Text>
                  <Text style={value}>
                    <Link href={`mailto:${email}`} style={emailLink}>
                      {email}
                    </Link>
                  </Text>
                </div>

                {phone && (
                  <div style={infoItem}>
                    <Text style={label}>Phone:</Text>
                    <Text style={value}>
                      <Link href={`tel:${phone}`} style={phoneLink}>
                        {phone}
                      </Link>
                    </Text>
                  </div>
                )}

                {company && (
                  <div style={infoItem}>
                    <Text style={label}>Company:</Text>
                    <Text style={value}>{company}</Text>
                  </div>
                )}

                <div style={infoItem}>
                  <Text style={label}>Subject:</Text>
                  <Text style={value}>{subject}</Text>
                </div>
              </div>
            </Section>

            {/* Message Section */}
            <Section style={messageCard}>
              <Text style={cardTitle}>Message</Text>
              <Text style={messageText}>{message}</Text>
            </Section>

            {/* Action Button */}
            <Section style={actionSection}>
              <Link
                href={`mailto:${email}?subject=Re: ${subject}`}
                style={replyButton}
              >
                Reply to {firstName}
              </Link>
            </Section>
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
            <Text style={footerText}>
              This message was sent via the PowerDon contact form.
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

export default ContactNotificationTemplate;

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

const actionSection: CSSProperties = {
  textAlign: "center",
  marginBottom: "32px",
};

const replyButton: CSSProperties = {
  backgroundColor: "#3b82f6",
  color: "#ffffff",
  padding: "16px 32px",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "600",
  display: "inline-block",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
};

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
