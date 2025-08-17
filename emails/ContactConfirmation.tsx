import { ConfirmationTemplate } from "./ConfirmationTemplate";

// Wrapper components for specific form types with pre-configured data

interface ContactConfirmationProps {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
}

export const ContactConfirmation = (props: ContactConfirmationProps) => {
  const submissionData = {
    name: `${props.firstName} ${props.lastName}`,
    email: props.email,
    phone: props.phone,
    company: props.company,
    subject: props.subject,
    message:
      props.message.length > 100
        ? `${props.message.substring(0, 100)}...`
        : props.message,
  };

  return (
    <ConfirmationTemplate
      firstName={props.firstName}
      formType="contact"
      submissionData={submissionData}
    />
  );
};

interface AdvertisingConfirmationProps {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  targetLocations?: string;
}

export const AdvertisingConfirmation = (
  props: AdvertisingConfirmationProps
) => {
  const submissionData = {
    company: props.company,
    email: props.email,
    phone: props.phone,
    industry: props.industry,
    budgetRange: props.budget,
    timeline: props.timeline,
    targetLocations: props.targetLocations,
  };

  return (
    <ConfirmationTemplate
      firstName={props.firstName}
      formType="advertising"
      submissionData={submissionData}
    />
  );
};

interface PartnershipConfirmationProps {
  firstName: string;
  organizer: string;
  email: string;
  phone: string;
  eventName: string;
  eventDate?: string;
  location?: string;
  attendees?: string;
  eventType?: string;
}

export const PartnershipConfirmation = (
  props: PartnershipConfirmationProps
) => {
  const submissionData = {
    eventName: props.eventName,
    organizer: props.organizer,
    email: props.email,
    phone: props.phone,
    eventDate: props.eventDate,
    location: props.location,
    expectedAttendees: props.attendees,
    eventType: props.eventType,
  };

  return (
    <ConfirmationTemplate
      firstName={props.firstName}
      formType="partnership"
      submissionData={submissionData}
    />
  );
};

interface PilotTestingConfirmationProps {
  firstName: string;
  company: string;
  email: string;
  phone: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  targetLocations?: string;
}

export const PilotTestingConfirmation = (
  props: PilotTestingConfirmationProps
) => {
  const submissionData = {
    company: props.company,
    email: props.email,
    phone: props.phone,
    industry: props.industry,
    budgetRange: props.budget,
    timeline: props.timeline,
    targetLocations: props.targetLocations,
  };

  return (
    <ConfirmationTemplate
      firstName={props.firstName}
      formType="pilot-testing"
      submissionData={submissionData}
      customMessage="We're excited to help you test our solutions with flexible, startup-friendly options."
    />
  );
};
