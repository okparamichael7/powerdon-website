"use client";

import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { StickyHeader } from "@/components/sticky-header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form as FormContainer,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import SuccessMessage from "@/components/success-message";
import ErrorMessage from "@/components/error-message";
import { reserveSchema } from "@/schema";
import { reserve, ReserveFormData } from "@/app/actions/reserve";
import { trackFormSubmit, trackConversion } from "@/lib/analytics";

export default function ReserveFormPage() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const form = useForm<z.infer<typeof reserveSchema>>({
    resolver: zodResolver(reserveSchema),
    defaultValues: {
      organizer: "",
      contact: "",
      email: "",
      phone: "",
      eventName: "",
      eventDate: "",
      location: "",
      attendees: "",
      eventType: "",
      additionalInfo: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: ReserveFormData) => {
    startTransition(() => {
      reserve(values)
        .then((data) => {
          if (data.success) {
            setFormStatus("success");
            trackFormSubmit("Reserve Station Form");
            trackConversion("Reserve Station Application", 1);

            // Clear form
            form.reset();
          } else if (data.error) {
            setFormStatus("error");
          }
        })
        .catch((err) => {
          setFormStatus("error");
        });
    });
  };

  const onError = () => {
    setFormStatus("error");
  };

  return (
    <div className="min-h-screen bg-white">
      <StickyHeader isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      <div className="container mx-auto px-6 py-12 pt-32">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/reserve"
            className="inline-flex items-center hover:text-black transition-colors text-slate-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Reserve Station
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-light text-black lg:text-6xl mb-6 mt-24 text-left">
            Apply for Partnership
          </h1>
          <p className="max-w-2xl font-normal text-lg leading-6 text-gray-500 px-[0] mx-0 text-left pr-10">
            Tell us about your event and we'll create a custom partnership
            proposal tailored to your needs.
          </p>
        </div>

        {/* Partnership Application Form */}
        <Card className="max-w-2xl mx-auto bg-white mb-24 shadow-lg shadow-blue-100/50 border-slate-50 mt-28">
          <CardContent className="space-y-6 pt-8 bg-transparent border-transparent">
            <FormContainer {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit, onError)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="organizer"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="organizer" className="text-black">
                          Event organizer/company *
                        </Label>
                        <FormControl>
                          <Input
                            id="organizer"
                            className="bg-white border-gray-300 text-black mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="contact" className="text-black">
                          Contact person *
                        </Label>
                        <FormControl>
                          <Input
                            id="contact"
                            className="bg-white border-gray-300 text-black mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="email" className="text-black">
                          Email *
                        </Label>
                        <FormControl>
                          <Input
                            id="email"
                            type="email"
                            className="bg-white border-gray-300 text-black mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="phone" className="text-black">
                          Phone *
                        </Label>
                        <FormControl>
                          <Input
                            id="phone"
                            className="bg-white border-gray-300 text-black mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="event-name" className="text-black">
                          Event name *
                        </Label>
                        <FormControl>
                          <Input
                            id="event-name"
                            className="bg-white border-gray-300 text-black mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="eventDate"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="event-date" className="text-black">
                          Event date
                        </Label>
                        <FormControl>
                          <Input
                            id="event-date"
                            type="date"
                            className="bg-white border-gray-300 text-black mt-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="location" className="text-black">
                          Event location
                        </Label>
                        <FormControl>
                          <Input
                            id="location"
                            className="bg-white border-gray-300 text-black mt-1"
                            placeholder="City, Country"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attendees"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="attendees" className="text-black">
                          Expected attendees
                        </Label>
                        <FormControl>
                          <Input
                            id="attendees"
                            type="number"
                            className="bg-white border-gray-300 text-black mt-1"
                            placeholder="e.g. 5000"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="event-type" className="text-black">
                        Event type
                      </Label>
                      <FormControl>
                        <Input
                          id="event-type"
                          className="bg-white border-gray-300 text-black mt-1"
                          placeholder="e.g. Music Festival, Conference, Trade Show"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <Label
                        htmlFor="additional-info"
                        className="text-black mb-1.5 text-sm"
                      >
                        Additional information
                      </Label>
                      <FormControl>
                        <Textarea
                          id="additional-info"
                          className="bg-white border-gray-300 min-h-[120px] mb-10 ml-0 mt-1 text-slate-400"
                          placeholder="Tell us about your event, target audience, current sponsors, and any specific requirements for charging stations..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 p-4 rounded-lg mb-10 pb-[18px]">
                  <h4 className="text-black font-semibold mb-2">
                    What happens next?
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    <li>• We'll review your application within 48 hours</li>
                    <li>
                      • Our team will create a custom partnership proposal
                    </li>
                    <li>• We'll schedule a call to discuss the details</li>
                    <li>
                      • Upon agreement, we'll handle all setup and logistics
                    </li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 py-3 text-sm my-5"
                  disabled={isPending}
                >
                  {isPending ? "Submitting..." : "Submit application"}
                </Button>
                <p className="text-center text-slate-400 my-[0] text-xs">
                  By submitting this form, you agree to our terms of service and
                  privacy policy.
                </p>
                {formStatus === "success" && (
                  <SuccessMessage message="Request submitted successfully!" />
                )}
                {formStatus === "error" && (
                  <ErrorMessage message="There was an error submitting the form." />
                )}
              </form>
            </FormContainer>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
