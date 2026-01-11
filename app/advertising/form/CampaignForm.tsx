"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Form as FormContainer,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import SuccessMessage from "@/components/success-message";
import ErrorMessage from "@/components/error-message";
import { campaignSchema } from "@/schema";
import { campaign, CampaignFormData } from "@/app/actions/campaign";
import { Checkbox } from "@/components/ui/checkbox";
import { trackFormSubmit, trackConversion } from "@/lib/analytics";

export default function CampaignForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );

  const form = useForm<z.infer<typeof campaignSchema>>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      company: "",
      contact: "",
      email: "",
      phone: "",
      industry: "",
      budget: "",
      timeline: "",
      targetLocations: "",
      goals: "",
      isCollaboration: false,
    },
  });

  // Handle form submission
  const onSubmit = async (values: CampaignFormData) => {
    startTransition(() => {
      campaign(values)
        .then((data) => {
          if (data.success) {
            setFormStatus("success");
            trackFormSubmit("Campaign Form");
            trackConversion(
              values.isCollaboration
                ? "Collaboration Inquiry"
                : "Campaign Quote Request",
              1
            );

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
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="company" className="text-black">
                      Company name *
                    </Label>
                    <FormControl>
                      <Input
                        id="company"
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

            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="industry" className="text-black">
                    Industry
                  </Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white border-gray-300 text-black mt-1">
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="consumer goods">Technology</SelectItem>
                      <SelectItem value="E-commerce/retail">Retail</SelectItem>
                      <SelectItem value="event">Finance</SelectItem>
                      <SelectItem value="Health & Wellness">Healthcare</SelectItem>
                      <SelectItem value="beauty & cosmetic services">Automotive</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="budget" className="text-black">
                      Event budget range
                    </Label>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white border-gray-300 text-black mt-1">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="under-2500">Under €1,000</SelectItem>
                        <SelectItem value="1,000-3,500">
                          €1000 - €3500
                        </SelectItem>
                        <SelectItem value="7500-15000">
                          €3,500 - €6,000
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeline"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="timeline" className="text-black">
                      Campaign timeline
                    </Label>
                    <FormControl>
                      <Input
                        id="timeline"
                        className="bg-white border-gray-300 text-black mt-1"
                        placeholder="e.g. single event, repeated events"
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
              name="isCollaboration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="my-auto"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="collaboration"
                      className="text-black text-sm cursor-pointer"
                    >
                      This is a collaboration inquiry (not a campaign request)
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetLocations"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="target-locations" className="text-black">
                    Target locations
                  </Label>
                  <FormControl>
                    <Input
                      id="target-locations"
                      className="bg-white border-gray-300 text-black mt-1"
                      placeholder="e.g. Airports, Malls, Events, Festivals, Specific cities"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="goals" className="text-black mb-1.5 text-sm">
                    Campaign goals &amp; requirements
                  </Label>
                  <FormControl>
                    <Textarea
                      id="goals"
                      className="bg-white border-gray-300 min-h-[120px] mb-10 ml-0 mt-1 text-black"
                      placeholder="Tell us about your marketing objectives, target audience, creative requirements, and what success looks like for your campaign..."
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
                <li>• We'll review your requirements within 24 hours</li>
                <li>• Our team will create a custom campaign proposal</li>
                <li>• We'll schedule a call to present the strategy</li>
                <li>
                  • Upon approval, we'll launch your campaign within 1 week
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 py-3 text-sm my-5"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Request campaign proposal"}
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
  );
}
