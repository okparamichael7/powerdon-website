"use client";

import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import { contactSchema } from "@/schema";
import { contact, ContactFormData } from "@/app/actions/contact";

export default function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: ContactFormData) => {
    startTransition(() => {
      contact(values)
        .then((data) => {
          if (data.success) {
            setFormStatus("success");

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
    <Card className={"bg-white border-gray-200"}>
      <CardHeader>
        <CardTitle className="text-black text-2xl">Send us a Message</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormContainer {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="firstName" className="text-black">
                      First Name
                    </Label>
                    <FormControl>
                      <Input
                        id="firstName"
                        className="bg-white border-gray-300 text-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="lastName" className="text-black">
                      Last Name
                    </Label>
                    <FormControl>
                      <Input
                        id="lastName"
                        className="bg-white border-gray-300 text-black"
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
                      Email
                    </Label>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        className="bg-white border-gray-300 text-black"
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
                      Phone (Optional)
                    </Label>
                    <FormControl>
                      <Input
                        id="phone"
                        className="bg-white border-gray-300 text-black"
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
              name="company"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="company" className="text-black">
                    Company (Optional)
                  </Label>
                  <FormControl>
                    <Input
                      id="company"
                      className="bg-white border-gray-300 text-black"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="subject" className="text-black mb-1">
                    Subject
                  </Label>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white border-gray-300 text-black placeholder:text-gray-600">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="sales">Sales Question</SelectItem>
                      <SelectItem value="support">Technical Support</SelectItem>
                      <SelectItem value="partnership">
                        Partnership Opportunity
                      </SelectItem>
                      <SelectItem value="media">Media Inquiry</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="message" className="text-black">
                    Message
                  </Label>
                  <FormControl>
                    <Textarea
                      id="message"
                      className="bg-white border-gray-300 text-black placeholder:text-gray-600 min-h-[120px]"
                      placeholder="Tell us how we can help you..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-lg py-3"
              disabled={isPending}
            >
              {isPending ? "Sending..." : "Send Message"}
            </Button>
            <p className="text-gray-600 text-sm text-center">
              We typically respond within 24 hours during business days.
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
