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
import { createReserveSchema, reserveSchema } from "@/schema";
import { reserve, ReserveFormData } from "@/app/actions/reserve";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { trackFormSubmit, trackConversion } from "@/lib/analytics";

export default function ReserveFormPage() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { href, locale, namespace } = useTranslation();
  const common = namespace("common");
  const reserveCopy = namespace("reserve");
  const forms = namespace("forms");
  const schema = createReserveSchema(forms.validation);

  const form = useForm<z.infer<typeof reserveSchema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      organizer: "",
      contact: "",
      email: "",
      phone: "",
      eventName: "",
      eventDate: "",
      address: "",
      location: "",
      attendees: "",
      eventType: "",
      additionalInfo: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: ReserveFormData) => {
    startTransition(() => {
      reserve(values, locale)
        .then((data) => {
          if (data.success) {
            setFormStatus("success");
            trackFormSubmit("reserve_station_form");
            trackConversion("reserve_station_application", 1);

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
            href={href("/reserve")}
            className="inline-flex items-center hover:text-black transition-colors text-slate-400 text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {common.backLinks.reserve}
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-light text-black lg:text-6xl mb-6 mt-24 text-left">
            {reserveCopy.formPage.title}
          </h1>
          <p className="max-w-2xl font-normal text-lg leading-6 text-gray-500 px-[0] mx-0 text-left pr-10">
            {reserveCopy.formPage.description}
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
                          {forms.reserve.fields.organizer}
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
                          {forms.reserve.fields.contact}
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
                          {forms.reserve.fields.email}
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
                          {forms.reserve.fields.phone}
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
                          {forms.reserve.fields.eventName}
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
                          {forms.reserve.fields.eventDate}
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
                          {forms.reserve.fields.location}
                        </Label>
                        <FormControl>
                          <Input
                            id="location"
                            className="bg-white border-gray-300 text-black mt-1"
                            placeholder={forms.reserve.placeholders.location}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="address" className="text-black">
                          {forms.reserve.fields.address}
                        </Label>
                        <FormControl>
                          <Input
                            id="address"
                            autoComplete="street-address"
                            className="bg-white border-gray-300 text-black mt-1"
                            placeholder={forms.reserve.placeholders.address}
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
                    name="attendees"
                    render={({ field }) => (
                      <FormItem>
                        <Label htmlFor="attendees" className="text-black">
                          {forms.reserve.fields.attendees}
                        </Label>
                        <FormControl>
                          <Input
                            id="attendees"
                            type="number"
                            className="bg-white border-gray-300 text-black mt-1"
                            placeholder={forms.reserve.placeholders.attendees}
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
                        {forms.reserve.fields.eventType}
                      </Label>
                      <FormControl>
                        <Input
                          id="event-type"
                          className="bg-white border-gray-300 text-black mt-1"
                          placeholder={forms.reserve.placeholders.eventType}
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
                        {forms.reserve.fields.additionalInfo}
                      </Label>
                      <FormControl>
                        <Textarea
                          id="additional-info"
                          className="bg-white border-gray-300 min-h-[120px] mb-10 ml-0 mt-1 text-slate-400"
                          placeholder={
                            forms.reserve.placeholders.additionalInfo
                          }
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 p-4 rounded-lg mb-10 pb-[18px]">
                  <h4 className="text-black font-semibold mb-2">
                    {forms.reserve.nextStepsTitle}
                  </h4>
                  <ul className="text-gray-600 text-sm space-y-1">
                    {forms.reserve.nextSteps.map((step) => (
                      <li key={step}>• {step}</li>
                    ))}
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 py-3 text-sm my-5"
                  disabled={isPending}
                >
                  {isPending ? forms.reserve.submitting : forms.reserve.submit}
                </Button>
                <p className="text-center text-slate-400 my-[0] text-xs">
                  {forms.reserve.legal}
                </p>
                {formStatus === "success" && (
                  <SuccessMessage message={forms.feedback.success} />
                )}
                {formStatus === "error" && (
                  <ErrorMessage message={forms.feedback.error} />
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
